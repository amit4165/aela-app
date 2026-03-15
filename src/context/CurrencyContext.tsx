'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'INR';

interface ExchangeRates {
    [key: string]: number;
}

interface CurrencyContextType {
    currency: CurrencyCode;
    setCurrency: (currency: CurrencyCode) => void;
    rates: ExchangeRates | null;
    convert: (amountInUsd: number, toCurrency?: CurrencyCode, customRates?: ExchangeRates | null) => number;
    format: (amount: number, currencyCode?: CurrencyCode) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState<CurrencyCode>('GBP');
    const [rates, setRates] = useState<ExchangeRates | null>(null);

    useEffect(() => {
        // Fetch real-time rates (USD base)
        fetch('https://open.er-api.com/v6/latest/USD')
            .then((res) => res.json())
            .then((data) => {
                if (data && data.rates) {
                    setRates(data.rates);
                }
            })
            .catch((err) => console.error('Failed to fetch exchange rates:', err));
    }, []);

    // Helper functions
    const convert = (amountInUsd: number, toCurrency: CurrencyCode = currency, customRates: ExchangeRates | null = rates) => {
        if (!customRates || toCurrency === 'USD') return amountInUsd;
        const rate = customRates[toCurrency];
        return rate ? amountInUsd * rate : amountInUsd;
    };

    const format = (amount: number, currencyCode: CurrencyCode = currency) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, rates, convert, format }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
