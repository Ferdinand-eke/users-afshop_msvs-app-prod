import { CircularProgress, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { MapOutlined, ShoppingCartOutlined } from "@mui/icons-material";

/**
 * MarketplaceMapLoadingPlaceholder Component
 * Beautiful loading state for the marketplace map sidebar
 */
function MarketplaceMapLoadingPlaceholder() {
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
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
        }}
      >
        <ShoppingCartOutlined sx={{ color: "white", fontSize: "1.75rem" }} />
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "white",
          }}
        >
          Shopping Region
        </Typography>
      </div>

      {/* Map Loading Container */}
      <div
        className="flex-1 rounded-2xl overflow-hidden shadow-2xl relative"
        style={{
          background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)",
        }}
      >
        {/* Animated Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Shopping Cart Icons Animation */}
        {[1, 2, 3, 4].map((cart, index) => (
          <motion.div
            key={cart}
            className="absolute"
            style={{
              top: `${20 + index * 18}%`,
              left: `${15 + index * 20}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.4,
            }}
          >
            <ShoppingCartOutlined
              sx={{
                fontSize: "2.5rem",
                color: "#10b981",
                filter: "drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))",
              }}
            />
          </motion.div>
        ))}

        {/* Pulsing Location Ring */}
        <motion.div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "4px solid #10b981",
            }}
          />
        </motion.div>

        {/* Center Loading Indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
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
            {/* Circular Progress with Map Icon */}
            <div className="relative">
              <CircularProgress
                size={100}
                thickness={3}
                sx={{
                  color: "#10b981",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapOutlined
                  sx={{
                    fontSize: "2.5rem",
                    color: "#059669",
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
                  color: "#059669",
                  textAlign: "center",
                }}
              >
                Loading Shopping Region...
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: "#6b7280",
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                Locating your active cart state
              </Typography>
            </motion.div>
          </motion.div>
        </div>

        {/* Map Info Skeleton */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <div className="flex-1">
                <Skeleton
                  variant="text"
                  width="40%"
                  height={16}
                  sx={{ backgroundColor: "rgba(107, 114, 128, 0.2)" }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={28}
                  sx={{
                    backgroundColor: "rgba(16, 185, 129, 0.3)",
                    marginTop: "4px",
                  }}
                />
              </div>
              <div className="text-right">
                <Skeleton
                  variant="text"
                  width={60}
                  height={16}
                  sx={{ backgroundColor: "rgba(107, 114, 128, 0.2)" }}
                />
                <Skeleton
                  variant="text"
                  width={80}
                  height={24}
                  sx={{
                    backgroundColor: "rgba(234, 88, 12, 0.3)",
                    marginTop: "4px",
                  }}
                />
              </div>
            </div>
            <Skeleton
              variant="text"
              width="100%"
              height={12}
              sx={{
                backgroundColor: "rgba(156, 163, 175, 0.2)",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
        <Skeleton
          variant="text"
          width="80%"
          height={20}
          sx={{
            backgroundColor: "rgba(107, 114, 128, 0.2)",
            margin: "0 auto",
          }}
        />
      </div>
    </div>
  );
}

export default MarketplaceMapLoadingPlaceholder;
