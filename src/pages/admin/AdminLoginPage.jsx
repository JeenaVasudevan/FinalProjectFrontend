import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

// Utility function for redirecting if already logged in
const redirectIfLoggedIn = (navigate, location, adminRoutes) => {
  const token = localStorage.getItem("token");
  if (token && location.pathname !== adminRoutes.profile_route) {
    navigate(adminRoutes.profile_route, { replace: true });
  }
};

export const AdminLoginPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const adminRoutes = {
    login_api: "/admin/login",
    profile_route: "/admin/profile",
    signup_route: "/admin/signup",
  };

  // Redirect if already logged in
  useEffect(() => {
    redirectIfLoggedIn(navigate, location, adminRoutes);
  }, [navigate, location.pathname, adminRoutes]);

  // Submit login form
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(adminRoutes.login_api, data);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        const redirectUrl = response.data.redirectUrl || adminRoutes.profile_route;
        navigate(redirectUrl, { replace: true });
      } else {
        throw new Error("Invalid login response: Missing token");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-700 focus:border-gray-700"
            />
          </div>
          <div className="text-sm text-right">
            <Link to={adminRoutes.signup_route} className="text-gray-700 hover:underline">
              New Admin? Sign up
            </Link>
          </div>
          <div className="form-group mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
