import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
        <nav className='w-full h-20 flex items-center justify-center bg-white shadow-md px-4'>
            <Link href="/" className='text-blue-500 w-full font-bold text-2xl font-bold text-pink-500 tracking-wider '>MIKURI</Link>
            <div className='w-full flex  justify-end gap-1'>
            <Link href="/" className=' w-1/3  text-sm text-purple-400 tracking-wide hover:text-red-600 '>HOME</Link>
            <Link href="/about" className=' w-1/3 text-sm  text-purple-400 tracking-wide hover:text-red-600 '>ABOUT</Link>
            <Link href="/contact" className=' w-1/3  text-sm  text-purple-400 tracking-wide hover:text-red-600 '>CONTACT</Link>
            <Link href="/login" className=' w-1/3  text-sm  text-purple-400 tracking-wide hover:text-red-600 '>LOGIN</Link>
            </div>
        </nav>
    </>
  )
}

export default page