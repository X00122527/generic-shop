import React, { useState, useEffect } from 'react'
import 'flowbite'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ServerUrl from '../../api/serverUrl';
import ApiEndpoints from '../../api/apiEndpoints';
import withReactContent from 'sweetalert2-react-content'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilterSortBody from './FilterSortBody'
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import AppPaths from '../../lib/appPaths';

function ProductsPage(props) {
    //20 products per page with pagination and left side bar
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const filter = searchParams.toString();
    const [orderData, setOrderData] = useState("");
    const [paginationArray, setPaginationArray] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    const fetchProducts = () => {
        console.log("fetching products...",filter);
        var url = ServerUrl.BASE_URL + ApiEndpoints.PRODUCTS + location.search // + "?"+filter;
        const options = {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json; charset=UTF-8",
            },
        };



        // if(query !== ""){
        //     url += query + orderData;
        // }else{
        //     url += orderData;
        // }

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("data.results: ",data.results)
                setProductList(data);
                calculatePagination({ total_pages: data.total_pages, current_page: data.current_page });
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    const calculatePagination = (pagination) => {
        var array = [];
        var add = 0;
        if (pagination.current_page === 1) {
            add = 2;
        } else if (pagination.current_page === 2) {
            add = 1;
        }

        if (pagination.current_page === pagination.total_pages - 1) {
            add = -1;
        } else if (pagination.current_page === pagination.total_pages) {
            add = -2;
        }

        for (var i = -2 + add; i <= 2 + add; i++) {
            if (pagination.current_page + (i) > 0 & pagination.current_page + (i) <= pagination.total_pages) {
                array.push(pagination.current_page + (i))
            }
        }
        setPaginationArray(array);

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
                    {productList.results.length ===0 &&
                        <p>There is no products that would match your query of {filter}</p>
                        }

                    <div id='products' className='grid w-full grid-cols-2 gap-8 mx-auto mt-2 md:grid-cols-4 '>
                        
                        {productList.results.map((product, index) => 
                            <Link to={"/" + AppPaths.PRODUCT.replace(':productId', product.id)} key={index}>
                            <div id="product" className='text-center' >
                                <img src={"http://192.168.178.82:8000" + product.images[0].thumbnail_url} className='w-full'></img>
                                {/* <span>{product.images[0]}</span> */}
                                <p className='text-md font-shadows'>{product.title}</p>
                                <p className='price'>{product.currency} {product.price}</p>
                            </div>
                            </Link>
                        )}
                    </div>
                </div>

                <div className='bottom-0 flex justify-center mt-4'>
                
                {paginationArray.map((pag, index) => (
                    <Link
                        reloadDocument
                        key={index}
                        to={location.search === "" ?
                            "?page=" + pag :
                            //replacing either ?page or &page if exists to prevent adding to url endless pages qs
                            location.search.replace(/([?&])page=\d+(&|$)/, (match, p1, p2) => p1 === '?' ? '?' : p2 ? '&' : '') + "&page=" + pag}
                        className={`${pag === productList.current_page ? "border-2" : ""} flex w-8 h-8 text-2xl border-black rounded-full justify-center items-center`}
                    >
                        {pag}
                    </Link>
                ))}
            </div>

            </div>
        </>
    )
}

export default ProductsPage