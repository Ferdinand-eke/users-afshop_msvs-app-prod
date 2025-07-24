import axios from "axios";
// const Cookies = require('js-cookie');
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "./serverEndpoints/endpoints";

/**
 * ####MAIN ENDPOINTS STARTS
 */
/******Digital Ocean : Curent Production Main server*/

const baseDomain = import.meta.env.VITE_API_BASE_URL_PROD;   /**production & dev */



/**##############################
 * ####MAIN ENDPOINTS ENDS
 ##################################*/

export const customHeaders = {
  Accept: "application/json",
};

export const baseUrl = `${baseDomain}`;

export function Api() {
  const Api = axios.create({
    baseURL: baseUrl,
    headers: customHeaders,
  });

  return Api;
}

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};

//## ========================================Client login==================================
/***
 * CLIENT USSERS AUTHENTICATION STARTS HERE
 */
export const preSignUp = (formData) =>
  Api().post("/authuser/pre-signup", formData);

export const preSignUpWithOtp = (formData) =>
  Api().post("/auth-user/pre-signup-with-otp", formData); //(Msvs => Done)

export const preUserRegistration = (formData) =>
  Api().post("/authuser/register-preuser", formData);

export const preUserRegistrationWithOtp = (formData) =>
  Api().post("/auth-user/otp-register-preuser", formData); // (Msvs => Done)

  /****UN-AUTHENTICATED USER Forgot_PAss FLOW STARTs */
export const clientForgotPassword = (formData) =>
  Api().post("/authuser/forgot-password", formData);

export const clientResetPassword = (formData) =>
  Api().post("/authuser/reset-password ", formData);

  export const clientForgotPasswordWithOtp = (formData) => Api().post("/auth-user/forgot-password/with-otp", formData); // (Done => Mcsvs)



export const clientResetPasswordFromOtp = (formData) =>
  Api().post("/auth-user/reset-password/from-otp ", formData); // (Done => Mcsvs)
  /****UN-AUTHENTICATED USER Forgot_PAss FLOW ENDS */

// /reset-password
export const clientSigin = (formData) =>
  Api().post("/auth-user/login", formData); //(Done => Mcsvs)

export const clientRegister = (formData) =>
  Api().post("/authuser/register", formData);

/***
 * CLIENT USSERS AUTHENTICATION ENDS HERE
 */



//GET AUTHENTICATE USER WITH TOKEN REQUES

//SHopPlans Routes
export const getShopPlans = () => Api().get("/shopplans");
export const getShopPlanById = (id) => Api().get(`/shopplans/${id}`);

//============================================Client login end========================================================//

//========================================Blog Post Routes ends==============================================
export const getAfPosts = () => Api().get("/posts");
export const getAfPostById = (id) => Api().get(`/posts/${id}`);

export const getAfPostsByCategory = (category) =>
  Api().get(`/posts/category/${category}`);
//=============================================Blog Post Routes ends==============================================
//========================================Market Routes
export const getAfMarkets = () => Api().get("/markets");
export const getMarketById = (id) => Api().get(`/markets/${id}`);
export const getMarketsByStateId = (id) => Api().get(`/markets/states/${id}`);
export const getMarketsByLgaId = (id) => Api().get(`/markets/lga/${id}`);

// export const updateMarketById = (id, marketFormData) =>
//   authApi().put(`/markets/${id}`, marketFormData);

// export const createMarket = (marketFormData) =>
//   authApi().post('/markets', marketFormData);
//==========================================Market Routes end==========================================================//
//###############################################################################
//========================================L.G.As  Routes starts
export const getLgasByStateId = (id) => Api().get(`/buz-lgas/state/${id}`);

//###############################################################################
//========================================States Toutes
export const getBStates = () => Api().get("/buzstates");
export const getStateById = (id) => Api().get(`/buzstates/${id}`);

// export const updateStateById = (id, stateFormData) =>
//   authApi().put(`/buzstates/${id}`, stateFormData);

// export const createBState = (stateFormData) =>
//   authApi().post('/buzstates', stateFormData);
export const getStateByCountryId = (cid) =>
  Api().get(`/buzstates/operational/country/${cid}`);
