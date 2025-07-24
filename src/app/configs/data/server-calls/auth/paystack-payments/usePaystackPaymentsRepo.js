import { verifyPaystackPaymentFromFintechService } from 'app/configs/data/client/RepositoryAuthClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';



/****1) Verify payments made to company paystack from web and mobile platforms */

export function useVerifyPaystackPaymentMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  return useMutation(
    (postPayload) => {
      return verifyPaystackPaymentFromFintechService(postPayload);
    },
    {
      onSuccess: (data) => {
         
        if (data?.data?.success ) {
          toast.success(
            `${data?.data?.message ? data?.data?.message : "reservation added successfully!"}`
          );
          navigate(`/bookings/${data?.data?.payload?.id}/payment-success`);
          return;
        }
      },
    },
    {
      onError: (error, rollback) => {
        console.log('MutationError', error.response.data);
        console.log('MutationError', error.data);

        const {
                  response: { data },
                } = error ?? {};
                Array.isArray(data?.message)
                  ? data?.message?.map((m) => toast.error(m))
                  : toast.error(data?.message);
        rollback();
      },
    }
  );
}