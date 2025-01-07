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
import { formatCurrency, generateClientUID } from "src/app/main/vendors-shop/pos/PosUtils";
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
 * Form Validation Schema
 */
const schema = z.object({
  name: z
    .string()
    .nonempty("You must enter name as is in your ID")
    .min(5, "The product name must be at least 5 characters"),
  phone: z
    .string()
    .nonempty("You must enter a phone for reaching you")
    .min(5, "The product name must be at least 5 characters"),
  address: z
    .string()
    .nonempty("You must enter an address as regulated by the gpvernment")
    .min(5, "The product name must be at least 5 characters"),
});

/**
 * The Courses page.
 */
function ReviewReservation() {
  const config = useAppSelector(selectFuseCurrentLayoutConfig);
  const user = useAppSelector(selectUser);
  const paymentMethods = ["Paystack", "Flutterwave"];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const { reservationId } = routeParams;

  const {
    data: singlereservation,
    isLoading,
    isError,
  } = useGetUserSingleTrip(reservationId);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch, control, formState } = methods;
  const { errors, isValid, dirtyFields } = formState;
  const { name, phone, address } = watch();

  useEffect(() => {}, [singlereservation?.data?.reservation?._id]);


  const {
    data: updatedPaymentData,
    mutate: updatePayment,
    isLoading: paymentLoading,
  } = useReservationPaidUpdateMutation();
  const publicKey = "pk_test_2af8648e2d689f0a4d5263e706543f3835c2fe6a";
  const amount = singlereservation?.data?.reservation?.totalPrice * 100;
  const email = user?.email;
  const onSuccess = async (reference) => {
    //1. update state of order setting isPaid=true
    try {
      const paymentMetaData = {
        name: name,
        phone: phone,
        address: address,
        amount: amount,
        reservationToPay: singlereservation?.data?.reservation?._id,
        paymentResult: reference,
      };


      if (reference?.status === "success") {
        return await updatePayment(paymentMetaData);
      } else {
        toast.error("Error ocured on this payment");
      }
    } catch (error) {
      // setLoading(false)
    }
  };
  const onClose = () => {
    alert("Wait! You need this reservation confirmed, don't go!!!!");
  };

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
        <ClienttErrorPage
          message={
            " Error occurred while retriving your reservation for onward processing"
          }
        />
      </motion.div>
    );
  }

  if (!singlereservation?.data?.reservation) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No reservations for review found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <FusePageSimple
      content={
        <>
          <div className="h-screen flex flex-col md:mx-200 mt-20">
            <div className="flex flex-1 flex-col md:flex-row gap-8">
              {/* Map */}

              {/* Main Content */}

              <div className="flex-1 p-4 bg-white rounded-md">
                <div className="max-w-5xl mx-auto p-4 overflow-scroll">
                  {singlereservation?.data?.reservation?.isPaid && (
                    <>
                      <span
                        onClick={() => {}}
                        className="cursor-pointer inline-flex  items-center gap-x-1.5 bg-green-500 dark:bg-white/10 text-success h-[45px] px-[14px] text-xs font-medium border border-normal dark:border-white/10 rounded-md sm:justify-center sm:px-0 "
                      >
                        {`Payment of ${formatCurrency(singlereservation?.data?.reservation?.totalPrice)} has been received for this reservation.`}
                        <br />

                        <Typography className="text-sm">
                          Head on to see reservation detals {"==>"}
                        </Typography>
                      </span>
                    </>
                  )}

                  {!singlereservation?.data?.reservation?.isPaid && (
                    <>
                      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                          <h2 className="text-lg font-semibold">
                            1. CUSTOMER ADDRESS
                          </h2>
                          <span
                            // href="#"
                            className="text-blue-500"
                          >
                            Change
                          </span>
                        </div>
                        {name && <p className="font-semibold">{name}</p>}

                        {address && (
                          <p>
                            {address} | {phone}
                          </p>
                        )}

                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mt-8 mb-16"
                              required
                              label="Name"
                              autoFocus
                              id="name"
                              variant="outlined"
                              fullWidth
                              error={!!errors.name}
                              helperText={errors?.name?.message}
                            />
                          )}
                        />

                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mt-8 mb-16"
                              required
                              label="Phone"
                              autoFocus
                              id="phone"
                              variant="outlined"
                              fullWidth
                              error={!!errors.phone}
                              helperText={errors?.phone?.message}
                            />
                          )}
                        />

                        <Controller
                          name="address"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mt-8 mb-16"
                              required
                              label="address"
                              autoFocus
                              id="address"
                              variant="outlined"
                              fullWidth
                              error={!!errors.address}
                              helperText={errors?.address?.message}
                            />
                          )}
                        />
                      </div>
                    </>
                  )}

                  {/* paymentMethods */}

                  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className="border-b pb-2 mb-2">
                      <h2 className="text-lg font-semibold">
                        2. TERMS & CONDITIONS
                      </h2>
                    </div>

                    <div className="mb-4 overflow-y-scroll">
                      <div className="flex items-center mb-2"></div>
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <p className="text-blue-500 font-semibold">
                          Terms and condition on booking a reservation on
                          Africanshops.
                        </p>
                        <p className="text-sm">
                          This may be because: 1) Your order is below the
                          minimum purchase amount of 2,000 naira or above the
                          maximum purchase amount of 250,000 naira; or 2) Cash
                          on delivery is not available for your delivery address
                          or the pick-up station selected; or 3) You have had
                          multiple failed delivery attempts or cancelled orders;
                          or 4) the number you are using to place the order is a
                          number that has a restriction
                        </p>
                        <p className="text-sm">
                          This may be because: 1) Your order is below the
                          minimum purchase amount of 2,000 naira or above the
                          maximum purchase amount of 250,000 naira; or 2) Cash
                          on delivery is not available for your delivery address
                          or the pick-up station selected; or 3) You have had
                          multiple failed delivery attempts or cancelled orders;
                          or 4) the number you are using to place the order is a
                          number that has a restriction
                        </p>
                        <p className="text-sm">
                          This may be because: 1) Your order is below the
                          minimum purchase amount of 2,000 naira or above the
                          maximum purchase amount of 250,000 naira; or 2) Cash
                          on delivery is not available for your delivery address
                          or the pick-up station selected; or 3) You have had
                          multiple failed delivery attempts or cancelled orders;
                          or 4) the number you are using to place the order is a
                          number that has a restriction
                        </p>
                        <p className="text-sm">
                          This may be because: 1) Your order is below the
                          minimum purchase amount of 2,000 naira or above the
                          maximum purchase amount of 250,000 naira; or 2) Cash
                          on delivery is not available for your delivery address
                          or the pick-up station selected; or 3) You have had
                          multiple failed delivery attempts or cancelled orders;
                          or 4) the number you are using to place the order is a
                          number that has a restriction
                        </p>

                        <p className="text-sm">
                          This may be because: 1) Your order is below the
                          minimum purchase amount of 2,000 naira or above the
                          maximum purchase amount of 250,000 naira; or 2) Cash
                          on delivery is not available for your delivery address
                          or the pick-up station selected; or 3) You have had
                          multiple failed delivery attempts or cancelled orders;
                          or 4) the number you are using to place the order is a
                          number that has a restriction
                        </p>
                        <p className="text-sm">
                          This may be because: 1) Your order is below the
                          minimum purchase amount of 2,000 naira or above the
                          maximum purchase amount of 250,000 naira; or 2) Cash
                          on delivery is not available for your delivery address
                          or the pick-up station selected; or 3) You have had
                          multiple failed delivery attempts or cancelled orders;
                          or 4) the number you are using to place the order is a
                          number that has a restriction
                        </p>
                        <p className="text-sm">
                          This may be because: 1) Your order is below the
                          minimum purchase amount of 2,000 naira or above the
                          maximum purchase amount of 250,000 naira; or 2) Cash
                          on delivery is not available for your delivery address
                          or the pick-up station selected; or 3) You have had
                          multiple failed delivery attempts or cancelled orders;
                          or 4) the number you are using to place the order is a
                          number that has a restriction
                        </p>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">Pre-pay Now</h3>
                  </div>
                </div>

                {/* end of AI build  */}
              </div>

              <div className="w-full md:w-1/3 bg-gray-100 relative  mt-4 md:mt-0 md:sticky top-16 h-[450px]">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-2">
                    Apartment Booking Summary
                  </h2>
                  <div className="flex justify-between mb-2">
                    <p>Check In</p>
                    <p>
                      {singlereservation?.data?.reservation?.startDate?.slice(
                        0,
                        10
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Check Out</p>
                    <p>
                      {singlereservation?.data?.reservation?.endDate?.slice(
                        0,
                        10
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between font-semibold mb-4">
                    <p>Total</p>
                    <p>
                      ₦{" "}
                      {formatCurrency(
                        singlereservation?.data?.reservation?.totalPrice
                      )}
                    </p>
                  </div>

                  <div className="flex mb-4">
                    <input
                      type="text"
                      placeholder="Enter code here"
                      className="border p-2 flex-grow mr-2"
                    />
                    <button className="bg-gray-200 p-2">APPLY</button>
                  </div>

                  {!singlereservation?.data?.reservation?.isPaid && (
                    <PaystackButton
                      text={`Make Payment of ${singlereservation?.data?.reservation?.totalPrice}`}
                      className="bg-orange-500 text-black w-full p-2 rounded-lg"
                      reference={"BK" + generateClientUID() + "REF"}
                      email={email}
                      amount={
                        singlereservation?.data?.reservation?.totalPrice * 100
                      }
                      publicKey={publicKey}
                      onSuccess={(reference) => onSuccess(reference)}
                      onClose={() => onClose()}
                      disabled={
                        _.isEmpty(dirtyFields) ||
                        !isValid ||
                        !name ||
                        !phone ||
                        !address
                      }
                    />
                  )}

                  {singlereservation?.data?.reservation?.isPaid && (
                    <span
                      onClick={() => {}}
                      className="cursor-pointer inline-flex  items-center gap-x-1.5 bg-green-500 dark:bg-white/10 text-success h-[45px] px-[14px] text-xs font-medium border border-normal dark:border-white/10 rounded-md sm:justify-center sm:px-0 "
                    >
                      {`Payment of ${formatCurrency(singlereservation?.data?.reservation?.totalPrice)} done alread, proceed to track your trip`}
                    </span>
                  )}

                  <p className="text-sm text-gray-500 mt-2">
                    By proceeding, you are automatically accepting the{" "}
                    <a href="#" className="text-blue-500">
                      Terms & Conditions
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}

    />
  );
}

export default ReviewReservation;
