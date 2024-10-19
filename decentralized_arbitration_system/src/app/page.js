'use client'

import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'

const page = () => {
  return (
    <div className=' w-full h-full '>
      <Navbar/>
      <Dashboard/>
      <Hero/>
    </div>
  )
}

export default page