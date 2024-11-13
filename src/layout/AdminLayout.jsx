/*import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Header } from "../components/admin/Header";
import { Footer } from "../components/admin/Footer";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminAuthorized } = useSelector((state) => state.admin); // Access the admin state from the Redux store

  const checkAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axiosInstance.get("/admin/check-admin"); // Admin authentication check endpoint
      dispatch(saveAdmin(response?.data?.data)); // Save admin data to Redux store
    } catch (error) {
      console.error(error?.response?.data, "===error");
      dispatch(clearAdmin()); // Clear admin data if an error occurs (e.g., invalid token)
      navigate("/admin/login"); // Redirect to admin login page
    }
  };

  useEffect(() => {
    checkAdmin(); 
  }, []);

  return (
    <div className="">
      {adminAuthorized ? <AdminHeader /> : <Header />} 
      
      <div className="min-h-96 px-24 py-14">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
};
*/