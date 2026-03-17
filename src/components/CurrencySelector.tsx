'use client';

import React from 'react';
import { useCurrency, CurrencyCode } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';

const CURRENCY_SYMBOL: Record<CurrencyCode, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    INR: '₹',
}

export default function CurrencySelector() {
    const { currency, setCurrency } = useCurrency();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const optionBg = isLight ? '#42145F' : '#0d0d0d';
    const optionColor = '#ffffff';

    return (
        <select
            className="currency-selector"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            style={{
                background: isLight ? 'rgba(66, 20, 95, 0.10)' : 'rgba(255, 255, 255, 0.05)',
                color: isLight ? '#42145F' : 'var(--text-primary)',
                border: `1px solid ${isLight ? 'rgba(66, 20, 95, 0.30)' : 'var(--border)'}`,
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
            }}
        >
            <option value="GBP" style={{ background: optionBg, color: optionColor }}>{CURRENCY_SYMBOL.GBP} GBP</option>
            <option value="USD" style={{ background: optionBg, color: optionColor }}>{CURRENCY_SYMBOL.USD} USD</option>
            <option value="EUR" style={{ background: optionBg, color: optionColor }}>{CURRENCY_SYMBOL.EUR} EUR</option>
            <option value="INR" style={{ background: optionBg, color: optionColor }}>{CURRENCY_SYMBOL.INR} INR</option>
        </select>
    );
}
