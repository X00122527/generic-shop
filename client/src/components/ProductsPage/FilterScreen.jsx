import React from 'react'
import './filter.css'

function toggleFilterbody() {
    console.log("toggling")
    document.body.classList.toggle('filterbody-active');
    document.body.classList.toggle('noscroll');
  }

function FilterScreen() {
    return (
        <>
        <button className="w-32 h-8 bg-green-300 border-2 border-black" onClick={toggleFilterbody}>Filter</button>
        <div className="cover" onClick={toggleFilterbody}></div>


        <div className="z-50 pl-12 border-2 border-black filterbody">

            <div>
                <h1 className='text-3xl'>Filter listings</h1>
            </div>

            <div id="category">
                <fieldset>
                    <legend>
                        <h1 className="mb-4 font-semibold text-gray-900">Category</h1>
                    </legend>
                    <div>
                        <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="vue-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label for="vue-checkbox" className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">T-Shirt</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="react-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label for="react-checkbox" className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">Hoodie</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="angular-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label for="angular-checkbox" className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">Jacket</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="laravel-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label for="laravel-checkbox" className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">Other</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </fieldset>
            </div>

            <div id="size">
                <fieldset>
                    <legend>
                        <h1 className="mb-4 font-semibold text-gray-900">Sizes</h1>
                    </legend>
                    <div>
                        <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="vue-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label for="vue-checkbox" className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">Small</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="react-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label for="react-checkbox" className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">Medium</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="angular-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label for="angular-checkbox" className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">Large</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="laravel-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label for="laravel-checkbox" className="w-full py-3 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">Extra Large</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </fieldset>
            </div>

            <div>
                <fieldset>
                    <legend>
                    </legend>
                    <div>
                    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />

                    <label for="default-radio-1" className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">On Sale</label>

                    </div>
                </fieldset>

            </div>

            <div>
                <button className="w-32 h-12 bg-green-300 border-2 border-black rounded">Search items</button>
            </div>


        </div>
        </>
    )
}

export default FilterScreen