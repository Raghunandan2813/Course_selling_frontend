const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      review: 'Amazing courses! The instructors are knowledgeable and content is well-structured.'
    },
    {
      id: 2,
      name: 'Priya Singh',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      review: 'Outstanding platform! The React course was excellent and helped me land my dream job.'
    },
    {
      id: 3,
      name: 'Amit Patel',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      review: 'Great learning experience! Complex concepts explained in a simple way. Highly recommended!'
    },
  ]

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-black mb-12 text-center">Student Testimonials</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white border border-gray-200 shadow-md p-6 rounded-lg">
              <p className="text-gray-700 mb-6">"{testimonial.review}"</p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 rounded-full"
                />
                <h4 className="text-black font-bold">{testimonial.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonial