import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import arcjet, { createMiddleware, detectBot } from '@arcjet/next';

async function authMiddleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

const aj = arcjet({
    key: process.env.ARCJET_KEY!,

    rules: [
        detectBot({
            mode: 'LIVE',

            allow: [
                'CATEGORY:SEARCH_ENGINE',
                'CATEGORY:MONITOR',
                'CATEGORY:PREVIEW',
                'CATEGORY:AI',
                'STRIPE_WEBHOOK',
            ],
        }),
    ],
});

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhook).*)'],
};

export default createMiddleware(aj, async (request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        return authMiddleware(request);
    }

    return NextResponse.next();
});
