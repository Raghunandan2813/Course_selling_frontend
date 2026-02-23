import { useState } from 'react'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Courses from './pages/Courses.jsx'
import SingleCourse from './pages/SingleCourse.jsx'
import MyCourses from './pages/MyCourses.jsx'
import Purchase from './pages/Purchase.jsx'
import AdminLogin from './pages/admin/Login.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import AdminSignUp from './pages/admin/SignUp.jsx'
import History from './pages/History.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>

        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<SingleCourse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/purchase/:id" element={<Purchase />} />
          <Route path="/history" element={<History />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );

}



export default App
