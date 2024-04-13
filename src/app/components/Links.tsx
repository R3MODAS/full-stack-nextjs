"use client"

import Link from "next/link";

const Links = () => {
  return (
    <div className="flex gap-5 text-lg text-black font-semibold">
    <Link href="/" className="bg-white px-4 py-2 rounded-md">Home</Link>
    <Link href="/signup" className="bg-white px-4 py-2 rounded-md">Signup</Link>
    <Link href="/login" className="bg-white px-4 py-2 rounded-md">Login</Link>
  </div>
  )
}

export default Links