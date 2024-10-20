import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.has('authjs.session-token');

  const refererUrl =
    request.cookies.get('referer')?.value ||
    request.headers.get('referer') ||
    '/';

  const response = sessionToken
    ? NextResponse.redirect(new URL(refererUrl, request.url))
    : NextResponse.next();

  sessionToken
    ? response.cookies.delete('referer')
    : response.cookies.set('referer', refererUrl);

  return response;
}

export const config = {
  matcher: '/auth',
};
