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
                <h1 className='text-4xl font-bold text-center text-sky-500'>Registation</h1>
                <p className='text-sm text-center'>Please enter your registation credentials</p>
                <input
                    type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border border-purple-500 rounded p-3'
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border border-purple-500 rounded p-3'
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border border-purple-500 rounded p-3'
            />
            <button type="submit" className='bg-blue-500 text-white py-2 px-3 rounded hover:bg-purple-600 transition-colors duration-300'>
                Sign Up
            </button>
        </form>
    </div>
  )
}

export default login