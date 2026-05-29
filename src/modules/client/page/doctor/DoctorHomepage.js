import React, { useState, useEffect } from 'react';
import Title from '../../../Admin/components/common/Title';
import TableExams from '../../../Admin/components/exam/TableExams';
import ModalPrescribeExam from '../../components/ModalPrescribeExam';
import { useUser } from '../../../../utils/UserContext';
import { fetchExamsFiltered, prescribeExam } from '../../../../services/ExamService';
import Spinner from '../../../Admin/components/common/Spinner';
import DoctorCombinedSearch from '../../components/common/DoctorCombinedSearch';
import Toast from '../../components/common/Toast';
import Unauthorized from '../../../Admin/pages/Unauthorized';
import ClientLayout from '../ClientLayout';
import { sfAnd, sfEqual, sfGt, sfIsNull, sfLike, sfNot, sfOr, sfLt } from 'spring-filter-query-builder';


function DoctorHomepage() {
    const { user } = useUser();

    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        meta: { page: 1, pageSize: 10, totalPages: 1, totalElements: 0 }
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    const doctorId = user?.loginId;

    const initSearch = sfEqual("doctor.workingId", doctorId).toString();

    const fetchExamsFilteredDoctor = async (page = 1, search = initSearch) => {
        try {
            setLoading(true);
            const responseBody = await fetchExamsFiltered(page, pagination.meta.pageSize, search, '/doctor/exam/get-exams');
            setExams(responseBody.result);
            setPagination({ meta: responseBody.meta || { page: 1, pageSize: 2, totalPages: 1, totalElements: 0 } });
        } catch (error) {
            setError('Failed to load exam data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchExamsFilteredDoctor();
        }
    }, [user]);

    const handlePageChange = (pageNumber) => {
        fetchExamsFilteredDoctor(pageNumber, searchQuery);
    };

    const handleSearch = ({ patientSearch, examItemSearch, startDate, endDate, abnormalFilter }) => {
        const filters = [sfEqual("doctor.workingId", doctorId)];

        if (patientSearch) {
            filters.push(
                sfOr([
                    sfLike('patient.patientId', `*${patientSearch}*`),
                    sfLike('patient.fullName', `*${patientSearch}*`),
                ])
            );
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

        // Combine filters using sfAnd
        const combinedFilter = sfAnd(filters);


        var filterString = null;

        if (filters.length !== 0) {
            filterString = combinedFilter.toString();
        }

        setSearchQuery(filterString);
        fetchExamsFilteredDoctor(1, filterString);
    };



    const handlePrescribeExam = async (formData) => {
        try {
            const response = await prescribeExam(formData);
            setToastMessage(`Exam successfully prescribed! Exam ID: ${response.examId}`);
            setIsError(false);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3200);
            setIsModalOpen(false);
            fetchExamsFilteredDoctor();
        } catch (error) {
            const errorMessage = error?.message || 'Failed to prescribe exam.';
            setToastMessage(errorMessage);
            setIsError(true);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3200);
        }
    };

    if (user?.role !== "DOCTOR") return <Unauthorized />

    return (
        <>
            <Toast message={toastMessage} error={isError} visible={toastVisible} />

            <ClientLayout>
                <>
                    <Title title="Exam Lists" />
                    <DoctorCombinedSearch onSearch={handleSearch} />
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <TableExams
                            exams={exams}
                            pagination={pagination}
                            fetchData={handlePageChange}
                            role="DOCTOR"
                            onCreateNewExam={() => setIsModalOpen(true)}
                            link={`/doctor/exam/view`}
                        />
                    )}

                    {isModalOpen && (
                        <ModalPrescribeExam
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            prescribeExam={handlePrescribeExam}
                            role={"DOCTOR"}
                        />
                    )}
                </>
            </ClientLayout>
        </>
    );
}

export default DoctorHomepage;