//=========================================States Toutes end===========================================================//

//========================================Countries Routes
export const getBCountries = () => Api().get("/buzcountries");

export const getBOperationalCountries = () => {
  return Api().get("/buzcountries/operational");
};

export const getCountryById = (id) => Api().get(`/buzcountries/${id}`);

// export const updateCountryById = (id, countryFormData) =>
//   authApi().put(`/buzcountries/${id}`, countryFormData);

// export const createCountry = (countryFormData) =>
//   authApi().post('/buzcountries', countryFormData);
//=========================================Countries Routes===========================================================//

//Tradehubs Routes
export const getTradehubs = () => Api().get("/tradehubs");
export const getTradehubById = (id) => Api().get(`/tradehubs/${id}`);

//Product Categories Routes
export const getProdCats = () => Api().get("/productcats");
export const getFeaturedProdCats = () =>
  Api().get("/productcats/featured/product-category");
export const getProdCatById = (id) => Api().get(`/productcats/${id}`);

//Post Categories Routes
export const getPostCategories = () => Api().get("/postcats");
// export const getProdCatById = (id) => Api().get(`/productcats/${id}`);

//Market Categories Routes
export const getServerMarketCategories = () => Api().get("/marketcategories");
export const getFeaturedMarketCategories = () =>
  Api().get("/marketcategories/featured/marketcategory");

//Gender Routes
export const getApiGenders = () => Api().get("/genders");

//========================================Product Routes===============================================================
// export const getProducts = () => Api().get('/clientusersproducts');

