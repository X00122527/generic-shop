import React, { useState, useEffect, useContext } from 'react'
import 'flowbite'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import Accordion from '../Accordion/Accordion';
import RelatedProducts from './RelatedProducts';
import { useForm } from "react-hook-form";
import CookieUtil from "../../util/cookieUtil";
import { CartContext } from './CartContext';

const displayMode = {
    option_1: "list", // or list
    option_2: "list" // or tile
} // 

function ProductPage(props) {
    const [isLoading, setIsLoading] = useState(true);
    const { cart, setCart } = useContext(CartContext);
    let param = useParams();
    const [product, setProduct] = useState({
        title: "",
        price: "",
        images: [],
        // brand: "",
        description: "",
        qty: "1",
        option_1: [], //["bg-black", "bg-yellow-500", "bg-red-500", "bg-blue-500"],
        option_2: [], //["Small", "Medium", "Large", "ExtraLarge"],
        stock_option: []
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm({
        defaultValues: {
            quantity: 1,
        }
    });

    useEffect(() => {
        fetchProduct();
    }, [])

    // useEffect(() => {
    //     setProduct({...product, qty: calculateQty()})
    // }, [choices.qty])


    const fetchProduct = () => {

        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
        };
        const url = ServerUrl.BASE_URL + ApiEndpoints.PRODUCT.replace(":productId", Number(param.productId));
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setProduct(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    // might add this option to have 1 click order or just paypal button
    const order = () => {
        const jsonData = {
            total: choices.qty,
            user: 2
        };

        const options = {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(jsonData)
        };

        fetch(ServerUrl.BASE_URL + ApiEndpoints.ORDER, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    const addToCart = (jsonData) => {

        console.log("add to cart was executed", jsonData);

        // if(choices)

        // in the backend - since 1 user can only have 1 cart we will just create an entry on init. and keep adding/removing items to cartItems on "addToCart" / "removeFromCart" activity
        // let url = ServerUrl.BASE_URL + ApiEndpoints.ITEM_CART.replace("<itemId>", 1);
        let url = ServerUrl.BASE_URL + ApiEndpoints.CART + "/"+CookieUtil.getCartId();

        jsonData['product'] = Number(param.productId);

        // jsonData['cart_id'] = CookieUtil.getCartId(); // is it possible to move it into request.post..?

        const options = {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(jsonData, )
        };

        if (CookieUtil.getCookie('access')){
            options.headers.Authorization = "Bearer " + CookieUtil.getCookie('access'); // use this only if user is logged in
        }

        // console.log('pushing: ', options.body)

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const updatedCart = [...cart];
                const itemIndex = updatedCart.findIndex((item) => item.id === data.id);
                if (itemIndex !== -1) { // update existing cart item's quantity
                  updatedCart[itemIndex].quantity = data.quantity;
                } else { // insert new cart item
                    updatedCart.push({ id: data.id, quantity: data.quantity });
                }
                setCart(updatedCart); 
                toast.success('Item was added to your cart!', {
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
                toast.error('Please select valid option')
            });


    };

    const accordions = {
        accordion_1: {
            "title": "Description",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis justo iaculis, semper sem at, posuere sem. Duis eu sem vel mauris auctor consectetur eget eget orci. Mauris pharetra lorem non dolor pharetra venenatis.",
            "expanded": true
        },
        accordion_2: {
            "title": "Product features & Details",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis justo iaculis, semper sem at, posuere sem. Duis eu sem vel mauris auctor consectetur eget eget orci. Mauris pharetra lorem non dolor pharetra venenatis.",
            "expanded": false
        },
        accordion_3: {
            "title": "Shipping & Returns",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis justo iaculis, semper sem at, posuere sem. Duis eu sem vel mauris auctor consectetur eget eget orci. Mauris pharetra lorem non dolor pharetra venenatis.",
            "expanded": false
        },
    }



    const getConfigurableProps = () => ({
        showArrows: true,
        showStatus: true,
        showIndicators: true,
        infiniteLoop: true,
        showThumbs: true,  // while this work it will cause issues on scrolling focus
        useKeyboardArrows: true,
        autoPlay: false,
        stopOnHover: true,
        swipeable: true,
        dynamicHeight: true,
        emulateTouch: true,
        autoFocus: false,
        thumbWidth: 100,
        selectedItem: 0,
        interval: 2000,
        transitionTime: 500,
        preventMovementUntilSwipeScrollTolerance: true,
        swipeScrollTolerance: 50,
        axis: 'horizontal'
        // ariaLabel: text('ariaLabel', undefined),
    });

    // const showSwal = () => {
    //     withReactContent(Swal).fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Product has been added to your cart",
    //         showConfirmButton: false,
    //         timer: 1000
    //     });
    // }

    const getOption_1Text = () => {
        if (choices.option_1) {
            return choices.option_1
        }
        return product.option_1[0];
    }

    const getOption_2Text = () => {
        if (choices.option_2) {
            return choices.option_2
        }
        return product.option_2[0];
    }

    const calculateQty = () => {
        let stock = product.stock_option;


        for (let i = 0; i < stock.length; i++) {
            if (stock[i].option_1 === choices.option_1 & stock[i].option_2 === choices.option_2) {
                console.log(stock[i].quantity);
                return stock[i].quantity;
            }
        }
    }

    const increaseValue = () => {
        const currentValue = Number(getValues('quantity'));
        setValue('quantity', currentValue + 1);
    };

    const decreaseValue = () => {
        const currentValue = Number(getValues('quantity'));
        // if(currentValue === 1){
        //     return;
        // }
        setValue('quantity', currentValue - 1);
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='grid w-full grid-cols-1 px-1 mx-auto md:px-10 lg:px-24 md:grid-cols-2 gap-x-2'>

            <div id="carousel" className='col-span-2 md:col-span-1'>
                <Carousel {...getConfigurableProps()}>
                    {product.images.map((image, index) => (
                        <div key={index}>
                            <img src={image.image} />
                        </div>
                    ))}
                </Carousel>
            </div>
            <form onSubmit={handleSubmit(addToCart)} className="">
                <div id="product-details" className='col-span-2 md:col-span-1 mx-[2.5%]'>
                    {/* title */}
                    <h1 className='text-3xl leading-tight'>{product.title}</h1>
                    {/* <div className='w-7/12 under_lines'></div> */}
                    {/* price */}
                    <p className='text-[#272727] font-semibold'>{product.price_currency} {product.price}</p>
                    {/* brand */}
                    {/* <p>By {product.brand}</p> */}

                    {/* options go here */}
                    <div className='my-2'>
                        {/* below is probably only needed when thumbnails are in use with no text? */}
                        {/* <p className='text-sm'>Color: {getOption_1Text()}</p> */}
                        <div className='grid items-center my-2 w-fit gap-x-2'>
                            {/* this could work if I stick with tailwind color classes */}
                            {/* <button
                                onClick={()=>setChoices({...choices, option_1: option})}
                                className={`h-6 w-6 rounded-lg ${option} focus:h-7 focus:w-7 blur:h-7 blur:w-7`}></button> */}

                            {displayMode.option_1 == "tile" &&
                                product.option_1.map((option, index) => (

                                    <button key={index}
                                        onClick={() => setChoices({ ...choices, option_1: option })}
                                        className={`p-1 mx-auto border-2`}>{option}
                                    </button>
                                ))}

                            {displayMode.option_1 == "list" &&
                                <>
                                    <select
                                        {...register("option_1", { required: true })}
                                        // defaultValue={getOption_1Text}
                                        id="option_1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                                        <option selected value={""}>Choose an option</option>
                                        {product.option_1.map((option, index) => (
                                            <option
                                                key={index}
                                                value={option}>{option}</option>
                                        ))}
                                    </select>
                                    {errors.option_1 && (
                                        <p className="text-sm text-red-700">Please select an option</p>
                                    )}
                                </>
                            }

                        </div>
                    </div>

                    <div className='my-2'>
                        {/* <p>Sizes</p> */}

                        <div className='grid my-2 w-fit gap-x-2'>
                            {displayMode.option_2 == "tile" &&

                                product.option_2.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setChoices({ ...choices, option_2: option })}
                                        className={'p-1 mx-auto border-2 ' + (option == choices.option_2 ? 'border-black' : '')}>{option}</button>

                                ))}

                            {displayMode.option_2 == "list" &&
                                <>
                                    {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label> */}
                                    <select
                                        {...register("option_2", { required: true })}
                                        // defaultValue={getOption_2Text}
                                        id="option_2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option selected value={""}>Choose an option</option>
                                        {product.option_2.map((option, index) => (
                                            <option
                                                key={index}
                                                value={option}>{option}</option>
                                        ))}
                                    </select>
                                    {errors.option_2 && (
                                        <p className="text-sm text-red-700">Please select an option</p>
                                    )}
                                </>
                            }

                        </div>
                    </div>

                    {/* quantity for that specific item for option_1 and option_2 */}
                    <div className='pb-2'>
                        <span>In stock: {product.quantity}</span>
                    </div>

                    {/* call to action */}
                    <hr></hr>
                    <div className='my-4'>
                        <div className='my-4'>
                            <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
                            <div className="relative flex items-center ">
                                <button
                                    onClick={decreaseValue}
                                    type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input
                                    {...register("quantity", { required: true, max: 10, min: 1, pattern: /^(10|[1-9])$/ })}
                                    // value={(getValues("quantity"))}
                                    onChange={e => setValue('quantity', e.target.value)}
                                    type="number" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation"
                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                                <button
                                    onClick={increaseValue}

                                    type="button" id="increment-button" data-input-counter-increment="quantity-input" className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                            {errors.quantity && (
                                <p className="text-sm text-red-700">Please valid quantity (1-10).</p>
                            )}
                        </div>
                        <button
                            type="submit" className='w-full px-4 py-2 border-2 border-gray-700 rounded'>Add to cart</button>
                        <br></br>
                        <br></br>
                        {/* <button onClick={order} type="button" className='w-full px-4 py-2 border-2 border-gray-700 rounded'>Order</button> */}

                    </div>

                    <hr></hr>

                    {/* Accordion 1 e.g. Product description */}

                    <Accordion
                        title={accordions.accordion_1.title}
                        text={accordions.accordion_1.text}
                        isOp={true}
                    ></Accordion>

                    <Accordion
                        title={accordions.accordion_2.title}
                        text={accordions.accordion_2.text}
                        isOp={false}
                    ></Accordion>

                    <Accordion
                        title={accordions.accordion_3.title}
                        text={accordions.accordion_3.text}
                        isOp={false}
                    ></Accordion>


                </div>
            </form>

            <RelatedProducts keyword={""} numberOfTiles={0}></RelatedProducts>

            <ToastContainer />

        </div>
    )
}

export default ProductPage