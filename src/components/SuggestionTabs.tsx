'use client'

import type { SuggestedAction } from '@/types/api'

const DEFAULT_TABS = [
    { label: '🏖️ Beach getaway', text: 'I want a beach getaway' },
    { label: '🏙️ City exploration', text: 'Plan a city exploration trip for me' },
    { label: '🧗 Adventure travel', text: 'I\'m looking for an adventure travel experience' },
    { label: '✨ Luxury escape', text: 'Suggest a luxury escape destination' },
    { label: '🎒 Budget backpacking', text: 'Help me plan a budget backpacking trip' },
]

const REDIRECT_TABS = [
    { label: '✈️ Search flights', text: 'Help me search for flights' },
    { label: '🏨 Find hotels', text: 'Help me find hotels' },
    { label: '📅 Plan itinerary', text: 'Help me plan an itinerary' },
]

interface SuggestionTabsProps {
    actions?: SuggestedAction[]
    mode?: 'default' | 'redirect' | 'custom'
    onSelect: (text: string) => void
}

export default function SuggestionTabs({ actions, mode = 'default', onSelect }: SuggestionTabsProps) {
    if (mode === 'redirect') {
        return (
            <div className="suggestion-tabs">
                {REDIRECT_TABS.map(tab => (
                    <button key={tab.text} className="suggestion-tab suggestion-tab-redirect" onClick={() => onSelect(tab.text)}>
                        {tab.label}
                    </button>
                ))}
            </div>
        )
    }

    if (mode === 'custom' && actions && actions.length > 0) {
        return (
            <div className="suggestion-tabs">
                {actions.map(action => (
                    <button key={action.message} className="suggestion-tab" onClick={() => onSelect(action.message)}>
                        {action.label}
                    </button>
                ))}
            </div>
        )
    }

    return (
        <div className="suggestion-tabs">
            {DEFAULT_TABS.map(tab => (
                <button key={tab.text} className="suggestion-tab" onClick={() => onSelect(tab.text)}>
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
