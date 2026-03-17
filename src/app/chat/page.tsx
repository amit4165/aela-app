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
import HotelSearchForm from '@/components/HotelSearchForm'
import ChatSidebar, { type ChatSession } from '@/components/ChatSidebar'
import DiscoveryPanel from '@/components/DiscoveryPanel'
import ChatMapPanel from '@/components/ChatMapPanel'
import { chatStream, getUserProfile, type SSEEvent } from '@/lib/api'
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext'
import VisaRequirementsCard from '@/components/VisaRequirementsCard'
import type { ChatResponse, SuggestedAction, Deal } from '@/types/api'

const QUERY_LIMIT = 12
const RECENT_CHATS_KEY = 'aela_recent_chats'
const SIDEBAR_COLLAPSED_KEY = 'aela_sidebar_collapsed'
const MESSAGES_PREFIX = 'aela_chat_msgs_'

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
    const [progressText, setProgressText] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [queryCount, setQueryCount] = useState(0)
    const [showFlightForm, setShowFlightForm] = useState(false)
    const [showHotelForm, setShowHotelForm] = useState(false)
    const [currentSuggestions, setCurrentSuggestions] = useState<SuggestedAction[]>([])
    const [showOnboarding, setShowOnboarding] = useState(false)
    const [profileLoading, setProfileLoading] = useState(true)
    const [recentChats, setRecentChats] = useState<ChatSession[]>([])

    // Sidebar collapse state
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    // Map panel state
    const [showMap, setShowMap] = useState(false)
    const [mapDestination, setMapDestination] = useState('')

    // Right panel resize
    const [rightPanelWidth, setRightPanelWidth] = useState(360)
    const [isResizing, setIsResizing] = useState(false)
    const isResizingRef = useRef(false)
    const resizeStartXRef = useRef(0)
    const resizeStartWidthRef = useRef(0)

    const handleResizeStart = (e: React.MouseEvent) => {
        isResizingRef.current = true
        setIsResizing(true)
        resizeStartXRef.current = e.clientX
        resizeStartWidthRef.current = rightPanelWidth
        e.preventDefault()
    }

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!isResizingRef.current) return
            const delta = resizeStartXRef.current - e.clientX
            const newWidth = Math.max(240, Math.min(640, resizeStartWidthRef.current + delta))
            setRightPanelWidth(newWidth)
        }
        const onUp = () => {
            if (isResizingRef.current) {
                isResizingRef.current = false
                setIsResizing(false)
            }
        }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
        }
    }, [])

    const openGroupRoom = () => {
        const roomId = Math.random().toString(36).substring(2, 10).toUpperCase()
        window.open(`/trip-room/${roomId}`, '_blank')
    }
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const initSent = useRef(false)
    const savedSessionRef = useRef<string | null>(null)

    // Hide global nav
    useEffect(() => {
        document.body.classList.add('hide-nav')
        return () => document.body.classList.remove('hide-nav')
    }, [])

    // Load sidebar collapsed state
    useEffect(() => {
        try {
            const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY)
            if (stored === 'true') setSidebarCollapsed(true)
        } catch { /* ignore */ }
    }, [])

    // Load recent chats from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(RECENT_CHATS_KEY)
            if (stored) setRecentChats(JSON.parse(stored))
        } catch { /* ignore */ }
    }, [])

    // Save chat session to recent chats when sessionId is first set
    useEffect(() => {
        if (!sessionId || sessionId === savedSessionRef.current) return
        const firstUserMsg = messages.find(m => m.role === 'user')
        if (!firstUserMsg) return
        savedSessionRef.current = sessionId
        const chat: ChatSession = {
            id: sessionId,
            title: firstUserMsg.content.slice(0, 60),
            timestamp: Date.now(),
        }
        setRecentChats(prev => {
            const filtered = prev.filter(c => c.id !== sessionId)
            const updated = [chat, ...filtered].slice(0, 10)
            try { localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify(updated)) } catch { /* ignore */ }
            return updated
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId])

    // Persist messages to localStorage whenever they change
    useEffect(() => {
        if (!sessionId || messages.length === 0) return
        try { localStorage.setItem(MESSAGES_PREFIX + sessionId, JSON.stringify(messages)) } catch { /* ignore */ }
    }, [messages, sessionId])

    // Redirect if not signed in
    useEffect(() => {
        if (isLoaded && !user) router.push('/sign-in')
    }, [isLoaded, user, router])

    // Fetch user profile
    useEffect(() => {
        if (!user || !isLoaded) return
        async function loadProfile() {
            try {
                const token = await getToken()
                const data = await getUserProfile(token)
                if (data.needs_onboarding) setShowOnboarding(true)
            } catch {
                setShowOnboarding(true)
            } finally {
                setProfileLoading(false)
            }
        }
        loadProfile()
    }, [user, isLoaded, getToken])

    // Handle pending message from landing page
    useEffect(() => {
        if (!user || !isLoaded || profileLoading || showOnboarding || initSent.current) return
        const pending = sessionStorage.getItem('aela_pending_message')
        const qParam = searchParams?.get('q')
        const initialMsg = pending || qParam
        if (initialMsg) {
            sessionStorage.removeItem('aela_pending_message')
            initSent.current = true
            handleSendMessage(initialMsg)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoaded, profileLoading, showOnboarding, searchParams])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    function handleSidebarToggle() {
        setSidebarCollapsed(prev => {
            const next = !prev
            try { localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next)) } catch { /* ignore */ }
            return next
        })
    }

    function handleMapOpen(destination: string) {
        setMapDestination(destination)
        setShowMap(true)
    }

    function handleNewChat() {
        setMessages([])
        setSessionId(undefined)
        setQueryCount(0)
        setInput('')
        setError(null)
        setProgressText('')
        setShowMap(false)
        savedSessionRef.current = null
        initSent.current = false
        setTimeout(() => inputRef.current?.focus(), 100)
    }

    function handleSelectChat(id: string) {
        try {
            const stored = localStorage.getItem(MESSAGES_PREFIX + id)
            const msgs = stored ? JSON.parse(stored) : []
            setMessages(msgs)
            setSessionId(id)
            savedSessionRef.current = id
            setQueryCount(0)
            setInput('')
            setError(null)
            setProgressText('')
            setShowMap(false)
            initSent.current = true
        } catch { /* ignore */ }
    }

    function handleOnboardingComplete() {
        setShowOnboarding(false)
    }

    function handleFlightResults(deals: Deal[], query: string) {
        const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: `Search flights: ${query}` }
        const aiMsg: Message = {
            id: crypto.randomUUID(),
            role: 'ai',
            content: deals.length > 0
                ? `Found ${deals.length} flight option${deals.length !== 1 ? 's' : ''} for your search.`
                : 'No flights found for those dates. Try different dates or nearby airports.',
            response: {
                message: '', sessionId: sessionId ?? '', step: 'completed', deals,
                ui_hints: { show_deals: deals.length > 0, show_map: false, show_timeline: false, show_warning: false },
            },
            renderedCurrency: currency, renderedRates: rates,
        }
        setMessages(prev => [...prev, userMsg, aiMsg])
        setShowFlightForm(false)
    }

    function handleHotelResults(deals: Deal[], query: string) {
        const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: `Search hotels: ${query}` }
        const aiMsg: Message = {
            id: crypto.randomUUID(),
            role: 'ai',
            content: deals.length > 0
                ? `Found ${deals.length} hotel${deals.length !== 1 ? 's' : ''} for your stay.`
                : 'No hotels found for those dates. Try different dates or a nearby city.',
            response: {
                message: '', sessionId: sessionId ?? '', step: 'completed', deals,
                ui_hints: { show_deals: deals.length > 0, show_map: false, show_timeline: false, show_warning: false },
            },
            renderedCurrency: currency, renderedRates: rates,
        }
        setMessages(prev => [...prev, userMsg, aiMsg])
        setShowHotelForm(false)
    }

    const handleSendMessage = async (text?: string) => {
        const messageText = (text ?? input).trim()
        if (!messageText || loading || !user) return
        if (queryCount >= QUERY_LIMIT) return

        setInput('')
        setError(null)
        setCurrentSuggestions([])

        const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: messageText }
        setMessages(prev => [...prev, userMsg])
        setLoading(true)
        setProgressText('Thinking…')
        setQueryCount(c => c + 1)

        // Update map destination from first user message
        if (messages.length === 0) {
            setMapDestination(messageText)
        }

        try {
            const token = await getToken()
            await chatStream(
                token,
                { message: messageText, userId: user.id, sessionId },
                (event: SSEEvent) => {
                    if (event.type === 'progress') {
                        setProgressText(event.message || event.step || 'Thinking…')
                    } else if (event.type === 'complete') {
                        const response = event.data as ChatResponse
                        if (response.sessionId && !sessionId) setSessionId(response.sessionId)
                        const aiMsg: Message = {
                            id: crypto.randomUUID(), role: 'ai',
                            content: response.message, response,
                            renderedCurrency: currency, renderedRates: rates,
                        }
                        setMessages(prev => [...prev, aiMsg])
                        setCurrentSuggestions(response.suggested_actions ?? [])
                        setLoading(false)
                        setProgressText('')
                        setTimeout(() => inputRef.current?.focus(), 100)
                    } else if (event.type === 'error') {
                        setError(event.message ?? 'Something went wrong. Please try again.')
                        setLoading(false)
                        setProgressText('')
                        setTimeout(() => inputRef.current?.focus(), 100)
                    }
                },
            )
        } catch (err) {
            setError((err as Error).message ?? 'Failed to connect to Aela. Please check your connection.')
            setLoading(false)
            setProgressText('')
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }

    const handleFormSubmit = (e: FormEvent) => { e.preventDefault(); handleSendMessage() }

    const userInitial = user?.firstName?.[0]
        ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase()
        ?? 'U'

    const lastAiMsg = [...messages].reverse().find(m => m.role === 'ai')
    const dynamicActions = lastAiMsg?.response?.suggested_actions ?? []
    const suggestionMode = dynamicActions.length > 0 ? 'custom' : 'default'

    const queriesLeft = QUERY_LIMIT - queryCount
    const nearLimit = queriesLeft <= 3
    const hasMessages = messages.length > 0

    // Sidebar width as CSS variable on the root element — drives all layout
    const sidebarW = sidebarCollapsed ? '52px' : '240px'
    // Right panel width: visible when map open or on home screen (no messages)
    const panelVisible = showMap || !hasMessages
    const rightPanelW = panelVisible ? `${rightPanelWidth}px` : '0px'

    if (!isLoaded || profileLoading) return null

    return (
        <div
            className={`chat-page chat-page-app${hasMessages ? ' chat-has-messages' : ''}${showMap ? ' chat-map-open' : ''}${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}
            style={{
                '--sidebar-w': sidebarW,
                '--right-panel-w': rightPanelW,
                cursor: isResizing ? 'col-resize' : undefined,
                userSelect: isResizing ? 'none' : undefined,
            } as React.CSSProperties}
        >
            {/* Modals */}
            {showOnboarding && <PassportModal onComplete={handleOnboardingComplete} />}
            {showFlightForm && <FlightSearchForm onResults={handleFlightResults} onClose={() => setShowFlightForm(false)} />}
            {showHotelForm && <HotelSearchForm onResults={handleHotelResults} onClose={() => setShowHotelForm(false)} />}

            {/* Left sidebar */}
            <ChatSidebar
                onNewChat={handleNewChat}
                recentChats={recentChats}
                collapsed={sidebarCollapsed}
                onToggle={handleSidebarToggle}
                onSelectChat={handleSelectChat}
                activeSessionId={sessionId}
            />

            {/* Main body */}
            <div className="chat-body">
                <div className="chat-main">

                    {/* Map toggle button — shown in chat when messages exist */}
                    {hasMessages && (
                        <div className="chat-map-toggle-bar">
                            <button
                                className={`chat-map-toggle-btn${showMap ? ' active' : ''}`}
                                onClick={() => showMap ? setShowMap(false) : handleMapOpen(mapDestination)}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                    <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
                                </svg>
                                <span>{showMap ? 'Hide map' : 'Map'}</span>
                            </button>
                        </div>
                    )}

                    <div className="chat-layout">
                        {/* Empty state */}
                        {!hasMessages && !loading && (
                            <div className="chat-empty-state">
                                <div className="chat-empty-icon">✦</div>
                                <h2 className="chat-empty-greeting">
                                    Where to today{user?.firstName ? `, ${user.firstName}` : ''}?
                                </h2>
                                <p className="chat-empty-subtitle">
                                    I&apos;m here to help you plan your perfect trip.
                                    <br />Ask me anything travel related.
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
                                    {msg.role === 'ai' && msg.response?.flights_skipped && (
                                        <div style={{ paddingLeft: '46px', marginTop: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                                            ✈️ Flight prices not included — search separately for best deals
                                        </div>
                                    )}
                                    {msg.role === 'ai' && msg.response?.ui_hints?.show_deals && (
                                        <div style={{ paddingLeft: '46px' }}>
                                            <FlightDeals
                                                deals={msg.response.deals ?? []}
                                                renderedCurrency={msg.renderedCurrency}
                                                renderedRates={msg.renderedRates}
                                            />
                                            <VisaRequirementsCard
                                                destination={(msg.response.deals?.[0]?.data?.destination as string) ?? ''}
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
                            {loading && (
                                <div>
                                    <LoadingSkeleton />
                                    {progressText && (
                                        <div style={{ paddingLeft: '46px', marginTop: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                                            {progressText}
                                        </div>
                                    )}
                                </div>
                            )}
                            {error && (
                                <div className="warning-banner">
                                    <span className="warning-icon">⚡</span>
                                    <span className="warning-text">{error}</span>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>
                    </div>
                </div>

                {/* Resize handle — only shown when right panel is visible */}
                {panelVisible && (
                    <div
                        className={`panel-resize-handle${isResizing ? ' resizing' : ''}`}
                        onMouseDown={handleResizeStart}
                    />
                )}

                {/* Right panel: discovery (home) or map */}
                {!hasMessages && !showMap && (
                    <DiscoveryPanel
                        onSelect={handleSendMessage}
                        onMapOpen={handleMapOpen}
                        recentChats={recentChats}
                    />
                )}
                {showMap && (
                    <ChatMapPanel
                        destination={mapDestination}
                        onClose={() => setShowMap(false)}
                    />
                )}
            </div>

            {/* Query limit banners */}
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

            {/* Input bar */}
            <div className="chat-input-bar">
                <SuggestionTabs
                    actions={dynamicActions}
                    mode={suggestionMode}
                    onSelect={(text) => handleSendMessage(text)}
                />
                <div className="chat-input-actions">
                    <button className="chat-action-btn" onClick={() => setShowFlightForm(true)} title="Search Flights">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
                        </svg>
                        Flights
                    </button>
                    <button className="chat-action-btn" onClick={() => setShowHotelForm(true)} title="Find Hotels">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Hotels
                    </button>
                    <button className="chat-action-btn" onClick={() => handleSendMessage('Help me plan an itinerary')} title="Plan Itinerary">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Itinerary
                    </button>
                </div>
                <form className="chat-input-inner" onSubmit={handleFormSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={queriesLeft <= 0 ? 'Message limit reached — book a trip to continue' : 'Ask anything about your trip…'}
                        disabled={loading || queriesLeft <= 0}
                        autoComplete="off"
                    />
                    <button type="submit" className="send-btn" disabled={loading || !input.trim() || queriesLeft <= 0} aria-label="Send">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
