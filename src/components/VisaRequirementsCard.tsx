'use client'
import { useEffect, useState } from 'react'

const PASSPORT_COUNTRY_KEY = 'aela_passport_country'

type VisaStatus = 'visa-free' | 'visa-on-arrival' | 'evisa' | 'visa-required'

interface VisaInfo {
    status: VisaStatus
    duration?: string
    processing?: string
    fee?: string
    note?: string
}

// Static visa database: visaData[passportCountry][destinationCountry]
const visaData: Record<string, Record<string, VisaInfo>> = {
    India: {
        'United Kingdom':    { status: 'visa-required',   processing: '3–8 weeks',  fee: '£115',   note: 'Standard Visitor Visa required' },
        'United States':     { status: 'visa-required',   processing: '2–4 months', fee: '$185',   note: 'B-1/B-2 Tourist Visa + interview' },
        France:              { status: 'visa-required',   processing: '15 days',    fee: '€80',    note: 'Schengen Short-Stay Visa' },
        Germany:             { status: 'visa-required',   processing: '15 days',    fee: '€80',    note: 'Schengen Short-Stay Visa' },
        Italy:               { status: 'visa-required',   processing: '15 days',    fee: '€80',    note: 'Schengen Short-Stay Visa' },
        Spain:               { status: 'visa-required',   processing: '15 days',    fee: '€80',    note: 'Schengen Short-Stay Visa' },
        Netherlands:         { status: 'visa-required',   processing: '15 days',    fee: '€80',    note: 'Schengen Short-Stay Visa' },
        Australia:           { status: 'evisa',           processing: '24–72 hrs',  fee: 'A$20',   note: 'eVisitor or ETA online' },
        Canada:              { status: 'visa-required',   processing: '4–12 weeks', fee: 'CA$100', note: 'Temporary Resident Visa' },
        Japan:               { status: 'evisa',           processing: '5 business days', fee: '¥3,000', note: 'eVisa available since 2023' },
        'South Korea':       { status: 'evisa',           processing: '3 business days', fee: '₩13,000', note: 'K-ETA electronic travel auth' },
        Thailand:            { status: 'visa-free',       duration: '30 days',      note: 'Visa exemption since 2024' },
        Singapore:           { status: 'visa-free',       duration: '30 days',      note: 'Social visit pass on arrival' },
        Malaysia:            { status: 'visa-free',       duration: '30 days',      note: 'eNTRI or visa-free for short stays' },
        'United Arab Emirates': { status: 'visa-on-arrival', duration: '14 days',  fee: 'Free',   note: 'Extendable to 30 days' },
        Nepal:               { status: 'visa-free',       duration: 'Unlimited',    note: 'No visa required for Indians' },
        Maldives:            { status: 'visa-on-arrival', duration: '30 days',      fee: 'Free',   note: 'Free 30-day tourist stamp' },
        Sri Lanka:           { status: 'evisa',           processing: '1–2 days',   fee: '$35',    note: 'ETA required before travel' },
        Indonesia:           { status: 'visa-on-arrival', duration: '30 days',      fee: '$35',    note: 'VoA available at major airports' },
        Philippines:         { status: 'visa-free',       duration: '30 days',      note: 'Extended to 30 days on arrival' },
        Vietnam:             { status: 'evisa',           processing: '3 business days', fee: '$25', note: 'E-visa online application' },
        Morocco:             { status: 'visa-free',       duration: '90 days',      note: 'Visa not required' },
        Kenya:               { status: 'evisa',           processing: '3 business days', fee: '$51', note: 'eVisa online' },
        Turkey:              { status: 'evisa',           processing: '24 hrs',     fee: '$50',    note: 'e-Visa online at evisa.gov.tr' },
        Egypt:               { status: 'visa-on-arrival', duration: '30 days',      fee: '$25',    note: 'VoA at Cairo international' },
    },
    'United States': {
        'United Kingdom':    { status: 'visa-free', duration: '6 months',  note: 'ESTA not required; enter as visitor' },
        France:              { status: 'visa-free', duration: '90 days',   note: 'Schengen 90/180 rule applies' },
        Germany:             { status: 'visa-free', duration: '90 days',   note: 'Schengen 90/180 rule applies' },
        Italy:               { status: 'visa-free', duration: '90 days',   note: 'Schengen 90/180 rule applies' },
        Japan:               { status: 'visa-free', duration: '90 days',   note: 'Visa exemption agreement' },
        Australia:           { status: 'evisa',     processing: 'Minutes', fee: 'Free', note: 'ETA required; free online' },
        India:               { status: 'evisa',     processing: '24–72 hrs', fee: '$25', note: 'e-Visa online' },
        China:               { status: 'visa-free', duration: '15 days',   note: 'Visa-free since 2024 policy' },
        Brazil:              { status: 'visa-free', duration: '90 days',   note: 'Visa-free since 2024' },
        Mexico:              { status: 'visa-free', duration: '180 days',  note: 'Tourist card (FMM) on arrival' },
        Thailand:            { status: 'visa-free', duration: '30 days',   note: 'Visa exemption' },
        'United Arab Emirates': { status: 'visa-free', duration: '30 days', note: 'Visa-free' },
        Turkey:              { status: 'evisa',     processing: '24 hrs',  fee: '$50', note: 'e-Visa required' },
        Vietnam:             { status: 'evisa',     processing: '3 business days', fee: '$25', note: 'E-visa online' },
    },
    'United Kingdom': {
        France:              { status: 'visa-free', duration: '90 days',   note: 'Schengen 90/180 rule (post-Brexit)' },
        Germany:             { status: 'visa-free', duration: '90 days',   note: 'Schengen 90/180 rule (post-Brexit)' },
        Italy:               { status: 'visa-free', duration: '90 days',   note: 'Schengen 90/180 rule (post-Brexit)' },
        Spain:               { status: 'visa-free', duration: '90 days',   note: 'Schengen 90/180 rule (post-Brexit)' },
        'United States':     { status: 'visa-free', duration: '90 days',   note: 'ESTA required — apply online ($21)' },
        Australia:           { status: 'evisa',     processing: 'Minutes', fee: 'Free', note: 'ETA online; free for UK citizens' },
        Canada:              { status: 'evisa',     processing: 'Minutes', fee: 'CA$7', note: 'eTA required; apply online' },
        India:               { status: 'evisa',     processing: '24–72 hrs', fee: '$25', note: 'e-Visa online' },
        Japan:               { status: 'visa-free', duration: '90 days',   note: 'Visa exemption' },
        'United Arab Emirates': { status: 'visa-free', duration: '30 days', note: 'Visa-free' },
        Turkey:              { status: 'evisa',     processing: '24 hrs',  fee: '$50', note: 'e-Visa required' },
        Thailand:            { status: 'visa-free', duration: '30 days',   note: 'Visa exemption' },
        Vietnam:             { status: 'evisa',     processing: '3 business days', fee: '$25', note: 'E-visa online' },
        Morocco:             { status: 'visa-free', duration: '90 days',   note: 'Visa not required' },
    },
    Australia: {
        'United Kingdom':    { status: 'visa-free', duration: '6 months',  note: 'Electronic Travel Authorisation or visit visa' },
        'United States':     { status: 'evisa',     processing: 'Minutes', fee: '$14', note: 'ESTA required; fast approval' },
        France:              { status: 'visa-free', duration: '90 days',   note: 'Schengen 90/180 rule' },
        Japan:               { status: 'visa-free', duration: '90 days',   note: 'Visa exemption' },
        India:               { status: 'evisa',     processing: '24–72 hrs', fee: '$25', note: 'e-Visa online' },
        Indonesia:           { status: 'visa-on-arrival', duration: '30 days', fee: '$35', note: 'VoA at major airports' },
        Thailand:            { status: 'visa-free', duration: '30 days',   note: 'Visa exemption' },
        'United Arab Emirates': { status: 'visa-free', duration: '30 days', note: 'Visa-free' },
    },
}

