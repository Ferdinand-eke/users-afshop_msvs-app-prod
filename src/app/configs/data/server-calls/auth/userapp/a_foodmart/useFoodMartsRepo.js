import { addToUserFoodCartApi, getUserFoodCartApi, getUserFoodInvoicesAndItemsByIdEnpoint, getUserFoodInvoicesEnpoint, payAndPlaceFoodOrderApi, updateCommodityCartQtyApi, updateUserFoodCartApi } from 'app/configs/data/client/RepositoryAuthClient';
import { getAllFoodMarts, getFoodMartMenuApi, getFoodMartSingleMenuItemApi, getMyFoodCartpi } from 'app/configs/data/client/RepositoryClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function useGetAllFoodMarts() {
    return useQuery(['__foodmarts'], getAllFoodMarts);
}


/***get menu of single food-mart-SHOP */
export function useGetMartMenu(martId) {
  // if(!martId || martId === 'new'){
  //   return {};
  // }
  return useQuery(
    ['__foodmartsMenu', martId],
    () => getFoodMartMenuApi(martId),
    {
      enabled: Boolean(martId),
    
    }
  );
}

export function useGetSingleMenuItem(menuId) {
  return useQuery(
    ['__meniitem', menuId],
    () => getFoodMartSingleMenuItemApi(menuId),
    {
      enabled: Boolean(menuId),
    
    }
  );
}


/***
 * #######################################################################################
 * FOOD CART MANAGEMENT STARTS HERE
 * ###########################################################################################
 */
export function useGetMyFoodCart() {
  return useQuery(['__foodcart'], getUserFoodCartApi);
}

/***get menu of single food-mart-SHOP */
export function useGetMyFoodCartByUserCred(userId) {
  if(!userId || userId === 'new'){
    return {};
  }
  return useQuery(
    ['__foodcart', userId],
    () => getMyFoodCartpi(userId),
    {
      enabled: Boolean(userId),

    }
  );
}



/****Manage FOOD-CART starts */
/****Create add to foodcart : => Done for Africanshops */
export function useAddToFoodCart() {
  // const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(
    (foodCartItem) => {
      return addToUserFoodCartApi(foodCartItem);
    },

    {
      onSuccess: (data) => {

        if (data?.data?.success && data?.data?.savedCart) {
          toast.success("added to cart successfully!");
          queryClient.invalidateQueries(["__foodcart"]);
          queryClient.refetchQueries("__foodcart", { force: true });
          // navigate(`/bookings/reservation/review/${data?.data?.createdReservation?._id}`);
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

/**Updated Food cart item quantity */
export function useUpdateFoodCartItemQty() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    (foodCartItem) => {
      return updateUserFoodCartApi(foodCartItem);
    },

    {
      onSuccess: (data) => {

        if (data?.data?.success && data?.data?.updatedCartQty) {
          toast.success(data?.data?.message);
          queryClient.invalidateQueries(["__foodcart"]);
          queryClient.refetchQueries("__foodcart", { force: true });
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
 * #######################################################################################
 * FOOD CART MANAGEMENT ENDS HERE
 * ###########################################################################################
 * ------------------------------------------------------------------------------------------
 */

/***
 * #################################################################
 * ORDER FOR FOOD MANAGEMENT STARTS HERE
 * #################################################################
 */

/*****Pay and make payment for order */
export function usePayAndPlaceFoodOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    (orderData) => {
      return payAndPlaceFoodOrderApi(orderData);
    },

    {
      onSuccess: (data) => {
        console.log("foodPaymentSuccess DTA", data)
        console.log("foodPaymentSuccess_PaymentRESULT", data?.data?.foodOrder?.paymentResult)

        console.log("foodPaymentSuccess_STATUS", data?.data?.foodOrder?.paymentResult?.status)
        if (data?.data?.success ) {

          toast.success(data?.data?.message);
          queryClient.invalidateQueries(["__foodcart"]);
          queryClient.refetchQueries("__foodcart", { force: true });
          navigate(`/foodmarts/${data?.data?.foodOrder?._id}/payment-success`);
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


/***Get Authenticated user food-orders useGetAuthUserFoodOrders */
export function useGetAuthUserFoodOrders() {
  // if(! ||  === 'new'){
  //   return {};
  // }
  return useQuery(
    ['__authuser_orders', ],
    () => getUserFoodInvoicesEnpoint(),

  );
}


/***Get Authenticated user food-orders and ITEMS */
export function useGetAuthUserFoodOrdersAndItems(foodOrderId) {
  // if(!foodOrderId || foodOrderId === 'new'){
  //   return {};
  // }
  return useQuery(
    ['__authuser_orders_details', foodOrderId],
    () => getUserFoodInvoicesAndItemsByIdEnpoint(foodOrderId),
    {
      enabled: Boolean(foodOrderId),
    }
  );
}



/***
 * #################################################################
 * ORDER FOR FOOD MANAGEMENT ENDS HERE
 * #################################################################
 */


