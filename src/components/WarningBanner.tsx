interface WarningBannerProps {
    warnings: string[]
}

export default function WarningBanner({ warnings }: WarningBannerProps) {
    if (!warnings.length) return null

    return (
        <div>
            {warnings.map((w, i) => (
                <div key={i} className="warning-banner">
                    <span className="warning-icon">⚠️</span>
                    <span className="warning-text">{w}</span>
                </div>
            ))}
        </div>
    )
}
