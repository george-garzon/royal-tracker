"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ships } from "@/lib/ships";
import { Ship } from "@/types/Ship";

interface MapLibreMapProps {
    focusShip: Ship | null;
}


export default function MapLibreMap({ focusShip } : MapLibreMapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = new maplibregl.Map({
            container: mapRef.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
            center: [0, 0],
            zoom: 2,
            pitch: 0,
        });

        mapInstance.current = map;

        map.addControl(new maplibregl.NavigationControl(), "top-right");

        ships.forEach((ship) => {
            const el = document.createElement("div");

            // --- create first 2 letters of the ship name ---
            const initials = (ship.name || "?").slice(0, 2).toUpperCase();

            el.className = "ship-marker";
            el.innerHTML = `<span>${initials}</span>`;

            new maplibregl.Marker({
                element: el,
                anchor: "center",
            })
                .setLngLat([ship.lon, ship.lat])
                .addTo(map);
        });


        return () => map.remove();
    }, []);

    useEffect(() => {
        if (!focusShip || !mapInstance.current) return;

        mapInstance.current.flyTo({
            center: [focusShip.lon, focusShip.lat],
            zoom: 7,
            essential: true,
            speed: 1.2,
            curve: 1.5,
        });
    }, [focusShip]);

    return <div ref={mapRef} className="absolute inset-0 z-0 h-full w-full overflow-hidden" />;
}
