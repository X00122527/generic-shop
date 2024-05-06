import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
function ProductPage() {

    console.log("in product page");

    const product = {
        "title": "Product Title",
        "price": "$100.00",
        "images": [
            "https://picsum.photos/400.jpg",
            "https://picsum.photos/400.jpg",
            "https://picsum.photos/400.jpg",
            "https://picsum.photos/400.jpg",
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis justo iaculis, semper sem at, posuere sem. Duis eu sem vel mauris auctor consectetur eget eget orci. Mauris pharetra lorem non dolor pharetra venenatis.",
        "brand": "Brand",
        "options_1": ["bg-black", "bg-yellow-500", "bg-red-500", "bg-blue-500"],
        "options_2": ["S", "M", "L", "XL"]
    }

    const getConfigurableProps = () => ({
        showArrows: true,
        showStatus: true,
        showIndicators: true,
        infiniteLoop: true,
        showThumbs: false,  // while this work it will cause issues on scrolling focus
        useKeyboardArrows: true,
        autoPlay: false,
        stopOnHover: true,
        swipeable: true,
        dynamicHeight: true,
        emulateTouch: true,
        autoFocus: false,
        thumbWidth: 100,
        selectedItem: 0,
        interval: 2000,
        transitionTime:  500,
        preventMovementUntilSwipeScrollTolerance: true,
        swipeScrollTolerance: 50,
        axis: 'horizontal'
        // ariaLabel: text('ariaLabel', undefined),
    });


  return (
    <div className='grid w-full grid-cols-1 mx-auto md:grid-cols-2 md:w-3/4 gap-x-4'>

        <div id="carousel">

        <Carousel {...getConfigurableProps()}>
            {product.images.map((image, index) => (
                <div key={index}>
                    <img src={image}  />
                </div>
                ))} 
            </Carousel>
        </div>

        <div id="product-details" className=''>
                <h2>{product.title}</h2>
                <p>By {product.brand}</p>

                {/* options go here */}
                <p>Color </p>
                <div className='inline-flex gap-x-2'>
                    {product.options_1.map((color, index) => (
                        <>
                        <div className={`h-6 w-6 rounded-lg ${color}`}></div>
                        {/* <p>{color}</p> */}
                        </>
                    ))}
                </div>
                
                <p>Sizes</p>
                <div className='inline-flex gap-x-2 '>
                    {product.options_2.map((size, index) => (
                        <>
                        <div className='w-6 h-6 mx-auto border-2 '>{size}</div>
                        {/* <p>{color}</p> */}
                        </>
                    ))}
                </div>


        </div>

        <div id="related-items" className='col-span-2 mt-10'>
            {/* product card goes here */}
            <h2>Related products</h2>
            <div id='products' className='grid w-full grid-cols-2 mx-auto mt-2 gap-y-2 sm:grid-cols-4 gap-x-4 place-items-center'>
          {Array(4).fill(0).map((index) =>

          <div id="product">
            <img src="https://picsum.photos/seed/picsum/200/300" className='w-40 h-40 md:w-48 md:h-48'></img>
            <p class='title'>Item name</p>
            <div class='under_lines'></div>
            <h3 class='price'>$ 12.22 </h3>
          </div>
          )}
      </div>
        </div>

    </div>
  )
}

export default ProductPage