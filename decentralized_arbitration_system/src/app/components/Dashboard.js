import React from 'react'

const Dashboard = () => {
  return (
    <div className=' w-full bg-gradient-to-r from-white to-[#DFD2F2] shadow-lg font-semibold flex items-center justify-between px-24'>
        <div className='p-6 pl-8 text-2xl text-[#4D00B4] tracking-tighter'>
            My Dashboard
        </div>
        <div className='space-x-5 pr-8'>
            <button  className='text-gray-500 rounded-md bg-white p-1.5 px-3'>
                Buy GRULL
            </button>
            <button  className='text-white rounded-md bg-blue-400 p-1.5 px-3'>
                See Courts
            </button>
        </div>
    </div>
  )
}

export default Dashboard