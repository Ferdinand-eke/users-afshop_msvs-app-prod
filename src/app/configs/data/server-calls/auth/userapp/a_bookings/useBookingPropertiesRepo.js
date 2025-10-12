import { getAllBookingsPropertyApi,  getBookingPropertyApi, } from 'app/configs/data/client/RepositoryClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function useGetAllBookingProperties(filters = {}) {
    return useQuery(
        ['__bookingProps', filters],
        () => getAllBookingsPropertyApi(filters),
        {
            keepPreviousData: true, // Keep showing previous data while fetching new filtered data
            staleTime: 20000, // Consider data fresh for 20 seconds
        }
    );
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

