import React, { useState, useEffect } from "react";
import HeaderBar from "../components/common/HeaderBar"; // Import your HeaderBar component
import { fetchImage } from "../../../utils/AuthService";
import { useUser } from "../../../utils/UserContext";
import Spinner from "../../Admin/components/common/Spinner";
import Unauthorized from "../../Admin/pages/Unauthorized";

const ClientLayout = ({ children }) => {
    const { user, profileImageUrl, loadingUser } = useUser();

    if (loadingUser) {
        return <Spinner /> // Show a loading screen while user data is being fetched
    }

    return (
        <div>
            <HeaderBar user={user} profileImage={profileImageUrl} />
            <main className="max-w-screen-2xl mx-auto mt-5">{children}</main>
        </div>
    );
};

export default ClientLayout;
