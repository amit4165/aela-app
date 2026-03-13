'use client'
import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import TripStories from '@/components/TripStories'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format'

export default function LandingPage() {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const [heroOpacity, setHeroOpacity] = useState(1)
    const [heroY, setHeroY] = useState(0)
    const [chatInput, setChatInput] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            const vh = window.innerHeight
            const progress = Math.min(y / (vh * 0.3), 1)
            setHeroOpacity(1 - progress)
            setHeroY(y * 0.28)
            document.documentElement.style.setProperty('--hero-blur', `${progress * 14}px`)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const goToAuth = (pendingMessage?: string) => {
        if (pendingMessage) {
            sessionStorage.setItem('aela_pending_message', pendingMessage)
        }
        router.push('/sign-in')
    }

    const handleChatSubmit = (e: FormEvent) => {
        e.preventDefault()
        const text = chatInput.trim()
        if (!text) return
        goToAuth(text)
    }

    if (!isLoaded) return null

    return (
        <div className="landing">
            {/* Hero */}
            <section className="hero">
                <div className="hero-photos" aria-hidden>
                    <div
                        className="hero-photo hero-photo-active"
                        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
                    />
                    <div className="hero-photo-overlay" />
                </div>

                <div className="hero-content" style={{ opacity: heroOpacity, transform: `translateY(-${heroY}px)`, willChange: 'opacity, transform' }}>
                    <h1 className="hero-title">
                        {user ? `Welcome back, ${user.firstName ?? 'traveller'}.` : 'You have one life.'}
                        <br />
                        <em>Where will you go next?</em>
                    </h1>

                    <p className="hero-subtitle">
                        Aela plans flights, hotels, and full itineraries in seconds.
                        Just tell us where your heart is taking you.
                    </p>

                    {user ? (
                        /* Signed-in hero CTA */
                        <div className="hero-cta-row">
                            <Link href="/chat" className="hero-cta-btn hero-cta-primary">
                                Continue Planning
                            </Link>
                            <Link href="/chat" className="hero-cta-btn hero-cta-outline">
                                New Trip
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Central chatbox */}
                            <form className="hero-chatbox" onSubmit={handleChatSubmit}>
                                <input
                                    ref={inputRef}
                                    className="hero-chatbox-input"
                                    type="text"
                                    value={chatInput}
                                    onChange={e => setChatInput(e.target.value)}
                                    placeholder="Where do you want to go? Tell Aela…"
                                    autoComplete="off"
                                />
                                <button
                                    type="submit"
                                    className="hero-chatbox-send"
                                    disabled={!chatInput.trim()}
                                    aria-label="Send"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </form>

                            {/* CTA buttons */}
                            <div className="hero-cta-row">
                                <button className="hero-cta-btn hero-cta-primary" onClick={() => goToAuth()}>
                                    Get Started
                                </button>
                                <button className="hero-cta-btn hero-cta-outline" onClick={() => goToAuth()}>
                                    Plan Your Trip
                                </button>
                                <button className="hero-cta-btn hero-cta-outline" onClick={() => goToAuth()}>
                                    Start Exploring
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <TripStories />
        </div>
    )
}
