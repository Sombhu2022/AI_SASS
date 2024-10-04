import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
    console.log("Requesting path:", request.nextUrl.pathname);
    
    // Check if the user is on the home page (`/`)
    if (request.nextUrl.pathname === '/') {
        return NextResponse.next();
    }

    // Define public paths where token authentication is not required
    const isPublicPath = request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up';
    
    // Get token from cookies
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        // Redirect authenticated users away from the sign-in or sign-up page
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!token && !isPublicPath) {
        // Redirect unauthenticated users to sign-in if trying to access protected pages
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }

    // Allow access if the token is valid or the user is accessing public paths
    return NextResponse.next();
}

// Config to apply middleware to all pages but exclude static files and API routes
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|assets|api/).*)', // Exclude static files and API routes
    ],
};
