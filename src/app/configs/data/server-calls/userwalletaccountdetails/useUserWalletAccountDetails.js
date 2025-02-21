


/****
 * 
 * FINANCE MANAGEMENT FOR USERS STARTS HERE
 */

import { useMutation, useQuery, useQueryClient } from "react-query";
import { GenerateUserAccountBankDetails, getUserWalletAccountApiDetails, userWithdrawRequestApi } from "../../client/RepositoryAuthClient";
import { toast } from "react-toastify";
import { updateMyShopAccountBankDetails } from "../../client/clientToApiRoutes";

/***Get User Wallet Account Balance */
export default function useGetUsersAccountBalance() {
  return useQuery(['__user_account_balance'], getUserWalletAccountApiDetails);
}


/****Generate user wallet account details where there isn't */
export function useGenerateUserWalletAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation(GenerateUserAccountBankDetails, {
    onSuccess: (data) => {
      // console.log('GENERATED Account~~~', data);

      if (data?.data?.success) {
        toast.success(data?.data?.message);
        toast.success('account generated updated successfully!!');

        queryClient.invalidateQueries('__user_account_balance')
 
      }
    },
    onError: (error) => {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    },
  });
}

/****Update user wallet account details */
export function useUpdateUserWalletAccountDetailsMutation() {
  const queryClient = useQueryClient();

  return useMutation(updateMyShopAccountBankDetails, {
    onSuccess: (data) => {
      console.log('Updated AccountDetails~~~', data?.data);

      if (data?.data) {
        toast.success('account details updated successfully!!');
        queryClient.invalidateQueries('__user_account_balance')
      }
    },
    onError: (error) => {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    },
  });
}

/****User-Withdrawal Request */
export function useUserWithdrawalRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation(userWithdrawRequestApi, {
    onSuccess: (data) => {
      console.log('Withdrwal Placed', data);

      if (data?.data?.success) {
        toast.success('withdrawal placed successfully!!');
        queryClient.invalidateQueries('__user_account_balance');
      }
    },
    throwOnError: true,
    onError: (error) => {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    },
  });
}
