import { useState, useRef, useEffect } from 'react';
import { signout } from '../../../../utils/AuthService';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

const HeaderBar = ({ user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

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
            {/* Left: portal label */}
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <span className="text-sm font-semibold text-slate-700">Admin Portal</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    HMS
                </span>
            </div>

            {/* Right: user menu */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    className="flex items-center gap-2.5 hover:bg-slate-50 rounded-lg px-2.5 py-1.5 transition-colors"
                >
                    <Avatar name={user?.fullName} size="32" round={true} />
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.fullName}</p>
                        <p className="text-xs text-slate-400 leading-tight">Administrator</p>
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
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                                Administrator
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="py-1">
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
