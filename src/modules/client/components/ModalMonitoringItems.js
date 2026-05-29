import React, { useState, useEffect } from "react";
import { fetchExamTypes } from "../../../services/ExamService";
import { fetchPatientDetails } from "../../../services/PatientService";

const ModalMonitoringItem = ({ isOpen, onClose, setMonitoringItem }) => {
    const [examTypes, setExamTypes] = useState([]);
    const [selectedExamTypeId, setSelectedExamTypeId] = useState(null);
    const [patientData, setPatientData] = useState({ patientId: "", fullName: "" });
    const [verifyError, setVerifyError] = useState(null);
    const [isVerified, setIsVerified] = useState(false);

    const loadExamTypes = async () => {
        try {
            const response = await fetchExamTypes();
            setExamTypes(response);
        } catch (error) {
            console.error("Failed to fetch exam types: ", error);
        }
    };

    const verifyPatient = async () => {
        const { patientId } = patientData;
        if (!patientId) {
            setVerifyError("Please enter a valid Patient ID.");
            return;
        }

        try {
            const response = await fetchPatientDetails(patientId);
            setPatientData({ patientId: response.patientId, fullName: response.fullName });
            setVerifyError(null);
            setIsVerified(true);
        } catch (error) {
            setVerifyError(error?.message || "Failed to verify patient.");
            setIsVerified(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isVerified && selectedExamTypeId) {
            const payload = {
                patientId: patientData.patientId,
                examTypeId: selectedExamTypeId,
            };
            setMonitoringItem(payload);
            onClose();
        } else {
            setVerifyError("Patient verification and exam type selection are required.");
        }
    };

    useEffect(() => {
        if (isOpen) {
            loadExamTypes();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-1/2">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Set Monitoring Item</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        &times;
                    </button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block font-medium">Patient ID</label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-md border-gray-300"
                                value={patientData.patientId}
                                onChange={(e) =>
                                    setPatientData((prev) => ({ ...prev, patientId: e.target.value }))
                                }
                            />
                            {!isVerified && (
                                <button
                                    type="button"
                                    onClick={verifyPatient}
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                                >
                                    Verify
                                </button>
                            )}
                        </div>
                        {verifyError && <p className="text-red-500">{verifyError}</p>}
                        <div className="mb-4">
                            <label className="block font-medium">Exam Type</label>
                            {examTypes.map((type) => (
                                <div key={type.typeId} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`type-${type.examTypeId}`}
                                        name="examType"
                                        value={type.typeId}
                                        onChange={(e) => setSelectedExamTypeId(e.target.value)}
                                    />
                                    <label htmlFor={`type-${type.examTypeId}`} className="ml-2">
                                        {type.typeName}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalMonitoringItem;
