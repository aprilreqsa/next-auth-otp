"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    return(
        <section className="h-screen flex items-center justify-center bg-gray-950">
            <div className="w-full max-w-md p-4 text-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
                <h1 className="text-2xl font-bold text-center">Dashboard</h1>
                <p className="text-center mt-4 ">Welcome to your dashboard, {session?.user?.name}!</p>
                <button 
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={()=> signOut({callbackUrl:"/signin"})}
                >Sign Out</button>
                </div>
            
        </section>
    )
}