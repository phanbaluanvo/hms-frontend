import { useState, useRef, useEffect } from 'react';
import { signout } from '../../../../utils/AuthService';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

const ROLE_CONFIG = {
    DOCTOR: {
        label: "Doctor",
        badgeClass: "bg-blue-50 text-blue-700 border-blue-100",
        dotClass: "bg-blue-500",
        iconClass: "bg-blue-600",
    },
    STAFF: {
        label: "Staff",
        badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-100",
        dotClass: "bg-indigo-500",
        iconClass: "bg-indigo-600",
    },
    PATIENT: {
        label: "Patient",
        badgeClass: "bg-teal-50 text-teal-700 border-teal-100",
        dotClass: "bg-teal-500",
        iconClass: "bg-teal-600",
    },
};

const HeaderBar = ({ user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const role = user?.role || "PATIENT";
    const config = ROLE_CONFIG[role] || ROLE_CONFIG.PATIENT;
    const dashboardLink = role === "DOCTOR" ? "/doctor" : role === "STAFF" ? "/staff" : "/patient";
    const accountLink = `${dashboardLink}/account-setting`;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        setIsDropdownOpen(false);
        const success = await signout();
        if (success) {
            navigate("/welcome");
        } else {
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <header className="bg-white border-b border-slate-200 px-6 h-14 sticky top-0 z-10 flex items-center justify-between">
            {/* Left: brand */}
            <Link to={dashboardLink} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                <div className={`w-7 h-7 rounded-lg ${config.iconClass} flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <span className="text-sm font-semibold text-slate-700 hidden sm:block">Health Management System</span>
                <span className="text-sm font-semibold text-slate-700 sm:hidden">HMS</span>
            </Link>

            {/* Right: user menu */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    className="flex items-center gap-2.5 hover:bg-slate-50 rounded-lg px-2.5 py-1.5 transition-colors"
                >
                    <Avatar name={user?.fullName} size="32" round={true} />
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.fullName}</p>
                        <p className="text-xs text-slate-400 leading-tight">{config.label}</p>
                    </div>
                    <svg
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-20">
                        {/* User info header */}
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                            <Avatar name={user?.fullName} size="36" round={true} />
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">{user?.fullName}</p>
                                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                            </div>
                        </div>

                        {/* Role badge */}
                        <div className="px-4 py-2.5 border-b border-slate-100">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.badgeClass}`}>
                                <span className={`w-1.5 h-1.5 rounded-full inline-block ${config.dotClass}`} />
                                {config.label}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="py-1">
                            <Link
                                to={accountLink}
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Account Settings
                            </Link>

                            <div className="mx-3 my-1 border-t border-slate-100" />

                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sign out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default HeaderBar;
