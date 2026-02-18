import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    
    const newErrors = validateForm()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData)
      // Handle login logic here
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      {/* Add animation styles */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      <div className={`w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 ${submitted && Object.keys(errors).length > 0 ? 'shake-animation' : ''}`}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email
                  ? 'border-red-500 bg-red-50 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 font-medium animate-pulse">
                ⚠ {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password
                  ? 'border-red-500 bg-red-50 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 font-medium animate-pulse">
                ⚠ {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Login
          </button>

        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-bold transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login