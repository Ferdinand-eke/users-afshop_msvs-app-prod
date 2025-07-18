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

/***
 * #################################################################
 * GUEST PRODUCT HANDLING STARTS HERE
 * #################################################################
 */
export default function useGetAllProducts() {
  return useQuery(["__marketplace_products"], getAllProducts);
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
    ["__marketplace_products", productSlug],
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
      onError: (error, rollback) => {
        const {
          response: { data },
        } = error ?? {};
        Array.isArray(data?.message)
          ? data?.message?.map((m) => toast.error(m))
          : toast.error(data?.message);
        rollback();
      },
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
      onError: (error, rollback) => {
       const {
          response: { data },
        } = error ?? {};
        Array.isArray(data?.message)
          ? data?.message?.map((m) => toast.error(m))
          : toast.error(data?.message);
        rollback();
      },
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
      onError: (error, rollback) => {
      const {
          response: { data },
        } = error ?? {};
        Array.isArray(data?.message)
          ? data?.message?.map((m) => toast.error(m))
          : toast.error(data?.message);
        rollback();
      },
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
            `/marketplace/order/${data?.data?.order?.id}/payment-success`
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
      onError: (error, rollback) => {
       const {
          response: { data },
        } = error ?? {};
        Array.isArray(data?.message)
          ? data?.message?.map((m) => toast.error(m))
          : toast.error(data?.message);
        rollback();
      },
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
      onError: (error, rollback) => {
        // return;
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
        console.log("MutationError", error.response.data);
        console.log("MutationError", error.data);
        rollback();
      },
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
      onError: (error, rollback) => {
        // return;
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
        console.log("MutationError", error.response.data);
        console.log("MutationError", error.data);
        rollback();
      },
    }
  );
}
/***
 * #################################################################
 * ORDER FOR COMMODITY MANAGEMENT ENDS HERE
 * #################################################################
 */
