"use client";

import { useState } from "react";
import MapKitMap from "@/components/MapKitMap";
import Sidebar from "@/components/Sidebar";
import InfoModal from "@/components/InfoModal";
import MapLibreMap from "@/components/MapLibreGLMap";

export default function Home() {
    const [selectedShip, setSelectedShip] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);

    return (
        <div className="flex h-screen relative">

            {/* Map */}
            {/*<MapKitMap focusShip={selectedShip} />*/}
            <MapLibreMap focusShip={selectedShip} />

            {/* Sidebar */}
            <Sidebar
                onSelect={(ship) => setSelectedShip(ship)}
                onOpenInfo={() => setInfoOpen(true)}
            />

            {/* Info Modal */}
            <InfoModal
                open={infoOpen}
                onClose={() => setInfoOpen(false)}
            />

        </div>
    );
}
