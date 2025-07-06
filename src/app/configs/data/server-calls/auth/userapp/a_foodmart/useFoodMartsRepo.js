import { addToUserFoodCartApi, getUserFoodCartApi, getUserFoodInvoicesAndItemsByIdEnpoint, getUserFoodInvoicesEnpoint, payAndPlaceFoodOrderApi, updateCommodityCartQtyApi, updateUserFoodCartApi } from 'app/configs/data/client/RepositoryAuthClient';
import { getAllFoodMarts, getFoodMartMenuApi, getFoodMartSingleMenuItemApi, getMyFoodCartpi, getRcsFoodMartMenuItemsApi } from 'app/configs/data/client/RepositoryClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


/***1) Get All FoordMrt/RCS  */
export default function useGetAllFoodMarts() {
    return useQuery(['__foodmarts'], getAllFoodMarts);
} //(Mcsvs => Done)


/***2) Get single food-mart-SHOP/RCS */
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
} //(Mcsvs => Done)

/***get menu of single food-mart-SHOP/RCS-Listing */
export function useGetRCSMenuItems(martId) {
  // if(!martId || martId === 'new'){
  //   return {};
  // }
  return useQuery(
    ['__foodmartRcsMenu', martId],
    () => getRcsFoodMartMenuItemsApi(martId),
    {
      enabled: Boolean(martId),
    
    }
  );
} //(Mcsvs => Done)

export function useGetSingleMenuItem(rcsId, menuId) {
  return useQuery(
    ['__menuitem', rcsId, menuId],
    () => getFoodMartSingleMenuItemApi(rcsId, menuId),
    {
      enabled: Boolean(rcsId, menuId),
    
    }
  );
}


/***
 * #######################################################################################
 * FOOD CART MANAGEMENT STARTS HERE
 * ###########################################################################################
 */
export function useGetMyFoodCart(userId) {
    if(!userId || userId === 'new'){
    return {};
  }
  return useQuery(['__foodcart'], getUserFoodCartApi);
} //(Mcsvs => Done)

/***get menu of single food-mart-SHOP */
export function useGetMyFoodCartByUserCred(userId) {
  if(!userId || userId === 'new'){
    return {};
  }

  return useQuery(["__foodcart"], getMyFoodCartpi);

  // return useQuery(
  //   ['__foodcart', userId],
  //   () => getMyFoodCartpi(userId),
  //   {
  //     enabled: Boolean(userId),

  //   }
  // );
} //(Mcsvs => Done)

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

        if (data?.data?.success) {
          toast.success(`${data?.data?.message ? data?.data?.message : "added to cart successfully!"}`);
          queryClient.invalidateQueries(["__foodcart"]);
          queryClient.refetchQueries("__foodcart", { force: true });
          // navigate(`/bookings/reservation/review/${data?.data?.createdReservation?._id}`);
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
} //(Mcsvs => Done)

/**Updated Food cart item quantity */
export function useUpdateFoodCartItemQty() {
  const queryClient = useQueryClient();
  return useMutation(
    (foodCartItem) => {
      return updateUserFoodCartApi(foodCartItem);
    },

    {
      onSuccess: (data) => {

        if (data?.data?.success ) {
          toast.success(`${data?.data?.message ? data?.data?.message : "data?.data?.message"}`);
          queryClient.invalidateQueries(["__foodcart"]);
          queryClient.refetchQueries("__foodcart", { force: true });
          // navigate(`/bookings/reservation/review/${data?.data?.createdReservation?._id}`);
        } 
        
        // else if (data?.data?.error) {
        //   toast.error(data?.data?.error?.message);
        //   return;
        //  } else if (data?.data?.infomessage) {
        //   toast.info(data?.data?.infomessage);
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
} //(Mcsvs => Done)
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


