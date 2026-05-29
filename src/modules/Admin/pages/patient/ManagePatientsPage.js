import React, { useState, useEffect } from "react";
import TablePatients from "../../components/patient/TablePatients"
import SearchBar from "../../components/common/SearchBar";
import { fetchPatients, initializeFilters } from "../../../../services/PatientService";
import AdminLayout from "../AdminLayout";
import Spinner from "../../components/common/Spinner";

const ManagePatientsPage = () => {
    const filterConditions = ['Status'];

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        meta: { page: 1, pageSize: 10, totalPages: 1, totalElements: 0 }
    });
    const [searchQuery, setSearchQuery] = useState("");


    const fetchData = async (page = 1, filter = "") => {
        try {
            setLoading(true);
            const responseBody = await fetchPatients(page, pagination.meta.pageSize, filter);
            setPatients(responseBody.result);

            setPagination({ meta: responseBody.meta })

        } catch (error) {
            setError('Failed to load patient data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePageChange = (pageNumber) => {
        fetchData(pageNumber, searchQuery);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchData(1, query)
    }

    return (
        <AdminLayout
            title="Manage Patients"
            children={
                <>
                    <SearchBar onSearch={handleSearch} />
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <TablePatients
                            patients={patients}
                            pagination={pagination}
                            fetchData={handlePageChange}
                        />
                    )}
                </>
            }
        />
    );
};

export default ManagePatientsPage;