import { NextRequest, NextResponse } from 'next/server'

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!
const RAPIDAPI_HOST = 'booking-com.p.rapidapi.com'

async function getDestinationId(city: string): Promise<string | null> {
    const res = await fetch(
        `https://${RAPIDAPI_HOST}/v1/hotels/locations?name=${encodeURIComponent(city)}&locale=en-gb`,
        {
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST,
            },
        },
    )
    if (!res.ok) return null
    const data = await res.json()
    const first = (data ?? []).find((d: { dest_type: string }) => d.dest_type === 'city' || d.dest_type === 'region')
    return first?.dest_id ?? data?.[0]?.dest_id ?? null
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const city = searchParams.get('city')
    const checkin = searchParams.get('checkin')
    const checkout = searchParams.get('checkout')
    const adults = searchParams.get('adults') || '2'
    const rooms = searchParams.get('rooms') || '1'
    const currency = searchParams.get('currency') || 'USD'

    if (!city || !checkin || !checkout) {
        return NextResponse.json({ error: 'Missing required params: city, checkin, checkout' }, { status: 400 })
    }

    try {
        const dest_id = await getDestinationId(city)
        if (!dest_id) {
            return NextResponse.json({ error: `Could not find destination: ${city}` }, { status: 404 })
        }

        const params = new URLSearchParams({
            dest_id,
            dest_type: 'city',
            checkin_date: checkin,
            checkout_date: checkout,
            adults_number: adults,
            room_number: rooms,
            order_by: 'popularity',
            locale: 'en-gb',
            currency,
            units: 'metric',
            filter_by_currency: currency,
            page_number: '0',
        })

        const res = await fetch(`https://${RAPIDAPI_HOST}/v1/hotels/search?${params}`, {
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST,
            },
        })

        if (!res.ok) {
            const detail = await res.text()
            return NextResponse.json({ error: 'Booking API error', detail }, { status: res.status })
        }

        const json = await res.json()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const deals = (json.result ?? []).slice(0, 10).map((item: any) => {
            const pricePerNight = item.min_total_price
                ? Math.round(item.min_total_price / Math.max(item.nights ?? 1, 1))
                : item.price_breakdown?.gross_price ?? 0

            return {
                deal_type: 'hotel',
                provider: item.hotel_name ?? 'Unknown Hotel',
                price: pricePerNight,
                currency,
                risk_level: 'low',
                flags: [],
                data: {
                    name: item.hotel_name,
                    stars: item.class ?? 0,
                    rating: item.review_score ? Math.round(item.review_score * 10) / 10 : null,
                    review_count: item.review_nr ?? 0,
                    amenities: item.unit_configuration_label ? [item.unit_configuration_label] : [],
                    address: item.address ?? '',
                    city: item.city ?? city,
                    photo: item.max_photo_url ?? null,
                    deep_link: item.url ?? null,
                    checkin,
                    checkout,
                },
            }
        })

        return NextResponse.json({ deals, currency, total: json.total_count_with_filters ?? deals.length })
    } catch (err) {
        return NextResponse.json({ error: 'Failed to reach Booking API', detail: String(err) }, { status: 500 })
    }
}
