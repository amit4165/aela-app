'use client'

import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function NavAuth() {
    const { isSignedIn } = useAuth()

    if (!isSignedIn) {
        return (
            <>
                <SignInButton mode="redirect">
                    <button className="btn btn-ghost">Sign In</button>
                </SignInButton>
                <SignUpButton mode="redirect">
                    <button className="btn btn-primary">Get Started</button>
                </SignUpButton>
            </>
        )
    }

    return (
        <>
            <Link href="/chat" className="btn btn-ghost">Open Chat</Link>
            <UserButton />
        </>
    )
}
