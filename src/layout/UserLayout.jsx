import React, { useEffect } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet,useNavigate } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const UserLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userAuthorized } = useSelector((state) => state.user);

    const checkUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");

            const response = await axiosInstance.get("/user/check-user");
            dispatch(saveUser(response?.data?.data));
        } catch (error) {
            console.error(error?.response?.data, "===error");
            dispatch(clearUser());
            navigate("/login");
        }
    };
    return (
        <div className="">
            {userAuthorized ? <UserHeader /> : <Header />}

            <div className="min-h-96 px-24 py-14">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
