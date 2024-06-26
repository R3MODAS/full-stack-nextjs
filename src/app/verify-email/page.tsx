"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const VerifyEmail = () => {
    const [verified, setVerified] = useState(false)
    const [token, setToken] = useState("")
    const [errormessage, setErrorMessage] = useState("")

    const fetchToken = () => {
        // const urlToken: any = searchParams.get("token")
        // setToken(urlToken)

        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }

    useEffect(() => {
        fetchToken()
    }, [])

    const verifyEmail = async () => {
        try {
            if (token.length > 0) {
                const res = await axios.post(`/api/users/verify-email`, { token: token })
                setVerified(true)
            }
        } catch (err: any) {
            console.log(err.response.data)
            toast.error(err.response.data.message)
            setErrorMessage(err.response.data.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2 className="text-3xl font-bold mb-4">Please verify your email here</h2>
            {
                !verified && <button className="bg-white text-black px-4 py-2 rounded-lg font-medium" onClick={verifyEmail}>Verify Email</button>
            }

            {verified && (
                <div className="text-center my-5">
                    <p>Email is verified successfully !! Visit the <Link href="/login" className="text-blue-500 rounded-lg">Login</Link> here</p>
                </div>
            )}
            <Toaster />
        </div>
    )
}

export default VerifyEmail