export interface ItineraryDay {
    day: number;
    date?: string;
    location?: string;
    title?: string;
    description?: string;
    activities?: string[];
}

export interface ChatResponse {
    message: string;
    sessionId: string;
    step: 'clarifying' | 'confirming' | 'building' | 'completed' | 'simple_result';
    deals?: Deal[];
    warnings?: string[];
    itinerary?: ItineraryDay[];
    ui_hints: {
        show_map: boolean;
        show_timeline: boolean;
        show_deals: boolean;
        show_warning: boolean;
        off_topic?: boolean;
    };
    cost_usd?: number;
    flights_skipped?: boolean;
    suggested_actions?: SuggestedAction[];
}

export interface Deal {
    id?: string;
    deal_type: 'flight' | 'hotel' | 'activity' | 'package';
    provider: string;
    price: number;
    currency: string;
    data: Record<string, unknown>;
    risk_level: 'low' | 'medium' | 'high';
    flags: string[];
    rank?: number;
}

export interface SuggestedAction {
    label: string;
    message: string;
    type: 'flight' | 'hotel' | 'itinerary' | 'question' | 'general';
}

export interface UserProfile {
    id: string;
    email?: string;
    first_name?: string | null;
    last_name?: string | null;
    home_airport?: string | null;
    passport_country?: string | null;
    currency_preference?: string | null;
    timezone?: string | null;
    detected_timezone?: string | null;
    detected_currency?: string | null;
    onboarding_completed: boolean;
    subscription_tier: string;
    needs_onboarding: boolean;
}

export interface AirportSuggestion {
    iata: string;
    name: string;
    city: string;
    country: string;
    type: 'airport' | 'city';
}
