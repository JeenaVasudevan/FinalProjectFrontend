import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export const ProtectRoute = () => {
  const [isRedirecting, setIsRedirecting] = useState(false); // New state to prevent redundant redirects
  const adminAuthorized = useSelector((state) => state.admin.adminAuthorized);
  const userAuthorized = useSelector((state) => state.user.userAuthorized);
  const userRole = useSelector((state) => state.user.role); // Get the user role from Redux
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !isRedirecting) {
      setIsRedirecting(true);
      navigate("/login", { state: { from: location } });
      return;
    }

    if (location.pathname.startsWith("/admin") && !adminAuthorized && !isRedirecting) {
      setIsRedirecting(true);
      navigate("/admin/login", { state: { from: location } });
      return;
    }

    if (location.pathname.startsWith("/user") && !userAuthorized && !isRedirecting) {
      setIsRedirecting(true);
      navigate("/login", { state: { from: location } });
      return;
    }

    if (
      (userRole === "admin" && location.pathname.startsWith("/user")) ||
      (userRole === "user" && location.pathname.startsWith("/admin")) && !isRedirecting
    ) {
      setIsRedirecting(true);
      navigate("/login", { state: { from: location } });
      return;
    }

    if (location.pathname === "/login" && (userAuthorized || adminAuthorized) && !isRedirecting) {
      setIsRedirecting(true);
      if (userRole === "admin") {
        navigate("/admin/profile");
      } else if (userRole === "user") {
        navigate("/user/profile");
      }
    }
  }, [adminAuthorized, userAuthorized, userRole, location, navigate, isRedirecting]);

  return (userAuthorized || adminAuthorized) ? <Outlet /> : null;
};
