'use client'
import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const storyPlaces = [
    { name: 'Rome', country: 'Italy', placeQuery: 'Colosseum, Rome', lat: 41.8902, lng: 12.4922, color: '#ff6b5a' },
    { name: 'Bali', country: 'Indonesia', placeQuery: 'Ubud, Bali', lat: -8.3405, lng: 115.0920, color: '#22c8d9' },
    { name: 'Lisbon', country: 'Portugal', placeQuery: 'Belém Tower, Lisbon', lat: 38.6916, lng: -9.2160, color: '#fbbf24' },
]

const MAP_STYLES: google.maps.MapTypeStyle[] = [
    { elementType: 'geometry', stylers: [{ color: '#0d1b2a' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#0d1b2a' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a1628' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#22c8d9' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1a2d44' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#0d1b2a' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#22354e' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#152232' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#0d2137' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#1f3650' }] },
    { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#9da5b3' }] },
    { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#0f1f30' }] },
]

type PlaceInfo = { name: string; photo: string | null; rating: number | null; address: string }

export default function GooglePlacesMap({ activeStory }: { activeStory: number }) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<google.maps.Map | null>(null)
    const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null)
    const [loadError, setLoadError] = useState(false)

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (!apiKey || !mapRef.current) return

        const loader = new Loader({ apiKey, version: 'weekly' })

        Promise.all([
            loader.importLibrary('maps'),
            loader.importLibrary('places'),
            loader.importLibrary('marker'),
        ]).then(([mapsLib]) => {
            if (!mapRef.current) return

            const { Map } = mapsLib as google.maps.MapsLibrary

            const map = new Map(mapRef.current, {
                center: { lat: 20, lng: 10 },
                zoom: 2,
                styles: MAP_STYLES,
                disableDefaultUI: true,
                zoomControl: true,
                gestureHandling: 'cooperative',
            })
            mapInstance.current = map

            const service = new google.maps.places.PlacesService(map)

            storyPlaces.forEach((place) => {
                const marker = new google.maps.Marker({
                    position: { lat: place.lat, lng: place.lng },
                    map,
                    title: place.name,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: place.color,
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeWeight: 2,
                    },
                    label: {
                        text: place.name,
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '600',
                    },
                    animation: google.maps.Animation.DROP,
                })

                marker.addListener('click', () => {
                    map.panTo({ lat: place.lat, lng: place.lng })
                    map.setZoom(12)
                    service.findPlaceFromQuery(
                        { query: place.placeQuery, fields: ['name', 'photos', 'rating', 'formatted_address'] },
                        (results, status) => {
                            if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]) {
                                const r = results[0]
                                setPlaceInfo({
                                    name: r.name ?? place.name,
                                    photo: r.photos?.[0]?.getUrl({ maxWidth: 400 }) ?? null,
                                    rating: r.rating ?? null,
                                    address: r.formatted_address ?? place.country,
                                })
                            }
                        }
                    )
                })
            })
        }).catch(() => setLoadError(true))
    }, [])

    // Pan to active story marker
    useEffect(() => {
        if (!mapInstance.current) return
        const place = storyPlaces[activeStory]
        if (!place) return
        mapInstance.current.panTo({ lat: place.lat, lng: place.lng })
        mapInstance.current.setZoom(6)
        setPlaceInfo(null)
    }, [activeStory])

    if (loadError) return (
        <div className="gmap-error">
            <p>Map unavailable — check your API key.</p>
        </div>
    )

    return (
        <div className="gmap-wrapper">
            <div ref={mapRef} className="gmap-canvas" />
            {placeInfo && (
                <div className="gmap-place-card">
                    {placeInfo.photo && <img src={placeInfo.photo} alt={placeInfo.name} className="gmap-place-photo" />}
                    <div className="gmap-place-body">
                        <p className="gmap-place-name">{placeInfo.name}</p>
                        {placeInfo.rating && <p className="gmap-place-rating">⭐ {placeInfo.rating.toFixed(1)}</p>}
                        <p className="gmap-place-addr">{placeInfo.address}</p>
                    </div>
                    <button className="gmap-place-close" onClick={() => setPlaceInfo(null)}>✕</button>
                </div>
            )}
            <div className="gmap-hint">Click a marker to explore</div>
        </div>
    )
}
