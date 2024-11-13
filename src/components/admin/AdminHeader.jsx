/*import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaClipboardList, FaHome, FaList } from 'react-icons/fa';
import { DarkMode } from "../shared/DarkMode"; // Assuming you have a DarkMode component

export const AdminHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount or when localStorage changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null);
  }, [localStorage.getItem('token')]);  // Add `localStorage.getItem('token')` to trigger re-render

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // Set logged in state to false on logout
    navigate('/admin/login');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-lg relative">
      <Link to="/admin" className="text-2xl font-bold text-yellow-400">Zestora Admin</Link>
      <nav className="hidden md:flex space-x-8 items-center">
        <Link to="/admin/dashboard" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/admin/orders" className="hover:text-yellow-400">Orders</Link>
        <Link to="/admin/restaurants" className="hover:text-yellow-400">Restaurants</Link>
        <Link to="/admin/menu" className="hover:text-yellow-400">Menu</Link>
      </nav>

      <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white py-4 space-y-4 px-6 z-10">
          <Link to="/admin/dashboard" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Dashboard</Link>
          <Link to="/admin/orders" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Orders</Link>
          <Link to="/admin/restaurants" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Restaurants</Link>
          <Link to="/admin/menu" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Menu</Link>

          {isLoggedIn ? (
            <>
              <Link to="/admin/profile" onClick={toggleMobileMenu} className="block hover:text-yellow-400 flex items-center">
                <FaUser className="mr-2" /> Profile
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
                to="/admin/login"
                onClick={toggleMobileMenu}
                className="block bg-yellow-500 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200 font-semibold"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
      <div className="hidden md:flex items-center space-x-4">
        <DarkMode /> 
        {isLoggedIn ? (
          <>
            <Link to="/admin/orders" className="hover:text-yellow-400 flex items-center">
              <FaClipboardList />
            </Link>
            <Link to="/admin/profile" className="hover:text-yellow-400 flex items-center">
              <FaUser />
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
            <Link to="/admin/login" className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200 font-semibold">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
*/