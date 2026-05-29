import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageEmployeesPage from './pages/employee/ManageEmployeesPage';
import CreateEmployeePage from './pages/employee/CreateEmployeePage';
import ViewEmployeeDetailPage from './pages/employee/ViewEmployeeDetailPage';
import ManagePatientsPage from './pages/patient/ManagePatientsPage';
import ViewPatientDetailPage from './pages/patient/ViewPatientDetailPage';
import ManageExamsPage from './pages/exam/ManageExamsPage';
import ViewExamDetailPage from './pages/exam/ViewExamDetailPage';
import { UserProvider } from '../../utils/UserContext';
import GenerateReportPage from './pages/report/GenerateReportPage';

function AdminPages() {

    return (
        <UserProvider>
            <Routes>
                <Route path="/dashboard" element={<AdminDashboardPage />} />
                <Route path="/employee/manage" element={<ManageEmployeesPage />} />
                <Route path="/employee/create" element={<CreateEmployeePage />} />
                <Route path="/employee/view/:workingId" element={<ViewEmployeeDetailPage />} />
                <Route path="/patient/manage" element={<ManagePatientsPage />} />
                <Route path="/patient/view/:patientId" element={<ViewPatientDetailPage />} />
                <Route path="/exam/manage" element={<ManageExamsPage />} />
                <Route path="/exam/view/:examId" element={<ViewExamDetailPage />} />
                <Route path="/report" element={<GenerateReportPage />} />
            </Routes>
        </UserProvider>

    );
}

export default AdminPages;
