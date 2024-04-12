import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const tokenData = (request: NextRequest) => {
    try{
        // get token from cookie
        const token = request.cookies.get("token")?.value || ""

        // decode the payload
        const payload:any = jwt.verify(token, process.env.JWT_SECRET!)

        // return the id of the user
        return payload.id

    }catch(err: any){
        throw new Error(err.message)
    }
}