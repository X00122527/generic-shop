import React, { useState, useEffect, useRef } from 'react'
import PayPalComponent from './PayPalComponent'
import GooglePayComponent from './GooglePayComponent'
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import CookieUtil from "../../util/cookieUtil";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";


function Checkout() {

    const [cartDetailsList, setCartDetailsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [discountCode, setDiscountCode] = useState("");
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0);
    const [shippingDetails, setShippingDetails] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: {}
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm({
        // defaultValues: {
        //   item_type: ItemType.Photocard,
        //   condition: Condition['Brand new'],
        //   location: "default",
        // }
    });

    useEffect(() => {
        calculateCart();

    }, [shippingDetails])

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        fetchShippingDetails();
    }, []);

    const successfulToast = (message) => {
        toast.success(message, {
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
    }

    const unsuccessfulToast = (message) => {
        toast.error(message, {
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
    }


    const calculateCart = () => {
        //loop through cartDetails
        let subtotal = 0;  // qty * price
        let total = 0;     // subtotal + shipping + taxes?
        for (let i = 0; i < cartDetailsList.length; i++) {
            subtotal += cartDetailsList[i].price * cartDetailsList[i].quantity;
        }
        console.log('subtotal', subtotal);
        setSubtotal(subtotal);
        setTotal(subtotal);
    }

    const fetchShippingPrice = async (location) => {
        // (first) have to verify that such address is correct which will probably rely on some free external API to validation - maybe at some later stage 
        // then grab prices from the database <todo>
        const options = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + CookieUtil.getCookie('access'), 
            },
        };

        const url = ServerUrl.BASE_URL + ApiEndpoints.SHIPPING_PRICE.replace(':location', location);

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // populate register
                setShippingPrice(data);
                setTotal(total+data);
                console.log("shipping price: ", data);
            })
            // .then(data => { // is this better or is finally better?
            //     console.log('data and total', data, total);
            //     // setTotal(total + data);
            // })
            .catch(error => {
                console.error('Fetch error:', error);
            })

    }

    const fetchShippingDetails = async () => {
        setIsLoading(true);

        const options = {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + CookieUtil.getCookie('access'),
            },
        };

        const url = ServerUrl.BASE_URL + ApiEndpoints.USER;

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // populate register
                setShippingDetails(data);
                console.log("shipping details: ", data);
            })
            .then(() => { // is this better or is finally better?
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            })


    }

    const fetchCartItems = async () => {

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
                setCartDetailsList(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
        setIsLoading(false);
    }

    const applyDiscount = async () => {

        setIsLoading(true);

        const body = JSON.stringify({
            code: discountCode,
        });

        const options = {
            method: 'POST',
            headers: {
                // Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + CookieUtil.getCookie('access'),

            },
            body: body,
        };

        const url = ServerUrl.BASE_URL + ApiEndpoints.APPLY_DISCOUNT;

        setTimeout(() => {
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        // throw new Error('Discount is invalid or expired.');
                        unsuccessfulToast("Discount is invalid or expired.")
                    }
                    return response.json();
                })
                .then(data => {
                    // setSubtotal(data);
                    console.log('discount data: ',data)
                    successfulToast("Discount was applied successfully.")
                    setDiscount(data);
                    setTotal(data);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }, 2000);

    }


    const onSubmit = async () => {
        // e.stopPropagation();
        e.preventDefault();
        // console.log(e);

        const formData = new FormData();
        Object.keys(listingData).forEach((key) => {

            formData.append(key, listingData[key]);
        })

        // post data here
    }

    if(isLoading){
        return <div>data is loading</div>
    }

    return (
        <div className='container grid md:grid-cols-2 gap-x-8'>
            <div id="shipping-info">
                <h1>Express Checkout</h1>
                <div className='grid grid-cols-2'>
                    <PayPalComponent></PayPalComponent>
                    <br></br>
                    <GooglePayComponent></GooglePayComponent>
                    <br></br>
                    <p>or continue with credit card</p>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <h2 className='mb-6 text-xl'>Contact</h2>

                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <div className="mb-6">
                            <input
                                {...register("email", { required: true })}
                                defaultValue={shippingDetails.email}
                                type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                        </div>
                        <h2 className='mb-6 text-xl'>Shipping address</h2>

                        <div className="mb-6">
                            <label for="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <select

                                {...register("country", { 
                                    onChange: (e) => fetchShippingPrice(e.target.value),
                                    required: true })}
                                id="country" 
                                defaultValue={shippingDetails.country} // this doesn't seem to work
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {/* <option selected>Choose a country</option> */}
                                <option value={"CA"}>Canada</option>
                                <option value={"USA"}>USA</option>
                                <option value={"IRE"}>Ireland</option>
                                <option value={"DE"}>Germany</option>
                            </select>

                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input
                                    defaultValue={shippingDetails.first_name}
                                    {...register("first_name", { required: true })}
                                    type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input
                                    defaultValue={shippingDetails.last_name}

                                    {...register("last_name", { required: true })}
                                    type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                        </div>

                        <div className="mb-6">
                            <label for="ad1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input
                                defaultValue={shippingDetails.address.line_1}
                                {...register("line_1", { required: true })}
                                type="text" id="ad1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <div className="mb-6">
                            <label for="ad2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apartment, suite, etc.(optional)</label>
                            <input
                                defaultValue={shippingDetails.address.line_2}
                                {...register("line_2", { required: false })}
                                type="text" id="ad2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>


                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <input
                                    defaultValue={shippingDetails.address.city}
                                    {...register("city", { required: true })}
                                    type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label for="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal code</label>
                                <input
                                    defaultValue={shippingDetails.address.post_code}
                                    {...register("post_code", { required: true })}
                                    type="text" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>

                        </div>


                        {/* <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div> */}
                        <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Continue</button>
                    </form>

                </div>
            </div>

            <div id="order-summary" className='p-10 bg-gray-100'>
                {cartDetailsList.map((item, index) => (
                    <div id="row" className='flex pt-2 flex-inline'>
                        <div>
                            <img className='w-20 h-16' src={item.image} />
                        </div>
                        <div className='grow'>
                            <span className='font-mono'>{item.title}</span>
                            <aside className='text-sm'>{item.option_1}</aside>
                            <aside className='text-sm'>{item.option_2}</aside>
                        </div>
                        <div>
                            <span>{item.quantity}x {item.currency} {item.price}</span>
                        </div>
                    </div>

                ))}

                <div className="flex my-4 place-content-between gap-x-2">
                    <div className='w-full'>
                        <label for="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount code</label>
                        <input
                            onChange={e => setDiscountCode(e.target.value)}
                            disabled={isLoading}
                            type="text" id="discount" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="" required />
                    </div>
                    <div>
                        <button
                            onClick={applyDiscount}
                            disabled={isLoading}
                            type="submit" className={`${isLoading ? 'bg-gray-500' : 'bg-blue-700'} mt-7 float-right text-white hover:bg-blue-800 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>
                            {isLoading ? 'Applying' : 'Apply'}</button>
                    </div>
                </div>


                <div className='grid col-span-12 pt-8 rounded-lg md:col-span-4 order-summary gap-y-4 h-fit'>
                    <div className='flex justify-between'>
                        <span>Subtotal</span>
                        <span>${subtotal || total}</span>
                    </div>
                    <hr></hr>
                    {discount !== 0 &&
                        <>
                            <div className='flex justify-between text-red-700'>
                                <span>Discount</span>
                                <span>-${subtotal - discount}</span>
                            </div>
                            <hr></hr>
                        </>
                    }
                    <div className='flex justify-between'>
                        <p>Estimated Shipping</p>
                        <span>{shippingPrice === 0 ? "Select Country" : "$" + shippingPrice}</span>

                    </div>
                    <hr></hr>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>Total</p>
                        <span>${total}</span>
                    </div>

                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default Checkout