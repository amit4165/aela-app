import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import NavLogo from '@/components/NavLogo'
import CurrencySelector from '@/components/CurrencySelector'
import NavAuth from '@/components/NavAuth'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { ThemeProvider } from '@/context/ThemeContext'
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
                <ThemeProvider>
                <CurrencyProvider>
                    <ClerkProvider>
                        {/* ── Global Nav ── */}
                        <nav className="nav">
                            <NavLogo />
                            <div className="nav-actions">
                                <CurrencySelector />
                                <NavAuth />
                            </div>
                        </nav>

                        {children}
                    </ClerkProvider>
                </CurrencyProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
