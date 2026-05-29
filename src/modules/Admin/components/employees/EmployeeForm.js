import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "../../../../config/axios-customize";

let previousPreviewSrc = "";

function previewImage(source) {
    if (!source) return;
    const preview = document.getElementById('image-preview');
    const defaultContent = document.getElementById('default-content');
    const uploadContainer = document.getElementById('upload-container');
    const imageUrl = source instanceof File ? URL.createObjectURL(source) : source;
    previousPreviewSrc = imageUrl;
    preview.src = previousPreviewSrc;
    preview.classList.remove('hidden');
    if (defaultContent) defaultContent.classList.add('hidden');
    if (uploadContainer) uploadContainer.classList.add('p-0');
}

function handleDragOver(event) {
    event.preventDefault();
    document.getElementById('upload-container').classList.add('bg-blue-50');
}
function handleDragLeave(event) {
    event.preventDefault();
    document.getElementById('upload-container').classList.remove('bg-blue-50');
}
function handleDrop(event) {
    event.preventDefault();
    document.getElementById('upload-container').classList.remove('bg-blue-50');
    const file = event.dataTransfer.files[0];
    previewImage(file);
}

const handleKeyPress = (event) => {
    const charCode = event.charCode;
    if (charCode !== 8 && charCode !== 0 && (charCode < 48 || charCode > 57)) event.preventDefault();
};

const inputClass = "block w-full rounded-lg border border-slate-300 py-2 px-3 text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition";
const selectClass = "block w-full rounded-lg border border-slate-300 py-2 px-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition";
const labelClass = "block text-sm font-medium text-slate-700 mb-1";

