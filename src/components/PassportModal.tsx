'use client'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { completeOnboarding } from '@/lib/api'
import { detectLocale } from '@/lib/locale'
import { COUNTRIES } from '@/lib/countries'

interface PassportModalProps {
    onComplete: () => void
}

export default function PassportModal({ onComplete }: PassportModalProps) {
    const { getToken } = useAuth()
    const [country, setCountry] = useState('')
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSave = async () => {
        if (!country) return
        setSaving(true)
        setError(null)
        try {
            const token = await getToken()
            const { timezone, currency } = detectLocale()
            await completeOnboarding(token, {
                passport_country: country,
                detected_timezone: timezone,
                detected_currency: currency,
            })
            onComplete()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="passport-overlay">
            <div className="passport-modal passport-modal-open">
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
                            <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                        ))}
                    </select>
                </div>

                {error && (
                    <p style={{ color: 'var(--coral, #e55)', fontSize: '13px', margin: '8px 0 0' }}>
                        {error}
                    </p>
                )}

                <div className="passport-actions">
                    <button
                        className="btn btn-primary passport-save-btn"
                        onClick={handleSave}
                        disabled={!country || saving}
                    >
                        {saving ? 'Saving…' : 'Save & Continue'}
                    </button>
                </div>

                <p className="passport-note">
                    We won&apos;t ask many questions — Aela learns your preferences as you travel.
                </p>
            </div>
        </div>
    )
}
