import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Header } from "../components/admin/Header";
import { Footer } from "../components/admin/Footer";
import { axiosInstance } from "../config/axiosInstance";
import { clearAdmin, saveAdmin } from "../redux/features/adminSlice";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminAuthorized } = useSelector((state) => state.admin);

  const checkAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axiosInstance.get("/admin/check-admin");
      dispatch(saveAdmin(response?.data?.data));
    } catch (error) {
      console.error(error?.response?.data, "===error");
      dispatch(clearAdmin());
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    checkAdmin(); 
  }, []);

  return (
    <div className="">
      {adminAuthorized ? <AdminHeader /> : <Header /> }
      
      <div className="min-h-96 px-24 py-14">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
};