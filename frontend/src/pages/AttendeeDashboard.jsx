




import { Link } from "react-router-dom";

function AttendeeDashboard() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-xl bg-slate-800/80 rounded-2xl border border-slate-700/50 shadow-2xl p-8 space-y-8 backdrop-blur-sm">
                
                {/* Header */}
                <div className="space-y-2 border-b border-slate-700/60 pb-6">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Attendee Dashboard
                    </h2>
                    <p className="text-slate-400 text-base">
                        Welcome back! What would you like to do today?
                    </p>
                </div>

                {/* Navigation Action Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link to="/events" className="group">
                        <button className="w-full h-full p-6 bg-slate-900/60 hover:bg-slate-700/40 border border-slate-700/60 hover:border-indigo-500/50 rounded-xl flex flex-col items-start text-left transition-all duration-200 shadow-md hover:shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <span className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                Browse Events
                            </span>
                            <span className="text-xs text-slate-400 mt-1">
                                Discover upcoming events, check capacity, and reserve your spot.
                            </span>
                        </button>
                    </Link>

                    <Link to="/my-bookings" className="group">
                        <button className="w-full h-full p-6 bg-slate-900/60 hover:bg-slate-700/40 border border-slate-700/60 hover:border-indigo-500/50 rounded-xl flex flex-col items-start text-left transition-all duration-200 shadow-md hover:shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <span className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                My Bookings
                            </span>
                            <span className="text-xs text-slate-400 mt-1">
                                View your registered events, manage tickets, and check status.
                            </span>
                        </button>
                    </Link>

                    <Link to="/my-waitlist" className="group sm:col-span-2">
                        <button className="w-full h-full p-6 bg-slate-900/60 hover:bg-slate-700/40 border border-slate-700/60 hover:border-amber-500/50 rounded-xl flex flex-col items-start text-left transition-all duration-200 shadow-md hover:shadow-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-500">
                            <span className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                                My Waiting List
                            </span>
                            <span className="text-xs text-slate-400 mt-1">
                                Track your position for sold-out events and see if you've been promoted.
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AttendeeDashboard;