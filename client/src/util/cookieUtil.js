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
    getCartId: getCartId
  };
  
  export default CookieUtil;
  