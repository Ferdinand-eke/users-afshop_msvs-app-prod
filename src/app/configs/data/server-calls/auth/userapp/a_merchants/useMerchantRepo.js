import { getMerchantPreviewApi } from 'app/configs/data/client/RepositoryClient';
import { useQuery } from 'react-query';

/**
 * Hook to fetch merchant preview data by merchant ID
 * @param {string} merchantId - The merchant ID to fetch preview for
 * @returns {object} React Query result with merchant data
 */
export function useGetMerchantPreview(merchantId) {
  console.log("useGetMerchantPreview", merchantId);

  return useQuery(
    ['__merchantPreview', merchantId],
    () => getMerchantPreviewApi(merchantId),
    {
      enabled: Boolean(merchantId), // Only run query if merchantId exists
      staleTime: 30000, // Consider data fresh for 30 seconds
      retry: 2, // Retry failed requests up to 2 times
    }
  );
}
