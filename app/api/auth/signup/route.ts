import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"
import z from "zod"
import bcrypt from "bcrypt"

export async function POST (req: Request) {
    const body = await req.json()
    const schema = z.object({
        name: z.string().min(6),
        email: z.string().email(),
        password: z.string()
    })
    const {name, email, password } = schema.parse(body)
    const exist = await prisma.users.findUnique({
        where: {
            email
        }
    })
    if(exist){
        return NextResponse.json({error: "User already exist"},{status:400})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.users.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    //call send otp
    await fetch(`${process.env.BASE_URL}/api/auth/send-otp`,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({email})
    })
    return NextResponse.json({user})
    
}