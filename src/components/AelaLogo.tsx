'use client'

interface AelaLogoProps {
    showTagline?: boolean
    collapsed?: boolean
}

export default function AelaLogo({ showTagline = false, collapsed = false }: AelaLogoProps) {
    if (collapsed) {
        return (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Aela" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="0.9" fill="none" />
                <line x1="16" y1="3" x2="16" y2="29" stroke="currentColor" strokeWidth="0.9" />
                <ellipse cx="16" cy="16" rx="13" ry="4.5" stroke="currentColor" strokeWidth="0.9" fill="none" />
                <ellipse cx="16" cy="11" rx="8.5" ry="2.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
                {/* Orbit arrow */}
                <path d="M 6 24 C 1 8 31 4 27 9" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                <polygon points="27,9 22,10 25,5" fill="currentColor" />
            </svg>
        )
    }

    const h = showTagline ? 90 : 74

    return (
        <svg
            width="200"
            height={h}
            viewBox={`0 0 200 ${h}`}
            fill="none"
            aria-label="Aela"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Globe — represents the letter "a" */}
            <circle cx="35" cy="36" r="28" stroke="currentColor" strokeWidth="0.9" fill="none" />
            <line x1="35" y1="8" x2="35" y2="64" stroke="currentColor" strokeWidth="0.9" />
            <ellipse cx="35" cy="36" rx="28" ry="9" stroke="currentColor" strokeWidth="0.9" fill="none" />
            <ellipse cx="35" cy="25" rx="19" ry="5.5" stroke="currentColor" strokeWidth="0.7" fill="none" />

            {/* Orbit arrow — curves around the top of the globe */}
            <path d="M 13 55 C 3 12 68 4 62 18" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <polygon points="62,18 56,18 60,12" fill="currentColor" />

            {/* "ela" — Cormorant Garamond Light */}
            <text
                x="70"
                y="56"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="54"
                fontWeight="300"
                fill="currentColor"
                letterSpacing="1"
            >
                ela
            </text>

            {/* Tagline */}
            {showTagline && (
                <text
                    x="100"
                    y="80"
                    textAnchor="middle"
                    fontFamily="'Inter', sans-serif"
                    fontSize="8.5"
                    fontWeight="400"
                    fill="currentColor"
                    letterSpacing="3.5"
                    style={{ opacity: 0.55 }}
                >
                    EXPLORE THE WORLD
                </text>
            )}
        </svg>
    )
}
