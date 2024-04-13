"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const Signup = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    // Signup handler
    const onSignup = async () => {
        try{
            setLoading(true)
            await axios.post(`/api/users/signup`, user)
            router.push("/login")
        }catch(err: any){
            console.log(err.response.data)
            toast.error(err.response.data?.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl mb-4 font-bold">{loading ? "Loading..." : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                placeholder="username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
            />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <button
                onClick={onSignup}
                disabled = {buttonDisabled ? true : false}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
            <Toaster />
        </div>
  )
}

export default Signup