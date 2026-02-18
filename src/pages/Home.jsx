import React from 'react'
import Navbar from '../component/Navbar.jsx'
import Header from '../component/Header.jsx'

import Course from '../component/Course.jsx'
import Testimonial from '../component/Testimonial.jsx'

import Footer from '../component/Footer.jsx'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <Course/>
        <Testimonial/>
        <Footer/>
    </div>
  )
}

export default Home