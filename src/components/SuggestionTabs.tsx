'use client'

import type { SuggestedAction } from '@/types/api'

interface SuggestionTabsProps {
    actions?: SuggestedAction[]
    mode?: 'default' | 'redirect' | 'custom' | 'followup'
    onSelect: (text: string) => void
}

export default function SuggestionTabs({ actions, mode, onSelect }: SuggestionTabsProps) {
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

    return null
}
