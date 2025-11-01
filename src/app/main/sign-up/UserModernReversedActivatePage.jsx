import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useStoreUserPreSignUpFromOtp } from "app/configs/data/server-calls/useUsers/useUsersQuery";
import {
  getMerchantSignUpToken,
  removeUserSignUpToken,
  removeResendMerchantSignUpOtp,
  getResendMerchantSignUpOtp,
} from "app/configs/utils/authUtils";
import { Alert, CircularProgress } from "@mui/material";
import { CheckCircleOutline, Email } from "@mui/icons-material";

/**
 * Form Validation Schema
 */
const schema = z.object({
  otp: z.string().min(1, "You must enter your OTP code"),
});

const defaultValues = {
  otp: "",
  preuser: "",
};

/**
 * UserModernReversedActivatePage Component
 * Professional OTP activation page with orange gradient branding
 */
function UserModernReversedActivatePage({ resendOTP }) {
  const remoteResponseToken = getMerchantSignUpToken();
  const avtivateMerchant = useStoreUserPreSignUpFromOtp();
  const clientSignUpData = getResendMerchantSignUpOtp();

  const { control, formState, handleSubmit, reset, getValues, setValue } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    setValue("preuser", remoteResponseToken);
    avtivateMerchant.mutate(getValues());
  }

  useEffect(() => {
    if (avtivateMerchant?.isSuccess) {
      removeUserSignUpToken();
      removeResendMerchantSignUpOtp();
    }
  }, [avtivateMerchant?.isSuccess]);

  return (
    <div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-32">
      <Paper className="flex min-h-full w-full overflow-hidden rounded-0 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:shadow md:w-full md:max-w-6xl">
        {/* Right Side - Illustration */}
        <Box
          className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          }}
        >
          {/* Decorative SVG Background */}
          <svg
            className="pointer-events-none absolute inset-0"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="opacity-20" fill="none" stroke="white" strokeWidth="100">
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </g>
          </svg>
          <Box
            component="svg"
            className="absolute -right-64 -top-64 opacity-20"
            viewBox="0 0 220 192"
            width="220px"
            height="192px"
            fill="none"
          >
            <defs>
              <pattern
                id="activate-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" fill="white" />
              </pattern>
            </defs>
            <rect width="220" height="192" fill="url(#activate-pattern)" />
          </Box>

          <div className="relative z-10 w-full max-w-2xl">
            <div className="text-7xl font-bold leading-none text-white">
              <div>Almost</div>
              <div>There!</div>
            </div>
            <div className="mt-24 text-lg leading-6 tracking-tight text-white/90">
              We've sent a verification code to your email. Please check your inbox and enter the code below to activate your account.
            </div>

            {/* Visual Email Illustration */}
            <div className="mt-32 flex items-center justify-center">
              <div
                className="relative p-32 rounded-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Email sx={{ fontSize: "8rem", color: "white" }} />
                <div
                  className="absolute -top-8 -right-8 w-64 h-64 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(34, 197, 94, 0.9)",
                  }}
                >
                  <CheckCircleOutline sx={{ fontSize: "2rem", color: "white" }} />
                </div>
              </div>
            </div>

            <div className="mt-32">
              <Typography className="text-white/80 text-sm text-center">
                Can't find the email? Check your spam folder or request a new code.
              </Typography>
            </div>
          </div>
        </Box>

        {/* Left Side - Form */}
        <div className="w-full px-16 py-32 ltr:border-l-1 rtl:border-r-1 sm:w-auto sm:p-48 md:p-64">
          <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
            {/* Logo with Orange Gradient Background */}
            <div
              className="flex h-56 w-56 items-center justify-center rounded-xl mb-32"
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                boxShadow: "0 4px 20px rgba(234, 88, 12, 0.3)",
              }}
            >
              <img
                className="w-40"
                src="assets/images/afslogo/afslogo.png"
                alt="logo"
              />
            </div>

            <Typography className="text-4xl font-extrabold leading-tight tracking-tight">
              Verify Your Email
            </Typography>
            <div className="mt-8">
              <Typography className="text-gray-600">
                Enter the verification code sent to{" "}
                <span
                  className="font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {clientSignUpData?.email || "your email"}
                </span>
              </Typography>
            </div>

            {/* Info Box */}
            <div
              className="mt-32 p-16 rounded-xl border-2"
              style={{
                borderColor: "#fed7aa",
                backgroundColor: "rgba(254, 215, 170, 0.1)",
              }}
            >
              <div className="flex items-start gap-12">
                <Email sx={{ color: "#ea580c", fontSize: "1.5rem", mt: 0.5 }} />
                <div>
                  <Typography variant="body2" className="font-semibold text-gray-900 mb-4">
                    Check Your Inbox
                  </Typography>
                  <Typography variant="caption" className="text-gray-700 leading-relaxed block">
                    We've sent a verification code to your email address. The code will expire in 10 minutes.
                  </Typography>
                </div>
              </div>
            </div>

            {/* Error/Success Messages */}
            {avtivateMerchant?.isError && (
              <Alert
                severity="error"
                className="mt-24"
                sx={{
                  borderRadius: "12px",
                  "& .MuiAlert-message": {
                    width: "100%",
                  },
                }}
              >
                Invalid or expired OTP code. Please try again or request a new code.
              </Alert>
            )}

            {avtivateMerchant?.isSuccess && (
              <Alert
                severity="success"
                className="mt-24"
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  color: "#166534",
                  "& .MuiAlert-icon": {
                    color: "#22c55e",
                  },
                }}
              >
                Account activated successfully! Redirecting to sign in...
              </Alert>
            )}

            <form
              name="registerForm"
              noValidate
              className="mt-32 flex w-full flex-col justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Verification Code"
                    type="text"
                    placeholder="Enter your verification code"
                    error={!!errors.otp}
                    helperText={errors?.otp?.message}
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus
                    inputProps={{
                      style: {
                        fontSize: "1.25rem",
                        letterSpacing: "0.25rem",
                        textAlign: "center",
                        fontWeight: "600",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#ea580c",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ea580c",
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#ea580c",
                      },
                    }}
                  />
                )}
              />

              <Button
                variant="contained"
                className="w-full mt-16"
                aria-label="Verify"
                disabled={
                  _.isEmpty(dirtyFields) || !isValid || avtivateMerchant.isLoading
                }
                type="submit"
                size="large"
                sx={{
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  color: "white",
                  fontWeight: 600,
                  height: "48px",
                  fontSize: "1rem",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                  },
                  "&:disabled": {
                    background: "#e5e7eb",
                    color: "#9ca3af",
                  },
                }}
              >
                {avtivateMerchant.isLoading ? (
                  <div className="flex items-center gap-8">
                    <CircularProgress size={20} sx={{ color: "white" }} />
                    <span>Activating Account...</span>
                  </div>
                ) : (
                  "Activate Account"
                )}
              </Button>

              {/* Resend OTP Section */}
              <div className="mt-32 flex flex-col items-center gap-16">
                <Typography variant="body2" className="text-gray-600 text-center">
                  Didn't receive the code?
                </Typography>
                <Button
                  variant="text"
                  onClick={resendOTP}
                  disabled={avtivateMerchant.isLoading}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    "&:hover": {
                      backgroundColor: "rgba(234, 88, 12, 0.05)",
                    },
                  }}
                >
                  Resend Verification Code
                </Button>
              </div>

              {/* Back to Sign In */}
              <div className="mt-32 flex items-center justify-center">
                <Typography variant="body2" className="text-gray-600">
                  Want to use a different email?
                </Typography>
                <Link
                  className="ml-8 font-semibold text-sm"
                  to="/sign-up"
                  style={{
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Sign Up Again
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default UserModernReversedActivatePage;
