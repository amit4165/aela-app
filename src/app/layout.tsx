import type { Metadata } from 'next'
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import AelaLogo from '@/components/AelaLogo'
import CurrencySelector from '@/components/CurrencySelector'
import { CurrencyProvider } from '@/context/CurrencyContext'
import './globals.css'

export const metadata: Metadata = {
    title: 'Aela — Where Will You Go Next?',
    description: 'AI-powered luxury travel planning. Plan flights, hotels, and full itineraries with the power of AI.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
            </head>
            <body suppressHydrationWarning>
                <CurrencyProvider>
                    <ClerkProvider>
                        {/* ── Global Nav ── */}
                        <nav className="nav">
                            <Link href="/" className="nav-logo">
                                <AelaLogo />
                            </Link>
                            <div className="nav-actions">
                                <CurrencySelector />
                                <Show when="signed-out">
                                    <SignInButton mode="redirect">
                                        <button className="btn btn-ghost">Sign In</button>
                                    </SignInButton>
                                    <SignUpButton mode="redirect">
                                        <button className="btn btn-primary">Get Started</button>
                                    </SignUpButton>
                                </Show>
                                <Show when="signed-in">
                                    <Link href="/chat" className="btn btn-ghost">Open Chat</Link>
                                    <UserButton />
                                </Show>
                            </div>
                        </nav>

                        {children}
                    </ClerkProvider>
                </CurrencyProvider>
            </body>
        </html>
    )
}
