import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <>
        <div className=' flex flex-col items-center'>
            <h1 className='text-[36px] font-sans' >Sign Up</h1>

            <div className='mt-10 h-auto'>
                <label htmlFor='email' className='block mb-2 '>Email</label>
                <input type="text" id='email' className=' indent-4 h-[47px] w-[420px] shadow-[#231b55] shadow-lg rounded-xl inp'/>
            </div>

            <div className='mt-8 h-auto'>
                <label htmlFor='username' className='block mb-2 '>Username</label>
                <input type="text" id='username' className=' indent-4 h-[47px] w-[420px] shadow-[#231b55] shadow-lg rounded-xl inp'/>
            </div>
            <div className='mt-8'>
                <label htmlFor='password' className='block mb-2'>Password</label>
                <input type="password" id='password' className='h-[47px] indent-4 w-[420px] shadow-[#231b55] shadow-lg rounded-xl inp'/>
            </div>
            <Link href={"/auth/register"}><Button className='mt-8 w-[171px] h-[45px] shadow-[#231b55] shadow-lg'>Sign Up</Button></Link>
            <Link href={"/auth/login"} className='mt-8 hover:underline'>Already have an Account?</Link>
           
        </div>
        
    </>
  )
}
