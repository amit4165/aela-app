'use client'

import { useEffect, useState } from 'react'
import type { ChatSession } from './ChatSidebar'

/* ── Destination → image mapping ─────────────────────────── */
const DEST_IMAGES: Array<{ keywords: string[]; url: string }> = [
    { keywords: ['japan', 'tokyo', 'kyoto', 'osaka', 'hiroshima', 'nara'], url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['italy', 'rome', 'venice', 'milan', 'florence', 'naples', 'sicily', 'amalfi'], url: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['france', 'paris', 'nice', 'lyon', 'bordeaux', 'marseille', 'provence'], url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['bali', 'indonesia', 'ubud', 'seminyak', 'lombok'], url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['beach', 'maldives', 'caribbean', 'tropical', 'island', 'coastline'], url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['iceland', 'aurora', 'northern lights', 'reykjavik'], url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['india', 'delhi', 'mumbai', 'goa', 'rajasthan', 'jaipur', 'agra', 'taj mahal'], url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['greece', 'santorini', 'athens', 'mykonos', 'crete', 'rhodes'], url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['thailand', 'bangkok', 'phuket', 'chiang mai', 'krabi', 'koh samui'], url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['new york', 'usa', 'america', 'chicago', 'los angeles', 'nyc', 'san francisco', 'miami'], url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['peru', 'machu picchu', 'lima', 'cusco', 'inca'], url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['spain', 'barcelona', 'madrid', 'seville', 'ibiza', 'valencia'], url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['safari', 'africa', 'kenya', 'tanzania', 'south africa', 'serengeti'], url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['dubai', 'uae', 'abu dhabi'], url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['portugal', 'lisbon', 'porto', 'algarve', 'madeira'], url: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['norway', 'fjord', 'bergen', 'oslo', 'scandinavia'], url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['australia', 'sydney', 'melbourne', 'great barrier reef'], url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['morocco', 'marrakech', 'casablanca', 'fez', 'sahara'], url: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['turkey', 'istanbul', 'cappadocia', 'ephesus', 'antalya'], url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['mexico', 'cancun', 'mexico city', 'tulum', 'oaxaca'], url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['canada', 'toronto', 'vancouver', 'banff', 'montreal', 'niagara'], url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['switzerland', 'alps', 'zurich', 'geneva', 'interlaken', 'lucerne'], url: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=500&h=340&fit=crop&auto=format' },
    { keywords: ['new zealand', 'auckland', 'queenstown', 'hobbit'], url: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=500&h=340&fit=crop&auto=format' },
]

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&h=340&fit=crop&auto=format'

function getDestinationImage(title: string): string {
    const lower = title.toLowerCase()
    for (const { keywords, url } of DEST_IMAGES) {
        if (keywords.some(k => lower.includes(k))) return url
    }
    return FALLBACK_IMAGE
}

/* ── Hardcoded "Get inspired" cards ─────────────────────────── */
const INSPIRED_CARDS = [
    { title: 'Iceland in Winter', subtitle: '7 days itinerary', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=260&fit=crop&auto=format', tag: 'Adventure' },
    { title: 'Buenos Aires', subtitle: 'Wine Bars & Nightlife', image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&h=260&fit=crop&auto=format', tag: 'Culture' },
    { title: 'Hiking the Dolomites', subtitle: 'Complete Trail Guide', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=260&fit=crop&auto=format', tag: 'Outdoors' },
    { title: 'Tokyo in Spring', subtitle: 'Cherry Blossom Season', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=260&fit=crop&auto=format', tag: 'City' },
    { title: 'Amalfi Coast Drive', subtitle: 'Villages & Viewpoints', image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=400&h=260&fit=crop&auto=format', tag: 'Scenic' },
    { title: 'Machu Picchu Trek', subtitle: 'Inca Trail Hike', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=260&fit=crop&auto=format', tag: 'Adventure' },
]

function MapIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
    )
}

interface Props {
    onSelect: (text: string) => void
    onMapOpen: (destination: string) => void
    recentChats: ChatSession[]
}

export default function DiscoveryPanel({ onSelect, onMapOpen, recentChats }: Props) {
    const [userCity, setUserCity] = useState<string | null>(null)
    const jumpBackChats = recentChats.slice(0, 3)

    /* ── Geolocation → reverse geocode for "For you in [City]" ── */
    useEffect(() => {
        if (!navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                if (!apiKey) return
                const { latitude, longitude } = pos.coords
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
                    .then(r => r.json())
                    .then(data => {
                        const cityComp = data.results
                            ?.flatMap((r: { address_components: Array<{ types: string[]; long_name: string }> }) => r.address_components ?? [])
                            ?.find((c: { types: string[]; long_name: string }) => c.types?.includes('locality'))
                        if (cityComp?.long_name) setUserCity(cityComp.long_name)
                    })
                    .catch(() => { /* silently ignore */ })
            },
            () => { /* permission denied — do nothing */ },
            { timeout: 6000 }
        )
    }, [])

    const forYouCards = userCity
        ? [
            { label: `Things to do in ${userCity}`, prompt: `What are the best things to do in ${userCity}?`, image: getDestinationImage(userCity) },
            { label: `Restaurants in ${userCity}`, prompt: `Best restaurants and food in ${userCity}`, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=260&fit=crop&auto=format' },
            { label: `Day trips from ${userCity}`, prompt: `Best day trips and excursions from ${userCity}`, image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=260&fit=crop&auto=format' },
        ]
        : null

    return (
        <aside className="discovery-panel">
            <div className="discovery-panel-inner">

                {/* For you in [City] */}
                {forYouCards && (
                    <section className="discovery-section">
                        <div className="discovery-section-header">
                            <span className="discovery-section-title">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 5 }}>
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                For you in <strong>&nbsp;{userCity}</strong>
                            </span>
                            <button className="discovery-map-btn" onClick={() => onMapOpen(userCity!)}>
                                <MapIcon />
                                <span>Map</span>
                            </button>
                        </div>
                        <div className="discovery-foryou-grid">
                            {forYouCards.map(card => (
                                <button
                                    key={card.label}
                                    className="discovery-foryou-card"
                                    onClick={() => onSelect(card.prompt)}
                                >
                                    <div
                                        className="discovery-foryou-image"
                                        style={{ backgroundImage: `url('${card.image}')` }}
                                    >
                                        <div className="discovery-inspired-overlay" />
                                        <div className="discovery-inspired-text">
                                            <div className="discovery-inspired-title">{card.label}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Jump back in */}
                {jumpBackChats.length > 0 && (
                    <section className="discovery-section">
                        <div className="discovery-section-header">
                            <span>Jump back in</span>
                            <button className="discovery-see-all">See all</button>
                        </div>
                        <div className="discovery-jump-image-grid">
                            {jumpBackChats.map(chat => (
                                <button
                                    key={chat.id}
                                    className="discovery-jump-image-card"
                                    onClick={() => onSelect(chat.title)}
                                >
                                    <div
                                        className="discovery-jump-image-bg"
                                        style={{ backgroundImage: `url('${getDestinationImage(chat.title)}')` }}
                                    >
                                        <div className="discovery-inspired-overlay" />
                                        <div className="discovery-jump-image-text">{chat.title}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Get inspired */}
                <section className="discovery-section">
                    <div className="discovery-section-header">
                        <span>Get inspired</span>
                        <button className="discovery-see-all">See all</button>
                    </div>
                    <div className="discovery-inspired-grid">
                        {INSPIRED_CARDS.map(card => (
                            <button
                                key={card.title}
                                className="discovery-inspired-card"
                                onClick={() => onSelect(`Plan a trip to ${card.title}`)}
                            >
                                <div
                                    className="discovery-inspired-image"
                                    style={{ backgroundImage: `url('${card.image}')` }}
                                >
                                    <div className="discovery-inspired-overlay" />
                                    <span className="discovery-inspired-tag">{card.tag}</span>
                                    <div className="discovery-inspired-text">
                                        <div className="discovery-inspired-title">{card.title}</div>
                                        <div className="discovery-inspired-subtitle">{card.subtitle}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </aside>
    )
}
