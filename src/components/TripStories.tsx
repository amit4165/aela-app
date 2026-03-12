'use client'
import { useState, useEffect } from 'react'
import TravelQuote from './TravelQuote'

const stories = [
    {
        title: '4 days in Rome — Foodie',
        price: '€420',
        match: 94,
        tags: ['Culture', 'Food', 'History'],
        desc: 'Pasta, gelato, and ancient ruins. A perfect long weekend escape.',
    },
    {
        title: '7 days in Bali — Adventure',
        price: '£680',
        match: 89,
        tags: ['Adventure', 'Nature', 'Wellness'],
        desc: 'Rice terraces, temples, and surf breaks. Pure magic awaits.',
    },
    {
        title: 'Weekend in Lisbon — Solo',
        price: '£310',
        match: 92,
        tags: ['Solo', 'City', 'Food'],
        desc: 'Pasteis de nata, fado music, and stunning river viewpoints.',
    },
]

export default function TripStories() {
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused) return
        const t = setInterval(() => setActive(a => (a + 1) % stories.length), 5000)
        return () => clearInterval(t)
    }, [paused])

    return (
        <div className="light-section">

            {/* ── Reviews block ── */}
            <section className="stories-section"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div className="section-inner">
                    <div className="section-eyebrow light">Trip Inspiration</div>
                    <h2 className="section-title light">Trips others loved</h2>
                    <p className="section-subtitle light">Real AI-crafted itineraries, tried and tested</p>

                    <div className="stories-grid">
                        {stories.map((s, i) => (
                            <div
                                key={i}
                                className={`story-card light-card ${i === active ? 'story-card-active' : ''}`}
                                onClick={() => setActive(i)}
                            >
                                <div className="story-match">
                                    <span className="story-match-num">{s.match}%</span>
                                    <span className="story-match-label"> match</span>
                                </div>
                                <div className="story-stars">⭐⭐⭐⭐⭐</div>
                                <h3 className="story-title light">{s.title}</h3>
                                <p className="story-desc light">{s.desc}</p>
                                <div className="story-tags">
                                    {s.tags.map(t => <span key={t} className="story-tag light-tag">{t}</span>)}
                                </div>
                                <div className="story-footer">
                                    <span className="story-price">{s.price}</span>
                                    <div className="story-actions">
                                        <button className="story-ghost light-ghost">View plan</button>
                                        <button className="story-primary">Try this style</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="stories-dots">
                        {stories.map((_, i) => (
                            <button
                                key={i}
                                className={`stories-dot ${i === active ? 'stories-dot-active' : ''}`}
                                onClick={() => setActive(i)}
                                aria-label={`Story ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Quote divider ── */}
            <TravelQuote />

        </div>
    )
}
