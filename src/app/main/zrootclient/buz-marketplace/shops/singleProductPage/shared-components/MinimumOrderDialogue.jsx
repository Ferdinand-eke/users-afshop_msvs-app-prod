import { useState, useEffect } from "react";
import { Button, Typography, Chip, Divider } from "@mui/material";
import {
  LocalShipping,
  Inventory,
  ShoppingCart,
  Chat,
  LocalOffer,
  Speed,
  CheckCircle,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import UseMinimumOrder from "./UseMinimumOrder";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";

/**
 * MinimumOrderDialogue Component
 * Completely redesigned with compelling, engaging, and professional UI
 * Displays wholesale and customization pricing with bulk order options
 */


function MinimumOrderDialogue({ productData }) {
  const [activeTab, setActiveTab] = useState("wholesale");
  const [selectedColor, setSelectedColor] = useState(null);
  const [sliderOpen, setSliderOpen] = useState(false);

  // Check if slider should be open on mount
  useEffect(() => {
    const wasOpen = localStorage.getItem("minimumOrderSliderOpen") === "true";
    const savedProductId = localStorage.getItem("minimumOrderProductId");
    const currentProductId = productData?.id || productData?._id;

    if (wasOpen && savedProductId === currentProductId) {
      setSliderOpen(true);
    }
  }, [productData]);

  const handleStartOrder = () => {
    setSliderOpen(true);
  };


  const handleCloseSlider = () => {
    setSliderOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
      {/* Tabs with Modern Design */}
      <div className="flex border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-6 px-6 text-lg font-bold transition-all duration-300 relative ${
            activeTab === "wholesale"
              ? "text-orange-600 bg-white"
              : "text-gray-500 bg-gray-50 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("wholesale")}
        >
          <div className="flex items-center justify-center gap-2">
            <Inventory sx={{ fontSize: "1.5rem" }} />
            Wholesale
          </div>
          {activeTab === "wholesale" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-red-600"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-6 px-6 text-lg font-bold transition-all duration-300 relative ${
            activeTab === "customization"
              ? "text-orange-600 bg-white"
              : "text-gray-500 bg-gray-50 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("customization")}
        >
          <div className="flex items-center justify-center gap-2">
            <LocalOffer sx={{ fontSize: "1.5rem" }} />
            Customization
          </div>
          {activeTab === "customization" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-red-600"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Chip
            icon={<CheckCircle />}
            label="Ready to ship"
            sx={{
              backgroundColor: "#dcfce7",
              color: "#166534",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "22px 12px",
              "& .MuiChip-icon": {
                color: "#16a34a",
              },
            }}
          />
          <Chip
            icon={<Speed />}
            label={`${productData?.processingTime} dispatch`}
            sx={{
              backgroundColor: "#ffedd5",
              color: "#9a3412",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "22px 12px",
              "& .MuiChip-icon": {
                color: "#ea580c",
              },
            }}
          />
          <Chip
            icon={<LocalOffer />}
            label="Lower priced than similar"
            sx={{
              backgroundColor: "#ef4444",
              color: "white",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "22px 12px",
              "& .MuiChip-icon": {
                color: "white",
              },
              boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
            }}
          />
        </div>

        <Divider sx={{ marginY: 4 }} />

        {/* Pricing Tiers - Enhanced Cards */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <LocalOffer sx={{ color: "#ea580c", fontSize: "1.75rem" }} />
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#111827",
              }}
            >
              Bulk Pricing Tiers
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* productData?.priceTiers */}
            {productData?.priceTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                  tier.popular
                    ? "bg-gradient-to-br from-orange-50 to-red-50 border-orange-500 shadow-lg"
                    : "bg-white border-gray-200 hover:border-orange-300 hover:shadow-md"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Chip
                      label="MOST POPULAR"
                      size="small"
                      sx={{
                        backgroundColor: "#ea580c",
                        color: "white",
                        fontWeight: 800,
                        fontSize: "0.7rem",
                      }}
                    />
                  </div>
                )}
                <Typography
                  sx={{
                    fontSize: "0.975rem",
                    color: tier.popular ? "#c2410c" : "#6b7280",
                    fontWeight: 600,
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  {`${tier.minQuantity} - ${tier.maxQuantity}`} {productData?.unitweight?.unitname}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.45rem",
                    fontWeight: 900,
                    color: tier.popular ? "#ea580c" : "#111827",
                    textAlign: "center",
                    marginBottom: "8px",
                  }}
                >
                  ₦{formatCurrency(tier.price)}
                </Typography>
                <div className="flex items-center justify-center">
                  <Chip
                    label={`Save ${Math.round(((productData?.price - tier.price) / productData?.price) * 100)}%`}
                    size="small"
                    sx={{
                      backgroundColor: tier.popular ? "#10b981" : "#f3f4f6",
                      color: tier.popular ? "white" : "#065f46",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shipping Section - Enhanced */}
        {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <LocalShipping sx={{ color: "#3b82f6", fontSize: "1.5rem" }} />
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#1e40af",
                }}
              >
                Seller's Shipping Method 1
              </Typography>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-700 hover:text-blue-800 font-semibold text-sm"
            >
              Change →
            </motion.button>
          </div>
          <Typography
            sx={{
              fontSize: "0.95rem",
              color: "#1e40af",
            }}
          >
            Shipping fee:{" "}
            <span className="font-bold text-blue-900">₦62,328</span> for 50 sets
          </Typography>
        </div> */}

        {/* Action Buttons - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleStartOrder}
              startIcon={<ShoppingCart />}
              sx={{
                background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #c2410c 0%, #b91c1c 100%)",
                },
                textTransform: "none",
                fontSize: "1.05rem",
                fontWeight: 700,
                py: 2,
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(234, 88, 12, 0.4)",
              }}
            >
              Start Order
            </Button>
          </motion.div>
          {/* <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<LocalShipping />}
              sx={{
                borderColor: "#ea580c",
                color: "#ea580c",
                "&:hover": {
                  borderColor: "#c2410c",
                  backgroundColor: "#fff7ed",
                },
                textTransform: "none",
                fontSize: "1.05rem",
                fontWeight: 700,
                py: 2,
                borderRadius: "12px",
                borderWidth: "2px",
                "&:hover": {
                  borderWidth: "2px",
                },
              }}
            >
              Add to Cart
            </Button>
          </motion.div> */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Chat />}
              sx={{
                borderColor: "#10b981",
                color: "#10b981",
                "&:hover": {
                  borderColor: "#059669",
                  backgroundColor: "#f0fdf4",
                },
                textTransform: "none",
                fontSize: "1.05rem",
                fontWeight: 700,
                py: 2,
                borderRadius: "12px",
                borderWidth: "2px",
                "&:hover": {
                  borderWidth: "2px",
                },
              }}
            >
              Chat Now
            </Button>
          </motion.div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle sx={{ color: "#10b981", fontSize: "1.25rem" }} />
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "#065f46",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Secure payment • Fast shipping • Quality guaranteed
            </Typography>
          </div>
        </motion.div>
      </div>


      {/* Minimum Order Slider */}
      <UseMinimumOrder
        open={sliderOpen}
        onClose={handleCloseSlider}
        productData={productData}
        pricingTiers={productData?.priceTiers}
        // productUnit={productData?.unitweight?.unitname}
      />
    </div>
  );
}

export default MinimumOrderDialogue;
