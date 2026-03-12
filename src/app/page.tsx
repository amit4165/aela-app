'use client'
import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import TripStories from '@/components/TripStories'

const heroPhotos = [
    { url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1800&h=1000&fit=crop&auto=format', label: 'Santorini' },
    { url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&h=1000&fit=crop&auto=format', label: 'Bali' },
    { url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1800&h=1000&fit=crop&auto=format', label: 'Maldives' },
    { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1800&h=1000&fit=crop&auto=format', label: 'Tokyo' },
    { url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1800&h=1000&fit=crop&auto=format', label: 'Paris' },
    { url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1800&h=1000&fit=crop&auto=format', label: 'Amalfi' },
]

export default function LandingPage() {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const [photoIndex, setPhotoIndex] = useState(0)
    const [heroOpacity, setHeroOpacity] = useState(1)
    const [heroY, setHeroY] = useState(0)
    const [chatInput, setChatInput] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const t = setInterval(() => {
            setPhotoIndex(i => (i + 1) % heroPhotos.length)
        }, 5500)
        return () => clearInterval(t)
    }, [])

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
                    {heroPhotos.map((photo, i) => (
                        <div
                            key={photo.label}
                            className={`hero-photo ${i === photoIndex ? 'hero-photo-active' : ''}`}
                            style={{ backgroundImage: `url('${photo.url}')` }}
                        />
                    ))}
                    <div className="hero-photo-overlay" />
                    <div className="hero-photo-label">{heroPhotos[photoIndex].label}</div>
                    <div className="hero-photo-dots">
                        {heroPhotos.map((_, i) => (
                            <button
                                key={i}
                                className={`hero-photo-dot ${i === photoIndex ? 'hero-photo-dot-active' : ''}`}
                                onClick={() => setPhotoIndex(i)}
                                aria-label={`View ${heroPhotos[i].label}`}
                            />
                        ))}
                    </div>
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="orb orb-3" />
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

                            <p className="hero-cta-hint">Free to start · No credit card required</p>
                        </>
                    )}
                </div>
            </section>

            <TripStories />
        </div>
    )
}
