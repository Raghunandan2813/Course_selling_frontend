import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop')`,
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Potential</span> with Quality Courses
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
            Join thousands of students learning from industry experts. Gain practical skills and advance your career with our comprehensive course library.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              to="/courses"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Explore Courses
            </Link>
            
            <Link
              to="/signup"
              className="bg-white hover:bg-gray-100 text-indigo-600 px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Start Learning
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-indigo-400">1000+</p>
              <p className="text-gray-300 text-sm sm:text-base mt-2">Active Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-indigo-400">100+</p>
              <p className="text-gray-300 text-sm sm:text-base mt-2">Expert Courses</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-indigo-400">50+</p>
              <p className="text-gray-300 text-sm sm:text-base mt-2">Expert Instructors</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg
              className="w-6 sm:w-8 h-6 sm:h-8 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header