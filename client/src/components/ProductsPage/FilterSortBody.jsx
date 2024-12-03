import React from 'react'
import { useState } from 'react'
import FilterScreen from './FilterScreen'
function FilterSortBody(props) {

    const [sort, setSort] = useState("")
    const [orderOption, setOrderOption] = useState("-timestamp");

    const sortProducts = async (value) => {
        let order_key = "ordering"
        setSort(order_key + "=" + value);
        setOrderOption(value);
    }

    const initSelectInput = (val) => {
        setOrderOption(val);
    }

    return (
        <div className='flex flex-wrap justify-between gap-4 pt-2 mx-auto my-auto align-middle'>
            

            <FilterScreen orderParams={sort} initSelectInput={initSelectInput}></FilterScreen>
            

            <div className="">
            <select id="sort-select"
            value={orderOption}
            onChange={(e) => sortProducts(e.target.value)}
            className="text-sm text-black bg-gray-100 border-2 border-black rounded-lg appearance-none w-fit focus:outline-none focus:ring-0 focus:border-gray-900 peer bg-none">
                <option value="-timestamp">Newest to oldest</option> *
                <option value="timestamp">Oldest to newest</option> *
                <option value="price">Price: low to high</option> 
                <option value="-price">Price: High to low</option>
            </select>

        </div>

        </div>
    )
}

export default FilterSortBody