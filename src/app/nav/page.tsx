'use client'


import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

const page = () => {
  const {data} = useSession()
  return (
    <>
        <nav className='w-full h-20 flex items-center justify-center bg-white shadow-md px-6'>
            <Link href="/" className=' w-full text-2xl font-bold text-pink-500 tracking-wider '>MIKURI</Link>
            <div className=' flex  items-center gap-8'>
            <Link href="/" className=' w-1/3   text-sm text-purple-400 tracking-wide hover:text-red-600 hover:font-bold'>HOME</Link>
            <Link href="/about" className=' hover:font-bold w-1/3 text-sm  text-purple-400 tracking-wide hover:text-red-600 '>ABOUT</Link>
            <Link href="/contact" className=' hover:font-bold w-1/3  text-sm  text-purple-400 tracking-wide hover:text-red-600 '>CONTACT</Link>
            <Link href="/signup" className='nowrap  text-sm border border-purple-400  bg-blue-400 px-5 py-2 text-white tracking-wide hover:bg-red-600 rounded whitespace-nowrap'>SIGN UP</Link>
            <Link href="/login" className=' w-1/3  border border-purple-400  bg-blue-400 px-4 py-2 text-sm  text-white rounded tracking-wide hover:bg-purple-600 '>LOGIN</Link>
            </div>
        </nav>
        <div className='min-h-screen flex flex-col bg-black text-white px-4 item-center'>
             {data && <div className='w-full border-2 border-white rounded-lg p-8 shadow-lg text-center relative flex flex-col item-center'>
              {data.user.image && <div className='relative border-2 overflow-hidden border-white w-[200px] h-[200px] rounded-full'><Image src={data.user.image} fill alt='userImage'/></div>}
              </div>}
             {!data && <div className='text-white'>Loading...</div>}
        </div>
    </>
  )
}

export default page