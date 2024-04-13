"use client"

import Link from "next/link"

const Id = ({ params }: any) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-2">
            <h2 className="text-2xl font-bold">Here is the User Id</h2>
            <hr />
            <p className="text-xl px-3 py-2 bg-orange-500 text-black">{params.id}</p>
            <p>Go back to <Link className="text-blue-500" href="/profile">profile</Link></p>
        </div>
    )
}

export default Id