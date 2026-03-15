const TIMEZONE_CURRENCY: Record<string, string> = {
    'Europe/London': 'GBP',
    'Europe/Paris': 'EUR',
    'Europe/Berlin': 'EUR',
    'Europe/Rome': 'EUR',
    'Europe/Madrid': 'EUR',
    'Europe/Amsterdam': 'EUR',
    'Europe/Dublin': 'EUR',
    'Europe/Lisbon': 'EUR',
    'Europe/Athens': 'EUR',
    'Europe/Vienna': 'EUR',
    'Europe/Brussels': 'EUR',
    'Europe/Helsinki': 'EUR',
    'Europe/Warsaw': 'PLN',
    'Europe/Prague': 'CZK',
    'Europe/Budapest': 'HUF',
    'Europe/Zurich': 'CHF',
    'Europe/Stockholm': 'SEK',
    'Europe/Oslo': 'NOK',
    'Europe/Copenhagen': 'DKK',
    'Europe/Istanbul': 'TRY',
    'America/New_York': 'USD',
    'America/Chicago': 'USD',
    'America/Denver': 'USD',
    'America/Los_Angeles': 'USD',
    'America/Toronto': 'CAD',
    'America/Vancouver': 'CAD',
    'America/Mexico_City': 'MXN',
    'America/Sao_Paulo': 'BRL',
    'America/Argentina/Buenos_Aires': 'ARS',
    'America/Bogota': 'COP',
    'Asia/Tokyo': 'JPY',
    'Asia/Seoul': 'KRW',
    'Asia/Shanghai': 'CNY',
    'Asia/Hong_Kong': 'HKD',
    'Asia/Singapore': 'SGD',
    'Asia/Kolkata': 'INR',
    'Asia/Dubai': 'AED',
    'Asia/Bangkok': 'THB',
    'Asia/Jakarta': 'IDR',
    'Australia/Sydney': 'AUD',
    'Australia/Melbourne': 'AUD',
    'Pacific/Auckland': 'NZD',
    'Africa/Johannesburg': 'ZAR',
    'Africa/Cairo': 'EGP',
    'Africa/Nairobi': 'KES',
};

export function detectLocale(): { timezone: string; currency: string } {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currency = TIMEZONE_CURRENCY[timezone] ?? 'GBP';
        return { timezone, currency };
    } catch {
        return { timezone: 'Europe/London', currency: 'GBP' };
    }
}

export function formatPrice(amount: number, currency: string, locale = 'en-GB'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
