'use client'
import React from 'react'
import { useState } from 'react'

    interface User {
        name: string;
        email: string;
        password: string;
    }

const login = () => {
    const [name, setName]= useState<string>('')
    const [email, setEmail]= useState<string>('')
    const [password, setPassword]= useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: User = {
            name,
            email,
            password
        };
        console.log(user);
    };

    return (
        <div className='flex items-center justify-center bg-gray-300 min-h-screen'>
            <form onSubmit={handleSubmit} className='bg-pink-300 p-6 border border-black rounded shadow-md text-black flex flex-col gap-4 w-1/3  max-w-[400px] mt-10'>
                <h1 className='text-4xl font-bold text-center text-sky-500'>Registration</h1>
                <p className='text-sm text-center'>Please enter your registration credentials</p>
                <input
                    type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border border-purple-500 rounded p-3'
            />
            <input
                type="email"
                placeholder="your@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border border-purple-500 rounded p-3'
            />
            <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border border-purple-500 rounded p-3'
            />
            <label className='text-sm text-center'>Already have an account? <a href="/login" className='text-blue-500 hover:underline'>Login</a></label>
            <button type="submit" className='bg-blue-500 text-white py-2 px-3 rounded hover:bg-purple-600 transition-colors duration-300'>
                Sign Up
            </button>
            <button type="submit" className='bg-blue-500 text-white py-2 px-3 rounded hover:bg-purple-600 transition-colors duration-300'>
                Continue with Google
            </button>
        </form>
    </div>
  )
}

export default login