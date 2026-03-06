import type { Deal } from '../api/chat'

interface FlightDealsProps {
    deals: Deal[]
}

export default function FlightDeals({ deals }: FlightDealsProps) {
    if (!deals.length) return null

    return (
        <div style={{ marginTop: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
                {deals.length} flight{deals.length > 1 ? 's' : ''} found
            </p>
            <div className="deals-grid">
                {deals.map((deal, i) => (
                    <div key={i} className="deal-card">
                        <div className="deal-route">
                            <span>{deal.origin}</span>
                            <span className="deal-route-arrow">→</span>
                            <span>{deal.destination}</span>
                        </div>
                        <div className="deal-meta">
                            {deal.departureDate && <span>{deal.departureDate}</span>}
                            {deal.departureDate && deal.duration && <span> · </span>}
                            {deal.duration && <span>{deal.duration}</span>}
                        </div>
                        <div className="deal-price">${deal.price.toLocaleString()}</div>
                        {deal.airline && (
                            <div className="deal-airline">{deal.airline}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
