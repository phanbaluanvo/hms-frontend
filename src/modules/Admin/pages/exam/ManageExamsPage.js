import React, { useState, useEffect } from "react";
import TableExams from "../../components/exam/TableExams";
import SearchBar from "../../components/common/SearchBar";
import AdminLayout from "../AdminLayout";
import Modal from "../../components/common/Modal"; // Import the Modal component
import { deleteExam, fetchExams } from "../../../../services/ExamService";
import Spinner from "../../components/common/Spinner";

const ManageExamsPage = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        meta: { page: 1, pageSize: 10, totalPages: 1, totalElements: 0 },
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [examToDelete, setExamToDelete] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const fetchData = async (page = 1, filter = "") => {
        try {
            setLoading(true);
            const responseBody = await fetchExams(page, pagination.meta.pageSize, filter);
            setExams(responseBody.result);
            setPagination({ meta: responseBody.meta });
        } catch (error) {
            setError("Failed to load exam data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePageChange = (pageNumber) => {
        fetchData(pageNumber, searchQuery);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchData(1, query);
    };

    const handleDelete = async () => {
        try {
            await deleteExam(examToDelete);
            setModalTitle("Success");
            setModalMessage("Exam deleted successfully.");
            setModalOpen(true);
            fetchData(); // Refresh the list after deletion
        } catch (error) {
            setModalTitle("Error");
            setModalMessage("Failed to delete the exam.");
            setModalOpen(true);
        } finally {
            setConfirmationOpen(false);
        }
    };

    const handleDeleteConfirmation = (examId) => {
        setExamToDelete(examId);
        setConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setConfirmationOpen(false);
        setExamToDelete(null);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <AdminLayout
            title="Manage Exams"
            children={
                <>
                    <SearchBar onSearch={handleSearch} />
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <TableExams
                            exams={exams}
                            pagination={pagination}
                            fetchData={handlePageChange}
                            role={"ADMIN"}
                            link={`/admin/exam/view`}
                            handleDelete={handleDeleteConfirmation}
                        />
                    )}
                    {/* Confirmation Modal */}
                    <Modal
                        isOpen={confirmationOpen}
                        title="Confirm Deletion"
                        message="Are you sure you want to delete this exam?"
                        onClose={handleCloseConfirmation}
                        onConfirm={handleDelete}
                        isDeleteConfirm={true}
                    />
                    {/* Feedback Modal */}
                    <Modal
                        isOpen={modalOpen}
                        title={modalTitle}
                        message={modalMessage}
                        onClose={handleCloseModal}
                    />
                </>
            }
        />
    );
};

export default ManageExamsPage;
