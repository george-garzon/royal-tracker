"use client";

import { useEffect, useRef } from "react";
import { ships } from "@/lib/ships";

export default function MapKitMap({ focusShip }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        if (!window.mapkit) return;

        window.mapkit.init({
            authorizationCallback: (done) => {
                done(process.env.NEXT_PUBLIC_MAPKIT_TOKEN);
            },
        });

        const map = new window.mapkit.Map(mapRef.current, {
            showsCompass: window.mapkit.FeatureVisibility.Adaptive,
            showsScale: window.mapkit.FeatureVisibility.Hidden,
            isRotationEnabled: false,
            isZoomEnabled: true,
        });

        mapInstance.current = map;

        // Add ship markers
        ships.forEach((ship) => {
            const coord = new window.mapkit.Coordinate(ship.lat, ship.lon);

            const marker = new window.mapkit.MarkerAnnotation(coord, {
                title: ship.name,
                subtitle: ship.dest ?? "",
                glyphText: "🚢",
            });

            map.addAnnotation(marker);
        });

    }, []);

    // Center map on selected ship
    useEffect(() => {
        if (!focusShip || !mapInstance.current) return;

        const coord = new window.mapkit.Coordinate(focusShip.lat, focusShip.lon);

        mapInstance.current.setCenterAnimated(coord, true);
    }, [focusShip]);

    return (
        <div ref={mapRef} className="absolute inset-0 z-0" />
    );
}
