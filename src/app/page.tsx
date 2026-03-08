import SearchBar from '@/components/SearchBar'

const floatingCities = [
    { name: 'Paris',     left: '4%',  bottom: '12%', delay: '0s',   duration: '14s' },
    { name: 'Tokyo',     left: '14%', bottom: '38%', delay: '3s',   duration: '11s', coral: true },
    { name: 'Bali',      left: '8%',  bottom: '62%', delay: '6s',   duration: '13s' },
    { name: 'Santorini', left: '24%', bottom: '18%', delay: '1.5s', duration: '16s', coral: true },
    { name: 'Maldives',  left: '34%', bottom: '52%', delay: '9s',   duration: '12s' },
    { name: 'Kyoto',     left: '54%', bottom: '22%', delay: '4s',   duration: '15s', coral: true },
    { name: 'Dubai',     left: '64%', bottom: '48%', delay: '7.5s', duration: '10s' },
    { name: 'New York',  left: '74%', bottom: '32%', delay: '2s',   duration: '13s', coral: true },
    { name: 'Rome',      left: '82%', bottom: '66%', delay: '5s',   duration: '14s' },
    { name: 'Barcelona', left: '88%', bottom: '14%', delay: '10s',  duration: '11s', coral: true },
    { name: 'Lisbon',    left: '44%', bottom: '72%', delay: '8s',   duration: '16s' },
    { name: 'Iceland',   left: '92%', bottom: '42%', delay: '0.5s', duration: '12s' },
]

const marqueeItems = [
    '✈ Paris', '· Tokyo', '· Bali', '· Santorini', '· Maldives',
    '· Kyoto', '· Dubai', '· New York', '· Rome', '· Barcelona',
    '· Lisbon', '· Iceland', '· Prague', '· Amalfi', '· Phuket',
    '· Cape Town', '· Rio', '· Sydney', '· Marrakech', '· Havana',
]

export default function LandingPage() {
    return (
        <div className="landing">
            {/* Animated background */}
            <div className="landing-bg" aria-hidden>
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                {floatingCities.map((city) => (
                    <span
                        key={city.name}
                        className={`dest-particle${city.coral ? ' dest-particle-coral' : ''}`}
                        style={{
                            left: city.left,
                            bottom: city.bottom,
                            animationDelay: city.delay,
                            animationDuration: city.duration,
                        }}
                    >
                        {city.name}
                    </span>
                ))}
            </div>

            {/* Hero */}
            <main className="hero">
                {/* Eyebrow */}
                <div className="hero-eyebrow">
                    <span>✦</span>
                    AI-Powered Travel Planning
                </div>

                {/* Headline */}
                <h1 className="hero-title">
                    You have one life.
                    <br />
                    <em>Where will you go next?</em>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle">
                    Aela plans flights, hotels, and full itineraries in seconds.
                    Just tell us where your heart is taking you.
                </p>

                {/* Search Bar */}
                <SearchBar />

                {/* Feature hints */}
                <div className="hero-features">
                    <div className="hero-feature"><span />Real-time flight deals</div>
                    <div className="hero-feature"><span />AI-crafted itineraries</div>
                    <div className="hero-feature"><span />Multi-city route planning</div>
                    <div className="hero-feature"><span />No booking fees</div>
                </div>

                {/* Destination marquee */}
                <div className="destinations-marquee" aria-hidden>
                    <div className="marquee-track">
                        {[...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span key={i} className="marquee-item">{item}</span>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
