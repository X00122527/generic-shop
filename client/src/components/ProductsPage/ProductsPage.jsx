import React, { useState, useEffect } from 'react'
import 'flowbite'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import withReactContent from 'sweetalert2-react-content'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilterSortBody from './FilterSortBody'
import { Link, useSearchParams } from 'react-router-dom';
import AppPaths from '../../lib/appPaths';

function ProductsPage(props) {
    //20 products per page with pagination and left side bar
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const filter = searchParams.toString();

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    const fetchProducts = () => {
        console.log("fetching products...",filter);
        
        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
        };

        const url = ServerUrl.BASE_URL + ApiEndpoints.PRODUCTS + "?"+filter;

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProductList(data.results);
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
            <div className='px-1 mx-auto md:px-10 lg:px-24'>

                <FilterSortBody {...props}></FilterSortBody>
                <div id="related-items" className='col-span-2 mt-10 '>
                    {/* product card goes here, can introduce also product slider */}
                    {productList.length ===0 &&
                        <p>There is no products that would match your query of {filter}</p>
                        }

                    <div id='products' className='grid w-full grid-cols-2 gap-4 mx-auto mt-2 md:grid-cols-4 '>
                        
                        {productList.map((product, index) => 
                            <Link to={"/" + AppPaths.PRODUCT.replace(':productId', product.id)} key={index}>
                            <div id="product" className='text-center' >
                                <img src={product.images[0].image} className='w-full'></img>
                                {/* <span>{product.images[0]}</span> */}
                                <p className='text-md font-shadows'>{product.title}</p>
                                <p className='price'>{product.currency} {product.price}</p>
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