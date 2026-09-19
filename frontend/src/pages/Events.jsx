import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function Events() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");
    const [seatsInput, setSeatsInput] = useState({});

    const fetchEvents = async () => {
        try {
            const response = await api.get("/events");
            setEvents(response.data);
        } catch (err) {
            setError("Failed to load events.");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSeatsChange = (eventId, value) => {
        setSeatsInput({ ...seatsInput, [eventId]: value });
    };

    const handleBook = async (eventId) => {
        const numberOfSeats = Number(seatsInput[eventId] || 1);

        try {
            await api.post("/bookings", { eventId, numberOfSeats });
            alert("Booking confirmed!");
            fetchEvents();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else if (err.response && err.response.status === 403) {
                alert("Please log in to book an event.");
            } else {
                alert("Booking failed. Try again.");
            }
        }
    };

    const handleJoinWaitingList = async (eventId) => {
        const numberOfSeatsRequested = Number(seatsInput[eventId] || 1);

        try {
            await api.post("/waitinglist", { eventId, numberOfSeatsRequested });
            alert("You've been added to the waiting list!");
            fetchEvents();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else if (err.response && err.response.status === 403) {
                alert("Please log in to join the waiting list.");
            } else {
                alert("Failed to join waiting list. Try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="border-b border-slate-700/60 pb-5">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        All Events
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Explore available events and reserve your seats
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                        <p className="text-sm font-medium text-rose-400 text-center">
                            {error}
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {events.length === 0 && !error && (
                    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-12 text-center">
                        <p className="text-slate-400 text-base">
                            No events found at the moment. Check back soon!
                        </p>
                    </div>
                )}

                {/* Events Grid */}
                <div className="grid grid-cols-1 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-xl hover:border-slate-600/80 transition-all duration-200 flex flex-col justify-between space-y-6"
                        >
                            {/* Card Content Top */}
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">
                                        {event.title}
                                    </h3>
                                    <span className="self-start px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-semibold rounded-full">
                                        ₹{event.price}
                                    </span>
                                </div>

                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {event.description}
                                </p>

                                {/* Metadata Badges/Details */}
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
                                        <span className="text-slate-400 block font-medium mb-0.5">Availability</span>
                                        <span className={`font-semibold ${event.availableSeats === 0 ? "text-rose-400" : "text-emerald-400"}`}>
                                            {event.availableSeats} / {event.totalSeats} Seats Left
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer / Booking Actions */}
                            <div className="pt-4 border-t border-slate-700/50 flex items-center justify-end gap-3">
                                <input
                                    type="number"
                                    min="1"
                                    max={event.availableSeats === 0 ? undefined : event.availableSeats}
                                    placeholder="Seats"
                                    value={seatsInput[event.id] || ""}
                                    onChange={(e) => handleSeatsChange(event.id, e.target.value)}
                                    className="w-20 px-3 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />

                                {event.availableSeats === 0 ? (
                                    <button
                                        onClick={() => handleJoinWaitingList(event.id)}
                                        className="px-6 py-2 border text-sm font-semibold rounded-lg shadow-md transition-all duration-200 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 border-amber-500 text-white shadow-amber-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-500"
                                    >
                                        Join Waiting List
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBook(event.id)}
                                        className="px-6 py-2 border text-sm font-semibold rounded-lg shadow-md transition-all duration-200 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 border-indigo-500 text-white shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500"
                                    >
                                        Book
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Events;