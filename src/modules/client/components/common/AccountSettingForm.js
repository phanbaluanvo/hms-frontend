import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../config/axios-customize";

let previousPreviewSrc = "";

function previewImage(source) {
    if (!source) return;

    const preview = document.getElementById("image-preview");
    const defaultContent = document.getElementById("default-content");
    const uploadContainer = document.getElementById("upload-container");

    const imageUrl = source instanceof File ? URL.createObjectURL(source) : source;
    previousPreviewSrc = imageUrl;

    preview.src = previousPreviewSrc;
    preview.classList.remove("hidden");
    if (defaultContent) defaultContent.classList.add("hidden");
    if (uploadContainer) uploadContainer.classList.add("p-0");
}

function handleDragOver(event) {
    event.preventDefault();
    document.getElementById("upload-container").classList.add("bg-gray-200");
}

function handleDragLeave(event) {
    event.preventDefault();
    document.getElementById("upload-container").classList.remove("bg-gray-200");
}

function handleDrop(event) {
    event.preventDefault();
    document.getElementById("upload-container").classList.remove("bg-gray-200");
    const file = event.dataTransfer.files[0];
    previewImage(file);
}

function AccountSettingForm({ initialData = {}, handleSubmit }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        address: "",
        profilePhoto: null,
        healthId: ""
    });

    const fetchImagePreview = async (imagePath) => {
        try {
            const response = await axios.get(`/images/${imagePath}`, {
                responseType: "blob", // Get binary data
            });

            const imageUrl = URL.createObjectURL(response);
            previewImage(imageUrl);
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    useEffect(() => {
        if (initialData) {
            setFormData((prevData) => ({

                fullName: initialData.fullName || "",
                dateOfBirth: initialData.dateOfBirth || "",
                email: initialData.email || "",
                phoneNumber: initialData.phoneNumber || "",
                address: initialData.address || "",
                healthId: initialData.healthId || ""
            }));
            if (initialData.profileImage) {
                fetchImagePreview(initialData.profileImage);
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({ ...prevData, profilePhoto: file }));
            previewImage(file);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        handleSubmit(formData);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-12 gap-8">
                        <div className="sm:col-span-8">
                            <label htmlFor="fullName" className="block text-sm/6 font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="dateOfBirth" className="block text-sm/6 font-medium text-gray-900">
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-7">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-5">
                            <label htmlFor="phoneNumber" className="block text-sm/6 font-medium text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full mt-5">
                            <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-900">
                                Profile Photo
                            </label>
                            <div
                                id="upload-container"
                                className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer hover:bg-gray-200 text-center font-semibold text-slate-700"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => document.getElementById("profilePhoto").click()}
                            >
                                <input
                                    id="profilePhoto"
                                    name="profilePhoto"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                <div id="default-content">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-500"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div className="mt-4 flex text-sm/6 text-gray-600">
                                        <span>Upload a file or drag and drop</span>
                                    </div>
                                    <p className="text-xs text-gray-600">PNG, JPG, JPEG</p>
                                </div>

                                <img
                                    id="image-preview"
                                    className="hidden h-64 object-cover rounded-md mt-4"
                                    alt="Image Preview"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end items-center gap-x-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="rounded-md px-3 py-2 text-sm font-semibold  "
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default AccountSettingForm;
