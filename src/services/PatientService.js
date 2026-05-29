import axios from "../config/axios-customize";

export const fetchPatients = async (page, pageSize, filter) => {
    try {

        const initFilter = filter
            ? `patientId~'*${filter}*' or fullName~'*${filter}*'`
            : null;

        const params = {
            page,
            size: pageSize,
        };

        if (initFilter) {
            params.filter = initFilter;
        }

        const response = await axios.get(`/admin/get-patients`, { params });

        // Check if the response was successful
        if (response.statusCode === 200) {
            return response.body;
        } else {
            throw new Error('Failed to fetch patients');
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
        throw error;
    }
};

export const fetchPatientDetails = async (patientId) => {
    try {
        const response = await axios.get(`/patient/${patientId}`);
        // if (response.statusCode !== 200) {
        //     throw new Error('Network response was not ok');
        // }
        return response.body;
    } catch (error) {
        throw error.response.data;
    }
};

export const registerPatient = async (patientDetails) => {
    try {
        const response = await axios.post(`/patient/register`, patientDetails)
        return response;
    } catch (error) {
        throw error.response.data;
    }
}


export const initializeFilters = (conditions) => {
    const initialFilters = {};
    conditions.forEach(condition => {
        initialFilters[condition] = 'ALL';
    });
    return initialFilters;
};