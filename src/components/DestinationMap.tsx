'use client'
import { useState } from 'react'
import type { QuizAnswers } from './TripQuiz'

type Props = { answers: QuizAnswers }

const destinations = [
    { name: 'Lisbon', country: 'Portugal', flag: '🇵🇹', match: 92, price: '£487', bestMonth: 'May', tags: ['Foodie', 'Solo', 'City'] },
    { name: 'Bali', country: 'Indonesia', flag: '🇮🇩', match: 88, price: '£720', bestMonth: 'Jul', tags: ['Adventure', 'Nature', 'Wellness'] },
    { name: 'Santorini', country: 'Greece', flag: '🇬🇷', match: 85, price: '£650', bestMonth: 'Sep', tags: ['Relaxed', 'Beach', 'City'] },
    { name: 'Tokyo', country: 'Japan', flag: '🇯🇵', match: 79, price: '£890', bestMonth: 'Apr', tags: ['City', 'Food', 'Culture'] },
    { name: 'Marrakech', country: 'Morocco', flag: '🇲🇦', match: 83, price: '£390', bestMonth: 'Mar', tags: ['Adventure', 'Culture', 'Food'] },
    { name: 'Amalfi', country: 'Italy', flag: '🇮🇹', match: 90, price: '£560', bestMonth: 'Jun', tags: ['Relaxed', 'Beach', 'Food'] },
]

const filters = ['All', 'Beach', 'City', 'Food', 'Adventure']

export default function DestinationMap({ answers }: Props) {
    const [filter, setFilter] = useState('All')
    const [hovered, setHovered] = useState<string | null>(null)

    const visible = filter === 'All'
        ? destinations
        : destinations.filter(d => d.tags.some(t => t === filter))

    return (
        <section className="map-section">
            <div className="section-inner">
                <div className="section-eyebrow">Based on your answers</div>
                <h2 className="section-title">Your matching destinations</h2>
                <p className="section-subtitle">
                    AI matched {visible.length} places to your <strong>{answers.mood}</strong> style &amp; <strong>{answers.budget}</strong> budget
                </p>

                <div className="map-filters">
                    {filters.map(f => (
                        <button
                            key={f}
                            className={`map-filter ${filter === f ? 'map-filter-active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="map-grid">
                    {visible.map((dest, i) => (
                        <div
                            key={dest.name}
                            className="map-card"
                            style={{ animationDelay: `${i * 0.08}s` }}
                            onMouseEnter={() => setHovered(dest.name)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className="map-card-flag">{dest.flag}</div>
                            <div className="map-card-match">{dest.match}% match</div>
                            <h3 className="map-card-name">{dest.name}</h3>
                            <p className="map-card-country">{dest.country}</p>

                            {hovered === dest.name && (
                                <div className="map-card-tooltip">
                                    <p>✈ From {dest.price}</p>
                                    <p>🗓 Best time: {dest.bestMonth}</p>
                                    <p>💡 {dest.match}% match for {answers.mood} style</p>
                                </div>
                            )}

                            <div className="map-card-footer">
                                <span className="map-card-price">{dest.price}</span>
                                <button className="btn-plan">Plan this →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
