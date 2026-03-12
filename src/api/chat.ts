export interface Deal {
    deal_type: 'flight' | 'hotel' | 'activity'
    provider: string
    price: number
    currency: string
    risk_level: 'low' | 'medium' | 'high'
    flags: string[]
    rank: number
    data?: any // We will access flight properties inside data
}

export interface ItineraryDay {
    day: number
    date?: string
    location?: string
    title?: string
    description?: string
    activities?: string[]
}

export interface ChatResponse {
    message: string
    sessionId: string
    step: string
    deals?: Deal[]
    warnings?: string[]
    itinerary?: ItineraryDay[]
    suggestions?: string[]
    ui_hints?: {
        show_map: boolean
        show_timeline: boolean
        show_deals: boolean
        show_warning: boolean
        off_topic?: boolean
    }
    cost_usd?: number
}

export interface ChatRequest {
    userId: string
    message: string
    sessionId?: string
}

// NEW (Next.js)
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export async function sendChatMessage(
    req: ChatRequest,
    token: string          // Clerk session JWT — required by backend requireAuth
): Promise<ChatResponse> {
    const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(req),
    })

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(err.message ?? `HTTP ${res.status}`)
    }

    return res.json()
}
