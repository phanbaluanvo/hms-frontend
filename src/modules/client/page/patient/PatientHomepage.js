import React, { useEffect, useState } from "react";
import ClientLayout from "../ClientLayout";
import { useUser } from "../../../../utils/UserContext";
import StaffCombinedSearch from "../../components/common/StaffCombinedSearch";
import Spinner from "../../../Admin/components/common/Spinner";
import Toast from "../../components/common/Toast";
import Title from "../../../Admin/components/common/Title";
import TableExams from "../../../Admin/components/exam/TableExams";
import PatientCombinedSearch from "../../components/common/PatientCombinedSearch";
import { sfAnd, sfEqual, sfGt, sfIsNull, sfLike, sfNot, sfOr, sfLt } from 'spring-filter-query-builder';
import { fetchExamsFiltered } from "../../../../services/ExamService";


function PatientHomepage() {
    const { user } = useUser();

    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        meta: { page: 1, pageSize: 10, totalPages: 1, totalElements: 0 }
    });
    const [searchQuery, setSearchQuery] = useState('');

    const patientId = user?.loginId;

    const fetchExamsFilteredPatient = async (page = 1, search) => {
        try {
            setLoading(true);
            const responseBody = await fetchExamsFiltered(page, pagination.meta.pageSize, search, '/patient/exam/get-exams');
            setExams(responseBody.result);
            setPagination({ meta: responseBody.meta || { page: 1, pageSize: 10, totalPages: 1, totalElements: 0 } });
        } catch (error) {
            setError('Failed to load exam data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            const initSearch = sfEqual("patient.patientId", user.loginId).toString();
            fetchExamsFilteredPatient(1, initSearch);
        }
    }, [user]);

    const handlePageChange = (pageNumber) => {
        fetchExamsFilteredPatient(pageNumber, searchQuery);
    };

    const handleSearch = ({ doctorSearch, examItemSearch, startDate, endDate, abnormalFilter }) => {
        // Build dynamic filters
        const filters = [sfEqual("patient.patientId", patientId)];

        if (examItemSearch) {
            filters.push(
                sfOr([
                    sfLike('examItems.examType.examSubTypeName', `*${examItemSearch}*`),
                    sfLike('examItems.examType.examTypeName', `*${examItemSearch}*`),
                ])
            );
        }

        if (startDate) {
            filters.push(sfGt("createdAt", `${startDate}T00:00:00.000`));
        }

        if (endDate) {
            filters.push(sfLt("createdAt", `${endDate}T23:59:59.999`));
        }

        if (abnormalFilter) {
            filters.push(sfEqual("abnormal", abnormalFilter));
        }

        if (doctorSearch) {
            filters.push(
                sfOr([
                    sfLike("doctor.workingId", `*${doctorSearch}*`),
                    sfLike("doctor.fullName", `*${doctorSearch}*`),
                ])
            );
        }

        const combinedFilter = sfAnd(filters);


        var filterString = null;

        if (filters.length !== 0) {
            filterString = combinedFilter.toString();
        }

        setSearchQuery(filterString);
        fetchExamsFilteredPatient(1, filterString);
    };



    return (
        <>
            <ClientLayout>
                <>
                    <Title title="Exam Lists" />
                    <PatientCombinedSearch onSearch={handleSearch} />
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <TableExams
                            exams={exams}
                            pagination={pagination}
                            fetchData={handlePageChange}
                            role="PATIENT"
                            link={`/patient/exam/view`}
                        />
                    )}
                </>
            </ClientLayout>
        </>
    );
}

export default PatientHomepage;