'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import MessageBubble from '@/components/MessageBubble'
import FlightDeals from '@/components/FlightDeals'
import ItineraryTimeline from '@/components/ItineraryTimeline'
import WarningBanner from '@/components/WarningBanner'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { sendChatMessage, type ChatResponse } from '@/api/chat'

interface Message {
    id: string
    role: 'user' | 'ai'
    content: string
    response?: ChatResponse
}

export default function ChatPage() {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [sessionId, setSessionId] = useState<string | undefined>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const initSent = useRef(false)

    // Redirect if not signed in after load
    useEffect(() => {
        if (isLoaded && !user) router.push('/sign-in')
    }, [isLoaded, user, router])

    // Auto-submit query from landing search bar
    useEffect(() => {
        const q = searchParams.get('q')
        if (q && messages.length === 0 && !initSent.current && user) {
            initSent.current = true
            handleSendMessage(q)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, searchParams])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    const handleSendMessage = async (text?: string) => {
        const messageText = (text ?? input).trim()
        if (!messageText || loading || !user) return

        setInput('')
        setError(null)

        const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: messageText }
        setMessages(prev => [...prev, userMsg])
        setLoading(true)

        try {
            const res = await sendChatMessage({ userId: user.id, message: messageText, sessionId })
            setSessionId(res.sessionId)
            const aiMsg: Message = { id: crypto.randomUUID(), role: 'ai', content: res.message, response: res }
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

    if (!isLoaded) return null

    return (
        <div className="chat-page">
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
                                    <FlightDeals deals={msg.response.deals ?? []} />
                                </div>
                            )}
                            {msg.role === 'ai' && msg.response?.ui_hints?.show_timeline && (
                                <div style={{ paddingLeft: '46px' }}>
                                    <ItineraryTimeline days={msg.response.itinerary ?? []} />
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

            <div className="chat-input-bar">
                <form className="chat-input-inner" onSubmit={handleFormSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask Aela anything about your trip..."
                        disabled={loading}
                        autoComplete="off"
                    />
                    <button type="submit" className="send-btn" disabled={loading || !input.trim()} aria-label="Send">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
