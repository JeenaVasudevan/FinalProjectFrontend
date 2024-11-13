/*import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { saveUser } from "../../redux/features/userSlice.js";

export const AdminLogin = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const admin = {
        role: "admin",
        login_api: "/admin/login",
        profile_route: "/admin/profile",
        signup_route: "/admin/signup",
    };

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post(admin.login_api, data);

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                toast.success("Login successful!");

                dispatch(saveUser(response.data.user)); // Set user as authorized

                navigate(admin.profile_route);
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
                    Admin Login
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
                        <Link to={admin.signup_route} className="text-blue-600 hover:underline">
                            New Admin? Sign up
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
*/