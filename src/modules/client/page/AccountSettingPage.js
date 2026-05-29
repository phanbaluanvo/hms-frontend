import React, { useEffect, useState } from "react";
import ClientLayout from "./ClientLayout";
import { useUser } from "../../../utils/UserContext";
import Title from "../../Admin/components/common/Title";
import AccountSettingForm from "../components/common/AccountSettingForm";
import Spinner from "../../Admin/components/common/Spinner";
import { getAccountDetails, updateAccountDetails } from "../../../services/AccountService";

const AccountSettingPage = () => {

    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchAccountDetails = async (userId) => {
        try {
            setLoading(true);
            const response = await getAccountDetails(userId);
            setUserData(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = async (formData) => {
        try {
            await updateAccountDetails(formData, user?.id);
            window.location.reload();
            alert("Update successfully!")
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (user) {
            fetchAccountDetails(user?.id);
        }
    }, [user]);


    const backTo = user?.role === "DOCTOR" ? "/doctor" : user?.role === "STAFF" ? "/staff" : "/patient";

    return (
        <ClientLayout>
            <Title title={"Account Settings"} backTo={backTo} />
            {loading ? (
                <Spinner />
            ) : (
                <AccountSettingForm
                    initialData={userData ?? {}}
                    handleSubmit={handleUpdate}
                />
            )}
        </ClientLayout>
    )
}

export default AccountSettingPage