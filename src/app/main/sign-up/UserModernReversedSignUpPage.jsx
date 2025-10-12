import { Controller, useForm } from "react-hook-form";
import { lighten, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import CountrySelect from "src/app/apselects/countryselect";
import {
  getLgaByStateId,
  getMarketsByLgaId,
  getStateByCountryId,
} from "app/configs/data/client/clientToApiRoutes";
import StateSelect from "src/app/apselects/stateselect";
import LgaSelect from "src/app/apselects/lgaselect";
import MarketSelect from "src/app/apselects/marketselect";
import TradehubSelect from "src/app/apselects/tradehubselect";
import { InputAdornment } from "@mui/material";

import { orange } from "@mui/material/colors";
import clsx from "clsx";
import { useShopSignUpWithOtp } from "app/configs/data/server-calls/useUsers/useUsersQuery";
import {
  getMerchantSignUpToken,
  getResendMerchantSignUpOtp,
  removeUserSignUpToken,
  removeResendMerchantSignUpOtp,
  setResendMerchantSignUpOtp,
} from "app/configs/utils/authUtils";
import MerchantModernReversedActivatePage from "./UserModernReversedActivatePage";
/**
 * Form Validation Schema
 */
const schema = z
  .object({
    name: z.string().nonempty("You must enter your business/shop name"),
    email: z
      .string()
      .email("You must enter a valid email")
      .nonempty("You must enter an email"),
    password: z
      .string()
      .nonempty("Please enter your password.")
      .min(8, "Password is too short - should be 8 chars minimum."),
    passwordConfirm: z.string().nonempty("Password confirmation is required"),
    acceptTermsConditions: z
      .boolean()
      .refine(
        (val) => val === true,
        "The terms and conditions must be accepted."
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });
const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,

  userOwner: "",
  address: "",
  businessCountry: "",
  businezState: "",
  businezLga: "",
  tradehub: "",
  market: "",

  coverimage: "",
  shoplogo: "",
  phone: "",
  verified: "false",
  shopplan: "",
};

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  MOREINFO: 2,
  DESCRIPTION: 3,
};

