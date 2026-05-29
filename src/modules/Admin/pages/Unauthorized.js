import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/welcome");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">401</h1>
                <h2 className="text-2xl mt-2 font-semibold text-gray-800">
                    Unauthorized Access
                </h2>
                <p className="mt-4 text-gray-600">
                    You do not have permission to view this page.
                </p>
                <div className="mt-6 space-x-4">
                    <button
                        onClick={handleLogin}
                        className="bg-blue-600 text-white px-10 py-2 rounded-lg hover:bg-blue-500"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
