'use client'
import { useState, useEffect, type FormEvent } from 'react'

interface FlightSearchFormProps {
    onSearch: (query: string) => void
    onClose: () => void
}

export default function FlightSearchForm({ onSearch, onClose }: FlightSearchFormProps) {
    const [animating, setAnimating] = useState(false)
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [departDate, setDepartDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [passengers, setPassengers] = useState(1)
    const [cabinClass, setCabinClass] = useState('economy')
    const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip')

    useEffect(() => {
        const t = setTimeout(() => setAnimating(true), 10)
        return () => clearTimeout(t)
    }, [])

    const handleClose = () => {
        setAnimating(false)
        setTimeout(onClose, 300)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!origin || !destination || !departDate) return
        const pax = `${passengers} passenger${passengers !== 1 ? 's' : ''}`
        const dates = tripType === 'roundtrip' && returnDate
            ? `departing ${departDate} returning ${returnDate}`
            : `on ${departDate}`
        const query = `Search ${cabinClass} class flights from ${origin} to ${destination} ${dates} for ${pax}`
        onSearch(query)
        handleClose()
    }

    // Min date = today
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
                    <div className="flight-field">
                        <label className="flight-label">From</label>
                        <input
                            className="flight-input"
                            type="text"
                            placeholder="City or airport (e.g. London)"
                            value={origin}
                            onChange={e => setOrigin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flight-field">
                        <label className="flight-label">To</label>
                        <input
                            className="flight-input"
                            type="text"
                            placeholder="City or airport (e.g. Tokyo)"
                            value={destination}
                            onChange={e => setDestination(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="flight-form-footer">
                        <button
                            type="submit"
                            className="btn btn-primary flight-search-btn"
                            disabled={!origin || !destination || !departDate}
                        >
                            Search Flights
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
