'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

// Pure SVG icons — no emoji
const IconVote = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
)

const IconSignal = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h.01M7 20v-4M12 20V10M17 20V4M22 20v-2" />
    </svg>
)

const IconShare = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" />
    </svg>
)

const IconMap = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
)

const IconPlane = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l4.5 4.5-1 3.5 3.5-1 4.5 4.5z" />
    </svg>
)

const features = [
    { Icon: IconVote,   title: 'Group voting, live',       desc: 'Every member sees the same flights. One tap to vote — results shift in real time.' },
    { Icon: IconSignal, title: 'No page refresh needed',   desc: 'The moment someone votes, every screen in the room updates. No chaos, no confusion.' },
    { Icon: IconShare,  title: 'One link to share',        desc: 'Send one link. Friends tap it, they\'re in. No account required to join a room.' },
    { Icon: IconMap,    title: 'Full shared itinerary',    desc: 'Flights, hotels, activities — all visible to every member, always in sync.' },
]

const FLIGHTS = [
    { label: 'Air India', route: 'DEL → LHR', price: '₹48,200' },
    { label: 'Emirates',  route: 'DEL → LHR', price: '₹44,500' },
    { label: 'British Airways', route: 'DEL → LHR', price: '₹52,800' },
]

const MEMBER_COLORS = ['#006A4D', '#005540', '#007a59', '#00916a', '#004d38']
const MEMBERS = ['A', 'S', 'P', 'R', 'M']

function generateRoomId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
}

export default function GroupSection() {
    const router = useRouter()
    const [votes, setVotes] = useState([2, 3, 1])
    const [activeVote, setActiveVote] = useState<number | null>(null)
    const tickRef = useRef(0)

    useEffect(() => {
        const t = setInterval(() => {
            const idx = Math.floor(Math.random() * FLIGHTS.length)
            setActiveVote(idx)
            setVotes(v => v.map((c, i) => i === idx ? c + 1 : c))
            setTimeout(() => setActiveVote(null), 700)
            tickRef.current++
            if (tickRef.current % 15 === 0) setVotes([2, 3, 1])
        }, 2400)
        return () => clearInterval(t)
    }, [])

    const handleCreate = () => router.push(`/trip-room/${generateRoomId()}`)

    const total = votes.reduce((a, b) => a + b, 0)
    const topIdx = votes.indexOf(Math.max(...votes))

    return (
        <section className="group-section">
            <div className="group-bg-deco" aria-hidden />

            <div className="group-inner">
                {/* ── Left copy ── */}
                <div className="group-copy">
                    <div className="group-eyebrow">
                        <span className="group-eyebrow-line" />
                        Group Travel
                    </div>

                    <h2 className="group-headline">
                        Your squad deserves<br />
                        <em>a plan, not a poll.</em>
                    </h2>

                    <p className="group-subtext">
                        Stop drowning in group chats. Aela gives your whole group
                        one shared space — vote on flights, align on dates, and book
                        together without the back-and-forth.
                    </p>

                    <div className="group-features">
                        {features.map(({ Icon, title, desc }, i) => (
                            <div key={i} className="group-feature">
                                <div className="group-feature-icon-wrap">
                                    <Icon />
                                </div>
                                <div>
                                    <div className="group-feature-title">{title}</div>
                                    <div className="group-feature-desc">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="group-cta" onClick={handleCreate}>
                        Start a Group Room
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* ── Right demo ── */}
                <div className="group-demo">
                    <div className="group-demo-card">

                        {/* Card header */}
                        <div className="group-demo-header">
                            <div className="group-demo-header-left">
                                <div className="group-demo-plane"><IconPlane /></div>
                                <div>
                                    <div className="group-demo-title">London</div>
                                    <div className="group-demo-route">DEL → LHR · 6 nights</div>
                                </div>
                            </div>
                            <div className="group-demo-live">
                                <span className="group-live-dot" />
                                Live
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="group-demo-divider" />

                        {/* Members */}
                        <div className="group-demo-member-row">
                            <div className="group-demo-avatars">
                                {MEMBERS.map((m, i) => (
                                    <div
                                        key={i}
                                        className="group-demo-avatar"
                                        style={{ background: MEMBER_COLORS[i], marginLeft: i > 0 ? '-8px' : '0' }}
                                    >
                                        {m}
                                    </div>
                                ))}
                                <div className="group-demo-avatar group-demo-avatar-add" style={{ marginLeft: '-8px' }}>+2</div>
                            </div>
                            <span className="group-demo-member-count">7 travelling</span>
                        </div>

                        {/* Section label */}
                        <div className="group-demo-section-label">Flight options</div>

                        {/* Flights */}
                        <div className="group-demo-flights">
                            {FLIGHTS.map((f, i) => {
                                const pct = Math.round((votes[i] / total) * 100)
                                const isActive = activeVote === i
                                const isTop = i === topIdx
                                return (
                                    <div
                                        key={i}
                                        className={`group-demo-flight${isTop ? ' group-demo-flight-top' : ''}${isActive ? ' group-demo-flight-pulse' : ''}`}
                                    >
                                        <div className="group-demo-flight-top-row">
                                            <div className="group-demo-flight-info">
                                                <span className="group-demo-airline">{f.label}</span>
                                                <span className="group-demo-flight-route">{f.route}</span>
                                            </div>
                                            <div className="group-demo-flight-right">
                                                {isTop && <span className="group-demo-top-badge">Top pick</span>}
                                                <span className="group-demo-flight-price">{f.price}</span>
                                            </div>
                                        </div>
                                        <div className="group-demo-bar-wrap">
                                            <div className="group-demo-bar" style={{ width: `${pct}%` }} />
                                        </div>
                                        <div className="group-demo-vote-label">
                                            {votes[i]} vote{votes[i] !== 1 ? 's' : ''}
                                            {isActive && <span className="group-demo-new-vote"> +1</span>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="group-demo-footer">
                            Results update instantly across all devices
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
