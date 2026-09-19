import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "ATTENDEE",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await api.post("/auth/register", formData);
            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            } else {
                setErrors({ general: "Something went wrong. Try again." });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 p-8 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Create Account
                    </h2>
                    <p className="text-sm text-slate-400">
                        Join the Event Management platform
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                        {errors.name && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                        {errors.password && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Role Select Dropdown */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Account Type
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 cursor-pointer"
                        >
                            <option value="ATTENDEE" className="bg-slate-800 text-white">Attendee</option>
                            <option value="ORGANIZER" className="bg-slate-800 text-white">Organizer</option>
                        </select>
                        {errors.role && (
                            <p className="mt-1.5 text-xs text-rose-400 font-medium">
                                {errors.role}
                            </p>
                        )}
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;