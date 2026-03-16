import type { ItineraryDay } from '@/types/api'
import { CurrencyCode } from '@/context/CurrencyContext'

interface ItineraryTimelineProps {
    days: ItineraryDay[]
    renderedCurrency?: CurrencyCode
    renderedRates?: Record<string, number> | null
}

export default function ItineraryTimeline({ days, renderedCurrency, renderedRates }: ItineraryTimelineProps) {
    if (!days.length) return null

    return (
        <div className="itinerary">
            <p className="itinerary-title">Your Itinerary</p>
            {days.map((day, i) => (
                <div key={i} className="itinerary-day">
                    <div className="day-marker">{day.day ?? i + 1}</div>
                    <div className="day-content">
                        <div className="day-label">
                            Day {day.day ?? i + 1}{day.date ? ` · ${day.date}` : ''}
                            {day.location ? ` · ${day.location}` : ''}
                        </div>
                        {day.title && <div className="day-title">{day.title}</div>}
                        {day.description && (
                            <div className="day-description">{day.description}</div>
                        )}
                        {day.activities && day.activities.length > 0 && (
                            <ul style={{ marginTop: '8px', paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                                {day.activities.map((act, j) => (
                                    <li key={j} style={{ marginBottom: '4px' }}>{act}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
