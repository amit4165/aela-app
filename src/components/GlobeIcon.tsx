'use client'

export default function GlobeIcon({ size = 56 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 56 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Aela"
        >
            <defs>
                {/* Mask: white = show globe lines, black = hide */}
                <mask id="a-letter-mask">
                    <rect width="56" height="60" fill="black" />
                    <text
                        x="28"
                        y="56"
                        textAnchor="middle"
                        fontFamily="'Cormorant Garamond', Georgia, serif"
                        fontSize="56"
                        fontWeight="400"
                        fill="white"
                    >
                        a
                    </text>
                </mask>
            </defs>

            {/* Globe lines — only visible inside the 'a' shape */}
            <g mask="url(#a-letter-mask)" stroke="currentColor" fill="none">
                {/* Main globe circle — centered in bowl of 'a' */}
                <circle cx="22" cy="38" r="17" strokeWidth="1.3" />
                {/* Equatorial ellipse */}
                <ellipse cx="22" cy="38" rx="17" ry="5" strokeWidth="1" />
                {/* Vertical meridian */}
                <line x1="22" y1="21" x2="22" y2="55" strokeWidth="1" />
                {/* Upper latitude ellipse */}
                <ellipse cx="22" cy="31" rx="12" ry="3.5" strokeWidth="0.8" />
            </g>

            {/* 'a' outline on top */}
            <text
                x="28"
                y="56"
                textAnchor="middle"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="56"
                fontWeight="400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
            >
                a
            </text>
        </svg>
    )
}
