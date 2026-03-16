'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { useTheme } from '@/context/ThemeContext'

const DARK_STYLES: google.maps.MapTypeStyle[] = [
    { elementType: 'geometry', stylers: [{ color: '#0a1a10' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#7a9e8a' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#05100a' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#05100a' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#00C896' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#0f2418' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#05100a' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#163520' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#0a1a10' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#071510' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#1a3d28' }] },
    { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#7a9e8a' }] },
    { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#0a1a10' }] },
    { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#0d2015' }] },
]

const LIGHT_STYLES: google.maps.MapTypeStyle[] = [
    { elementType: 'geometry', stylers: [{ color: '#f5f0fa' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#4a2060' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9e8f0' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#00896a' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#e0d4f0' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#e8d8f8' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#ede4f5' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#d4edda' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c9b8e0' }] },
    { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#4a2060' }] },
    { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5f0fa' }] },
    { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#ebe4f5' }] },
]

// Teardrop pin path (M12,2 C8.13,2 5,5.13 5,9 c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z inner circle at 12,9 r2)
const PIN_PATH = 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'

const PIN_ICON = {
    path: PIN_PATH,
    fillColor: '#00C896',
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 1.5,
    scale: 2,
    anchor: { x: 12, y: 22 } as google.maps.Point,
}

interface Props {
    destination: string
    onClose: () => void
}

export default function ChatMapPanel({ destination, onClose }: Props) {
    const { theme } = useTheme()
    const mapRef = useRef<HTMLDivElement>(null)
    const svRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<google.maps.Map | null>(null)
    const svPanorama = useRef<google.maps.StreetViewPanorama | null>(null)
    const svMarkerRef = useRef<google.maps.Marker | null>(null)
    const destMarkerRef = useRef<google.maps.Marker | null>(null)
    const loaderRef = useRef<boolean>(false)
    const lastLocationRef = useRef<google.maps.LatLng | null>(null)
    const [streetActive, setStreetActive] = useState(false)
    const [svError, setSvError] = useState(false)
    const [svLoading, setSvLoading] = useState(false)

    // Update map styles when theme changes
    useEffect(() => {
        if (!mapInstance.current) return
        mapInstance.current.setOptions({ styles: theme === 'light' ? LIGHT_STYLES : DARK_STYLES })
    }, [theme])

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (!apiKey || !mapRef.current || !svRef.current || loaderRef.current) return
        loaderRef.current = true

        const loader = new Loader({
            apiKey,
            version: 'weekly',
            libraries: ['places', 'geocoding'],
        })

        loader.load().then(() => {
            if (!mapRef.current || !svRef.current) return

            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 20, lng: 10 },
                zoom: 2,
                styles: theme === 'light' ? LIGHT_STYLES : DARK_STYLES,
                disableDefaultUI: true,
                zoomControl: true,
                zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
                gestureHandling: 'cooperative',
                streetViewControl: false,
            })
            mapInstance.current = map

            const panorama = new google.maps.StreetViewPanorama(svRef.current, {
                visible: false,
                disableDefaultUI: false,
                enableCloseButton: false,
                zoomControl: true,
                panControl: true,
                addressControl: true,
                addressControlOptions: { position: google.maps.ControlPosition.BOTTOM_CENTER },
                fullscreenControl: false,
                motionTracking: false,
                motionTrackingControl: false,
            })
            svPanorama.current = panorama

            // When user walks around in street view, move the mini-map marker
            panorama.addListener('position_changed', () => {
                const pos = panorama.getPosition()
                if (!pos) return
                if (svMarkerRef.current) {
                    svMarkerRef.current.setPosition(pos)
                } else {
                    svMarkerRef.current = new google.maps.Marker({
                        position: pos,
                        map,
                        icon: {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            scale: 5,
                            fillColor: '#00C896',
                            fillOpacity: 1,
                            strokeColor: '#ffffff',
                            strokeWeight: 1.5,
                            rotation: panorama.getPov()?.heading ?? 0,
                        },
                        zIndex: 10,
                    })
                }
                map.panTo(pos)
            })

            // Rotate arrow icon to match pov heading
            panorama.addListener('pov_changed', () => {
                if (!svMarkerRef.current) return
                const heading = panorama.getPov()?.heading ?? 0
                svMarkerRef.current.setIcon({
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 5,
                    fillColor: '#00C896',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 1.5,
                    rotation: heading,
                })
            })

            // Click anywhere on map → drop pin + open street view
            map.addListener('click', (e: google.maps.MapMouseEvent) => {
                if (!e.latLng) return
                lastLocationRef.current = e.latLng

                if (destMarkerRef.current) destMarkerRef.current.setMap(null)
                destMarkerRef.current = new google.maps.Marker({
                    position: e.latLng,
                    map,
                    icon: PIN_ICON,
                    animation: google.maps.Animation.DROP,
                })

                openStreetViewAt(e.latLng)
            })

            if (destination) geocodeTo(map, destination)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update when destination changes
    useEffect(() => {
        if (!mapInstance.current || !destination) return
        closeStreetView()
        setSvError(false)
        geocodeTo(mapInstance.current, destination)
    }, [destination])

    function geocodeTo(map: google.maps.Map, query: string) {
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ address: query }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
                const location = results[0].geometry.location
                lastLocationRef.current = location
                map.panTo(location)
                map.setZoom(15)

                if (destMarkerRef.current) destMarkerRef.current.setMap(null)
                destMarkerRef.current = new google.maps.Marker({
                    position: location,
                    map,
                    title: query,
                    icon: PIN_ICON,
                    animation: google.maps.Animation.DROP,
                })
            }
        })
    }

    function openStreetViewAt(location: google.maps.LatLng) {
        if (!svPanorama.current) return
        setSvError(false)
        setSvLoading(true)

        const sv = new google.maps.StreetViewService()
        sv.getPanorama(
            { location, radius: 150, preference: google.maps.StreetViewPreference.NEAREST },
            (data, status) => {
                setSvLoading(false)
                if (status === google.maps.StreetViewStatus.OK && data?.location?.latLng) {
                    svPanorama.current!.setPosition(data.location.latLng)
                    svPanorama.current!.setVisible(true)
                    setStreetActive(true)
                    // Trigger resize after React re-renders and the pane is visible
                    setTimeout(() => {
                        if (svPanorama.current) {
                            google.maps.event.trigger(svPanorama.current, 'resize')
                        }
                    }, 50)
                } else {
                    setSvError(true)
                }
            }
        )
    }

    function openStreetView() {
        const location = lastLocationRef.current
        if (!location) return
        openStreetViewAt(location)
    }

    function closeStreetView() {
        if (svPanorama.current) svPanorama.current.setVisible(false)
        if (svMarkerRef.current) { svMarkerRef.current.setMap(null); svMarkerRef.current = null }
        setStreetActive(false)
        setSvError(false)
    }

    return (
        <div className="chat-map-panel">
            {/* Header */}
            <div className="chat-map-header">
                <div className="chat-map-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{destination || 'Map'}</span>
                </div>

                <div className="chat-map-view-toggle">
                    <button
                        className={`chat-map-view-btn${!streetActive ? ' active' : ''}`}
                        onClick={closeStreetView}
                        title="Map view"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                            <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
                        </svg>
                        Map
                    </button>
                    <button
                        className={`chat-map-view-btn${streetActive ? ' active' : ''}`}
                        onClick={openStreetView}
                        title="Street view"
                        disabled={!lastLocationRef.current || svLoading}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                        </svg>
                        {svLoading ? 'Loading…' : 'Street'}
                    </button>
                </div>

                {!streetActive && (
                    <span className="chat-map-pin-hint">Click map to pin</span>
                )}
                <button className="chat-map-close" onClick={onClose} aria-label="Close map">✕</button>
            </div>

            {/* Split view: street on top, map thumbnail on bottom */}
            <div className="chat-map-body">
                {/* Street view pane — full height when active, hidden when not */}
                <div
                    ref={svRef}
                    className="chat-map-sv-pane"
                    style={{ display: streetActive ? 'block' : 'none' }}
                />

                {/* Error overlay */}
                {svError && (
                    <div className="chat-map-sv-error">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                        </svg>
                        <span>No Street View available here</span>
                        <button className="chat-map-sv-error-btn" onClick={() => setSvError(false)}>OK</button>
                    </div>
                )}

                {/* Map — full size when no street view, mini thumbnail when street view active */}
                <div
                    ref={mapRef}
                    className={streetActive ? 'chat-map-mini' : 'chat-map-canvas'}
                />
            </div>
        </div>
    )
}
