import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaBars, FaTimes, FaClipboardList } from 'react-icons/fa';
import { DarkMode } from "../shared/DarkMode";  // Assuming you have a DarkMode component
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

export const UserHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount or when localStorage changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null);
  }, [localStorage.getItem('token')]);  // Add `localStorage.getItem('token')` to trigger re-render

  // Handle logout
 const handleLogout=async()=>{
  try{
    await axiosInstance.post("/user/logout")
    localStorage.removeItem("token")
    navigate("/login")
    toast.success("Logged out successfully")
  }
  catch(error){
    console.error("Logout error:", error);
    toast.error("Failed to log out. Please try again.");
  }
 }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-lg relative">
      <Link to="/" className="text-2xl font-bold text-yellow-400">Zestora</Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 items-center">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/menu" className="hover:text-yellow-400">Menu</Link>
        <Link to="/restaurants" className="hover:text-yellow-400">Restaurants</Link>
        <Link to="/about" className="hover:text-yellow-400">About</Link>
      </nav>

      {/* Mobile Menu Icon */}
      <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white py-4 space-y-4 px-6 z-10">
          <Link to="/" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Home</Link>
          <Link to="/menu" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Menu</Link>
          <Link to="/restaurants" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Restaurants</Link>
          <Link to="/about" onClick={toggleMobileMenu} className="block hover:text-yellow-400">About</Link>

          {isLoggedIn ? (
            <>
              <Link to="/user/orders" onClick={toggleMobileMenu} className="block hover:text-yellow-400 flex items-center">
                <FaClipboardList className="mr-2" /> My Orders
              </Link>
              <Link to="/user/profile" onClick={toggleMobileMenu} className="block hover:text-yellow-400 flex items-center">
                <FaUser /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 font-semibold flex items-center"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMobileMenu}
                className="block bg-yellow-500 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200 font-semibold"
              >
                Login
              </Link>
              <Link to="/signup" onClick={toggleMobileMenu} className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-semibold">
                Signup
              </Link>
            </>
          )}
        </div>
      )}

      {/* Desktop Links based on login status */}
      <div className="hidden md:flex items-center space-x-4">
        <DarkMode /> {/* Dark Mode toggle */}
        {isLoggedIn ? (
          <>
            <Link to="/user/cart" className="hover:text-yellow-400 flex items-center">
              <FaShoppingCart />
            </Link>
            <Link to="/user/profile" className="hover:text-yellow-400 flex items-center">
              <FaUser />
            </Link>
            <Link to="/user/orders" className="hover:text-yellow-400 flex items-center">
              <FaClipboardList className="mr-2" /> My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 font-semibold flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200 font-semibold">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-semibold">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
