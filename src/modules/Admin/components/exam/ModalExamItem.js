import React, { useEffect, useState } from "react";
import { useUser } from "../../../../utils/UserContext";

const inputClass = "block w-full rounded-lg border border-slate-300 py-2 px-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
const readonlyClass = "block w-full rounded-lg border border-slate-200 py-2 px-3 text-sm text-slate-700 bg-slate-50";
const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

const ModalExamItems = ({ examId, item, onClose, onSave, onUpdate }) => {
    const [result, setResult] = useState(item.result || "");
    const [resultInText, setResultInText] = useState(item.resultInText || "");
    const [isAbnormal, setIsAbnormal] = useState(item.isAbnormal);

    const { user } = useUser();
    const isPatient = user?.role === "PATIENT";

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const handleSave = () => {
        onSave({ ...item, result, resultInText, isAbnormal });
        onUpdate({ examId, examItemId: item.examItemId, result: result || null, resultInText: resultInText || null, abnormalResult: isAbnormal });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">Exam Item Details</h2>
                        <p className="text-xs text-slate-400 mt-0.5">ID: {item.examItemId}</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* Read-only info */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                        <div>
                            <p className={labelClass}>Type</p>
                            <p className="text-sm text-slate-800 font-medium">{item.examType.typeName}</p>
                        </div>
                        <div>
                            <p className={labelClass}>Sub Type</p>
                            <p className="text-sm text-slate-800 font-medium">{item.examType.subTypeName}</p>
                        </div>
                        <div>
                            <p className={labelClass}>Description</p>
                            <p className="text-sm text-slate-700">{item.examType.description || '—'}</p>
                        </div>
                        <div>
                            <p className={labelClass}>Threshold</p>
                            <p className="text-sm text-slate-700 font-mono">
                                {item.examType.minThreshold !== null
                                    ? `${item.examType.minThreshold} – ${item.examType.maxThreshold} ${item.examType.calculationUnit}`
                                    : '—'}
                            </p>
                        </div>
                    </div>

                    {/* Editable fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Result (Numeric)</label>
                            {item.examType.minThreshold === null || isPatient ? (
                                <p className={readonlyClass}>{result || 'N/A'}</p>
                            ) : (
                                <input type="number" value={result} onChange={(e) => setResult(e.target.value)} className={inputClass} placeholder="Enter numeric result" />
                            )}
                        </div>
                        <div>
                            <label className={labelClass}>Abnormal Result</label>
                            {item.examType.typeName !== "Imaging" || isPatient ? (
                                <p className={readonlyClass}>
                                    {isAbnormal === null ? 'PENDING' : isAbnormal ? 'ABNORMAL' : 'NORMAL'}
                                </p>
                            ) : (
                                <select value={isAbnormal} onChange={(e) => setIsAbnormal(e.target.value)} className={inputClass}>
                                    <option value="PENDING">PENDING</option>
                                    <option value={true}>ABNORMAL</option>
                                    <option value={false}>NORMAL</option>
                                </select>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Result (Text)</label>
                        {isPatient ? (
                            <p className={`${readonlyClass} whitespace-pre-wrap min-h-[80px]`}>{resultInText || 'N/A'}</p>
                        ) : (
                            <textarea
                                value={resultInText}
                                onChange={(e) => setResultInText(e.target.value)}
                                rows={4}
                                className={`${inputClass} resize-none`}
                                placeholder="Enter text result..."
                            />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        {isPatient ? "Close" : "Cancel"}
                    </button>
                    {!isPatient && (
                        <button
                            type="button"
                            onClick={handleSave}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalExamItems;
