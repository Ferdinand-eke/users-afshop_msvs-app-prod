
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Button, FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import {
  useGetUserSingleTrip,
  useReservationPaidUpdateMutation,
} from "app/configs/data/server-calls/auth/userapp/a_bookings/use-reservations";
import { useParams } from "react-router";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { useAppSelector } from "app/store/hooks";
import { selectFuseCurrentLayoutConfig } from "@fuse/core/FuseSettings/fuseSettingsSlice";
import { formatDateUtil } from "src/app/main/vendors-shop/pos/PosUtils";
import PaymentSuccessful from "./PaymentSuccessful";

const container = {
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};



/**
 * The Payment success page.
 */
function ReviewReservationPaymentSucces() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const config = useAppSelector(selectFuseCurrentLayoutConfig);
  const user = useAppSelector(selectUser);

  const routeParams = useParams();
  const { reservationId } = routeParams;
  if (!reservationId) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No reservation to process here!
        </Typography>
      </motion.div>
    );
  }

  const {
    data: successPaidReservation,
    isLoading,
    isError,
  } = useGetUserSingleTrip(reservationId);


  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          Error loading reservation details
        </Typography>
      </motion.div>
    );
  }

  return (
    <>
      {successPaidReservation?.data?.reservation?.isPaid && (
        <PaymentSuccessful
          userName={user?.name}
          reservationId={successPaidReservation?.data?.reservation?.id}
          checkInDate={formatDateUtil(successPaidReservation?.data?.reservation?.startDate)}
          checkOutDate={formatDateUtil(successPaidReservation?.data?.reservation?.endDate)}
          propertyName={successPaidReservation?.data?.reservation?.listing?.title}
        />
      )}

      {!successPaidReservation?.data?.reservation?.isPaid && (
        <FusePageSimple
          content={
            <div className="w-full my-auto mx-10 md:m-[200px] p-8 items-center">
              <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-md shadow-md">
                <div className="md:w-1/2 w-full">
                  <h1 className="text-2xl font-bold mb-4 text-red-600">
                    Payment Unsuccessful
                  </h1>
                  <p className="text-gray-600 mb-6">
                    An error has occurred while confirming this payment. Please
                    try again or contact support.
                  </p>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button
                      variant="contained"
                      component={NavLinkAdapter}
                      to={`/bookings/${reservationId}/review`}
                      sx={{
                        backgroundColor: "#ea580c",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#c2410c",
                        },
                      }}
                    >
                      Try Again
                    </Button>
                    <Button
                      variant="outlined"
                      component={NavLinkAdapter}
                      to="/bookings/listings"
                      sx={{
                        textTransform: "none",
                        borderColor: "#d1d5db",
                        color: "#374151",
                      }}
                    >
                      View More Apartments
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 w-full mt-8 md:mt-0 flex justify-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/021/411/153/non_2x/restricted-credit-card-icon-flat-payment-error-vector.jpg"
                    alt="Payment error illustration"
                    className="w-64 h-100 object-contain"
                  />
                </div>
              </div>
            </div>
          }
          scroll={isMobile ? "normal" : "page"}
        />
      )}
    </>
  );
}

export default ReviewReservationPaymentSucces;
