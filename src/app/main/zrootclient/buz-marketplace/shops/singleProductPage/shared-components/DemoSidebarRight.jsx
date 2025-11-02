import { Typography, Divider } from "@mui/material";
import { Campaign, TrendingUp } from "@mui/icons-material";
import { motion } from "framer-motion";
import MinimumOrderDialogue from "./MinimumOrderDialogue";
import AdsSlider from "./AdsSlider";

/**
 * DemoSidebarRight Component
 * Completely redesigned with compelling, engaging, and professional UI
 * Features minimum order dialogue and beautiful ads slider
 */
function DemoSidebarRight(props) {
  const { productInfo } = props;

  return (
    <div
      className="h-screen overflow-y-auto p-6"
      style={{
        background: "linear-gradient(180deg, #fafaf9 0%, #f3f4f6 100%)",
      }}
    >
      <div className="w-full flex flex-col gap-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div
            className="p-4 rounded-xl flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
              boxShadow: "0 4px 15px rgba(234, 88, 12, 0.3)",
            }}
          >
            <TrendingUp sx={{ color: "white", fontSize: "1.75rem" }} />
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "white",
              }}
            >
              Bulk Orders & Deals
            </Typography>
          </div>
        </motion.div>

        {/* MinimumOrderDialogue Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <MinimumOrderDialogue productData={productInfo} />
        </motion.div>

        {/* Divider with Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Divider sx={{ flex: 1 }} />
          <Campaign sx={{ color: "#ea580c", fontSize: "1.5rem" }} />
          <Divider sx={{ flex: 1 }} />
        </motion.div>

        {/* Ads Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div
            className="p-4 rounded-xl flex items-center gap-3 mb-6"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
              boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
            }}
          >
            <Campaign sx={{ color: "white", fontSize: "1.75rem" }} />
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "white",
              }}
            >
              Special Promotions
            </Typography>
          </div>

          {/* Ads Slider */}
          <AdsSlider />
        </motion.div>

        {/* Trust Badge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100"
        >
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: "#6b7280",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            <span className="font-bold text-gray-900">Safe & Secure Shopping</span>
            <br />
            All transactions are encrypted and protected
          </Typography>
        </motion.div>
      </div>
    </div>
  );
}

export default DemoSidebarRight;
