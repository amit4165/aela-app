import { NextRequest, NextResponse } from 'next/server'

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!
const RAPIDAPI_HOST = 'kiwi-com-cheap-flights.p.rapidapi.com'

function toKiwiDate(yyyymmdd: string): string {
    const [y, m, d] = yyyymmdd.split('-')
    return `${d}/${m}/${y}`
}

const CABIN_MAP: Record<string, string> = {
    economy: 'M',
    'premium economy': 'W',
    business: 'C',
    first: 'F',
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const fly_from = searchParams.get('fly_from')
    const fly_to = searchParams.get('fly_to')
    const date_from = searchParams.get('date_from')
    const return_from = searchParams.get('return_from')
    const adults = searchParams.get('adults') || '1'
    const cabin = searchParams.get('cabin') || 'economy'
    const currency = searchParams.get('currency') || 'USD'

    if (!fly_from || !fly_to || !date_from) {
        return NextResponse.json({ error: 'Missing required params: fly_from, fly_to, date_from' }, { status: 400 })
    }

    const params = new URLSearchParams({
        fly_from,
        fly_to,
        date_from: toKiwiDate(date_from),
        date_to: toKiwiDate(date_from),
        adults,
        selected_cabins: CABIN_MAP[cabin] ?? 'M',
        curr: currency,
        limit: '10',
        sort: 'price',
    })

    if (return_from) {
        params.set('return_from', toKiwiDate(return_from))
        params.set('return_to', toKiwiDate(return_from))
    }

    try {
        const res = await fetch(`https://${RAPIDAPI_HOST}/v2/search?${params}`, {
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST,
            },
        })

        if (!res.ok) {
            const detail = await res.text()
            return NextResponse.json({ error: 'Kiwi API error', detail }, { status: res.status })
        }

        const json = await res.json()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const deals = (json.data ?? []).map((item: any) => {
            const durationMins = item.duration?.departure
                ? Math.round(item.duration.departure / 60)
                : undefined
            const stops = Math.max((item.route?.length ?? 1) - 1, 0)

            return {
                deal_type: 'flight',
                provider: (item.airlines ?? []).join(', ') || 'Unknown',
                price: item.price ?? 0,
                currency: json.currency ?? currency,
                risk_level: 'low',
                flags: [],
                data: {
                    origin: item.flyFrom ?? fly_from,
                    destination: item.flyTo ?? fly_to,
                    airline: item.airlines?.[0] ?? '',
                    airline_name: item.route?.[0]?.airline_name ?? '',
                    departure_time: item.local_departure,
                    arrival_time: item.local_arrival,
                    duration_minutes: durationMins,
                    stops,
                    deep_link: item.deep_link ?? null,
                },
            }
        })

        return NextResponse.json({ deals, currency: json.currency ?? currency, total: json._results ?? deals.length })
    } catch (err) {
        return NextResponse.json({ error: 'Failed to reach Kiwi API', detail: String(err) }, { status: 500 })
    }
}
