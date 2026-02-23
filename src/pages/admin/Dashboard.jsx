import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { courses } from '../../assets/assets/courseData'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadedCourses, setUploadedCourses] = useState([])

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      navigate('/admin/login')
    }

    // Load uploaded courses from localStorage
    const saved = JSON.parse(localStorage.getItem('uploadedCourses') || '[]')
    setUploadedCourses(saved)
  }, [navigate])

  const handleNewCourse = (courseData) => {
    const newCourse = {
      id: `custom-${Date.now()}`,
      ...courseData,
      students: 0
    }
    const updated = [...uploadedCourses, newCourse]
    setUploadedCourses(updated)
    localStorage.setItem('uploadedCourses', JSON.stringify(updated))
    setShowUploadForm(false)
    alert('Course uploaded successfully!')
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    navigate('/admin/login')
  }

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updated = uploadedCourses.filter(course => course.id !== courseId)
      setUploadedCourses(updated)
      localStorage.setItem('uploadedCourses', JSON.stringify(updated))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 text-black px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-bold"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg">
            <p className="text-gray-600 mb-2">Total Courses</p>
            <p className="text-4xl font-bold text-blue-600">{courses.length + uploadedCourses.length}</p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg">
            <p className="text-gray-600 mb-2">Uploaded by Admin</p>
            <p className="text-4xl font-bold text-blue-600">{uploadedCourses.length}</p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg">
            <p className="text-gray-600 mb-2">Active Users</p>
            <p className="text-4xl font-bold text-blue-600">1,245</p>
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold mb-8"
        >
          {showUploadForm ? '✕ Close Form' : '+ Upload New Course'}
        </button>

        {/* Upload Form */}
        {showUploadForm && (
          <CourseUploadForm onSubmit={handleNewCourse} onCancel={() => setShowUploadForm(false)} />
        )}

        {/* Courses Table */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-black">Manage Courses</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 text-black border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Course Title</th>
                  <th className="px-6 py-3 text-left">Instructor</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Students</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {uploadedCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-black">{course.title}</td>
                    <td className="px-6 py-4 text-gray-600">{course.instructor}</td>
                    <td className="px-6 py-4 text-gray-600">₹{course.price}</td>
                    <td className="px-6 py-4 text-gray-600">{course.students || 0}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {uploadedCourses.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-400">
              <p>No courses uploaded yet. Click "Upload New Course" to add one.</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/" className="bg-white border border-gray-200 shadow-sm hover:bg-gray-50 p-6 rounded-lg text-black transition">
            <h3 className="text-lg font-bold mb-2">← Back to Home</h3>
            <p className="text-gray-500">View the public website</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Course Upload Form Component
const CourseUploadForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    price: '',
    duration: '',
    level: 'Beginner',
    description: '',
    videoUrl: '',
    thumbnail: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.instructor || !formData.price) {
      alert('Please fill in all required fields')
      return
    }
    onSubmit(formData)
    setFormData({
      title: '',
      instructor: '',
      price: '',
      duration: '',
      level: 'Beginner',
      description: '',
      videoUrl: '',
      thumbnail: ''
    })
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-black mb-6">Add New Course</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="title"
          placeholder="Course Title *"
          value={formData.title}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-white text-black placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          required
        />

        <input
          type="text"
          name="instructor"
          placeholder="Instructor Name *"
          value={formData.instructor}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-white text-black placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (₹) *"
          value={formData.price}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-white text-black placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          required
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 8 weeks)"
          value={formData.duration}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-white text-black placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />

        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          type="url"
          name="thumbnail"
          placeholder="Thumbnail Image URL"
          value={formData.thumbnail}
          onChange={handleChange}
          className="px-4 py-2 rounded bg-white text-black placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="md:col-span-2 px-4 py-2 rounded bg-white text-black placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />

        <input
          type="url"
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          className="md:col-span-2 px-4 py-2 rounded bg-white text-black placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />

        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold"
          >
            Upload Course
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-lg font-bold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminDashboard
