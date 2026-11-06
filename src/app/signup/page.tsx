'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Google from 'next-auth/providers/google'
import { signIn } from 'next-auth/react'
    interface User {
        name: string;
        email: string;
        password: string;
    }

const login = () => {
    const [name, setName]= useState<string>('')
    const [email, setEmail]= useState<string>('')
    const [password, setPassword]= useState<string>('')
    const route = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
                const result = await axios.post('/api/auth/register',{
                   name, email,password
                })
                route.push("/")
            }catch(err){
                console.error('Error occurred while submitting the form:', err);
            }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className='border border-purple-500 rounded p-3'
            />
            <input
                type="email"
                placeholder="your@domain.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className='border border-purple-500 rounded p-3'
            />
            <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className='border border-purple-500 rounded p-3'
            />
            <p className='text-sm text-center'>Already have an account? <a href="/login" className='text-blue-500 hover:underline'>Login</a></p>
            <button type="submit" className='bg-blue-500 text-white py-2 px-3 rounded hover:bg-purple-600 transition-colors duration-300'>
                Sign Up
            </button>
            <button type="button" className='bg-blue-500 text-white py-2 px-3 rounded hover:bg-purple-600 transition-colors duration-300' onClick={async()=>{await signIn('google',{callbackUrl:"/"}) }}>
                Continue with Google
            </button>
        </form>
    </div>
  )
}

export default login