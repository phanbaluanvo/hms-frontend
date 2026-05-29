import axios from "../config/axios-customize";

export const createNewEmployee = async (formData) => {
    try {
        const formDataToSend = new FormData();

        const dtoData = {};
        for (const key in formData) {
            if (key !== "confirmPassword" && key !== "profilePhoto") {
                dtoData[key] = formData[key];
            }
        }

        const json = JSON.stringify(dtoData);

        const blob = new Blob([json], {
            type: "application/json",
        });

        formDataToSend.append("dto", blob);

        if (formData.profilePhoto instanceof File) {
            formDataToSend.append("profilePhoto", formData.profilePhoto);
        }

        const response = await axios.post(
            `/admin/create-employee-account`,
            formDataToSend,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Error creating new employee:", error);

        if (error.response && error.response.status === 400) {
            const errorMessage =
                error.response.data?.message || "Invalid request data.";
            throw new Error(errorMessage);
        }

        throw error;
    }
};

export const modifyEmployee = async (formData, workingId) => {
    try {
        const formDataToSend = new FormData();

        // Prepare the DTO object excluding `confirmPassword` and `profilePhoto`
        const dtoData = {};
        for (const key in formData) {
            if (key !== 'confirmPassword' && key !== 'profilePhoto') {
                dtoData[key] = formData[key];
            }
        }

        const json = JSON.stringify(dtoData);
        const blob = new Blob([json], {
            type: 'application/json'
        });

        // Append `dto` as JSON string to FormData
        formDataToSend.append('dto', blob);

        // Append `profilePhoto` if it exists and is a valid file object
        if (formData.profilePhoto instanceof File) {
            formDataToSend.append('profilePhoto', formData.profilePhoto);
        }

        // Send the PUT request to update the employee
        const response = await axios.put(`/admin/update-employee/${workingId}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response;
    } catch (error) {
        console.error("Error modifying employee:", error);
        throw error;
    }
};

export const fetchEmployeeData = async (workingId) => {
    try {
        const response = await axios.get(`/admin/view-employee/${workingId}`);

        if (response.statusCode === 200) {
            return response.body;
        }
    } catch (error) {
        console.error("Error fetching employee data:", error);
        throw error;
    }
};

export const deactivateEmployee = async (workingId) => {
    try {
        const response = await axios.put(`/admin/deactivate/${workingId}`);
        return response;
    } catch (error) {
        throw error.response?.data;
    }
};

export const fetchEmployees = async (page, pageSize, filter) => {
    try {
        const initFilter = filter
            ? `workingId~'*${filter}*' or fullName~'*${filter}*'`
            : null;

        const params = {
            page,
            size: pageSize,
        };

        if (initFilter) {
            params.filter = initFilter;
        }

        const response = await axios.get('/admin/get-employees', { params });

        // Check if the response was successful
        if (response.statusCode === 200) {
            return response.body;
        } else {
            throw new Error('Failed to fetch employees');
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
        throw error;
    }
};

export const initializeFilters = (conditions) => {
    const initialFilters = {};
    conditions.forEach((condition) => {
        initialFilters[condition] = 'ALL';
    });
    return initialFilters;
};