export const API_ENDPOINTS = {
  USER_LOGIN: "/user/login",
  USER_REGISTER: "/user/register",
  USER_ACTIVATION: "/user/activate-user",
  USER_FORGOT_PASSWORD: "/user/forgot-password",

  USER_RESET_PASSWORD_WITHCODE: "/user/reset-password-withcode",
  USER_RESET_PASSWORD: "/user/reset-password",
  USER_LOGOUT: "admin/logout",
  ATTRIBUTES: "attributes",

  /**
   * auth pages
   */

  /***UNAUTHENTICATED REQUESTS */
  LIST_ALL_PROPERTIES: "/listing",

  /***Program service types */
  LIST_ALL_PROGRAMTYPES: "/sevice-type",

  /***Property service types */
  LIST_ALL_PROPERTYTYPES: "/property-type",

  /***AUTHENTICATED REQUESTS BELOW HERE */
  /**Chariz my propert */
  CHARIZ_A_PROPERTY: "/listing/chariz-my-property",
  CHARIZ_VENDORS_GET_PROPERTIES: "/listing/managers/properties",
  GET_CHARIZ_VENDORS_GET_PROPERTIES: "/vendorlisting/get/listings",

  LIKE_A_PROPERTY: "/user/favorite-list",
  UNLIKE_A_PROPERTY: "/user/unfavorite-list",

  /**creatinf reservertion on a properties */
  RESERVE_A_PROPERTY: "/bookings/listing/reserve-a-stay",

  /**Get Reservations of Vendors */
  GET_RESERVATIONS: "/bookings*/listing/get-reservations",
  GET_RESERVATIONS_BY_LISTING_ID: "/bookings/reservations",

  //Managing Users-booked trips and reservations  get-listing-reservations/:id
  GET_MY_TRIPS_BY: "/listing/get-mytrips",

  GET_USER_TRIPS: "/bookings/get-my-reservations",
  GET_USER_SINGLE_TRIP: "/bookings/get-reservation",
  GET_INVIEW_USER_TRIP: "/inview/user-trip",

  UPDATE_RESERVATIONS_ON_PAYMENT: "/bookings/update-reservation-on-payment",

  /******
   * ############FOOD MART APP SERVER_URLs Start Here##############
   */
  /**Add to food mart */
  GET_FOODCART: "/foodmarts/get-foodcart-items",
  ADD_TO_FOODCART: "/foodmarts/addto-foodcart-items",
  UPDATE_FOODCART_QTY: "/foodmarts/increase-decrease-foodcart-item",

  CREATE_FOOD_ORDER: "/foodmarts/pay-and/create-food-order",

  GET_USER_FOOD_ORDER_LIST: "/foodmarts/food-orders/list",
  /******
   * ########################FOOD MART APP SERVER_URLs EDNs Here===========
   * ----------------------------------------------------------------------------------------------
   */

   /******
   * ############FOOD MART APP SERVER_URLs Start Here##############
   */
  /**Add to commodity mart */
  GET_MY_CART: "/cart/get-cart-items",
  ADD_TO_CART: "/cart/addto-cart-items",
  UPDATE_CART_QTY: "/cart/increase-decrease-cart-item",
  REMOVE_CART_ITEM: "/cart/remove-item",

  PAY_AND_PLACE_ORDER: "/userorders/pay-and-create-order"
  /******
   * ########################FOOD MART APP SERVER_URLs EDNs Here===========
   * ----------------------------------------------------------------------------------------------
   */
};
