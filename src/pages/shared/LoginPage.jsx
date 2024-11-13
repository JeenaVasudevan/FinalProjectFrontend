import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { saveUser } from "../../redux/features/userSlice.js";


export const LoginPage = ({ role = "user" }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = {
        role: "user",
        login_api: "/user/login",
        profile_route: "/user/profile",
        signup_route: "/signup",
    };

    if (role === "admin") {
        user.role = "admin";
        user.login_api = "/admin/login";
        user.profile_route = "/admin/profile";
        user.signup_route = "/admin/signup";
    }

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post(user.login_api, data);

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                toast.success("Login successful!");

                dispatch(saveUser(response.data.user)); // Set user as authorized

                navigate(user.profile_route);
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    {role === "admin" ? "Admin" : "User"} Login
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            required
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            required
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="text-sm text-right">
                        <Link to={user.signup_route} className="text-blue-600 hover:underline">
                            New {role === "admin" ? "Admin" : "User"}? Sign up
                            {role !== "admin" && (
    <div className="text-sm text-center mt-4">
        <Link to="/admin/login" className="text-blue-600 hover:underline">
            Admin Login
        </Link>
    </div>
)}
                        </Link>
                    </div>
                    <div className="form-group mt-6">
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
