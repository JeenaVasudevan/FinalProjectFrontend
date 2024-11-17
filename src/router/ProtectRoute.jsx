import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// Reusable navigation handler function
const handleNavigation = (token, location, navigate, userRole, adminAuthorized, userAuthorized) => {
  if (!token) {
    if (location.pathname !== "/login") {
      navigate("/login", { state: { from: location }, replace: true });
    }
    return;
  }

  if (location.pathname.startsWith("/admin") && !adminAuthorized) {
    if (location.pathname !== "/admin/login") {
      navigate("/admin/login", { state: { from: location }, replace: true });
    }
    return;
  }

  if (location.pathname.startsWith("/user") && !userAuthorized) {
    if (location.pathname !== "/login") {
      navigate("/login", { state: { from: location }, replace: true });
    }
    return;
  }

  if (
    (userRole === "admin" && location.pathname.startsWith("/user")) ||
    (userRole === "user" && location.pathname.startsWith("/admin"))
  ) {
    navigate("/login", { state: { from: location }, replace: true });
    return;
  }

  if (location.pathname === "/login" && (adminAuthorized || userAuthorized)) {
    const redirectPath = userRole === "admin" ? "/admin/profile" : "/user/profile";
    if (location.pathname !== redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }
};

// ProtectRoute component
export const ProtectRoute = () => {
  const adminAuthorized = useSelector((state) => state.admin.adminAuthorized);
  const userAuthorized = useSelector((state) => state.user.userAuthorized);
  const userRole = useSelector((state) => state.user.role);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    handleNavigation(token, location, navigate, userRole, adminAuthorized, userAuthorized);
  }, [location.pathname, navigate, adminAuthorized, userAuthorized, userRole]); // Minimal dependencies

  return adminAuthorized || userAuthorized ? <Outlet /> : null;
};
