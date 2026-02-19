import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import { courses } from "../assets/courseData"

function ListCourses() {
  const [selectedLevel, setSelectedLevel] = useState('All')
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
  
  const filteredCourses = selectedLevel === 'All' 
    ? courses 
    : courses.filter(course => course.level.includes(selectedLevel))

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar/>
      
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-12 text-center">Explore Our Courses</h1>
          
          {/* Filter Buttons */}
          <div className="flex gap-3 justify-center mb-12">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  selectedLevel === level
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Course'}
                />

                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                  
                  <div className="text-sm text-gray-400 mb-3">
                    <p>⏱️ {course.duration}</p>
                    <p>Level: {course.level}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-indigo-400">
                      ₹{course.price.toLocaleString()}
                    </span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
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
              <p className="text-gray-400 text-lg">No courses found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListCourses

