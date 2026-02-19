import React from 'react'
import { Link } from 'react-router-dom'

const Course = () => {
  const courses = [
    {
      id: 1,
      title: 'Advanced JavaScript',
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-1579468118864-1c238e08b866?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'React Mastery',
      price: '$59.99',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Node.js Complete Guide',
      price: '$54.99',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Full Stack Development',
      price: '$79.99',
      image: 'https://images.unsplash.com/photo-1517694712646-fac72367e6af?w=500&h=300&fit=crop'
    }
  ]

  return (
    <div className="bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Popular Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-3">{course.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-indigo-400">{course.price}</span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/courses"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Course