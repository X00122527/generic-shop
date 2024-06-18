import React, { useState, useEffect } from 'react'
import 'flowbite'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState({
        title: "",
        price: "",
        images: [],
        brand: "",
        description: "",
         "option_1": [], //["bg-black", "bg-yellow-500", "bg-red-500", "bg-blue-500"],
         "option_2": [] //["Small", "Medium", "Large", "ExtraLarge"],
    });

    const [choices, setChoices] = useState({
        qty: 0,
        option_1: undefined,
        option_2: undefined
    });

    
    useEffect(() => {
        fetchProduct();
    }, [])
    

    const fetchProduct = () => {
        
        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
        };

        const url = ServerUrl.BASE_URL + ApiEndpoints.PRODUCT.replace(":productId", 1);

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

    const order = () => {
        const jsonData = {
            total: "12",
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

    const addToCart = () => {
        toast.success('Item to your cart!', {
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
        console.log("add to cart was executed");
        // in the backend - since 1 user can only have 1 cart we will just create an entry on init. and keep adding/removing items to cartItems on "addToCart" / "removeFromCart" activity
        // let url = ServerUrl.BASE_URL + ApiEndpoints.ITEM_CART.replace("<itemId>", 1);
        let url = ServerUrl.BASE_URL + ApiEndpoints.CART;

        const jsonData = {
            quantity: 2,
            product: 1,
            option_1: "black",
            option_2: "Large",
        };

        const options = {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(jsonData)
        };

        // console.log('pushing: ', options.body)

        fetch(url, options)
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


    // const product = {
    //     "title": "Product Title",
    //     "price": "$100.00",
    //     "images": [
    //         "https://picsum.photos/400.jpg",
    //         "https://picsum.photos/400.jpg",
    //         "https://picsum.photos/400.jpg",
    //         "https://picsum.photos/400.jpg",
    //     ],
    //     "brand": "Brand",
    //     "options_1": ["bg-black", "bg-yellow-500", "bg-red-500", "bg-blue-500"],
    //     "options_2": ["Small", "Medium", "Large", "ExtraLarge"],
    //     "accordion_1": {
    //         "title": "Description",
    //         "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis justo iaculis, semper sem at, posuere sem. Duis eu sem vel mauris auctor consectetur eget eget orci. Mauris pharetra lorem non dolor pharetra venenatis.",
    //         "expanded": true
    //     },
    //     "accordion_2": {
    //         "title": "Product features & Details",
    //         "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis justo iaculis, semper sem at, posuere sem. Duis eu sem vel mauris auctor consectetur eget eget orci. Mauris pharetra lorem non dolor pharetra venenatis.",
    //         "expanded": false
    //     },
    //     "accordion_3": {
    //         "title": "Shipping & Returns",
    //         "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis justo iaculis, semper sem at, posuere sem. Duis eu sem vel mauris auctor consectetur eget eget orci. Mauris pharetra lorem non dolor pharetra venenatis.",
    //         "expanded": false
    //     },
    // }

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


    return (
        <div className='container grid w-full grid-cols-1 mx-auto md:grid-cols-2 gap-x-2'>

            <div id="carousel" className='col-span-2 md:col-span-1'>
                <Carousel {...getConfigurableProps()}>
                    {product.images.map((image, index) => (
                        <div key={index}>
                            <img src={image.image} />
                            {/* <span>{image}</span> */}
                        </div>
                    ))}
                </Carousel>
            </div>

            <div id="product-details" className='col-span-2 md:col-span-1 mx-[2.5%]'>
                {/* title */}
                <h1 className='text-3xl leading-tight'>{product.title}</h1>
                {/* <div className='w-7/12 under_lines'></div> */}
                {/* price */}
                <p className='text-[#272727] font-semibold'>{product.price}</p>
                {/* brand */}
                <p>By {product.brand}</p>

                {/* options go here */}
                <div className='my-2'>
                    <p className='text-sm'>Color: {product.option_1[0]}</p>
                    <div className='inline-flex items-center my-2 gap-x-2'>
                        {product.option_1.map((color, index) => (
                            <>
                                <button className={`h-6 w-6 rounded-lg ${color} focus:h-7 focus:w-7 blur:h-7 blur:w-7`}></button>
                                {/* <p>{color}</p> */}
                            </>
                        ))}
                    </div>
                </div>

                <div className='my-2'>
                    {/* <p>Sizes</p> */}

                    <div className='inline-flex my-2 gap-x-2'>
                        {product.option_2.map((size, index) => (
                            <>
                                <button className='p-1 mx-auto border-2 focus:border-2 focus:border-black'>{size}</button>
                                {/* <p>{color}</p> */}
                            </>
                        ))}
                    </div>
                </div>

                {/* call to action */}
                <hr></hr>
                <div className='my-4'>
                    <div className='my-4'>
                        <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
                        <div className="relative flex items-center ">
                            <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                            <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <button
                        onClick={addToCart}
                        type="button" className='w-full px-4 py-2 border-2 border-gray-700 rounded'>Add to cart</button>
                    <br></br>
                    <br></br>
                    <button onClick={order} type="button" className='w-full px-4 py-2 border-2 border-gray-700 rounded'>Order</button>

                </div>

                <hr></hr>

                {/* Accordion 1 e.g. Product description */}

                <div id="accordion-collapse" data-accordion="collapse" className='my-4'>
                    <div id="accordion-collapse-heading-1" className="relative inline-flex items-center w-full" data-accordion-target="#accordion-collapse-body-1" aria-expanded={accordions.accordion_1.expanded} aria-controls="accordion-collapse-body-1">
                        <span className='text-xl font-semibold'>{accordions.accordion_1.title}</span>
                        <svg data-accordion-icon className="absolute right-0 w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                        </svg>

                    </div>

                    <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                        <div className="p-5 ">
                            <p className="mb-2">{accordions.accordion_1.text}</p>
                        </div>
                    </div>
                </div>

                {/* Accordion 2 e.g.  Product features & Details */}

                <div id="accordion-collapse-2" data-accordion="collapse" className='my-4'>
                    <div id="accordion-collapse-heading-2" className="relative inline-flex items-center w-full" data-accordion-target="#accordion-collapse-body-2" aria-expanded={accordions.accordion_2.expanded} aria-controls="accordion-collapse-body-2">
                        <span className='text-xl font-semibold'>{accordions.accordion_2.title}</span>
                        <svg data-accordion-icon className="absolute right-0 w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                        </svg>

                    </div>

                    <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
                        <div className="p-5 ">
                            <p className="mb-2">{accordions.accordion_2.text}</p>
                        </div>
                    </div>
                </div>

                {/* Accordion 3 e.g. Shipping & Returns */}

                <div id="accordion-collapse-3" data-accordion="collapse" className='my-4'>
                    <div id="accordion-collapse-heading-3" className="relative inline-flex items-center w-full" data-accordion-target="#accordion-collapse-body-3" aria-expanded={accordions.accordion_3.expanded} aria-controls="accordion-collapse-body-3">
                        <span className='text-xl font-semibold'>{accordions.accordion_3.title}</span>
                        <svg data-accordion-icon className="absolute right-0 w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                        </svg>

                    </div>

                    <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
                        <div className="p-5 ">
                            <p className="mb-2">{accordions.accordion_3.text}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div id="related-items" className='col-span-2 mt-10 '>
                {/* product card goes here, can introduce also product slider */}
                <h2>Related products </h2>
                <div id='products' className='grid w-full grid-cols-2 mx-auto mt-2 gap-y-2 md:grid-cols-5 gap-x-4 place-items-stretch'>
                    {Array(5).fill(0).map((index) =>
                        <div id="product">
                            <img src="https://picsum.photos/seed/picsum/200/300" className='w-40 h-40 md:w-48 md:h-48'></img>
                            <p className='title'>Item name</p>
                            <div className='under_lines'></div>
                            <h3 className='price'>$ 12.22 </h3>
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer />

        </div>
    )
}

export default ProductPage