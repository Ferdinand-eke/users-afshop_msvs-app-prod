import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useInitiateUserSettingsChangeMail, useConfirmUserSettingsChangeMail } from "app/configs/data/server-calls/useUsers/useUsersQuery";

// Local storage key for userMailToken
const MAIL_TOKEN_KEY = "userMailToken";

// Helper functions for localStorage management
const getMailToken = () => {
  try {
    return localStorage.getItem(MAIL_TOKEN_KEY);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

const setMailToken = (token) => {
  try {
    localStorage.setItem(MAIL_TOKEN_KEY, token);
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

const clearMailToken = () => {
  try {
    localStorage.removeItem(MAIL_TOKEN_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

// Form validation schemas
const emailChangeSchema = z
  .object({
    currentEmail: z
      .string()
      .email("You must enter a valid email")
      .min(1, "You must enter an email"),
    newEmail: z
      .string()
      .email("You must enter a valid email")
      .min(1, "You must enter an email"),
    confirmNewEmail: z
      .string()
      .email("You must enter a valid email")
      .min(1, "You must enter an email"),
    password: z.string().min(1, "Please enter your current password."),
  })
  .refine((data) => data.newEmail === data.confirmNewEmail, {
    message: "Email addresses must match",
    path: ["confirmNewEmail"],
  })
  .refine((data) => data.currentEmail !== data.newEmail, {
    message: "New email must be different from current email",
    path: ["newEmail"],
  });

const otpSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be 4 digits")
    .max(4, "OTP must be 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

function ChangeEmailSetting({ userEmail }) {
  const [showpassword, setShowpassword] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const token = getMailToken();
    if (token) {
      setIsOtpStep(true);
    }
  }, []);

  // Email change form
  const emailForm = useForm({
    defaultValues: {
      currentEmail: "",
      newEmail: "",
      confirmNewEmail: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(emailChangeSchema),
  });

  // OTP verification form
  const otpForm = useForm({
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
    resolver: zodResolver(otpSchema),
  });

  const changeMail = useInitiateUserSettingsChangeMail();
  const confirmOtpMutation = useConfirmUserSettingsChangeMail();

  // Handle initiate email change success
  useEffect(() => {
    if (changeMail.isSuccess && changeMail.data) {
      console.log("Email change response:", changeMail.data);

      // The response structure is: changeMail.data.data.userMailToken
      const responseData = changeMail.data?.data || changeMail.data;
      const { userMailToken, message } = responseData;

      console.log("Extracted userMailToken:", userMailToken);
      console.log("Extracted message:", message);

      if (userMailToken) {
        setMailToken(userMailToken);
        setIsOtpStep(true);
        setConfirmDialogOpen(false);
        toast.success(message || "OTP sent to your new email!");
        emailForm.reset({ currentEmail: userEmail });
      }
    }
  }, [changeMail.isSuccess, changeMail.data, userEmail, emailForm]);

  // Handle initiate email change error
  useEffect(() => {
    if (changeMail.isError) {
      toast.error(
        changeMail?.error?.response?.data?.message ||
          "Failed to initiate email change. Please try again."
      );
    }
  }, [changeMail.isError, changeMail.error]);

  // Handle OTP confirmation success
  useEffect(() => {
    if (confirmOtpMutation.isSuccess) {
      clearMailToken();
      setIsOtpStep(false);
      otpForm.reset();
      emailForm.reset({ currentEmail: userEmail });
    }
  }, [confirmOtpMutation.isSuccess, userEmail, emailForm, otpForm]);

  // Populate current email
  useEffect(() => {
    if (userEmail && !isOtpStep) {
      emailForm.setValue("currentEmail", userEmail);
    }
  }, [userEmail, emailForm, isOtpStep]);

  // Handle email change form submission
  function onEmailSubmit() {
    setConfirmDialogOpen(true);
  }

  function handleConfirmChange() {
    const formData = emailForm.getValues();
    changeMail.mutate(formData);
  }

  // Handle OTP verification
  function onOtpSubmit(data) {
    const userMailToken = getMailToken();
    if (!userMailToken) {
      toast.error("Session expired. Please restart the email change process.");
      setIsOtpStep(false);
      return;
    }

    confirmOtpMutation.mutate({
      otp: data.otp,
      userMailToken,
    });
  }

  // Cancel OTP verification
  function handleCancelOtp() {
    clearMailToken();
    setIsOtpStep(false);
    otpForm.reset();
    emailForm.reset({ currentEmail: userEmail });
  }

  return (
    <AnimatePresence mode="wait">
      {!isOtpStep ? (
        // Email Change Form
        <motion.div
          key="email-form"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <EmailChangeForm
            control={emailForm.control}
            errors={emailForm.formState.errors}
            isDirty={emailForm.formState.isDirty}
            isValid={emailForm.formState.isValid}
            showpassword={showpassword}
            setShowpassword={setShowpassword}
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            onReset={() => emailForm.reset({ currentEmail: userEmail })}
            userEmail={userEmail}
            isLoading={changeMail.isLoading}
          />

          {/* Confirmation Dialog */}
          <Dialog
            open={confirmDialogOpen}
            onClose={() => !changeMail.isLoading && setConfirmDialogOpen(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "16px",
                overflow: "hidden",
              },
            }}
          >
            <DialogTitle
              sx={{
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                color: "white",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <FuseSvgIcon className="text-white" size={32}>
                heroicons-solid:mail
              </FuseSvgIcon>
              <span className="font-bold text-xl">Confirm Email Change</span>
            </DialogTitle>

            <DialogContent sx={{ padding: "32px 24px" }}>
              <Typography variant="body1" className="text-gray-700 mb-4">
                Are you sure you want to change your email address?
              </Typography>

              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <div>
                  <Typography className="text-xs text-gray-500 mb-1">
                    From:
                  </Typography>
                  <Typography className="text-sm font-semibold text-gray-800">
                    {emailForm.getValues().currentEmail}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-xs text-gray-500 mb-1">
                    To:
                  </Typography>
                  <Typography className="text-sm font-semibold text-orange-600">
                    {emailForm.getValues().newEmail}
                  </Typography>
                </div>
              </div>

              <div
                className="mt-4 p-3 rounded-lg"
                style={{
                  background: "rgba(59, 130, 246, 0.05)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                }}
              >
                <Typography className="text-xs text-gray-600">
                  An OTP will be sent to your new email address. You'll need to
                  enter it to complete the email change.
                </Typography>
              </div>
            </DialogContent>

            <DialogActions sx={{ padding: "16px 24px 24px", gap: 2 }}>
              <Button
                onClick={() => setConfirmDialogOpen(false)}
                disabled={changeMail.isLoading}
                variant="outlined"
                sx={{
                  borderColor: "#9ca3af",
                  color: "#6b7280",
                  "&:hover": {
                    borderColor: "#6b7280",
                    backgroundColor: "#f3f4f6",
                  },
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmChange}
                disabled={changeMail.isLoading}
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  color: "white",
                  fontWeight: "bold",
                  minWidth: "140px",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                    boxShadow: "0 8px 20px rgba(234, 88, 12, 0.4)",
                  },
                  "&.Mui-disabled": {
                    background: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
                    color: "#9ca3af",
                  },
                }}
              >
                {changeMail.isLoading ? (
                  <>
                    <CircularProgress size={20} className="text-white mr-2" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      ) : (
        // OTP Verification Form
        <motion.div
          key="otp-form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <OtpVerificationForm
            control={otpForm.control}
            errors={otpForm.formState.errors}
            isDirty={otpForm.formState.isDirty}
            isValid={otpForm.formState.isValid}
            onSubmit={otpForm.handleSubmit(onOtpSubmit)}
            onCancel={handleCancelOtp}
            isLoading={confirmOtpMutation.isLoading}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Email Change Form Component
function EmailChangeForm({
  control,
  errors,
  isDirty,
  isValid,
  showpassword,
  setShowpassword,
  onSubmit,
  onReset,
  userEmail,
  isLoading,
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6"
      style={{
        border: "2px solid rgba(234, 88, 12, 0.1)",
      }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          }}
        >
          <FuseSvgIcon className="text-white" size={24}>
            heroicons-solid:mail
          </FuseSvgIcon>
        </div>
        <div>
          <Typography className="text-xl font-bold text-gray-800">
            Change Your Email
          </Typography>
          <Typography className="text-sm text-gray-600">
            You can only change your email twice within 6 months
          </Typography>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-6">
          {/* Current Email */}
          <div>
            <Controller
              name="currentEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Current Email"
                  type="email"
                  error={!!errors.currentEmail}
                  helperText={errors?.currentEmail?.message}
                  variant="outlined"
                  fullWidth
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FuseSvgIcon size={20} className="text-orange-600">
                          heroicons-solid:mail
                        </FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ea580c",
                      },
                    },
                  }}
                />
              )}
            />
          </div>

          {/* New Email */}
          <div>
            <Controller
              name="newEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Email Address"
                  type="email"
                  error={!!errors.newEmail}
                  variant="outlined"
                  fullWidth
                  helperText={errors?.newEmail?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FuseSvgIcon size={20} className="text-orange-600">
                          heroicons-solid:mail
                        </FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ea580c",
                      },
                    },
                  }}
                />
              )}
            />
          </div>

          {/* Confirm New Email */}
          <div>
            <Controller
              name="confirmNewEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm New Email"
                  type="email"
                  error={!!errors.confirmNewEmail}
                  variant="outlined"
                  fullWidth
                  helperText={errors?.confirmNewEmail?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FuseSvgIcon size={20} className="text-orange-600">
                          heroicons-solid:mail
                        </FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ea580c",
                      },
                    },
                  }}
                />
              )}
            />
          </div>

          {/* Password Confirmation */}
          <div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Current Password"
                  type={showpassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FuseSvgIcon size={20} className="text-orange-600">
                          heroicons-solid:key
                        </FuseSvgIcon>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowpassword(!showpassword)}
                          edge="end"
                        >
                          <FuseSvgIcon size={20} className="text-gray-500">
                            {showpassword
                              ? "heroicons-solid:eye-off"
                              : "heroicons-solid:eye"}
                          </FuseSvgIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ea580c",
                      },
                    },
                  }}
                />
              )}
            />
          </div>

          {/* Warning Notice */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(251, 146, 60, 0.05)",
              border: "1px solid rgba(251, 146, 60, 0.2)",
            }}
          >
            <div className="flex items-start gap-3">
              <FuseSvgIcon size={20} className="text-orange-600 mt-0.5">
                heroicons-solid:exclamation
              </FuseSvgIcon>
              <div>
                <Typography className="text-sm font-semibold text-gray-800 mb-2">
                  Important Notice
                </Typography>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  <li>An OTP will be sent to your new email address</li>
                  <li>You must verify the OTP to complete the change</li>
                  <li>You can only change your email twice within 6 months</li>
                  <li>Your current email will remain active until verified</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-2">
            {isDirty && (
              <Chip
                label="Unsaved Changes"
                size="small"
                sx={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outlined"
              disabled={!isDirty || isLoading}
              onClick={onReset}
              sx={{
                borderColor: "#9ca3af",
                color: "#6b7280",
                "&:hover": {
                  borderColor: "#6b7280",
                  backgroundColor: "#f3f4f6",
                },
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={!isDirty || !isValid || isLoading}
              sx={{
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                color: "white",
                fontWeight: "bold",
                minWidth: "140px",
                "&:hover": {
                  background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                  boxShadow: "0 8px 20px rgba(234, 88, 12, 0.4)",
                },
                "&.Mui-disabled": {
                  background: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
                  color: "#9ca3af",
                },
              }}
            >
              Change Email
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// OTP Verification Form Component
function OtpVerificationForm({
  control,
  errors,
  isDirty,
  isValid,
  onSubmit,
  onCancel,
  isLoading,
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6"
      style={{
        border: "2px solid rgba(234, 88, 12, 0.1)",
      }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          }}
        >
          <FuseSvgIcon className="text-white" size={24}>
            heroicons-solid:mail-open
          </FuseSvgIcon>
        </div>
        <div>
          <Typography className="text-xl font-bold text-gray-800">
            Verify Your Email
          </Typography>
          <Typography className="text-sm text-gray-600">
            Enter the 6-digit OTP sent to your new email
          </Typography>
        </div>
      </div>

      {/* Success Alert */}
      <Alert
        severity="info"
        sx={{
          mb: 4,
          borderRadius: "12px",
          "& .MuiAlert-icon": {
            fontSize: "24px",
          },
        }}
      >
        We've sent a verification code to your new email address. Please check
        your inbox and enter the code below.
      </Alert>

      <form onSubmit={onSubmit}>
        <div className="grid gap-6">
          {/* OTP Input */}
          <div>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Enter OTP"
                  type="text"
                  error={!!errors.otp}
                  helperText={errors?.otp?.message || "6-digit code"}
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    maxLength: 6,
                    style: {
                      fontSize: "24px",
                      letterSpacing: "8px",
                      textAlign: "center",
                      fontWeight: "bold",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FuseSvgIcon size={20} className="text-orange-600">
                          heroicons-solid:shield-check
                        </FuseSvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ea580c",
                      },
                    },
                  }}
                />
              )}
            />
          </div>

          {/* Info Notice */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(59, 130, 246, 0.05)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
          >
            <div className="flex items-start gap-3">
              <FuseSvgIcon size={20} className="text-blue-600 mt-0.5">
                heroicons-solid:information-circle
              </FuseSvgIcon>
              <div>
                <Typography className="text-sm font-semibold text-gray-800 mb-2">
                  Verification Tips
                </Typography>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  <li>Check your spam folder if you don't see the email</li>
                  <li>The OTP code is valid for 15 minutes</li>
                  <li>
                    Make sure to enter all 6 digits without any spaces
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isLoading}
            sx={{
              borderColor: "#ef4444",
              color: "#ef4444",
              "&:hover": {
                borderColor: "#dc2626",
                backgroundColor: "rgba(239, 68, 68, 0.05)",
              },
              fontWeight: 600,
            }}
          >
            Cancel Verification
          </Button>

          <Button
            variant="contained"
            type="submit"
            disabled={!isValid || isLoading}
            sx={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              color: "white",
              fontWeight: "bold",
              minWidth: "160px",
              "&:hover": {
                background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                boxShadow: "0 8px 20px rgba(234, 88, 12, 0.4)",
              },
              "&.Mui-disabled": {
                background: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
                color: "#9ca3af",
              },
            }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} className="text-white mr-2" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangeEmailSetting;
