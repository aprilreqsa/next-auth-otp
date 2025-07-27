"use client"
import BaseAlert from "@/app/components/base-alert";
import LoaderSpinner from "@/app/components/loader-spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface UserProps {
    name?: string;
    email?: string;
    password?: string;
}

export default function Page (){
    const [user, setUser] = useState<UserProps>({
        name:"",
        email:"",
        password:""
    })
    const [alert, setAlert] = useState({
        type:"",
        message:"",
        isShow: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUser((prev) =>({...prev, [name]: value})  )
    }
    const handleRegister = async() =>{
        setIsLoading(true)
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password
            })
        })
        const data = await res.json();
        if(res.ok){
            setAlert({type: "success", message: "User created   successfully, please verify your email", isShow: true}) 
            setIsLoading(false)
            localStorage.setItem("pendingVerifyEmail", user.email || "");
            setTimeout(() => {
                router.push(`/verify/${user.email}`) // Redirect to verify page with email
            }, 1000)
        }else {
            setAlert({type: "error", message: data.error || "Something went wrong", isShow: true})
            setIsLoading(false) 
        }
    }
    return ( 
        <section className="h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-4 text-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
                <form action="" className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900">Sign Up to our platform</h5>
                    {alert.isShow && (
                        <BaseAlert alert={{type: alert.type, message: alert.message}} />
                    )}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                        <input 
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        type="text" 
                        value={user.name}
                        onChange={handleOnChange}
                        required
                        placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                        <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={handleOnChange}
                        required
                        type="email" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your Password</label>
                        <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={handleOnChange}
                        required
                        type="password" />
                    </div>
                    <button 
                    type="button"
                    onClick={handleRegister}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer flex items-center gap-3 justify-center">
                    {isLoading ? 'Loading' : "Register to your account"}
                    {isLoading && (<LoaderSpinner />)}
                    </button>
                    <div className="text-sm font-medium text-gray-500">
                        Already Have account ? <Link href="/signin">Sign in to your account</Link>
                    </div>
                </form>
            </div>
            <div><p></p></div>
        </section>
    )
}

