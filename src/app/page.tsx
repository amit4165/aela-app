'use client'
import { useState } from 'react'
import TripQuiz, { type QuizAnswers } from '@/components/TripQuiz'
import DestinationMap from '@/components/DestinationMap'
import ItineraryEditor from '@/components/ItineraryEditor'
import TripStories from '@/components/TripStories'
import ProgressBar from '@/components/ProgressBar'

export default function LandingPage() {
    const [quizStarted, setQuizStarted] = useState(false)
    const [quizStep, setQuizStep] = useState(0)
    const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null)

    return (
        <div className="landing">
            {/* Sticky progress bar */}
            {quizStarted && <ProgressBar step={quizStep} />}

            {/* Hero */}
            <section className="hero">
                <div className="landing-bg" aria-hidden>
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="orb orb-3" />
                </div>

                <div className="hero-content">
                    <div className="hero-eyebrow">
                        <span>✦</span>
                        AI-Powered Travel Planning
                    </div>

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

                            <div className="hero-features">
                                <div className="hero-feature"><span />Real-time flight deals</div>
                                <div className="hero-feature"><span />AI-crafted itineraries</div>
                                <div className="hero-feature"><span />Multi-city route planning</div>
                                <div className="hero-feature"><span />No booking fees</div>
                            </div>
                        </div>
                    ) : (
                        <TripQuiz
                            onComplete={(a) => setQuizAnswers(a)}
                            onProgress={(s) => setQuizStep(s)}
                        />
                    )}
                </div>
            </section>

            {/* Post-quiz sections */}
            {quizAnswers && (
                <>
                    <DestinationMap answers={quizAnswers} />
                    <ItineraryEditor />
                </>
            )}

            {/* Always visible */}
            <TripStories />
        </div>
    )
}
