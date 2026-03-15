'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ─────────────────────────────────────────────────────────────────────────────
// Authenticated fetch wrapper
// ─────────────────────────────────────────────────────────────────────────────

async function authFetch(
    path: string,
    token: string | null,
    options: RequestInit = {},
): Promise<Response> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    } else {
        // Dev fallback — only works when backend has no CLERK_SECRET_KEY set
        headers['X-Dev-User-Id'] = 'dev_user_001';
    }

    return fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Typed API methods
// ─────────────────────────────────────────────────────────────────────────────

export async function getUserProfile(token: string | null) {
    const res = await authFetch('/users/profile', token);
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Failed to load profile' }));
        throw new Error(err.message || `Profile fetch failed: ${res.status}`);
    }
    return res.json();
}

export async function completeOnboarding(
    token: string | null,
    data: {
        passport_country: string;
        detected_timezone?: string;
        detected_currency?: string;
    },
) {
    const res = await authFetch('/users/onboarding', token, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Onboarding failed' }));
        throw new Error(err.message || `Onboarding failed: ${res.status}`);
    }
    return res.json();
}

export async function searchAirports(query: string) {
    // Public endpoint — no auth needed
    const res = await fetch(`${API_URL}/airports/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    return res.json();
}

export async function sendChatMessageJSON(
    token: string | null,
    data: { message: string; userId: string; sessionId?: string },
) {
    const res = await authFetch('/chat', token, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Chat failed' }));
        throw new Error(err.message || `Chat failed: ${res.status}`);
    }
    return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// SSE Streaming — the core chat experience
// ─────────────────────────────────────────────────────────────────────────────

export interface SSEEvent {
    type: 'progress' | 'complete' | 'error';
    step?: string;
    message?: string;
    data?: unknown;
}

export async function chatStream(
    token: string | null,
    body: { message: string; userId: string; sessionId?: string },
    onEvent: (event: SSEEvent) => void,
): Promise<void> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    } else {
        headers['X-Dev-User-Id'] = 'dev_user_001';
    }

    const response = await fetch(`${API_URL}/chat/stream`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Stream failed' }));
        onEvent({ type: 'error', message: err.message || `Stream failed: ${response.status}` });
        return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
        onEvent({ type: 'error', message: 'No response stream available' });
        return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith('data: ')) {
                    try {
                        const parsed = JSON.parse(trimmed.slice(6));
                        onEvent(parsed);
                    } catch {
                        // Skip malformed SSE lines
                    }
                }
            }
        }
    } catch (err) {
        onEvent({ type: 'error', message: err instanceof Error ? err.message : 'Stream interrupted' });
    } finally {
        reader.releaseLock();
    }
}
