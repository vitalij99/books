import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasSessionToken = request.cookies.has('authjs.session-token');

  if (hasSessionToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: '/auth',
};
