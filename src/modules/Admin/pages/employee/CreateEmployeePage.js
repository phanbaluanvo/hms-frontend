import React from "react";
import EmployeeForm from "../../components/employees/EmployeeForm";
import AdminLayout from "../AdminLayout";
import { createNewEmployee } from "../../../../services/EmployeeService";

const CreateEmployeePage = () => {

    const handleSubmit = async (formData) => {
        try {

            if (formData.password !== formData.confirmPassword) {
                alert("Password must match!");
                return
            }

            const response = await createNewEmployee(formData);

            if (response.statusCode === 201) {
                alert(`Employee created successfully! Working ID: ${response.body.workingId}`);
            } else {
                alert("An unexpected response was received.");
            }
        } catch (error) {
            if (error.message) {
                alert(`Error: ${error.message}`);
            } else {
                alert("Failed to create employee. Please try again.");
            }
            console.error("Error in handleSubmit:", error);
        }
    };

    return (
        <AdminLayout
            title="Register New Employee"
            backTo="/admin/employee/manage">
            <EmployeeForm
                handleSubmit={handleSubmit}
                initialData={{}}
                isDisabled={false}
                mode="create"
            />
        </AdminLayout>
    );
};

export default CreateEmployeePage;