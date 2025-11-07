import { useState } from 'react'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Courses from './pages/Courses.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
     </>
  );
    
}



export default App
