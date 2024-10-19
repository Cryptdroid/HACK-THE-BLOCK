import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Courts = () => {
  return (
    <div className='w-full'>
        <Navbar/>
        <div className=' w-full bg-gradient-to-r from-white to-[#DFD2F2] shadow-lg font-semibold flex items-center justify-between px-24'>
            <div className='p-6 flex flex-col text-[#4D00B4] tracking-tighter'>
                <span className='text-2xl '>
                    Courts
                </span>
                <span className=''>
                    Select courts and stake PNK
                </span>
            </div>
            <div className='space-x-4 pr-10'>
                <button  className='text-gray-500 rounded-md bg-white p-1.5 px-3'>
                    Buy GRULL
                </button>
                <button  className='text-white rounded-md bg-blue-400 p-1.5 px-3'>
                    Join Court
                </button>
            </div>
        </div>
        <div className='bg-[#F2E3FF] w-full h-[471px] flex justify-center text-2xl text-[#D09CFF] tracking-tight'>
            <div className='pt-24'>
                You have not joined any courts yet.
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Courts