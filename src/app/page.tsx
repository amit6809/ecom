"use client"
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  let session=useSession();
  console.log(session);
  let {data,status}:any=useSession();
  const router=useRouter();
  if(status=='unauthenticated'){
    router.push('/auth/login')
    return(
      <>
        <div>
          Login karle bosdike
        </div>
      </>
    )
  }
  
  return (
    <>
      <div className='bg-[#1B2123] p-1 w-full h-30' >
              {/* <img src={data.user.image} alt="userImg"   */}
              {/* <div   */}
                <Image src={data.user.image=='dummyUser.jpg'?'/dummyUser.jpg':data.user.image} height={40} width={40  } className='inline-block ms-3 mt-2' alt="userImg" style={{height:'70%',border:"2px solid white",borderRadius:'50%'}} />

              {/* </div> */}
              <div className='text-white inline-block ms-8 font-extrabold'>
                <span>
                  {data.user.name}
                </span>
              </div>
        </div>
        <Button onClick={()=>{
          signOut();
        }}>
          sign out
        </Button>
    </>
  );
}
