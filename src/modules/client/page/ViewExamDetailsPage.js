import React, { useEffect, useState } from "react";
import { fetchExamDetailsByID, updateExamItem as updateExamItemAPI } from "../../../services/ExamService";
import ExamDetails from "../../Admin/components/exam/ExamDetails";
import { useParams } from "react-router-dom";
import ClientLayout from "./ClientLayout";
import Toast from "../components/common/Toast";
import Title from "../../Admin/components/common/Title";
import { useUser } from "../../../utils/UserContext";

const ViewExamDetailsPage = () => {
    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { examId } = useParams();
    const { user } = useUser();
    const [toastMessage, setToastMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    const loadExamDetails = async () => {
        try {
            const response = await fetchExamDetailsByID(examId);
            setExamData(response);
        } catch (error) {
            setError("Failed to fetch exam details.");
        } finally {
            setLoading(false);
        }
    };

    const updateExamItem = async (examItem) => {
        try {
            await updateExamItemAPI(examItem);
            setToastMessage("Update successfully!");
            setIsError(false);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3200);
            await loadExamDetails(); // Ensure fresh data is loaded after update
        } catch (error) {
            const errorMessage = error?.message || "Failed to update the exam item.";
            setToastMessage(errorMessage);
            setIsError(true);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3200);
        }
    };

    useEffect(() => {
        loadExamDetails();
    }, [examId]);

    const backTo = user?.role === "DOCTOR" ? "/doctor" : user?.role === "STAFF" ? "/staff" : "/patient";

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <>
            <Toast message={toastMessage} error={isError} visible={toastVisible} />
            <ClientLayout>
                <Title title={`Exam #${examId}`} backTo={backTo} />
                <ExamDetails
                    examData={examData}
                    updateExamItem={updateExamItem}
                />
            </ClientLayout>
        </>
    );
};

export default ViewExamDetailsPage;
