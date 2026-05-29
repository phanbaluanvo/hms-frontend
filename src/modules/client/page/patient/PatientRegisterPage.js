import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerPatient } from "../../../../services/PatientService";
import Toast from "../../components/common/Toast";

function PatientRegisterPage() {
    const [toastMessage, setToastMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [inputType, setInputType] = useState("text");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        phoneNumber: "",
        emergencyContact: "",
        email: "",
        address: "",
        healthId: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const passwordsMatch = () => formData.password === formData.confirmPassword;

    const handleSubmit = async (e) => {
        setError(false);
        e.preventDefault();

        if (!passwordsMatch()) {
            setError(true);
            setToastMessage("Passwords do not match!");
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000);
            return;
        }
        if (formData.password.length < 8) {
            setError(true);
            setToastMessage("Password must be at least 8 characters and include special characters #$!@!");
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000);
            return;
        }

        const patientDetails = { ...formData };
        delete patientDetails.confirmPassword;

        setLoading(true);
        try {
            const response = await registerPatient(patientDetails);
            if (response.statusCode === 201) {
                setToastMessage("Submitted. Please wait for Admin Approval.");
                setToastVisible(true);
                setTimeout(() => setToastVisible(false), 3000);
            }
        } catch (err) {
            setToastMessage(err.message || "An error occurred");
            setError(true);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition";

    return (
        <div className="min-h-screen flex">

            {/* Left branding panel */}
            <div className="hidden lg:flex lg:w-5/12 xl:w-2/5 bg-gradient-to-br from-teal-600 to-teal-800 flex-col justify-between p-12 relative overflow-hidden">

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid2)" />
                    </svg>
                </div>

                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-500 rounded-full opacity-30" />
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-teal-900 rounded-full opacity-40" />

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-teal-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 13h-2v-4H7v-2h4V5h2v4h4v2h-4v4z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm leading-none">Health Management</div>
                        <div className="text-teal-300 text-xs">System</div>
                    </div>
                </div>

                {/* Main content */}
                <div className="relative space-y-6">
                    <div>
                        <h2 className="text-4xl font-extrabold text-white leading-tight mb-3">
                            Create your<br />patient account
                        </h2>
                        <p className="text-teal-100 text-sm leading-relaxed max-w-xs">
                            Register to access your personal health portal and connect with the care team.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="space-y-4">
                        {[
                            { step: "01", title: "Complete the form", desc: "Fill in your personal and health details" },
                            { step: "02", title: "Admin review", desc: "Your account will be reviewed and approved" },
                            { step: "03", title: "Access your portal", desc: "Log in and manage your health records" },
                        ].map(({ step, title, desc }) => (
                            <div key={step} className="flex gap-4">
                                <div className="w-8 h-8 flex-shrink-0 bg-white/15 border border-white/25 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                    {step}
                                </div>
                                <div>
                                    <div className="text-white text-sm font-semibold">{title}</div>
                                    <div className="text-teal-300 text-xs">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative text-teal-400 text-xs">
                    © 2025 Health Management System
                </div>
            </div>

            {/* Right form panel */}
            <div className="flex-1 bg-white flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 py-10 overflow-y-auto">
                <div className="w-full max-w-lg mx-auto">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 13h-2v-4H7v-2h4V5h2v4h4v2h-4v4z" />
                            </svg>
                        </div>
                        <span className="font-bold text-slate-800 text-sm">Health Management System</span>
                    </div>

                    <div className="mb-7">
                        <h1 className="text-2xl font-bold text-slate-900 mb-1">Patient Registration</h1>
                        <p className="text-sm text-slate-500">Please fill in all required fields accurately</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Section: Personal Information */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Personal Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input type="text" id="fullName" placeholder="Nguyen Van An" required value={formData.fullName} onChange={handleInputChange} className={inputClass} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                                        <input
                                            id="dateOfBirth"
                                            placeholder="Date of Birth"
                                            type={inputType}
                                            onFocus={() => setInputType("date")}
                                            onBlur={() => setInputType("text")}
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="healthId" className="block text-sm font-medium text-slate-700 mb-1">Health ID</label>
                                        <input type="text" id="healthId" placeholder="e.g. HL-00123" required value={formData.healthId} onChange={handleInputChange} className={inputClass} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                    <input type="text" id="address" placeholder="123 Street, District, City" required value={formData.address} onChange={handleInputChange} className={inputClass} />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-100" />

                        {/* Section: Contact */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Contact Details</h3>
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                        <input type="text" id="phoneNumber" placeholder="0912 345 678" required value={formData.phoneNumber} onChange={handleInputChange} className={inputClass} />
                                    </div>
                                    <div>
                                        <label htmlFor="emergencyContact" className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
                                        <input type="text" id="emergencyContact" placeholder="0987 654 321" required value={formData.emergencyContact} onChange={handleInputChange} className={inputClass} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input type="email" id="email" placeholder="you@example.com" required value={formData.email} onChange={handleInputChange} className={inputClass} />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-100" />

                        {/* Section: Password */}
                        <div>
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Security</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                    <input type="password" id="password" placeholder="Min. 8 characters" required autoComplete="new-password" value={formData.password} onChange={handleInputChange} className={inputClass} />
                                    {formData.password !== "" && (
                                        <ul className="mt-2 space-y-1">
                                            {[
                                                { label: "At least 8 characters", met: formData.password.length >= 8 },
                                                { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
                                                { label: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
                                                { label: "Contains special character (#$!@)", met: /[#$!@]/.test(formData.password) },
                                            ].map(({ label, met }) => (
                                                <li key={label} className={`flex items-center gap-1.5 text-xs ${met ? "text-teal-600" : "text-slate-400"}`}>
                                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        {met
                                                            ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        }
                                                    </svg>
                                                    {label}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Re-enter password"
                                        required
                                        autoComplete="new-password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:border-transparent transition ${
                                            formData.confirmPassword === ""
                                                ? "border-slate-300 focus:ring-teal-500"
                                                : passwordsMatch()
                                                ? "border-teal-400 focus:ring-teal-500"
                                                : "border-red-400 focus:ring-red-400"
                                        }`}
                                    />
                                    {formData.confirmPassword !== "" && (
                                        <p className={`text-xs mt-1 ${passwordsMatch() ? "text-teal-600" : "text-red-500"}`}>
                                            {passwordsMatch() ? "Passwords match" : "Passwords do not match"}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Submitting...
                                </>
                            ) : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <Link to="/patient/login" className="text-sm text-slate-600 hover:text-teal-600 font-medium transition-colors">
                            Already have an account? <span className="text-teal-600">Sign in</span>
                        </Link>
                        <Link to="/welcome" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>

            <Toast message={toastMessage} error={error} visible={toastVisible} />
        </div>
    );
}

export default PatientRegisterPage;
