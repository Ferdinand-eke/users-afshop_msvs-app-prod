import { getAllBookingsPropertyApi,  getBookingPropertyApi, } from 'app/configs/data/client/RepositoryClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function useGetAllBookingProperties() {
    return useQuery(['__bookingProps'], getAllBookingsPropertyApi);
}


/***get menu of single booking property */
export function useGetBookingProperty(propertyId) {
  // if(!propertyId || propertyId === 'new'){
  //   return {};
  // }

  console.log("useGetBookingProperty", propertyId);
  return useQuery(
    ['__bookingProps', propertyId],
    () => getBookingPropertyApi(propertyId),
    {
      enabled: Boolean(propertyId),
      // staleTime: 2000,
    }
  );
}