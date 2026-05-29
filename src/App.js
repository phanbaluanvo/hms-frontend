import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DoctorPages from './modules/client/page/doctor/DoctorPages';
import AdminPages from './modules/Admin/AdminPages';
import LoginPage from './modules/Login/LoginPage';
import PatientLoginPage from './modules/client/page/patient/PatientLoginPage';
import PatientRegisterPage from './modules/client/page/patient/PatientRegisterPage';
import WelcomePage from './modules/Login/WelcomePage';
import StaffPages from './modules/client/page/staff/StaffPages';
import PatientPages from './modules/client/page/patient/PatientPages';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" rep />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/employee/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPages />} />
        <Route path="/doctor/*" element={<DoctorPages />} />
        <Route path="/patient/*" element={<PatientPages />} />
        <Route path="/staff/*" element={<StaffPages />} />
        <Route path="/patient/login" element={<PatientLoginPage />} />
        <Route path="/patient/register" element={<PatientRegisterPage />} />

        {/* <Route path="/patient/*" element={<PatientApp />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
