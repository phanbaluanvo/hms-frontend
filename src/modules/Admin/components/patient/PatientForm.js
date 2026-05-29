import React, { useState, useEffect } from 'react';
import { updateUserStatus } from '../../../../services/AccountService';

const handleKeyPress = (event) => {
    const charCode = event.charCode;
    if (charCode !== 8 && charCode !== 0 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
};

const inputClass = "block w-full rounded-lg border border-slate-300 py-2 px-3 text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition";
const labelClass = "block text-sm font-medium text-slate-700 mb-1";

const statusColors = {
    ACTIVE:   'bg-green-50 text-green-700 ring-green-600/20',
    PENDING:  'bg-amber-50 text-amber-700 ring-amber-600/20',
    INACTIVE: 'bg-red-50 text-red-700 ring-red-600/20',
    REJECTED: 'bg-red-50 text-red-700 ring-red-600/20',
};

function PatientForm({ initialData = {}, handleSave, isDisabled: initialDisabled, role }) {
    const [isDisabled, setIsDisabled] = useState(initialDisabled);
    const [formData, setFormData] = useState({
        userId: '', fullName: '', dateOfBirth: '', email: '',
        phoneNumber: '', address: '', healthId: '', emergencyContact: '', status: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                userId: initialData.userId || '',
                fullName: initialData.fullName || '',
                dateOfBirth: initialData.dateOfBirth || '',
                email: initialData.email || '',
                phoneNumber: initialData.phoneNumber || '',
                address: initialData.address || '',
                healthId: initialData.healthId || '',
                emergencyContact: initialData.emergencyContact || '',
                status: initialData.status || '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateStatus = async (userId, status) => {
        const response = await updateUserStatus(userId, status);
        alert(response.message);
        window.location.reload();
    };

    const statusCls = statusColors[formData.status] || 'bg-slate-50 text-slate-600 ring-slate-500/20';

    return (
        <form className="space-y-5">
            {/* Personal Information */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-800">Personal Information</h2>
                    {formData.status && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${statusCls}`}>
                            {formData.status}
                        </span>
                    )}
                </div>
                <div className="p-6 grid grid-cols-12 gap-5">
                    <div className="col-span-12 sm:col-span-6">
                        <label className={labelClass}>Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12 sm:col-span-3">
                        <label className={labelClass}>Date of Birth</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12 sm:col-span-3">
                        <label className={labelClass}>Health ID</label>
                        <input type="text" name="healthId" value={formData.healthId} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                        <label className={labelClass}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                        <label className={labelClass}>Phone Number</label>
                        <input type="text" name="phoneNumber" onKeyPress={handleKeyPress} value={formData.phoneNumber} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                        <label className={labelClass}>Emergency Contact</label>
                        <input type="text" name="emergencyContact" onKeyPress={handleKeyPress} value={formData.emergencyContact} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12">
                        <label className={labelClass}>Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                </div>
            </div>

            {/* Status Actions */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-sm font-semibold text-slate-800 mb-4">Account Actions</h2>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => handleUpdateStatus(formData.userId, "ACTIVE")}
                        disabled={formData.status === "ACTIVE"}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                    </button>
                    <button
                        type="button"
                        onClick={() => handleUpdateStatus(formData.userId, formData.status === "PENDING" ? "REJECTED" : "INACTIVE")}
                        disabled={formData.status !== "ACTIVE" && formData.status !== "PENDING"}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Decline
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PatientForm;
