import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import { courses } from "../assets/courseData"

function ListCourses() {
  const [selectedLevel, setSelectedLevel] = useState('All')
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced']
  
  const filteredCourses = selectedLevel === 'All' 
    ? courses 
    : courses.filter(course => course.level.includes(selectedLevel))

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar/>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Explore Our Courses
          </h1>
          <p className="text-gray-400 text-lg">Learn from industry experts</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-900 py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Filter Buttons */}
          <div className="mb-10 text-center">
            <div className="flex gap-3 flex-wrap justify-center">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all ${
                    selectedLevel === level
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-40 sm:h-48">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Course'}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-400 transition">
                    {course.title}
                  </h3>

                  {/* Rating and Students */}
                  <div className="flex items-center justify-between mb-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-300">{course.rating}</span>
                    </div>
                    <span className="text-gray-400">({course.students.toLocaleString()})</span>
                  </div>

                  {/* Duration */}
                  <p className="text-xs text-gray-400 mb-4">⏱️ {course.duration}</p>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-indigo-400">
                      ₹{course.price.toLocaleString()}
                    </span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Courses Message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No courses found for the selected level.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListCourses

