'use client'
import { useState } from 'react'

type Pace = 'Relaxed' | 'Moderate' | 'Fast'

const dayData = [
    { day: 1, label: 'Arrival Day', title: 'Arrive Lisbon', activities: ['Airport transfer (45 min)', 'Alfama walking tour (2h)', 'Rooftop dinner at Bairro Alto'], base: 120 },
    { day: 2, label: 'Day Trip', title: 'Sintra & Coast', activities: ['Morning train to Sintra (40 min)', 'Pena Palace tour (2h)', 'Cascais beach relax'], base: 85 },
    { day: 3, label: 'City Day', title: 'Belém & Riverside', activities: ['Belém Tower (1h)', 'Pasteis de Belém tasting', 'LX Factory market (2h)', 'Sunset cruise'], base: 110 },
    { day: 4, label: 'Departure', title: 'Morning & Fly Home', activities: ['Mercado da Ribeira breakfast', 'Souvenir shopping in Chiado', 'Airport transfer'], base: 65 },
]

const paceOffset: Record<Pace, number> = { Relaxed: -10, Moderate: 0, Fast: 22 }

export default function ItineraryEditor() {
    const [pace, setPace] = useState<Pace>('Moderate')
    const [regenerating, setRegenerating] = useState(false)
    const [saved, setSaved] = useState(false)

    const total = dayData.reduce((s, d) => s + d.base + paceOffset[pace], 0)

    const regen = () => {
        setRegenerating(true)
        setTimeout(() => setRegenerating(false), 1400)
    }

    const handlePace = (p: Pace) => {
        setPace(p)
        regen()
    }

    return (
        <section className="editor-section">
            <div className="section-inner">
                <div className="section-eyebrow">AI Suggestion · 92% match</div>
                <h2 className="section-title">Your 4-Day Lisbon Plan</h2>

                <div className="editor-controls">
                    <span className="editor-pace-label">Pace:</span>
                    {(['Relaxed', 'Moderate', 'Fast'] as Pace[]).map(p => (
                        <button
                            key={p}
                            className={`pace-btn ${pace === p ? 'pace-btn-active' : ''}`}
                            onClick={() => handlePace(p)}
                        >
                            {p}
                        </button>
                    ))}
                    <span className="editor-total">Est. £{total}</span>
                </div>

                <div className={`editor-days ${regenerating ? 'editor-regenerating' : ''}`}>
                    {dayData.map((d) => (
                        <div key={d.day} className="editor-day">
                            <div className="editor-day-marker">D{d.day}</div>
                            <div className="editor-day-body">
                                <div className="editor-day-label">{d.label}</div>
                                <h3 className="editor-day-title">{d.title}</h3>
                                <ul className="editor-activities">
                                    {d.activities.map((a, i) => <li key={i}>{a}</li>)}
                                </ul>
                                <div className="editor-day-footer">
                                    <span className="editor-day-cost">~£{d.base + paceOffset[pace]}</span>
                                    <button className="editor-swap-btn" onClick={regen}>⟳ Swap</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="editor-save-bar">
                    {saved ? (
                        <p className="editor-saved">✓ Saved! We&apos;ll alert you when flights drop 15%.</p>
                    ) : (
                        <>
                            <p className="editor-save-text">Love this plan? Save it and get flight drop alerts.</p>
                            <button className="editor-save-btn" onClick={() => setSaved(true)}>Save my trip →</button>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
