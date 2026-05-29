import React from "react";
import Pagination from "../../Admin/components/common/Pagination";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const TableMonitoringItems = ({ items, pagination, fetchData, onCreateNew = null, link }) => {
    const { meta } = pagination;
    const { page, pageSize, totalPages, totalElements } = meta;

    // Pagination logic
    const indexOfLastRow = page * pageSize;
    const indexOfFirstRow = indexOfLastRow - pageSize;
    const currentItems = items;

    const handlePageChange = (newPage) => {
        fetchData(newPage, pageSize);
    };

    const formatDate = (date) => {
        return dayjs(date).format("YYYY-MM-DD hh:mm:ss A");
    };

    return (
        <div className="flex flex-col h-[78vh] bg-white shadow-md rounded-lg mt-4">
            <div className="overflow-y-auto flex-grow">
                <table className="w-full text-left text-gray-700">
                    <thead>
                        <tr className="bg-gray-100 sticky top-0">
                            <th className="py-3 px-4 font-semibold text-gray-900 text-center">#</th>
                            <th className="py-3 px-4 font-semibold text-gray-900 text-center">Monitoring ID</th>
                            <th className="py-3 px-4 font-semibold text-gray-900 text-center">Patient Name</th>
                            <th className="py-3 px-4 font-semibold text-gray-900 text-center">Test Type</th>
                            <th className="py-3 px-4 font-semibold text-gray-900 text-center">Last Result</th>
                            <th className="py-3 px-4 font-semibold text-gray-900 text-center">Abnormal</th>
                            <th className="py-3 px-4 font-semibold text-gray-900 text-center">Updated At</th>
                            <th className="py-3 px-4 font-semibold text-gray-900 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item.monitoringItemId || index} className="hover:bg-gray-50">
                                    <td className="py-4 px-4 text-center">{indexOfFirstRow + index + 1}</td>
                                    <td className="py-4 px-4 text-center">{item.monitoringItemId}</td>
                                    <td className="py-4 px-4 text-center">{item.patient.fullName}</td>
                                    <td className="py-4 px-4 text-center">{item.examType.typeName}</td>
                                    <td className="py-4 px-4 text-center">{item.lastResult || "N/A"}</td>
                                    <td className="py-4 px-4 text-center">
                                        {item.isLastResultAbnormal ? (
                                            <span className="inline-flex items-center justify-center w-32 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                                Abnormal
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center justify-center w-32 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                                Normal
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        {formatDate(item.updatedAt) || "N/A"}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <Link to={`${link}/${item.monitoringItemId}`}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="py-3 px-4 text-center text-gray-500">
                                    No monitoring items found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex-shrink-0">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalElements={totalElements}
                    pageSize={pageSize}
                />
            </div>
        </div>
    );
};

export default TableMonitoringItems;
