import React, { useState } from 'react'

const Testimonial = () => {
  // Sample testimonials data - can be replaced with API data
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      review: 'Amazing courses! The instructors are extremely knowledgeable and the content is well-structured. I have learned so much and already implemented the skills in my projects.',
      rating: 5,
      course: 'Advanced JavaScript'
    },
    {
      id: 2,
      name: 'Priya Singh',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      review: 'Outstanding platform! The React course helped me land my dream job. The practical projects and real-world examples made learning so much easier.',
      rating: 5,
      course: 'React Mastery'
    },
    {
      id: 3,
      name: 'Amit Patel',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      review: 'Great learning experience! The Node.js course was comprehensive and the instructor explained complex concepts in a simple way. Highly recommended!',
      rating: 4.5,
      course: 'Node.js Complete Guide'
    },
    {
      id: 4,
      name: 'Neha Sharma',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      review: 'Excellent full-stack course! I went from a beginner to building complete web applications. The support team was also very helpful throughout.',
      rating: 5,
      course: 'Full Stack Development'
    },
    {
      id: 5,
      name: 'Vikram Dasgupta',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      review: 'Very professional content and delivery. The Web Design course taught me everything I needed to start freelancing. Great value for money!',
      rating: 4.8,
      course: 'Web Design Fundamentals'
    },
    {
      id: 6,
      name: 'Anjali Verma',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      review: 'Fantastic database design course! Clear explanations, great examples, and the assignments really helped solidify my understanding. Worth every penny!',
      rating: 5,
      course: 'Database Design'
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Show 3 testimonials at a time on desktop, 1 on mobile
  const getVisibleTestimonials = () => {
    const visibleCount = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3
    const testimonialsList = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentSlide + i) % testimonials.length
      testimonialsList.push(testimonials[index])
    }
    return testimonialsList
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-400'}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full bg-gray-900 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          💬 Student Testimonials
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Hear from our happy students about their learning journey
        </p>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {getVisibleTestimonials().map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-800 rounded-lg shadow-lg p-5 sm:p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-700"
            >
              {/* Stars Rating */}
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-gray-300 mb-6 italic leading-relaxed h-20 sm:h-24 overflow-hidden">
                "{testimonial.review}"
              </p>

              {/* Student Info */}
              <div className="flex items-center gap-4">
                {/* Student Photo */}
                <div className="flex-shrink-0">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-indigo-500 object-cover"
                  />
                </div>

                {/* Student Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-white truncate">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-indigo-400 truncate">
                    {testimonial.course}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8 sm:mt-10 md:mt-12">
          <button
            onClick={prevSlide}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            ← Previous
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2 items-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-indigo-500 w-6'
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            Next →
          </button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-gray-400">
            Showing testimonials {currentSlide + 1} - {Math.min(currentSlide + 3, testimonials.length)} of {testimonials.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Testimonial