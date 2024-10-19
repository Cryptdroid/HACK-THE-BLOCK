import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const page = () => {
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
                <button  className='text-white rounded-full p-1 px-3 bg-[#4D00B4] font-normal'>
                    Vote Pending
                </button>
                <button  className='text-[#4D00B4] rounded-full bg-white p-1 px-3 font-normal border-[#4D00B4] border-[1px]'>
                    In Progress
                </button>
                <button className='text-[#4D00B4] rounded-full bg-white p-1 px-3 font-normal border-[#4D00B4] border-[1px]'>
                    Closed
                </button>
            </div>
        </div>
        <div className='bg-[#F2E3FF] w-full h-[471px] flex justify-center text-2xl text-[#D09CFF] tracking-tight'>
            <div className='pt-24 font-bold'>
                You don't have any pending cases.
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default page