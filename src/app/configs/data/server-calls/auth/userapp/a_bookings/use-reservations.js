import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createUserReservations,
  getInViewUseTripByListingId,
  getUseTripByReservationId,
  // getUserReservationsByListingId,
  getUserTrips,
  // listingReservationUpdateOnPayment,
  updateReservationOnMakingPayment,
} from "app/configs/data/client/RepositoryAuthClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { getUserReservationsByListingId } from "app/configs/data/client/RepositoryClient";

/***
 * ==========================================================================
 * BY AUTHENTICATED USERS
 * ==========================================================================
 */

// export function useCreateReservation() {
//     const router = useNavigate()
//     return useMutation(createUserReservations, {
//         onSuccess: (data) => {
//             console.log("successResData =>", data)

//             return
//             if (data?.data?.listingAndReservation) {
//                 toast.success('reservation added successfully')
//                 // router(
//                 //     `/review/reservation/${data?.data?.listingAndReservation?.id}`
//                 // )
//                 return
//             } else if (data?.data?.error) {
//                 toast.error(data?.data?.error?.message)
//                 return
//             } else {
//                 toast.info('something unexpected happened')
//                 return
//             }
//         },
//         onError: (error) => {
//             const {
//                 response: { data },
//             } = error ?? {}
//             Array.isArray(data?.message)
//                 ? data?.message?.map((m) => toast.error(m))
//                 : toast.error(data?.message)
//         },
//     })
// }

/****Create reservation : => Done for Africanshops */
export function useCreateReservation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    (newReservation) => {
      console.log("Run Product : ", newReservation);

      // return;
      return createUserReservations(newReservation);
    },

    {
      onSuccess: (data) => {
        console.log("New Reservation", data);
        // return

        if (data?.data?.success && data?.data?.createdReservation) {
          console.log("New product  Data", data);

          // return;
          toast.success("reservation  added successfully!");
          queryClient.invalidateQueries(["__reservationsById"]);
          queryClient.refetchQueries("__reservationsById", { force: true });
          navigate(`/bookings/reservation/review/${data?.data?.createdReservation?._id}`);
        } else if (data?.data?.error) {
          toast.error(data?.data?.error?.message);
          return;
        } else {
          toast.info("something unexpected happened");
          return;
        }
      },
    },
    {
      onError: (error, rollback) => {
        // return;
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
        console.log("MutationError", error.response.data);
        console.log("MutationError", error.data);
        rollback();
      },
    }
  );
}

// GET_ All USER _TRIPS useGetUserSingleTrip
/****Get user : => Done for Africanshops */
export function useUserTrips() {
  return useQuery(["__trips"], () => getUserTrips());
}

/***GET_USER_SINGLE_TRIP by servaevation_ID =>  Done for Africanshops*/ 
/****Get : => Done for Africanshops */
export function useGetUserSingleTrip(params) {
  return useQuery(
    ["__tripById", params],
    () => getUseTripByReservationId(params),
    {
      enabled: Boolean(params),
      // staleTime: 2000,
    }
  );
}

// GET_USER_ TRIP IN VIEW
export function useGetUserTripsInView() {
  return useQuery(
    ["__reservationsById"],
    () => getInViewUseTripByListingId()

  );
}

//update new reservation on payment
export function useReservationPaidUpdateMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  return useMutation(
    (formData) => {
      return updateReservationOnMakingPayment(formData);
    },
    {
      onSuccess: (data) => {
        console.log("paymentResponse", data)
        if (data?.data?.payload && data?.data?.message) {
          toast.success(
            `reservation added successfully,  ${data?.data?.message}`
          );
          navigate(`/bookings/${data?.data?.payload?._id}/payment-success`)
          return;
        } else if (data?.data?.error) {
          toast.error(data?.data?.error?.message);
          return;
        } else {
          toast.info("something unexpected happened");
          return;
        }
      },
      onError: (error) => {
        const {
          response: { data },
        } = error ?? {};
        Array.isArray(data?.message)
          ? data?.message?.map((m) => toast.error(m))
          : toast.error(data?.message);
      },
    }
  );
}


/**======================================================================= */
/***
 * BY AUTH AND GUEST USERS
 * ==============================================================
 */

//get single listing
export function useGetReservations(params) {
  return useQuery(
    ["__reservationsById", params],
    () => getUserReservationsByListingId(params),
    {
      enabled: Boolean(params),
      // staleTime: 2000,
    }
  );
}
