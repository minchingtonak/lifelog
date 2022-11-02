import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { ROUTES } from 'src/constants';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    console.log('middleware DENIED:', req.url);
    return NextResponse.redirect(new URL(ROUTES.signIn, req.url));
  }

  console.log('middleware:', req.url);
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    '/((?!_next/static|favicon.ico|login|api/auth).*)',
  ],
};
