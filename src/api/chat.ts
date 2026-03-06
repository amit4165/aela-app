export interface Deal {
    origin: string
    destination: string
    price: number
    airline?: string
    departureDate?: string
    returnDate?: string
    duration?: string
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
    ui_hints?: {
        show_map: boolean
        show_timeline: boolean
        show_deals: boolean
        show_warning: boolean
    }
    cost_usd?: number
}

export interface ChatRequest {
    userId: string
    message: string
    sessionId?: string
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function sendChatMessage(req: ChatRequest): Promise<ChatResponse> {
    const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
    })

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(err.message ?? `HTTP ${res.status}`)
    }

    return res.json()
}
