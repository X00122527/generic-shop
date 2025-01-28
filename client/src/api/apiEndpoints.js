const ApiEndpoints = {
  ORDER: "api/v1/order",
  PRODUCT: "api/v1/products/:productId",
  PRODUCTS: "api/v1/products",
  CART: "api/v1/carts",
  // ITEM_CART: "api/v1/carts/item/<itemId>", // POST, DELETE, PATCH
  // DELETE_CART_ITEM: "api/v1/cart/delete/{itemId}",
  UPDATE_CART_ITEM: "api/v1/carts/:cartId/items/:itemId",
  LOGIN: "api/v1/login",
  SIGNUP: "api/v1/signup",
  GOOGLE_AUTH: "api/v1/auth-receiver",
  USER: "api/v1/user",
  APPLY_DISCOUNT: "api/v1/apply-discount",
  SHIPPING_DETAILS: "api/v1/user/shipping-details",
  SHIPPING_PRICE: "api/v1/shipping-price/:location",
  RESET_PASSWORD: "api/v1/reset_password/",
  CART_SESSION: "api/v1/carts-session"
};

export default ApiEndpoints;
