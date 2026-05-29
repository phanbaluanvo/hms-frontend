import React from "react";

const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-64 gap-3">
            <div className="w-10 h-10 border-[3px] border-slate-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-medium">Loading...</p>
        </div>
    );
};

export default Spinner;
