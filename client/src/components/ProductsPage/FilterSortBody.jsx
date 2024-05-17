import React from 'react'
import { useState } from 'react'
import FilterScreen from './FilterScreen'
function FilterSortBody(props) {

    // these might be useless
    const [sort, setSort] = useState("")


    const sortProducts = async (value) => {
        // const url = AppPaths.LOUNGE + "?order=" + value;
        navigate.push(url);
    }

    return (
        <div className='flex flex-wrap justify-between gap-4 pt-2 mx-auto my-auto align-middle'>
            

            <FilterScreen></FilterScreen>
            

            <div className="">
                <select id="sort-select"
                    defaultValue={"1"}
                    // onChange={(e) => sortProducts(e.target.value)}
                    className="text-sm text-gray-500 bg-gray-100 border-0 rounded-lg appearance-none w-fit focus:outline-none focus:ring-0 focus:border-gray-200 peer bg-none">
                    <option value="latest">Latest Arrivals</option>
                    <option value="price_asc">Price: Low to high</option>
                    <option value="price_desc">Price: High to low</option>
                    <option value="trending">Popularity</option>
                </select>
                {/* <label className="" htmlFor="sort-select">Sort by:</label>  */}

            </div>

        </div>
    )
}

export default FilterSortBody