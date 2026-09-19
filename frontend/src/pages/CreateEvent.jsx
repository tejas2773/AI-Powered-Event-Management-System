import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function CreateEvent() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        venue: "",
        eventDate: "",
        totalSeats: "",
        price: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await api.post("/events", {
                ...formData,
                totalSeats: Number(formData.totalSeats),
                price: Number(formData.price),
            });
            alert("Event created successfully!");
            navigate("/events");
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            } else {
                setErrors({ general: "Something went wrong. Try again." });
            }
        }
    };

    if (role !== "ORGANIZER") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
                <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-6 max-w-md w-full text-center shadow-2xl">
                    <p className="text-rose-400 font-medium text-sm">
                        Only organizers can create events.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12">
            <div className="w-full max-w-lg bg-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 p-8 space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Create New Event
                    </h2>
                    <p className="text-sm text-slate-400">
                        Set up your event capacity, venue, and ticketing details
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Event Title */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Event Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Tech Conference 2026"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                        {errors.title && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Provide details about the event..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
                        />
                        {errors.description && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Venue */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Venue Location
                        </label>
                        <input
                            type="text"
                            name="venue"
                            placeholder="e.g. Main Auditorium, Building B"
                            value={formData.venue}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                        {errors.venue && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                {errors.venue}
                            </p>
                        )}
                    </div>

                    {/* Event Date & Time */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Event Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 color-scheme-dark"
                        />
                        {errors.eventDate && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                {errors.eventDate}
                            </p>
                        )}
                    </div>

                    {/* Capacity & Price Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Total Seats */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                Total Capacity
                            </label>
                            <input
                                type="number"
                                name="totalSeats"
                                placeholder="100"
                                value={formData.totalSeats}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            />
                            {errors.totalSeats && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                    {errors.totalSeats}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                Ticket Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                placeholder="0"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            />
                            {errors.price && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                    {errors.price}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* General Error Alert */}
                    {errors.general && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                            <p className="text-xs font-medium text-rose-400 text-center">
                                {errors.general}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                    >
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;