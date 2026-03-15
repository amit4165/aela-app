import type { Deal } from '@/types/api'
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext'

interface FlightDealsProps {
    deals: Deal[]
    renderedCurrency?: CurrencyCode
    renderedRates?: Record<string, number> | null
}

function calcCO2(durationMins: number): number {
    const speedKmh = durationMins < 180 ? 750 : durationMins < 480 ? 850 : 900
    const factor = durationMins < 180 ? 0.115 : durationMins < 480 ? 0.095 : 0.080
    return Math.round((durationMins / 60) * speedKmh * factor)
}

function CO2Badge({ durationMins }: { durationMins?: number }) {
    if (!durationMins) return null
    const kg = calcCO2(durationMins)
    const isGreen = kg < 150
    const isRed = kg > 400
    const color = isGreen ? '#22c55e' : isRed ? '#f97316' : '#FBBF24'
    const bg = isGreen ? 'rgba(34,197,94,0.1)' : isRed ? 'rgba(249,115,22,0.1)' : 'rgba(251,191,36,0.1)'
    const label = isGreen ? 'Low emission' : isRed ? 'High emission' : 'Avg emission'
    return (
        <div className="co2-badge" style={{ background: bg, borderColor: color }}>
            <span style={{ color }}>🌿 {kg} kg CO₂</span>
            <span className="co2-label" style={{ color }}>{label}</span>
        </div>
    )
}

function FlightDealCard({ deal, renderedCurrency, renderedRates, convert, format }: {
    deal: Deal
    renderedCurrency?: CurrencyCode
    renderedRates?: Record<string, number> | null
    convert: (amount: number, currency?: CurrencyCode, rates?: Record<string, number> | null) => number
    format: (amount: number, currency?: CurrencyCode) => string
}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flightData = (deal.data as any) || {}

    const origin = flightData.origin ?? 'Unknown'
    const destination = flightData.destination ?? 'Unknown'
    const airlineCode = flightData.airline ?? ''
    const durationMins = flightData.duration_minutes

    const formatTime = (dateTimeString?: string) => {
        if (!dateTimeString) return ''
        const date = new Date(dateTimeString)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const depTime = formatTime(flightData.departure_time)
    const arrTime = formatTime(flightData.arrival_time)

    const formatDuration = (mins?: number) => {
        if (!mins) return ''
        const h = Math.floor(mins / 60)
        const m = mins % 60
        return `${h}h ${m}m`
    }

    const stops = flightData.stops ?? 0
    const stopsText = stops === 0 ? 'Direct' : `${stops} Stop${stops > 1 ? 's' : ''}`

    return (
        <div className="deal-card">
            <div className="deal-route">
                <span>{origin}</span>
                <span className="deal-route-arrow" style={{ fontSize: '16px' }}>✈️</span>
                <span>{destination}</span>
            </div>
            <div className="deal-meta">
                {depTime && arrTime && (
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                        <strong>{depTime}</strong> - <strong>{arrTime}</strong>
                    </span>
                )}
                {durationMins && (
                    <>
                        <span> · </span>
                        <span>{formatDuration(durationMins)}</span>
                    </>
                )}
            </div>
            <div className="deal-price">
                {format(convert(deal.price, renderedCurrency, renderedRates), renderedCurrency)}
            </div>
            <div className="deal-airline">
                <strong>{airlineCode}</strong> • {stopsText}
            </div>
            <CO2Badge durationMins={durationMins} />
            <div className="deal-hover-drawer">
                <button className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: '13px', borderRadius: '6px' }}>
                    Select Flight
                </button>
            </div>
        </div>
    )
}

function HotelDealCard({ deal, renderedCurrency, renderedRates, convert, format }: {
    deal: Deal
    renderedCurrency?: CurrencyCode
    renderedRates?: Record<string, number> | null
    convert: (amount: number, currency?: CurrencyCode, rates?: Record<string, number> | null) => number
    format: (amount: number, currency?: CurrencyCode) => string
}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = (deal.data as any) || {}
    const stars = Math.min(Math.max(Math.round(d.stars ?? 0), 0), 5)
    const amenities: string[] = d.amenities ?? []

    return (
        <div className="deal-card">
            <div className="deal-route">
                <span>🏨 {d.name ?? deal.provider}</span>
            </div>
            <div className="deal-meta">
                <span>{'⭐'.repeat(stars)}</span>
                {d.rating && (
                    <span> · {d.rating}/10{d.review_count ? ` (${d.review_count} reviews)` : ''}</span>
                )}
            </div>
            <div className="deal-price">
                {format(convert(deal.price, renderedCurrency, renderedRates), renderedCurrency)}
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '4px' }}>/night</span>
            </div>
            {amenities.length > 0 && (
                <div className="deal-airline">
                    {amenities.slice(0, 3).join(' · ')}
                </div>
            )}
            <div className="deal-hover-drawer">
                <button className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: '13px', borderRadius: '6px' }}>
                    View Hotel
                </button>
            </div>
        </div>
    )
}

function ActivityDealCard({ deal, renderedCurrency, renderedRates, convert, format }: {
    deal: Deal
    renderedCurrency?: CurrencyCode
    renderedRates?: Record<string, number> | null
    convert: (amount: number, currency?: CurrencyCode, rates?: Record<string, number> | null) => number
    format: (amount: number, currency?: CurrencyCode) => string
}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = (deal.data as any) || {}
    const durationH = d.duration_mins ? Math.round(d.duration_mins / 60) : null

    return (
        <div className="deal-card">
            <div className="deal-route">
                <span>🎟️ {d.name ?? deal.provider}</span>
            </div>
            {d.description && (
                <div className="deal-meta" style={{ fontSize: '13px' }}>
                    {d.description}
                </div>
            )}
            <div className="deal-meta">
                {durationH && <span>{durationH}h</span>}
                {d.rating && <span>{durationH ? ' · ' : ''}{d.rating}★</span>}
            </div>
            <div className="deal-price">
                {deal.price === 0 ? 'Free' : format(convert(deal.price, renderedCurrency, renderedRates), renderedCurrency)}
            </div>
            <div className="deal-hover-drawer">
                <button className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: '13px', borderRadius: '6px' }}>
                    Book Activity
                </button>
            </div>
        </div>
    )
}

export default function FlightDeals({ deals, renderedCurrency, renderedRates }: FlightDealsProps) {
    const { convert, format } = useCurrency()

    if (!deals.length) return null

    const sharedProps = { renderedCurrency, renderedRates, convert, format }

    return (
        <div style={{ marginTop: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
                {deals.length} result{deals.length > 1 ? 's' : ''} found
            </p>
            <div className="deals-grid">
                {deals.map((deal, i) => {
                    if (deal.deal_type === 'hotel') {
                        return <HotelDealCard key={i} deal={deal} {...sharedProps} />
                    }
                    if (deal.deal_type === 'activity') {
                        return <ActivityDealCard key={i} deal={deal} {...sharedProps} />
                    }
                    // flight or package
                    return <FlightDealCard key={i} deal={deal} {...sharedProps} />
                })}
            </div>
        </div>
    )
}
