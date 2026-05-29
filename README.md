# HMS — Health Management System (Frontend)

A full-stack web application for managing hospital operations, built with React and Spring Boot. The system supports four distinct user roles — Admin, Doctor, Staff, and Patient — each with their own portal and permissions.

> Backend repo: https://github.com/phanbaluanvo/hms-backend.git

---

## Features

### Admin
- Dashboard overview
- Employee management: create, view, update, and deactivate employee accounts (Doctor / Staff)
- Patient management: search and view patient records
- Exam management: browse, view details, and delete medical exams
- Generate reports

### Doctor
- View assigned exam list with advanced filters (patient, date range, exam type, abnormal flag)
- Prescribe new exams for patients
- View detailed exam results and update exam items
- Set up patient monitoring items
- Account settings with profile photo upload

### Staff
- View and search all exams across the hospital
- View detailed exam records
- Account settings

### Patient
- Self-registration and login
- View personal exam history with filters
- View detailed exam results
- Account settings

### All roles
- JWT authentication with automatic silent token refresh
- Role-based access control enforced on both frontend and backend
- Profile photo upload

## Tech Stack

**Frontend**
- [React 18](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [React Redux](https://react-redux.js.org/)
- [Axios](https://axios-http.com/) with JWT request/response interceptors
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [Day.js](https://day.js.org/)

**Backend**
- Java Spring Boot
- Spring Security with JWT
- Role-based authorization via `@PreAuthorize`

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- Spring Boot backend running (default port `8081`)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd HMS-frontend-reactjs/hms-frontend-reactjs

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file in the project root to point to your backend:

```env
REACT_APP_API_URL=http://localhost:8081
```

If not set, the app defaults to `http://localhost:8081`.

## Project Structure

```
src/
├── config/
│   └── axios-customize.js      # Axios instance with JWT interceptors
├── modules/
│   ├── Admin/                  # Admin portal
│   │   ├── components/         # Reusable UI components
│   │   └── pages/              # Dashboard, employees, patients, exams, reports
│   ├── client/                 # Doctor, Staff, Patient portals
│   │   ├── components/         # Shared modals and UI components
│   │   └── page/               # Role-specific pages
│   └── Login/                  # Welcome page and employee login
├── services/                   # API service layer
│   ├── AccountService.js
│   ├── EmployeeService.js
│   ├── ExamService.js
│   ├── MonitoringItemService.js
│   └── PatientService.js
└── utils/
    ├── AuthService.js          # Login, logout, token handling
    └── UserContext.js          # Global authenticated user state
```

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/welcome` | Public | Landing page |
| `/employee/login` | Public | Employee login |
| `/patient/login` | Public | Patient login |
| `/patient/register` | Public | Patient self-registration |
| `/admin/dashboard` | Admin | Dashboard |
| `/admin/employee/manage` | Admin | Employee list |
| `/admin/employee/create` | Admin | Create new employee |
| `/admin/employee/view/:workingId` | Admin | Employee detail |
| `/admin/patient/manage` | Admin | Patient list |
| `/admin/patient/view/:patientId` | Admin | Patient detail |
| `/admin/exam/manage` | Admin | Exam list |
| `/admin/exam/view/:examId` | Admin | Exam detail |
| `/admin/report` | Admin | Generate reports |
| `/doctor` | Doctor | Exam list + prescribe |
| `/doctor/exam/view/:examId` | Doctor | Exam detail |
| `/staff` | Staff | Exam list |
| `/staff/exam/view/:examId` | Staff | Exam detail |
| `/patient` | Patient | Personal exam history |
| `/patient/exam/view/:examId` | Patient | Exam detail |
| `/:role/account-setting` | All | Account settings |
