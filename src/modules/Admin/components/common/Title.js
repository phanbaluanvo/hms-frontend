import React from "react";
import { useNavigate } from "react-router-dom";

const Title = ({ title, backTo }) => {
    const navigate = useNavigate();

    return (
        <div className="mb-6 flex items-center gap-3">
            {backTo && (
                <button
                    onClick={() => navigate(backTo)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors flex-shrink-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            )}
            <div>
                <h1 className="text-xl font-bold text-slate-900">{title}</h1>
                <div className="mt-1 h-0.5 w-10 bg-blue-600 rounded-full" />
            </div>
        </div>
    );
};

export default Title;
