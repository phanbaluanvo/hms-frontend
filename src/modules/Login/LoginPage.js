import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../utils/AuthService";
import Toast from "../client/components/common/Toast";

const LoginPage = () => {
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
            const user = result.user;
            setToastMessage("Login successful!");
            setIsError(false);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3200);

            if (user.role === "ADMIN") navigate("/admin/dashboard");
            else if (user.role === "DOCTOR") navigate("/doctor");
            else if (user?.role === "STAFF") navigate("/staff");
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
            <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 flex-col justify-between p-12 relative overflow-hidden">

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
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600 rounded-full opacity-30" />
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-800 rounded-full opacity-40" />

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 13h-2v-4H7v-2h4V5h2v4h4v2h-4v4z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm leading-none">Health Management</div>
                        <div className="text-blue-300 text-xs">System</div>
                    </div>
                </div>

                {/* Main content */}
                <div className="relative space-y-6">
                    <div>
                        <h2 className="text-4xl font-extrabold text-white leading-tight mb-3">
                            Employee<br />Access Portal
                        </h2>
                        <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
                            Securely access your clinical dashboard to manage patient records, appointments and care coordination.
                        </p>
                    </div>

                    {/* Role chips */}
                    <div className="flex flex-wrap gap-2">
                        {["Administrator", "Doctor", "Nurse", "Staff"].map((role) => (
                            <span key={role} className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-medium rounded-full">
                                {role}
                            </span>
                        ))}
                    </div>

                    {/* Stat blocks */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        {[
                            { value: "99.9%", label: "System uptime" },
                            { value: "256-bit", label: "Encryption" },
                        ].map(({ value, label }) => (
                            <div key={label} className="bg-white/10 border border-white/10 rounded-xl p-4">
                                <div className="text-white font-bold text-lg">{value}</div>
                                <div className="text-blue-300 text-xs">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="relative text-blue-400 text-xs">
                    © 2025 Health Management System
                </div>
            </div>

            {/* Right form panel */}
            <div className="flex-1 bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-12">
                <div className="w-full max-w-sm mx-auto">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-10">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 13h-2v-4H7v-2h4V5h2v4h4v2h-4v4z" />
                            </svg>
                        </div>
                        <span className="font-bold text-slate-800 text-sm">Health Management System</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 mb-1">Sign in to your account</h1>
                        <p className="text-sm text-slate-500">Enter your employee credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Employee ID
                            </label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                placeholder="Enter your employee ID"
                                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
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

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center">
                        <Link to="/welcome" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors">
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
};

export default LoginPage;
