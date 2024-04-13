import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

    // get the path user is currently
    const path = request.nextUrl.pathname

    // get the token from cookie
    const token = request.cookies.get("token")?.value

    // public paths
    const isPublicPath = path === "/" || path === "/signup" || path === "/login" || path === "/verify-email"

    // check if the user is visiting any public path with token
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    // check if the user is visiting any restricted path without any token
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/', request.url))
    }
}
 
export const config = {
  matcher: [
    "/",
    "/signup",
    "/login",
    "/verify-email",
    "/profile"
  ],
}