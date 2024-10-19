'use client'

import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'

const page = () => {
  return (
    <div className=' w-full h-full bg-[#F2E3FF]'>
      <Navbar/>
      <Dashboard/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default page