'use client'

type Props = { step: number }

const labels = [
    'Tell us your vibe',
    'Set your budget',
    'Choose trip length',
    'Plan ready ↓',
]

export default function ProgressBar({ step }: Props) {
    const pct = Math.round((step / 3) * 100)
    return (
        <div className="progress-wrap">
            <div className="progress-inner">
                <span className="progress-label">{pct}% complete — {labels[Math.min(step, 3)]}</span>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
                {step < 3 && <span className="progress-hint">See full plan ↓</span>}
            </div>
        </div>
    )
}
