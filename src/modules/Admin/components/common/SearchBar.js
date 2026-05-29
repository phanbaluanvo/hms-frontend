import React, { useRef } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
    const inputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(inputRef.current.value);
    };

    return (
        <form onSubmit={handleSubmit} className="w-72">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3" />
                    </svg>
                </div>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder={placeholder}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
            </div>
        </form>
    );
};

export default SearchBar;
