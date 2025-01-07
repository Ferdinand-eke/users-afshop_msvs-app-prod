import { getAllEstatessPropertyApi,  getEstatePropertyApi,  } from 'app/configs/data/client/RepositoryClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function useGetAllEstateProperties() {
    return useQuery(['__estates'], getAllEstatessPropertyApi);
}

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