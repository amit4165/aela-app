'use client';

import React from 'react';
import { useCurrency, CurrencyCode } from '../context/CurrencyContext';

export default function CurrencySelector() {
    const { currency, setCurrency } = useCurrency();

    return (
        <select
            className="currency-selector"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none', // Remove native arrow
            }}
        >
            <option value="USD" style={{ background: '#0d0d0d' }}>🇺🇸 USD</option>
            <option value="EUR" style={{ background: '#0d0d0d' }}>🇪🇺 EUR</option>
            <option value="INR" style={{ background: '#0d0d0d' }}>🇮🇳 INR</option>
        </select>
    );
}
