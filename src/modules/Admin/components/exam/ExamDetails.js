import React, { useState } from "react";
import ModalExamItems from "./ModalExamItem";
import dayjs from "dayjs";

const badge = (label, color) => {
    const map = {
        green:  'bg-green-50 text-green-700 ring-green-600/20',
        red:    'bg-red-50 text-red-700 ring-red-600/20',
        amber:  'bg-amber-50 text-amber-700 ring-amber-600/20',
        slate:  'bg-slate-50 text-slate-600 ring-slate-500/20',
        blue:   'bg-blue-50 text-blue-700 ring-blue-600/20',
        orange: 'bg-orange-50 text-orange-700 ring-orange-600/20',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${map[color] || map.slate}`}>
            {label}
        </span>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</span>
        <span className="text-sm text-slate-800 font-medium">{value || '—'}</span>
    </div>
);

const ExamDetails = ({ examData, updateExamItem }) => {
    const { doctor, patient, createdAt, updatedAt, examStatus, isAbnormal, examItems } = examData;
    const [modalItem, setModalItem] = useState(null);

    const fmt = (d) => d ? dayjs(d).format('YYYY-MM-DD HH:mm') : '—';

    const getResultBadge = (item) => {
        if (!item.result && !item.resultInText) return badge('NOT AVAILABLE', 'slate');
        return badge('UPDATED', 'orange');
    };

    const getAbnormalBadge = (item) => {
        if (item.isAbnormal === null) return badge('PENDING', 'amber');
        if (item.isAbnormal) return badge('ABNORMAL', 'red');
        return badge('NORMAL', 'green');
    };

    const examStatusBadge = () => {
        if (examStatus === 'COMPLETED') return badge('COMPLETED', 'green');
        if (examStatus === 'PENDING') return badge('IN PROGRESS', 'blue');
        return badge(examStatus, 'orange');
    };

    const overallResultBadge = () => {
        if (isAbnormal === false) return badge('NORMAL', 'green');
        if (isAbnormal === null) return badge('PENDING', 'amber');
        return badge('ABNORMAL', 'red');
    };

    return (
        <div className="space-y-5">
            {/* Exam Overview */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-800">Exam Overview</h2>
                    <div className="flex items-center gap-2">
                        {examStatusBadge()}
                        {overallResultBadge()}
                    </div>
                </div>
                <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-5">
                    <InfoRow label="Exam ID" value={examData.examId} />
                    <InfoRow label="Created At" value={fmt(createdAt)} />
                    <InfoRow label="Last Updated" value={fmt(updatedAt)} />
                    <InfoRow label="Abnormal" value={isAbnormal === null ? 'Pending' : isAbnormal ? 'Yes' : 'No'} />
                </div>
            </div>

            {/* Patient & Doctor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                        <div className="w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-semibold text-slate-800">Patient</h2>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <InfoRow label="Patient ID" value={patient.patientId} />
                        <InfoRow label="Full Name" value={patient.fullName} />
                        <InfoRow label="Health ID" value={patient.healthId} />
                        <InfoRow label="Date of Birth" value={patient.dateOfBirth ? dayjs(patient.dateOfBirth).format('YYYY-MM-DD') : '—'} />
                        <div className="col-span-2">
                            <InfoRow label="Address" value={patient.address} />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-semibold text-slate-800">Doctor</h2>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <InfoRow label="Doctor ID" value={doctor.workingId} />
                        <InfoRow label="Full Name" value={doctor.fullName} />
                        <InfoRow label="Department" value={doctor.department} />
                    </div>
                </div>
            </div>

            {/* Exam Items Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="text-sm font-semibold text-slate-800">Exam Items</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center w-12">#</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Item ID</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Sub Type</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Updated At</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Updated By</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Result</th>
                                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Abnormal</th>
                                <th className="py-3 px-4 w-12" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {examItems.map((item, index) => (
                                <tr key={item.examItemId} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-4 text-center text-slate-400 text-xs">{index + 1}</td>
                                    <td className="py-3 px-4 text-center text-slate-600 font-mono text-xs">{item.examItemId}</td>
                                    <td className="py-3 px-4 text-slate-800 font-medium">{item.examType.typeName}</td>
                                    <td className="py-3 px-4 text-slate-600">{item.examType.subTypeName}</td>
                                    <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">{item.updatedAt ? fmt(item.updatedAt) : '—'}</td>
                                    <td className="py-3 px-4 text-center text-slate-600">{item.updatedBy || '—'}</td>
                                    <td className="py-3 px-4 text-center">{getResultBadge(item)}</td>
                                    <td className="py-3 px-4 text-center">{getAbnormalBadge(item)}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            type="button"
                                            onClick={() => setModalItem(item)}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalItem && (
                <ModalExamItems
                    examId={examData.examId}
                    item={modalItem}
                    onClose={() => setModalItem(null)}
                    onSave={() => setModalItem(null)}
                    onUpdate={updateExamItem}
                />
            )}
        </div>
    );
};

export default ExamDetails;
