import { Routes, Route } from 'react-router-dom';
import PatientHomepage from './PatientHomepage';
import AccountSettingPage from '../AccountSettingPage';
import { UserProvider } from '../../../../utils/UserContext';
import PatientLoginPage from './PatientLoginPage';
import PatientRegisterPage from './PatientRegisterPage';
import ViewExamDetailsPage from '../ViewExamDetailsPage';

function PatientPages() {
    return (
        <UserProvider>
            <Routes>
                <Route index element={<PatientHomepage />} />
                <Route path="/account-setting" element={<AccountSettingPage />} />
                <Route path="/exam/view/:examId" element={<ViewExamDetailsPage />} />
            </Routes>
        </UserProvider>
    )
}

export default PatientPages;