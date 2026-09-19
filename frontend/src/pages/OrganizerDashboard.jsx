import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

function OrganizerDashboard() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const response = await api.get("/events/my-events");
                setEvents(response.data);
            } catch (err) {
                setError("Failed to load your events.");
            }
        };
        fetchMyEvents();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Header & Primary Action */}
                <div className="border-b border-slate-700/60 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            My Events
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                            Organizer Dashboard — Manage your created events and capacity
                        </p>
                    </div>

                    <Link to="/create-event">
                        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center gap-2">
                            <span>+ Create New Event</span>
                        </button>
                    </Link>
                </div>

                {/* Error Alert Banner */}
                {error && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                        <p className="text-sm font-medium text-rose-400 text-center">
                            {error}
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {events.length === 0 && !error && (
                    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-12 text-center space-y-3">
                        <p className="text-slate-400 text-base">
                            You haven't created any events yet.
                        </p>
                    </div>
                )}

                {/* Managed Events List */}
                <div className="grid grid-cols-1 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-xl hover:border-slate-600/80 transition-all duration-200 space-y-4"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                    {event.title}
                                </h3>
                                <span className="self-start px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-semibold rounded-full">
                                    ₹{event.price}
                                </span>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                                <div className="bg-slate-900/60 border border-slate-700/50 p-3 rounded-lg">
                                    <span className="text-slate-400 block font-medium mb-0.5">Venue</span>
                                    <span className="text-slate-200 font-semibold">{event.venue}</span>
                                </div>

                                <div className="bg-slate-900/60 border border-slate-700/50 p-3 rounded-lg">
                                    <span className="text-slate-400 block font-medium mb-0.5">Date & Time</span>
                                    <span className="text-slate-200 font-semibold">
                                        {new Date(event.eventDate).toLocaleString()}
                                    </span>
                                </div>

                                <div className="bg-slate-900/60 border border-slate-700/50 p-3 rounded-lg">
                                    <span className="text-slate-400 block font-medium mb-0.5">Seats Booked</span>
                                    <span className="text-emerald-400 font-semibold">
                                        {event.totalSeats - event.availableSeats} / {event.totalSeats}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrganizerDashboard;