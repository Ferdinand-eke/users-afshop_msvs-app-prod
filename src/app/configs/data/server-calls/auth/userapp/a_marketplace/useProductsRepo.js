import {
  addToUserCommodityCartApi,
  cancelUserItemInInvoiceApi,
  getPlacedOrders,
  getUserInvoices,
  getUserShoppingCart,
  getUserShoppingCartForAuthAndGuest,
  payAndPlaceOrderApi,
  removeCommodityFromCartApi,
  requestRefundOnUserItemInInvoiceApi,
  updateCommodityCartQtyApi,
} from "app/configs/data/client/RepositoryAuthClient";
import {
  getAllProducts,
  getMyMarketplaceCartApi,
  getProductByCategory,
  getProductById,
} from "app/configs/data/client/RepositoryClient";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

/**
 * Comprehensive error handler for NestJS responses
 * Handles various NestJS error formats including:
 * - Validation errors (array of messages)
 * - Single error messages
 * - HTTP exceptions
 * - Network errors
 */
const handleNestJSError = (error, rollback) => {
  console.error("API Error:", error);

  // Handle network errors (no response from server)
  if (!error?.response) {
    toast.error("Network error. Please check your connection and try again.");
    if (rollback) rollback();
    return;
  }

  const { data, status } = error.response;

  // Handle different NestJS error response formats
  if (data) {
    // Case 1: NestJS validation errors (array of messages)
    if (Array.isArray(data?.message)) {
      data.message.forEach((msg) => {
        toast.error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      });
    }
    // Case 2: Single message string
    else if (typeof data?.message === 'string') {
      toast.error(data.message);
    }
    // Case 3: Error object with message
    else if (data?.error?.message) {
      toast.error(data.error.message);
    }
    // Case 4: Direct error message
    else if (data?.error && typeof data.error === 'string') {
      toast.error(data.error);
    }
    // Case 5: HTTP status text
    else if (data?.statusCode && data?.error) {
      toast.error(`${data.error}: ${data.message || 'An error occurred'}`);
    }
    // Case 6: Generic message based on status code
    else {
      const statusMessages = {
        400: 'Bad Request. Please check your input.',
        401: 'Unauthorized. Please log in again.',
        403: 'Forbidden. You do not have permission.',
        404: 'Resource not found.',
        409: 'Conflict. The resource already exists.',
        422: 'Unprocessable Entity. Invalid data provided.',
        500: 'Server error. Please try again later.',
        503: 'Service unavailable. Please try again later.',
      };
      toast.error(statusMessages[status] || `Error ${status}: Something went wrong`);
    }
  } else {
    // Fallback for unexpected error formats
    toast.error(error?.message || 'An unexpected error occurred');
  }

  // Execute rollback if provided
  if (rollback) rollback();
};

/***
 * #################################################################
 * GUEST PRODUCT HANDLING STARTS HERE
 * #################################################################
 */

export default function useGetAllProducts(filters = {}) {
  // return useQuery(["__marketplace_products"], getAllProducts);
  console.log("Filtes in Get-All-Producst", filters)
  return useQuery(
          ['__marketplace_products', filters],
          () => getAllProducts(filters),
          {
              keepPreviousData: true, // Keep showing previous data while fetching new filtered data
              staleTime: 20000, // Consider data fresh for 20 seconds
          }
      );
} //(Msvs => Done)

export function useGetProductByCategory(category) {
  if (!category) {
    return {};
  }
  return useQuery(
    ["__marketplace_products_by_products", category],
    () => getProductByCategory(category),
    {
      enabled: Boolean(category),
    }
  );
}

export function useGetSingleProduct(productSlug) {
  // if(!productSlug || productSlug === 'new'){
  //   return {};
  // }
  return useQuery(
    ["__marketplace_products_byslug", productSlug],
    () => getProductById(productSlug),
    {
      enabled: Boolean(productSlug),
    }
  );
} //(Msvs => Done)

/***
 * #################################################################
 * GUEST PRODUCT HANDLING ENDS HERE
 * #################################################################
 */

/***
 * #################################################################
 * COMMODITY CART MANAGEMENT STARTS HERE
 * #################################################################
 */
export function useMyCart(userId) {
   if (!userId || userId === "new") {
    return {};
  }
  return useQuery(["__cart"], getUserShoppingCart);
} //(Msvs => Done)

/***get menu of user marketplace cart items for both AuthUser && UnAuth-User*/
export function useGetMyMarketplaceCartByUserCred(userId) {
  if (!userId || userId === "new") {
    return {};
  }
  return useQuery(["__cart"], //, userId
   
    () => getUserShoppingCartForAuthAndGuest(),
   
  );
} //(Msvs => Done)
// export function useGetMyMarketplaceCartByUserCred(userId) {
//   if (!userId || userId === "new") {
//     return {};
//   }
//   //() => 
//   return useQuery(["__cart"], getUserShoppingCartForAuthAndGuest(),
   
//   );
// } //(Msvs => Done)

/****Manage COMOODITY CART starts */
/****Create add to foodcart : => Done for Africanshops */
export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation(
    (cartItem) => {
      return addToUserCommodityCartApi(cartItem);
    },

    {
      onSuccess: (data) => {

        console.log("AddToCartData", data);
        if (data?.data?.success) {
          toast.success(`${data?.data?.message ? data?.data?.message : "Item added to cart successfully!"}`);
          queryClient.invalidateQueries(["__cart"], { force: true });
          queryClient.invalidateQueries(["__marketplace_products"], { force: true });
          queryClient.refetchQueries("__cart", { force: true });
          queryClient.refetchQueries("__marketplace_products", { force: true });
        } 
        
        // else if (data?.data?.error) {
        //   toast.error(data?.data?.error?.message);
        //   return;
        // } else {
        //   toast.info("something unexpected happened");
        //   return;
        // }
      },
    },
    {
      onError: handleNestJSError,
    }
  );
}

/**Updated cart item quantity */
export function useUpdateCartItemQty() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    (cartItem) => {
      console.log("Run Product : ", cartItem);

      return updateCommodityCartQtyApi(cartItem);
    },

    {
      onSuccess: (data) => {
        if (data?.data?.success) {
          toast.success(`${data?.data?.message ? data?.data?.message : "Cart item quantity updated successfully!"}`);
          queryClient.invalidateQueries(["__cart"]);
          queryClient.refetchQueries("__cart", { force: true });
        } else if (data?.data?.error) {
          toast.error(data?.data?.error?.message);
          return;
        } else if (data?.data?.infomessage) {
          toast.info(data?.data?.infomessage);
          return;
        } else {
          toast.info("something unexpected happened");
          return;
        }
      },
    },
    {
      onError: handleNestJSError,
    }
  );
}

/**remove cart item  */
export function useRemoveCartItem() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    (cartItem) => {
      return removeCommodityFromCartApi(cartItem);
    },

    {
      onSuccess: (data) => {
        if (data?.data?.success && data?.data?.updatedCartQty) {
          toast.success(data?.data?.message);
          queryClient.invalidateQueries(["__cart"]);
          queryClient.refetchQueries("__cart", { force: true });
          // navigate(`/bookings/reservation/review/${data?.data?.createdReservation?._id}`);
        } else if (data?.data?.error) {
          toast.error(data?.data?.error?.message);
          return;
        } else if (data?.data?.infomessage) {
          toast.info(data?.data?.infomessage);
          return;
        } else {
          toast.info("something unexpected happened");
          return;
        }
      },
    },
    {
      onError: handleNestJSError,
    }
  );
}

/***
 * #################################################################
 * COMMODITY CART MANAGEMENT ENDS HERE
 * #################################################################
 */
/**-------------------------------------------------------------------------------------------------------- */

/***
 * #################################################################
 * ORDER FOR COMMODITY MANAGEMENT STARTS HERE
 * #################################################################
 */

/*****Pay and make payment for order */
export function usePayAndPlaceOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    (orderData) => {
      return payAndPlaceOrderApi(orderData);
    },

    {
      onSuccess: (data) => {
        if (data?.data?.success) {
          toast.success(data?.data?.message);
          queryClient.invalidateQueries(["__cart"]);
          queryClient.refetchQueries("__cart", { force: true });
          navigate(
            `/marketplace/order/${data?.data?.data?.order?.id}/payment-success`
          );
        } else if (data?.data?.error) {
          toast.error(data?.data?.error?.message);
          return;
        } else {
          toast.info("something unexpected happened");
          return;
        }
      },
    },
    {
      onError: handleNestJSError,
    }
  );
}

/***Get Authenticated user orders */
export function useGetAuthUserOrders() {
  return useQuery(
    ["__authuser_orders"],
    () => getUserInvoices(),
    {
      // enabled: Boolean(userId),
    }
  );

}

/***Get orders and order items  */
export function useGetAuthUserOrderItems(orderId) {
  // if(!orderId || orderId === 'new'){
  //   return {};
  // }
  return useQuery(
    ["__authuser_order_items", orderId],
    () => getPlacedOrders(orderId),
    {
      enabled: Boolean(orderId),
    }
  );
}

/***Cancel Order Items */
export function useCancleOrderItem() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    (orderItemData) => {
      return cancelUserItemInInvoiceApi(orderItemData);
    },

    {
      onSuccess: (data) => {
        if (data?.data?.success) {
          toast.success(data?.data?.message);
          queryClient.invalidateQueries(["__authuser_order_items"]);
          // queryClient.refetchQueries("__cart", { force: true });
          // navigate(`/marketplace/order/${data?.data?.order?._id}/payment-success`);
        } else if (data?.data?.error) {
          toast.error(data?.data?.error?.message);
          return;
        } else {
          toast.info("something unexpected happened");
          return;
        }
      },
    },
    {
      onError: handleNestJSError,
    }
  );
}

/*****Request refund on cancelled order item */
export function useRequestRefundOnOrderItem() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    (orderItemData) => {
      return requestRefundOnUserItemInInvoiceApi(orderItemData);
    },
    {
      onSuccess: (data) => {
        if (data?.data?.success) {
          toast.success(data?.data?.message);
          queryClient.invalidateQueries(["__authuser_order_items"]);
        } else if (data?.data?.error) {
          toast.error(data?.data?.error?.message);
          return;
        } else {
          toast.info("something unexpected happened");
          return;
        }
      },
    },
    {
      onError: handleNestJSError,
    }
  );
}
/***
 * #################################################################
 * ORDER FOR COMMODITY MANAGEMENT ENDS HERE
 * #################################################################
 */
