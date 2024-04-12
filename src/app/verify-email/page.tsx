"use client"

import axios from "axios"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const verifyEmail = () => {
    const searchParams = useSearchParams()

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const getTokenFromUrl = () => {
        setError(false)

        // get the token from url
        const urlToken: any = searchParams.get("token")
        setToken(urlToken)
    }

    const emailVerification = async () => {
        try {
            setError(false)
            const response = await axios.post(`/api/users/verify-email`, { token: token })
            console.log(response.data)
            setVerified(true)
        } catch (err: any) {
            setError(true)
            console.log(err.response.data)
        }
    }

    // Getting the token
    useEffect(() => {
        getTokenFromUrl()
    }, [])

    // Checking for the token
    useEffect(() => {
        if (token.length > 0) {
            emailVerification()
        }
    }, [token])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black mt-3">{token ? token : "No Token"}</h2>

            {verified && (
                <div className="text-center">
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}

            {error && (
                <div className="mt-5">
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}

export default verifyEmail