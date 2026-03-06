'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const { isSignedIn } = useAuth()
    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        if (isSignedIn) {
            router.push(`/chat?q=${encodeURIComponent(query.trim())}`)
        } else {
            router.push(`/sign-in?redirect_url=${encodeURIComponent(`/chat?q=${query.trim()}`)}`)
        }
    }

    return (
        <form className="search-wrapper" onSubmit={handleSubmit}>
            <div className="search-bar">
                <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                    style={{ color: 'var(--text-muted)', flexShrink: 0 }}
                >
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-3.5-3.5" />
                </svg>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Where do you want to go? Try: Paris for 10 days in July..."
                    autoComplete="off"
                    autoFocus
                />
                <button type="submit" className="search-submit" disabled={!query.trim()}>
                    {isSignedIn ? 'Plan My Trip' : 'Get Started'}
                </button>
            </div>
        </form>
    )
}
