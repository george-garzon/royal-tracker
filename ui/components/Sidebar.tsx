"use client";

import { ships } from "@/lib/ships";
import { useState } from "react";
import { Ship } from "@/types/Ship";

interface SidebarProps {
    onSelect: (ship: Ship) => void;
    onOpenInfo: () => void;
}

export default function Sidebar({ onSelect, onOpenInfo }: SidebarProps) {
    const [activeTab, setActiveTab] = useState("ships"); // "ships" | "lines"
    const [activeShip, setActiveShip] = useState<string | null>(null);
    const [activeCruiseLine, setActiveCruiseLine] = useState<string | null>(null);

    // Get unique cruise lines
    const cruiseLines = [...new Set(ships.map((s) => s.cruiseLine))];

    // Ships sorted by "newest"
    let shipList = [...ships].sort((a, b) => a.minutesAgo - b.minutesAgo);

    // Filter by cruise line if selected
    if (activeCruiseLine) {
        shipList = shipList.filter((s) => s.cruiseLine === activeCruiseLine);
    }

    return (
        <div
            className="
        bg-white/80 backdrop-blur-xl flex flex-col z-20

        /* Mobile (default) */
        fixed bottom-0 left-0 w-full h-1/3 border-t border-gray-200/50

        /* Desktop */
        md:absolute md:top-0 md:left-0 md:h-full md:w-80 md:border-t-0 md:border-r
    "
        >

            {/* Traffic Light */}
            <div className="flex items-center h-12 px-4">
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-4 pb-4 border-b border-gray-200/50">
                <div className="bg-gray-200 rounded-md p-0.5 flex w-full">

                    {/* Ships Tab */}
                    <button
                        onClick={() => {
                            setActiveTab("ships");
                            setActiveCruiseLine(null);
                        }}
                        className={`flex-1 px-3 py-0.25 text-sm font-medium rounded-md transition
              ${activeTab === "ships" ? "bg-white text-gray-900 shadow-sm" : "font-medium text-gray-600 hover:text-gray-900"}
            `}
                    >
                        Cruise Ships
                    </button>

                    {/* Cruise Lines Tab */}
                    <button
                        onClick={() => {
                            setActiveTab("lines");
                            setActiveShip(null);
                        }}
                        className={`flex-1 px-3 py-0.25 text-sm font-medium rounded-md transition
              ${activeTab === "lines" ? "bg-white text-gray-900 shadow-sm" : "font-medium text-gray-600 hover:text-gray-900"}
            `}
                    >

                        Cruise Lines
                    </button>
                </div>
            </div>

            {/* === TAB CONTENT === */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">

                {/* Cruise Lines Tab */}
                {activeTab === "lines" && (
                    <div className="space-y-3">
                        {cruiseLines.map((line) => (
                            <div
                                key={line}
                                onClick={() => {
                                    setActiveCruiseLine(line);
                                    setActiveTab("ships");
                                }}
                                className="cursor-pointer p-3 font-semibold text-gray-900 rounded-lg border bg-white border-gray-200 hover:bg-gray-50 font-medium"
                            >
                                {line}
                            </div>
                        ))}
                    </div>
                )}

                {/* Cruise Ships Tab */}
                {activeTab === "ships" && (
                    <>
                        {shipList.map((ship: Ship) => (
                            <div
                                key={ship.name}
                                onClick={() => {
                                    setActiveShip(ship.name);
                                    onSelect(ship);
                                }}
                                className={`cursor-pointer p-3 rounded-lg border transition
                  ${activeShip === ship.name ? "bg-blue-100 border-blue-400" : "bg-white border-gray-200 hover:bg-gray-50"}
                `}
                            >
                                <div className="font-semibold text-gray-900">{ship.name}</div>
                                <div className="text-gray-600 text-sm">{ship.dest}</div>
                                <div className="text-gray-400 text-xs">{ship.minutesAgo} min ago</div>
                            </div>
                        ))}
                    </>
                )}

            </div>

            {/* Footer */}
            <div className="px-6 py-2 border-t border-gray-200/60">
                <button
                    className="cursor-pointer w-full flex items-center text-left text-gray-600 hover:text-gray-700 font-medium text-sm py-1.5 rounded-lg gap-2"
                    onClick={() => onOpenInfo()}
                >
                    How does this work?
                </button>
            </div>
        </div>
    );
}
