import React from 'react';
import Pagination from '../common/Pagination';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import dayjs from 'dayjs';
import { useUser } from '../../../../utils/UserContext';

const examStatusBadge = (status) => {
    const map = {
        COMPLETED:   'bg-green-50 text-green-700 ring-green-600/20',
        PENDING:     'bg-blue-50 text-blue-700 ring-blue-600/20',
    };
    const cls = map[status] || 'bg-orange-50 text-orange-700 ring-orange-600/20';
    const label = status === 'PENDING' ? 'IN PROGRESS' : status;
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${cls}`}>
            {label}
        </span>
    );
};

const resultBadge = (isAbnormal) => {
    if (isAbnormal === false)
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">NORMAL</span>;
    if (isAbnormal === null)
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 ring-1 ring-inset ring-slate-500/20">N/A</span>;
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20">ABNORMAL</span>;
};

const TableExams = ({ exams, pagination, fetchData, onCreateNewExam = null, link, handleDelete = null }) => {
    const { meta } = pagination;
    const { page, pageSize, totalPages, totalElements } = meta;
    const indexOfFirstRow = (page - 1) * pageSize;
    const { user } = useUser();
    const role = user?.role;

    const handlePageChange = (newPage) => fetchData(newPage, pageSize);
    const formatDate = (date) => dayjs(date).format('YYYY-MM-DD HH:mm');

    return (
        <div className="flex flex-col h-[78vh] bg-white border border-slate-200 rounded-xl overflow-hidden mt-4">
            <div className="overflow-x-auto overflow-y-auto flex-grow">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 sticky top-0">
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center w-12">#</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Exam ID</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Patient ID</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Patient Name</th>
                            {role !== "DOCTOR" && <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Doctor ID</th>}
                            {role !== "DOCTOR" && <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Doctor Name</th>}
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Created</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Updated</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Status</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Result</th>
                            <th className="py-3 px-4 text-right pr-5">
                                {role === "DOCTOR" && (
                                    <button
                                        type="button"
                                        onClick={onCreateNewExam}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        New Exam
                                    </button>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {exams.length > 0 ? (
                            exams.map((exam, index) => (
                                <tr key={exam.examId || index} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-4 text-center text-slate-400 text-xs">{indexOfFirstRow + index + 1}</td>
                                    <td className="py-3 px-4 text-center text-slate-600 font-mono text-xs">{exam.examId}</td>
                                    <td className="py-3 px-4 text-center text-slate-600 font-mono text-xs">{exam.patient.patientId}</td>
                                    <td className="py-3 px-4 text-slate-800 font-medium">{exam.patient.fullName}</td>
                                    {role !== "DOCTOR" && <td className="py-3 px-4 text-center text-slate-600 font-mono text-xs">{exam.doctor.workingId}</td>}
                                    {role !== "DOCTOR" && <td className="py-3 px-4 text-slate-800">{exam.doctor.fullName}</td>}
                                    <td className="py-3 px-4 text-center text-slate-500 text-xs whitespace-nowrap">{formatDate(exam.createdAt)}</td>
                                    <td className="py-3 px-4 text-center text-slate-500 text-xs whitespace-nowrap">{exam.updatedAt ? formatDate(exam.updatedAt) : '—'}</td>
                                    <td className="py-3 px-4 text-center">{examStatusBadge(exam.examStatus)}</td>
                                    <td className="py-3 px-4 text-center">{resultBadge(exam.isAbnormal)}</td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Link
                                                to={`${link}/${exam.examId}`}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            {role === "ADMIN" && (
                                                <button
                                                    onClick={() => handleDelete(exam.examId)}
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="py-16 text-center">
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-sm">No exams found</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex-shrink-0">
                <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} totalElements={totalElements} pageSize={pageSize} />
            </div>
        </div>
    );
};

export default TableExams;
