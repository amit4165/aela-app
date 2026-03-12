'use client'

import { Suspense, useState, useEffect, useRef, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser, useAuth } from '@clerk/nextjs'
import MessageBubble from '@/components/MessageBubble'
import FlightDeals from '@/components/FlightDeals'
import ItineraryTimeline from '@/components/ItineraryTimeline'
import WarningBanner from '@/components/WarningBanner'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import PassportModal from '@/components/PassportModal'
import SuggestionTabs from '@/components/SuggestionTabs'
import FlightSearchForm from '@/components/FlightSearchForm'
import { sendChatMessage, type ChatResponse } from '@/api/chat'
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext'
import VisaRequirementsCard from '@/components/VisaRequirementsCard'

const QUERY_LIMIT = 12

interface Message {
    id: string
    role: 'user' | 'ai'
    content: string
    response?: ChatResponse
    renderedCurrency?: CurrencyCode
    renderedRates?: Record<string, number> | null
}

export default function ChatPage() {
    return (
        <Suspense>
            <ChatPageInner />
        </Suspense>
    )
}

function ChatPageInner() {
    const { user, isLoaded } = useUser()
    const { getToken } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { currency, rates } = useCurrency()

    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [sessionId, setSessionId] = useState<string | undefined>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [queryCount, setQueryCount] = useState(0)
    const [showFlightForm, setShowFlightForm] = useState(false)

    const openGroupRoom = () => {
        const roomId = Math.random().toString(36).substring(2, 10).toUpperCase()
        window.open(`/trip-room/${roomId}`, '_blank')
    }
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const initSent = useRef(false)

    // Redirect if not signed in
    useEffect(() => {
        if (isLoaded && !user) router.push('/sign-in')
    }, [isLoaded, user, router])

    // Handle pending message from landing page (pre-auth flow)
    useEffect(() => {
        if (!user || !isLoaded || initSent.current) return
        const pending = sessionStorage.getItem('aela_pending_message')
        const qParam = searchParams?.get('q')
        const initialMsg = pending || qParam
        if (initialMsg) {
            sessionStorage.removeItem('aela_pending_message')
            initSent.current = true
            handleSendMessage(initialMsg)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoaded, searchParams])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    const handleSendMessage = async (text?: string) => {
        const messageText = (text ?? input).trim()
        if (!messageText || loading || !user) return
        if (queryCount >= QUERY_LIMIT) return

        setInput('')
        setError(null)

        const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: messageText }
        setMessages(prev => [...prev, userMsg])
        setLoading(true)
        setQueryCount(c => c + 1)

        try {
            const token = await getToken()
            if (!token) throw new Error('Not authenticated — please sign in again.')

            const res = await sendChatMessage(
                { userId: user.id, message: messageText, sessionId },
                token
            )
            setSessionId(res.sessionId)
            const aiMsg: Message = {
                id: crypto.randomUUID(),
                role: 'ai',
                content: res.message,
                response: res,
                renderedCurrency: currency,
                renderedRates: rates,
            }
            setMessages(prev => [...prev, aiMsg])
        } catch (err) {
            setError((err as Error).message ?? 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }

    const handleFormSubmit = (e: FormEvent) => { e.preventDefault(); handleSendMessage() }

    const userInitial = user?.firstName?.[0]
        ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase()
        ?? 'U'

    // Determine suggestion tab mode from latest AI message
    const lastAiMsg = [...messages].reverse().find(m => m.role === 'ai')
    const isOffTopic = lastAiMsg?.response?.ui_hints?.off_topic === true
    const dynamicSuggestions = lastAiMsg?.response?.suggestions ?? []
    const suggestionMode = isOffTopic
        ? 'redirect'
        : dynamicSuggestions.length > 0
            ? 'custom'
            : messages.length === 0 ? 'default' : undefined

    const queriesLeft = QUERY_LIMIT - queryCount
    const nearLimit = queriesLeft <= 3

    if (!isLoaded) return null

    return (
        <div className="chat-page">
            {/* First-time login passport modal */}
            <PassportModal onComplete={() => {}} />

            {/* Flight search slide-up form */}
            {showFlightForm && (
                <FlightSearchForm
                    onSearch={(q) => handleSendMessage(q)}
                    onClose={() => setShowFlightForm(false)}
                />
            )}

            <div className="chat-layout">
                <div className="chat-header">
                    <h2>Plan Your Journey</h2>
                    <p>Tell Aela where you want to go — flights, hotels, full itineraries</p>
                </div>

                {messages.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '16px' }}>✦</div>
                        <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                            Hi{user?.firstName ? `, ${user.firstName}` : ''}. Where shall we begin?
                        </p>
                        <p style={{ fontSize: '13px', marginTop: '8px' }}>
                            Try: <em style={{ color: 'var(--text-secondary)' }}>&ldquo;I want to visit Japan for 2 weeks in April&rdquo;</em>
                        </p>
                    </div>
                )}

                <div className="chat-messages">
                    {messages.map(msg => (
                        <div key={msg.id}>
                            {msg.role === 'ai' && msg.response?.ui_hints?.show_warning && (
                                <WarningBanner warnings={msg.response.warnings ?? []} />
                            )}
                            <MessageBubble role={msg.role} content={msg.content} userInitial={userInitial} />
                            {msg.role === 'ai' && msg.response?.ui_hints?.show_deals && (
                                <div style={{ paddingLeft: '46px' }}>
                                    <FlightDeals
                                        deals={msg.response.deals ?? []}
                                        renderedCurrency={msg.renderedCurrency}
                                        renderedRates={msg.renderedRates}
                                    />
                                    <VisaRequirementsCard
                                        destination={msg.response.deals?.[0]?.data?.destination ?? ''}
                                    />
                                </div>
                            )}
                            {msg.role === 'ai' && msg.response?.ui_hints?.show_timeline && (
                                <div style={{ paddingLeft: '46px' }}>
                                    <ItineraryTimeline
                                        days={msg.response.itinerary ?? []}
                                        renderedCurrency={msg.renderedCurrency}
                                        renderedRates={msg.renderedRates}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && <LoadingSkeleton />}
                    {error && (
                        <div className="warning-banner">
                            <span className="warning-icon">⚡</span>
                            <span className="warning-text">{error}</span>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Query limit banner */}
            {nearLimit && queriesLeft > 0 && (
                <div className="query-limit-bar">
                    <span className="query-limit-icon">💬</span>
                    <span>{queriesLeft} message{queriesLeft !== 1 ? 's' : ''} remaining on your free plan</span>
                </div>
            )}
            {queriesLeft <= 0 && (
                <div className="query-limit-bar query-limit-reached">
                    <span className="query-limit-icon">🔒</span>
                    <span>You&apos;ve reached your free message limit. Book a trip to continue chatting.</span>
                </div>
            )}

            <div className="chat-input-bar">
                {/* Suggestion tabs */}
                {suggestionMode && (
                    <SuggestionTabs
                        suggestions={dynamicSuggestions}
                        mode={suggestionMode}
                        onSelect={(text) => handleSendMessage(text)}
                    />
                )}

                <div className="chat-input-actions">
                    <button
                        className="chat-action-btn"
                        onClick={() => setShowFlightForm(true)}
                        title="Search Flights"
                    >
                        ✈️ Flights
                    </button>
                    <button
                        className="chat-action-btn"
                        onClick={() => handleSendMessage('Help me find hotels')}
                        title="Find Hotels"
                    >
                        🏨 Hotels
                    </button>
                    <button
                        className="chat-action-btn"
                        onClick={() => handleSendMessage('Help me plan an itinerary')}
                        title="Plan Itinerary"
                    >
                        📅 Itinerary
                    </button>
                    <button
                        className="chat-action-btn chat-action-btn-group"
                        onClick={openGroupRoom}
                        title="Plan with Friends"
                    >
                        👥 Group Trip
                    </button>
                </div>

                <form className="chat-input-inner" onSubmit={handleFormSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={queriesLeft <= 0 ? 'Message limit reached — book a trip to continue' : 'Ask Aela anything about your trip…'}
                        disabled={loading || queriesLeft <= 0}
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="send-btn"
                        disabled={loading || !input.trim() || queriesLeft <= 0}
                        aria-label="Send"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
