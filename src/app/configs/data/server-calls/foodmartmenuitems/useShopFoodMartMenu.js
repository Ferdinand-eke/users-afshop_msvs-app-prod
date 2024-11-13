import { useMutation, useQuery, useQueryClient } from 'react-query';
// import { toast } from 'react-toastify';
// import { storeShopProduct } from '../../store-redux/api/apiRoutes';
import {
  getMyShopEstatePropertyBySlug,
  getMyShopFoodMartBySlug,
  getMyShopFoodMartMenuBySlug,
  // getMyShopProductById,
  getShopEstateProperties,
  getShopFoodMartMenus,
  getShopFoodMarts,
  // getShopProducts,
  // pullMyShopProductByIdFromExport,
  // pushMyShopProductByIdToExport,
  storeShopEstateProperty,
  storeShopFoodMart,
  storeShopFoodMartMenu,
  // storeShopProduct,
  updateMyShopEstatePropertyById,
  updateMyShopFoodMartById,
  // updateMyShopProductById,
} from '../../client/clientToApiRoutes';
// import { message } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

//get all Specific user shop-food mart
export default function useMyShopFoodMartMenus(foodMartId) {
  return useQuery(['__myshop_foodmart_menu', foodMartId], 
  () => getShopFoodMartMenus(foodMartId), {
    enabled: Boolean(foodMartId),
    // staleTime: 5000,
  });
}

// export function useSingleShopFoodMartMenu(slug) {
//   if (!slug || slug === "new") {
//     return {};
//   }
//   return useQuery(
//     ['singlefoodmartmenu', slug],
//     () => getMyShopFoodMartMenuBySlug(slug),
//     {
//       enabled: Boolean(slug),
//       // staleTime: 5000,
//     }
//   );
// }

//get single food mart details
export function useSingleShopFoodMartMenu(slug) {
  if (!slug || slug === "new") {
    return {};
  }
  return useQuery(
    ['singlefoodmartmenu', slug],
    () => getMyShopFoodMartMenuBySlug(slug),
    {
      enabled: Boolean(slug),
      // staleTime: 5000,
    }
  );
}




//create new food mart menu || store Shop FoodMart Menu
export function useAddShopFoodMartMenuMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(
    (newFoodMart) => {
      return storeShopFoodMartMenu(newFoodMart);
    },
    {
      onSuccess: (data) => {
        if (data?.data?.success && data?.data?.newMFoodMartMenu) {
          // console.log('New ESTATEPROPERTY  Data', data);

          toast.success('food mart added successfully!');
          queryClient.invalidateQueries(['__myshop_foodmart_menu']);
          queryClient.refetchQueries('__myshop_foodmart_menu', { force: true });
          navigate('/foodmarts/managed-foodmerchants')
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
        console.log('MutationError', error.response.data);
        console.log('MutationError', error.data);
        rollback();
      },
    }
  );
}

//update existing property
export function useFoodMartMenUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateMyShopFoodMartById, {
    onSuccess: (data) => {
      // console.log('Updated Producr clientController', data);

      if (data?.data?.success) {
       toast.success('food mart updated successfully!!');

        queryClient.invalidateQueries('__myshop_foodmart_menu');
        // queryClient.refetchQueries('__myshop_foodmart_menu', { force: true });
      }

      // navigate('/transaction-list');
    },
    onError: (error) => {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      // queryClient.invalidateQueries('__myshop_orders');
    },
  });
}

//update existing product: Pushing it for export
// export function usePushProductForExportMutation() {
//   const queryClient = useQueryClient();

//   return useMutation(pushMyShopProductByIdToExport, {
//     onSuccess: (data) => {
//       console.log('push Product clientController', data);

//       if (data) {
//        toast.success('product pushed to export successfully!!');

//         queryClient.invalidateQueries('__myshop_foodmart_menu');
//         queryClient.invalidateQueries([
//           '__myshop_foodmart_menu',
//           '__myshop_details',
//         ]);
//       }
//     },
//     onError: (error) => {
//       console.log('PushingExportError', error);
//       toast.error('Error occured while pushing product!!');
//       // toast.error(
//       //   error.response && error.response.data.message
//       //     ? error.response.data.message
//       //     : error.message
//       // );
//     },
//   });
// }

//update existing product: Pulling it from export
// export function usePullProductFromExportMutation() {
//   const queryClient = useQueryClient();

//   return useMutation(pullMyShopProductByIdFromExport, {
//     onSuccess: (data) => {
//       console.log('Pull Product clientController', data);

//       if (data) {
//        toast.success('product pulled successfully!!');

//         // queryClient.invalidateQueries('__myshop_foodmart_menu');
//         queryClient.invalidateQueries([
//           '__myshop_foodmart_menu',
//           '__myshop_details',
//         ]);
//       }
//     },
//     onError: (error) => {
//       toast.error(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       );
//     },
//   });
// }
