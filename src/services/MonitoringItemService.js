import axios from "../config/axios-customize"

export const setUpMonitoringItem = async (dto) => {
    try {
        await axios.post(`/doctor/monitor/set`, dto);
    } catch (error) {
        throw error.response.data;
    }
}

export const fetchMonitoringItemsByDoctor = async (doctorId) => {
    try {
        const response = await axios.get(`/doctor/monitor/get/${doctorId}`);
        return response.body;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteMonitoringItem = async (id) => {
    try {
        await axios.delete(`/doctor/monitor/delete/${id}`);
    } catch (error) {
        throw error.response?.data || error.message;
    }
};