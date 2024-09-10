import React, { useState } from 'react'
import PayPalComponent from './PayPalComponent'
import GooglePayComponent from './GooglePayComponent'

function Checkout() {

    const [items, setItems] = useState(["1", "2"]);
    return (
        <div className='container grid md:grid-cols-2 gap-x-8'>
            <div id="shipping-info">
                <h1>Express Checkout</h1>
                <div className='grid grid-cols-2'>
                    <PayPalComponent></PayPalComponent>
                    <GooglePayComponent></GooglePayComponent>
                    <p>or continue with credit card</p>
                </div>

                <div>
                    <form>
                        <h2 className='mb-6 text-xl'>Contact</h2>

                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <div className="mb-6">
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                        </div>
                        <h2 className='mb-6 text-xl'>Shipping address</h2>

                        <div className="mb-6">
                            <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>
                            <div>
                                <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>

                        </div>

                        <div className="mb-6">
                            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>

                        <div className="mb-6">
                            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apartment, suite, etc.(optional)</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>


                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>
                            <div>
                                <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal code</label>
                                <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                            </div>

                        </div>


                        {/* <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div> */}
                        <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue</button>
                    </form>

                </div>
            </div>

            <div id="order-summary" className='p-10 bg-gray-100'>
                {items.map((cartDetails, index) => (
                    <div id="row" className='flex pt-2 flex-inline'>
                        <div>
                            <img className='w-16 h-16' src="https://picsum.photos/200/300?random=1" />
                        </div>
                        <div className='grow'>
                            <span>Description</span>
                            <aside>Item type...</aside>
                        </div>
                        <div>
                            <span>Price</span>
                        </div>
                    </div>

                ))}

                <div className="flex my-4 place-content-between gap-x-2">
                    <div className='w-full'>
                        <label for="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount code</label>
                        <input type="text" id="discount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </div>
                    <div>
                        <button type="submit" className="mt-7 float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply</button>
                    </div>
                </div>


                <div className='grid col-span-12 pt-8 rounded-lg md:col-span-4 order-summary gap-y-4 h-fit'>
                    <div className='flex justify-between'>
                        <span>Subtotal</span>
                        <span>$0</span>

                    </div>
                    <hr></hr>
                    <div className='flex justify-between'>
                        <p>Estimated Shipping</p>
                        <span>$0</span>

                    </div>
                    <hr></hr>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>Total</p>
                        <span>$0</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Checkout