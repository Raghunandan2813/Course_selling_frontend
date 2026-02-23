import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

const History = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        // Load history from localStorage. Structure: array of { courseId, courseTitle, videoId, videoTitle, thumbnail, timestamp, lastWatched }
        const savedHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]')

        // Sort by most recently watched
        savedHistory.sort((a, b) => new Date(b.lastWatched) - new Date(a.lastWatched))
        setHistory(savedHistory)
    }, [])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    const handleClearHistory = () => {
        if (window.confirm("Are you sure you want to clear your entire watch history?")) {
            localStorage.removeItem('watchHistory')
            setHistory([])
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Watch History</h1>
                    {history.length > 0 && (
                        <button
                            onClick={handleClearHistory}
                            className="text-red-600 hover:text-red-800 font-medium transition"
                        >
                            Clear History
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <h2 className="text-xl text-gray-700 font-medium mb-4">No watch history yet</h2>
                        <p className="text-gray-500 mb-6">Explore courses and start learning to build your history.</p>
                        <Link to="/courses" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                            Explore Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {history.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden flex flex-col">
                                <div className="relative aspect-video bg-gray-200">
                                    {item.thumbnail ? (
                                        <img src={item.thumbnail} alt={item.courseTitle} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                        Stopped at {formatTime(item.timestamp)}
                                    </div>
                                </div>

                                <div className="p-4 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-900 line-clamp-2 mb-1">{item.videoTitle || 'Video'}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-1 mb-2">{item.courseTitle}</p>
                                        <p className="text-xs text-gray-400 mb-4">{new Date(item.lastWatched).toLocaleDateString()}</p>
                                    </div>

                                    <Link
                                        to={`/courses/${item.courseId}?v=${item.videoId}&t=${item.timestamp}`}
                                        className="block w-full text-center bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white py-2 rounded-md font-medium transition-colors"
                                    >
                                        Resume Playing
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default History
