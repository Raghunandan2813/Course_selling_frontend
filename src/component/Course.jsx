import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { courses as allCourses } from '../assets/assets/courseData'


const Course = () => {
  const navigate = useNavigate()
  const [displayCourses, setDisplayCourses] = useState([])

  useEffect(() => {
    // Get uploaded courses from localStorage
    const uploadedCourses = JSON.parse(localStorage.getItem('uploadedCourses') || '[]')
    // Combine and get first 4 courses
    const combined = [...allCourses, ...uploadedCourses]
    setDisplayCourses(combined.slice(0, 4))
  }, [])

  const handleEnroll = (e, courseId) => {
    e.preventDefault()
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if (!isLoggedIn) {
      navigate('/login')
    } else {
      navigate(`/purchase/${courseId}`)
    }
  }

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-black mb-12 text-center">Our Popular Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {displayCourses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`}>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-black mb-3">{course.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">₹{course.price}</span>
                    <button
                      onClick={(e) => handleEnroll(e, course.id)}
                      className="bg-blue-600 font-bold text-white px-4 py-2 rounded"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/courses"
            className="bg-black text-white px-8 py-3 rounded-lg font-bold"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Course