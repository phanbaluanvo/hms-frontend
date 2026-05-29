import React from 'react';

const Pagination = ({ page, pageSize, totalPages, onPageChange, totalElements }) => {
    const indexOfLastRow = page * pageSize;
    const indexOfFirstRow = indexOfLastRow - pageSize;

    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
        } else {
            if (page <= 4) {
                pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (page > 4 && page < totalPages - 3) {
                pageNumbers.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            } else {
                pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            }
        }
        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-700">{totalElements === 0 ? 0 : indexOfFirstRow + 1}</span>–<span className="font-semibold text-slate-700">{Math.min(indexOfLastRow, totalElements)}</span> of <span className="font-semibold text-slate-700">{totalElements}</span> results
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {getPageNumbers().map((pageBtn, index) => (
                    <React.Fragment key={index}>
                        {typeof pageBtn === 'number' ? (
                            <button
                                onClick={() => onPageChange(pageBtn)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                                    pageBtn === page
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {pageBtn}
                            </button>
                        ) : (
                            <span className="w-8 h-8 flex items-center justify-center text-xs text-slate-400">…</span>
                        )}
                    </React.Fragment>
                ))}

                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
