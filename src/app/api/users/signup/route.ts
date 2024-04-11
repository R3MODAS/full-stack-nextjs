import User from "@/models/User"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { mailer } from "@/utils/mailer"
import { connectDB } from "@/db"

// connection to DB
connectDB()

// POST request on signup route
export async function POST(request: NextRequest) {
    try {
        // get the data from request body 
        const { username, email, password } = await request.json()

        // validation of the data

        // check if the user already exists in the db or not
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
        const newUser = await User.create({ email, password: hashedPassword, username })

        // send a mail for verification of email
        await mailer({ email: email, emailType: "VERIFY", userId: newUser._id })

        // return the response
        return NextResponse.json({
            success: true,
            message: "User has been registered successfully",
            newUser
        }, { status: 200 })

    } catch (err: any) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while signing up the user",
            error: err.message
        }, { status: 500 })
    }
}