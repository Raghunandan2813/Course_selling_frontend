import React, { useEffect, useRef, useState } from 'react'

const VideoPlayer = ({
  initialData = null,
}) => {
  // If parent provides data, use it; otherwise use sample
  const sample = initialData || {
    title: 'React Mastery',
    instructor: 'Sarah Johnson',
    description:
      'Master React from fundamentals to advanced patterns. Build real-world projects and learn best practices for production-ready apps.',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    curriculum: [
      { id: 1, module: 'Getting Started', title: 'Introduction', duration: '5:12' },
      { id: 2, module: 'Getting Started', title: 'Setup & Tooling', duration: '8:30' },
      { id: 3, module: 'Core Concepts', title: 'Components & Props', duration: '12:45' },
      { id: 4, module: 'Core Concepts', title: 'State & Lifecycle', duration: '15:10' },
      { id: 5, module: 'Core Concepts', title: 'Hooks Overview', duration: '18:00' },
      { id: 6, module: 'Advanced', title: 'Context & Reducers', duration: '20:20' },
    ],
    comments: [
      { id: 1, name: 'Rajesh', text: 'Great course — very practical!', time: '2 days ago' },
    ],
  }

  const [data] = useState(sample)
  const videoRef = useRef(null)
  const [minimized, setMinimized] = useState(false)
  const [completed, setCompleted] = useState([])
  const [comments, setComments] = useState(data.comments || [])
  const [commentText, setCommentText] = useState('')

  const total = data.curriculum.length
  const done = completed.length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  useEffect(() => {
    if (minimized) videoRef.current?.pause()
  }, [minimized])

  const toggleComplete = (id) => {
    setCompleted((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const addComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setComments((prev) => [...prev, { id: Date.now(), name: 'You', text: commentText.trim(), time: 'just now' }])
    setCommentText('')
  }

  return (
    <div className="w-full">
      <style>{`
        .mini-player { position: fixed; right: 16px; bottom: 16px; width: 220px; height: 124px; z-index:60; box-shadow: 0 12px 30px rgba(0,0,0,.6); border-radius:8px; overflow:hidden; }
        @media (max-width:640px){ .mini-player { right: 12px; bottom: 12px; width: 160px; height: 90px; } }
      `}</style>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <video ref={videoRef} src={data.video} controls className={`w-full ${minimized ? 'h-0' : 'h-56 sm:h-72 md:h-96 lg:h-[520px] object-cover'}`} />

          <div className="absolute top-3 right-3 flex gap-2">
            <button onClick={() => setMinimized((s) => !s)} className="bg-black bg-opacity-40 hover:bg-opacity-60 text-white px-3 py-1 rounded-md text-sm transition">
              {minimized ? 'Maximize' : 'Minimize'}
            </button>
          </div>
        </div>

        {minimized && (
          <div className="mini-player">
            <video ref={videoRef} src={data.video} controls className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
          <p className="text-sm text-gray-300 mb-4">by <span className="font-semibold text-white">{data.instructor}</span></p>
          <p className="text-gray-200 leading-relaxed mb-4">{data.description}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3">Curriculum</h3>
              <ul className="space-y-2">
                {data.curriculum.map((lesson) => (
                  <li key={lesson.id} className="flex items-center justify-between bg-gray-900 rounded-md p-2">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={completed.includes(lesson.id)} onChange={() => toggleComplete(lesson.id)} className="w-4 h-4 text-indigo-500 bg-gray-700 border-gray-600 rounded" />
                      <div>
                        <p className="text-sm font-medium">{lesson.title}</p>
                        <p className="text-xs text-gray-400">{lesson.duration}</p>
                      </div>
                    </div>
                    <button className="text-xs text-indigo-400 hover:underline">Preview</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3">Progress</h3>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden mb-3">
                <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" style={{ width: `${percent}%` }}></div>
              </div>
              <p className="text-sm text-gray-400 mb-4">{done} of {total} lessons completed — {percent}%</p>

              <h3 className="font-bold mb-3">Comments</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 mb-3">
                {comments.map((c) => (
                  <div key={c.id} className="bg-gray-900 rounded-md p-3">
                    <p className="text-sm text-gray-200">{c.text}</p>
                    <div className="mt-2 text-xs text-gray-400 flex items-center justify-between">
                      <span>{c.name}</span>
                      <span>{c.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={addComment} className="flex gap-2">
                <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none" />
                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white text-sm">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer