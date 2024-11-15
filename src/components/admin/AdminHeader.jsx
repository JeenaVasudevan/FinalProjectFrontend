import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaTimes, FaEdit } from 'react-icons/fa';
import { DarkMode } from "../shared/DarkMode";  // Assuming you have a DarkMode component
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';  // Assuming axiosInstance is configured properly

export const AdminHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false); // State for manage dropdown
  const [isLoggedOut, setIsLoggedOut] = useState(false); // Track logout status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (if token exists)
    if (!localStorage.getItem("token") && !isLoggedOut) {
      setIsLoggedOut(true); // Set logged out status when no token is found
    }
  }, [isLoggedOut]);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Make API request to logout on the server
      const response = await axiosInstance.post("/admin/logout", {}, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // Attach token in request header
        }
      });

      // Check if the response is successful
      if (response.status === 200) {
        // Remove token from localStorage
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");

        // Set logged out status to true
        setIsLoggedOut(true);

        // Redirect to the login page
        navigate("/login");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please check your network.");
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle manage dropdown
  const toggleManageDropdown = () => {
    setIsManageDropdownOpen(!isManageDropdownOpen);
  };

  // Render the header based on logout status
  if (isLoggedOut) {
    return <Header />; // Replace AdminHeader with Header component after logout
  }

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-lg relative">
      <Link to="/admin" className="text-2xl font-bold text-yellow-400">Zestora Admin</Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 items-center">
        <Link to="/admin/restaurants" className="hover:text-yellow-400">Restaurants</Link>
        <Link to="/admin/menu" className="hover:text-yellow-400">Menu</Link>
      </nav>

      {/* Mobile Menu Icon */}
      <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white py-4 space-y-4 px-6 z-10">
          <Link to="/admin/restaurants" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Restaurants</Link>
          <Link to="/admin/menu" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Menu</Link>

          <button
            onClick={handleLogout}
            className="block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 font-semibold flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-4">
        <DarkMode /> {/* Dark Mode toggle */}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 font-semibold flex items-center"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </header>
  );
};
