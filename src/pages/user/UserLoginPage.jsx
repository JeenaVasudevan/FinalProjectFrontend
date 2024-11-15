import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import { saveUser } from "../../redux/features/userSlice.js";

export const UserLoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRoutes = {
    login_api: "/user/login",
    profile_route: "/user/profile",
    signup_route: "/signup",
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(userRoutes.login_api, data);

      if (response.status === 200 && response.data.token && response.data.user) {
        localStorage.setItem("token", response.data.token);
        toast.success("User login successful!");

        dispatch(saveUser(response.data.user));
        navigate(userRoutes.profile_route);
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("User login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">User Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
            <Link to={userRoutes.signup_route} className="text-blue-600 hover:underline">New User? Sign up</Link>
          </div>
          <div className="form-group mt-6">
            <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
