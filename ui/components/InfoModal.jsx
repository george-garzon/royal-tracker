"use client";

export default function InfoModal({ open, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white shadow-xl rounded-2xl max-w-lg w-full p-10 z-50 animate-fadeIn scale-100">

                <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
                    Find My Cruise Ships
                </h2>

                <div className="space-y-6 text-gray-700">

                    <div className="flex gap-3">
                        <div className="text-2xl">🛥️</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Live Cruise Tracking</h3>
                            <p className="text-sm text-gray-600">
                                This dashboard shows the latest AIS-reported positions of major Royal Caribbean ships.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="text-2xl">📡</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Where is the data from?</h3>
                            <p className="text-sm text-gray-600">
                                Ship locations are collected from public AIS feeds combined with CruiseMapper tracking
                                data.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="text-2xl">⚡</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Updated in near real-time</h3>
                            <p className="text-sm text-gray-600">
                                Positions update as new AIS reports come in.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer text-white font-medium px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-shadow">
                        Continue
                    </button>
                </div>
                <p className="mt-4 md:mt-8 text-xs text-gray-400 text-center">By <span
                    className="cursor-pointer underline hover:text-gray-600 transition-colors">George Garzon</span>. Not
                    affiliated with the Royal Caribbean or Apple's Find My.</p>
            </div>
        </div>
    );
}
