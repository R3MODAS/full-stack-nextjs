import { connectDB } from "@/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/utils/mailer";

// connection to DB
connectDB()

// POST request on signup route
export async function POST(request: NextRequest) {
    try {
        // get the data from request body
        const { username, email, password } = await request.json()

        // validation of the data

        // check if the user exists in the db or not
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({
                success: false,
                message: "User is already registered"
            }, { status: 400 })
        }

        // hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // create an entry for user in db
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword
        })
        console.log(newUser)

        // send verification email to the user
        await sendEmail({ email, emailType: "VERIFY", userId: newUser._id })

        // return the response
        return NextResponse.json({
            message: "User has been registered successfully",
            success: true,
            newUser
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong while signing up the user",
            error: err.message
        }, { status: 500 })
    }
}