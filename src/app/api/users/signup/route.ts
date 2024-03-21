import User from "@/models/userModel";
import { connectDB } from "@/db";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from 'next/server'

connectDB()

// localhost:3000/api/users/signup

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        // getting data from user
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        // validation of data
        console.log(reqBody);

        // checking if the user already exists or not
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User Already exists" }, { status: 400 })
        }

        // hashing the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // creating a user for db
        const savedUser = await User.create({ username, email, password: hashedPassword })
        console.log(savedUser)

        // send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })
    } catch (err: any) {
        return NextResponse.json({
            error: err.message
        }, { status: 500 })
    }
}

