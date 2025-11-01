import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

/**
 * AdsSlider Component
 * Beautiful carousel for promotional ads with orange gradient theme
 */
function AdsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Placeholder ads data - will be replaced with API data
  const ads = [
    {
      id: 1,
      title: "Summer Special Offer",
      description: "Get 20% off on all bookings made this month!",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
      cta: "Book Now",
      gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    },
    {
      id: 2,
      title: "Luxury Getaway Package",
      description: "Experience premium comfort with exclusive amenities",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop",
      cta: "Explore",
      gradient: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
    },
    {
      id: 3,
      title: "Extended Stay Discounts",
      description: "Save more when you stay longer with us",
      image:
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&auto=format&fit=crop",
      cta: "Learn More",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, ads.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ads.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ads.length) % ads.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${ads[currentSlide].image})`,
            }}
          >
            {/* Dark overlay for better text visibility */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-6 text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2">
                {ads[currentSlide].title}
              </h3>
              <p className="text-sm mb-4 line-clamp-2">
                {ads[currentSlide].description}
              </p>

              <button
                className="px-6 py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:scale-105"
                style={{
                  background: ads[currentSlide].gradient,
                }}
              >
                {ads[currentSlide].cta}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2 pointer-events-none">
        <IconButton
          onClick={prevSlide}
          className="pointer-events-auto"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
            width: 32,
            height: 32,
          }}
        >
          <ChevronLeft sx={{ color: "#ea580c" }} />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          className="pointer-events-auto"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
            width: 32,
            height: 32,
          }}
        >
          <ChevronRight sx={{ color: "#ea580c" }} />
        </IconButton>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default AdsSlider;
