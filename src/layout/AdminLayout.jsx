import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Header } from "../components/admin/Header";
import { Footer } from "../components/admin/Footer";
import { axiosInstance } from "../config/axiosInstance";
import { clearAdmin, saveAdmin } from "../redux/features/adminSlice";

// Utility function for checking admin authorization
const checkAdminAuthorization = async (dispatch, navigate) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axiosInstance.get("/admin/check-admin");
    dispatch(saveAdmin(response?.data?.data));
  } catch (error) {
    dispatch(clearAdmin());
    if (location.pathname !== "/admin/login") {
      navigate("/admin/login", { replace: true });
    }
  }
};

// AdminLayout component
export const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminAuthorized } = useSelector((state) => state.admin);

  //useEffect(() => {
    checkAdminAuthorization(dispatch, navigate);
  //}, [dispatch, navigate]); // Minimal dependencies

  return (
    <div>
      {adminAuthorized ? <AdminHeader /> : <Header />}
      <div className="min-h-96 px-24 py-14">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
