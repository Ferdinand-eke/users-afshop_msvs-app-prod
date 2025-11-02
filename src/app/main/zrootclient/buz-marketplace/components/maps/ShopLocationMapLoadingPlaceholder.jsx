import { CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Store, LocationOn } from "@mui/icons-material";

/**
 * ShopLocationMapLoadingPlaceholder Component
 * Beautiful loading state for the shop location map
 */
function ShopLocationMapLoadingPlaceholder() {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #ffedd5 100%)",
        minHeight: "400px",
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="shop-grid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="#ea580c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#shop-grid)" />
        </svg>
      </div>

      {/* Main Loading Content */}
      <div className="flex flex-col items-center gap-6 z-10">
        {/* Circular Progress with Store Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
          className="relative"
        >
          <CircularProgress
            size={80}
            thickness={3}
            sx={{
              color: "#ea580c",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Store
              sx={{
                fontSize: "2rem",
                color: "#c2410c",
              }}
            />
          </div>
        </motion.div>

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
            Loading Shop Location...
          </Typography>
        </motion.div>
      </div>

      {/* Floating Location Icons */}
      {[1, 2, 3, 4].map((icon, index) => (
        <motion.div
          key={icon}
          className="absolute"
          style={{
            top: `${15 + index * 20}%`,
            left: index % 2 === 0 ? `${10 + index * 5}%` : "auto",
            right: index % 2 === 1 ? `${10 + index * 5}%` : "auto",
            zIndex: 0,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <LocationOn
            sx={{
              fontSize: "2rem",
              color: "#ea580c",
              filter: "blur(1px)",
            }}
          />
        </motion.div>
      ))}

      {/* Pulsing Location Rings */}
      {[1, 2, 3].map((ring, index) => (
        <motion.div
          key={ring}
          className="absolute"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "2px solid #ea580c",
            opacity: 0,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [0.5, 2.5],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default ShopLocationMapLoadingPlaceholder;
