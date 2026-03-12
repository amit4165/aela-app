'use client'
import Link from 'next/link'
import AelaLogo from './AelaLogo'

export default function NavLogo() {
    return (
        <Link href="/" className="nav-logo">
            <AelaLogo />
        </Link>
    )
}
