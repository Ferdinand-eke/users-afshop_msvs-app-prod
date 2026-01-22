import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useCloseUserAccount } from "app/configs/data/server-calls/useUsers/useUsersQuery";

const defaultValues = {
  email: "",
  checkEmail: "",
  password: "",
  closeAccount: false,
};

/**
 * Form Validation Schema
 */
const schema = z.object({
  email: z.string().email("You must enter a valid email").min(1, "You must enter an email"),
  checkEmail: z.string().email("You must enter a valid email").min(1, "You must enter an email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  closeAccount: z.boolean(),
});


function CloseAccountSetting({ userEmail }) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [finalConfirmDialogOpen, setFinalConfirmDialogOpen] = useState(false);

  // Initialize the close account mutation hook
  const closeAccountMutation = useCloseUserAccount();

  const { control, reset, watch, handleSubmit, formState, getValues, setValue } =
    useForm({
      defaultValues,
      mode: "onChange",
      resolver: zodResolver(schema),
    });

  const { isValid, errors } = formState;
  const { closeAccount } = watch();

  useEffect(() => {
    if (userEmail) {
      setValue("email", userEmail);
    }
  }, [userEmail, setValue]);

  function onSubmit() {
    const { email, checkEmail } = getValues();

    if (email?.toString() === checkEmail?.toString()) {
      setConfirmDialogOpen(true);
    } else {
      toast.error("Email addresses do not match. Please check and try again.");
    }
  }

  function handleFirstConfirm() {
    setConfirmDialogOpen(false);
    setFinalConfirmDialogOpen(true);
  }

  function handleFinalConfirm() {
    const formData = {
      email: getValues("email"),
      confirmEmail: getValues("checkEmail"),
      password: getValues("password"),
    };


    // ========================================================================
    // TEMPORARY DISABLE: Uncomment the toast below to temporarily disable this feature
    // ========================================================================
    // toast.info(
    //   "Account closure feature is temporarily disabled. Please contact support."
    // );
    setFinalConfirmDialogOpen(false);
    setValue("closeAccount", false);
    setValue("checkEmail", "");
    setValue("password", "");
    return;
    // ========================================================================

    // Execute the account closure mutation
    closeAccountMutation.mutate(formData, {
      onSuccess: () => {
        setFinalConfirmDialogOpen(false);
        setValue("closeAccount", false);
        setValue("checkEmail", "");
        setValue("password", "");
      },
      onError: () => {
        // Error is already handled in the mutation hook
        // Keep the dialog open so user can retry
      }
    });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6"
        style={{
          border: "2px solid rgba(239, 68, 68, 0.2)",
        }}
      >
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            }}
          >
            <FuseSvgIcon className="text-white" size={24}>
              heroicons-solid:exclamation-circle
            </FuseSvgIcon>
          </div>
          <div>
            <Typography className="text-xl font-bold text-gray-800">
              Close Account
            </Typography>
            <Typography className="text-sm text-gray-600">
              Permanently delete your account and all associated data
            </Typography>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Close Account Toggle */}
          <div
            className="p-4 rounded-xl transition-all mb-6"
            style={{
              background: closeAccount
                ? "linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(220, 38, 38, 0.05) 100%)"
                : "rgba(249, 250, 251, 1)",
              border: closeAccount
                ? "2px solid rgba(239, 68, 68, 0.2)"
                : "2px solid rgba(229, 231, 235, 1)",
            }}
          >
            <Controller
              name="closeAccount"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        value ? "bg-red-100" : "bg-gray-100"
                      }`}
                    >
                      <FuseSvgIcon
                        size={20}
                        className={value ? "text-red-600" : "text-gray-600"}
                      >
                        heroicons-solid:trash
                      </FuseSvgIcon>
                    </div>
                    <div className="flex-1">
                      <Typography className="text-base font-semibold text-gray-800">
                        I want to close my merchant account
                      </Typography>
                      <Typography className="text-xs text-gray-600 mt-1">
                        This action is permanent and cannot be undone
                      </Typography>
                    </div>
                  </div>
                  <Switch
                    onChange={(ev) => {
                      onChange(ev.target.checked);
                      if (!ev.target.checked) {
                        setValue("checkEmail", "");
                        setValue("password", "");
                      }
                    }}
                    checked={value}
                    name="closeAccount"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#ef4444",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#ef4444",
                      },
                    }}
                  />
                </div>
              )}
            />
          </div>

          {/* Email Confirmation Fields - Only shown when toggle is on */}
          <AnimatePresence>
            {closeAccount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-6">
                  {/* Warning Message */}
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(239, 68, 68, 0.05)",
                      border: "2px solid rgba(239, 68, 68, 0.2)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <FuseSvgIcon size={20} className="text-red-600 mt-0.5">
                        heroicons-solid:exclamation
                      </FuseSvgIcon>
                      <div>
                        <Typography className="text-sm font-bold text-red-800 mb-2">
                          Warning: This Action is Irreversible
                        </Typography>
                        <Typography className="text-xs text-red-700 mb-3">
                          Before proceeding, please understand that:
                        </Typography>
                        <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
                          <li>All your data will be permanently deleted</li>
                          <li>Your products and listings will be removed</li>
                          <li>All transaction history will be erased</li>
                          <li>This action cannot be reversed or undone</li>
                          <li>You will lose access to your account immediately</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Current Email (Read-only) */}
                  <div>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Your Email Address"
                          type="email"
                          error={!!errors.email}
                          helperText={errors?.email?.message}
                          variant="outlined"
                          fullWidth
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FuseSvgIcon size={20} className="text-red-600">
                                  heroicons-solid:mail
                                </FuseSvgIcon>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "#ef4444",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#dc2626",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </div>

                  {/* Confirm Email */}
                  <div>
                    <Controller
                      name="checkEmail"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Confirm Email Address"
                          type="email"
                          error={!!errors.checkEmail}
                          variant="outlined"
                          fullWidth
                          placeholder="Type your email to confirm"
                          helperText={
                            errors?.checkEmail?.message ||
                            "Please type your email exactly as shown above to confirm account closure"
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FuseSvgIcon size={20} className="text-red-600">
                                  heroicons-solid:mail
                                </FuseSvgIcon>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "#ef4444",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#dc2626",
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
                          label="Enter Your Password"
                          type="password"
                          error={!!errors.password}
                          variant="outlined"
                          fullWidth
                          placeholder="Enter your current password"
                          helperText={
                            errors?.password?.message ||
                            "Enter your password to confirm your identity and authorize account closure"
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FuseSvgIcon size={20} className="text-red-600">
                                  heroicons-solid:lock-closed
                                </FuseSvgIcon>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "#ef4444",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#dc2626",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </div>

                  {/* Alternative Options */}
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(59, 130, 246, 0.05)",
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <FuseSvgIcon size={20} className="text-blue-600 mt-0.5">
                        heroicons-solid:light-bulb
                      </FuseSvgIcon>
                      <div>
                        <Typography className="text-sm font-semibold text-gray-800 mb-2">
                          Consider These Alternatives
                        </Typography>
                        <Typography className="text-xs text-gray-600 mb-2">
                          Instead of closing your account, you can:
                        </Typography>
                        <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                          <li>Temporarily deactivate your account</li>
                          <li>Change your password if security is a concern</li>
                          <li>Update your privacy settings</li>
                          <li>Contact our support team for assistance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setValue("closeAccount", false);
                        setValue("checkEmail", "");
                        setValue("password", "");
                      }}
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
                      disabled={!isValid || !closeAccount}
                      sx={{
                        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        color: "white",
                        fontWeight: "bold",
                        minWidth: "160px",
                        "&:hover": {
                          background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                          boxShadow: "0 8px 20px rgba(239, 68, 68, 0.4)",
                        },
                        "&.Mui-disabled": {
                          background: "linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)",
                          color: "#9ca3af",
                        },
                      }}
                    >
                      Close This Account
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* First Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
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
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            color: "white",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FuseSvgIcon className="text-white" size={32}>
            heroicons-solid:exclamation
          </FuseSvgIcon>
          <span className="font-bold text-xl">Are You Sure?</span>
        </DialogTitle>

        <DialogContent sx={{ padding: "32px 24px" }}>
          <Typography variant="body1" className="text-gray-700 mb-4">
            We'd love to have you reconsider. How can we help avoid this?
          </Typography>

          <Typography variant="body2" className="text-gray-600 mb-4">
            Before you go, please know that closing your account means:
          </Typography>

          <List dense>
            <ListItem>
              <ListItemIcon>
                <FuseSvgIcon size={20} className="text-red-600">
                  heroicons-solid:x-circle
                </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText
                primary="Loss of all your data"
                secondary="Products, orders, and customer information will be deleted"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FuseSvgIcon size={20} className="text-red-600">
                  heroicons-solid:x-circle
                </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText
                primary="No access recovery"
                secondary="You won't be able to log back into this account"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FuseSvgIcon size={20} className="text-red-600">
                  heroicons-solid:x-circle
                </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText
                primary="Permanent action"
                secondary="This cannot be undone or reversed"
              />
            </ListItem>
          </List>

          <div
            className="mt-4 p-3 rounded-lg"
            style={{
              background: "rgba(59, 130, 246, 0.05)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
          >
            <Typography className="text-xs text-gray-600">
              If you're having issues, our support team is here to help. Contact us
              before making this final decision.
            </Typography>
          </div>
        </DialogContent>

        <DialogActions sx={{ padding: "16px 24px 24px", gap: 2 }}>
          <Button
            onClick={() => setConfirmDialogOpen(false)}
            variant="outlined"
            sx={{
              borderColor: "#22c55e",
              color: "#22c55e",
              "&:hover": {
                borderColor: "#16a34a",
                backgroundColor: "rgba(34, 197, 94, 0.05)",
              },
              fontWeight: 600,
            }}
          >
            Keep My Account
          </Button>
          <Button
            onClick={handleFirstConfirm}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                boxShadow: "0 8px 20px rgba(245, 158, 11, 0.4)",
              },
            }}
          >
            Continue to Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Final Confirmation Dialog */}
      <Dialog
        open={finalConfirmDialogOpen}
        onClose={() => setFinalConfirmDialogOpen(false)}
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
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "white",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FuseSvgIcon className="text-white" size={32}>
            heroicons-solid:exclamation-circle
          </FuseSvgIcon>
          <span className="font-bold text-xl">Final Confirmation</span>
        </DialogTitle>

        <DialogContent sx={{ padding: "32px 24px" }}>
          <Typography variant="h6" className="text-red-700 font-bold mb-4">
            This is your last chance to reconsider!
          </Typography>

          <Typography variant="body1" className="text-gray-700 mb-4">
            Once you click "Yes, Delete Everything", your account and all data will be
            permanently deleted. This action is irreversible.
          </Typography>

          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(239, 68, 68, 0.05)",
              border: "2px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <Typography className="text-sm font-bold text-red-800 mb-2">
              What will be deleted:
            </Typography>
            <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
              <li>Your profile and account settings</li>
              <li>All products and inventory data</li>
              <li>Order history and customer data</li>
              <li>Financial records and analytics</li>
              <li>All files and media uploads</li>
            </ul>
          </div>
        </DialogContent>

        <DialogActions
          sx={{
            padding: "16px 24px 24px",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            onClick={() => setFinalConfirmDialogOpen(false)}
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#22c55e",
              color: "#22c55e",
              "&:hover": {
                borderColor: "#16a34a",
                backgroundColor: "rgba(34, 197, 94, 0.05)",
              },
              fontWeight: 600,
              padding: "12px 24px",
            }}
          >
            No, Keep My Account
          </Button>
          <Button
            onClick={handleFinalConfirm}
            variant="contained"
            fullWidth
            disabled={closeAccountMutation.isLoading}
            sx={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              fontWeight: "bold",
              padding: "12px 24px",
              "&:hover": {
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                boxShadow: "0 8px 20px rgba(239, 68, 68, 0.4)",
              },
              "&.Mui-disabled": {
                background: "linear-gradient(135deg, #fca5a5 0%, #f87171 100%)",
                color: "white",
              },
            }}
            startIcon={
              closeAccountMutation.isLoading && (
                <CircularProgress size={20} sx={{ color: "white" }} />
              )
            }
          >
            {closeAccountMutation.isLoading ? "Deleting Account..." : "Yes, Delete Everything"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CloseAccountSetting;
