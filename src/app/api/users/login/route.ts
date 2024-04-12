import { NextRequest, NextResponse } from "next/server"
import User from "@/models/User"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/db"

// Connection to DB
connectDB()

// POST request on login route
export const POST = async (request: NextRequest) => {
    try{
        // get the data from request body
        const {email, password} = await request.json()

        // validation of the data
        if(!email || !password){
            return NextResponse.json({
                success: false,
                message: "Please fill the details properly"
            }, {status: 400})
        }

        // check if the user exists in the db or not
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                success: false,
                message: "User is not registered"
            }, {status: 400})
        }

        // compare the user password and db password
        const comparePassword = await bcryptjs.compare(password, user.password)
        if(!comparePassword){
            return NextResponse.json({
                success: false,
                message: "Password does not match"
            }, {status: 400})
        }

        // create a payload for jwt token
        const payload = {
            id : user._id,
            email: user.email,
            username: user.username
        }

        // create a jwt token
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1h"
        })

        // create a response
        const response = NextResponse.json({
            success: true,
            message: "Logged in successfully"
        }, {status: 200})

        // create a cookie
        response.cookies.set("token", token, {
            httpOnly: true
        })

        // return the response
        return response

    }catch(err: any){
        console.log(err.message)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while logging the user",
            error: err.message
        }, {status: 500})
    }
}