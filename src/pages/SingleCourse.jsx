import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import VideoPlayer from '../component/VideoPlayer'
import { courses } from '../assets/assets/courseData'

const SingleCourse = () => {
  const { id } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialVideoId = queryParams.get('v') ? parseInt(queryParams.get('v'), 10) : null
  const initialTime = queryParams.get('t') ? parseFloat(queryParams.get('t')) : 0

  const [course, setCourse] = useState(null)

  useEffect(() => {
    // Search in static courses first
    let found = courses.find((c) => c.id === id)

    // If not found, search in uploaded courses
    if (!found) {
      const uploadedCourses = JSON.parse(localStorage.getItem('uploadedCourses') || '[]')
      found = uploadedCourses.find((c) => c.id === id)
    }

    setCourse(found)
  }, [id])

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link
            to="/courses"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  const courseData = {
    id: course.id,
    title: course.title,
    instructor: course.instructor,
    description: course.description,
    thumbnail: course.image, // assume course has image property
    video: course.videoUrl,
    curriculum: [
      { id: 1, module: 'Getting Started', title: 'Introduction', duration: '5:12' },
      { id: 2, module: 'Getting Started', title: 'Course Overview', duration: '8:30' },
      { id: 3, module: 'Core Concepts', title: 'Fundamentals', duration: '12:45' },
      { id: 4, module: 'Core Concepts', title: 'Advanced Topics', duration: '15:10' },
      { id: 5, module: 'Projects', title: 'Project 1', duration: '18:00' },
      { id: 6, module: 'Projects', title: 'Project 2', duration: '20:20' },
    ],
    comments: [
      { id: 1, name: 'Student', text: 'Great course content!', time: '2 days ago' },
    ],
  }

  return (
    <div>
      <VideoPlayer
        initialData={courseData}
        initialVideoId={initialVideoId}
        initialTime={initialTime}
      />
    </div>
  )
}

export default SingleCourse