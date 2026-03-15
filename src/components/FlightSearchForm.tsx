'use client'
import { useState, useEffect, useRef, type FormEvent } from 'react'
import { searchAirports } from '@/lib/api'
import type { AirportSuggestion } from '@/types/api'

interface FlightSearchFormProps {
    onSearch: (query: string) => void
    onClose: () => void
}

function AirportField({
    label,
    placeholder,
    value,
    onChange,
}: {
    label: string
    placeholder: string
    value: string
    onChange: (iata: string, display: string) => void
}) {
    const [display, setDisplay] = useState(value)
    const [suggestions, setSuggestions] = useState<AirportSuggestion[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function handleInputChange(val: string) {
        setDisplay(val)
        onChange('', val) // clear IATA until a suggestion is selected

        if (debounceRef.current) clearTimeout(debounceRef.current)

        if (val.trim().length < 2) {
            setSuggestions([])
            setIsOpen(false)
            return
        }

        debounceRef.current = setTimeout(async () => {
            try {
                const results = await searchAirports(val.trim())
                setSuggestions(results)
                setIsOpen(results.length > 0)
            } catch {
                setSuggestions([])
                setIsOpen(false)
            }
        }, 300)
    }

    function handleSelect(airport: AirportSuggestion) {
        const displayText = `${airport.name} (${airport.iata})`
        setDisplay(displayText)
        setSuggestions([])
        setIsOpen(false)
        onChange(airport.iata, displayText)
    }

    return (
        <div className="flight-field" ref={wrapperRef} style={{ position: 'relative' }}>
            <label className="flight-label">{label}</label>
            <input
                className="flight-input"
                type="text"
                placeholder={placeholder}
                value={display}
                onChange={e => handleInputChange(e.target.value)}
                autoComplete="off"
                required
            />
            {isOpen && suggestions.length > 0 && (
                <div className="airport-dropdown">
                    {suggestions.map(airport => (
                        <button
                            key={airport.iata}
                            type="button"
                            className="airport-dropdown-item"
                            onClick={() => handleSelect(airport)}
                        >
                            {airport.type === 'city' ? '🏙️' : '✈️'} {airport.name} ({airport.iata})
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function FlightSearchForm({ onSearch, onClose }: FlightSearchFormProps) {
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
        const origin = originIata || originDisplay
        const dest = destIata || destDisplay
        if (!origin || !dest || !departDate) return
        const pax = `${passengers} passenger${passengers !== 1 ? 's' : ''}`
        const dates = tripType === 'roundtrip' && returnDate
            ? `departing ${departDate} returning ${returnDate}`
            : `on ${departDate}`
        const query = `Search ${cabinClass} class flights from ${origin} to ${dest} ${dates} for ${pax}`
        onSearch(query)
        handleClose()
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
                    <div className="flight-form-footer">
                        <button
                            type="submit"
                            className="btn btn-primary flight-search-btn"
                            disabled={!canSubmit}
                        >
                            Search Flights
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
