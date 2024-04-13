import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // get the path
    const path = request.nextUrl.pathname

    // check the type of path
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verify-email"

    // get the token from cookies
    const token = request.cookies.get("token")?.value || ""

    // if we have token and we are visiting public route
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    // if we don't have token and we are visiting protected route
    else if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/profile",
        "/verify-email"
    ],
}