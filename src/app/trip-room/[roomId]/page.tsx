'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface FlightOption {
    id: string
    route: string
    airline: string
    time: string
    duration: string
    price: string
}

interface VoteMap {
    [flightId: string]: string[] // flightId → array of userNames who voted
}

const DEMO_FLIGHTS: FlightOption[] = [
    { id: 'f1', route: 'DEL → LHR', airline: 'Air India',       time: '02:15 — 08:30',    duration: '9h 15m',  price: '₹48,200' },
    { id: 'f2', route: 'DEL → LHR', airline: 'British Airways', time: '06:00 — 12:10',    duration: '9h 10m',  price: '₹52,800' },
    { id: 'f3', route: 'DEL → LHR', airline: 'Emirates',        time: '22:00 — 07:30+1',  duration: '10h 30m', price: '₹44,500' },
]

export default function TripRoomPage() {
    const params   = useParams()
    const router   = useRouter()
    const { user, isLoaded } = useUser()
    const roomId   = params?.roomId as string

    const [roomExists,   setRoomExists]   = useState<boolean | null>(null) // null = loading
    const [destination,  setDestination]  = useState('')
    const [members,      setMembers]      = useState<string[]>([])
    const [votes,        setVotes]        = useState<VoteMap>({})
    const [copied,       setCopied]       = useState(false)
    const [isCreating,   setIsCreating]   = useState(false)

    const userName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ?? 'Guest'
    const userId   = user?.id ?? 'guest'

    /* ── helpers ── */
    const buildVoteMap = (rows: { flight_id: string; user_name: string }[]): VoteMap => {
        const map: VoteMap = {}
        for (const row of rows) {
            if (!map[row.flight_id]) map[row.flight_id] = []
            map[row.flight_id].push(row.user_name)
        }
        return map
    }

    /* ── load room + join ── */
    const loadRoom = useCallback(async () => {
        // 1. Check if room exists
        const { data: roomRow } = await supabase
            .from('trip_rooms')
            .select('id, destination')
            .eq('id', roomId)
            .maybeSingle()

        if (!roomRow) { setRoomExists(false); return }

        setRoomExists(true)
        setDestination(roomRow.destination ?? '')

        // 2. Join as member (upsert — safe to call multiple times)
        await supabase.from('room_members').upsert(
            { room_id: roomId, user_id: userId, user_name: userName },
            { onConflict: 'room_id,user_id' }
        )

        // 3. Fetch members
        const { data: memberRows } = await supabase
            .from('room_members')
            .select('user_name')
            .eq('room_id', roomId)
        setMembers((memberRows ?? []).map(m => m.user_name))

        // 4. Fetch votes
        const { data: voteRows } = await supabase
            .from('votes')
            .select('flight_id, user_name')
            .eq('room_id', roomId)
        setVotes(buildVoteMap(voteRows ?? []))
    }, [roomId, userId, userName])

    /* ── realtime subscriptions ── */
    useEffect(() => {
        if (!isLoaded || !user) return

        loadRoom()

        // Subscribe to new members
        const memberSub = supabase
            .channel(`members:${roomId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'room_members', filter: `room_id=eq.${roomId}` }, () => {
                supabase.from('room_members').select('user_name').eq('room_id', roomId).then(({ data }) => {
                    setMembers((data ?? []).map(m => m.user_name))
                })
            })
            .subscribe()

        // Subscribe to vote changes
        const voteSub = supabase
            .channel(`votes:${roomId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'votes', filter: `room_id=eq.${roomId}` }, () => {
                supabase.from('votes').select('flight_id, user_name').eq('room_id', roomId).then(({ data }) => {
                    setVotes(buildVoteMap(data ?? []))
                })
            })
            .subscribe()

        return () => {
            supabase.removeChannel(memberSub)
            supabase.removeChannel(voteSub)
        }
    }, [isLoaded, user, loadRoom, roomId])

    useEffect(() => {
        if (isLoaded && !user) router.push('/sign-in')
    }, [isLoaded, user, router])

    /* ── create room ── */
    const createRoom = async () => {
        if (!destination.trim()) return
        setIsCreating(true)

        // Insert room
        await supabase.from('trip_rooms').insert({
            id: roomId,
            created_by: userId,
            destination: destination.trim(),
            search_params: { flights: DEMO_FLIGHTS },
            status: 'active',
        })

        // Insert flight options
        await supabase.from('flight_options').insert(
            DEMO_FLIGHTS.map(f => ({ room_id: roomId, flight_data: f }))
        )

        await loadRoom()
        setIsCreating(false)
    }

    /* ── vote toggle ── */
    const handleVote = async (flightId: string) => {
        const alreadyVoted = (votes[flightId] ?? []).includes(userName)

        if (alreadyVoted) {
            await supabase.from('votes')
                .delete()
                .eq('room_id', roomId)
                .eq('user_id', userId)
                .eq('flight_id', flightId)
        } else {
            await supabase.from('votes').upsert(
                { room_id: roomId, user_id: userId, flight_id: flightId, vote: true, user_name: userName },
                { onConflict: 'room_id,user_id,flight_id' }
            )
        }
        // Realtime subscription will update the UI automatically
    }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const topFlight = DEMO_FLIGHTS.reduce((best, f) =>
        (votes[f.id]?.length ?? 0) > (votes[best.id]?.length ?? 0) ? f : best
    , DEMO_FLIGHTS[0])
    const topVoteCount = votes[topFlight?.id]?.length ?? 0

    if (!isLoaded) return null

    return (
        <div className="trip-room-page">
            <div className="trip-room-container">

                {/* Header */}
                <div className="trip-room-header">
                    <Link href="/chat" className="trip-room-back">← Back to Chat</Link>
                    <div className="trip-room-id-badge">Room #{roomId}</div>
                </div>

                {/* Loading */}
                {roomExists === null && (
                    <div className="trip-room-setup">
                        <p style={{ color: 'var(--text-muted)' }}>Loading room…</p>
                    </div>
                )}

                {/* Room not yet created */}
                {roomExists === false && (
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
                                {isCreating ? 'Creating…' : 'Create Trip Room'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Room active */}
                {roomExists === true && (
                    <>
                        <div className="trip-room-hero">
                            <h1 className="trip-room-title">Trip to {destination}</h1>
                            <p className="trip-room-subtitle">Vote on flights with your group — live results update instantly</p>
                            <button className="trip-room-invite-btn" onClick={copyLink}>
                                {copied ? '✓ Link Copied!' : '🔗 Copy Invite Link'}
                            </button>
                        </div>

                        {/* Members */}
                        <div className="trip-room-members">
                            <div className="trip-room-section-label">
                                Group members ({members.length})
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>● Live</span>
                            </div>
                            <div className="trip-room-avatars">
                                {members.map((m, i) => (
                                    <div key={i} className="trip-room-avatar" title={m}>
                                        {m[0].toUpperCase()}
                                    </div>
                                ))}
                                <div className="trip-room-avatar trip-room-avatar-invite" onClick={copyLink} title="Invite friends">
                                    +
                                </div>
                            </div>
                        </div>

                        {/* Flights */}
                        <div className="trip-room-section-label" style={{ marginTop: '28px' }}>Vote on a flight</div>
                        <div className="trip-room-flights">
                            {DEMO_FLIGHTS.map(flight => {
                                const flightVotes = votes[flight.id] ?? []
                                const voted = flightVotes.includes(userName)
                                const isTop = flight.id === topFlight?.id && topVoteCount > 0
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
                                                    {flightVotes.map((v, i) => (
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
                                                    {flightVotes.length > 0 && (
                                                        <span className="trip-room-vote-count">{flightVotes.length}</span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Consensus banner */}
                        {topVoteCount > 0 && (
                            <div className="trip-room-consensus">
                                <span>🗳</span>
                                <span>
                                    Group leans toward <strong>{topFlight.airline} {topFlight.route}</strong> — {topVoteCount} vote{topVoteCount > 1 ? 's' : ''}
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
