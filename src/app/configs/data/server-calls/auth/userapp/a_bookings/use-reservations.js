import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  cancelReservationApi,
  createUserReservations,
  createUserReservationsOnRoom,
  getInViewUseTripByListingId,
  getUseTripByReservationId,
  getUserCancelledTrips,
  getUserTrips,
  requestRefundForReservationApi,
  updateReservationOnMakingPayment,
} from "app/configs/data/client/RepositoryAuthClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  getUserReservationsByListingId,
  getUserReservationsByRoomId,
} from "app/configs/data/client/RepositoryClient";

/***
 * ==========================================================================
 * BY AUTHENTICATED USERS
 * ==========================================================================
 */

/**** 1) Create reservation : => Done for Africanshops */ //(Done => Msvs)
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
          navigate(
            `/bookings/reservation/review/${data?.data?.createdReservation?._id}`
          );
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
        // toast.error(
        //   error.response && error.response.data.message
        //     ? error.response.data.message
        //     : error.message
        // );

        console.log("MutationError", error.response.data);
        console.log("MutationError", error.data);

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
} //(Done => Msvs)

/**** 1.1) Create reservation On Room : => Done for Africanshops */ //(Done => Msvs)
export function useCreateReservationOnRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    (newReservation) => {
      // console.log("Run Product : ", newReservation);
      return createUserReservationsOnRoom(newReservation);
    },

    {
      onSuccess: (data) => {
        console.log("New room reservation  Data", data);

        if (data?.data?.success && data?.data?.createdReservation) {
          // return;
          toast.success("reservation  added successfully!");
          queryClient.invalidateQueries(["__reservationsById"]);
          queryClient.refetchQueries("__reservationsById", { force: true });
          navigate(
            `/bookings/reservation/review/${data?.data?.createdReservation?.id}`
          );
        }

        // else if (data?.data?.error) {
        //   toast.error(data?.data?.error?.message);
        //   return;
        // } else {
        //   toast.info("something unexpected happened");
        //   return;
        // }
      },
    },
    {
      onError: (error, rollback) => {
        console.log("MutationError", error.response.data);
        console.log("MutationError", error);

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
} //(Done => Msvs)

/**** 2)GET_ All USER _TRIPS Get user : => Done for Africanshops */ //(Done => Msvs)
export function useUserTrips() {
  return useQuery(["__trips"], () => getUserTrips());
} //(Done => Msvs)

/*** 3) GET_USER_SINGLE_TRIP by servaevation_ID =>  Done for Africanshops*/ //(Done => Msvs)
export function useGetUserSingleTrip(params) {
  return useQuery(
    ["__tripById", params],
    () => getUseTripByReservationId(params),
    {
      enabled: Boolean(params),
      // staleTime: 2000,
    }
  );
} // (Done => Msvs)

/***** 4) GET_USER_ TRIP IN VIEW */
export function useGetUserTripsInView() {
  return useQuery(["__reservationsById"], () => getInViewUseTripByListingId());
}

/**** 5) Update new reservation on payment */ //(Done => Msvs)
export function useReservationPaidUpdateMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (formData) => {
      return updateReservationOnMakingPayment(formData);
    },
    {
      onSuccess: (data) => {
        if (
          data?.data?.success
          // && data?.data?.payload
        ) {
          toast.success(
            `${data?.data?.message ? data?.data?.message : "reservation added successfully!"}`
          );
          navigate(`/bookings/${data?.data?.payload?.id}/payment-success`);
          return;
        }

        // else if (data?.data?.error) {
        //   toast.error(data?.data?.error?.message);
        //   return;
        // } else {
        //   toast.info("something unexpected happened");
        //   return;
        // }
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
} //(Done => Msvs)

/**======================================================================= */
/***
 * BY AUTH AND GUEST USERS
 * ==============================================================
 */

//**** 6) get single listing */
export function useGetReservations(params) {
  return useQuery(
    ["__reservationsById", params],
    () => getUserReservationsByListingId(params),
    {
      enabled: Boolean(params),
    }
  );
}

/**** 6.1) get single room  getUserReservationsByRoomId*/
export function useGetReservationsOnRoom(params) {
  return useQuery(
    ["__reservationsByIdOnRoom", params],
    () => getUserReservationsByRoomId(params),
    {
      enabled: Boolean(params),
    }
  );
} // (Done => Msvs)

/**** 7) cancel reservation within 48hrs-window before check-in */
export function useCancelUserReservation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (formData) => {
      return cancelReservationApi(formData);
    },
    {
      onSuccess: (data) => {
        console.log("cancellation___Response", data);
        if (data?.data?.success) {
          toast.success(
            `${data?.data?.message ? data?.data?.message : "reservation canceled successfully!"}`
          );
          navigate(`/bookings/my-reservations`);
          return;
        } else if (!data?.data?.success) {
          toast.error(
            `${data?.data?.message ? data?.data?.message : data?.data?.error?.message}`
          );
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

/**** 8)GET_ All USER CANCELLED_RESERVATIONS/TRIPS */
export function useUserCancelledTrips() {
  return useQuery(["__cancelledtrips"], () => getUserCancelledTrips());
} // (Done => Msvs)

/**** 9)Request Refund For cancelled reservation */
export function useRequestRefundForUserCancelledReservation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (formData) => {
      return requestRefundForReservationApi(formData);
    },
    {
      onSuccess: (data) => {
        console.log("Refund___Response", data);
        if (data?.data?.success) {
          toast.success(
            `${data?.data?.message ? data?.data?.message : "refund request placed successfully!"}`
          );
          // navigate(`/bookings/my-reservations`)
          queryClient.invalidateQueries(["__cancelledtrips"]);
          return;
        } else if (!data?.data?.success) {
          toast.error(
            `${data?.data?.message ? data?.data?.message : data?.data?.error?.message}`
          );
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
