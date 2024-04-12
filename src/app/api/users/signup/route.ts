import { connectDB } from "@/db"
import User from "@/models/User"
import { mailer } from "@/utils/mailer"
import bcryptjs from "bcryptjs"
import { NextResponse, NextRequest } from "next/server"

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

        // check if the user already exists in the db or not
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({
                success: false,
                message: "User is already registered"
            }, {status: 400})
        }

        // hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // create an entry for user in db
        const newUser = await User.create({username, email, password: hashedPassword})

        // send an email to the user regarding email verification
        await mailer({email, emailType: "VERIFY", userId: newUser._id})

        // return the response
        return NextResponse.json({
            success: true,
            message: "User is registered successfully",
            newUser
        }, {status: 200})

    }catch(err: any){
        console.log(err.message)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while registering the user",
            error: err.message
        }, {status: 500})
    }
}

