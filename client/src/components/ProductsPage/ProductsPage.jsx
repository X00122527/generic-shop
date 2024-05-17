import React from 'react'
import FilterSortBody from './FilterSortBody'

function ProductsPage(props) {
    //20 products per page with pagination and left side bar
    return (
        <>
            <div className='w-2/3 mx-auto'>

                <FilterSortBody {...props}></FilterSortBody>
                <div id="related-items" className='col-span-2 mt-10 '>
                    {/* product card goes here, can introduce also product slider */}
                    <h2>Related products </h2>
                    <div id='products' className='grid w-full grid-cols-2 gap-4 mx-auto mt-2 sm:grid-cols-4 place-items-center '>
                        {Array(20).fill(0).map((index) =>

                            <div id="product" className='text-center'>
                                <img src="https://picsum.photos/seed/picsum/200/300" className='w-40 h-40 md:w-48 md:h-48'></img>
                                <p className='text-lg font-shadows'>Item name</p>
                                <p className='price'>$ 12.22 </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsPage