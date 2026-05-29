import React, { useState } from "react";

const PatientCombinedSearch = ({ onSearch }) => {
    const [examItemSearch, setExamItemSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [abnormalFilter, setAbnormalFilter] = useState("");
    const [typeStartDate, setTypeStartDate] = useState("text");
    const [typeEndDate, setTypeEndDate] = useState("text");

    // Handle Search Button Click
    const handleSearch = (event) => {
        event.preventDefault();
        onSearch({ examItemSearch, startDate, endDate, abnormalFilter });
    };

    // Handle Reset Button Click
    const handleReset = () => {
        setExamItemSearch("");
        setStartDate("");
        setEndDate("");
        setAbnormalFilter("");
        onSearch({ examItemSearch: "", startDate: "", endDate: "", abnormalFilter: "" });
    };

    return (
        <form className="flex items-center space-x-4 mb-4" onSubmit={handleSearch}>
            {/* Exam Item Search Bar */}
            <div className="relative w-4/12">
                <input
                    type="text"
                    name="search-bar-exam-item"
                    id="search-bar-exam-item"
                    value={examItemSearch}
                    onChange={(e) => setExamItemSearch(e.target.value)}
                    placeholder="Search exam item..."
                    className="py-2 px-3 pl-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3">
                    <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                </div>
            </div>

            {/* Date Search */}
            <div>
                <input
                    placeholder="Start Date"
                    type={typeStartDate}
                    id="startDate"
                    value={startDate}
                    onFocus={() => setTypeStartDate("date")}
                    onBlur={() => setTypeStartDate("text")}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="py-2 block w-[200px] border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
            </div>
            <div>
                <input
                    placeholder="End Date"
                    type={typeEndDate}
                    id="endDate"
                    value={endDate}
                    onFocus={() => setTypeEndDate("date")}
                    onBlur={() => setTypeEndDate("text")}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="py-2 block w-[200px] border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
            </div>

            {/* Abnormal Filter Dropdown */}
            <div>
                <select
                    id="abnormalFilter"
                    value={abnormalFilter}
                    onChange={(e) => setAbnormalFilter(e.target.value)}
                    className="py-2 block w-[200px] border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 "
                >
                    <option value="">All Results</option>
                    <option value="false">NORMAL</option>
                    <option value="true">ABNORMAL</option>
                </select>
            </div>

            {/* Search Button */}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 focus:outline-none"
            >
                Search
            </button>

            {/* Reset Button */}
            <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
            >
                Reset
            </button>
        </form>
    );
};

export default PatientCombinedSearch;
