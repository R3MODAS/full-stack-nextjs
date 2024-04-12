import { NextResponse } from "next/server"

export const GET = () => {
    try{
        // create a response
        const response = NextResponse.json({
            success: true,
            message: "Log out successfully"
        }, {status: 200})

        // remove the cookie data
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        // return the response
        return response
        
    }catch(err: any){
        console.log(err.message)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while logging out",
            error: err.message
        }, {status: 500})
    }
}