import FusePageSimple from "@fuse/core/FusePageSimple";
import { motion } from "framer-motion";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import FinanceDashboardAppHeader from "./FinanceDashboardAppHeader";
import PreviousStatementWidget from "./widgets/PreviousStatementWidget";
import AccountBalanceWidget from "./widgets/AccountBalanceWidget";
import { useGetFinanceDashboardWidgetsQuery } from "./FinanceDashboardApi";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import useGetUsersAccountBalance from "app/configs/data/server-calls/userwalletaccountdetails/useUserWalletAccountDetails";

const container = {
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/**
 * The finance dashboard app - Production Ready
 */
function FinanceDashboardApp() {
  const { data: widgets, isLoading } = useGetFinanceDashboardWidgetsQuery();
  const {
    data: shopAccount,
    isLoading: accountLoading,
    isError: accountError,
  } = useGetUsersAccountBalance();

  const [openAccountDialog, setOpenAccountDialog] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);

  const handleGenerateAccount = () => {
    setCreatingAccount(true);
    // Simulate account creation - replace with actual API call
    setTimeout(() => {
      setCreatingAccount(false);
      setOpenAccountDialog(false);
      // TODO: Trigger refetch of account data
    }, 2000);
  };

  // Loading State
  if (isLoading || accountLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              boxShadow: "0 8px 24px rgba(234, 88, 12, 0.3)",
            }}
          >
            <CircularProgress size={40} className="text-white" />
          </div>
          <Typography className="text-xl font-bold text-gray-800 mb-2">
            Loading Your Financial Dashboard
          </Typography>
          <Typography className="text-sm text-gray-600">
            Please wait while we fetch your data...
          </Typography>
        </motion.div>
      </div>
    );
  }

  // No Widgets State
  if (!widgets) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center p-12"
        >
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "2px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <FuseSvgIcon size={48} className="text-red-600">
              heroicons-outline:exclamation-circle
            </FuseSvgIcon>
          </div>
          <Typography className="text-2xl font-bold text-gray-800 mb-3">
            Dashboard Unavailable
          </Typography>
          <Typography className="text-sm text-gray-600 max-w-md">
            We couldn't load the dashboard widgets. Please try refreshing the page.
          </Typography>
        </motion.div>
      </div>
    );
  }

  // Check if user has account
  const hasAccount = shopAccount?.data && !accountError;

  /**
   * Account Generation Dialog
   */
  function AccountGenerationDialog() {
    return (
      <Dialog
        open={openAccountDialog}
        onClose={() => !creatingAccount && setOpenAccountDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            color: "white",
            padding: "32px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FuseSvgIcon className="text-white" size={36}>
            heroicons-solid:currency-dollar
          </FuseSvgIcon>
          <div>
            <span className="font-bold text-2xl block">Create Financial Account</span>
            <span className="text-sm opacity-90 block mt-1">
              Get started with your business finances
            </span>
          </div>
        </DialogTitle>

        <DialogContent sx={{ padding: "32px 24px" }}>
          <Alert
            severity="info"
            sx={{
              mb: 3,
              borderRadius: "12px",
              "& .MuiAlert-icon": {
                fontSize: "24px",
              },
            }}
          >
            Your financial account will be created instantly. You'll be able to track transactions,
            view balances, and manage your business finances.
          </Alert>

          <div className="space-y-4">
            <div
              className="p-5 rounded-xl"
              style={{
                background: "rgba(249, 250, 251, 1)",
                border: "1px solid rgba(229, 231, 235, 1)",
              }}
            >
              <Typography className="text-sm font-semibold text-gray-800 mb-3">
                What you'll get:
              </Typography>
              <ul className="space-y-2">
                {[
                  "Secure financial account with unique account number",
                  "Real-time transaction tracking and monitoring",
                  "Detailed financial statements and reports",
                  "Budget management tools and insights",
                  "Payment processing capabilities",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FuseSvgIcon size={18} className="text-green-600 mt-0.5">
                      heroicons-solid:check-circle
                    </FuseSvgIcon>
                    <Typography className="text-xs text-gray-700">{benefit}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>

        <DialogActions sx={{ padding: "16px 24px 24px", gap: 2 }}>
          <Button
            onClick={() => setOpenAccountDialog(false)}
            disabled={creatingAccount}
            variant="outlined"
            sx={{
              borderColor: "#9ca3af",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#6b7280",
                backgroundColor: "#f3f4f6",
              },
              fontWeight: 600,
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerateAccount}
            disabled={creatingAccount}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              color: "white",
              fontWeight: "bold",
              minWidth: "180px",
              borderRadius: "10px",
              textTransform: "none",
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
            {creatingAccount ? (
              <>
                <CircularProgress size={20} className="text-white mr-2" />
                Creating Account...
              </>
            ) : (
              "Create Account Now"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      <FusePageSimple
        header={
          <FinanceDashboardAppHeader
            shopAccount={shopAccount}
          />
        }
        content={
          <div className="w-full px-12 md:px-24 lg:px-32 pb-24">
            <motion.div
              className="w-full"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {/* No Account State - Show Placeholder with Generate Account Dialog */}
              {!hasAccount && (
              <motion.div
                variants={item}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full mt-32"
              >
                <Paper
                  elevation={0}
                  className="rounded-3xl p-12 md:p-16 text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(234, 88, 12, 0.02) 100%)",
                    border: "2px solid rgba(234, 88, 12, 0.15)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8"
                    style={{
                      background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                      boxShadow: "0 12px 32px rgba(234, 88, 12, 0.3)",
                    }}
                  >
                    <FuseSvgIcon size={64} className="text-white">
                      heroicons-outline:currency-dollar
                    </FuseSvgIcon>
                  </motion.div>

                  <Typography className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                    Welcome to Your Finance Dashboard
                  </Typography>

                  <Typography className="text-base text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                    You haven't set up your financial account yet. Create your account to start
                    tracking transactions, managing budgets, and monitoring your business finances.
                  </Typography>

                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
                  >
                    {[
                      {
                        icon: "heroicons-outline:chart-bar",
                        title: "Track Finances",
                        description: "Monitor income and expenses in real-time",
                      },
                      {
                        icon: "heroicons-outline:credit-card",
                        title: "Manage Payments",
                        description: "Process transactions securely and efficiently",
                      },
                      {
                        icon: "heroicons-outline:document-report",
                        title: "View Reports",
                        description: "Generate detailed financial statements",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="p-6 rounded-2xl"
                        style={{
                          background: "white",
                          border: "2px solid rgba(229, 231, 235, 1)",
                        }}
                      >
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                          style={{
                            background: "rgba(249, 115, 22, 0.1)",
                          }}
                        >
                          <FuseSvgIcon size={28} className="text-orange-600">
                            {feature.icon}
                          </FuseSvgIcon>
                        </div>
                        <Typography className="text-base font-bold text-gray-800 mb-2">
                          {feature.title}
                        </Typography>
                        <Typography className="text-sm text-gray-600">
                          {feature.description}
                        </Typography>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setOpenAccountDialog(true)}
                    startIcon={<FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>}
                    sx={{
                      background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "14px 36px",
                      borderRadius: "12px",
                      textTransform: "none",
                      boxShadow: "0 8px 24px rgba(234, 88, 12, 0.35)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                        boxShadow: "0 12px 32px rgba(234, 88, 12, 0.45)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Create Financial Account
                  </Button>
                </Paper>
              </motion.div>
            )}

            {/* Has Account - Show Dashboard Widgets */}
            {hasAccount && (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-24 md:gap-32 w-full mt-32">
                  <div className="grid gap-24 md:gap-32 sm:grid-flow-col xl:grid-flow-row">
                    <motion.div variants={item} className="flex flex-col flex-auto">
                      <PreviousStatementWidget
                        account={shopAccount?.data}
                        accountLoading={accountLoading}
                        accountError={accountError}
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={item} className="flex flex-col flex-auto">
                    <AccountBalanceWidget
                      account={shopAccount?.data}
                      accountLoading={accountLoading}
                      accountError={accountError}
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-24 md:gap-32 w-full mt-24 md:mt-32">
                  <motion.div
                    variants={item}
                    className="xl:col-span-2 flex flex-col flex-auto"
                  >
                    {/* Additional widgets can be added here */}
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      }
    />
    <AccountGenerationDialog />
    </>
  );
}

export default FinanceDashboardApp;
