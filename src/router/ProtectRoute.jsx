import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export const ProtectRoute = () => {
    const userAuthorized = useSelector((state) => state.user.userAuthorized);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!userAuthorized || !token) {
            navigate("/login");
        }
    }, [userAuthorized, location, navigate]);

    return userAuthorized ? <Outlet /> : null;
};
