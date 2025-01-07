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
import {
  formatCurrency,
  generateClientUID,
} from "src/app/main/vendors-shop/pos/PosUtils";
import { format } from "date-fns";
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
import FoodCartSummaryAndPay from "./components/FoodCartSummaryAndPay";
import useSellerCountries from "app/configs/data/server-calls/countries/useCountries";
import {
  getLgasByStateId,
  getMarketsByLgaId,
  getStateByCountryId,
} from "app/configs/data/client/RepositoryClient";
import { useGetMyFoodCart } from "app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo";

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
  orderCountryDestination: z
    .string()
    .nonempty("You must enter a country for this order"),
    // .min(5, "The product name must be at least 5 characters"),
  orderStateProvinceDestination: z
    .string()
    .nonempty("You must enter a state destination for this order"),
    // .min(5, "The product name must be at least 5 characters"),
  orderLgaDestination: z
    .string()
    .nonempty("You must enter an L.G.A/County for this order"),
    // .min(5, "The product name must be at least 5 characters"),
    orderMarketPickupDestination: z
    .string()
    .nonempty("You must enter a market pick up point for this order"),
    // .min(5, "The product name must be at least 5 characters"),
    district: z
    .string()
    .nonempty("You must enter a market pick up point for this order"),
    // .min(5, "The product name must be at least 5 characters"),
});


/**
 * The Courses page.
 */
