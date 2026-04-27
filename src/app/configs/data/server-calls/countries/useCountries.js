import { useQuery } from 'react-query';
import { getCountries } from '../../client/clientToApiRoutes';

export default function useSellerCountries() {
	return useQuery(['__countries'], getCountries);
} /// (Msvs => done)
