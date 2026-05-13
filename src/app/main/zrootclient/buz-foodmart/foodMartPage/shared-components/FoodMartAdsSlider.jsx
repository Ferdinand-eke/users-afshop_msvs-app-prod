import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";

const restaurantAds = [
  {
    id: 1,
    title: "Top Restaurants in Lagos",
    description: "Discover fine dining experiences",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=85",
    link: "/foodmarts",
    bgGradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    emoji: "🍽️",
  },
  {
    id: 2,
    title: "African Cuisine Spots",
    description: "Authentic flavors, local pride",
    image:
      "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?w=600&auto=format&fit=crop&q=85",
    link: "/foodmarts",
    bgGradient: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
    emoji: "🥘",
  },
  {
    id: 3,
    title: "Street Food & Snacks",
    description: "Bold tastes on every corner",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=85",
    link: "/foodmarts",
    bgGradient: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
    emoji: "🌮",
  },
  {
    id: 4,
    title: "Bars, Clubs & Lounges",
    description: "Unwind at the best nightlife spots",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&auto=format&fit=crop&q=85",
    link: "/foodmarts",
    bgGradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    emoji: "🍹",
  },
];

function FoodMartAdsSlider() {
  return (
    <div className="h-full w-full">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showIndicators
        transitionTime={800}
        showArrows={false}
        stopOnHover
      >
        {restaurantAds.map((ad) => (
          <motion.div
            key={ad.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="h-full cursor-pointer"
          >
            <Card
              component={NavLinkAdapter}
              to={ad.link}
              sx={{
                height: "100%",
                position: "relative",
                overflow: "hidden",
                borderRadius: "16px",
                background: ad.bgGradient,
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `url(${ad.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <CardContent
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "24px",
                  color: "white",
                }}
              >
                <div className="mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/40">
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: "bold", color: "white" }}>
                    Featured Spot
                  </Typography>
                </div>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    color: "white",
                    marginBottom: "10px",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    lineHeight: 1.2,
                  }}
                >
                  {ad.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.95)",
                    marginBottom: "14px",
                    textShadow: "0 1px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  {ad.description}
                </Typography>
                <div className="mt-2 px-6 py-2 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  Explore Now
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">{ad.emoji}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
}

export default FoodMartAdsSlider;
