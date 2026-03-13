'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const features = [
    {
        icon: '🗳️',
        title: 'Vote on flights together',
        desc: 'Everyone sees the same options. Thumbs up, thumbs down — majority rules.',
    },
    {
        icon: '⚡',
        title: 'Live updates, no refresh',
        desc: "One person votes and everyone's screen updates instantly. No WhatsApp chaos.",
    },
    {
        icon: '🔗',
        title: 'One link, everyone in',
        desc: 'Share a single link. No sign-up needed for friends. Just tap and join.',
    },
    {
        icon: '📋',
        title: 'Shared itinerary',
        desc: 'Hotels, flights, and activities — all in one place the whole group can see.',
    },
]

// Simulated live vote animation
const FLIGHTS = [
    { label: 'Air India · DEL → LHR', price: '₹48,200', color: '#006A4D' },
    { label: 'Emirates · DEL → LHR',  price: '₹44,500', color: '#005540' },
    { label: 'British Airways · DEL → LHR', price: '₹52,800', color: '#004030' },
]

const MEMBERS = ['A', 'S', 'P', 'R', 'M']

function generateRoomId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
}

export default function GroupSection() {
    const router = useRouter()
    const [votes, setVotes] = useState([2, 3, 1])
    const [activeVote, setActiveVote] = useState<number | null>(null)
    const tickRef = useRef(0)

    // Animate a random vote every 2.2s to simulate live activity
    useEffect(() => {
        const t = setInterval(() => {
            const idx = Math.floor(Math.random() * FLIGHTS.length)
            setActiveVote(idx)
            setVotes(v => v.map((c, i) => i === idx ? c + 1 : c))
            setTimeout(() => setActiveVote(null), 600)
            tickRef.current++
            // Reset counts every 15 ticks so it doesn't balloon
            if (tickRef.current % 15 === 0) setVotes([2, 3, 1])
        }, 2200)
        return () => clearInterval(t)
    }, [])

    const handleCreate = () => {
        router.push(`/trip-room/${generateRoomId()}`)
    }

    return (
        <section className="group-section">
            {/* Background decoration */}
            <div className="group-bg-deco" aria-hidden />

            <div className="group-inner">
                {/* Left — copy */}
                <div className="group-copy">
                    <div className="group-eyebrow">Group Travel</div>
                    <h2 className="group-headline">
                        Your squad deserves<br />
                        <em>a plan, not a poll.</em>
                    </h2>
                    <p className="group-subtext">
                        Stop losing flight links in group chats. Aela's Group Trip Room gives
                        everyone a shared space to vote on flights, lock in dates, and book
                        together — all in real time.
                    </p>

                    <div className="group-features">
                        {features.map((f, i) => (
                            <div key={i} className="group-feature">
                                <span className="group-feature-icon">{f.icon}</span>
                                <div>
                                    <div className="group-feature-title">{f.title}</div>
                                    <div className="group-feature-desc">{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="group-cta" onClick={handleCreate}>
                        Create a Group Room
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Right — live demo card */}
                <div className="group-demo">
                    <div className="group-demo-card">
                        <div className="group-demo-header">
                            <div className="group-demo-title">Trip to London ✈️</div>
                            <div className="group-demo-live">
                                <span className="group-live-dot" />
                                Live
                            </div>
                        </div>

                        {/* Members */}
                        <div className="group-demo-members">
                            {MEMBERS.map((m, i) => (
                                <div key={i} className="group-demo-avatar">{m}</div>
                            ))}
                            <div className="group-demo-avatar group-demo-avatar-add">+2</div>
                        </div>
                        <div className="group-demo-members-label">7 members in this room</div>

                        {/* Flight votes */}
                        <div className="group-demo-flights">
                            {FLIGHTS.map((f, i) => {
                                const total = votes.reduce((a, b) => a + b, 0)
                                const pct = Math.round((votes[i] / total) * 100)
                                const isActive = activeVote === i
                                const isTop = votes[i] === Math.max(...votes)
                                return (
                                    <div key={i} className={`group-demo-flight ${isActive ? 'group-demo-flight-pulse' : ''} ${isTop ? 'group-demo-flight-top' : ''}`}>
                                        <div className="group-demo-flight-row">
                                            <span className="group-demo-flight-label">{f.label}</span>
                                            <span className="group-demo-flight-price">{f.price}</span>
                                        </div>
                                        <div className="group-demo-bar-wrap">
                                            <div
                                                className="group-demo-bar"
                                                style={{ width: `${pct}%`, background: f.color }}
                                            />
                                        </div>
                                        <div className="group-demo-vote-row">
                                            <span className="group-demo-vote-count">{votes[i]} vote{votes[i] !== 1 ? 's' : ''}</span>
                                            {isTop && <span className="group-demo-top-badge">Top pick</span>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="group-demo-footer">
                            Votes update live for everyone in the room
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
