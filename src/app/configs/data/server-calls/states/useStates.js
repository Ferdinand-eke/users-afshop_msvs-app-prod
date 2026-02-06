import { useQuery } from 'react-query';
import { getStateById } from '../../client/RepositoryClient';
// getStateById

//get single shop plan
export function useGetSingleState(stateId) {
  return useQuery(
    ['__state', stateId],
    () => getStateById(stateId),
    {
      enabled: Boolean(stateId),
      // staleTime: 2000,
    }
  );
}