function FoodCartReview() {
  const user = useAppSelector(selectUser);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));


  const { data: foodCart, isLoading: foodCartLoading } = useGetMyFoodCart();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");

  const handleChange = (event) => {
    setSelectedPaymentOption(event.target.value);
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch, control, formState, getValues } = methods;
  const { errors, isValid, dirtyFields } = formState;
  const {
    name,
    phone,
    address,
    orderCountryDestination,
    orderStateProvinceDestination,
    orderLgaDestination,
    orderMarketPickupDestination,
    district,
  } = watch();

  const publicKey = "pk_test_2af8648e2d689f0a4d5263e706543f3835c2fe6a";

  const email = user?.email;


  const payments = [
    {
      type: "Paystack",
      shortbio: "Payment using paystack channel",
      keycode: "PAYSTACK",
    },
    {
      type: "Flutterwave",
      shortbio: "Payment using flutterwave channel",
      keycode: "FLUTTERWAVE",
    },
    {
      type: "Pay on delivery",
      shortbio: "Payment on delivery of your package",
      keycode: "PAYONDELIVERY",
    },
  ];

  // console.log("generatedClientUUID", generateClientUID());

  const { data: countryData } = useSellerCountries();
  const [loading, setLoading] = useState(false);
  const [blgas, setBlgas] = useState([]);
  const [markets, setBMarkets] = useState([]);
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    if (getValues()?.orderCountryDestination) {
      findStatesByCountry(getValues()?.orderCountryDestination);
    }

    if (getValues()?.orderStateProvinceDestination) {
      getLgasFromState(getValues()?.orderStateProvinceDestination);
    }

    if (getValues()?.orderLgaDestination) {
      getMarketsFromLgaId(getValues()?.orderLgaDestination);
    }
  }, [
    // transferData,
    getValues()?.orderCountryDestination,
    getValues()?.orderStateProvinceDestination,
    getValues()?.orderLgaDestination,
  ]);

  async function findStatesByCountry() {
    setLoading(true);
    const stateResponseData = await getStateByCountryId(
      getValues()?.orderCountryDestination
    );

    if (stateResponseData) {
      setStateData(stateResponseData?.data);

      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  //**Get L.G.As from state_ID data */
  async function getLgasFromState(sid) {
    setLoading(true);
    const responseData = await getLgasByStateId(sid);

    if (responseData) {
      setBlgas(responseData?.data);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  //**Get Marketss from lga_ID data */ getShopById
  async function getMarketsFromLgaId(lid) {
    if (lid) {
      setLoading(true);
      const responseData = await getMarketsByLgaId(lid);
      console.log("marketsByLGA", responseData)
      if (responseData) {
        setBMarkets(responseData?.data);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      }
    }
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
              
                  <>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                      <div className="flex justify-between items-center border-b pb-2 mb-2">
                        <h2 className="text-lg font-semibold">
                          1. CUSTOMER BILLING & SHIPPING ADDRESS
                        </h2>
                        <span className="text-blue-500 cursor-pointer">
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

                      <div className="flex justify-between items-center mb-10">
                        <div className="">
                          <Typography>Country location</Typography>
                          <Controller
                            control={control}
                            name="orderCountryDestination"
                            className="mt-8 mb-16"
                            render={({ field }) => (
                              <Select
                                sx={{
                                  "& .MuiSelect-select": {
                                    minHeight: "0!important",
                                  },
                                }}
                                {...field}
                                label="Country Location"
                                placeholder="County of location"
                                variant="outlined"
                                fullWidth
                                error={!!errors.orderCountryDestination}
                                helperText={errors?.orderCountryDestination?.message}
                              >
                                {countryData?.data?.data?.map(
                                  (buzcountry, index) => (
                                    <MenuItem
                                      key={index}
                                      value={buzcountry?._id}
                                    >
                                      {buzcountry?.name}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            )}
                          />
                        </div>

                        <div className="">
                          <Typography>Sate location</Typography>
                          <Controller
                            control={control}
                            name="orderStateProvinceDestination"
                            render={({ field }) => (
                              <Select
                                sx={{
                                  "& .MuiSelect-select": {
                                    minHeight: "0!important",
                                  },
                                }}
                                {...field}
                                label="State Location"
                                placeholder="State of location"
                                variant="outlined"
                                fullWidth
                                error={!!errors.orderStateProvinceDestination}
                                helperText={errors?.orderStateProvinceDestination?.message}
                              >
                                {stateData?.map((buzstate, index) => (
                                  <MenuItem key={index} value={buzstate?._id}>
                                    {buzstate?.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="">
                          <Typography>L.G.A/County location</Typography>
                          <Controller
                            control={control}
                            name="orderLgaDestination"
                            render={({ field }) => (
                              <Select
                                sx={{
                                  "& .MuiSelect-select": {
                                    minHeight: "0!important",
                                  },
                                }}
                                {...field}
                                label="L.G.A/County of Location"
                                placeholder="L.G.A/County of location"
                                variant="outlined"
                                fullWidth
                                error={!!errors.orderLgaDestination}
                                helperText={errors?.orderLgaDestination?.message}
                              >
                                {blgas?.map((lga, index) => (
                                  <MenuItem key={index} value={lga?._id}>
                                    {lga?.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                        </div>

                        <div className="">
                          <Typography>Market location</Typography>
                          <Controller
                            control={control}
                            name="orderMarketPickupDestination"
                            render={({ field }) => (
                              <Select
                                sx={{
                                  "& .MuiSelect-select": {
                                    minHeight: "0!important",
                                  },
                                }}
                                {...field}
                                label="Market Pick Up Location"
                                placeholder="Market Pick Up location"
                                variant="outlined"
                                fullWidth
                                error={!!errors.orderMarketPickupDestination}
                                helperText={errors?.orderMarketPickupDestination?.message}
                              >
                                {markets?.map((market, index) => (
                                  <MenuItem key={index} value={market?._id}>
                                    {market?.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                        </div>
                      </div>

                      <Controller
                        name="district"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mt-8 mb-16"
                            required
                            label="district"
                            autoFocus
                            id="district"
                            variant="outlined"
                            fullWidth
                            error={!!errors.district}
                            helperText={errors?.district?.message}
                          />
                        )}
                      />

                    </div>
                  </>

                  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                      <h2 className="text-lg font-semibold">
                        2. DELIVERY DETAILS
                      </h2>
                      <span className="text-blue-500 cursor-pointer">
                        Change
                      </span>
                    </div>
                    <p className="font-semibold">Door Delivery</p>
                    <p>
                      Delivery between <strong>11 December</strong> and{" "}
                      <strong>13 December</strong>.
                    </p>
                  </div>
                  {/* paymentMethods */}

                  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className="border-b pb-2 mb-2">
                      <h2 className="text-lg font-semibold">
                        3. PAYMENT METHOD
                      </h2>
                    </div>
                    {payments?.map((optionType) => (
                      <div className="mb-4">
                        <div
                          className="flex items-center mb-2"
                          key={optionType?.keycode}
                        >
                          <input
                            type="radio"
                            name="payment"
                            className="mr-2"
                            value={optionType?.keycode}
                            onChange={handleChange}
                          />
                          <label className="flex items-center">
                            <i className="fas fa-check-circle text-orange-500 mr-2"></i>
                            {optionType?.type}
                          </label>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <p>{optionType?.shortbio}</p>
                          <a href="#" className="text-blue-500">
                            Details
                          </a>
                        </div>
                      </div>
                    ))}

                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className="border-b pb-2 mb-2">
                      <h2 className="text-lg font-semibold">
                        4. TERMS & CONDITIONS
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
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </div>

              </div>

              <div className="w-full md:w-1/3 relative  mt-4 md:mt-0 md:sticky top-16 h-[450px]">
                <FoodCartSummaryAndPay
                  intemsInCart={foodCart?.data?.foodcart}
                  methodOfPay={selectedPaymentOption}
                  name={name}
                  phone={phone}
                  address={address}
                  orderCountryDestination={orderCountryDestination}
                  orderStateProvinceDestination={orderStateProvinceDestination}
                  orderLgaDestination={orderLgaDestination}
                  orderMarketPickupDestination={orderMarketPickupDestination}
                  district={district}
                  dirtyFields={dirtyFields}
                  isValid={isValid}
                />
              </div>
            </div>
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default FoodCartReview;
