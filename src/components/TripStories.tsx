'use client'
import TravelQuote from './TravelQuote'
import GroupSection from './GroupSection'

const stories = [
    { title: '4 days in Rome — Foodie',        basePriceUsd: 460,   match: 94, tags: ['Culture', 'Food', 'History'],      desc: 'Pasta, gelato, and ancient ruins. A perfect long weekend escape.' },
    { title: '7 days in Bali — Adventure',     basePriceUsd: 860,   match: 89, tags: ['Adventure', 'Nature', 'Wellness'], desc: 'Rice terraces, temples, and surf breaks. Pure magic awaits.' },
    { title: 'Weekend in Lisbon — Solo',       basePriceUsd: 390,   match: 92, tags: ['Solo', 'City', 'Food'],            desc: 'Pasteis de nata, fado music, and stunning river viewpoints.' },
    { title: '10 days in Japan — Culture',     basePriceUsd: 1570, match: 97, tags: ['Culture', 'History', 'Food'],      desc: 'Shinkansen, sakura, and sushi in Tokyo. An unforgettable journey.' },
    { title: '5 days in Santorini — Couples',  basePriceUsd: 980,   match: 91, tags: ['Romance', 'Beach', 'Luxury'],      desc: 'Blue domes, sunsets, and sea-view dinners. Pure romance.' },
    { title: '3 days in Amsterdam — City',     basePriceUsd: 410,   match: 88, tags: ['City', 'Art', 'Cycling'],          desc: 'Canals, Rijksmuseum, and endless stroopwafels.' },
    { title: '8 days in Morocco — Explorer',   basePriceUsd: 780,   match: 93, tags: ['Adventure', 'Culture', 'Food'],    desc: 'Desert dunes, riads, and spice markets in Marrakech.' },
    { title: 'Weekend in Paris — Romantic',    basePriceUsd: 530,   match: 96, tags: ['Romance', 'Art', 'Food'],          desc: 'Eiffel Tower, bistros, and bookshops along the Seine.' },
    { title: '6 days in Iceland — Nature',     basePriceUsd: 1200,   match: 90, tags: ['Nature', 'Adventure', 'Aurora'],   desc: 'Geysers, glaciers, and the northern lights overhead.' },
]

// Duplicate for seamless infinite loop
const loop = [...stories, ...stories]

import { useRouter } from 'next/navigation'
import { useCurrency } from '@/context/CurrencyContext'

export default function TripStories() {
    const router = useRouter()
    const { format, convert } = useCurrency()

    return (
        <div className="light-section">
            <section className="stories-section">
                <div className="section-inner">
                    <div className="section-eyebrow light">Trip Inspiration</div>
                    <h2 className="section-title light">Trips others loved</h2>
                </div>

                {/* Full-width scrolling strip — no max-width constraint */}
                <div className="stories-belt">
                    <div className="stories-belt-track">
                        {loop.map((s, i) => (
                            <div key={i} className="story-card light-card">
                                <div className="story-card-top">
                                    <div className="story-match">
                                        <span className="story-match-num">{s.match}%</span>
                                        <span className="story-match-label"> match</span>
                                    </div>
                                    <div className="story-stars">⭐⭐⭐⭐⭐</div>
                                    <h3 className="story-title light">{s.title}</h3>
                                    <p className="story-desc light">{s.desc}</p>
                                    <div className="story-tags">
                                        {s.tags.map(t => <span key={t} className="story-tag light-tag">{t}</span>)}
                                    </div>
                                </div>
                                <div className="story-footer">
                                    <span className="story-price">{format(convert(s.basePriceUsd))}</span>
                                    <button className="story-primary" onClick={() => router.push(`/chat?q=I want to plan a ${s.title} trip`)}>Try this style</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TravelQuote />
            <GroupSection />
        </div>
    )
}
