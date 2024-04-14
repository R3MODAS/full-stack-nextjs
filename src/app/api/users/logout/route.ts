import { NextResponse } from "next/server"

export const GET = () => {
    try{
        // create a response
        const response = NextResponse.json({
            success: true,
            message: "Log out successfully"
        }, {status: 200})

        // remove the cookie value
        response.cookies.delete("token")

        // return the response
        return response

    }catch(err: any){
        console.log(err.message)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while logging out the user",
            error: err.message
        }, {status: 500})
    }
}