import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faUserDoctor, faWheelchair } from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/admin/dashboard",        icon: faDisplay,    label: "Dashboard" },
    { to: "/admin/employee/manage",  icon: faUserDoctor, label: "Employees" },
    { to: "/admin/patient/manage",   icon: faWheelchair, label: "Patients" },
    { to: "/admin/exam/manage",      icon: faClipboard,  label: "Medical Records" },
    { to: "/admin/report",           icon: faFilePdf,    label: "Reports" },
];

const Sidebar = () => {
    return (
        <aside className="bg-slate-900 text-white h-screen fixed top-0 left-0 w-64 flex flex-col">
            {/* Logo */}
            <div className="px-5 py-5 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 13h-2v-4H7v-2h4V5h2v4h4v2h-4v4z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white leading-none">Health Management</div>
                        <div className="text-xs text-slate-400 mt-0.5">Admin Panel</div>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-3">Navigation</p>
                {navItems.map(({ to, icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <FontAwesomeIcon icon={icon} className="w-4 h-4 flex-shrink-0" />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom */}
            <div className="px-5 py-4 border-t border-slate-700/60">
                <p className="text-xs text-slate-500">© 2025 HMS</p>
            </div>
        </aside>
    );
};

export default Sidebar;
