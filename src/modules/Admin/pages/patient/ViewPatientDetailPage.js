import React, { useState, useEffect, useCallback } from "react";
import PatientForm from "../../components/patient/PatientForm";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";
import Spinner from "../../components/common/Spinner";
import AdminLayout from "../AdminLayout";
import { fetchPatientDetails } from "../../../../services/PatientService";


const ViewPatientDetailPage = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

    const loadPatientData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchPatientDetails(patientId);
            setPatientData(response);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }, [patientId]);

    useEffect(() => {
        loadPatientData();
    }, [loadPatientData]);

    // Handle form submission for modifying patient data
    const handleSubmit = async (formData) => {
        // try {
        //     const response = await modifyPatient(formData, healthId);
        //     if (response.status === 200) {
        //         setModalTitle("Success");
        //         setModalMessage("Patient updated successfully!");
        //         setModalOpen(true);
        //     } else {
        //         setModalTitle("Error");
        //         setModalMessage("Unexpected response.");
        //         setModalOpen(true);
        //     }
        // } catch (error) {
        //     setModalTitle("Error");
        //     setModalMessage("Failed to update patient.");
        //     setModalOpen(true);
        // }
    };

    // Handle patient deletion
    const handleDelete = async () => {
        // try {
        //     const response = await deletePatient(healthId);
        //     if (response.status === 200) {
        //         setModalTitle("Success");
        //         setModalMessage("Patient deleted successfully.");
        //         setIsDeleteSuccess(true);
        //         setModalOpen(true);
        //     } else {
        //         setModalTitle("Error");
        //         setModalMessage("Failed to delete patient.");
        //         setModalOpen(true);
        //     }
        // } catch (error) {
        //     setModalTitle("Error");
        //     setModalMessage("Failed to delete patient.");
        //     setModalOpen(true);
        // }
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
            navigate("/admin/patients/manage");
        } else {
            loadPatientData();
            setIsDisabled(true);
        }
    };

    return (
        <AdminLayout title={`Patient ${patientId} Detail`} backTo="/admin/patient/manage">
            {loading ? (
                <Spinner />
            ) : (
                <PatientForm
                    initialData={patientData}
                    isDisabled={isDisabled}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDeleteConfirmation}
                    role="ADMIN"
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
                title="Confirm Deletion"
                message="Are you sure you want to delete this patient?"
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmDelete}
                isDeleteConfirm={true}
            />
        </AdminLayout>
    );
};

export default ViewPatientDetailPage;
