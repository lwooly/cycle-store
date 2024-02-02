// middleware.js
import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import permissions from '@/lib/api-functions/server/permissions';
import { checkRole } from './lib/utils';

const { identifier, roles } = permissions;

export const config = {
  matcher: '/admin/(.*)',
};

export default withMiddlewareAuthRequired(async (req) => {
  try {
    const res = NextResponse.next();
    const session = await getSession(req, res);
    // console.log('session', session)
    const isAdmin = checkRole(session.user, identifier, roles);

    if (!isAdmin) {
      console.log(`Not admin`);
      return NextResponse.redirect(new URL('/', req.url));
    }
    return res;
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }
});
