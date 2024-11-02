import React, { useState } from 'react'
import logo from '../../../custom-files/logo.png'
import AppPaths from '../../lib/appPaths'
import { useNavigate } from "react-router-dom";
import CommonUtil from "../../util/commonUtil";
// basic responsive navbar consisting of logo, searchbar and menu 

//using > ttps://flowbite.com/docs/components/navbar/ - while navbar is going to be configurable via admin panel - I think the jsx/html should be re-generated upon update rather than extracting settings from db
function Navbar() {

  const [searchText, setSearchText] = useState("");
  let navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate({pathname: "/shop",
      search: "title="+searchText});
    };


  return (

    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center max-w-screen-xl p-4 mx-auto ">
        {/* logo */}
        <div className='order-2 md:order-1'>
          <a href={AppPaths.HOME} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-24" alt="Logo" />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Company</span> */}
          </a>
        </div>
        {/* search */}
        <div className="flex order-1 md:order-2 md:grow">
          <div className="relative hidden mx-auto md:w-2/3 md:block">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <form onSubmit={(e) => handleOnSubmit(e)}>
            <input
            value={searchText}
            onInput={e => setSearchText(e.target.value)}
              type="text" id="search-navbarx" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search.." />
            </form>
          </div>
          <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        {/* mobi nav */}
        <div className="items-center order-3 hidden w-full justify-items-center md:flex md:w-auto" id="navbar-search">
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
            type="text" id="search-navbar" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
          </div>
          {/* home | about shop */}
          <ul className="flex flex-col order-last p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" className="block px-3 py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href={AppPaths.SHOP} className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Shop</a>
            </li>
          </ul>

        </div>
        {/* cart */}
        <div id='action-icons' className='flex flex-wrap items-center order-2 px-4 ml-auto'>
          <div id='cart' className=''>
          <a href={AppPaths.CART}>
            <svg className='w-6' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.53 122.88"><title>shopping-bag</title><path d="M4.93,30.34H27.41V25.76a25.77,25.77,0,0,1,51.53,0v4.58H101.6a4.91,4.91,0,0,1,3.47,1.45h0a4.9,4.9,0,0,1,1.44,3.48v69.9a17.75,17.75,0,0,1-17.7,17.7H17.7A17.75,17.75,0,0,1,0,105.18V35.28A4.91,4.91,0,0,1,1.45,31.8h0a4.91,4.91,0,0,1,3.47-1.45Zm28.76,0h39V25.76a19.49,19.49,0,0,0-39,0v4.58Zm-6.28,13V36.62H6.28v62h94V36.62H78.94v6.76a6.48,6.48,0,1,1-6.28-.12V36.62h-39v6.71a6.48,6.48,0,1,1-6.28,0Z" /></svg>
            </a>
          </div>
          <span className='absolute pl-2 text-xs font-bold'>0</span>
          
          {/* login */}
          <div id="login" className=''>
            <a href={`${CommonUtil.getUserId() ? AppPaths.USER : AppPaths.LOGIN} `}> <svg xmlns="http://www.w3.org/2000/svg" className='w-16' viewBox="0 0 200 200" xml:space="preserve"><path fill="#282828" d="M135.832 140.848h-70.9c-2.9 0-5.6-1.6-7.4-4.5-1.4-2.3-1.4-5.7 0-8.6l4-8.2c2.8-5.6 9.7-9.1 14.9-9.5 1.7-.1 5.1-.8 8.5-1.6 2.5-.6 3.9-1 4.7-1.3-.2-.7-.6-1.5-1.1-2.2-6-4.7-9.6-12.6-9.6-21.1 0-14 9.6-25.3 21.5-25.3s21.5 11.4 21.5 25.3c0 8.5-3.6 16.4-9.6 21.1-.5.7-.9 1.4-1.1 2.1.8.3 2.2.7 4.6 1.3 3 .7 6.6 1.3 8.4 1.5 5.3.5 12.1 3.8 14.9 9.4l3.9 7.9c1.5 3 1.5 6.8 0 9.1-1.6 2.9-4.4 4.6-7.2 4.6zm-35.4-78.2c-9.7 0-17.5 9.6-17.5 21.3 0 7.4 3.1 14.1 8.2 18.1.1.1.3.2.4.4 1.4 1.8 2.2 3.8 2.2 5.9 0 .6-.2 1.2-.7 1.6-.4.3-1.4 1.2-7.2 2.6-2.7.6-6.8 1.4-9.1 1.6-4.1.4-9.6 3.2-11.6 7.3l-3.9 8.2c-.8 1.7-.9 3.7-.2 4.8.8 1.3 2.3 2.6 4 2.6h70.9c1.7 0 3.2-1.3 4-2.6.6-1 .7-3.4-.2-5.2l-3.9-7.9c-2-4-7.5-6.8-11.6-7.2-2-.2-5.8-.8-9-1.6-5.8-1.4-6.8-2.3-7.2-2.5-.4-.4-.7-1-.7-1.6 0-2.1.8-4.1 2.2-5.9.1-.1.2-.3.4-.4 5.1-3.9 8.2-10.7 8.2-18-.2-11.9-8-21.5-17.7-21.5z" /></svg>
          </a>
          </div>
        </div>
      </div>
    </nav>
  )
}


export default Navbar