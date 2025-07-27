import { prisma } from "@/app/libs/prisma";
import nodemailer from "nodemailer"

export async function POST(req: Request){
    const {email}= await req.json();
    const user = await prisma.users.findUnique({
        where: {
            email
        }
    })
    if(!user) return Response.json({message: "User not found"}, {status: 404})
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    await prisma.otps.create({
        data: {
            code: otp,
            userId: user.id,
            expiry
        }
    })

    //send email with OTP
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.EmAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject:"Your OTP Code",
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
    })
    return Response.json({message: "OTP sent successfully"})
}