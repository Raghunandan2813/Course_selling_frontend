import React from 'react'
import { Link } from 'react-router-dom'

const Course = () => {
  // Sample courses data - can be replaced with API data
  const courses = [
    {
      id: 1,
      title: 'Advanced JavaScript',
      instructor: 'John Smith',
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-1579468118864-1c238e08b866?w=500&h=300&fit=crop',
      rating: 4.8,
      students: 2450
    },
    {
      id: 2,
      title: 'React Mastery',
      instructor: 'Sarah Johnson',
      price: '$59.99',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      rating: 4.9,
      students: 3200
    },
    {
      id: 3,
      title: 'Node.js Complete Guide',
      instructor: 'Mike Davis',
      price: '$54.99',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      rating: 4.7,
      students: 2100
    },
    {
      id: 4,
      title: 'Full Stack Development',
      instructor: 'Emily Chen',
      price: '$79.99',
      image: 'https://images.unsplash.com/photo-1517694712646-fac72367e6af?w=500&h=300&fit=crop',
      rating: 4.9,
      students: 4500
    },
    {
      id: 5,
      title: 'Web Design Fundamentals',
      instructor: 'Alex Wilson',
      price: '$39.99',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      rating: 4.6,
      students: 1800
    },
    {
      id: 6,
      title: 'Database Design',
      instructor: 'Chris Martinez',
      price: '$64.99',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70504f8b?w=500&h=300&fit=crop',
      rating: 4.8,
      students: 1950
    },
    {
      id: 7,
      title: 'Python for Data Science',
      instructor: 'Lisa Anderson',
      price: '$69.99',
      image: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8b7af?w=500&h=300&fit=crop',
      rating: 4.9,
      students: 3700
    },
    {
      id: 8,
      title: 'AWS Cloud Computing',
      instructor: 'David Brown',
      price: '$74.99',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
      rating: 4.7,
      students: 2600
    },
  ]

  return (
    <div className="w-full bg-gray-900 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          📚 Our Popular Courses
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Choose from hundreds of high-quality courses taught by industry experts
        </p>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer group"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden h-40 sm:h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
              </div>

              {/* Course Info */}
              <div className="p-4 sm:p-5 md:p-6">
                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition">
                  {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-xs sm:text-sm text-gray-400 mb-3">
                  by <span className="font-semibold text-gray-300">{course.instructor}</span>
                </p>

                {/* Rating and Students */}
                <div className="flex items-center justify-between mb-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-300">{course.rating}</span>
                  </div>
                  <span className="text-gray-400">({course.students.toLocaleString()})</span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xl sm:text-2xl font-bold text-indigo-400">
                    {course.price}
                  </span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Courses Button */}
      <div className="flex justify-center mt-10 sm:mt-12 md:mt-16">
        <Link
          to="/courses"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          View All Courses
        </Link>
      </div>
    </div>
  )
}

export default Course