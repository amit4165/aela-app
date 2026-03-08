'use client'
import { useState } from 'react'

export type QuizAnswers = { mood: string; budget: string; days: string }

type Props = {
    onComplete: (answers: QuizAnswers) => void
    onProgress: (step: number) => void
}

const slides = [
    {
        id: 'mood',
        question: "What's your mood?",
        subtitle: 'Set the vibe for your perfect trip',
        options: [
            { label: 'Relaxed', icon: '🏖️', accent: 'turquoise' },
            { label: 'Solo', icon: '🎒', accent: 'coral' },
            { label: 'Adventure', icon: '🏔️', accent: 'yellow' },
            { label: 'Family', icon: '👨‍👩‍👧', accent: 'turquoise' },
        ],
    },
    {
        id: 'budget',
        question: 'Budget per person?',
        subtitle: "We'll find the best value in your range",
        options: [
            { label: '£300–£600', icon: '💰', accent: 'turquoise' },
            { label: '£600–£1200', icon: '💳', accent: 'coral' },
            { label: '£1200+', icon: '✨', accent: 'yellow' },
        ],
    },
    {
        id: 'days',
        question: 'How long away?',
        subtitle: "We'll craft an itinerary that fits perfectly",
        options: [
            { label: 'Weekend', icon: '⚡', accent: 'turquoise' },
            { label: '4–7 days', icon: '🗓️', accent: 'coral' },
            { label: '7+ days', icon: '🌍', accent: 'yellow' },
        ],
    },
]

export default function TripQuiz({ onComplete, onProgress }: Props) {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState<string | null>(null)

    const currentSlide = slides[step]

    const handleSelect = (label: string) => {
        if (selected) return
        setSelected(label)
        const key = currentSlide.id as keyof QuizAnswers
        const newAnswers = { ...answers, [key]: label }
        setAnswers(newAnswers)

        setTimeout(() => {
            if (step < slides.length - 1) {
                setStep(step + 1)
                setSelected(null)
                onProgress(step + 1)
            } else {
                setLoading(true)
                onProgress(3)
                setTimeout(() => onComplete(newAnswers as QuizAnswers), 2200)
            }
        }, 320)
    }

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1)
            setSelected(null)
            onProgress(step - 1)
        }
    }

    if (loading) {
        return (
            <div className="quiz-loading">
                <div className="quiz-spinner" />
                <p className="quiz-loading-text">Finding your perfect trip…</p>
                <div className="quiz-loading-dots">
                    <span /><span /><span />
                </div>
            </div>
        )
    }

    return (
        <div className="quiz-container" key={step}>
            <div className="quiz-dots">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`quiz-dot ${i === step ? 'quiz-dot-active' : ''} ${i < step ? 'quiz-dot-done' : ''}`}
                    />
                ))}
            </div>

            <h2 className="quiz-question">{currentSlide.question}</h2>
            <p className="quiz-sub">{currentSlide.subtitle}</p>

            <div className={`quiz-options quiz-options-${currentSlide.options.length}`}>
                {currentSlide.options.map((opt) => (
                    <button
                        key={opt.label}
                        className={`quiz-option quiz-option-${opt.accent} ${selected === opt.label ? 'quiz-option-selected' : ''}`}
                        onClick={() => handleSelect(opt.label)}
                    >
                        <span className="quiz-option-icon">{opt.icon}</span>
                        <span className="quiz-option-label">{opt.label}</span>
                    </button>
                ))}
            </div>

            {step > 0 && (
                <button className="quiz-back" onClick={handleBack}>← Back</button>
            )}
        </div>
    )
}
