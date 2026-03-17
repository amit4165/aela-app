import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, request) => {
    const { userId } = await auth()

    // Redirect signed-in users from landing page to chat (unless they explicitly clicked the logo)
    if (userId && request.nextUrl.pathname === '/' && !request.nextUrl.searchParams.has('home')) {
        return NextResponse.redirect(new URL('/chat', request.url))
    }

    if (!isPublicRoute(request)) {
        await auth.protect()
    }
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
