
"use client";
import BaseAlert from "@/app/components/base-alert";
import LoaderSpinner from "@/app/components/loader-spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page(){
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({
        type: "",
        message: "",
        isShow: false
    });
    const router = useRouter();
    const verifyOtp = async() => {
        setIsLoading(true);
        const res = await fetch("/api/auth/verify-otp", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email, otp})
        });
        const data = await res.json();
        if(res.ok) {
            setAlert({type: "success", message: "OTP verified successfully", isShow: true});
            setIsLoading(false);
            localStorage.removeItem("pendingVerifyEmail")
            setTimeout(() => {
            router.push("/signin")
            },1000)
        } else {
            setAlert({type: "error", message: data.message || "verification failed", isShow: true});
            setIsLoading(false);
        }
    }
    useEffect(()=> {
        const pendingVerifyEmail = localStorage.getItem("pendingVerifyEmail");
        setEmail(pendingVerifyEmail || "");
    })
    const sendOtp = async() => {
        await fetch("/api/auth/send-otp", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email})
        });
    }
    return (
        <section className="h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-4 text-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
                <form action="">
                    <div className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 text-center">Enter Verificarion OTP</h5>
                        <p className="text-center text-[14px] text-gray-500 ">
                            We&apos;ve send a code to 
                            <span className="text-gray-700 font-bold"> {email}</span>
                        </p>
                        {alert.isShow && (
                            <BaseAlert alert={{type: alert.type, message: alert.message}} />
                        )}
                    </div>
                    <div>
                        <label htmlFor="">OTP</label>
                        <input 
                        type="text" 
                        placeholder="Enter OTP"
                        name="otp"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <button
                    onClick={verifyOtp}
                    type="button"
                    disabled={isLoading}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                    {isLoading && (<LoaderSpinner />)}
                    </button>
                </form>
            </div>
        </section>
    )
}