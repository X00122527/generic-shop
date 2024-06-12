import React from 'react'

function Signup() {

  const googleAuth = () =>{
    
  }

  return (
    <div className='w-full mx-auto'>
    <button 
    onClick={googleAuth}
    className='h-12 px-2 bg-white border-2 border-black rounded-lg w-fit'>Sign up with google</button>
    </div>
  )
}

export default Signup