export const getProducts = (
  name = "",
  pageNumber = "",
  seller = "",
  category = "",
  order = "",
  min = 0,
  max = 0,
  rating = 0
) =>
  Api().get(
    `/clientusersproducts?name=${name}&pageNumber=${pageNumber}&seller=${seller}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
  );

export const getAllProducts = () => Api().get(`/clientusersproducts`);


export const getProductById = (id) => Api().get(`/clientusersproducts/${id}`);
export const getProductByCategory = (category) =>
  Api().get(`/clientusersproducts/category/${category}`);
export const getUserCartProductsById = (payload) =>
  Api().get(`/clientusersproducts/cart?${payload}`);

//==========================Get Markets Routes=====================================
export const getApiMarkets = () => Api().get(`/markets`);

export const getApiMarketByStateId = (id) => Api().get(`/markets/states/${id}`);
//${payload}
export const getApiMarketByStateIdAndSearch = (id) =>
  Api().get(`/markets/querystates/${id}`);

export const getApiMarketsByMarketCateory = (id) =>
  Api().get(`/markets/category/${id}`);
//##### In--Review
export const getApiMarketsByMarketCateoryAndSerach = (id) =>
  Api().get(`/markets/querycategory/${id}`);
//#####
//==========================Get Shop Routes Starts=====================================
export const getApiShopsByMarketId = (id) =>
  Api().get(`/shops/marketshops/${id}`);

export const getApiShopsByMarketIdAndQuery = (id) =>
  Api().get(`/shops/querymarketshops/${id}`);

export const getShopAndProductById = (id) =>
  Api().get(`/shops/market/shop/${id}`);

export const getQueryShopProductsById = (id) =>
  Api().get(`/shops/market/queryshopproducts/${id}`);

//--get all shops/vendors---//
export const getApiVendors = () => Api().get(`/shops`);

export const getApiFindOrSearchVendors = (payload) =>
  Api().get(`/shops/findorquery${payload}`);

export const getShopsByHubs = (hub) => Api().get(`/shops/byhubs/${hub}`);
export const getQueryShopsByHubs = (hub) =>
  Api().get(`/shops/querybyhubs/${hub}`);

//==========================Get Shop Routes Starts ends=====================================

//--trac; user otders---//
export const trackUserOrderStatus = (orderId = "", billingmail = "") =>
  Api().get(
    `/userorders/track-order?orderId=${orderId}&billingmail=${billingmail}`
  );

//==========================Get Frequenlt Asked Questions and answers Routes=====================================
export const getApiFaqs = () => Api().get(`/faqs`);

//--get all Promotions and features banners and promotions---//
export const getApiBanners = () => Api().get(`/banners`);

export const getApiIsHomeSliderBanners = () =>
  Api().get(`/banners/homesliders`);

export const getApiShopBanners = () => Api().get(`/shops/shopspromotions`);

export const getApiAboutusBanners = () => Api().get(`/banners/aboutusbanner`);

export const getApiBecomeVendorBanners = () =>
  Api().get(`/banners/becomevendor`);

//==========================Get Legal/Advocacy Orientedd Routes=====================================
export const getApiPrivacies = () => Api().get(`/privacies/clientpricacy`);

//==========================Get Legal/Advocacy Orientedd Routes=====================================
export const getApiTerms = () => Api().get(`/privacies/terms`);

//==========================Get Legal/Advocacy Orientedd Routes=====================================
export const getApiFeaturedPartners = () => Api().get(`/partners`);

//==========================Get Our Leaders Routes=====================================
export const getOurTeam = () => Api().get(`/admin/our-leaders`);

/**==============================================================|
 *   Shop registration start  not being verified starts   
================================================================*/
//========================================Shop/Vendors Authentication Logics==============================================
// export const newShopSignup = (formData) =>
//   Api().post("/api/pre-shop-signup", formData);
// export const storePreShopUserData = (formData) =>
//   Api().post("/api/register-preshop-user", formData);

// export const userShopForgotPassword = (formData) =>
//   Api().post("/api/shop/forgot-password", formData);

// export const userShopResetPassword = (formData) =>
//   Api().post("/api/shop/reset-password", formData);


/**===============================================================================================
 * MARKET-PLACE ROUTES LISTED BELOW STARTS
 ==================================================================================================*/
export const getMyMarketplaceCartApi = (userId) =>
Api().get(`/foodmarts/get-user-cart/${userId}`);


/**===============================================================================================
 * FOOD MART ROUTES LISTED BELOW STARTS
 ==================================================================================================*/

export const getAllFoodMarts = () => Api().get("/foodmarts");
export const getFoodMartMenuApi = (hub) =>
  Api().get(`/foodmarts/get-mart-menu/${hub}`);
  export const getFoodMartSingleMenuItemApi = (slug) =>
  Api().get(`/foodmarts/get-menu/${slug}`);



  export const getMyFoodCartpi = (userId) =>
  Api().get(`/foodmarts/get-user-cart/${userId}`);
/**======================================================================================================
 * FOOD MART ROUTES LISTED ENDS HERE 
 =========================================================================================================*/


/**=====================================================================================================
 * BOOKINGS ROUTES LISTED BELOW STARTS
 =====================================================================================================*/
export const getAllBookingsPropertyApi = () => Api().get("/bookings/get-listings"); // (Done => Mcsvs)

export const getBookingPropertyApi = (bookingPropId) =>
  Api().get(`/bookings/guest-listing/${bookingPropId}/view`);// (Done => Mcsvs) 


  export const getUserReservationsByListingId = (listingId) => {
   
    return Api().get(`${API_ENDPOINTS.GET_RESERVATIONS_BY_LISTING_ID}/${listingId}/confirm-free-dates`)
}// (Done => Mcsvs) 

 export const getUserReservationsByRoomId = (roomId) => {

    return Api().get(`${API_ENDPOINTS.GET_RESERVATIONS_BY_LISTING_ID}/on-room/${roomId}/confirm-free-dates`)
}// (Done => Mcsvs) 

/**====================================================================================================
 * BOOKINGS ROUTES LISTED ENDS HERE 
 ======================================================================================================*/


 /**=====================================================================================================
 * ESTATES-PROPERTIES ROUTES LISTED BELOW STARTS
 =====================================================================================================*/
export const getAllEstatessPropertyApi = () => Api().get("/client-estates");
export const getEstatePropertyApi = (estatePropId) =>
  Api().get(`/client-estates/${estatePropId}`);
/**====================================================================================================
 * ESTATES-PROPERTIES ROUTES LISTED ENDS HERE 
 ======================================================================================================*/
