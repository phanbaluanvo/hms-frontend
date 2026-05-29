import React, { useEffect, useState } from 'react';
import axios from '../../../../config/axios-customize';

const FilterDropdown = ({ condition, onFilterChange }) => {
    const [options, setOptions] = useState(['ALL']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('ALL');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchOptions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/admin/filter-options/${condition}`);
                if (response.statusCode !== 200) throw new Error('Failed to fetch options');
                setOptions(['ALL', ...response.body]);
            } catch (err) {
                setError('Failed to load options');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (condition) fetchOptions();
    }, [condition]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onFilterChange(option);
    };

    if (loading) return (
        <div className="h-9 w-48 bg-slate-100 rounded-lg animate-pulse" />
    );

    if (error) return (
        <div className="text-xs text-red-500 px-3 py-2">{error}</div>
    );

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(o => !o)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors min-w-[160px] justify-between"
            >
                <span className="text-slate-400 text-xs font-normal">{condition}:</span>
                <span className="font-semibold truncate">{selectedOption}</span>
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-20 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 overflow-hidden">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleOptionClick(option)}
                            className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                                option === selectedOption
                                    ? 'bg-blue-50 text-blue-600 font-medium'
                                    : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
