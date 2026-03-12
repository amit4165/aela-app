'use client'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import AelaLogo from './AelaLogo'

export default function NavLogo() {
    const { isSignedIn } = useAuth()
    return (
        <Link href={isSignedIn ? '/chat' : '/'} className="nav-logo">
            <AelaLogo />
        </Link>
    )
}
