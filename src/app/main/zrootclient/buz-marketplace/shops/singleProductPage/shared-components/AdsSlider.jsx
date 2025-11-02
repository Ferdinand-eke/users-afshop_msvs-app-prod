import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, IconButton, Chip } from "@mui/material";
import { ChevronLeft, ChevronRight, LocalOffer, TrendingUp, Verified } from "@mui/icons-material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";

/**
 * AdsSlider Component
 * Beautiful auto-playing slider for displaying promotional ads
 * Highly engaging and professional design
 */
function AdsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Dummy ads data - Replace with actual data from API
  const ads = [
    {
      id: 1,
      title: "Summer Electronics Sale",
      subtitle: "Up to 50% OFF on Premium Gadgets",
      description: "Limited time offer on smartphones, laptops & accessories",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
      badge: "HOT DEAL",
      badgeColor: "#ef4444",
      ctaText: "Shop Now",
      ctaLink: "/marketplace",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "Flash Sale Alert",
      subtitle: "24 Hours Only - Don't Miss Out!",
      description: "Extra 30% off on fashion & lifestyle products",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
      badge: "FLASH SALE",
      badgeColor: "#f59e0b",
      ctaText: "Grab Deal",
      ctaLink: "/marketplace",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Latest Products Just Landed",
      description: "Be the first to shop our newest collection",
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&q=80",
      badge: "NEW",
      badgeColor: "#10b981",
      ctaText: "Explore",
      ctaLink: "/marketplace",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "Premium Membership",
      subtitle: "Join Today & Save More",
      description: "Exclusive deals & free shipping for members",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80",
      badge: "EXCLUSIVE",
      badgeColor: "#8b5cf6",
      ctaText: "Join Now",
      ctaLink: "/marketplace",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ads.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, ads.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % ads.length);
  };

  const currentAd = ads[currentSlide];

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: currentAd.gradient }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative h-full"
        >
          {/* Background Image with Overlay */}
          <div className="relative h-[400px] overflow-hidden">
            <img
              src={currentAd.image}
              alt={currentAd.title}
              className="w-full h-full object-cover opacity-40"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-4"
            >
              <Chip
                icon={<LocalOffer />}
                label={currentAd.badge}
                sx={{
                  backgroundColor: currentAd.badgeColor,
                  color: "white",
                  fontWeight: 800,
                  fontSize: "0.875rem",
                  padding: "20px 8px",
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                  boxShadow: `0 4px 20px ${currentAd.badgeColor}80`,
                }}
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Typography
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: "white",
                  marginBottom: "8px",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  lineHeight: 1.2,
                }}
              >
                {currentAd.title}
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "12px",
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {currentAd.subtitle}
              </Typography>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "20px",
                  textShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              >
                {currentAd.description}
              </Typography>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                component={NavLinkAdapter}
                to={currentAd.ctaLink}
                className="px-8 py-3 bg-white text-gray-900 font-bold text-base rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{
                  boxShadow: "0 4px 20px rgba(255,255,255,0.3)",
                }}
              >
                {currentAd.ctaText} →
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <IconButton
          onClick={goToPrevious}
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": {
              backgroundColor: "white",
            },
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          <ChevronLeft sx={{ fontSize: "2rem", color: "#111827" }} />
        </IconButton>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <IconButton
          onClick={goToNext}
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            "&:hover": {
              backgroundColor: "white",
            },
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          <ChevronRight sx={{ fontSize: "2rem", color: "#111827" }} />
        </IconButton>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {ads.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      {!isPaused && (
        <motion.div
          className="absolute top-4 right-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp sx={{ fontSize: "1rem", color: "#10b981" }} />
            </motion.div>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#10b981",
              }}
            >
              Auto
            </Typography>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AdsSlider;
