import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const tokenData = (request: NextRequest) => {
    try {
        // get the token
        const token = request.cookies.get("token")?.value || ""

        // decode the payload using the token
        const payload: any = jwt.verify(token, process.env.JWT_SECRET!)

        // return the user id
        return payload.id

    } catch (err: any) {
        throw new Error(err.message)
    }
}