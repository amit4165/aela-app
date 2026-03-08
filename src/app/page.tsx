import SearchBar from '@/components/SearchBar'

const destPhotos = [
    {
        url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop&auto=format',
        label: 'Santorini',
        style: { width: 290, height: 210, top: '6%', left: '-3%', transform: 'rotate(-8deg)', animationDelay: '0.1s' },
    },
    {
        url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=660&fit=crop&auto=format',
        label: 'Bali',
        style: { width: 260, height: 340, top: '3%', right: '-4%', transform: 'rotate(7deg)', animationDelay: '0.3s' },
    },
    {
        url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=560&h=380&fit=crop&auto=format',
        label: 'Paris',
        style: { width: 260, height: 310, bottom: '4%', left: '-2%', transform: 'rotate(5deg)', animationDelay: '0.5s' },
    },
    {
        url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=660&h=440&fit=crop&auto=format',
        label: 'Maldives',
        style: { width: 330, height: 220, bottom: '5%', right: '-4%', transform: 'rotate(-6deg)', animationDelay: '0.4s' },
    },
    {
        url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=420&h=560&fit=crop&auto=format',
        label: 'Tokyo',
        style: { width: 200, height: 270, top: '30%', right: '1%', transform: 'rotate(3deg)', animationDelay: '0.6s' },
    },
    {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=420&h=560&fit=crop&auto=format',
        label: 'Dubai',
        style: { width: 200, height: 265, top: '35%', left: '1%', transform: 'rotate(-4deg)', animationDelay: '0.25s' },
    },
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
            {/* Photo collage background */}
            <div className="landing-bg" aria-hidden>
                {destPhotos.map((photo) => (
                    <div
                        key={photo.label}
                        className="dest-photo"
                        style={{
                            ...photo.style,
                            backgroundImage: `url('${photo.url}')`,
                            animationDelay: photo.style.animationDelay,
                        }}
                    />
                ))}
                {/* Center white overlay for hero readability */}
                <div className="landing-overlay" />
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
