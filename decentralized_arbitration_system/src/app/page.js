'use client'

import React,{useState,useEffect} from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import './styles/styles.scss'
import Lenis from 'lenis'

const page = () => {
  useEffect(()=>{
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    raf()
  })
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className="loader">Loading...</div>
    );
  }
  return (
    <div className='relative w-full h-full bg-[#232323] z-10'>
      <Navbar/>
      <Dashboard/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default page