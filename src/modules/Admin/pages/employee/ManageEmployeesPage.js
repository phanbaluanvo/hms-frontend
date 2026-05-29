import React, { useState, useEffect } from "react";
import TableEmployees from "../../components/employees/TableEmployees";
import Title from "../../components/common/Title";
import { fetchEmployees, initializeFilters } from "../../../../services/EmployeeService";
import SearchBar from "../../components/common/SearchBar";
import AdminLayout from "../AdminLayout";
import Spinner from "../../components/common/Spinner";

const ManageEmployeesPage = () => {
    const filterConditions = ["Departments", "Roles"];
    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState(() => initializeFilters(filterConditions));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        meta: { page: 1, pageSize: 10, totalPages: 1, totalElements: 0 },
    });
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async (page = 1, filter = "") => {
        try {
            setLoading(true);
            const responseBody = await fetchEmployees(page, pagination.meta.pageSize, filter);
            setEmployees(responseBody.result);
            setPagination({ meta: responseBody.meta });
        } catch (error) {
            setError("Failed to load employee data");
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
        fetchData(1, query);
    };

    return (
        <AdminLayout
            title="Manage Employees"
            children={
                <>
                    <SearchBar onSearch={handleSearch} />
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <TableEmployees
                            employees={employees}
                            pagination={pagination}
                            fetchData={handlePageChange}
                        />
                    )}
                </>
            }
        />
    );
};

export default ManageEmployeesPage;
