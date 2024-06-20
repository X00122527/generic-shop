import React, { useState, useEffect } from 'react'
import 'flowbite'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import withReactContent from 'sweetalert2-react-content'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilterSortBody from './FilterSortBody'
import { Link } from 'react-router-dom';
import AppPaths from '../../lib/appPaths';

function ProductsPage(props) {
    //20 products per page with pagination and left side bar
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        
        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
        };

        const url = ServerUrl.BASE_URL + ApiEndpoints.PRODUCTS;

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setProductList(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
            <div className='w-2/3 mx-auto'>

                <FilterSortBody {...props}></FilterSortBody>
                <div id="related-items" className='col-span-2 mt-10 '>
                    {/* product card goes here, can introduce also product slider */}
                    <h2>Related products </h2>
                    <div id='products' className='grid w-full grid-cols-2 gap-4 mx-auto mt-2 sm:grid-cols-4 place-items-center '>
                        {productList.map((product, index) => 
                            <Link to={"/" + AppPaths.PRODUCT.replace(':productId', product.id)}>
                            <div id="product" className='text-center'>
                                <img src={product.images[0].image} className='w-40 h-40 md:w-48 md:h-48'></img>
                                {/* <span>{product.images[0]}</span> */}
                                <p className='text-lg font-shadows'>{product.title}</p>
                                <p className='price'>{product.price}</p>
                            </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsPage