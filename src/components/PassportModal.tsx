'use client'
import { useState, useEffect } from 'react'

const PASSPORT_KEY = 'aela_passport_set'
const PASSPORT_COUNTRY_KEY = 'aela_passport_country'

const COUNTRIES = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
    'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia',
    'Croatia', 'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia', 'Finland',
    'France', 'Germany', 'Ghana', 'Greece', 'Hungary', 'India', 'Indonesia',
    'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kenya',
    'South Korea', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand',
    'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Romania', 'Russia', 'Saudi Arabia', 'Serbia', 'Singapore', 'South Africa',
    'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
    'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
    'Venezuela', 'Vietnam', 'Zimbabwe',
]

interface PassportModalProps {
    onComplete: (country: string) => void
}

export default function PassportModal({ onComplete }: PassportModalProps) {
    const [visible, setVisible] = useState(false)
    const [country, setCountry] = useState('')
    const [animating, setAnimating] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem(PASSPORT_KEY)) {
            const t = setTimeout(() => { setVisible(true); setAnimating(true) }, 900)
            return () => clearTimeout(t)
        }
    }, [])

    const handleSave = () => {
        if (!country) return
        localStorage.setItem(PASSPORT_KEY, '1')
        localStorage.setItem(PASSPORT_COUNTRY_KEY, country)
        setAnimating(false)
        setTimeout(() => { setVisible(false); onComplete(country) }, 300)
    }

    const handleSkip = () => {
        setAnimating(false)
        setTimeout(() => setVisible(false), 300)
    }

    if (!visible) return null

    return (
        <div className="passport-overlay">
            <div className={`passport-modal ${animating ? 'passport-modal-open' : 'passport-modal-close'}`}>
                <div className="passport-handle" />
                <div className="passport-header">
                    <div className="passport-icon">🛂</div>
                    <div>
                        <h3 className="passport-title">One quick thing</h3>
                        <p className="passport-subtitle">
                            Your passport country helps Aela filter visa requirements and personalise results.
                        </p>
                    </div>
                </div>

                <div className="passport-field">
                    <label className="passport-label">Passport Country *</label>
                    <select
                        className="passport-select"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    >
                        <option value="">Select your passport country…</option>
                        {COUNTRIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div className="passport-actions">
                    <button
                        className="btn btn-primary passport-save-btn"
                        onClick={handleSave}
                        disabled={!country}
                    >
                        Save &amp; Continue
                    </button>
                    <button className="passport-skip-btn" onClick={handleSkip}>
                        Skip for now
                    </button>
                </div>

                <p className="passport-note">
                    We won&apos;t ask many questions — Aela learns your preferences as you travel.
                </p>
            </div>
        </div>
    )
}
