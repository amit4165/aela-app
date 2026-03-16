'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'dark',
    toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')

    // Load saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem('aela-theme') as Theme | null
        if (saved === 'light' || saved === 'dark') {
            setTheme(saved)
            document.documentElement.setAttribute('data-theme', saved)
        }
    }, [])

    const toggleTheme = () => {
        const next: Theme = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        localStorage.setItem('aela-theme', next)
        document.documentElement.setAttribute('data-theme', next)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
