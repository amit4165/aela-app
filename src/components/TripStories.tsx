'use client'
import { useState, useEffect } from 'react'
import TravelQuote from './TravelQuote'

const stories = [
    { title: '4 days in Rome — Foodie',        price: '€420',  match: 94, tags: ['Culture', 'Food', 'History'],       desc: 'Pasta, gelato, and ancient ruins. A perfect long weekend escape.' },
    { title: '7 days in Bali — Adventure',     price: '£680',  match: 89, tags: ['Adventure', 'Nature', 'Wellness'],  desc: 'Rice terraces, temples, and surf breaks. Pure magic awaits.' },
    { title: 'Weekend in Lisbon — Solo',       price: '£310',  match: 92, tags: ['Solo', 'City', 'Food'],             desc: 'Pasteis de nata, fado music, and stunning river viewpoints.' },
    { title: '10 days in Japan — Culture',     price: '£1,240',match: 97, tags: ['Culture', 'History', 'Food'],       desc: 'Shinkansen, sakura, and sushi in Tokyo. An unforgettable journey.' },
    { title: '5 days in Santorini — Couples',  price: '€890',  match: 91, tags: ['Romance', 'Beach', 'Luxury'],       desc: 'Blue domes, sunsets, and sea-view dinners. Pure romance.' },
    { title: '3 days in Amsterdam — City',     price: '€370',  match: 88, tags: ['City', 'Art', 'Cycling'],           desc: 'Canals, Rijksmuseum, and endless stroopwafels.' },
    { title: '8 days in Morocco — Explorer',   price: '£620',  match: 93, tags: ['Adventure', 'Culture', 'Food'],     desc: 'Desert dunes, riads, and spice markets in Marrakech.' },
    { title: 'Weekend in Paris — Romantic',    price: '€480',  match: 96, tags: ['Romance', 'Art', 'Food'],           desc: 'Eiffel Tower, bistros, and bookshops along the Seine.' },
    { title: '6 days in Iceland — Nature',     price: '£950',  match: 90, tags: ['Nature', 'Adventure', 'Aurora'],    desc: 'Geysers, glaciers, and the northern lights overhead.' },
]

const VISIBLE = 3
const INTERVAL = 3800

export default function TripStories() {
    const [offset, setOffset] = useState(0)
    const [paused, setPaused] = useState(false)
    const [animating, setAnimating] = useState(false)

    const advance = () => {
        if (animating) return
        setAnimating(true)
        setOffset(o => (o + 1) % stories.length)
        setTimeout(() => setAnimating(false), 420)
    }

    const retreat = () => {
        if (animating) return
        setAnimating(true)
        setOffset(o => (o - 1 + stories.length) % stories.length)
        setTimeout(() => setAnimating(false), 420)
    }

    useEffect(() => {
        if (paused) return
        const t = setInterval(advance, INTERVAL)
        return () => clearInterval(t)
    }, [paused, animating]) // eslint-disable-line react-hooks/exhaustive-deps

    // Build the 3 visible cards by index (wrapping)
    const visible = Array.from({ length: VISIBLE }, (_, i) => stories[(offset + i) % stories.length])

    return (
        <div className="light-section">
            <section
                className="stories-section"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div className="section-inner">
                    <div className="section-eyebrow light">Trip Inspiration</div>
                    <h2 className="section-title light">Trips others loved</h2>

                    <div className="stories-carousel">
                        {/* Prev arrow */}
                        <button className="stories-arrow stories-arrow-left" onClick={retreat} aria-label="Previous">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="stories-track">
                            {visible.map((s, i) => (
                                <div
                                    key={`${offset}-${i}`}
                                    className={`story-card light-card ${i === 0 ? 'story-card-active' : ''}`}
                                    style={{ animationDelay: `${i * 60}ms` }}
                                >
                                    <div className="story-card-top">
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

                        {/* Next arrow */}
                        <button className="stories-arrow stories-arrow-right" onClick={advance} aria-label="Next">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Progress dots */}
                    <div className="stories-dots">
                        {stories.map((_, i) => (
                            <button
                                key={i}
                                className={`stories-dot ${i === offset ? 'stories-dot-active' : ''}`}
                                onClick={() => setOffset(i)}
                                aria-label={`Story ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <TravelQuote />
        </div>
    )
}
