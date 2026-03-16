'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useTheme } from '@/context/ThemeContext'

export interface ChatSession {
    id: string
    title: string
    timestamp: number
}

interface Props {
    onNewChat: () => void
    recentChats: ChatSession[]
    collapsed: boolean
    onToggle: () => void
    onSelectChat?: (id: string) => void
    activeSessionId?: string
}

function ChatIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}

function TripsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
    )
}

function ExploreIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
    )
}

function SavedIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
    )
}

function PlusIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    )
}

function PassportIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <circle cx="12" cy="10" r="3" />
            <path d="M8 17c0-2.21 1.79-4 4-4s4 1.79 4 4" />
        </svg>
    )
}

function HistoryIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="12 8 12 12 14 14" />
            <path d="M3.05 11a9 9 0 1 1 .5 4" />
            <polyline points="3 16 3 11 8 11" />
        </svg>
    )
}

function DotsIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="19" r="1" fill="currentColor" />
        </svg>
    )
}

function SunIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    )
}

function MoonIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {collapsed
                ? <path d="M9 18l6-6-6-6" />   /* chevron right */
                : <path d="M15 18l-6-6 6-6" />  /* chevron left */
            }
        </svg>
    )
}

function formatTime(ts: number) {
    const diff = Date.now() - ts
    if (diff < 60_000) return 'just now'
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`
    return `${Math.floor(diff / 86_400_000)}d ago`
}

export default function ChatSidebar({ onNewChat, recentChats, collapsed, onToggle, onSelectChat, activeSessionId }: Props) {
    const { user } = useUser()
    const { theme, toggleTheme } = useTheme()
    const isLight = theme === 'light'
    const [chatsOpen, setChatsOpen] = useState(true)

    const userInitial = user?.firstName?.[0]
        ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase()
        ?? 'U'

    const userName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Traveller'
    const userHandle = user?.username ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ?? ''

    return (
        <aside className={`chat-sidebar${collapsed ? ' chat-sidebar-collapsed' : ''}`}>

            {/* Header: logo + collapse button */}
            <div className="chat-sidebar-header">
                <Link href="/" className="chat-sidebar-logo-link" aria-label="Aela home">
                    {collapsed
                        ? <span className="chat-sidebar-spark">✦</span>
                        : (
                            <div className="chat-sidebar-logo-full">
                                <span className="chat-sidebar-spark">✦</span>
                                <span className="chat-sidebar-wordmark">AELA</span>
                            </div>
                        )
                    }
                </Link>
                <button
                    className="chat-sidebar-collapse-btn"
                    onClick={onToggle}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    title={collapsed ? 'Expand' : 'Collapse'}
                >
                    <CollapseIcon collapsed={collapsed} />
                </button>
            </div>

            {/* New chat button */}
            <div className="chat-sidebar-new-wrap">
                <button
                    className={`chat-sidebar-new-btn${collapsed ? ' chat-sidebar-new-btn-icon' : ''}`}
                    onClick={onNewChat}
                    title="New chat"
                >
                    <PlusIcon />
                    {!collapsed && <span>New chat</span>}
                </button>
            </div>

            {/* Nav items */}
            <nav className="chat-sidebar-nav">
                <button
                    className="chat-sidebar-item chat-sidebar-item-active"
                    onClick={() => !collapsed && setChatsOpen(o => !o)}
                    title="Chats"
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                    <ChatIcon />
                    {!collapsed && <span>Chats</span>}
                </button>

                {/* Recent chat history — collapsible */}
                {!collapsed && chatsOpen && recentChats.length > 0 && onSelectChat && (
                    <div className="chat-sidebar-history">
                        {recentChats.slice(0, 5).map(chat => (
                            <button
                                key={chat.id}
                                className={`chat-sidebar-history-item${chat.id === activeSessionId ? ' chat-sidebar-history-item-active' : ''}`}
                                onClick={() => onSelectChat(chat.id)}
                                title={chat.title}
                            >
                                <span className="chat-sidebar-history-title">{chat.title}</span>
                                <span className="chat-sidebar-history-time">{formatTime(chat.timestamp)}</span>
                            </button>
                        ))}
                    </div>
                )}
                <Link href="/chat" className="chat-sidebar-item" title="Trips">
                    <TripsIcon />
                    {!collapsed && <span>Trips</span>}
                </Link>
                <Link href="/chat" className="chat-sidebar-item" title="Explore">
                    <ExploreIcon />
                    {!collapsed && <span>Explore</span>}
                </Link>
                <button
                    className="chat-sidebar-theme-btn"
                    onClick={toggleTheme}
                    title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                    {isLight ? <SunIcon /> : <MoonIcon />}
                    {!collapsed && <span>Theme</span>}
                    {!collapsed && (
                        <span className={`chat-sidebar-theme-track${isLight ? ' chat-sidebar-theme-track-on' : ''}`}>
                            <span className={`chat-sidebar-theme-thumb${isLight ? ' chat-sidebar-theme-thumb-on' : ''}`} />
                        </span>
                    )}
                </button>
                <Link href="/chat" className="chat-sidebar-item" title="Saved">
                    <SavedIcon />
                    {!collapsed && <span>Saved</span>}
                </Link>
                <Link href="/passports" className="chat-sidebar-item" title="Passports">
                    <PassportIcon />
                    {!collapsed && <span>Passports</span>}
                </Link>
            </nav>

            {/* Footer — user info */}
            <div className="chat-sidebar-footer">
                <div className="chat-sidebar-user" title={userName}>
                    <div className="chat-sidebar-avatar">{userInitial}</div>
                    {!collapsed && (
                        <>
                            <div className="chat-sidebar-user-info">
                                <div className="chat-sidebar-user-name">{userName}</div>
                                {userHandle && (
                                    <div className="chat-sidebar-user-handle">@{userHandle}</div>
                                )}
                            </div>
                            <button className="chat-sidebar-recent-dots" aria-label="User options">
                                <DotsIcon />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </aside>
    )
}
