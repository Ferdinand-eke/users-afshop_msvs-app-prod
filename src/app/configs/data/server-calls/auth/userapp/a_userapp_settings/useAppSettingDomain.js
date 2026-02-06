import { getUserAppSettingApi } from 'app/configs/data/client/RepositoryClient';
import { useQuery } from 'react-query';

/**
 * Custom hook to fetch user application settings
 * Fetches public settings configuration for the user-facing application
 * @returns {Object} React Query result object with data, isLoading, isError, etc.
 */
export default function useGetUserAppSetting() {
    return useQuery(
        ['__getUserAppSetting'],
        getUserAppSettingApi,
        {
            staleTime: 300000, // Consider data fresh for 5 minutes (settings don't change frequently)
            cacheTime: 600000, // Keep in cache for 10 minutes
        }
    );
}
