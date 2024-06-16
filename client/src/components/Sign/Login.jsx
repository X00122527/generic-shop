import React from 'react'

function Login() {

  const googleAuth = () =>{
    
  }

  return (
    // <div className='w-full mx-auto'>
    // <button 
    // onClick={googleAuth}
    // className='h-12 px-2 bg-white border-2 border-black rounded-lg w-fit'>Sign up with google</button>
    // </div>
      <div className='container grid w-6/12 p-10 mx-auto my-auto border-2 border-gray-400 rounded-lg gap-y-4'>
        <div>
          <span>Log in to your account</span>
        </div>
        <div className='grid gap-2'>
          {/* form goes here */}
          <input className='' type='text' placeholder='Your email'/>
          <input className='' type='password' placeholder='********'/>

        </div>
        <button className='w-full h-8 px-2 bg-white border-[1px] border-black'>Log in</button>

      </div>
  )
}

export default Login