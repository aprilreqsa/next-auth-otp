"use client"
import BaseAlert from "@/app/components/base-alert";
import LoaderSpinner from "@/app/components/loader-spinner"
import { signIn } from "next-auth/react";
import Link from "next/link"
import { useRouter } from "next/navigation";

import { useState } from "react"

interface UserProps {
    email? : string;
    password?: string;
}

export default function Page() {
    const router = useRouter()
    const [user, setUser] = useState<UserProps>({
        email:"",
        password:""
    })
    const [alert,setAlert] = useState({
        type:"",
        message:"",
        isShow: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUser((prev) => ({...prev,[name] : value})  )
    }
    const handleLogin = async() => {
        setIsLoading(true)
        const res = await signIn("credentials",{
            redirect: false,
            email: user.email,
            password: user.password
        });
        if(res?.error){
            console.log("Login Error", res?.error)
            setAlert({
                type: "error",
                message: res.error,
                isShow: true
            })
            setIsLoading(false)
        }else {
            setTimeout(()=> {
                router.push("/dashboard")
            },1000)
            
            setIsLoading(false)
        }
    }
    return (
        <section className="h-screen flex items-center justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
                <form action="" className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 ">Sign In to our Platform</h5>
                    {alert.isShow && <BaseAlert alert={alert}/>}
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">Your Email</label>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@company.com"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={handleOnChange}
                        value={user.email}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">Your Password</label>
                        <input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={handleOnChange}
                        value={user.password}
                        required
                        />
                    </div>
                    <button
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3 cursor-pointer"
                    disabled={isLoading}
                    onClick={handleLogin}
                    >
                        {isLoading ? "Loading" : "Login to your account"}
                        {isLoading && (<LoaderSpinner />)}
                    </button>
                    <div>
                        Not Registered? <Link href="/signup" className="text-blue-700 hover:underline">Create Account</Link>
                        
                    </div>
                </form>
            </div>
        </section>
    )
}