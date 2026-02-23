import React, { useEffect, useRef, useState, useCallback } from 'react'

const VideoPlayer = ({
  initialData = null,
  initialVideoId = null,
  initialTime = 0
}) => {
  // Setup sample data if none provided
  const sample = initialData || {
    id: 'sample-course',
    title: 'React Mastery',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    description: 'Master React from fundamentals to advanced patterns.',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    curriculum: [
      { id: 1, module: 'Getting Started', title: 'Introduction', duration: '5:12', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 2, module: 'Getting Started', title: 'Setup & Tooling', duration: '8:30', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 3, module: 'Core Concepts', title: 'Components & Props', duration: '12:45', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
  }

  const [data] = useState(sample)
  const videoRef = useRef(null)

  // State
  const [currentVideoId, setCurrentVideoId] = useState(initialVideoId || data.curriculum[0]?.id)
  const [activeTab, setActiveTab] = useState('curriculum') // 'curriculum', 'assignments', 'comments'
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  // Comments specific to videos
  const [comments, setComments] = useState({
    1: [{ id: 1, name: 'Rajesh', text: 'Great intro!', time: '2 days ago' }]
  })
  const [commentText, setCommentText] = useState('')

  // Assignments
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Build a Counter App', description: 'Create a simple counter using useState.', submissions: [] }
  ])
  const [newAssignmentText, setNewAssignmentText] = useState('')
  const [studentSubmission, setStudentSubmission] = useState('')

  // Progress Tracking & History
  const [videoProgress, setVideoProgress] = useState({}) // { videoId: { currentTime, duration } }
  const lastSavedTime = useRef(0)

  useEffect(() => {
    setIsAdminLoggedIn(!!localStorage.getItem('adminToken'))

    // Load progress from history if it exists for this course
    const savedHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]')
    const courseHistory = savedHistory.filter(h => h.courseId === data.id)

    const initialProgress = {}
    courseHistory.forEach(h => {
      initialProgress[h.videoId] = { currentTime: h.timestamp, duration: 100 } // Approximation
    })
    setVideoProgress(initialProgress)
  }, [data.id])

  // Get current playing video details
  const currentVideo = data.curriculum.find(v => v.id === currentVideoId) || data.curriculum[0]

  // Handle Video Selection
  const handleVideoSelect = (lesson) => {
    setCurrentVideoId(lesson.id)
    if (videoRef.current) {
      // Seek to saved time if exists
      const savedProgress = videoProgress[lesson.id]
      if (savedProgress && savedProgress.currentTime) {
        videoRef.current.currentTime = savedProgress.currentTime
      } else {
        videoRef.current.currentTime = 0
      }
      videoRef.current.play().catch(e => console.log("Auto-play prevented", e))
    }
  }

  // Handle Time Update for History
  const handleTimeUpdate = () => {
    if (!videoRef.current || !currentVideo) return

    const currentTime = videoRef.current.currentTime
    const duration = videoRef.current.duration

    // Update local progress state
    setVideoProgress(prev => ({
      ...prev,
      [currentVideo.id]: { currentTime, duration }
    }))

    // Throttle saving to localStorage (every 5 seconds)
    if (Math.abs(currentTime - lastSavedTime.current) > 5) {
      saveToHistory(currentTime)
      lastSavedTime.current = currentTime
    }
  }

  const saveToHistory = useCallback((timestamp) => {
    if (!data.id || !currentVideo) return

    const savedHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]')
    const existingIndex = savedHistory.findIndex(h => h.courseId === data.id && h.videoId === currentVideo.id)

    const historyItem = {
      courseId: data.id,
      courseTitle: data.title,
      videoId: currentVideo.id,
      videoTitle: currentVideo.title,
      thumbnail: data.thumbnail,
      timestamp: timestamp,
      lastWatched: new Date().toISOString()
    }

    if (existingIndex >= 0) {
      savedHistory[existingIndex] = historyItem
    } else {
      savedHistory.push(historyItem)
    }

    localStorage.setItem('watchHistory', JSON.stringify(savedHistory))
  }, [data, currentVideo])

  // Handle initial seek on mount if passed via props
  const onLoadedMetadata = () => {
    if (initialTime > 0 && Math.abs(videoRef.current.currentTime - initialTime) > 1) {
      videoRef.current.currentTime = initialTime
    }
  }

  // Comments Handlers
  const addComment = (e) => {
    e.preventDefault()
    if (!commentText.trim() || !currentVideo) return

    setComments(prev => ({
      ...prev,
      [currentVideo.id]: [
        ...(prev[currentVideo.id] || []),
        { id: Date.now(), name: 'You', text: commentText.trim(), time: 'just now' }
      ]
    }))
    setCommentText('')
  }

  const currentComments = comments[currentVideo?.id] || []

  // Assignment Handlers
  const handleCreateAssignment = (e) => {
    e.preventDefault()
    if (!newAssignmentText.trim()) return
    setAssignments(prev => [...prev, {
      id: Date.now(),
      title: 'New Assignment',
      description: newAssignmentText,
      submissions: []
    }])
    setNewAssignmentText('')
  }

  const handleSubmitAssignment = (assignmentId, e) => {
    e.preventDefault()
    if (!studentSubmission.trim()) return

    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          submissions: [...a.submissions, { id: Date.now(), student: 'You', content: studentSubmission, time: new Date().toLocaleDateString() }]
        }
      }
      return a
    }))
    setStudentSubmission('')
    alert("Assignment submitted successfully!")
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden text-black mb-8 p-4">

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Side: Video Player */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="relative w-full rounded-lg overflow-hidden bg-black pb-[56.25%] mb-4 shadow-md">
            <video
              ref={videoRef}
              src={currentVideo?.videoUrl || data.video}
              controls
              className="absolute top-0 left-0 w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              autoPlay={false}
            />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentVideo?.title || data.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{data.courseTitle || data.title} • Instructor: <span className="font-semibold text-black">{data.instructor}</span></p>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">{data.description}</p>
          </div>
        </div>

        {/* Right Side: Sidebar (Curriculum, Assignments, Comments) */}
        <div className="w-full lg:w-1/3 flex flex-col h-[600px] border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm">

          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-white">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'curriculum' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Playlist
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'comments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'assignments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Assignments
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">

            {/* CURRICULUM TAB */}
            {activeTab === 'curriculum' && (
              <div className="space-y-3">
                {data.curriculum.map((lesson) => {
                  const progress = videoProgress[lesson.id]
                  const percent = progress && progress.duration ? Math.min(100, Math.round((progress.currentTime / progress.duration) * 100)) : 0

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleVideoSelect(lesson)}
                      className={`cursor-pointer rounded-lg border p-3 transition-all ${currentVideoId === lesson.id
                          ? 'bg-blue-50 border-blue-300 shadow-sm'
                          : 'bg-white border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full border ${currentVideoId === lesson.id ? 'bg-blue-600 border-blue-600' : 'border-gray-400'}`}>
                            {percent > 90 && <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                          </div>
                          <div>
                            <p className={`font-semibold text-sm ${currentVideoId === lesson.id ? 'text-blue-700' : 'text-gray-800'}`}>{lesson.title}</p>
                            <p className="text-xs text-gray-500">{lesson.module} • {lesson.duration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Video Individual Progress Bar */}
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* COMMENTS TAB */}
            {activeTab === 'comments' && (
              <div className="flex flex-col h-full">
                <p className="text-sm text-gray-500 mb-4 bg-white p-2 border border-gray-200 rounded text-center">
                  Comments for: <span className="font-bold text-gray-800">{currentVideo?.title}</span>
                </p>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
                  {currentComments.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm italic mt-8">No comments yet. Be the first!</p>
                  ) : (
                    currentComments.map((c) => (
                      <div key={c.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-gray-800">{c.name}</span>
                          <span className="text-xs text-gray-400">{c.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{c.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={addComment} className="flex gap-2 shrink-0">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-bold text-sm transition shadow-sm">Post</button>
                </form>
              </div>
            )}

            {/* ASSIGNMENTS TAB */}
            {activeTab === 'assignments' && (
              <div className="space-y-6">

                {/* INSTRUCTOR VIEW: Create Assignment */}
                {isAdminLoggedIn && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-blue-800 mb-3 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      Instructor: Add Assignment
                    </h3>
                    <form onSubmit={handleCreateAssignment}>
                      <textarea
                        value={newAssignmentText}
                        onChange={(e) => setNewAssignmentText(e.target.value)}
                        placeholder="Describe the assignment..."
                        className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows="3"
                      />
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-bold text-sm">Create Assignment</button>
                    </form>
                  </div>
                )}

                {/* Assignment List */}
                <div className="space-y-4">
                  {assignments.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm mt-8">No assignments posted for this course.</p>
                  ) : (
                    assignments.map(assignment => (
                      <div key={assignment.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                          <h4 className="font-bold text-gray-900 mb-1">{assignment.title}</h4>
                          <p className="text-sm text-gray-700">{assignment.description}</p>
                        </div>

                        <div className="p-4 bg-gray-50">
                          {/* Student Submission Form */}
                          {!isAdminLoggedIn && (
                            <form onSubmit={(e) => handleSubmitAssignment(assignment.id, e)}>
                              <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Submit your work</p>
                              <div className="flex gap-2">
                                <input
                                  value={studentSubmission}
                                  onChange={(e) => setStudentSubmission(e.target.value)}
                                  placeholder="Link to file or answer..."
                                  className="flex-1 text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-bold shadow-sm transition">Submit</button>
                              </div>
                            </form>
                          )}

                          {/* Instructor / Student View of Submissions */}
                          {(isAdminLoggedIn || assignment.submissions.length > 0) && (
                            <div className="mt-4">
                              <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                                {isAdminLoggedIn ? 'Student Submissions' : 'Your Submissions'} ({assignment.submissions.length})
                              </p>
                              {assignment.submissions.length === 0 ? (
                                <p className="text-xs text-gray-400 italic">No submissions yet.</p>
                              ) : (
                                <ul className="space-y-2">
                                  {assignment.submissions.map(sub => (
                                    <li key={sub.id} className="bg-white border border-gray-200 p-2 rounded text-sm flex justify-between items-center shadow-sm">
                                      <div>
                                        <span className="font-bold text-gray-800">{sub.student}: </span>
                                        <span className="text-gray-600">{sub.content}</span>
                                      </div>
                                      <span className="text-xs text-gray-400">{sub.time}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8; 
        }
      `}</style>
    </div>
  )
}

export default VideoPlayer