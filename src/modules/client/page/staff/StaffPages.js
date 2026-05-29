import { UserProvider } from "../../../../utils/UserContext";
import { Routes, Route } from 'react-router-dom';
import StaffHomepage from "./StaffHomepage";
import AccountSettingPage from "../AccountSettingPage";
import ViewExamDetailsPage from "../ViewExamDetailsPage";


function StaffPages() {

    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<StaffHomepage />} />
                <Route path="/account-setting" element={<AccountSettingPage />} />
                <Route path="/exam/view/:examId" element={<ViewExamDetailsPage />} />
            </Routes>
        </UserProvider>
    );
}

export default StaffPages;