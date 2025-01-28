import React, { useState, useEffect } from 'react'
import 'flowbite'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import AppPaths from '../../lib/appPaths';
import CommonUtil from '../../util/commonUtil';
import CookieUtil from '../../util/cookieUtil';

function ShoppingCart() {

    const [cartDetailsList, setCartDetailsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currency, setCurrency] = useState('');

    // const cartDetailsList = [
    //     {
    //         title: "Basic T-Shirt",
    //         size: 'Large',
    //         color: 'Black',
    //         price: "$11.11",
    //         qty: "2"
    //     },
    //     {
    //         title: "Oversized T-Shirt",
    //         size: 'Large',
    //         color: 'Black',
    //         price: "$11.11",
    //         qty: "2"
    //     },
    //     {
    //         title: "Hoodie",
    //         size: 'Small',
    //         color: 'White',
    //         price: "$33.00",
    //         qty: "1"
    //     }
    // ]

    const getShipping = () => {
        if (CommonUtil.getUserId()) {
            // todo: send a query to database against the address
            return 10.50;
        }
        return 0;
    }

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
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
                console.log(data);
                setCartDetailsList(data.items);
                setCurrency(data.items[0].currency)
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    const calculateCart = () => {
        //loop through cartDetails
        let subtotal = 0;  // qty * price
        let total = 0;     // subtotal + shipping + taxes?
        for (let i = 0; i < cartDetailsList.length; i++) {
            subtotal += cartDetailsList[i].price * cartDetailsList[i].quantity;
        }
        console.log(subtotal);
        return {
            subtotal: subtotal,
            shipping: getShipping() == 0 ? "Calculated at next step" : getShipping(),
            total: subtotal + getShipping(),
        }
    }


    const updateItem = (qty, itemId) => {

        if (qty === 0) {
            removeItem(itemId);
            return;
        }

        const options = {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ "quantity": Number(qty) })
        };
        const cartId = CookieUtil.getCartId();
        const url = ServerUrl.BASE_URL + ApiEndpoints.UPDATE_CART_ITEM.replace(":itemId", itemId).replace(":cartId", cartId);
        console.log(options.body);

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("updated Item: ", data);

                // setCartDetailsList([data]); // this has to insert it back into specific place
                setCartDetailsList(prevItems => 
                    prevItems.map(item => 
                        item.id === itemId
                        ? data
                        : item
                    )
                );

                toast.success('Cart was updated.', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    const deleteItem = (itemId) => {
        const options = {
            method: 'DELETE',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
        };
        const cartId = CookieUtil.getCartId();
        const url = ServerUrl.BASE_URL + ApiEndpoints.UPDATE_CART_ITEM.replace(":itemId", itemId).replace(":cartId", cartId);
        console.log(options.body);

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                toast.success('Item was removed from your cart', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
                toast.error('Something went wrong.')
            });
    }

    const removeItem = (itemId) => {
        console.log(cartDetailsList);
        setCartDetailsList(cartDetailsList.filter(item => item.id !== itemId));
        deleteItem(itemId);
        calculateCart();
    }

    return (
        <div className='grid grid-cols-12 mx-1 md:container gap-x-8 gap-y-4'>


            <div className='grid col-span-12 border-gray-200 md:col-span-8 item-summary gap-x-2 gap-y-4 '>
                <h1 className='text-3xl'>Shopping cart</h1>

                {cartDetailsList.length === 0 &&
                    <div>
                        <p>Your cart is empty.</p>
                        <Link to={AppPaths.SHOP}>
                            <p className='p-2 my-4 border-2 border-black rounded-full w-fit'>Return to shop</p>
                        </Link>
                    </div>
                }

                {/* <div id='products' className='flex-row w-full gap-8 mx-auto mt-2 '> */}
                {/* for each product - display a title, price, selected options (colors,size) and quantity that can be adjusted */}
                {cartDetailsList.map((cartDetails, index) => (
                    <div className='flex py-8 gap-x-2 border-b-[1px] w-full' key={cartDetails.id}>
                        <div className='shrink '>
                            {/* <Link to={"/" + AppPaths.PRODUCT.replace(':productId', cartDetails.product)}> */}

                                <img src={"http://192.168.178.82:8000" + cartDetails.thumbnail_url} className='object-contain w-full h-auto'></img>
                            {/* </Link> */}
                            </div>

                        <div id='details' className='relative overflow-hidden grow min-w-[150px]'>
                            <span className='font-mono font-semibold'>{cartDetails.title}</span>

                            <span
                                onClick={(e) => removeItem(cartDetails.id)}
                                className='absolute top-0 right-0 cursor-pointer'>
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                </svg>


                            </span>
                            <p className='text-gray-600'>{cartDetails.option_1} | {cartDetails.option_2}</p>
                            <p className='font-serif text-black'>{currency}{cartDetails.price}</p>

                            <div className='absolute bottom-0 my-4'>
                                <div className="relative flex items-center ">
                                    <button
                                        onClick={e => updateItem(cartDetails.quantity - 1, cartDetails.id)}
                                        type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <input
                                        defaultValue={cartDetails.quantity}
                                        value={cartDetails.quantity}
                                        onChange={e => updateItem(e.target.value, cartDetails.id)}

                                        type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-12 py-2.5 " placeholder="1" required />
                                    <button
                                        onClick={e => updateItem(cartDetails.quantity + 1, cartDetails.id)}
                                        type="button" id="increment-button" data-input-counter-increment="quantity-input" className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>

                            </div>


                        </div>
                    </div>
                ))}
                </div>

            {/* </div> */}

            <div className='grid col-span-12 p-8 rounded-lg md:col-span-4 order-summary gap-y-4 h-fit'>
                {cartDetailsList.length !== 0 &&
                    <>
                        <h1 className='mb-4 text-2xl'>Order Summary</h1>
                        <div className='flex justify-between'>
                            <span>Subtotal</span>
                            <span>{currency}{calculateCart().subtotal}</span>
                        </div>
                        <hr></hr>
                        <div className='flex justify-between'>
                            <p>Estimated Shipping</p>
                            {/* <span>{typeof (calculateCart().shipping)}</span> */}
                            <span className='text-right'>{typeof (calculateCart().shipping) === "string" ? "" : currency}{calculateCart().shipping}</span>
                        </div>
                        <hr></hr>
                        <div className='flex justify-between'>
                            <p className='font-semibold'>Total</p>
                            <span>{currency}{calculateCart().total}</span>

                        </div>
                        <a href={AppPaths.CHECKOUT} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm w-full py-2.5 text-center me-2 mb-2">
                            Checkout</a>
                    </>
                }
            </div>
            <ToastContainer />
        </div>
    )

}


export default ShoppingCart