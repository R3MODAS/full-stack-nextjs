import { NextResponse } from "next/server"

// GET request on logout route
export const GET = () => {
    try{
        // create a response
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

    }catch(err: any){
        console.log(err.message)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while logging out",
            error: err.message
        }, {status: 500})
    }
}