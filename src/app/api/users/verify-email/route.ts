import { connectDB } from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// connection to DB
connectDB()

// POST request on verify-email route
export async function POST(request: NextRequest) {
    try {
        // get the data from request body
        const { token } = await request.json()
        console.log(token)

        // validation of the data

        // check if the user exists in the db or not
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Token"
            }, {status: 400})
        }

        // update the user's email verification
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        // return the response
        return NextResponse.json({
            success: true,
            message: "Email verification done successfully"
        }, { status: 200 })
        
    } catch (err: any) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while verifying the email",
            error: err.message
        }, { status: 500 })
    }
}