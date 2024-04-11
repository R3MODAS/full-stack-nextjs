import { connectDB } from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

// connection to DB
connectDB()

// POST request on login route
export async function POST(request: NextRequest) {
    try {
        // get the data from request body
        const { email, password } = await request.json()

        // validation of the data

        // check if the user exists in the db or not
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User is not registered"
            }, { status: 400 })
        }

        // compare the password of the user and DB
        const comparePassword = await bcryptjs.compare(password, user.password)
        if (!comparePassword) {
            return NextResponse.json({
                success: false,
                message: "Password does not match"
            }, { status: 400 })
        }

        // create a payload for token
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // generate a jwt token
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" })

        // create the response
        const response = NextResponse.json({
            success: true,
            message: "Logged in successfully"
        }, { status: 200 })

        // create a cookie
        response.cookies.set("token", token, {
            httpOnly: true
        })

        // return the response
        return response

    } catch (err: any) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while logging the user",
            error: err.message
        }, { status: 500 })
    }
}