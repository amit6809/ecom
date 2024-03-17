"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { NextResponse } from 'next/server'
import React, { ChangeEvent, MouseEventHandler, useState } from 'react'

export default function page() {
    const [userData,setUserData]=useState({
        username:'',
        email:'',
        password:''
    })

    const onFieldChange = (e:ChangeEvent)=>{
        const target = e.target as HTMLInputElement;
        setUserData({
         ...userData,
            [target.name]:target.value
        })
    }

    const AddUser=async (e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        if(userData.email.length==0 || userData.password.length==0 || userData.username.length==0){
            alert('Please fill all fields');
            return;
        }
        const resp=await fetch('/api/auth/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userData)
        })

        const response=await resp.json();
        console.log(response);
        if(response.isError==true){
            throw new Error(response.message);
        }

    }
  return (
    <>
        <div className=' flex flex-col items-center'>
            <h1 className='text-[36px] font-sans' >Sign Up</h1>

            <div className='mt-8 h-auto'>
                <label htmlFor='username' className='block mb-2 '>Username</label>
                <input type="text" id='username' name='username' className=' indent-4 h-[47px] w-[420px] shadow-[#231b55] shadow-lg rounded-xl inp' onChange={onFieldChange}/>
            </div>

            <div className='mt-10 h-auto'>
                <label htmlFor='email' className='block mb-2 '>Email</label>
                <input type="text" id='email' name='email' className=' indent-4 h-[47px] w-[420px] shadow-[#231b55] shadow-lg rounded-xl inp' onChange={onFieldChange}/>
            </div>

            <div className='mt-8'>
                <label htmlFor='password' className='block mb-2'>Password</label>
                <input type="password" id='password' name='password' className='h-[47px] indent-4 w-[420px] shadow-[#231b55] shadow-lg rounded-xl inp' onChange={onFieldChange}/>
            </div>
            <Link href={"/auth/register"}><Button className='mt-8 w-[171px] h-[45px] shadow-[#231b55] shadow-lg' onClick={AddUser}>Sign Up</Button></Link>
            <Link href={"/auth/login"} className='mt-8 hover:underline'>Already have an Account?</Link>
           
        </div>
        
    </>
  )
}
