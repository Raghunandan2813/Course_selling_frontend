import React from 'react'
import Navbar from '../component/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { courses } from '../assets/assets/courseData'

const MyCourses = () => {
  const navigate = useNavigate()

  // Get purchased courses from localStorage
  const uploadedCourses = JSON.parse(localStorage.getItem('uploadedCourses') || '[]')
  const allCourses = [...courses, ...uploadedCourses]

  const purchasedCourseIds = JSON.parse(localStorage.getItem('purchasedCourses') || '[]')
  const enrolledCourses = allCourses.filter(course => purchasedCourseIds.includes(course.id))

  // Add progress data to courses
  const enrolledCoursesWithProgress = enrolledCourses.map((course, index) => ({
    ...course,
    progress: Math.floor(Math.random() * 100), // Random progress for demo
    lessons: Math.floor(Math.random() * 10) + 5,
    completedLessons: Math.floor(Math.random() * 8)
  }))

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-2">My Courses</h1>
          <p className="text-gray-600 mb-12">Continue learning from your enrolled courses</p>

          {enrolledCoursesWithProgress.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-6">You haven't enrolled in any courses yet</p>
              <Link
                to="/courses"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCoursesWithProgress.map((course) => (
                <Link key={course.id} to={`/courses/${course.id}`}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-40 object-cover"
                    />

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-black mb-3">{course.title}</h3>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Course Info */}
                      <p className="text-sm text-gray-600 mb-4">
                        {course.completedLessons} of {course.lessons} lessons completed
                      </p>

                      {/* Continue Button */}
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold">
                        Continue Learning
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyCourses