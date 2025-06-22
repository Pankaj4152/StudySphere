
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_COOKIE_NAME = 'admin-auth';

export function middleware(request: NextRequest) {
  // Clone the request headers so we can set a new one
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);

  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Exclude the login page from the auth check
    if (request.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.next({ headers });
    }

    const authCookie = request.cookies.get(AUTH_COOKIE_NAME);

    if (!authCookie || authCookie.value !== 'true') {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('next', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ['/admin/:path*'],
}
