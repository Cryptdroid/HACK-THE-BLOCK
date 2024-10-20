'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const page = () => {

    const list = [
        'Blockchain',
        'Marketing Services',
        'English Language',
        'Video Production',
        'Onboarding',
        'Curation',
        'Data Analysis',
        'Corte General en Espanol',
        'Humanity Court'
    ]

    
    const [menu,setMenu]=useState(false)
    
    const toggleMenu = () => {
        setMenu(!menu)
    }

    const [element,setElements] = useState(null)

    const toggleElements = (index) => {
        setElements(index)
    }

    return (
    <div className={`w-full`}>
        <div className={`fixed  ${menu?'visible':'hidden'}`}>
            <div className='fixed bg-black opacity-50 w-full h-screen'></div>
            <div className='relative z-50 bg-[#4004A3] w-[90vw] h-[90vh] opacity-100 top-10 left-20 -translate-x-'>
                <div className='w-full '>
                    <div className='flex py-2 items-center'>
                        <span className='text-white font-bold text-xl basis-[97%] flex items-center justify-center'>
                            Join Court
                        </span>
                        <button onClick={toggleMenu} className='text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>
                    <div className='bg-[#4004A3] flex '>
                        <div className='text-white flex justify-between w-52 h-fit px-4 py-2 bg-[#1E075F] cursor-pointer'>
                            <span>
                                General Court
                            </span>
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                            </span>
                        </div>
                        <div className='bg-white w-full h-72 overflow-y-auto'>
                            <div className='w-64'>
                                <div className=' overflow-y-scroll max-h-72'>
                                    {list.map((list,index)=>(
                                        <div onClick={()=>toggleElements(list)} key={index} className={`px-3 text-md tracking-tight py-1.5 hover:bg-[#E6F9FF] cursor-pointer flex justify-between ${element===list?'bg-[#9013FE]':'bg-white'}`}>
                                            {list}
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full p-4 flex justify-end pr-7'>
                        <button className='text-white px-7 py-1 rounded-md bg-[#1cacff] hover:bg-[#24ADFF]'>
                            Stake
                        </button>
                    </div>
                    <div className='bg-white w-full h-screen'>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Navbar/>
        <div className=' w-full bg-gradient-to-r from-white to-[#DFD2F2] shadow-lg font-semibold flex items-center justify-between px-24'>
            <div className='p-6 flex flex-col text-[#4D00B4] tracking-tighter'>
                <span className='text-2xl font-bold'>
                    Courts
                </span>
                <span className='font-normal'>
                    Select courts and stake GRULL
                </span>
            </div>
            <div className='space-x-4 pr-10'>
                <button  className='text-gray-500 rounded-md bg-white p-1.5 px-3'>
                    Buy GRULL
                </button>
                <button onClick={toggleMenu} className={`text-white rounded-md bg-blue-400 p-1.5 px-3 `}>
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

export default page
