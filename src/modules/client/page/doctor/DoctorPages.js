import { UserProvider } from "../../../../utils/UserContext";
import DoctorHomepage from "./DoctorHomepage";
import { Routes, Route } from 'react-router-dom';
import ViewExamDetailsPage from "../ViewExamDetailsPage";
import AccountSettingPage from "../AccountSettingPage";


function DoctorPages() {

    return (
        <UserProvider>
            <Routes>
                <Route index element={<DoctorHomepage />} />
                <Route path="/exam/view/:examId" element={<ViewExamDetailsPage />} />
                <Route path="/account-setting" element={<AccountSettingPage />} />
            </Routes>
        </UserProvider>
    );
}

export default DoctorPages;