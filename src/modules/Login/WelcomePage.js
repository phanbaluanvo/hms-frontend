import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            {/* Top nav bar */}
            <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 13h-2v-4H7v-2h4V5h2v4h4v2h-4v4z" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-sm font-bold text-slate-800 block leading-none">Health Management</span>
                        <span className="text-xs text-slate-400">System</span>
                    </div>
                </div>
                <span className="text-xs text-slate-400 hidden sm:block">Secure · HIPAA-compliant · 24/7</span>
            </nav>

            {/* Hero section */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    System is online
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 text-center leading-tight mb-4 max-w-xl">
                    Integrated Healthcare <br />
                    <span className="text-blue-600">Management Platform</span>
                </h1>
                <p className="text-slate-500 text-center max-w-md text-base mb-12 leading-relaxed">
                    A unified system for patients, doctors, nurses, and administrators to coordinate care efficiently and securely.
                </p>

                {/* Portal cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">

                    {/* Employee card */}
                    <Link to="/employee/login" className="h-full">
                        <div className="group h-full bg-white border border-slate-200 rounded-2xl p-7 flex flex-col gap-5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all duration-200 cursor-pointer">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                                <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 mb-1">Employee Portal</h2>
                                <p className="text-sm text-slate-500 leading-relaxed">For doctors, nurses, staff and administrators to manage clinical workflows.</p>
                            </div>
                            <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-blue-600">
                                Sign in as employee
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Patient card */}
                    <Link to="/patient/login" className="h-full">
                        <div className="group h-full bg-white border border-slate-200 rounded-2xl p-7 flex flex-col gap-5 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100 transition-all duration-200 cursor-pointer">
                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-200">
                                <svg className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 mb-1">Patient Portal</h2>
                                <p className="text-sm text-slate-500 leading-relaxed">Access your health records, prescriptions, and appointment history securely.</p>
                            </div>
                            <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-teal-600">
                                Sign in as patient
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-6 mt-12 flex-wrap justify-center">
                    {[
                        { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Secure & Encrypted" },
                        { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Complete Records" },
                        { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Real-time Updates" },
                    ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-slate-400 text-xs">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                            </svg>
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-white px-8 py-4 text-center text-xs text-slate-400">
                © 2025 Health Management System. All rights reserved.
            </div>
        </div>
    );
};

export default WelcomePage;
