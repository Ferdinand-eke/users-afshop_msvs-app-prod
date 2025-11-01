import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";

/**
 * PaymentSuccessful Component
 * Displays a beautiful success message with celebration animation
 */
function PaymentSuccessful({
  userName = "Guest",
  reservationId,
  checkInDate,
  checkOutDate,
  propertyName,
}) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const confettiColors = [
    "bg-orange-500",
    "bg-orange-600",
    "bg-yellow-500",
    "bg-amber-500",
    "bg-orange-400",
    "bg-yellow-600",
    "bg-orange-700",
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ minHeight: '70vh' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Confetti Background - Raining Celebration Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(50)].map((_, i) => {
            const shapes = ['rounded-full', 'rounded-sm', 'rounded'];
            const shape = shapes[i % shapes.length];
            const size = Math.random() > 0.5 ? 'w-4 h-4' : Math.random() > 0.3 ? 'w-5 h-5' : 'w-6 h-6';

            return (
              <motion.div
                key={i}
                className={`absolute ${size} ${confettiColors[i % confettiColors.length]} ${shape} shadow-lg`}
                style={{
                  left: `${Math.random() * 100}%`,
                  opacity: 0.8,
                }}
                initial={{
                  y: -50,
                  rotate: 0,
                  scale: 0.8,
                }}
                animate={{
                  y: '110vh',
                  rotate: [0, 180, 360, 540],
                  scale: [0.8, 1, 0.9, 1],
                  x: [0, Math.random() * 50 - 25, 0],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear",
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row h-full relative z-10">
          {/* Left Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            {/* Add container with consistent padding for text alignment */}
            <div className="max-w-lg mx-auto md:mx-0 md:pl-8">
              <motion.div variants={itemVariants}>
                {/* Success Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="rounded-full p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%)",
                    }}
                  >
                    <CheckCircle
                      sx={{ fontSize: "2.5rem", color: "#ea580c" }}
                    />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Payment Successful
                  </h1>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-gray-600 mb-2 text-lg">
                  Thank you for choosing <span className="font-semibold text-orange-600">Africanshops Homes</span>, {userName}!
                </p>
                <p className="text-gray-600 mb-6">
                  Your reservation has been confirmed. We look forward to hosting you and ensuring you have a wonderful stay.
                </p>
              </motion.div>

            {/* Progress Indicator */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    }}
                  >
                    <CheckCircle sx={{ fontSize: "1.25rem", color: "white" }} />
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    Property selected
                  </span>
                </div>
                <div
                  className="flex-1 h-1 mx-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #f97316 0%, #ea580c 100%)",
                  }}
                ></div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    }}
                  >
                    <CheckCircle sx={{ fontSize: "1.25rem", color: "white" }} />
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    Payment received
                  </span>
                </div>
                <div
                  className="flex-1 h-1 mx-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #f97316 0%, #ea580c 100%)",
                  }}
                ></div>
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    }}
                  >
                    <CheckCircle sx={{ fontSize: "1.25rem", color: "white" }} />
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    Reservation confirmed
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Reservation Details */}
            {(checkInDate || checkOutDate || propertyName) && (
              <motion.div
                variants={itemVariants}
                className="bg-gray-50 rounded-lg p-4 mb-6"
              >
                <h3 className="font-semibold text-gray-800 mb-3">
                  Reservation Details
                </h3>
                {propertyName && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Property:</span> {propertyName}
                  </p>
                )}
                {checkInDate && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Check-in:</span> {checkInDate}
                  </p>
                )}
                {checkOutDate && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Check-out:</span> {checkOutDate}
                  </p>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                variant="contained"
                component={NavLinkAdapter}
                to={`/bookings/${reservationId}/reservation-detail`}
                sx={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                    boxShadow: "0 8px 20px rgba(234, 88, 12, 0.4)",
                  },
                }}
              >
                View Reservation
              </Button>
              <Button
                variant="outlined"
                component={NavLinkAdapter}
                to="/bookings/listings"
                sx={{
                  textTransform: "none",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "#9ca3af",
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                Browse More Properties
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <p className="text-sm text-gray-500">
                Warm Regards,
                <br />
                <span className="font-semibold text-gray-700">
                  The Africanshops Team
                </span>
              </p>
            </motion.div>
            </div>
          </div>

          {/* Right Illustration Section */}
          <div
            className="md:w-1/2 flex items-center justify-center p-8 md:p-12 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(254, 243, 226, 0.8) 0%, rgba(253, 186, 116, 0.5) 100%)",
            }}
          >
            {/* Background Confetti */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-3 h-3 ${confettiColors[i % confettiColors.length]} rounded-sm opacity-60`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative z-10 w-full flex items-center justify-center"
            >
              {/* Celebration Person Illustration */}
              <img
                // src="https://i.imgur.com/8zYqQYX.png"
                src="assets/images/celebrate/celebrate6.jpg"
                alt="Celebration illustration"
                className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
                onError={(e) => {
                  // Fallback to alternative celebration image if primary fails
                  e.target.onerror = null;
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/5709/5709755.png";
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentSuccessful;
