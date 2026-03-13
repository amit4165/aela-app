'use client'
import TravelQuote from './TravelQuote'
import GroupSection from './GroupSection'

const stories = [
    { title: '4 days in Rome — Foodie',        price: '€420',   match: 94, tags: ['Culture', 'Food', 'History'],      desc: 'Pasta, gelato, and ancient ruins. A perfect long weekend escape.' },
    { title: '7 days in Bali — Adventure',     price: '£680',   match: 89, tags: ['Adventure', 'Nature', 'Wellness'], desc: 'Rice terraces, temples, and surf breaks. Pure magic awaits.' },
    { title: 'Weekend in Lisbon — Solo',       price: '£310',   match: 92, tags: ['Solo', 'City', 'Food'],            desc: 'Pasteis de nata, fado music, and stunning river viewpoints.' },
    { title: '10 days in Japan — Culture',     price: '£1,240', match: 97, tags: ['Culture', 'History', 'Food'],      desc: 'Shinkansen, sakura, and sushi in Tokyo. An unforgettable journey.' },
    { title: '5 days in Santorini — Couples',  price: '€890',   match: 91, tags: ['Romance', 'Beach', 'Luxury'],      desc: 'Blue domes, sunsets, and sea-view dinners. Pure romance.' },
    { title: '3 days in Amsterdam — City',     price: '€370',   match: 88, tags: ['City', 'Art', 'Cycling'],          desc: 'Canals, Rijksmuseum, and endless stroopwafels.' },
    { title: '8 days in Morocco — Explorer',   price: '£620',   match: 93, tags: ['Adventure', 'Culture', 'Food'],    desc: 'Desert dunes, riads, and spice markets in Marrakech.' },
    { title: 'Weekend in Paris — Romantic',    price: '€480',   match: 96, tags: ['Romance', 'Art', 'Food'],          desc: 'Eiffel Tower, bistros, and bookshops along the Seine.' },
    { title: '6 days in Iceland — Nature',     price: '£950',   match: 90, tags: ['Nature', 'Adventure', 'Aurora'],   desc: 'Geysers, glaciers, and the northern lights overhead.' },
]

// Duplicate for seamless infinite loop
const loop = [...stories, ...stories]

export default function TripStories() {
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
                                    <span className="story-price">{s.price}</span>
                                    <button className="story-primary">Try this style</button>
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
