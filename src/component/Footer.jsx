import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">

          {/* Column 1: App Name, Logo, and Social Media */}
          <div className="text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-3">
              🎓 CourseHub
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Empowering learners worldwide with quality education and industry expertise.
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center sm:justify-start gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                title="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                title="LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                title="Twitter"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 0a10.64 10.64 0 00-9.5-5.5c4.5-2.3 7.5-5 7.5-5s-1 .5-3 1.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links and Copyright */}
          <div className="text-center">
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-indigo-400 transition text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-indigo-400 transition text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-indigo-400 transition text-sm">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-indigo-400 transition text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>

            {/* Copyright */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                &copy; 2026 CourseHub. All rights reserved.
              </p>
            </div>
          </div>

          {/* Column 3: Contact Information */}
          <div className="text-center sm:text-right">
            <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start justify-center sm:justify-end gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
                <p className="text-sm text-gray-400">
                  123 Education Street<br />
                  Tech Valley, CA 94025<br />
                  United States
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center justify-center sm:justify-end gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:support@coursehub.com" className="text-sm text-gray-400 hover:text-indigo-400 transition">
                  support@coursehub.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-center sm:justify-end gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.92 7.02C15.8915026 3.18537876 11.7044239 0.585857864 7 0.585857864C3.13400656 0.585857864 0 3.72986441 0 7.59585785 0 9.69183982 0.752393751 11.6563168 1.97625899 13.1065931 L0.152358754 21.5580823 C-0.109804596 22.6159215 0.905565204 23.6303993 1.9641964 23.3725601 L10.4156856 21.5484961 C11.8659619 22.7723618 13.8304388 23.5247556 15.9264206 23.5247556 22.0359168 23.5247556 27.0 18.5606724 27.0 12.451176 27.0 11.0009091 26.7421608 9.63078431 26.2462687 8.34658646"/>
                </svg>
                <a href="tel:+1234567890" className="text-sm text-gray-400 hover:text-indigo-400 transition">
                  +1 (234) 567-890
                </a>
              </div>

              {/* Country */}
              <div className="flex items-center justify-center sm:justify-end gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <p className="text-sm text-gray-400">
                  United States 🇺🇸
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            Built with ❤️ for learners worldwide | Crafted with innovation and dedication
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer