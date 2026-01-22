import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { CircularProgress, Chip, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import SecuritySetting from "./securitsettings/SecuritySetting";
import ChangeEmailSetting from "./securitsettings/ChangeEmailSetting";
import CloseAccountSetting from "./securitsettings/CloseAccountSetting";
import {
  useUserSettingsResetPass,
  useGetAuthUserDetails
} from "app/configs/data/server-calls/useUsers/useUsersQuery";

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

/**
 * Form Validation Schema
 */
const schema = z
  .object({
    currentPassword: z.string().min(1, "Please enter your current password."),
    newPassword: z
      .string()
      .min(1, "Please enter your password.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

function SecurityTab() {
  const { data: userProfileData } = useGetAuthUserDetails();
  const resetShopPass = useUserSettingsResetPass();

  const [showcurrentPassword, setShowcurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { control, reset, handleSubmit, formState, getValues, watch } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const { isValid, errors, isDirty } = formState;
  const newPassword = watch("newPassword");

  // Calculate password strength
  useEffect(() => {
    if (newPassword) {
      let strength = 0;
      if (newPassword.length >= 8) strength += 25;
      if (newPassword.length >= 12) strength += 25;
      if (/[A-Z]/.test(newPassword)) strength += 15;
      if (/[a-z]/.test(newPassword)) strength += 10;
      if (/[0-9]/.test(newPassword)) strength += 15;
      if (/[^A-Za-z0-9]/.test(newPassword)) strength += 10;
      setPasswordStrength(Math.min(strength, 100));
    } else {
      setPasswordStrength(0);
    }
  }, [newPassword]);

  useEffect(() => {
    if (resetShopPass?.isSuccess) {
      reset();
      toast.success("Password changed successfully!");
    }
  }, [resetShopPass?.isSuccess, reset]);

  useEffect(() => {
    if (resetShopPass?.isError) {
      toast.error(
        resetShopPass?.error?.response?.data?.message ||
        "Failed to change password. Please try again."
      );
    }
  }, [resetShopPass?.isError]);

  /**
   * Form Submit
   */
  function onSubmit() {
    resetShopPass.mutate(getValues());
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return "#ef4444";
    if (passwordStrength < 60) return "#f59e0b";
    if (passwordStrength < 80) return "#fbbf24";
    return "#22c55e";
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 30) return "Weak";
    if (passwordStrength < 60) return "Fair";
    if (passwordStrength < 80) return "Good";
    return "Strong";
  };

  return (
    <div className="w-full max-w-5xl">
      {/* Change Password Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
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
              heroicons-solid:lock-closed
            </FuseSvgIcon>
          </div>
          <div>
            <Typography className="text-xl font-bold text-gray-800">
              Change Your Password
            </Typography>
            <Typography className="text-sm text-gray-600">
              You can only change your password twice within 24 hours
            </Typography>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            {/* Current Password */}
            <div>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Current Password"
                    type={showcurrentPassword ? "text" : "password"}
                    error={!!errors.currentPassword}
                    helperText={errors?.currentPassword?.message}
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
                            onClick={() => setShowcurrentPassword(!showcurrentPassword)}
                            edge="end"
                          >
                            <FuseSvgIcon size={20} className="text-gray-500">
                              {showcurrentPassword
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

            {/* New Password */}
            <div>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <div>
                    <TextField
                      {...field}
                      label="New Password"
                      type={showNewPassword ? "text" : "password"}
                      error={!!errors.newPassword}
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
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              edge="end"
                            >
                              <FuseSvgIcon size={20} className="text-gray-500">
                                {showNewPassword
                                  ? "heroicons-solid:eye-off"
                                  : "heroicons-solid:eye"}
                              </FuseSvgIcon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText={
                        errors?.newPassword?.message ||
                        "Must be at least 8 characters with uppercase, lowercase, and numbers"
                      }
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
                    {/* Password Strength Indicator */}
                    {newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <Typography className="text-xs text-gray-600">
                            Password Strength
                          </Typography>
                          <Typography
                            className="text-xs font-bold"
                            style={{ color: getPasswordStrengthColor() }}
                          >
                            {getPasswordStrengthLabel()}
                          </Typography>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${passwordStrength}%` }}
                            transition={{ duration: 0.3 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: getPasswordStrengthColor() }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    error={!!errors.confirmPassword}
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
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            <FuseSvgIcon size={20} className="text-gray-500">
                              {showConfirmPassword
                                ? "heroicons-solid:eye-off"
                                : "heroicons-solid:eye"}
                            </FuseSvgIcon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    helperText={errors?.confirmPassword?.message}
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

            {/* Security Tips */}
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
                    Password Security Tips
                  </Typography>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                    <li>Use a unique password you don't use elsewhere</li>
                    <li>Avoid common words and patterns</li>
                    <li>Consider using a password manager</li>
                    <li>Enable two-factor authentication for extra security</li>
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
                disabled={!isDirty || resetShopPass.isLoading}
                onClick={() => reset()}
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
                disabled={!isDirty || !isValid || resetShopPass.isLoading}
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
                {resetShopPass.isLoading ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Change Email Section */}
      <ChangeEmailSetting userEmail={userProfileData?.data?.user?.email} />

      {/* Security Preferences Section */}
      <SecuritySetting />

      {/* Close Account Section */}
      <CloseAccountSetting userEmail={userProfileData?.data?.user?.email} />
    </div>
  );
}

export default SecurityTab;
