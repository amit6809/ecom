import './_css/auth.css'
export default function Auth({children}: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <>
            <div className="bg-slate-400 h-screen w-screen m-0 p-0 flex justify-center items-center">
                <div className='w-[487px] h-[600px]  p-2 rounded-xl auth-container-bg'>
                    {
                        children
                    }
                </div>
            </div>
        </>
    )
}