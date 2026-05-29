import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../../utils/AuthService";
import Toast from "../../../client/components/common/Toast";

function PatientLoginPage() {
    const [formData, setFormData] = useState({ id: "", password: "" });
    const [toastMessage, setToastMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(formData);
        setLoading(false);

        if (result.success) {
            setToastMessage("Login successful!");
            setIsError(false);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3200);
            navigate("/patient");
        } else {
            setToastMessage(result.message || "Login failed. Please try again.");
            setIsError(true);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3200);
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* Left branding panel */}
            <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 bg-gradient-to-br from-teal-600 to-teal-800 flex-col justify-between p-12 relative overflow-hidden">

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-500 rounded-full opacity-30" />
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-teal-900 rounded-full opacity-40" />

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-teal-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 13h-2v-4H7v-2h4V5h2v4h4v2h-4v4z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm leading-none">Health Management</div>
                        <div className="text-teal-300 text-xs">System</div>
                    </div>
                </div>

                {/* Main content */}
                <div className="relative space-y-6">
                    <div>
                        <h2 className="text-4xl font-extrabold text-white leading-tight mb-3">
                            Patient<br />Portal
                        </h2>
                        <p className="text-teal-100 text-sm leading-relaxed max-w-xs">
                            Your personal health hub. View records, track prescriptions and stay connected with your care team.
                        </p>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-3">
                        {[
                            "View exam history & results",
                            "Track prescriptions",
                            "Manage appointments",
                            "Contact care team",
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-sm text-teal-100">
                                <div className="w-5 h-5 flex-shrink-0 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom */}
                <div className="relative text-teal-400 text-xs">
                    © 2025 Health Management System
                </div>
            </div>

            {/* Right form panel */}
            <div className="flex-1 bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-12">
                <div className="w-full max-w-sm mx-auto">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-10">
                        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 13h-2v-4H7v-2h4V5h2v4h4v2h-4v4z" />
                            </svg>
                        </div>
                        <span className="font-bold text-slate-800 text-sm">Health Management System</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
                        <p className="text-sm text-slate-500">Sign in to your patient account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="patientId" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Patient ID
                            </label>
                            <input
                                type="text"
                                id="patientId"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                placeholder="Enter your patient ID"
                                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <Link to="/" className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <p className="text-center text-sm text-slate-500 mb-3">Don't have an account?</p>
                        <Link
                            to="/patient/register"
                            className="flex items-center justify-center gap-2 w-full py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                        >
                            Register as a new patient
                        </Link>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                        <Link to="/welcome" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>

            <Toast message={toastMessage} error={isError} visible={toastVisible} />
        </div>
    );
}

export default PatientLoginPage;
