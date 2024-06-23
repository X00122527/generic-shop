import React, { useState, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import AppPaths from '../../lib/appPaths';

function RelatedProducts({ numberOfTiles, keyword }) {
    // here I think I will just query the API based on the keyword and try to find some similarities - idk how yet so for now I will just grap 5 latest ones
    const [productList, setProductList] = useState([]);

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
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }


    return (
        <div id="related-items" className='col-span-2 mt-10 '>
            {/* product card goes here, can introduce also product slider */}
            <h2 className='text-xl font-roboto'>Related items </h2>
            <div id='products' className='grid w-full grid-cols-2 gap-4 mx-auto mt-2 sm:grid-cols-4 '>
                {productList.map((product, index) =>
                    <Link to={"/" + AppPaths.PRODUCT.replace(':productId', product.id)} key={index}>
                        <div id="product" className='text-center' >
                            <img src={product.images[0].image} className='w-full'></img>
                            {/* <span>{product.images[0]}</span> */}
                            <p className='truncate text-md font-shadows'>{product.title}</p>
                            {/* <div className='under_lines'></div> */}
                            <p className='price'>{product.currency} {product.price}</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default RelatedProducts