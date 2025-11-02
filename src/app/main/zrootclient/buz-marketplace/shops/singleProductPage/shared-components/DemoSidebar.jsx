import { Typography, Divider, Chip } from "@mui/material";
import { Store, LocationOn, Verified, Star, Phone, TrendingUp } from "@mui/icons-material";
import ShopLocationMap from "../../../components/maps/ShopLocationMap";
import ShopLocationMapLoadingPlaceholder from "../../../components/maps/ShopLocationMapLoadingPlaceholder";
import { motion } from "framer-motion";

/**
 * DemoSidebar Component
 * Right sidebar for single product page showing shop location and details
 * Enhanced with shop location map
 */
function DemoSidebar(props) {
  const { shopData, isLoading } = props;

  // Dummy shop data - will be replaced with actual data from API
  const shop = shopData || {
    id: "shop-123",
    shopName: "Premium Electronics Store",
    address: "123 Marina Road, Lagos Island",
    city: "Lagos",
    state: "Lagos State",
    country: "Nigeria",
    coordinates: [6.4541, 3.3947],
    zoom: 14,
    phone: "+234 803 123 4567",
    isVerified: true,
    rating: 4.8,
    totalSales: 1234,
    totalProducts: 456,
    responseTime: "within 2 hours",
    memberSince: "2022",
  };

  const showLoading = isLoading || false;

  return (
    <div
      className="flex flex-col h-screen p-6"
      style={{
        background: "linear-gradient(180deg, #fafaf9 0%, #f3f4f6 100%)",
      }}
    >
      {/* Header */}
      <div
        className="mb-6 p-4 rounded-xl flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
          boxShadow: "0 4px 15px rgba(234, 88, 12, 0.3)",
        }}
      >
        <Store sx={{ color: "white", fontSize: "1.75rem" }} />
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "white",
          }}
        >
          Seller Location
        </Typography>
      </div>

      {/* Map Container */}
      <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl mb-6">
        {showLoading ? (
          <ShopLocationMapLoadingPlaceholder />
        ) : (
          <ShopLocationMap shopData={shop} />
        )}
      </div>

      {/* Shop Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6 space-y-4"
      >
        {/* Shop Name & Verification */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Typography
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              {shop.shopName}
            </Typography>
            {shop.isVerified && (
              <Verified sx={{ color: "#10b981", fontSize: "1.25rem" }} />
            )}
          </div>
          {shop.isVerified && (
            <Chip
              label="Verified Seller"
              size="small"
              sx={{
                backgroundColor: "#dcfce7",
                color: "#166534",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          )}
        </div>

        <Divider />

        {/* Shop Stats */}
        <div className="grid grid-cols-2 gap-3">
          {/* Rating */}
          <div className="p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
            <div className="flex items-center gap-1 mb-1">
              <Star sx={{ color: "#f59e0b", fontSize: "1rem" }} />
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#92400e",
                  fontWeight: 600,
                }}
              >
                Rating
              </Typography>
            </div>
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#f59e0b",
              }}
            >
              {shop.rating}
            </Typography>
          </div>

          {/* Total Sales */}
          <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp sx={{ color: "#10b981", fontSize: "1rem" }} />
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#065f46",
                  fontWeight: 600,
                }}
              >
                Sales
              </Typography>
            </div>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#10b981",
              }}
            >
              {shop.totalSales.toLocaleString()}
            </Typography>
          </div>

          {/* Total Products */}
          <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center gap-1 mb-1">
              <Store sx={{ color: "#3b82f6", fontSize: "1rem" }} />
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#1e40af",
                  fontWeight: 600,
                }}
              >
                Products
              </Typography>
            </div>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#3b82f6",
              }}
            >
              {shop.totalProducts}
            </Typography>
          </div>

          {/* Response Time */}
          <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "#7e22ce",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Response
            </Typography>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#a855f7",
              }}
            >
              {shop.responseTime}
            </Typography>
          </div>
        </div>

        <Divider />

        {/* Location Info */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <LocationOn sx={{ color: "#ea580c", fontSize: "1.25rem", marginTop: "2px" }} />
            <div>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  lineHeight: 1.5,
                }}
              >
                {shop.address}
                <br />
                {shop.city}, {shop.state}
              </Typography>
            </div>
          </div>
        </div>

        <Divider />

        {/* Contact Seller Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
          }}
        >
          <Phone sx={{ color: "white", fontSize: "1.25rem" }} />
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "white",
            }}
          >
            Contact Seller
          </Typography>
        </motion.button>

        {/* Member Since */}
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#9ca3af",
            textAlign: "center",
          }}
        >
          Member since {shop.memberSince}
        </Typography>
      </motion.div>

      {/* Info Footer */}
      <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          This product ships from {shop.state}
        </Typography>
      </div>
    </div>
  );
}

export default DemoSidebar;
