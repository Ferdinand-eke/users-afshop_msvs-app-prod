import { getAllEstatessPropertyApi,  getEstatePropertyApi,  } from 'app/configs/data/client/RepositoryClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function useGetAllEstateProperties(filters = {}) {
     return useQuery(
            ['__estates', filters],
            () => getAllEstatessPropertyApi(filters),
            {
                keepPreviousData: true, // Keep showing previous data while fetching new filtered data
                staleTime: 20000, // Consider data fresh for 20 seconds
            }
        );
} //(Msvs => Done)


/***get menu of single Estate property */
export function useGetEstateProperty(propertyId) {
  // if(!propertyId || propertyId === 'new'){
  //   return {};
  // }
  return useQuery(
    ['__estatesMenu', propertyId],
    () => getEstatePropertyApi(propertyId),
    {
      enabled: Boolean(propertyId),
      // staleTime: 2000,
    }
  );
}