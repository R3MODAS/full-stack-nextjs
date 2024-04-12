import { connectDB } from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { mailer } from "@/utils/mailer";

// Connection to DB
connectDB()

// POST request on signup route
export const POST = async (request: NextRequest) => {
    try{
        // get the data from request body
        const {username, email, password} = await request.json()

        // validation of the data
        if(!username || !email || !password){
            return NextResponse.json({
                success: false,
                message: "Please fill the data properly"
            }, {status: 400})
        }

        // check if the user exists in the db or not
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({
                success: false,
                message: "User is already registered"
            }, {status: 400})
        }

        // hash the password
        const hashedPassword = await bcryptjs.hash(password, 10)

        // create an entry for user in db
        const newUser = await User.create({email, username, password: hashedPassword})

        // send a mail regarding the email verification
        await mailer({email: email, emailType: "VERIFY", userId: newUser._id})

        // return the response
        return NextResponse.json({
            success: true,
            message: "User is registered successfully",
            user: newUser
        })

    }catch(err: any){
        console.log(err)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while signing up the user",
            error: err.message
        }, {status: 500})
    }
}