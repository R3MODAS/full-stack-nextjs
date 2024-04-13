"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const Profile = () => {
  const router = useRouter()
  const [data, setData] = useState<any>({})

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/api/users/profile`)
      setData(response.data?.user)
    } catch (err: any) {
      console.log(err.response.data)
      toast.error(err.response.data.message)
    }
  }

  const onLogout = async () => {
    try{
      await axios.get("/api/users/logout")
      toast.success("Log out successfully")
      router.push("/login")
    }catch(err: any){
      console.log(err.response.data)
      toast.error(err.response.data?.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Welcome to Profile</h1>
      <hr />

      <div className="flex gap-4 mb-4">
        <button
          onClick={fetchUserDetails}
          className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >User Details</button>

        <button
          onClick={onLogout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>
      </div>

      {
        Object.keys(data).length > 0 &&
        <div className="text-center">
          <div className="bg-orange-500 px-5 py-3 text-base text-left mb-4">
            <h3>Username: {data!.username}</h3>
            <h3>Email: {data!.email}</h3>
            <h3>Verified: {data?.isVerified === true ? "Yes" : "No"}</h3>
          </div>
          <Link href={`/profile/${data?._id}`} className="bg-green-700 px-3 py-2">Get the User ID</Link>
        </div>
      }

      <Toaster />
    </div>
  )
}

export default Profile