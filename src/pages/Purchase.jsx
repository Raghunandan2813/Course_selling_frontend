import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { courses } from '../assets/assets/courseData'

const Purchase = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const uploadedCourses = JSON.parse(localStorage.getItem('uploadedCourses') || '[]')
  const allCourses = [...courses, ...uploadedCourses]
  const course = allCourses.find((c) => c.id === id)

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Course Not Found</h1>
          <Link
            to="/courses"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  const handleEnroll = () => {
    // Get existing purchased courses from localStorage
    const purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses') || '[]')

    // Add current course if not already purchased
    if (!purchasedCourses.includes(course.id)) {
      purchasedCourses.push(course.id)
      localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses))
    }

    alert(`Successfully enrolled in ${course.title}!`)
    // Redirect to my courses
    navigate('/my-courses')
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-black mb-8">Complete Your Purchase</h1>

        {/* Course Summary */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
          <img
            src={course.thumbnail}
            alt={course.title}
            loading="lazy"
            decoding="async"
            className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
          />

          <h2 className="text-2xl font-bold text-black mb-2">{course.title}</h2>
          <p className="text-gray-600 mb-4">by {course.instructor}</p>

          <div className="flex justify-between items-center mb-4 text-lg">
            <span className="text-gray-600">Course Price:</span>
            <span className="text-blue-600 font-bold">₹{course.price.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center mb-4 text-lg">
            <span className="text-gray-600">Duration:</span>
            <span className="text-black">{course.duration}</span>
          </div>

          <div className="flex justify-between items-center mb-4 text-lg">
            <span className="text-gray-600">Level:</span>
            <span className="text-black">{course.level}</span>
          </div>

          <hr className="border-gray-200 my-4" />

          <div className="flex justify-between items-center text-xl">
            <span className="text-black font-bold">Total Amount:</span>
            <span className="text-blue-600 font-bold text-2xl">₹{course.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-black mb-4">Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center p-3 border-2 border-blue-600 rounded-lg bg-white cursor-pointer hover:bg-blue-50">
              <input type="radio" name="payment" defaultChecked className="w-4 h-4 cursor-pointer" />
              <span className="text-black ml-3">Credit/Debit Card</span>
            </label>
            <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="w-4 h-4 cursor-pointer" />
              <span className="text-black ml-3">UPI</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/courses')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleEnroll}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
          >
            Proceed to Payment
          </button>
        </div>

        <p className="text-gray-600 text-sm text-center mt-4">
          By purchasing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default Purchase
