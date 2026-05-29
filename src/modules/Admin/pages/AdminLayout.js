import React, { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar"; // Sidebar component
import HeaderBar from "../components/common/HeaderBar"; // HeaderBar component
import Title from "../components/common/Title";
import Unauthorized from "./Unauthorized";
import Spinner from "../components/common/Spinner";
import { useUser } from "../../../utils/UserContext";

const AdminLayout = ({ children, title, backTo }) => {
    const { user, profileImageUrl, loadingUser } = useUser();


    if (user && user.role !== "ADMIN") return <Unauthorized />


    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
                {!loadingUser && user && user.role === "ADMIN" ? (
                    <>
                        <HeaderBar user={user} profileImage={profileImageUrl} />
                        <main className="p-6 flex-1 overflow-y-auto">
                            <Title title={title} backTo={backTo} />
                            {children}
                        </main>
                    </>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );

};

export default AdminLayout;
