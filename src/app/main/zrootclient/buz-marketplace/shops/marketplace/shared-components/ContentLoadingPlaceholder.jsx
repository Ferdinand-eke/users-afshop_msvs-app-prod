import { CircularProgress, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ShoppingBagOutlined, LocalOfferOutlined } from "@mui/icons-material";

/**
 * ContentLoadingPlaceholder Component
 * Beautiful loading state for the marketplace product grid
 */
function ContentLoadingPlaceholder() {
  return (
    <div className="flex-auto p-8 sm:p-12 bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="px-0 py-6 bg-white border-b border-gray-200 mb-8 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Skeleton
              variant="text"
              width="30%"
              height={40}
              sx={{ backgroundColor: "rgba(234, 88, 12, 0.1)" }}
            />
            <Skeleton
              variant="text"
              width="50%"
              height={24}
              sx={{ backgroundColor: "rgba(107, 114, 128, 0.1)", marginTop: "8px" }}
            />
          </div>
          <Skeleton
            variant="rounded"
            width={120}
            height={32}
            sx={{ backgroundColor: "rgba(234, 88, 12, 0.2)", borderRadius: "16px" }}
          />
        </div>
      </div>

      {/* Center Loading Indicator */}
      <div className="flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
          className="flex flex-col items-center gap-6"
        >
          {/* Circular Progress with Shopping Icon */}
          <div className="relative">
            <CircularProgress
              size={100}
              thickness={3}
              sx={{
                color: "#ea580c",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBagOutlined
                sx={{
                  fontSize: "2.5rem",
                  color: "#c2410c",
                }}
              />
            </div>
          </div>

          {/* Loading Text */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#ea580c",
                textAlign: "center",
              }}
            >
              Loading Products...
            </Typography>
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#6b7280",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              Finding the best deals for you
            </Typography>
          </motion.div>
        </motion.div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="relative">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ backgroundColor: "rgba(234, 88, 12, 0.1)" }}
              />
              {/* Badge Skeleton */}
              <div className="absolute top-3 left-3">
                <Skeleton
                  variant="rounded"
                  width={80}
                  height={24}
                  sx={{ backgroundColor: "rgba(220, 38, 38, 0.2)", borderRadius: "12px" }}
                />
              </div>
              {/* Favorite Icon Skeleton */}
              <div className="absolute bottom-3 right-3">
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                />
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-5 flex flex-col gap-3">
              {/* Category Badge */}
              <Skeleton
                variant="rounded"
                width="40%"
                height={24}
                sx={{ backgroundColor: "rgba(255, 237, 213, 0.5)", borderRadius: "12px" }}
              />

              {/* Title */}
              <Skeleton
                variant="text"
                width="90%"
                height={28}
                sx={{ backgroundColor: "rgba(107, 114, 128, 0.2)" }}
              />
              <Skeleton
                variant="text"
                width="70%"
                height={28}
                sx={{ backgroundColor: "rgba(107, 114, 128, 0.1)" }}
              />

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-2">
                <Skeleton
                  variant="text"
                  width="50%"
                  height={32}
                  sx={{ backgroundColor: "rgba(234, 88, 12, 0.2)" }}
                />
                <Skeleton
                  variant="text"
                  width="30%"
                  height={20}
                  sx={{ backgroundColor: "rgba(107, 114, 128, 0.1)" }}
                />
              </div>

              {/* Button Skeleton */}
              <Skeleton
                variant="rounded"
                width="100%"
                height={42}
                sx={{
                  backgroundColor: "rgba(234, 88, 12, 0.2)",
                  borderRadius: "12px",
                  marginTop: "8px",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Offer Icons Animation */}
      {[1, 2, 3].map((icon, index) => (
        <motion.div
          key={icon}
          className="fixed"
          style={{
            top: `${30 + index * 20}%`,
            right: `${10 + index * 5}%`,
            zIndex: 0,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <LocalOfferOutlined
            sx={{
              fontSize: "3rem",
              color: "#ea580c",
              filter: "blur(1px)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default ContentLoadingPlaceholder;
