import React, { useState, useEffect } from 'react'
import 'flowbite'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import AppPaths from '../../lib/appPaths';

function ShoppingCart() {

    const [cartDetailsList, setCartDetailsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        if (cartDetailsList.length > 0) {
            return 10.50;
        }
        return 0;
    }

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {

        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
        };

        const url = ServerUrl.BASE_URL + ApiEndpoints.CART;

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setCartDetailsList(data);
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
            shipping: getShipping(),
            total: subtotal + getShipping(),
        }
    }


    const updateItem = (qty, itemId) => {
        const options = {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ "quantity": Number(qty) })
        };

        const url = ServerUrl.BASE_URL + ApiEndpoints.UPDATE_CART_ITEM.replace(":itemId", itemId);
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
                setCartDetailsList([data]); // this has to insert it back into specific place
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

        const url = ServerUrl.BASE_URL + ApiEndpoints.UPDATE_CART_ITEM.replace(":itemId", itemId);
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

    const removeItem = (index, itemId) => {
        setCartDetailsList(cartDetailsList.filter((cart, i) => i !== index))
        deleteItem(itemId);
        calculateCart();
    }

    return (
        <div className='container grid grid-cols-12 gap-x-8 gap-y-4'>
            {/* <h1>Shopping cart</h1> */}

            <div className='grid col-span-12 border-gray-200 md:col-span-8 item-summary gap-x-2 gap-y-4 '>

                {/* for each product - display a title, price, selected options (colors,size) and quantity that can be adjusted */}
                {cartDetailsList.map((cartDetails, index) => (
                    <div className='flex py-8 gap-x-2 border-b-[1px]' key={index}>
                        <div id='img'>
                    <Link to={"/" + AppPaths.PRODUCT.replace(':productId', cartDetails.product)}>

                            <img src={cartDetails.image} className='w-56 h-56'></img>
                    </Link>

                        </div>
                        <div id='details' className='relative grow'>
                            <span className='font-mono font-semibold'>{cartDetails.title}</span>

                            <span
                                onClick={(e) => removeItem(index, cartDetails.id)}
                                className='absolute top-0 right-0'>X</span>
                            <p className='text-gray-600'>{cartDetails.option_1} | {cartDetails.option_2}</p>
                            <p className='font-serif text-black'>{cartDetails.price}</p>

                            <div className='absolute bottom-0 my-4'>
                                <div className="relative flex items-center ">
                                    <button 
                                    onClick={e => updateItem(cartDetails.quantity-1, cartDetails.id)}
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
                                    onClick={e => updateItem(cartDetails.quantity+1, cartDetails.id)}
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

            <div className='grid col-span-12 p-8 bg-gray-100 rounded-lg md:col-span-4 order-summary gap-y-4 h-fit'>
                <h1 className='mb-4 text-2xl'>Order Summary</h1>
                <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span>{calculateCart().subtotal}</span>
                </div>
                <hr></hr>
                <div className='flex justify-between'>
                    <p>Estimated Shipping</p>
                    <span>{calculateCart().shipping}</span>
                </div>
                <hr></hr>
                <div className='flex justify-between'>
                    <p className='font-semibold'>Total</p>
                    <span>{calculateCart().total}</span>

                </div>
                <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm w-full py-2.5 text-center me-2 mb-2">
                    Checkout</button>
            </div>
            <ToastContainer />
        </div>
    )

}


export default ShoppingCart