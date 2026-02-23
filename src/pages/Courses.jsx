import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'
import { courses } from "../assets/assets/courseData"

function ListCourses() {
  const navigate = useNavigate()
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [allCourses, setAllCourses] = useState([])
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  useEffect(() => {
    // Get uploaded courses from localStorage
    const uploadedCourses = JSON.parse(localStorage.getItem('uploadedCourses') || '[]')
    // Combine static courses with uploaded courses
    setAllCourses([...courses, ...uploadedCourses])
  }, [])

  const filteredCourses = selectedLevel === 'All'
    ? allCourses
    : allCourses.filter(course => course.level === selectedLevel || course.level?.includes(selectedLevel))

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
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-12 text-center">Explore Our Courses</h1>

          {/* Filter Buttons */}
          <div className="flex gap-3 justify-center mb-12">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-2 rounded-lg font-semibold ${selectedLevel === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-black border border-gray-300 hover:bg-blue-50'
                  }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-40 object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Course'}
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-black mb-2">{course.title}</h3>

                    <div className="text-sm text-gray-600 mb-3">
                      <p>⏱️ {course.duration}</p>
                      <p>Level: {course.level}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => handleEnroll(e, course.id)}
                        className="bg-blue-600 hover:bg-blue-700 font-bold text-white px-4 py-2 rounded"
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Courses Message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No courses found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListCourses

