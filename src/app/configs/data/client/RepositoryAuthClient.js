import axios from "axios";
import { API_ENDPOINTS } from "./serverEndpoints/endpoints";
import { getAdminAccessToken } from "../utils/opsUtils";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { resetSessionForShopUsers } from "app/configs/utils/authUtils";

/**
 * ####MAIN ENDPOINTS STARTS
 */

/******Digital Ocean : Curent Production Main server starts */

const baseDomain = import.meta.env.VITE_API_BASE_URL_PROD;  /**production & dev */

/******Digital Ocean : Curent Production Main server ends*/
/**
 * ####MAIN ENDPOINTS ENDS
 */


export const baseUrl = `${baseDomain}`;

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};

export function AuthApi() {
  // const TOKEN = JSON.parse(Cookies.get('authClientUserToken'));

  const TOKEN = getAdminAccessToken();
  //   console.log("FETCH-Token", getAdminAccessToken());

  const customHeaders = {
    Accept: "application/json",
    withcredentials: true,
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
    },
    credentials: "include",
    // token: `Bearer ${TOKEN}`,
  };

  const Api = axios.create({
    /*************Previous for Here starts */
    baseURL: baseUrl,
    // headers: customHeaders,
    /*****************Previous for Here starts  ends*/
    // headers: { accesstoken_x_user: `Bearer ${TOKEN}` },
    headers: { accesstoken_x_user: `${TOKEN}` },
  });

  Api.interceptors.response.use(
    (response) => response,
    (error) => {
    

      if (error?.response?.status === 403) {
        let errors = Object.values(error?.response?.data?.errors || {});
        // userLogOutCall();

        return Promise.reject({
          status: 403,
          errorsRaw: errors,
          errors: errors.reduce((error) => error),
        });
      }

      toast.error(
        error?.response && error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
      );

      return Promise.reject({
        status: error.response?.status,
        errors: ["Oops!"],
      });
    }
  );

  return Api;
}

//User authenticated? Routes getApiAuthUser export const getAuthUserWithToken = () => authApi().get('/users/authuser');
export const getApiAuthUser = () => AuthApi().get(`/users/authuser`);
export const getApiMinimizedAuthUser = () =>
  AuthApi().get(`/users/minimized/authuser`);

export const clientUpdateUser = (formData) =>
  AuthApi().post(`/users/update-authuser`, formData);

export const clientLoggedInResetPassword = (formData) => {
  console.log("resetUserPass_DATA".formData);
  return AuthApi().post("/authuser/loggedin/reset-password ", formData);
};

export const clientLoggedInResetEmail = (formData) =>
  AuthApi().post("/authuser/loggedin/change-email ", formData);

export const clientActivateNewEmail = (formData) =>
  AuthApi().post("/authuser/loggedin/activate-newemail ", formData);

//SHopPlans Routes
export const updateShopPlanById = (id, planFormData) =>
  AuthApi().put(`/shopplans/${id}`, planFormData);

export const createApiShopPlan = (planFormData) =>
  AuthApi().post("/shopplans", planFormData);

/***
 * SHops Routes starts
 */
// export const updateShopById = (id, shopFormData) =>
//   AuthApi().put(`/shops/${id}`, shopFormData);

// export const createApiShop = (shopFormData) =>
//   AuthApi().post("/shops", shopFormData);

/***
 * SHops Routes starts
 */

/**
 * ############################################################
 * @param {Market place Users Orders Routesstarts} FormData 
 * @returns 
 * ############################################################
 */
export const createApiOrder = (FormData) =>
  AuthApi().post("/userorders", FormData);
// export const logOut = async () => {
//     // dispatch({ type: "LOGOUT" });
//     Cookies.remove('authClientUserInfo');
// };

export const getPlacedOrders = (id) => AuthApi().get(`/userorders/${id}`);

export const onSuccessPlacedOrders = (id) => AuthApi().put(`/userorders/${id}`);

export const onENairaPlacedOrders = (id, shopFormData) =>
  AuthApi().put(`/userorders/enairapay/${id}`, shopFormData);

export const onSuccessENairaPlacedOrdersPay = (id, shopFormData) =>
  AuthApi().put(`/userorders/successenairapay/${id}`, shopFormData);

export const getUserInvoices = (id) =>
  AuthApi().get(`/userorders/invoices/${id}`);


  export const cancelUserItemInInvoiceApi = (id) => {
    
    return  AuthApi().put(`/userorders/${id}/cancel-orderitem`);
  }

  export const requestRefundOnUserItemInInvoiceApi = (id) =>  AuthApi().put(`/userorders/${id}/request-refund`);
 

  /**
 * ############################################################
 * @param {Market place Users Orders Ends} FormData 
 * @returns 
 * ############################################################
 */

  /*******
 *                      FINTEC-PAYMENTS APP
 * #######################################################################################
 *  ACTIVITIES FOR ALL UTULIZING FINTEC-PAYMENTS_APP starts here
 * #######################################################################################
 */
/*******
 * #######################################################################################
 *  ACTIVITIES FOR USERS UTILIZING FINTEC-PAYMENTS_APP ends here
 * #######################################################################################
 * --------------------------------------------------------------------------------------------------------------------
 */

/***Verify Paystack Payment => (Done => Msvs) */
export const verifyPaystackPaymentFromFintechService = (formData) => {
  return AuthApi().post(`paystack-payment/verify`, formData);
};



/*******
 *                      BOOKINGS APP
 * #######################################################################################
 * AUTHENTICATED ACTIVITIES FOR USERS UTULIZING BOOKINGS_APP starts here
 * #######################################################################################
 */

/****Reservations */
/***Create a new reervation => Done for africanshops */
export const createUserReservations = (formData) => {
  return AuthApi().post(`${API_ENDPOINTS.RESERVE_A_PROPERTY}`, formData);
};

export const createUserReservationsOnRoom = (formData) => {
  return AuthApi().post(`${API_ENDPOINTS.GET_RESERVATIONS_ROOT_ROUTE}/create-reservation-on-room`, formData);
}; //(Done => Msvs)


/***Update a reservation on payment => Done for africanshops */
export const updateReservationOnMakingPayment = (formData) => {
  ///${formData?.reservationToPay
  return AuthApi().post(
    `${API_ENDPOINTS.UPDATE_RESERVATIONS_ON_PAYMENT}`,
    formData
  );
};



export const listingReservationUpdateOnPayment = (reservationId, formData) => {
  return AuthApi().put(
    `${API_ENDPOINTS.UPDATE_RESERVATIONS_ON_PAYMENT}/${reservationId}`,
    formData
  );
};

/***GET USERS-TRIPS  */
export const getUserTrips = () => {
  return AuthApi().get(`${API_ENDPOINTS.GET_USER_TRIPS}`);
}; // (Done => Msvs)



export const getUseTripByReservationId = (reservationId) => {
  return AuthApi().get(
    `${API_ENDPOINTS.GET_USER_SINGLE_TRIP}/${reservationId}`
  );
}; //(Done => Msvs)

export const cancelReservationApi = (reservationId, formData) => {
  return AuthApi().put(`${API_ENDPOINTS.CANCEL_USER_RESERVATION}/${reservationId}`);
};

export const getUserCancelledTrips = () => {
  return AuthApi().get(`${API_ENDPOINTS.GET_USER_CANCELLED_TRIPS}`);
}; //(Done => Msvs)

export const requestRefundForReservationApi = (cancelledReservationId) => {
  return AuthApi().put(`/bookings/${cancelledReservationId}/request-refund`);
};

/***inview/user-trip/:listingid */
export const getInViewUseTripByListingId = () => {
  return AuthApi().get(`${API_ENDPOINTS.GET_INVIEW_USER_TRIP}`);
};

/*******
 * #######################################################################################
 * AUTHENTICATED ACTIVITIES FOR USERS UTILIZING BOOKINGS_APP ends here
 * #######################################################################################
 * --------------------------------------------------------------------------------------------------------------------
 */
/*******
 *                      FOOD MART APP
 * #######################################################################################
 * AUTHENTICATED ACTIVITIES FOR USERS UTULIZING FOOD-MART_APP starts here
 * #######################################################################################
 */

export const getUserFoodCartApi = () => {
  return AuthApi().get(`${API_ENDPOINTS.GET_FOODCART}`);
};

/***add a new food menu to FoodCart => Done for africanshops */
export const addToUserFoodCartApi = (formData) => {
  return AuthApi().post(`${API_ENDPOINTS.ADD_TO_FOODCART}`, formData);
};

export const updateUserFoodCartApi = (formData) => {
  return AuthApi().put(`${API_ENDPOINTS.UPDATE_FOODCART_QTY}`, formData);
};

/**
 * MANAGE ORDER SECTION
 */

export const payAndPlaceFoodOrderApi = (formData) => {
  // console.log("food cart", formData);
  return AuthApi().post(`${API_ENDPOINTS.CREATE_FOOD_ORDER}`, formData);
};

export const getUserFoodInvoicesEnpoint = () =>
  AuthApi().get(`${API_ENDPOINTS.GET_USER_FOOD_ORDER_LIST}`);

export const getUserFoodInvoicesAndItemsByIdEnpoint = (foodOrderId) => {
  return AuthApi().get(
    `/foodmarts/food-orders/${foodOrderId}/get-foodorderdata`
  );
};

/*********#######################################################################################
 * AUTHENTICATED ACTIVITIES FOR USERS UTULIZING FOOD-MART_APP ends here
 * #######################################################################################
 * --------------------------------------------------------------------------------------------------------
 */
/*******
 *                      COMMODITY MARKETPLACE APP
 * #######################################################################################
 * AUTHENTICATED ACTIVITIES FOR USERS UTULIZING MARKET-PLACE CART starts here
 * #######################################################################################
 */
/***Get my cart */
export const getUserShoppingCart = () => {
  return AuthApi().get(`${API_ENDPOINTS.GET_MY_CART}`);
};
export const getUserShoppingCartForAuthAndGuest = (userId) => {
  return AuthApi().get(`${API_ENDPOINTS.GET_MY_CART}/${userId}`);
};



/***add a new marketplace Cart => Done for africanshops */
export const addToUserCommodityCartApi = (formData) => {
  // console.log("food cart", formData);
  return AuthApi().post(`${API_ENDPOINTS.ADD_TO_CART}`, formData);
};

/**Update-decrease commodity cart quantity */
export const updateCommodityCartQtyApi = (formData) => {
  // console.log("food cart", formData);
  return AuthApi().put(`${API_ENDPOINTS.UPDATE_CART_QTY}`, formData);
};
/**remove commodity from cart */
export const removeCommodityFromCartApi = (formData) => {
  // console.log("food cart", formData);
  return AuthApi().put(`${API_ENDPOINTS.REMOVE_CART_ITEM}`, formData);
};

/**
 * MANAGE ORDER SECTION
 */

export const payAndPlaceOrderApi = (formData) => {
  // console.log("food cart", formData);
  return AuthApi().post(`${API_ENDPOINTS.PAY_AND_PLACE_ORDER}`, formData);
};


/**
 * MANAGE USER WALLET
 * LOGIS
 */

export const getUserWalletAccountApiDetails = () =>
  AuthApi().get("/users/accounts/get-account-details");


  export const updateUserAccountBankDetails = (userAccountFormData) =>
  AuthApi().put(`/users/accounts/update-user-account`, userAccountFormData);

  export const GenerateUserAccountBankDetails = () =>
  AuthApi().post(`/users/accounts/generate-user-account`);

  export const userWithdrawRequestApi = (withdrawFormData) =>
  AuthApi().post("/users/accounts/place-withdrawal", withdrawFormData);

  // export const updateUserAccountBankDetails = (userAccountFormData) =>
  // AuthApi().post(`/users/account/update-user-account`, userAccountFormData);
/*******
 *                      FOOD MART APP
 * #######################################################################################
 * AUTHENTICATED ACTIVITIES FOR USERS UTULIZING MARKET-PLACE CART  ends here
 * #######################################################################################
 * --------------------------------------------------------------------------------------------------------------------
 */

//Users Logout functionality  usersproducts
export const logOut = () => {
  if (typeof window !== "undefined") {
    // remove logged in user's cookie and redirect to login page 'authUserCookie', state.user, 60 * 24
    try {
      AuthApi()
        .post(`/logout`)
        .then((response) => {});

      window.location.reload();
    } catch (error) {
      console.log(
        "SereverError",
        error?.response && error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
      );
    }

    Cookies.remove("authClientUserToken");
    Cookies.remove("authClientUserInfo");
    localStorage.removeItem("authClientUserInfo");
    localStorage.clear();
  }
};

/****Main user logout logic */
export const userLogOutCall = () => {
  if (typeof window !== "undefined") {
    try {
      /**Fuse admin starts */
      resetSessionForShopUsers();

      Cookies.remove("jwt_auth_credentials");
      /***Fuse admin ends */

      Cookies.remove("authUserInfo");
      Cookies.remove("isloggedin");
      Cookies.remove("_auth");
      Cookies.remove("_auth_state");
      Cookies.remove("_auth_type");
      Cookies.remove("_auth_storage");
      Cookies.remove("_ga");
      Cookies.remove("_ga_WJH9CH067R");
      Cookies.remove("SLG_G_WPT_TO");
      Cookies.remove("ADMIN_AFSP_Show_Hide_tmp_Lead");
      Cookies.remove("ADMIN_AFSP_Show_Hide_tmp_Lead_ARC");

      localStorage.removeItem("jwt_auth_credentials");
      localStorage.clear();

      // Cookies.set(
      //   'ADMIN_AFSP_Show_Hide_tmp_Lead',
      //   JSON.stringify(response?.data?.accessToken),
      //   '1h'
      // );

      // window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  }
};
