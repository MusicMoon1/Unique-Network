import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Fontend/Home'
import FrontendHome from './FrontendHome'
import About from './About'
import LiveLoop from './LiveLoop/LiveLoop'

export default function index() {
  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/' element={<FrontendHome />} />
      <Route path='/about' element={<About />} />
      <Route path='/liveloop' element={<LiveLoop />} />
    </Routes>
  )
}