const statusConfig: Record<VisaStatus, { icon: string; label: string; color: string; bg: string }> = {
    'visa-free':       { icon: '✅', label: 'Visa Free',       color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
    'visa-on-arrival': { icon: '🟡', label: 'Visa on Arrival', color: '#FBBF24', bg: 'rgba(251,191,36,0.08)' },
    'evisa':           { icon: '💻', label: 'eVisa Required',  color: '#22C8D9', bg: 'rgba(34,200,217,0.08)' },
    'visa-required':   { icon: '🛂', label: 'Visa Required',   color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
}

interface Props {
    destination: string
}

export default function VisaRequirementsCard({ destination }: Props) {
    const [passport, setPassport] = useState<string | null>(null)

    useEffect(() => {
        setPassport(localStorage.getItem(PASSPORT_COUNTRY_KEY))
    }, [])

    if (!passport || !destination) return null

    // Try to match destination (could be a city code or full name)
    const destKey = Object.keys(visaData[passport] ?? {}).find(
        k => k.toLowerCase() === destination.toLowerCase() ||
             destination.toLowerCase().includes(k.toLowerCase())
    )

    const info = passport && destKey ? visaData[passport]?.[destKey] : undefined

    if (!info) return null

    const cfg = statusConfig[info.status]

    return (
        <div className="visa-card" style={{ background: cfg.bg, borderColor: cfg.color }}>
            <div className="visa-card-header">
                <span className="visa-icon">{cfg.icon}</span>
                <div>
                    <div className="visa-status" style={{ color: cfg.color }}>{cfg.label}</div>
                    <div className="visa-route">{passport} → {destKey}</div>
                </div>
            </div>
            <div className="visa-details">
                {info.duration   && <div className="visa-detail"><span>Stay</span><strong>{info.duration}</strong></div>}
                {info.processing && <div className="visa-detail"><span>Processing</span><strong>{info.processing}</strong></div>}
                {info.fee        && <div className="visa-detail"><span>Fee</span><strong>{info.fee}</strong></div>}
            </div>
            {info.note && <p className="visa-note">{info.note}</p>}
        </div>
    )
}
