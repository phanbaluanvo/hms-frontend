import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import ExamDetails from "../../components/exam/ExamDetails";
import Spinner from "../../components/common/Spinner";
import Toast from "../../../client/components/common/Toast";
import { fetchExamDetailsByID, updateExamItem as updateExamItemAPI } from "../../../../services/ExamService";

const ViewExamDetailPage = () => {
    const { examId } = useParams();
    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    const loadExamDetails = async () => {
        try {
            const response = await fetchExamDetailsByID(examId);
            setExamData(response);
        } catch {
            setError("Failed to fetch exam details.");
        } finally {
            setLoading(false);
        }
    };

    const updateExamItem = async (examItem) => {
        try {
            await updateExamItemAPI(examItem);
            setToastMessage("Updated successfully!");
            setIsError(false);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3200);
            await loadExamDetails();
        } catch (err) {
            setToastMessage(err?.message || "Failed to update exam item.");
            setIsError(true);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3200);
        }
    };

    useEffect(() => {
        loadExamDetails();
    }, [examId]);

    return (
        <AdminLayout title={`Exam #${examId}`} backTo="/admin/exam/manage">
            {loading ? (
                <Spinner />
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>
            ) : (
                <ExamDetails examData={examData} updateExamItem={updateExamItem} />
            )}
            <Toast message={toastMessage} error={isError} visible={toastVisible} />
        </AdminLayout>
    );
};

export default ViewExamDetailPage;
