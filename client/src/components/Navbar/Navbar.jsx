import React, { useEffect, useState } from 'react'
import logo from '../../../custom-files/logo.png'
import AppPaths from '../../lib/appPaths'
import { useNavigate } from "react-router-dom";
import CommonUtil from "../../util/commonUtil";
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import CookieUtil from '../../util/cookieUtil';
// import { useCart } from '../ProductPage/CartProvider';
// basic responsive navbar consisting of logo, searchbar and menu 


//using > ttps://flowbite.com/docs/components/navbar/ - while navbar is going to be configurable via admin panel - I think the jsx/html should be re-generated upon update rather than extracting settings from db
function Navbar() {

  const [searchText, setSearchText] = useState("");
  let navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cart_id = CookieUtil.getCartId();
    const url = ServerUrl.BASE_URL + ApiEndpoints.CART+"/"+cart_id;

    const options = {
      method: 'GET',
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json; charset=UTF-8",
      },
      // body: JSON.stringify({cart_id: cart_id})
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.items);
        setCartCount(data.total_items);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    
  }, []);


  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/shop",
      search: "title=" + searchText
    });
  };



  console.log("user id is: ", CommonUtil.getUserId())

  return (

    <nav className="bg-white border-b-2 border-gray-300 dark:bg-gray-900">
      <div className="flex flex-wrap items-center max-w-screen-xl p-1 mx-auto ">
        {/* logo */}
        <div className='order-2 ml-auto w-fit md:order-1'>
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
        <div className="items-center order-2 hidden w-full justify-items-center md:flex md:w-auto" id="navbar-search">
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

        {/* icons */}
        <div id='action-icons' className='flex flex-wrap items-center order-3 px-4 ml-auto w-fit'>
          {/* cart */}
          <div id='cart' className='relative'>
            <a href={AppPaths.CART}>
            <svg className="w-10 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
</svg>

              {!isLoading &&
              <>
                <span class="absolute top-0 right-0 bg-red-800 text-white text-xs font-medium px-1 rounded-full dark:bg-red-900 dark:text-red-300">{cartCount}</span>
              </>
            }
              

            </a>
          </div>
          {/* <span className='absolute pl-2 text-xs font-bold'>
            {!isLoading &&
              <>
                {cartCount}
              </>
            }
          </span> */}

          {/* login */}
          <div id="login" className=''>
            <a href={`${CommonUtil.getUserId() ? AppPaths.USER : AppPaths.LOGIN} `}> 
            <svg className="w-10 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-width="1.5" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>

            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}


export default Navbar