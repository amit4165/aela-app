'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

interface FlightOption {
    id: string
    route: string
    airline: string
    time: string
    duration: string
    price: string
    votes: string[]
}

interface TripRoom {
    id: string
    createdBy: string
    destination: string
    members: string[]
    flights: FlightOption[]
    createdAt: number
}

const ROOM_STORAGE_KEY = (id: string) => `aela_trip_room_${id}`

function generateRoomId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
}

function getRoom(roomId: string): TripRoom | null {
    try {
        const raw = localStorage.getItem(ROOM_STORAGE_KEY(roomId))
        return raw ? JSON.parse(raw) : null
    } catch { return null }
}

function saveRoom(room: TripRoom) {
    localStorage.setItem(ROOM_STORAGE_KEY(room.id), JSON.stringify(room))
}

// Demo flight options shown in the room
const DEMO_FLIGHTS: Omit<FlightOption, 'votes'>[] = [
    { id: 'f1', route: 'DEL → LHR', airline: 'Air India', time: '02:15 — 08:30', duration: '9h 15m', price: '₹48,200' },
    { id: 'f2', route: 'DEL → LHR', airline: 'British Airways', time: '06:00 — 12:10', duration: '9h 10m', price: '₹52,800' },
    { id: 'f3', route: 'DEL → LHR', airline: 'Emirates', time: '22:00 — 07:30+1', duration: '10h 30m', price: '₹44,500' },
]

export default function TripRoomPage() {
    const params = useParams()
    const router = useRouter()
    const { user, isLoaded } = useUser()
    const roomId = params?.roomId as string

    const [room, setRoom] = useState<TripRoom | null>(null)
    const [destination, setDestination] = useState('')
    const [copied, setCopied] = useState(false)
    const [isCreating, setIsCreating] = useState(false)

    const userName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ?? 'Guest'

    const loadRoom = useCallback(() => {
        const existing = getRoom(roomId)
        if (existing) {
            setRoom(existing)
            // Auto-join if not already a member
            if (user && !existing.members.includes(userName)) {
                const updated = { ...existing, members: [...existing.members, userName] }
                saveRoom(updated)
                setRoom(updated)
            }
        }
    }, [roomId, user, userName])

    useEffect(() => {
        if (!isLoaded) return
        if (!user) { router.push('/sign-in'); return }
        loadRoom()
    }, [isLoaded, user, router, loadRoom])

    const createRoom = () => {
        if (!destination.trim()) return
        setIsCreating(true)
        const newRoom: TripRoom = {
            id: roomId,
            createdBy: userName,
            destination: destination.trim(),
            members: [userName],
            flights: DEMO_FLIGHTS.map(f => ({ ...f, votes: [] })),
            createdAt: Date.now(),
        }
        saveRoom(newRoom)
        setRoom(newRoom)
        setIsCreating(false)
    }

    const handleVote = (flightId: string) => {
        if (!room) return
        const updated = {
            ...room,
            flights: room.flights.map(f => {
                if (f.id !== flightId) return f
                const alreadyVoted = f.votes.includes(userName)
                return {
                    ...f,
                    votes: alreadyVoted
                        ? f.votes.filter(v => v !== userName)
                        : [...f.votes, userName],
                }
            }),
        }
        saveRoom(updated)
        setRoom(updated)
    }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const topVoted = room?.flights.reduce((best, f) =>
        f.votes.length > (best?.votes.length ?? -1) ? f : best
    , room.flights[0])

    if (!isLoaded) return null

    return (
        <div className="trip-room-page">
            <div className="trip-room-container">

                {/* Header */}
                <div className="trip-room-header">
                    <Link href="/chat" className="trip-room-back">← Back to Chat</Link>
                    <div className="trip-room-id-badge">Room #{roomId}</div>
                </div>

                {/* Room not yet created — setup screen */}
                {!room && (
                    <div className="trip-room-setup">
                        <div className="trip-room-setup-icon">👥</div>
                        <h1 className="trip-room-title">Plan Together</h1>
                        <p className="trip-room-subtitle">Create a group trip room and invite friends to vote on flights</p>
                        <div className="trip-room-form">
                            <input
                                className="trip-room-input"
                                type="text"
                                placeholder="Where are you all going? (e.g. London)"
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && createRoom()}
                            />
                            <button
                                className="btn btn-primary trip-room-create-btn"
                                onClick={createRoom}
                                disabled={!destination.trim() || isCreating}
                            >
                                Create Trip Room
                            </button>
                        </div>
                    </div>
                )}

                {/* Room active */}
                {room && (
                    <>
                        <div className="trip-room-hero">
                            <h1 className="trip-room-title">Trip to {room.destination}</h1>
                            <p className="trip-room-subtitle">Vote on flights with your group — the top pick wins</p>
                            <button className="trip-room-invite-btn" onClick={copyLink}>
                                {copied ? '✓ Link Copied!' : '🔗 Copy Invite Link'}
                            </button>
                        </div>

                        {/* Members */}
                        <div className="trip-room-members">
                            <div className="trip-room-section-label">Group members ({room.members.length})</div>
                            <div className="trip-room-avatars">
                                {room.members.map((m, i) => (
                                    <div key={i} className="trip-room-avatar" title={m}>
                                        {m[0].toUpperCase()}
                                    </div>
                                ))}
                                <div className="trip-room-avatar trip-room-avatar-invite" onClick={copyLink} title="Invite friends">
                                    +
                                </div>
                            </div>
                        </div>

                        {/* Flights to vote on */}
                        <div className="trip-room-section-label" style={{ marginTop: '28px' }}>
                            Vote on a flight
                        </div>
                        <div className="trip-room-flights">
                            {room.flights.map(flight => {
                                const voted = flight.votes.includes(userName)
                                const isTop = flight.id === topVoted?.id && flight.votes.length > 0
                                return (
                                    <div key={flight.id} className={`trip-room-flight-card ${isTop ? 'trip-room-flight-top' : ''}`}>
                                        {isTop && <div className="trip-room-top-badge">Top Pick</div>}
                                        <div className="trip-room-flight-route">{flight.route}</div>
                                        <div className="trip-room-flight-meta">
                                            <span>{flight.airline}</span>
                                            <span>·</span>
                                            <span>{flight.time}</span>
                                            <span>·</span>
                                            <span>{flight.duration}</span>
                                        </div>
                                        <div className="trip-room-flight-bottom">
                                            <div className="trip-room-flight-price">{flight.price}</div>
                                            <div className="trip-room-vote-row">
                                                <div className="trip-room-vote-pips">
                                                    {flight.votes.map((v, i) => (
                                                        <div key={i} className="trip-room-vote-pip" title={v}>
                                                            {v[0].toUpperCase()}
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    className={`trip-room-vote-btn ${voted ? 'trip-room-voted' : ''}`}
                                                    onClick={() => handleVote(flight.id)}
                                                >
                                                    {voted ? '✓ Voted' : '👍 Vote'}
                                                    {flight.votes.length > 0 && (
                                                        <span className="trip-room-vote-count">{flight.votes.length}</span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Consensus banner */}
                        {topVoted && topVoted.votes.length > 0 && (
                            <div className="trip-room-consensus">
                                <span>🗳</span>
                                <span>
                                    Group leans toward <strong>{topVoted.airline} {topVoted.route}</strong> — {topVoted.votes.length} vote{topVoted.votes.length > 1 ? 's' : ''}
                                </span>
                                <button className="btn btn-primary" style={{ fontSize: '13px', padding: '8px 18px' }}>
                                    Book for Group
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
