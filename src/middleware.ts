import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const email = request.formData
    
  return NextResponse.redirect(new URL('/login', request.url))
}
 
export const config = {
  matcher: '/adm/:path*',
}