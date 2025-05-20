import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import authConfig from './auth.config';
import NextAuth from 'next-auth';

export const { auth: middleware } = NextAuth(authConfig);

// export function middleware(request: NextRequest) {
//   const sessionToken =
//     request.cookies.has('authjs.session-token') ||
//     request.cookies.has('__Secure-authjs.session-token');

//   const refererUrl = request.cookies.get('referer')?.value || '/';

//   const response = sessionToken
//     ? NextResponse.redirect(new URL(refererUrl, request.url))
//     : NextResponse.next();

//   if (!sessionToken) {
//     const setRefererUrl = request.headers.get('referer') || '/';
//     response.cookies.set('referer', setRefererUrl);
//   } else {
//     response.cookies.delete('referer');
//   }

//   return response;
// }

// export const config = {
//   matcher: '/auth',
// };
