import React, { useState, useEffect } from 'react';
import Title from '../../../Admin/components/common/Title';
import TableExams from '../../../Admin/components/exam/TableExams';
import { useUser } from '../../../../utils/UserContext';
import Spinner from '../../../Admin/components/common/Spinner';
import StaffCombinedSearch from '../../components/common/StaffCombinedSearch';
import ClientLayout from '../ClientLayout';
import { sfAnd, sfEqual, sfGt, sfIsNull, sfLike, sfNot, sfOr, sfLt } from 'spring-filter-query-builder';
import { fetchExamsFiltered } from '../../../../services/ExamService';

function StaffHomepage() {
    const { user } = useUser();

    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        meta: { page: 1, pageSize: 10, totalPages: 1, totalElements: 0 }
    });
    const [searchQuery, setSearchQuery] = useState('');


    const fetchExamsFilteredStaff = async (page = 1, search = '') => {
        try {
            setLoading(true);
            const responseBody = await fetchExamsFiltered(page, pagination.meta.pageSize, search, '/staff/exam/get-exams');
            setExams(responseBody.result);
            setPagination({ meta: responseBody.meta || { page: 1, pageSize: 10, totalPages: 1, totalElements: 0 } });
        } catch (error) {
            setError('Failed to load exam data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExamsFilteredStaff();
    }, [user]);

    const handlePageChange = (pageNumber) => {
        fetchExamsFilteredStaff(pageNumber, searchQuery);
    };

    const handleSearch = ({ doctorSearch, patientSearch, examItemSearch, startDate, endDate, abnormalFilter }) => {
        // Initialize filters array
        const filters = [];

        if (patientSearch) {
            const patientFilters = sfOr([
                sfLike('patient.patientId', `*${patientSearch}*`),
                sfLike('patient.fullName', `*${patientSearch}*`)
            ])
            filters.push(patientFilters);
        }

        if (examItemSearch) {
            filters.push(
                sfOr([
                    sfLike('examItems.examType.examSubTypeName', `*${examItemSearch}*`),
                    sfLike('examItems.examType.examTypeName', `*${examItemSearch}*`),
                ])
            );
        }

        if (startDate) {
            filters.push(sfGt('createdAt', `${startDate}T00:00:00.000`));
        }

        if (endDate) {
            filters.push(sfLt('createdAt', `${endDate}T23:59:59.999`));
        }

        if (abnormalFilter) {
            filters.push(sfEqual('abnormal', abnormalFilter));
        }

        if (doctorSearch) {
            const doctorFilters = sfOr([
                sfLike('doctor.workingId', `*${doctorSearch}*`),
                sfLike('doctor.fullName', `*${doctorSearch}*`),
            ]);
            filters.push(doctorFilters);
        }

        // Combine all filters using sfAnd
        const combinedFilter = sfAnd(filters);


        var filterString = null;

        if (filters.length !== 0) {
            filterString = combinedFilter.toString();
        }

        setSearchQuery(filterString);
        fetchExamsFilteredStaff(1, filterString);
    };


    return (
        <>

            <ClientLayout>
                <>
                    <Title title="Exam Lists" />
                    <StaffCombinedSearch onSearch={handleSearch} />
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <TableExams
                            exams={exams}
                            pagination={pagination}
                            fetchData={handlePageChange}
                            link={`/staff/exam/view`}
                        />
                    )}
                </>
            </ClientLayout>
        </>
    );
}

export default StaffHomepage;
