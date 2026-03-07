import type { Deal } from '../api/chat'
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext'

interface FlightDealsProps {
    deals: Deal[]
    renderedCurrency?: CurrencyCode
    renderedRates?: Record<string, number> | null
}

export default function FlightDeals({ deals, renderedCurrency, renderedRates }: FlightDealsProps) {
    const { convert, format } = useCurrency()

    if (!deals.length) return null

    return (
        <div style={{ marginTop: '8px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
                {deals.length} flight{deals.length > 1 ? 's' : ''} found
            </p>
            <div className="deals-grid">
                {deals.map((deal, i) => {
                    const flightData = deal.data || {};

                    const origin = flightData.origin ?? 'Unknown';
                    const destination = flightData.destination ?? 'Unknown';
                    const airlineCode = flightData.airline ?? '';
                    const durationMins = flightData.duration_minutes;

                    // Format times (e.g. 2026-04-10T06:15:00 -> 06:15)
                    const formatTime = (dateTimeString?: string) => {
                        if (!dateTimeString) return '';
                        const date = new Date(dateTimeString);
                        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    };

                    const depTime = formatTime(flightData.departure_time);
                    const arrTime = formatTime(flightData.arrival_time);

                    // Format duration (e.g. 135 mins -> 2h 15m)
                    const formatDuration = (mins?: number) => {
                        if (!mins) return '';
                        const h = Math.floor(mins / 60);
                        const m = mins % 60;
                        return `${h}h ${m}m`;
                    };

                    const stops = flightData.stops ?? 0;
                    const stopsText = stops === 0 ? 'Direct' : `${stops} Stop${stops > 1 ? 's' : ''}`;

                    return (
                        <div key={i} className="deal-card">
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

                            <div className="deal-hover-drawer">
                                <button className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: '13px', borderRadius: '6px' }}>
                                    Select Flight
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
