'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import ChatSidebar, { type ChatSession } from '@/components/ChatSidebar'
import { COUNTRIES } from '@/lib/countries'

interface TravellerProfile {
    id: string
    fullName: string
    dateOfBirth: string
    nationality: string
    passportNumber: string
    passportExpiry: string
    email: string
    phone: string
}

const PROFILES_KEY = 'aela_traveller_profiles'
const RECENT_CHATS_KEY = 'aela_recent_chats'
const SIDEBAR_COLLAPSED_KEY = 'aela_sidebar_collapsed'

function emptyProfile(): Omit<TravellerProfile, 'id'> {
    return {
        fullName: '',
        dateOfBirth: '',
        nationality: '',
        passportNumber: '',
        passportExpiry: '',
        email: '',
        phone: '',
    }
}

export default function PassportsPage() {
    const { user } = useUser()
    const [profiles, setProfiles] = useState<TravellerProfile[]>([])
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState<TravellerProfile | null>(null)
    const [form, setForm] = useState(emptyProfile())
    const [recentChats, setRecentChats] = useState<ChatSession[]>([])
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    useEffect(() => {
        document.body.classList.add('hide-nav')
        return () => document.body.classList.remove('hide-nav')
    }, [])

    useEffect(() => {
        const saved = localStorage.getItem(PROFILES_KEY)
        if (saved) setProfiles(JSON.parse(saved))
        const chats = localStorage.getItem(RECENT_CHATS_KEY)
        if (chats) setRecentChats(JSON.parse(chats))
        const col = localStorage.getItem(SIDEBAR_COLLAPSED_KEY)
        if (col) setSidebarCollapsed(col === 'true')
    }, [])

    const saveProfiles = (updated: TravellerProfile[]) => {
        setProfiles(updated)
        localStorage.setItem(PROFILES_KEY, JSON.stringify(updated))
    }

    const openAdd = () => {
        setEditing(null)
        setForm(emptyProfile())
        setShowForm(true)
    }

    const openEdit = (p: TravellerProfile) => {
        setEditing(p)
        setForm({ fullName: p.fullName, dateOfBirth: p.dateOfBirth, nationality: p.nationality, passportNumber: p.passportNumber, passportExpiry: p.passportExpiry, email: p.email, phone: p.phone })
        setShowForm(true)
    }

    const handleSave = () => {
        if (!form.fullName || !form.nationality) return
        if (editing) {
            saveProfiles(profiles.map(p => p.id === editing.id ? { ...form, id: editing.id } : p))
        } else {
            saveProfiles([...profiles, { ...form, id: crypto.randomUUID() }])
        }
        setShowForm(false)
    }

    const handleDelete = (id: string) => {
        saveProfiles(profiles.filter(p => p.id !== id))
    }

    const toggleSidebar = () => {
        const next = !sidebarCollapsed
        setSidebarCollapsed(next)
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next))
    }

    const pinSidebar = () => {
        setSidebarCollapsed(false)
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'false')
    }

    const sidebarW = sidebarCollapsed ? '52px' : '240px'

    const countryName = (code: string) => COUNTRIES.find(c => c.code === code)?.name ?? code
    const countryFlag = (code: string) => COUNTRIES.find(c => c.code === code)?.flag ?? ''

    return (
        <div className="chat-layout" style={{ '--sidebar-w': sidebarW } as React.CSSProperties}>
            <ChatSidebar
                onNewChat={() => {}}
                recentChats={recentChats}
                collapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
                pinned={!sidebarCollapsed}
                onPin={pinSidebar}
            />

            <main className={`passports-main${sidebarCollapsed ? ' passports-main-collapsed' : ''}`}>
                <div className="passports-page">

                    <div className="passports-header">
                        <div className="passports-header-left">
                            <div className="passports-title-icon">🛂</div>
                            <div>
                                <h1 className="passports-title">Passports</h1>
                                <p className="passports-subtitle">Your saved traveller profiles. Select one at checkout and everything fills in instantly.</p>
                            </div>
                        </div>
                        <button className="passports-add-btn" onClick={openAdd}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Add Traveller
                        </button>
                    </div>

                    {profiles.length === 0 && !showForm && (
                        <div className="passports-empty">
                            <div className="passports-empty-icon">🌍</div>
                            <h3 className="passports-empty-title">No traveller profiles yet</h3>
                            <p className="passports-empty-text">Add your details once — Aela will autofill them every time you book.</p>
                            <button className="passports-add-btn" onClick={openAdd}>Add Your First Profile</button>
                        </div>
                    )}

                    {/* Profile cards */}
                    {profiles.length > 0 && (
                        <div className="passports-grid">
                            {profiles.map(p => (
                                <div key={p.id} className="passports-card">
                                    <div className="passports-card-top">
                                        <div className="passports-card-avatar">
                                            {p.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                        </div>
                                        <div className="passports-card-info">
                                            <div className="passports-card-name">{p.fullName}</div>
                                            <div className="passports-card-nationality">
                                                {countryFlag(p.nationality)} {countryName(p.nationality)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="passports-card-fields">
                                        {p.dateOfBirth && (
                                            <div className="passports-card-field">
                                                <span className="passports-field-label">Date of Birth</span>
                                                <span className="passports-field-value">{p.dateOfBirth}</span>
                                            </div>
                                        )}
                                        {p.passportNumber && (
                                            <div className="passports-card-field">
                                                <span className="passports-field-label">Passport No.</span>
                                                <span className="passports-field-value">{p.passportNumber.slice(0, 3)}••••••</span>
                                            </div>
                                        )}
                                        {p.passportExpiry && (
                                            <div className="passports-card-field">
                                                <span className="passports-field-label">Expires</span>
                                                <span className="passports-field-value">{p.passportExpiry}</span>
                                            </div>
                                        )}
                                        {p.email && (
                                            <div className="passports-card-field">
                                                <span className="passports-field-label">Email</span>
                                                <span className="passports-field-value">{p.email}</span>
                                            </div>
                                        )}
                                        {p.phone && (
                                            <div className="passports-card-field">
                                                <span className="passports-field-label">Phone</span>
                                                <span className="passports-field-value">{p.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="passports-card-actions">
                                        <button className="passports-card-btn passports-card-edit" onClick={() => openEdit(p)}>Edit</button>
                                        <button className="passports-card-btn passports-card-delete" onClick={() => handleDelete(p.id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add / Edit form */}
                    {showForm && (
                        <div className="passports-form-overlay" onClick={() => setShowForm(false)}>
                            <div className="passports-form" onClick={e => e.stopPropagation()}>
                                <h2 className="passports-form-title">{editing ? 'Edit Traveller' : 'New Traveller Profile'}</h2>

                                <div className="passports-form-grid">
                                    <div className="passports-form-field">
                                        <label className="passports-form-label">Full Name *</label>
                                        <input className="passports-form-input" placeholder="As shown on passport" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
                                    </div>
                                    <div className="passports-form-field">
                                        <label className="passports-form-label">Date of Birth</label>
                                        <input className="passports-form-input" type="date" value={form.dateOfBirth} onChange={e => setForm(f => ({ ...f, dateOfBirth: e.target.value }))} />
                                    </div>
                                    <div className="passports-form-field">
                                        <label className="passports-form-label">Nationality *</label>
                                        <select className="passports-form-input" value={form.nationality} onChange={e => setForm(f => ({ ...f, nationality: e.target.value }))}>
                                            <option value="">Select country…</option>
                                            {COUNTRIES.map(c => (
                                                <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="passports-form-field">
                                        <label className="passports-form-label">Passport Number</label>
                                        <input className="passports-form-input" placeholder="e.g. 123456789" value={form.passportNumber} onChange={e => setForm(f => ({ ...f, passportNumber: e.target.value }))} />
                                    </div>
                                    <div className="passports-form-field">
                                        <label className="passports-form-label">Passport Expiry</label>
                                        <input className="passports-form-input" type="date" value={form.passportExpiry} onChange={e => setForm(f => ({ ...f, passportExpiry: e.target.value }))} />
                                    </div>
                                    <div className="passports-form-field">
                                        <label className="passports-form-label">Email</label>
                                        <input className="passports-form-input" type="email" placeholder="for booking confirmations" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                                    </div>
                                    <div className="passports-form-field">
                                        <label className="passports-form-label">Phone</label>
                                        <input className="passports-form-input" type="tel" placeholder="+44 7700 000000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                                    </div>
                                </div>

                                <div className="passports-form-actions">
                                    <button className="passports-form-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                                    <button className="passports-form-save" onClick={handleSave} disabled={!form.fullName || !form.nationality}>
                                        {editing ? 'Save Changes' : 'Add Profile'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
