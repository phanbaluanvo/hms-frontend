import React, { useState } from "react";
import AdminLayout from "../AdminLayout";
import axios from "../../../../config/axios-customize";

const inputClass = "block w-full rounded-lg border border-slate-300 py-2 px-3 text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
const selectClass = "block w-full rounded-lg border border-slate-300 py-2 px-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
const labelClass = "block text-sm font-medium text-slate-700 mb-1";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const GenerateReportPage = () => {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [patientId, setPatientId] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeReport, setActiveReport] = useState(null);

    const download = (blob, filename) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    const handleGenerateReport = async () => {
        if (!year) { setError("Year is required."); return; }
        try {
            setLoading(true); setError(null); setActiveReport("summary");
            const response = await axios.get("/report/generate", {
                params: { year, ...(month && { month }) },
                responseType: "blob",
            });
            download(response, month ? `MonthlyReport_${month}-${year}.pdf` : `YearlyReport_${year}.pdf`);
        } catch {
            setError("Failed to generate report. Please try again.");
        } finally {
            setLoading(false); setActiveReport(null);
        }
    };

    const handleGenerateCustomReport = async () => {
        if (!patientId) { setError("Patient ID is required."); return; }
        try {
            setLoading(true); setError(null); setActiveReport("predict");
            const response = await axios.get("/report/predict", {
                params: { patientId },
                responseType: "blob",
            });
            download(response, `PredictReport_Patient_${patientId}.pdf`);
        } catch {
            setError("Failed to generate report. Please try again.");
        } finally {
            setLoading(false); setActiveReport(null);
        }
    };

    return (
        <AdminLayout title="Reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Summary Report Card */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-800">Monthly / Yearly Summary</h2>
                            <p className="text-xs text-slate-400">Generate a PDF summary report</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Year <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    placeholder="e.g. 2024"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Month <span className="text-slate-400 font-normal">(optional)</span></label>
                                <select value={month} onChange={(e) => setMonth(e.target.value)} className={selectClass}>
                                    <option value="">All months</option>
                                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                        </div>

                        {error && activeReport === "summary" && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-sm">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleGenerateReport}
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading && activeReport === "summary" ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download Report
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Health Prediction Report Card */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-800">Health Prediction Report</h2>
                            <p className="text-xs text-slate-400">AI-assisted patient health forecast</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className={labelClass}>Patient ID <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                placeholder="Enter Patient ID"
                                className={inputClass}
                            />
                        </div>

                        {error && activeReport === "predict" && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-sm">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleGenerateCustomReport}
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading && activeReport === "predict" ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download Prediction Report
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default GenerateReportPage;
