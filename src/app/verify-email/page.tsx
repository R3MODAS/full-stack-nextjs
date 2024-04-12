"use client";

import axios from "axios";
import Link from "next/link"
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react"

const verifyemail = () => {
    const searchParams = useSearchParams()
    // const router = useRouter()

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verify-email", token)
            console.log(response)
            setVerified(true)
            setError(false)
        } catch (err: any) {
            setError(true)
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        setError(false)
        const urlToken = searchParams.get("token")
        if(urlToken != null){
            setToken(urlToken)
        }
    }, [])

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}

export default verifyemail