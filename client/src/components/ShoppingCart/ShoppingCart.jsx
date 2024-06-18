import React, { useState, useEffect } from 'react'
import 'flowbite'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import 'react-toastify/dist/ReactToastify.css';

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
        return 10.50;
    }

    useEffect(() => {
        fetchCartItems();
    }, [])

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
        console.log(qty, itemId);
        const options = {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({"quantity": Number(qty)})
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
                setCartDetailsList(data); // this has to insert it back into specific place
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    const deleteItem = (itemId) => {

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
                            <img src={cartDetails.image} className='w-56 h-56'></img>
                        </div>
                        <div id='details' className='relative grow'>
                            <span className='font-mono font-semibold'>{cartDetails.title}</span>
                            <span
                                onClick={(e) => removeItem(index, itemId)}
                                className='absolute top-0 right-0'>X</span>
                            <p className='text-gray-600'>{cartDetails.option_1} | {cartDetails.option_2}</p>
                            <p className='font-serif text-black'>{cartDetails.price}</p>
                            <select id="qty"
                                defaultValue={cartDetails.quantity}
                                onChange={e => updateItem(e.target.value, cartDetails.id)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-16">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                {/* make it adjustable as per cardDetails - reactHookforms? */}
                            </select>
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
        </div>
    )

}


export default ShoppingCart