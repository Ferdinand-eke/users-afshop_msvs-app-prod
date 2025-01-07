import _ from "@lodash";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
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
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import { format } from "date-fns";
import ClienttErrorPage from "../../components/ClienttErrorPage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Controller,
  // useFormContext
} from "react-hook-form";
import { toast } from "react-toastify";
import { PaystackButton } from "react-paystack";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { useAppSelector } from "app/store/hooks";
import { selectFuseCurrentLayoutConfig } from "@fuse/core/FuseSettings/fuseSettingsSlice";

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


  return (
    <FusePageSimple
      content={
        <>
          <div className="w-full my-auto mx-10 md:m-[200px]  p-8 items-center">
            <div className="flex items-center justify-between bg-green-100 p-4 rounded-md mb-8">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 text-xl mr-2"></i>
                <span className="text-green-700 font-medium">
                  Almost there Prasad!
                </span>
              </div>
              <button className="text-green-700">
                <i className="fas fa-times"></i>
              </button>
            </div>

            {successPaidReservation?.data?.reservation?.isPaid && (
              <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-md shadow-md">
                <div className="md:w-1/2 w-full">
                  <h1 className="text-2xl font-bold mb-4">
                    Payment successful
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Thank you for choosing Africanshops Homes. Your Paymeny has
                    been received and we look forward to hosting you.
                  </p>
                  <p>Warm Regards!</p>
                  
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button
                      size="small"
                      component={NavLinkAdapter}
                      to={`/bookings/listings`}
                      className="border border-orange-500 text-green-500 px-4 py-2 rounded-md"
                    >
                      View More Apartments
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 w-full  mt-8 md:mt-0 flex justify-center">
                  <img
                    src="https://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png"
                    alt="Illustration of a person celebrating with confetti"
                    className="w-64 h-100 object-contain"
                  />
                </div>
              </div>
            )}

            {!successPaidReservation?.data?.reservation?.isPaid && (
              <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-md shadow-md">
                <div className="md:w-1/2 w-full">
                  <h1 className="text-2xl font-bold mb-4">
                    Payment Un-successful
                  </h1>
                  <p className="text-gray-600 mb-6">
                    An error has occurred while confirmimg this payment
                  </p>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button
                      size="small"
                      component={NavLinkAdapter}
                      to={`/bookings/listings`}
                      className="border border-orange-500 text-green-500 px-4 py-2 rounded-md"
                    >
                      View More Apartments
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 w-full  mt-8 md:mt-0 flex justify-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/021/411/153/non_2x/restricted-credit-card-icon-flat-payment-error-vector.jpg"
                    alt="Illustration of a person celebrating with confetti"
                    className="w-64 h-100 object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ReviewReservationPaymentSucces;
