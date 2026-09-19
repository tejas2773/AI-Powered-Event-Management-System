import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyWaitingList() {
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState("");

    const fetchWaitingList = async () => {
        try {
            const response = await api.get("/waitinglist/my-waitlist");
            setEntries(response.data);
        } catch (err) {
            setError("Failed to load your waiting list.");
        }
    };

    useEffect(() => {
        fetchWaitingList();
    }, []);

    const statusStyles = {
        WAITING: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        PROMOTED: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        CANCELLED: "bg-slate-700/40 border-slate-600/50 text-slate-400",
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-8">

                <div className="border-b border-slate-700/60 pb-5">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        My Waiting List
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Track your position for sold-out events
                    </p>
                </div>

                {error && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                        <p className="text-sm font-medium text-rose-400 text-center">{error}</p>
                    </div>
                )}

                {entries.length === 0 && !error && (
                    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-12 text-center">
                        <p className="text-slate-400 text-base">
                            You're not on any waiting lists right now.
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                    {entries.map((entry) => (
                        <div
                            key={entry.id}
                            className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        >
                            <div className="space-y-1">
                                <p className="text-slate-200 font-semibold">
                                    Event ID: {entry.eventId}
                                </p>
                                <p className="text-slate-400 text-sm">
                                    Seats Requested: {entry.numberOfSeatsRequested}
                                </p>
                                <p className="text-slate-400 text-sm">
                                    Joined: {new Date(entry.joinedAt).toLocaleString()}
                                </p>
                            </div>

                            <span
                                className={`self-start sm:self-center px-3 py-1 border text-sm font-semibold rounded-full ${statusStyles[entry.status] || statusStyles.CANCELLED}`}
                            >
                                {entry.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyWaitingList;