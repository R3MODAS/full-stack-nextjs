import { connectDB } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import User from "@/models/User";

// Connection to DB
connectDB()

// GET request on profile route
export const GET = async (request: NextRequest) => {
    try{
        // get the token
        const token = request.cookies.get("token")?.value || ""

        // decode the payload using the token
        const payload:any = jwt.verify(token, process.env.JWT_SECRET!)

        // get the user id
        const userId = payload.id

        // check if the user exists in the db or not 
        const user = await User.findById({_id: userId}).select("-password")
        if(!user){
            return NextResponse.json({
                success: false,
                message: "User is not found"
            }, {status: 400})
        }
        
        // return the response
        return NextResponse.json({
            success: true,
            message: "Got the user details successfully",
            user
        })
        

    }catch(err: any){
        console.log(err.message)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while getting the user details",
            error: err.message
        }, {status: 500})
    }
}