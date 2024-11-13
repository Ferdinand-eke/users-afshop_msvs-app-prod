import { useMutation, useQuery, useQueryClient } from 'react-query';
// import { toast } from 'react-toastify';
// import { storeShopProduct } from '../../store-redux/api/apiRoutes';
import {
  getMyShopEstatePropertyBySlug,
  getMyShopFoodMartBySlug,
  // getMyShopProductById,
  getShopEstateProperties,
  getShopFoodMarts,
  // getShopProducts,
  // pullMyShopProductByIdFromExport,
  // pushMyShopProductByIdToExport,
  storeShopEstateProperty,
  storeShopFoodMart,
  // storeShopProduct,
  updateMyShopEstatePropertyById,
  updateMyShopFoodMartById,
  // updateMyShopProductById,
} from '../../client/clientToApiRoutes';
// import { message } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

//get all Specific user shop-food mart
export default function useMyShopFoodMarts() {
  return useQuery(['__myshop_foodmarts'], getShopFoodMarts);
}

//get single food mart details
export function useSingleShopFoodMart(slug) {
  if (!slug || slug === "new") {
    return {};
  }
  return useQuery(
    ['singlefoodmart', slug],
    () => getMyShopFoodMartBySlug(slug),
    {
      enabled: Boolean(slug),
      // staleTime: 5000,
    }
  );
}


//create new food mart storeShopFoodMart
export function useAddShopFoodMartMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(
    (newFoodMart) => {
      return storeShopFoodMart(newFoodMart);
    },
    {
      onSuccess: (data) => {
        if (data?.data?.success && data?.data?.newMFoodMart) {
          // console.log('New ESTATEPROPERTY  Data', data);

          toast.success('food mart added successfully!');
          queryClient.invalidateQueries(['__myshop_foodmarts']);
          queryClient.refetchQueries('__myshop_foodmarts', { force: true });
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
export function useFoodMartUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateMyShopFoodMartById, {
    onSuccess: (data) => {
      // console.log('Updated Producr clientController', data);

      if (data?.data?.success) {
       toast.success('food mart updated successfully!!');

        queryClient.invalidateQueries('__myshop_foodmarts');
        // queryClient.refetchQueries('__myshop_foodmarts', { force: true });
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

//         queryClient.invalidateQueries('__myshop_foodmarts');
//         queryClient.invalidateQueries([
//           '__myshop_foodmarts',
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

//         // queryClient.invalidateQueries('__myshop_foodmarts');
//         queryClient.invalidateQueries([
//           '__myshop_foodmarts',
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
