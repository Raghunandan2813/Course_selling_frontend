import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const AdminSignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email'
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be 6+ characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      // Save admin account to localStorage
      const adminAccounts = JSON.parse(localStorage.getItem('adminAccounts') || '[]')

      // Check if email already exists
      if (adminAccounts.find(acc => acc.email === formData.email)) {
        setErrors({ general: 'This email is already registered' })
        return
      }

      // Add new admin account
      adminAccounts.push({
        name: formData.name,
        email: formData.email,
        password: formData.password // In real app, hash this!
      })
      localStorage.setItem('adminAccounts', JSON.stringify(adminAccounts))

      // Auto-login the admin
      localStorage.setItem('adminToken', 'true')
      localStorage.setItem('adminEmail', formData.email)
      localStorage.setItem('adminName', formData.name)

      alert('Account created successfully! Welcome to Admin Dashboard')
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>

      <div className={`w-full max-w-md bg-white rounded-xl shadow-2xl p-8 ${submitted && Object.keys(errors).length > 0 ? 'shake-animation' : 'slide-in'}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Sign Up</h1>
          <p className="text-gray-600">Create your admin account</p>
        </div>

        {errors.general && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p className="font-bold">Error</p>
            <p>{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.name ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
            />
            {errors.name && <p className="mt-2 text-sm text-red-600 font-medium">⚠ {errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@coursehub.com"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.email ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600 font-medium">⚠ {errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.password ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600 font-medium">⚠ {errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.confirmPassword ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
            />
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600 font-medium">⚠ {errors.confirmPassword}</p>}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Create Admin Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/admin/login" className="text-blue-600 hover:text-blue-700 font-bold">
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminSignUp