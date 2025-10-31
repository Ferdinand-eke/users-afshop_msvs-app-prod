import { Typography, Avatar, Button, Chip, Divider} from "@mui/material";
import { motion } from "framer-motion";
import {
  VerifiedUser,
  Star,
  Store,
  LocalShipping,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";
import { formatDateUtil } from "src/app/main/vendors-shop/PosUtils";
import { navigateToMainDomain, navigateToMerchantSubdomain } from "src/app/utils/subdomainUtils";

/**
 * MerchantProfile Component
 * Displays merchant/host information for the property
 */
function MerchantProfile({ merchantData }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      {/* Header with Gradient */}
      <div
        className="p-6 rounded-t-2xl"
        style={{
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.475rem",
            fontWeight: 800,
            color: "white",
            marginBottom: "4px",
          }}
        >
          Your Host
        </Typography>
        <Typography
          sx={{
            fontSize: "1.15rem",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          Get to know your property manager
        </Typography>
      </div>

      {/* Merchant Details */}
      <div className="flex-1 overflow-y-auto bg-white p-6 rounded-b-2xl shadow-lg">
        {/* Profile Section */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <Avatar
              src={merchantData?.avatar}
              alt={merchantData?.shopname}
              sx={{
                width: 80,
                height: 80,
                border: "3px solid #f97316",
              }}
            />
            {merchantData?.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                <VerifiedUser
                  sx={{
                    fontSize: "1.35rem",
                    color: "white",
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex-1">
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#111827",
                marginBottom: "4px",
              }}
            >
              {merchantData?.shopname}
            </Typography>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <Star sx={{ fontSize: "1.25rem", color: "#fbbf24" }} />
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {merchantData?.rating}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "#6b7280",
                }}
              >
                ({merchantData?.totalReviews || 0} reviews)
              </Typography>
            </div>

            <Typography
              sx={{
                fontSize: "1rem",
                color: "#6b7280",
              }}
            >
              Member since {formatDateUtil(merchantData?.createdAt)}
            </Typography>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Store sx={{ fontSize: "1.75rem", color: "#ea580c", mb: 1 }} />
            <Typography
              sx={{
                fontSize: "1.375rem",
                fontWeight: 800,
                color: "#ea580c",
              }}
            >
              {merchantData?.totalProperties}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "#6b7280",
              }}
            >
              Properties
            </Typography>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Typography
              sx={{
                fontSize: "1.375rem",
                fontWeight: 800,
                color: "#10b981",
              }}
            >
              {merchantData?.responseRate || 0}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "#6b7280",
              }}
            >
              Response Rate
            </Typography>
          </div>

          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <LocalShipping sx={{ fontSize: "1.75rem", color: "#3b82f6", mb: 1 }} />
            <Typography
              sx={{
                fontSize: "1.375rem",
                fontWeight: 600,
                color: "#3b82f6",
              }}
            >
              {merchantData?.responseTime}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "#6b7280",
              }}
            >
              Response
            </Typography>
          </div>
        </div>

        <Divider sx={{ my: 3 }} />

        {/* Description */}
        <div className="mb-4">
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            About
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: 1.6,
            }}
          >
            {merchantData?.shopbio}
          </Typography>
        </div>

        <Divider sx={{ my: 3 }} />

        {/* Contact Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 ">
            <LocationOn sx={{ fontSize: "1.65rem",  color: "#ea580c" }} />
            <Typography sx={{ fontSize: "1rem", color: "#6b7280", fontWeight: 600 }}>
              {merchantData?.address}
            </Typography>
          </div>
          <div className="flex items-center gap-3 ">
            <Phone sx={{ fontSize: "1.65rem", color: "#ea580c" }} />
            <Typography sx={{ fontSize: "1rem", color: "#6b7280", fontWeight: 600 }}>
              {merchantData?.shopphone}
            </Typography>
          </div>
        
        </div>

        {/* CTA Button - Navigate to Merchant Subdomain */}
        {/* <Button
          onClick={() => navigateToMerchantSubdomain(merchantData?.slug, '/')}
          fullWidth
          sx={{
            backgroundColor: "#ea580c",
            color: "white",
            fontWeight: 700,
            fontSize: "1.125rem",
            padding: "12px 24px",
            borderRadius: "12px",
            textTransform: "none",
            marginTop: "16px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#c2410c",
              transform: "translateY(-2px)",
              boxShadow: "0 10px 20px rgba(234, 88, 12, 0.3)",
            },
          }}
        >
          View Full Profilesss
        </Button> */}
      </div>
    </motion.div>
  );
}

export default MerchantProfile;
