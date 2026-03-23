'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const IconPlane = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l4.5 4.5-1 3.5 3.5-1 4.5 4.5z" />
    </svg>
)

const pillars = [
    {
        num: '01',
        title: 'Vote together',
        desc: 'Everyone in the room sees the exact same options. Majority rules — no screenshots, no forwarded links.',
    },
    {
        num: '02',
        title: 'No refresh',
        desc: 'One person votes and every screen in the room shifts instantly. Real-time, no WhatsApp chaos.',
    },
    {
        num: '03',
        title: 'One link',
        desc: 'Send a single link. Friends tap and they\'re inside — no account, no download, no friction.',
    },
]

const FLIGHTS = [
    { label: 'Air India', code: 'AI·102', route: 'DEL → LHR', basePriceUsd: 580 },
    { label: 'Emirates',  code: 'EK·501', route: 'DEL → LHR', basePriceUsd: 530 },
    { label: 'British Airways', code: 'BA·256', route: 'DEL → LHR', basePriceUsd: 630 },
]

const MEMBERS = [
    { init: 'A', color: '#006A4D' },
    { init: 'S', color: '#005540' },
    { init: 'P', color: '#007a59' },
    { init: 'R', color: '#004d38' },
    { init: 'M', color: '#00916a' },
]

function generateRoomId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
}

import { useCurrency } from '@/context/CurrencyContext'

export default function GroupSection() {
    const router = useRouter()
    const { format, convert } = useCurrency()
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
            <div className="group-grid-overlay" aria-hidden />
            <div className="group-glow-left" aria-hidden />
            <div className="group-glow-right" aria-hidden />

            <div className="group-inner">
                {/* ── Left copy ── */}
                <div className="group-copy">
                    <div className="group-eyebrow">
                        <span className="group-eyebrow-pip" />
                        Group Travel
                    </div>

                    <h2 className="group-headline">
                        Your squad deserves<br />
                        <em>a plan, not a poll.</em>
                    </h2>

                    <p className="group-subtext">
                        Stop losing flight links in side chats. Aela gives your whole
                        group one room — everyone votes, dates lock, and you book together.
                        No back-and-forth.
                    </p>

                    {/* Numbered pillars */}
                    <div className="group-pillars">
                        {pillars.map(({ num, title, desc }, i) => (
                            <div key={i} className="group-pillar">
                                <div className="group-pillar-num">{num}</div>
                                <div className="group-pillar-body">
                                    <div className="group-pillar-title">{title}</div>
                                    <div className="group-pillar-desc">{desc}</div>
                                </div>
                            </div>
                        ))}
                        <div className="group-pillar group-pillar-itinerary">
                            <div className="group-pillar-num">04</div>
                            <div className="group-pillar-body">
                                <div className="group-pillar-title">Shared itinerary</div>
                                <div className="group-pillar-desc">Flights, hotels, activities — one view the whole group can see and edit.</div>
                            </div>
                        </div>
                    </div>

                    <button className="group-cta" onClick={handleCreate}>
                        <span>Start a Group Room</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* ── Right demo card ── */}
                <div className="group-demo">
                    <div className="group-demo-card">

                        {/* Top accent stripe */}
                        <div className="group-demo-accent-bar" />

                        {/* Header */}
                        <div className="group-demo-header">
                            <div className="group-demo-header-left">
                                <div className="group-demo-plane-icon">
                                    <IconPlane />
                                </div>
                                <div>
                                    <div className="group-demo-destination">London</div>
                                    <div className="group-demo-route-tag">DEL → LHR &nbsp;·&nbsp; 6 nights</div>
                                </div>
                            </div>
                            <div className="group-demo-live-badge">
                                <span className="group-live-dot" />
                                Live
                            </div>
                        </div>

                        {/* Member row */}
                        <div className="group-demo-member-row">
                            <div className="group-demo-avatars">
                                {MEMBERS.map((m, i) => (
                                    <div
                                        key={i}
                                        className="group-demo-avatar"
                                        style={{ background: m.color, marginLeft: i > 0 ? '-7px' : '0' }}
                                        title={m.init}
                                    >
                                        {m.init}
                                    </div>
                                ))}
                                <div className="group-demo-avatar group-demo-avatar-overflow" style={{ marginLeft: '-7px' }}>+2</div>
                            </div>
                            <span className="group-demo-member-count">7 in this room</span>
                        </div>

                        {/* Section label */}
                        <div className="group-demo-label-row">
                            <span className="group-demo-section-label">Flight options</span>
                            <span className="group-demo-vote-tally">{total} votes cast</span>
                        </div>

                        {/* Flights */}
                        <div className="group-demo-flights">
                            {FLIGHTS.map((f, i) => {
                                const pct = Math.round((votes[i] / total) * 100)
                                const isActive = activeVote === i
                                const isTop = i === topIdx
                                const voters = MEMBERS.slice(0, Math.min(votes[i], MEMBERS.length))
                                return (
                                    <div
                                        key={i}
                                        className={`group-demo-flight${isTop ? ' is-top' : ''}${isActive ? ' is-active' : ''}`}
                                    >
                                        <div className="group-demo-flight-row">
                                            <div className="group-demo-flight-left">
                                                <div className="group-demo-airline">{f.label}</div>
                                                <div className="group-demo-flight-meta">
                                                    <span className="group-demo-flight-code">{f.code}</span>
                                                    <span className="group-demo-flight-sep">·</span>
                                                    <span className="group-demo-flight-route">{f.route}</span>
                                                </div>
                                            </div>
                                            <div className="group-demo-flight-right">
                                                {isTop && <span className="group-demo-top-badge">Top pick</span>}
                                                <span className="group-demo-price">{format(convert(f.basePriceUsd))}</span>
                                            </div>
                                        </div>

                                        <div className="group-demo-bar-track">
                                            <div className="group-demo-bar-fill" style={{ width: `${pct}%` }} />
                                        </div>

                                        <div className="group-demo-vote-row">
                                            <div className="group-demo-voter-avatars">
                                                {voters.map((v, vi) => (
                                                    <div
                                                        key={vi}
                                                        className="group-demo-voter-dot"
                                                        style={{ background: v.color, marginLeft: vi > 0 ? '-4px' : '0' }}
                                                        title={v.init}
                                                    >
                                                        {v.init}
                                                    </div>
                                                ))}
                                                {isActive && <span className="group-demo-vote-flash">+1</span>}
                                            </div>
                                            <span className="group-demo-pct">{pct}%</span>
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
