import React from 'react'

function Homepage() {

  const repeat = 4;

  return (
    <>
      <div id="top" className='w-full bg-gray-200 '>
        <img src="..\..\custom-files\top.jpg" className='mx-auto'></img>
      </div>

      <div id="perks" className='grid items-center h-48 grid-cols-2 bg-yellow-200 sm:grid-cols-4 '>

        <div className='divider'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <p>Free shipping</p>
        </div>

        <div className='divider'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
          </svg>

          <p>Free returns</p>
        </div>

        <div className='divider'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>

          <p>Membership</p>
        </div>

        <div className='divider'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <p>24 hours shipping</p>
        </div>

      </div>

      <div id='products' className='grid w-full grid-cols-2 mx-auto mt-12 gap-y-2 sm:grid-cols-4 gap-x-4 place-items-center'>
          {Array(repeat).fill(0).map((index) =>

          <div id="product">
            <img src="https://picsum.photos/seed/picsum/200/300" className='w-40 h-40 md:w-56 md:h-56'></img>
            <p class='title'>Item name</p>
            <div class='under_lines'></div>
            <h3 class='price'>$ 12.22 </h3>
          </div>
          )}
      </div>

      <div id='action'>

          
      </div>

    </>
  )
}

export default Homepage