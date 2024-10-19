import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-[#4D00B4] w-full h-fit flex justify-between text-white items-center'>
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
            <button className='bg-[#7A40C7] rounded-full px-[16px] py-1 flex items-center'>
                <div className='bg-green-300 w-1.5 h-1.5 mr-2 rounded-full'>
                </div>
                Mainnet
            </button>
            <button className=''>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </button>
        </div>
    </div>
  )
}

export default Navbar
