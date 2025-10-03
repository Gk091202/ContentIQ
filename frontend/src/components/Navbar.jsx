import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!token) return null;

  return (
    <nav className="glass-effect sticky top-0 z-40 mb-8 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="group flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <span className="relative text-3xl font-black gradient-text">
                  ✨ ContentIQ
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/dashboard"
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  location.pathname === "/dashboard"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 button-3d"
                }`}
              >
                🏠 Dashboard
              </Link>
              <Link
                to="/profile"
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  location.pathname === "/profile"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 button-3d"
                }`}
              >
                👤 Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 button-3d shadow-lg shadow-red-500/50"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
