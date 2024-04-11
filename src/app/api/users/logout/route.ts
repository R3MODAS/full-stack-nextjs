import { connectDB } from "@/db";
import { NextRequest, NextResponse } from "next/server";

// connection to DB
connectDB()

// GET request on logout route
export async function GET(request: NextRequest) {
    try{
        // create the response
        const response = NextResponse.json({
            success: true,
            message: "Logout successfully"
        }, {status: 200})

        // update the cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        // return the response
        return response

    }catch(err){

    }
}

