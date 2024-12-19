import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Header } from "../components/admin/Header";
import { Footer } from "../components/admin/Footer";
import { axiosInstance } from "../config/axiosInstance";

export const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);

    const checkAdminAuthorization = async () => {
        try {
            const response = await axiosInstance.get("/admin/check-admin", {
                withCredentials: true,
            });
            const adminData = response?.data?.data;

            if (adminData?.role !== "admin") {
                throw new Error("Unauthorized access for this role");
            }

            setIsAdminAuthorized(true);
        } catch (error) {
            console.error("Admin Authorization Error:", error);
            setIsAdminAuthorized(false);
            if (location.pathname !== "/admin/login") {
                navigate("/admin/login", { replace: true });
            }
        }
    };

    useEffect(() => {
        checkAdminAuthorization();
    }, [location.pathname]);

    return (
        <div>
            {isAdminAuthorized ? <AdminHeader /> : <Header />}
            <div className="min-h-96 px-24 py-14">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
