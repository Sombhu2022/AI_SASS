import { NextResponse } from 'next/server';

export async function middleware(request) {
    console.log("Requesting path:", request.nextUrl.pathname);
    
    // Public paths where token authentication is not required
    const isPublicPath = request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up';
    
    // Get the token from cookies
    const token = request.cookies.get('token')?.value || '';
    
     // Allow access to the /ai/convertion page regardless of token presence
     if (request.nextUrl.pathname === '/ai/convertion') {
        return NextResponse.next();
    }

    // If the user is authenticated and tries to access public paths (like sign-in or sign-up), redirect them to the home page
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    

    // If the user is not authenticated and tries to access protected paths, redirect them to the sign-in page
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }

    // Otherwise, allow the request to continue
    return NextResponse.next();
}

// Config to apply middleware to relevant pages, excluding static files and API routes
export const config = {
    matcher: [
        '/sign-in', 
        '/sign-up', 
        '/profile',  
        '/dashboard',  
        '/ai/:path*', 
        '/ai/convertion/:path*', 
        '/setting'
    ],
};