/***Styled */
const Root = styled("div")(({ theme }) => ({
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },
  "& .productImageUpload": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  "& .productImageItem": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& .productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& .productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover .productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

/**
 * The modern reversed sign up page.
 */
function UserModernReversedSignUpPage() {
  const clientSignUpData = getResendMerchantSignUpOtp();
  const remoteResponseToken = getMerchantSignUpToken();
  const routeParams = useParams();
  const sigupClientUsers = useShopSignUpWithOtp();
  const {
    control,
    formState,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  const location = watch("location");
  const businezState = watch("businezState");
  const businezLga = watch("businezLga");
  const market = watch("market");
  const tradehub = watch("tradehub");

  const shopregistry = {
    ...getValues(),
    businessCountry: getValues()?.location?.id,
    businezState: getValues()?.businezState?.id,
    businezLga: getValues()?.businezLga?.id,
    tradehub: getValues()?.tradehub?.id,
    market: getValues()?.market?.id,
  };


  function onSubmit() {

    sigupClientUsers.mutate(shopregistry);
  }

  /****Resend OTP on expiration of OTP */
  const resendOTP = () => {

    if (!clientSignUpData?.email) {
      if (
        window.confirm("Some hitch occured, restart the unboarding process?")
      ) {
        removeUserSignUpToken();
        removeResendMerchantSignUpOtp();
      }
    }
    sigupClientUsers.mutate(clientSignUpData);
  };

  const [step, setStep] = useState(STEPS.CATEGORY);
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };
  const actionLable = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);
  const secondaryActionLable = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const secondaryAction = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }
    return onBack;
  }, [step]);

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const [loading, setLoading] = useState(false);
  const [blgas, setBlgas] = useState([]);
  const [markets, setBMarkets] = useState([]);
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    if (location?.id?.length > 0) {
      findStatesByCountry(location?.id);
    }

    if (getValues()?.businezState?.id?.length > 0) {
      getLgasFromState(getValues()?.businezState?.id);
    }

    if (getValues()?.businezLga?.id?.length > 0) {
      getMarketsFromLgaId(getValues()?.businezLga?.id);
    }
  }, [
    location?.id,
    businezState?.id,
    businezLga?.id,
    sigupClientUsers?.isSuccess,
  ]);

  useEffect(() => {
    if (sigupClientUsers?.isSuccess) {
      if (shopregistry?.businessCountry) {
        setResendMerchantSignUpOtp(shopregistry);
      }
    }
  }, [
    sigupClientUsers?.isSuccess,
     remoteResponseToken,
     
    ]);

  async function findStatesByCountry(countryId) {
    setLoading(true);
    const stateResponseData = await getStateByCountryId(countryId);
     console.log("States", stateResponseData?.data)


    if (stateResponseData) {
      setStateData(stateResponseData?.data?.states);

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
    const responseData = await getLgaByStateId(sid);

    if (responseData) {
      setBlgas(responseData?.data?.lgas);
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
      if (responseData) {
        setBMarkets(responseData?.data?.markets);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      }
    }
  }


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Typography
        className="px-[10px] xs:px-[30px] pt-[26px] pb-[25px] text-dark dark:text-white/[.87] text-[18px] font-semibold border-b border-regular dark:border-white/10"
      >
        Email Details :{" "}
        <span className="mt-2 flex items-baseline font-medium">
          What e-mail are you looking to use as your primary contact email
        </span>
      </Typography>
      <>
        <>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="Name"
                autoFocus
                type="name"
                error={!!errors.name}
                helperText={errors?.name?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />

          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-24"
                label="Password (Confirm)"
                type="password"
                error={!!errors.passwordConfirm}
                helperText={errors?.passwordConfirm?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
        </>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[30vh] overflow-y-auto"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[30vh] overflow-y-auto"></div>
      </>
    </div>
  );

  
  if (step == STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Typography
          // as="h3"
          className="px-[40px] xs:px-[30px] pt-[26px] pb-[25px] text-dark dark:text-white/[.87] text-[18px] font-semibold border-b border-regular dark:border-white/10"
        >
          Location : Where are you located?. <p className="text-[10px]">Note: This location will be used as your closest pick-up location</p>
        </Typography>
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[30vh] overflow-y-auto"></div>
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />

          {location?.id && (
            <StateSelect
              states={stateData}
              value={businezState}
              onChange={(value) => setCustomValue("businezState", value)}
            />
          )}

          {businezState?.id && (
            <LgaSelect
              blgas={blgas}
              value={businezLga}
              onChange={(value) => setCustomValue("businezLga", value)}
            />
          )}

          {businezState?.id && businezLga?.id && (
            <MarketSelect
              markets={markets}
              value={market}
              onChange={(value) => setCustomValue("market", value)}
            />
          )}

        </>
      </div>
    );
  }

  if (step == STEPS.MOREINFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Typography
          // as="h3"
          className="px-[40px] xs:px-[30px] pt-[26px] pb-[25px] text-dark dark:text-white/[.87] text-[18px] font-semibold border-b border-regular dark:border-white/10"
        >
          More Info : Provide us some more info to set you up nicely <p className="text-[10px]">Note: This address provided here will be used as your delivery and billing address</p>
        </Typography>
        <>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                label="Merchant Phone"
                id="phone"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Phone</InputAdornment>
                  ),
                }}
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
                label="Merchant Phone"
                id="address"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Address</InputAdornment>
                  ),
                }}
                fullWidth
                error={!!errors.address}
                helperText={errors?.address?.message}
              />
            )}
          />
        </>
      </div>
    );
  }
  if (step == STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Typography
          // as="h3"
          className="px-[40px] xs:px-[30px] pt-[26px] pb-[25px] text-dark dark:text-white/[.87] text-[18px] font-semibold border-b border-regular dark:border-white/10"
        >
          T&C : Accept our terms and conditions and proceed
        </Typography>
        <>
  

          <Controller
            name="acceptTermsConditions"
            control={control}
            render={({ field }) => (
              <FormControl
                className="items-center"
                error={!!errors.acceptTermsConditions}
              >
                <FormControlLabel
                  label="I agree to the Terms of Service and Privacy Policy"
                  control={<Checkbox size="small" {...field} />}
                />
                <FormHelperText>
                  {errors?.acceptTermsConditions?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </>
      </div>
    );
  }
  return (
    <div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-32">
      <Paper className="flex min-h-full w-full overflow-hidden rounded-0 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:shadow md:w-full md:max-w-6xl">
        <Box
          className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
          sx={{ backgroundColor: "primary.main" }}
        >
          <svg
            className="pointer-events-none absolute inset-0"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Box
              component="g"
              sx={{ color: "primary.light" }}
              className="opacity-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </Box>
          </svg>
          <Box
            component="svg"
            className="absolute -right-64 -top-64 opacity-20"
            sx={{ color: "primary.light" }}
            viewBox="0 0 220 192"
            width="220px"
            height="192px"
            fill="none"
          >
            <defs>
              <pattern
                id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width="220"
              height="192"
              fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
            />
          </Box>

          <div className="relative z-10 w-full max-w-2xl">
            <div className="text-7xl font-bold leading-none text-gray-100">
              <div>Welcome to</div>
              <div>our community</div>
            </div>
            <div className="mt-24 text-lg leading-6 tracking-tight text-gray-400">
      
            </div>
            
          </div>
        </Box>

        
        
       <>
        {!remoteResponseToken.length > 0 ? (
          <div className="w-full px-16 py-32 ltr:border-l-1 rtl:border-r-1 sm:w-auto sm:p-48 md:p-64">
            <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
              <img
                className="w-40"
                src="assets/images/afslogo/afslogo.png"
                alt="logo"
              />

              <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
                Sign up for trade based activities
              </Typography>
              <div className="mt-2 flex items-baseline font-medium">
                <Typography>Already have an account?</Typography>
                <Link className="ml-4" to="/sign-in">
                  Sign in
                </Link>
              </div>

              <form
                name="registerForm"
                noValidate
                className="mt-32 flex w-full flex-col justify-center overflow-scroll"
                onSubmit={handleSubmit(onSubmit)}
              >
                {bodyContent}

                <Button
                  className="bg-regularBG dark:bg-regularBGdark h-[50px] ltr:mr-[20px] rtl:ml-[20px] px-[22px] text-[15px] text-body dark:text-white/60 hover:text-light font-normal border-regular dark:border-white/10"
                  size="large"
                  onClick={secondaryAction}
                  disabled={step == STEPS.CATEGORY}
                >
                  Back
                </Button>
                {step < 3 ? (
                  <Button
                    className="bg-regularBG dark:bg-regularBGdark h-[50px] ltr:mr-[20px] rtl:ml-[20px] px-[22px] text-[15px] text-body dark:text-white/60 hover:text-light font-normal border-regular dark:border-white/10"
                    size="large"
                    onClick={onNext}
                    disabled={step == STEPS.DESCRIPTION}
                  >
                    Next
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      className=" mt-24 w-full"
                      aria-label="Register"
                      disabled={
                        _.isEmpty(dirtyFields) ||
                        !isValid ||
                        sigupClientUsers?.isLoading
                      }
                      type="submit"
                      size="large"
                    >
                      Create your free account
                    </Button>
                  </>
                )}
              </form>
            </div>
          </div>
        ) : (
          <MerchantModernReversedActivatePage resendOTP={resendOTP} />
        )}
        </>
       




      </Paper>
    </div>
  );
}

export default UserModernReversedSignUpPage;
