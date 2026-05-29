import React from 'react';
import Pagination from '../common/Pagination';
import { Link } from 'react-router-dom';

const statusBadge = (status) => {
    const map = {
        ACTIVE:   'bg-green-50 text-green-700 ring-green-600/20',
        PENDING:  'bg-amber-50 text-amber-700 ring-amber-600/20',
        INACTIVE: 'bg-red-50 text-red-700 ring-red-600/20',
    };
    const cls = map[status] || 'bg-slate-50 text-slate-600 ring-slate-500/20';
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${cls}`}>
            {status}
        </span>
    );
};

const roleBadge = (role) => {
    const map = {
        DOCTOR: 'bg-blue-50 text-blue-700',
        NURSE:  'bg-purple-50 text-purple-700',
        STAFF:  'bg-slate-100 text-slate-600',
        ADMIN:  'bg-orange-50 text-orange-700',
    };
    const cls = map[role] || 'bg-slate-100 text-slate-600';
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
            {role}
        </span>
    );
};

const TableEmployees = ({ employees, pagination, fetchData }) => {
    const { meta } = pagination;
    const { page, pageSize, totalPages, totalElements } = meta;
    const indexOfFirstRow = (page - 1) * pageSize;

    const handlePageChange = (newPage) => fetchData(newPage, pageSize);

    return (
        <div className="flex flex-col h-[78vh] bg-white border border-slate-200 rounded-xl overflow-hidden mt-4">
            <div className="overflow-y-auto flex-grow">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 sticky top-0">
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center w-12">#</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Employee</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Working ID</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Role</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Department</th>
                            <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Status</th>
                            <th className="py-3 px-4 text-right">
                                <Link to="/admin/employee/create">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                        New Employee
                                    </button>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <tr key={employee.workingId || index} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-4 text-center text-slate-400 text-xs">{indexOfFirstRow + index + 1}</td>
                                    <td className="py-3 px-4">
                                        <p className="font-medium text-slate-800">{employee.fullName}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{employee.email}</p>
                                    </td>
                                    <td className="py-3 px-4 text-center text-slate-600 font-mono text-xs">{employee.workingId}</td>
                                    <td className="py-3 px-4 text-center">{roleBadge(employee.role)}</td>
                                    <td className="py-3 px-4 text-center text-slate-600">{employee.department}</td>
                                    <td className="py-3 px-4 text-center">{statusBadge(employee.status)}</td>
                                    <td className="py-3 px-4 text-center">
                                        <Link
                                            to={`/admin/employee/view/${employee.workingId}`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-16 text-center">
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                        <span className="text-sm">No employees found</span>
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

export default TableEmployees;
