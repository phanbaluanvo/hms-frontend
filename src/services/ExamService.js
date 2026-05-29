import axios from "../config/axios-customize";

export const fetchExams = async (page, pageSize, filter, doctorId = null) => {
    try {

        var initFilter = `examId~'*${filter}*'`

        if (doctorId !== null) {
            initFilter = `${initFilter} and doctor.workingId: '${doctorId}'`
        }

        const response = await axios.get(`/admin/exam/get-exams`, {
            params: { page, size: pageSize, filter: initFilter }
        });

        // Check if the response was successful
        if (response.statusCode === 200) {
            return response.body;
        } else {
            throw new Error('Failed to fetch exams');
        }
    } catch (error) {
        console.error('Error fetching exam data:', error);
        throw error;
    }
};

export const fetchExamsFiltered = async (page, pageSize, filter, url = '/admin/exam/get-exams') => {
    try {

        const response = await axios.get(url, {
            params: { page, size: pageSize, filter }
        });

        // Check if the response was successful
        if (response.statusCode === 200) {
            return response.body;
        } else {
            throw new Error('Failed to fetch exams');
        }
    } catch (error) {
        console.error('Error fetching exam data:', error);
        throw error;
    }
};


export const fetchExamTypes = async () => {
    try {
        const response = await axios.get(`/exam/exam-types/get`);

        if (response.statusCode === 200) {
            return response.body;
        } else {
            throw new Error('Failed to fetch exam types');
        }
    } catch (error) {
        console.error('Error fetching exam types: ', error);
        throw error;
    }
}

export const prescribeExam = async (formData) => {

    try {
        const response = await axios.post(`/doctor/exam/prescribe`, formData);

        return response.body;

    } catch (error) {
        throw error.response.data;
    }
}

export const fetchExamDetailsByID = async (examId) => {
    try {
        const response = await axios.get(`/exam/${examId}`)
        return response.body;
    } catch (error) {
        throw error.response.data;
    }
}

export const updateExamItem = async (formData) => {
    try {
        const response = await axios.put(`/exam/update`, formData);
        return response;
    } catch (error) {
        throw error.response.data
    }
}

export const deleteExam = async (examId) => {
    try {
        const response = await axios.delete(`/exam/delete/${examId}`);
    } catch (error) {
        throw error.response.data;
    }
}