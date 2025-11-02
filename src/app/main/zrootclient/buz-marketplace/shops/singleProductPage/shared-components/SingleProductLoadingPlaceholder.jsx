import { CircularProgress, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ShoppingBagOutlined, LocalOfferOutlined, ImageOutlined } from "@mui/icons-material";

/**
 * SingleProductLoadingPlaceholder Component
 * Beautiful loading state for the single product page
 */
function SingleProductLoadingPlaceholder() {
  return (
    <div className="flex-auto p-8 sm:p-12 bg-gradient-to-b from-gray-50 to-white">
      {/* Center Loading Indicator */}
      <div className="flex items-center justify-center py-8 mb-8">
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
              size={80}
              thickness={3}
              sx={{
                color: "#ea580c",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBagOutlined
                sx={{
                  fontSize: "2rem",
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
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#ea580c",
                textAlign: "center",
              }}
            >
              Loading Product Details...
            </Typography>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Product Loading Skeleton */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Section - Left Side */}
          <div className="w-full lg:w-1/2">
            {/* Main Image Skeleton */}
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100"
              style={{ height: "400px" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageOutlined
                  sx={{
                    fontSize: "5rem",
                    color: "rgba(234, 88, 12, 0.3)",
                  }}
                />
              </div>
            </motion.div>

            {/* Thumbnail Skeletons */}
            <div className="flex mt-4 space-x-4">
              {[1, 2, 3, 4].map((thumb, index) => (
                <motion.div
                  key={thumb}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Skeleton
                    variant="rounded"
                    width={80}
                    height={80}
                    sx={{
                      backgroundColor: "rgba(234, 88, 12, 0.1)",
                      borderRadius: "12px",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Info Section - Right Side */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Badges Skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton
                variant="rounded"
                width={120}
                height={32}
                sx={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Skeleton
                variant="rounded"
                width={140}
                height={32}
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-2">
              <Skeleton
                variant="text"
                width="90%"
                height={40}
                sx={{ backgroundColor: "rgba(107, 114, 128, 0.2)" }}
              />
              <Skeleton
                variant="text"
                width="70%"
                height={40}
                sx={{ backgroundColor: "rgba(107, 114, 128, 0.15)" }}
              />
            </div>

            {/* Brand/Seller Skeleton */}
            <Skeleton
              variant="text"
              width="60%"
              height={24}
              sx={{ backgroundColor: "rgba(234, 88, 12, 0.1)" }}
            />

            {/* Price Skeleton */}
            <div className="flex items-center gap-4">
              <Skeleton
                variant="text"
                width={180}
                height={48}
                sx={{ backgroundColor: "rgba(234, 88, 12, 0.2)" }}
              />
              <Skeleton
                variant="text"
                width={120}
                height={32}
                sx={{ backgroundColor: "rgba(107, 114, 128, 0.1)" }}
              />
            </div>

            {/* Stock Info Skeleton */}
            <div className="border-y py-4 space-y-3">
              <Skeleton
                variant="text"
                width="50%"
                height={24}
                sx={{ backgroundColor: "rgba(107, 114, 128, 0.1)" }}
              />
              <Skeleton
                variant="text"
                width="70%"
                height={20}
                sx={{ backgroundColor: "rgba(107, 114, 128, 0.08)" }}
              />
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton
                variant="rounded"
                width={140}
                height={24}
                sx={{ backgroundColor: "rgba(251, 191, 36, 0.2)", borderRadius: "8px" }}
              />
              <Skeleton
                variant="text"
                width={120}
                height={20}
                sx={{ backgroundColor: "rgba(107, 114, 128, 0.1)" }}
              />
            </div>

            {/* Add to Cart Button Skeleton */}
            <Skeleton
              variant="rounded"
              width="100%"
              height={56}
              sx={{
                backgroundColor: "rgba(234, 88, 12, 0.2)",
                borderRadius: "12px",
                marginTop: "16px",
              }}
            />

            {/* Promotions Section Skeleton */}
            <div className="space-y-3 mt-8">
              <Skeleton
                variant="text"
                width={150}
                height={32}
                sx={{ backgroundColor: "rgba(107, 114, 128, 0.15)" }}
              />
              {[1, 2, 3].map((promo) => (
                <Skeleton
                  key={promo}
                  variant="rounded"
                  width="100%"
                  height={56}
                  sx={{
                    backgroundColor: "rgba(234, 88, 12, 0.08)",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details/Reviews Section Skeleton */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
        <div className="flex gap-8 border-b pb-4">
          <Skeleton
            variant="text"
            width={150}
            height={32}
            sx={{ backgroundColor: "rgba(234, 88, 12, 0.15)" }}
          />
          <Skeleton
            variant="text"
            width={150}
            height={32}
            sx={{ backgroundColor: "rgba(107, 114, 128, 0.1)" }}
          />
        </div>
        <div className="mt-6 space-y-3">
          <Skeleton
            variant="text"
            width="100%"
            height={20}
            sx={{ backgroundColor: "rgba(107, 114, 128, 0.1)" }}
          />
          <Skeleton
            variant="text"
            width="95%"
            height={20}
            sx={{ backgroundColor: "rgba(107, 114, 128, 0.08)" }}
          />
          <Skeleton
            variant="text"
            width="90%"
            height={20}
            sx={{ backgroundColor: "rgba(107, 114, 128, 0.08)" }}
          />
        </div>
      </div>

      {/* Floating Offer Icons Animation */}
      {[1, 2, 3].map((icon, index) => (
        <motion.div
          key={icon}
          className="fixed"
          style={{
            top: `${25 + index * 25}%`,
            right: `${8 + index * 3}%`,
            zIndex: 0,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: index * 0.6,
          }}
        >
          <LocalOfferOutlined
            sx={{
              fontSize: "2.5rem",
              color: "#ea580c",
              filter: "blur(1px)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default SingleProductLoadingPlaceholder;
