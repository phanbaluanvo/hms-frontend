import axios from "../config/axios-customize";

export const updateUserStatus = async (userId, status) => {
    try {
        const response = await axios.put(`/admin/update-status/${userId}`, null, {
            params: { status }, // Attach query parameter
        });

        if (response.statusCode === 200) {
            return {
                success: true,
                message: "Update successfully"
            };
        }
    } catch (error) {
        // Handle errors based on the HTTP status
        if (error.response) {
            if (error.response.status === 404) {
                return "User not found!";
            } else if (error.response.status === 400) {
                return "Bad request! Please check the status or userId.";
            }
        }
        console.error("An error occurred while updating user status:", error);
        return {
            success: true,
            message: "Update unsuccessfully"
        };
    }
};

export const getAccountDetails = async (userId) => {
    try {
        const response = await axios.get(`/account/get/${userId}`);
        return response.body;
    } catch (error) {
        throw error.response?.data.message;
    }
};

export const updateAccountDetails = async (formData, userId) => {
    try {

        const formDataToSend = new FormData();

        const dtoData = {};
        dtoData["userId"] = userId;
        for (const key in formData) {
            if (key !== 'profilePhoto')
                dtoData[key] = formData[key]
        }

        const json = JSON.stringify(dtoData);
        const blob = new Blob([json], {
            type: 'application/json'
        })

        formDataToSend.append('dto', blob);


        if (formData.profilePhoto instanceof File) {
            formDataToSend.append('profilePhoto', formData.profilePhoto);
        }

        await axios.put(`/account/update`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    } catch (error) {
        throw error.response?.data.message;
    }
}