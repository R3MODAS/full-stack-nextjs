"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const profile = () => {
  const router = useRouter()
  const [data, setData] = useState("Nothing")

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`/api/users/profile`)
      console.log(response.data?.user)
      setData(response.data?.user?._id)
    } catch (err: any) {
      console.log(err.response.data)
    }
  }

  const logout = async () => {
    try {
      await axios.get(`/api/users/logout`)
      router.push("/login")
    } catch (err: any) {
      console.log(err.message)
      toast.error(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">{data === "Nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Logout</button>

      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >GetUser Details</button>

      <Toaster />
    </div>
  )
}

export default profile