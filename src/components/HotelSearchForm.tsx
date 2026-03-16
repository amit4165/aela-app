'use client'
import { useState, useEffect, type FormEvent } from 'react'
import type { Deal } from '@/types/api'

interface HotelSearchFormProps {
    onResults: (deals: Deal[], query: string) => void
    onClose: () => void
}

export default function HotelSearchForm({ onResults, onClose }: HotelSearchFormProps) {
    const [animating, setAnimating] = useState(false)
    const [city, setCity] = useState('')
    const [checkin, setCheckin] = useState('')
    const [checkout, setCheckout] = useState('')
    const [adults, setAdults] = useState(2)
    const [rooms, setRooms] = useState(1)
    const [searching, setSearching] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const t = setTimeout(() => setAnimating(true), 10)
        return () => clearTimeout(t)
    }, [])

    const handleClose = () => {
        setAnimating(false)
        setTimeout(onClose, 300)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!city || !checkin || !checkout) return

        setSearching(true)
        setError(null)

        try {
            const params = new URLSearchParams({
                city,
                checkin,
                checkout,
                adults: String(adults),
                rooms: String(rooms),
                currency: 'USD',
            })

            const res = await fetch(`/api/hotels?${params}`)
            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.error || `Search failed (${res.status})`)
            }

            const { deals } = await res.json()
            const query = `hotels in ${city} check-in ${checkin} check-out ${checkout} for ${adults} adult${adults !== 1 ? 's' : ''}, ${rooms} room${rooms !== 1 ? 's' : ''}`

            onResults(deals ?? [], query)
            handleClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not find hotels. Please try again.')
        } finally {
            setSearching(false)
        }
    }

    const today = new Date().toISOString().split('T')[0]

    return (
        <div className="flight-overlay" onClick={handleClose}>
            <div
                className={`flight-form ${animating ? 'flight-form-open' : 'flight-form-close'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flight-form-handle" />

                <div className="flight-form-header">
                    <div>
                        <h3 className="flight-form-title">🏨 Search Hotels</h3>
                        <p className="flight-form-subtitle">Find the best hotels for your stay</p>
                    </div>
                    <button className="flight-form-close-btn" onClick={handleClose} aria-label="Close">✕</button>
                </div>

                <form className="flight-form-grid" onSubmit={handleSubmit}>
                    <div className="flight-field" style={{ gridColumn: '1 / -1' }}>
                        <label className="flight-label">Destination City</label>
                        <input
                            className="flight-input"
                            type="text"
                            placeholder="e.g. Paris, Tokyo, Dubai"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flight-field">
                        <label className="flight-label">Check-in</label>
                        <input
                            className="flight-input"
                            type="date"
                            min={today}
                            value={checkin}
                            onChange={e => setCheckin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flight-field">
                        <label className="flight-label">Check-out</label>
                        <input
                            className="flight-input"
                            type="date"
                            min={checkin || today}
                            value={checkout}
                            onChange={e => setCheckout(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flight-field">
                        <label className="flight-label">Adults</label>
                        <select className="flight-input" value={adults} onChange={e => setAdults(Number(e.target.value))}>
                            {[1, 2, 3, 4, 5, 6].map(n => (
                                <option key={n} value={n}>{n} adult{n !== 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flight-field">
                        <label className="flight-label">Rooms</label>
                        <select className="flight-input" value={rooms} onChange={e => setRooms(Number(e.target.value))}>
                            {[1, 2, 3, 4].map(n => (
                                <option key={n} value={n}>{n} room{n !== 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>

                    {error && (
                        <p style={{ color: 'var(--coral, #e55)', fontSize: '13px', margin: '4px 0', gridColumn: '1 / -1' }}>
                            {error}
                        </p>
                    )}

                    <div className="flight-form-footer">
                        <button
                            type="submit"
                            className="btn btn-primary flight-search-btn"
                            disabled={!city || !checkin || !checkout || searching}
                        >
                            {searching ? 'Searching…' : 'Search Hotels'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
