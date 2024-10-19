'use client'
import React, { act, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const page = () => {
    const [activeButton,setActiveButton] =useState('pending')
    
    function toggleMenu(state){
        setActiveButton(state)
    }
  return (
    <div className='w-full'>
        <Navbar/>
        <div className=' w-full bg-gradient-to-r from-white to-[#DFD2F2] shadow-lg font-semibold flex items-center justify-between px-24'>
            <div className='p-6 flex flex-col text-[#4D00B4] tracking-tighter'>
                <span className='text-2xl font-bold'>
                    My Cases
                </span>
                <span className='font-normal'>
                Select a case you have been drawn in, study the evidence, and vote.
                </span>
            </div>
            <div className='space-x-4 pr-10 '>
                <button onClick={()=>toggleMenu('pending')}  className={` rounded-full p-1 px-3  font-normal ${activeButton==='pending'?'bg-[#4D00B4] border-[1px] text-white border-[#4D00B4]':'bg-white text-[#4D00B4]'}`}>
                    Vote Pending
                </button>
                <button onClick={()=>toggleMenu('inProgress')} className={` rounded-full p-1 px-3 font-normal ${activeButton==='inProgress'?'bg-[#4D00B4] border-[1px] text-white border-[#4D00B4]':'bg-white text-[#4D00B4]'}`}>
                    In Progress
                </button>
                <button onClick={()=>toggleMenu('closed')} className={` rounded-full p-1 px-3 font-normal ${activeButton==='closed'?'bg-[#4D00B4] border-[1px] text-white border-[#4D00B4]':'bg-white text-[#4D00B4]'}`}>
                    Closed
                </button>
            </div>
        </div>
        <div className='bg-[#F2E3FF] w-full h-[471px] flex justify-center text-2xl text-[#D09CFF] tracking-tight'>
            <div className='pt-24 font-bold'>
                {activeButton==='pending' && "You don't have any pending cases."}
                {activeButton==='inProgress' && "You don't have any active cases."}
                {activeButton==='closed' && "You don't have any closed cases."}
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default page