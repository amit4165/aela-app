'use client'
import { useState, useEffect, useRef } from 'react'
import TripQuiz, { type QuizAnswers } from '@/components/TripQuiz'
import DestinationMap from '@/components/DestinationMap'
import ItineraryEditor from '@/components/ItineraryEditor'
import TripStories from '@/components/TripStories'
import ProgressBar from '@/components/ProgressBar'

const heroPhotos = [
    { url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1800&h=1000&fit=crop&auto=format', label: 'Santorini' },
    { url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&h=1000&fit=crop&auto=format', label: 'Bali' },
    { url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1800&h=1000&fit=crop&auto=format', label: 'Maldives' },
    { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1800&h=1000&fit=crop&auto=format', label: 'Tokyo' },
    { url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1800&h=1000&fit=crop&auto=format', label: 'Paris' },
    { url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1800&h=1000&fit=crop&auto=format', label: 'Amalfi' },
]

export default function LandingPage() {
    const [quizStarted, setQuizStarted] = useState(false)
    const [quizStep, setQuizStep] = useState(0)
    const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null)
    const [photoIndex, setPhotoIndex] = useState(0)
    const [heroOpacity, setHeroOpacity] = useState(1)
    const [heroY, setHeroY] = useState(0)
    const photosRef = useRef<HTMLDivElement>(null)

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
            const progress = Math.min(y / (vh * 0.55), 1)
            setHeroOpacity(1 - progress)
            setHeroY(y * 0.28)
            // blur the photo layer on scroll
            if (photosRef.current) {
                const blur = progress * 14
                photosRef.current.style.filter = `blur(${blur}px)`
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div className="landing">
            {quizStarted && <ProgressBar step={quizStep} />}

            {/* Hero */}
            <section className="hero">
                {/* Destination photo slideshow */}
                <div className="hero-photos" aria-hidden ref={photosRef}>
                    {heroPhotos.map((photo, i) => (
                        <div
                            key={photo.label}
                            className={`hero-photo ${i === photoIndex ? 'hero-photo-active' : ''}`}
                            style={{ backgroundImage: `url('${photo.url}')` }}
                        />
                    ))}
                    {/* Gradient overlay — dark cinematic feel preserved */}
                    <div className="hero-photo-overlay" />
                    {/* Destination label */}
                    <div className="hero-photo-label">{heroPhotos[photoIndex].label}</div>
                    {/* Dot indicators */}
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
                    {/* Orbs on top of photos */}
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="orb orb-3" />
                </div>

                <div className="hero-content" style={{ opacity: heroOpacity, transform: `translateY(-${heroY}px)`, willChange: 'opacity, transform' }}>
                    <h1 className="hero-title">
                        You have one life.
                        <br />
                        <em>Where will you go next?</em>
                    </h1>

                    <p className="hero-subtitle">
                        Aela plans flights, hotels, and full itineraries in seconds.
                        Just tell us where your heart is taking you.
                    </p>

                    {!quizStarted ? (
                        <div className="hero-cta-area">
                            <button
                                className="hero-start-btn"
                                onClick={() => setQuizStarted(true)}
                            >
                                Find my perfect trip ✦
                            </button>
                            <p className="hero-cta-hint">Takes 20 seconds · No sign-up needed</p>
                        </div>
                    ) : (
                        <TripQuiz
                            onComplete={(a) => setQuizAnswers(a)}
                            onProgress={(s) => setQuizStep(s)}
                        />
                    )}
                </div>
            </section>

            {quizAnswers && (
                <>
                    <DestinationMap answers={quizAnswers} />
                    <ItineraryEditor />
                </>
            )}

            <TripStories />
        </div>
    )
}
