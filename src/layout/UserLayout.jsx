import React, { useEffect, useState } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { axiosInstance } from "../config/axiosInstance";

export const UserLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);

    const checkUserAuthorization = async () => {
        try {
            const response = await axiosInstance.get("/user/check-user", {
                withCredentials: true,
            });
            const userData = response?.data?.data;

            if (userData?.role !== "user") {
                throw new Error("Unauthorized access for this role");
            }

            setIsUserAuthorized(true);
        } catch (error) {
            console.error("User Authorization Error:", error);
            setIsUserAuthorized(false);
            if (location.pathname !== "/login") {
                navigate("/login", { replace: true });
            }
        }
    };

    useEffect(() => {
        checkUserAuthorization();
    }, [location.pathname]);

    return (
        <div>
            {isUserAuthorized ? <UserHeader /> : <Header />}
            <div className="min-h-96 px-24 py-14">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
