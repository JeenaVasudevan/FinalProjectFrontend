import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { DarkMode } from "../shared/DarkMode";  // Assuming you have a DarkMode component

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLoginDropdown = () => {
    setIsLoginDropdownOpen(!isLoginDropdownOpen);
  };

  // Handle logout and clear the token from localStorage
  const handleLogout = () => {
    localStorage.removeItem('token'); // Adjust the key name if necessary
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLoginRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/login');
    }
    setIsLoginDropdownOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <Link to="/" className="text-2xl font-bold text-yellow-400">Zestora</Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 items-center">
        <Link to="/" className="hover:text-yellow-400 flex items-center">
          <FaHome className="mr-2" /> Home
        </Link>
        <Link to="/menu" className="hover:text-yellow-400">Menu</Link>
        <Link to="/restaurants" className="hover:text-yellow-400">Restaurants</Link>
        <Link to="/about" className="hover:text-yellow-400">About</Link>
      </nav>

      {/* Mobile Menu Icon (Hamburger) */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white py-4 space-y-4 px-6 z-10">
          <Link to="/" onClick={toggleMobileMenu} className="block hover:text-yellow-400">
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/menu" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Menu</Link>
          <Link to="/restaurants" onClick={toggleMobileMenu} className="block hover:text-yellow-400">Restaurants</Link>
          <Link to="/about" onClick={toggleMobileMenu} className="block hover:text-yellow-400">About</Link>

          {!isLoggedIn ? (
            <>
              <button
                onClick={toggleLoginDropdown}
                className="block bg-yellow-500 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200 font-semibold"
              >
                Login
              </button>
              {isLoginDropdownOpen && (
                <div className="absolute bg-white shadow-md mt-2 rounded-lg py-2 w-40 right-6">
                  <button
                    onClick={() => handleLoginRedirect('user')}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    User Login
                  </button>
                  <button
                    onClick={() => handleLoginRedirect('admin')}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Admin Login
                  </button>
                </div>
              )}
              <Link
                to="/signup"
                onClick={toggleMobileMenu}
                className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-semibold"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 font-semibold flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          )}
        </div>
      )}

      {/* Desktop Login/Signup or Profile */}
      <div className="hidden md:flex items-center space-x-4">
        <DarkMode /> {/* Dark Mode toggle */}
        {!isLoggedIn ? (
          <>
            <button
              onClick={toggleLoginDropdown}
              className="bg-yellow-500 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200 font-semibold"
            >
              Login
            </button>
            {isLoginDropdownOpen && (
              <div className="absolute bg-white shadow-md mt-2 rounded-lg py-2 w-40 right-8">
                <button
                  onClick={() => handleLoginRedirect('user')}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  User Login
                </button>
                <button
                  onClick={() => handleLoginRedirect('admin')}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Admin Login
                </button>
              </div>
            )}
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-semibold"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="hover:text-yellow-400 flex items-center">
              <FaUser />
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 font-semibold flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};
