import React, { useEffect, useState } from 'react';
import { fetchExamTypes } from '../../../services/ExamService';
import { fetchPatientDetails } from '../../../services/PatientService';
import { useUser } from '../../../utils/UserContext';

const ModalPrescribeExam = ({ isOpen, onClose, prescribeExam }) => {
    const { user, loadingUser } = useUser();
    const [examTypes, setExamTypes] = useState([]);
    const [verifyError, setVerifyError] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(null);
    const [patientData, setPatientData] = useState({
        patientId: '',
        fullName: '',
        healthId: ''
    });

    const loadExamTypes = async () => {
        try {
            const response = await fetchExamTypes();
            setExamTypes(response);
        } catch (error) {
            console.error('Failed to fetch exam types: ', error);
        }
    };

    const verifyPatient = async () => {
        const patientId = patientData.patientId;
        if (!patientId) {
            setVerifyError('Please enter a valid Patient ID.');
            return;
        }

        try {
            const response = await fetchPatientDetails(patientId);
            setPatientData({
                patientId: response.patientId || '',
                fullName: response.fullName || '',
                healthId: response.healthId || ''
            });
            setVerifyError(null);
            setIsVerified(true);
        } catch (error) {
            setVerifyError(error?.message || 'Failed to verify patient.');
            setIsVerified(false);
            setPatientData({
                patientId: patientId,
                fullName: '',
                healthId: ''
            });
        }
    };

    const changePatient = () => {
        setPatientData({
            patientId: '',
            fullName: '',
            healthId: ''
        });
        setIsVerified(false);
    }

    useEffect(() => {
        if (isOpen) {
            loadExamTypes();
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const examTypeIds = Array.from(
            formData.getAll('examTypeIds')
        ).map((id) => parseInt(id, 10));

        if (!verifyError && isVerified) {
            if (examTypeIds.length === 0) {
                setError('Please select at least one exam type.');
                return;
            }

            const jsonPayload = {
                doctorWorkingId: user?.loginId || '',
                patientId: patientData.patientId || '',
                examTypeIds: examTypeIds
            };

            try {
                await prescribeExam(jsonPayload);
                setError(null);
                onClose();
            } catch (error) {
                const errorMessage =
                    error?.message ||
                    'An unexpected error occurred while prescribing exam.';
                setError(errorMessage);
            }
        } else {
            setError('Patient verification is required.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-3xl font-semibold">Prescribe Exam</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    <form onSubmit={handleFormSubmit}>
                        <div className="border-b border-gray-900/10 pb-4">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                                Patient Information
                            </h3>
                            <div className="grid grid-cols-11 gap-6">
                                <div className="col-span-3 mb-4">
                                    <label
                                        htmlFor="patientId"
                                        className="block text-base font-medium text-gray-700"
                                    >
                                        Patient ID
                                    </label>
                                    <input
                                        type="text"
                                        id="patientId"
                                        name="patientId"
                                        value={patientData.patientId}
                                        required
                                        disabled={isVerified}
                                        className="mt-1 block w-full disabled:bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        onChange={(e) =>
                                            setPatientData({
                                                ...patientData,
                                                patientId: e.target.value
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-span-4 mb-4">
                                    <label
                                        htmlFor="fullName"
                                        className="block text-base font-medium text-gray-700"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={patientData.fullName}
                                        disabled
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-200"
                                    />
                                </div>
                                <div className="col-span-3 mb-4">
                                    <label
                                        htmlFor="healthId"
                                        className="block text-base font-medium text-gray-700"
                                    >
                                        Health ID
                                    </label>
                                    <input
                                        type="text"
                                        id="healthId"
                                        name="healthId"
                                        value={patientData.healthId}
                                        disabled
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-200"
                                    />
                                </div>
                                <div className="col-span-1 mb-4 mt-6">
                                    {!isVerified ? (<button
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm py-2 text-center w-full mt-1"
                                        onClick={verifyPatient}
                                    >
                                        Verify
                                    </button>) : (<button
                                        type="button"
                                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm py-2 text-center w-full mt-1"
                                        onClick={changePatient}
                                    >
                                        Change
                                    </button>)}
                                </div>
                            </div>
                            {verifyError && <p className="italic text-red-500">{verifyError}</p>}
                        </div>
                        <div className="border-b border-gray-900/10 pt-8 pb-4">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                                Exam Type
                            </h3>
                            <div className="grid grid-cols-12 gap-7">
                                {examTypes.map((type) => (
                                    <div key={type.examTypeName} className="col-span-3 mb-4">
                                        <h4 className="block text-lg font-medium text-gray-600">
                                            {type.examTypeName}
                                        </h4>
                                        <div className="space-y-4 mt-2">
                                            {type.examSubTypes.map((subType) => (
                                                <div key={subType.typeId} className="flex">
                                                    <div className="flex items-center h-7">
                                                        <input
                                                            type="checkbox"
                                                            id={`examType${subType.typeId}`}
                                                            name="examTypeIds"
                                                            value={subType.typeId}
                                                            className="text-blue-600 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="ms-2 text-sm">
                                                        <label
                                                            htmlFor={`examType${subType.typeId}`}
                                                            className="text-base font-medium text-gray-600"
                                                        >
                                                            {subType.subTypeName}
                                                        </label>
                                                        <p
                                                            title={subType.description}
                                                            className="text-xs font-normal text-gray-500 line-clamp-1"
                                                        >
                                                            {subType.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-8 space-x-4">
                            {error && <p className="italic text-red-500">{error}</p>}
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Prescribe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalPrescribeExam;
