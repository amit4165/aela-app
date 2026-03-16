'use client'
import { useState, useEffect, type FormEvent } from 'react'
import type { Deal } from '@/types/api'

interface FlightSearchFormProps {
    onResults: (deals: Deal[], query: string) => void
    onClose: () => void
}

export default function FlightSearchForm({ onResults, onClose }: FlightSearchFormProps) {
    const [animating, setAnimating] = useState(false)
    const [originIata, setOriginIata] = useState('')
    const [originDisplay, setOriginDisplay] = useState('')
    const [destIata, setDestIata] = useState('')
    const [destDisplay, setDestDisplay] = useState('')
    const [departDate, setDepartDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [passengers, setPassengers] = useState(1)
    const [cabinClass, setCabinClass] = useState('economy')
    const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip')
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
        if (!origin || !destination || !departDate) return

        setSearching(true)
        setError(null)

        try {
            const params = new URLSearchParams({
                fly_from: origin,
                fly_to: destination,
                date_from: departDate,
                adults: String(passengers),
                cabin: cabinClass,
                currency: 'USD',
            })
            if (tripType === 'roundtrip' && returnDate) {
                params.set('return_from', returnDate)
            }

            const res = await fetch(`/api/flights?${params}`)
            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.error || `Search failed (${res.status})`)
            }

            const { deals } = await res.json()

            const pax = `${passengers} passenger${passengers !== 1 ? 's' : ''}`
            const dates =
                tripType === 'roundtrip' && returnDate
                    ? `departing ${departDate} returning ${returnDate}`
                    : `on ${departDate}`
            const query = `${cabinClass} flights from ${origin} to ${destination} ${dates} for ${pax}`

            onResults(deals ?? [], query)
            handleClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not find flights. Please try again.')
        } finally {
            setSearching(false)
        }
    }

    const today = new Date().toISOString().split('T')[0]
    const canSubmit = (originIata || originDisplay) && (destIata || destDisplay) && departDate

    return (
        <div className="flight-overlay" onClick={handleClose}>
            <div
                className={`flight-form ${animating ? 'flight-form-open' : 'flight-form-close'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flight-form-handle" />

                <div className="flight-form-header">
                    <div>
                        <h3 className="flight-form-title">✈️ Search Flights</h3>
                        <p className="flight-form-subtitle">We&apos;ll find the best options for your journey</p>
                    </div>
                    <button className="flight-form-close-btn" onClick={handleClose} aria-label="Close">✕</button>
                </div>

                <div className="flight-trip-type">
                    <button
                        type="button"
                        className={`trip-type-btn ${tripType === 'roundtrip' ? 'trip-type-active' : ''}`}
                        onClick={() => setTripType('roundtrip')}
                    >
                        Round trip
                    </button>
                    <button
                        type="button"
                        className={`trip-type-btn ${tripType === 'oneway' ? 'trip-type-active' : ''}`}
                        onClick={() => setTripType('oneway')}
                    >
                        One way
                    </button>
                </div>

                <form className="flight-form-grid" onSubmit={handleSubmit}>
                    <AirportField
                        label="From"
                        placeholder="City or airport (e.g. London)"
                        value={originDisplay}
                        onChange={(iata, display) => { setOriginIata(iata); setOriginDisplay(display) }}
                    />
                    <AirportField
                        label="To"
                        placeholder="City or airport (e.g. Tokyo)"
                        value={destDisplay}
                        onChange={(iata, display) => { setDestIata(iata); setDestDisplay(display) }}
                    />
                    <div className="flight-field">
                        <label className="flight-label">Depart</label>
                        <input
                            className="flight-input"
                            type="date"
                            min={today}
                            value={departDate}
                            onChange={e => setDepartDate(e.target.value)}
                            required
                        />
                    </div>
                    {tripType === 'roundtrip' && (
                        <div className="flight-field">
                            <label className="flight-label">Return</label>
                            <input
                                className="flight-input"
                                type="date"
                                min={departDate || today}
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="flight-field">
                        <label className="flight-label">Passengers</label>
                        <select className="flight-input" value={passengers} onChange={e => setPassengers(Number(e.target.value))}>
                            {[1, 2, 3, 4, 5, 6].map(n => (
                                <option key={n} value={n}>{n} {n === 1 ? 'passenger' : 'passengers'}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flight-field">
                        <label className="flight-label">Cabin class</label>
                        <select className="flight-input" value={cabinClass} onChange={e => setCabinClass(e.target.value)}>
                            <option value="economy">Economy</option>
                            <option value="premium economy">Premium Economy</option>
                            <option value="business">Business</option>
                            <option value="first">First Class</option>
                        </select>
                    </div>

                    {error && (
                        <p style={{ color: 'var(--coral, #e55)', fontSize: '13px', margin: '4px 0' }}>
                            {error}
                        </p>
                    )}

                    <div className="flight-form-footer">
                        <button
                            type="submit"
                            className="btn btn-primary flight-search-btn"
                            disabled={!origin || !destination || !departDate || searching}
                        >
                            {searching ? 'Searching…' : 'Search Flights'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
