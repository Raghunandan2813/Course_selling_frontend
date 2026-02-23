import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    const adminToken = localStorage.getItem('adminToken')
    setIsLoggedIn(!!loggedIn)
    setIsAdminLoggedIn(!!adminToken)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    navigate('/')
  }

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    setIsAdminLoggedIn(false)
    navigate('/')
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white shadow-lg">
      {/* Logo on left */}
      <Link to="/" className="text-2xl font-bold text-white transition">
        CourseHub
      </Link>

      {/* Navigation items on right */}
      <div className="flex items-center gap-8">
        <Link
          to="/courses"
          className="hover:text-blue-400 transition font-medium"
        >
          Courses
        </Link>

        {isLoggedIn && (
          <>
            <Link
              to="/my-courses"
              className="hover:text-blue-400 transition font-medium"
            >
              My Courses
            </Link>
            <Link
              to="/history"
              className="hover:text-blue-400 transition font-medium"
            >
              History
            </Link>
          </>
        )}

        {/* Admin Section */}
        {isAdminLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="hover:text-blue-400 transition font-medium bg-blue-600 px-4 py-2 rounded-lg"
            >
              Dashboard
            </Link>
            <button
              onClick={handleAdminLogout}
              className="bg-black border border-white px-6 py-2 rounded-lg font-medium transition"
            >
              Admin Logout
            </button>
          </div>
        ) : (
          <Link
            to="/admin/login"
            className="bg-white text-black px-6 py-2 rounded-lg font-medium transition text-sm"
          >
            Admin Login
          </Link>
        )}

        {/* User Logout/Login Button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-white  text-black px-6 py-2 rounded-lg font-medium transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-white text-black px-6 py-2 rounded-lg font-medium transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar