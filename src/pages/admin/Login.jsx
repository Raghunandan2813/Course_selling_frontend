import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email'
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be 6+ characters'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      // Check if it's the demo account
      if (formData.email === 'admin@coursehub.com' && formData.password === 'admin123') {
        localStorage.setItem('adminToken', 'true')
        localStorage.setItem('adminEmail', formData.email)
        localStorage.setItem('adminName', 'Admin User')
        alert('Admin login successful!')
        navigate('/admin/dashboard')
      } else {
        // Check admin accounts created via signup
        const adminAccounts = JSON.parse(localStorage.getItem('adminAccounts') || '[]')
        const account = adminAccounts.find(acc => acc.email === formData.email && acc.password === formData.password)

        if (account) {
          localStorage.setItem('adminToken', 'true')
          localStorage.setItem('adminEmail', formData.email)
          localStorage.setItem('adminName', account.name)
          alert('Admin login successful!')
          navigate('/admin/dashboard')
        } else {
          setErrors({ general: 'Invalid admin credentials' })
        }
      }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Login to manage courses</p>
        </div>

        {errors.general && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p className="font-bold">Error</p>
            <p>{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Admin Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            New admin?{' '}
            <Link to="/admin/signup" className="text-blue-600 hover:text-blue-700 font-bold">
              Create Account
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Demo Credentials:</strong><br />
            Email: admin@coursehub.com<br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
