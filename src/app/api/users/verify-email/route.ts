import { connectDB } from "@/db"
import User from "@/models/User"
import { NextResponse, NextRequest } from "next/server"

// Connection to DB
connectDB()

// POST request on verify-email route
export const POST = async (request: NextRequest) => {
    try {
        // get the token from request body
        const token = await request.json()

        // validation of the token
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if(!user){
            return NextResponse.json({
                success: false,
                message: "Invalid Token"
            }, {status: 400})
        }

        // update the user info for email verification
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        // return the response
        return NextResponse.json({
            success: true,
            message: "Email verification done successfully"
        }, {status: 200})

    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while verifying the email",
            error: err.message
        }, { status: 500 })
    }
}