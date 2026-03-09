'use client'
import { useState, useEffect } from 'react'

const quotes = [
    { text: "Travel is the only thing you buy that makes you richer.", author: "Anonymous" },
    { text: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine" },
    { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
    { text: "To travel is to live.", author: "Hans Christian Andersen" },
    { text: "Life is short and the world is wide.", author: "Simon Raven" },
    { text: "Adventure is worthwhile in itself.", author: "Amelia Earhart" },
]

export default function TravelQuote() {
    const [index, setIndex] = useState(0)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const t = setInterval(() => {
            setVisible(false)
            setTimeout(() => {
                setIndex(i => (i + 1) % quotes.length)
                setVisible(true)
            }, 500)
        }, 4500)
        return () => clearInterval(t)
    }, [])

    const q = quotes[index]

    return (
        <div className="travel-quote-section">
            <div className="travel-quote-inner">
                <div className="travel-quote-deco">"</div>
                <blockquote className={`travel-quote-text ${visible ? 'tq-visible' : 'tq-hidden'}`}>
                    {q.text}
                </blockquote>
                <p className={`travel-quote-author ${visible ? 'tq-visible' : 'tq-hidden'}`}>
                    — {q.author}
                </p>
                <div className="travel-quote-dots">
                    {quotes.map((_, i) => (
                        <button
                            key={i}
                            className={`tq-dot ${i === index ? 'tq-dot-active' : ''}`}
                            onClick={() => { setVisible(false); setTimeout(() => { setIndex(i); setVisible(true) }, 300) }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