function EmployeeForm({ initialData = {}, handleSubmit, handleDelete, isDisabled: initialDisabled, roleMode = false, mode = null }) {
    const [isDisabled, setIsDisabled] = useState(initialDisabled);
    const [isMatch, setIsMatch] = useState(null);
    const [originalPhoto, setOriginalPhoto] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '', dateOfBirth: '', email: '', phoneNumber: '',
        password: '', confirmPassword: '', role: '', address: '',
        department: '', licenseNumber: '', roleType: '', profilePhoto: null,
    });

    const fetchImagePreview = async (imagePath) => {
        try {
            const response = await axios.get(`/images/${imagePath}`, { responseType: 'blob' });
            const imageUrl = URL.createObjectURL(response);
            previewImage(imageUrl);
            setOriginalPhoto(imageUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({
                ...prev, ...initialData,
                fullName: initialData.fullName || '',
                dateOfBirth: initialData.dateOfBirth || '',
                email: initialData.email || '',
                phoneNumber: initialData.phoneNumber || '',
                password: initialData.password || '',
                confirmPassword: initialData.confirmPassword || '',
                role: initialData.role || '',
                address: initialData.address || '',
                department: initialData.department || '',
                licenseNumber: initialData.licenseNumber || '',
                roleType: initialData.roleType || '',
            }));
            if (initialData.profileImage) fetchImagePreview(initialData.profileImage);
        }
    }, [initialData]);

    const handleCancel = () => {
        setFormData({
            ...initialData,
            fullName: initialData.fullName || '',
            dateOfBirth: initialData.dateOfBirth || '',
            email: initialData.email || '',
            phoneNumber: initialData.phoneNumber || '',
            password: initialData.password || '',
            confirmPassword: initialData.confirmPassword || '',
            role: initialData.role || '',
            address: initialData.address || '',
            department: initialData.department || '',
            licenseNumber: initialData.licenseNumber || '',
            roleType: initialData.roleType || '',
        });
        setIsDisabled(true);
        previewImage(originalPhoto);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'password' || name === 'confirmPassword') {
            const pw = name === 'password' ? value : formData.password;
            const cpw = name === 'confirmPassword' ? value : formData.confirmPassword;
            setIsMatch(pw === cpw && cpw !== "");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, profilePhoto: file }));
            previewImage(file);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        handleSubmit(formData);
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-5">

            {/* Personal Information */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="text-sm font-semibold text-slate-800">Personal Information</h2>
                </div>
                <div className="p-6 grid grid-cols-12 gap-5">
                    <div className="col-span-12 sm:col-span-8">
                        <label className={labelClass}>Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                        <label className={labelClass}>Date of Birth</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12 sm:col-span-7">
                        <label className={labelClass}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12 sm:col-span-5">
                        <label className={labelClass}>Phone Number</label>
                        <input type="text" name="phoneNumber" onKeyPress={handleKeyPress} value={formData.phoneNumber} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                    <div className="col-span-12">
                        <label className={labelClass}>Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                </div>
            </div>

            {/* Role & Department */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="text-sm font-semibold text-slate-800">Role & Department</h2>
                </div>
                <div className="p-6 grid grid-cols-12 gap-5">
                    <div className="col-span-12 sm:col-span-4">
                        <label className={labelClass}>Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} className={selectClass} required disabled={roleMode}>
                            <option value="">Select Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="DOCTOR">Doctor</option>
                            <option value="STAFF">Staff</option>
                        </select>
                    </div>

                    {(formData.role === "" || formData.role === "ADMIN") && (
                        <div className="col-span-12 sm:col-span-4">
                            <label className={labelClass}>Role-specific field</label>
                            <input type="text" className={inputClass} disabled placeholder="Select a role first" />
                        </div>
                    )}
                    {formData.role === "DOCTOR" && (
                        <div className="col-span-12 sm:col-span-4">
                            <label className={labelClass}>License Number</label>
                            <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                        </div>
                    )}
                    {formData.role === "STAFF" && (
                        <div className="col-span-12 sm:col-span-4">
                            <label className={labelClass}>Staff Type</label>
                            <select name="roleType" value={formData.roleType} onChange={handleChange} className={selectClass} disabled={isDisabled}>
                                <option value="">Select Staff Type</option>
                                <option value="Nurse">Nurse</option>
                                <option value="Lab Technician">Lab Technician</option>
                            </select>
                        </div>
                    )}

                    <div className="col-span-12 sm:col-span-4">
                        <label className={labelClass}>Department</label>
                        <input type="text" name="department" value={formData.department} onChange={handleChange} className={inputClass} disabled={isDisabled} />
                    </div>
                </div>
            </div>

            {/* Security (only for create mode) */}
            {mode !== "modification" && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-semibold text-slate-800">Security</h2>
                    </div>
                    <div className="p-6 grid grid-cols-12 gap-5">
                        <div className="col-span-12 sm:col-span-6">
                            <label className={labelClass}>Password</label>
                            <input type="password" name="password" value={formData.password || ""} onChange={handleChange} className={inputClass} required disabled={isDisabled} placeholder="Min. 8 characters" />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <label className={labelClass}>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={isDisabled}
                                placeholder="Re-enter password"
                                className={`block w-full rounded-lg border py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-500 ${
                                    isMatch === null ? 'border-slate-300 focus:ring-blue-500'
                                    : isMatch ? 'border-green-400 focus:ring-green-500'
                                    : 'border-red-400 focus:ring-red-400'
                                }`}
                            />
                            {isMatch !== null && formData.confirmPassword && (
                                <p className={`text-xs mt-1 ${isMatch ? 'text-green-600' : 'text-red-500'}`}>
                                    {isMatch ? 'Passwords match' : 'Passwords do not match'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Photo */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="text-sm font-semibold text-slate-800">Profile Photo</h2>
                </div>
                <div className="p-6">
                    <div
                        id="upload-container"
                        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-10 cursor-pointer hover:border-blue-400 hover:bg-blue-50 text-center transition-colors"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => document.getElementById('profilePhoto').click()}
                    >
                        <input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isDisabled} />
                        <div id="default-content">
                            <svg className="mx-auto h-10 w-10 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                            </svg>
                            <p className="mt-3 text-sm font-medium text-slate-600">Click or drag & drop to upload</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG, JPEG</p>
                        </div>
                        <img id="image-preview" className="hidden h-48 object-cover rounded-lg mt-4" alt="Preview" />
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-2 pb-4">
                <div>
                    {isDisabled && mode !== "create" && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            Deactivate
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {isDisabled || mode === "create" ? (
                        <NavLink to="/admin/employee/manage">
                            <button type="button" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                                Back
                            </button>
                        </NavLink>
                    ) : (
                        <button type="button" onClick={handleCancel} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                            Cancel
                        </button>
                    )}
                    {isDisabled && (
                        <button
                            type="button"
                            onClick={() => setIsDisabled(false)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Modify
                        </button>
                    )}
                    {!isDisabled && (
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}

export default EmployeeForm;
