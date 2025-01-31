import ServerUrl from '../api/serverUrl';
import ApiEndpoints from '../api/apiEndpoints';

const setCookie = (cookieName, cookieValue, expairydays = 30) => {
    const today = new Date();
    // today.setTime(today.getTime() + expairydays * 24 * 60 * 60 * 1000);
    today.setTime(today.getTime() + 1 * 1 * 5 * 60 * 1000); // 5 mins
    let expires = "expires=" + today.toUTCString();
    console.log('expires : ',expires)
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  };
  
  const getCookie = (cookieName) => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieList = decodedCookie.split(";");
    for (let i = 0; i < cookieList.length; i++) {
      let cookie = cookieList[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  };

  const getCartId = () => {
    const cartId = localStorage.getItem("cart_id")
    if (!cartId){
      console.log('creating cart_id');
      //
      const options = {
        method: 'GET',
        headers: {
            // Authorization: "Bearer " + CookieUtil.getCookie('access'),
        },
    };

    const url = ServerUrl.BASE_URL + ApiEndpoints.CART_SESSION;

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cart id Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // populate register
            // send request to get new cart id i.e. create new cart with cart id and then set it here
            // console.log('data from cart api',);
            setCartId(data.cart_id)
            cartId = data.cart_id;
        })
        .catch(error => {
            console.error('Fetch error at getting cart id:', error);
        })
      
    }
    return cartId;
  }

  const setCartId = (cartId) => {
      localStorage.setItem('cart_id', cartId);
      document.cookie = `cart_id=${cartId}; path=/; max-age=7884000;`; // 3 months expiry
  }

  const getCartItemsCount = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart_items")) || [];
    const totalItems = existingCart.reduce((sum, item)=> sum + item.quantity, 0);
    return Number(totalItems);
  }

  const setCartItemsCount = (itemId, qty) => {
    // localStorage.getItem('cart_items').get(item)
    // if(getCartItemsCount()){
    //   localStorage.setItem('cart_items', getCartItemsCount() + qty);
    // }else{
    //   localStorage.setItem('cart_items', qty);

    // }
    // localStorage.setItem('cart_items', JSON.stringify({...JSON.parse(localStorage.getItem('cart_items')), 
    //                                     itemId: {"quantity": qty}}));

    

    const existingCart = JSON.parse(localStorage.getItem("cart_items")) || [];

    // Check if the item already exists in the cart
    const itemIndex = existingCart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      // If item exists, update the quantity
      existingCart[itemIndex].quantity = qty;
    } else {
      // Otherwise, add a new item
      existingCart.push({ id: itemId, quantity: qty });
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart_items", JSON.stringify(existingCart));

    console.log("Updated Cart:", JSON.parse(localStorage.getItem("cart_items")));
    
  }

  const deleteCookie = (cookieName) => {
    document.cookie = 
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const logoutClickHandler = () => {
    CookieUtil.deleteCookie('access');
    CookieUtil.deleteCookie('refresh');
    window.location.href = '/';
  };
  
  const CookieUtil = {
    setCookie: setCookie,
    getCookie: getCookie,
    deleteCookie: deleteCookie,
    logoutClickHandler: logoutClickHandler,
    getCartId: getCartId,
    getCartItemsCount: getCartItemsCount,
    setCartItemsCount: setCartItemsCount
  };
  
  export default CookieUtil;
  