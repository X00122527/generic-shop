import React from 'react'

function ShoppingCart() {
    const cartDetailsList = [
        {
            title: "Basic T-Shirt",
            size: 'Large',
            color: 'Black',
            price: "$11.11",
            qty: "2"
        },
        {
            title: "Oversized T-Shirt",
            size: 'Large',
            color: 'Black',
            price: "$11.11",
            qty: "2"
        },
        {
            title: "Hoodie",
            size: 'Small',
            color: 'White',
            price: "$33.00",
            qty: "1"
        }

    ]

    const getShipping = () => {
        return "FREE";
    }

    const calculateCart = () => {
        //loop through cartDetails
        let subtotal = 22.22;
        let total = 22.22;
        return {
            subtotal: subtotal,
            shipping: getShipping(),
            total: total,
        }
    }

    return (
        <div className='container grid grid-cols-12 gap-x-8 gap-y-4'>
            {/* <h1>Shopping cart</h1> */}

            <div className='grid col-span-12 border-gray-200 md:col-span-8 item-summary gap-x-2 gap-y-4 '>

                {/* for each product - display a title, price, selected options (colors,size) and quantity that can be adjusted */}
                {cartDetailsList.map((cartDetails, index) => (
                    <div className='flex py-8 gap-x-2 border-b-[1px]' key={index}>
                        <div id='img'>
                            <img src="https://picsum.photos/seed/picsum/200/200" className=''></img>
                        </div>
                        <div id='details' className='relative grow'>
                            <span className='font-mono font-semibold'>{cartDetails.title}</span>
                            <span className='absolute top-0 right-0'>X</span>
                            <p className='text-gray-600'>{cartDetails.color} | {cartDetails.size}</p>
                            <p className='font-serif text-black'>{cartDetails.price}</p>
                            <select id="qty"
                                defaultValue={cartDetails.qty}
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