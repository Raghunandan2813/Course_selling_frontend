import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-lg">
      {/* Logo on left */}
      <Link to="/" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition">
        CourseHub
      </Link>

      {/* Navigation items on right */}
      <div className="flex items-center gap-8">
        <Link 
          to="/courses" 
          className="hover:text-indigo-400 transition font-medium"
        >
          Courses
        </Link>
        
        <Link 
          to="/my-courses" 
          className="hover:text-indigo-400 transition font-medium"
        >
          My Courses
        </Link>

        {/* Login Button */}
        <Link 
          to="/login" 
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar