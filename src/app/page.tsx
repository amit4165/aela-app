import SearchBar from '@/components/SearchBar'

export default function LandingPage() {
    return (
        <div className="landing">
            {/* Animated background */}
            <div className="landing-bg" aria-hidden>
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
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
            </main>
        </div>
    )
}
