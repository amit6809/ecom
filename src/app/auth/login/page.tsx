"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'


export default function page() {
    const {data,status}=useSession();
    const router=useRouter();
    if(status=='authenticated'){
        router.push('/')
    }
  return (
    <>
        <div className=' flex flex-col items-center'>
            <h1 className='text-[40px] font-sans' >Login</h1>
            <div className='mt-10 h-auto'>
                <label htmlFor='username' className='block mb-2 '>Username</label>
                <input type="text" id='username' className=' indent-4 h-[47px] w-[420px] shadow-[#231b55] shadow-lg rounded-xl inp'/>
            </div>
            <div className='mt-8'>
                <label htmlFor='password' className='block mb-2'>Password</label>
                <input type="password" id='password' className='h-[47px] indent-4 w-[420px] shadow-[#231b55] shadow-lg rounded-xl inp'/>
            </div>
            <Button className='mt-8 w-[171px] h-[45px] shadow-[#231b55] shadow-lg '>
                Login
            </Button>
            <span className='block mt-10'>
                Or Login Using 
            </span>
            <div className='google flex justify-between  w-[180px] mt-5'>
                <Image alt='google ka logo' src={'/googleLogo.png'} height={60} width={60} className='inline-block bg-[#FFFFF7]  rounded-full' onClick={()=>{signIn('google')}}></Image>
                <Image alt='google ka logo' src={'/githubLogo.png'} height={60} width={60} className='inline-block border border-[#f5f5f5] rounded-full bg-[#f5f5f5]'></Image>
            </div> 
           
        </div>
        
    </>
  )
}
