import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getCountries } from '../../client/clientToApiRoutes';

export default function useSellerCountries() {
  return useQuery(['__countries'], getCountries);
} /// (Msvs => done)


