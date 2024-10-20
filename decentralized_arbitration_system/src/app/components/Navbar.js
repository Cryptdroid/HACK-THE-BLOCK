import Link from 'next/link'
import React,{useState} from 'react'

const Navbar = () => {
    const [menu,setMenu]=useState(false)
    
    const toggleMenu = () => {
        setMenu(!menu)
    }
  return (
    <div>
         <div className={`fixed z-40 ${menu?'visible overflow-hidden':'hidden'}`}>
            <div className='fixed bg-black opacity-50 w-full h-screen'></div>
            <div className='relative z-50 bg-[#99BFD5] w-[90vw] h-[90vh] opacity-100 top-10 left-20 -translate-x-'>
            <div className='w-full '>
                        <div className='flex py-2 items-center'>
                            <span className='text-white font-bold text-xl basis-[91%] flex items-center justify-center'>
                                
                            </span>
                            <button onClick={toggleMenu} className='text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>
                </div>
            </div>
        </div>
        <div className='bg-[#232323] w-full h-fit flex justify-between text-white items-center z-40'>
            <Link href={'/'} className='text-lg p-5 ml-8 tracking-widest'>
                FROSCHE
            </Link>
            <div className='flex space-x-8'>
                <Link href={'/'} className='text-gray-300 hover:text-white'>
                    Home
                </Link>
                <Link href={'/courts'} className='text-gray-300 hover:text-white'>
                    Courts
                </Link>
                <Link href={'/MyCases'} className='text-gray-300 hover:text-white'>
                    My Cases
                </Link>
            </div>
            <div className='flex space-x-3 pr-10'>
                    <button onClick={toggleMenu} className='bg-black rounded-full px-[16px] py-1 flex items-center'>
                        <div className='bg-green-300 w-1.5 h-1.5 mr-2 rounded-full'>
                        </div>
                        Wallet
                    </button>
                <button className=''>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar
