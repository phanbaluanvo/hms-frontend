import React, { useState, useEffect, useCallback } from "react";
import EmployeeForm from "../../components/employees/EmployeeForm";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";
import Spinner from "../../components/common/Spinner";
import AdminLayout from "../AdminLayout";
import { deactivateEmployee, fetchEmployeeData, modifyEmployee } from "../../../../services/EmployeeService";


const ViewEmployeeDetailPage = () => {
    const { workingId } = useParams();
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

    const loadEmployeeData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchEmployeeData(workingId);
            setEmployeeData(response);
        } catch (error) {
            console.error("Error fetching employee details:", error);
        } finally {
            setLoading(false);
        }
    }, [workingId]);

    useEffect(() => {
        loadEmployeeData();
    }, [loadEmployeeData]);

    // Handle form submission
    const handleSubmit = async (formData) => {
        try {
            const response = await modifyEmployee(formData, workingId);
            if (response.statusCode === 200) {
                setModalTitle("Success");
                setModalMessage("Employee updated successfully!");
                setModalOpen(true);
            } else {
                setModalTitle("Error");
                setModalMessage("Unexpected response.");
                setModalOpen(true);
            }
        } catch (error) {
            setModalTitle("Error");
            setModalMessage("Failed to update employee.");
            setModalOpen(true);
        }
    };

    // Handle deletion
    const handleDelete = async () => {
        try {
            const response = await deactivateEmployee(workingId);
            if (response.status === 200) {
                setModalTitle("Success");
                setModalMessage("Deactivate account successfully.");
                setIsDeleteSuccess(true);
                setModalOpen(true);
            }
        } catch (error) {
            setModalTitle("Error");
            setModalMessage(error.message);
            setModalOpen(true);
        }
    };

    // Confirmation modal handlers
    const handleDeleteConfirmation = () => setConfirmationOpen(true);
    const handleCloseConfirmation = () => setConfirmationOpen(false);

    const handleConfirmDelete = async () => {
        await handleDelete();
        handleCloseConfirmation();
    };

    const handleCloseModal = () => {
        setModalOpen(false);

        if (isDeleteSuccess) {
            navigate("/admin/employees/manage");
        } else {
            loadEmployeeData();
            setIsDisabled(true);
        }
    };

    return (
        <AdminLayout title={`Employee ${workingId} Detail`} backTo="/admin/employee/manage">
            {loading ? (
                <Spinner />
            ) : (
                <EmployeeForm
                    initialData={employeeData}
                    isDisabled={isDisabled}
                    handleSubmit={handleSubmit}
                    roleMode={true}
                    handleDelete={handleDeleteConfirmation}
                    mode="modification"
                />
            )}

            {/* Success/Error Modal */}
            <Modal
                isOpen={modalOpen}
                title={modalTitle}
                message={modalMessage}
                onClose={handleCloseModal}
            />

            {/* Confirmation Modal */}
            <Modal
                isOpen={confirmationOpen}
                title="Confirm"
                message="Are you sure you want to deactivate this employee?"
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmDelete}
                isDeleteConfirm={true}
            />
        </AdminLayout>
    );
};

export default ViewEmployeeDetailPage;
