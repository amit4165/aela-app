'use client'

import type { SuggestedAction } from '@/types/api'

const TYPE_EMOJI: Record<string, string> = {
    flight: '✈️ ',
    hotel: '🏨 ',
    itinerary: '🗺️ ',
    question: '💬 ',
}

interface SuggestionTabsProps {
    actions: SuggestedAction[]
    onSelect: (text: string) => void
}

export default function SuggestionTabs({ actions, onSelect }: SuggestionTabsProps) {
    return (
        <div className="suggestion-tabs">
            {actions.map((action, i) => (
                <button
                    key={i}
                    className="suggestion-tab"
                    onClick={() => onSelect(action.message)}
                >
                    {TYPE_EMOJI[action.type] ?? ''}{action.label}
                </button>
            ))}
        </div>
    )
}
