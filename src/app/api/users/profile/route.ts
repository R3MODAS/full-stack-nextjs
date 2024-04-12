import { connectDB } from "@/db";
import User from "@/models/User";
import { tokenData } from "@/utils/tokendata";
import { NextRequest, NextResponse } from "next/server";

// Connection to DB
connectDB()

export const POST = async (request: NextRequest) => {
    try{
        // get the user id
        const userId = tokenData(request)
        
        // get user details using the id
        const userDetails = await User.findById({_id: userId}).select("-password")

        // check if the user exists in the db or not
        if(!userDetails){
            return NextResponse.json({
                success: false,
                message: "User is not found"
            }, {status: 400})
        }

        // return the response
        return NextResponse.json({
            success: true,
            message: "Got the user details successfully",
            user: userDetails
        }, {status: 200})

    }catch(err: any){
        console.log(err.message)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while getting the profile data",
            error: err.message
        }, {status: 500})
    }
}