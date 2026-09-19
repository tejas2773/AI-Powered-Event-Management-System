import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");

    const fetchBookings = async () => {
        try {
            const response = await api.get("/bookings/my-bookings");
            setBookings(response.data);
        } catch (err) {
            setError("Failed to load bookings. Are you logged in?");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        try {
            await api.put(`/bookings/${bookingId}/cancel`);
            alert("Booking cancelled.");
            fetchBookings();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("Cancellation failed.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="border-b border-slate-700/60 pb-5">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        My Bookings
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Track and manage your registered event tickets
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
                {bookings.length === 0 && !error && (
                    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-12 text-center">
                        <p className="text-slate-400 text-base">
                            You have no bookings yet.
                        </p>
                    </div>
                )}

                {/* Bookings List */}
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-slate-800 border border-slate-700/60 rounded-2xl p-6 shadow-xl hover:border-slate-600/80 transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
                        >
                            {/* Details Grid */}
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                                        Event ID: #{booking.eventId}
                                    </span>
                                    <span
                                        className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                                            booking.status === "CONFIRMED"
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                                        }`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-slate-400">Seats Booked: </span>
                                        <span className="text-white font-semibold">{booking.numberOfSeats}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Booked On: </span>
                                        <span className="text-slate-200">
                                            {new Date(booking.bookingDate).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            {booking.status === "CONFIRMED" && (
                                <div className="pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-700/50 flex justify-end">
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyBookings;