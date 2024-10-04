import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


export async function middleware(request) {

    console.log("requasting path",request.nextUrl.pathname);
    
    // If the user is on the home page (`/`), allow access without checking authentication
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next()
    }

    const isPublicPath = request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up'

    const token = request.cookies.get('token')?.value || ''
    
    

    if(isPublicPath && token){
       
        
        return NextResponse.redirect(new URL('/' , request.nextUrl))
    }

    if(!token && !isPublicPath){
     
        
        return NextResponse.redirect(new URL('/sign-in' , request.nextUrl))
    }
    if(!token && isPublicPath){
      
        
        return NextResponse.next()
    }

}

export const config = {
    matcher: ['/ai/:path*', "/:path*" , '/profile'  ,'/dashboard' , '/sign-in' , '/sign-up' ], // Apply to all pages except static files
  };
  