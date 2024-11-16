import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export const ProtectRoute = () => {
  const adminAuthorized = useSelector((state) => state.admin.adminAuthorized);
  const userAuthorized = useSelector((state) => state.user.userAuthorized);
  const userRole = useSelector((state) => state.user.role); // Get the user role from Redux
  
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirectedRef = useRef(false); // Use a ref to track redirection

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (hasRedirectedRef.current) return; // Prevent further processing if already redirected

    if (!token) {
      hasRedirectedRef.current = true; // Set the ref to true
      navigate("/login", { state: { from: location } });
      return;
    }

    if (location.pathname.startsWith("/admin") && !adminAuthorized) {
      hasRedirectedRef.current = true;
      navigate("/admin/login", { state: { from: location } });
      return;
    }

    if (location.pathname.startsWith("/user") && !userAuthorized) {
      hasRedirectedRef.current = true;
      navigate("/login", { state: { from: location } });
      return;
    }

    if (
      (userRole === "admin" && location.pathname.startsWith("/user")) ||
      (userRole === "user" && location.pathname.startsWith("/admin"))
    ) {
      hasRedirectedRef.current = true;
      navigate("/login", { state: { from: location } });
      return;
    }

    if (location.pathname === "/login" && (userAuthorized || adminAuthorized)) {
      hasRedirectedRef.current = true;
      if (userRole === "admin") {
        navigate("/admin/profile");
      } else if (userRole === "user") {
        navigate("/user/profile");
      }
    }
  }, [adminAuthorized, userAuthorized, userRole, location, navigate]);

  return (userAuthorized || adminAuthorized) ? <Outlet /> : null;
};