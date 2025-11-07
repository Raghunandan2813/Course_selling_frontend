import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    // Navbar.jsx


function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">CourseHub</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

  )
}

export default Navbar