import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";

/**
 * ApartmentAdsSlider Component
 * Displays promotional apartment ads in a carousel
 */
function ApartmentAdsSlider() {
  const apartmentAds = [
    {
      id: 1,
      title: "Luxury Apartments in Lagos",
      description: "Premium waterfront living",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=85",
      link: "/bookings/listings",
      bgGradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    },
    {
      id: 2,
      title: "Cozy Studio Apartments",
      description: "Perfect for business travelers",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=85",
      link: "/bookings/listings",
      bgGradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    },
    {
      id: 3,
      title: "Family Villas & Houses",
      description: "Spacious homes for your family",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=85",
      link: "/bookings/listings",
      bgGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    },
    {
      id: 4,
      title: "Beachfront Resorts",
      description: "Vacation paradise awaits",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=85",
      link: "/bookings/listings",
      bgGradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
    },
  ];

  return (
    <div className="h-full w-full">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        transitionTime={800}
        showArrows={false}
        stopOnHover={true}
      >
        {apartmentAds.map((ad) => (
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
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 opacity-30"
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
                {/* Icon/Badge */}
                <div className="mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/40">
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Featured Property
                  </Typography>
                </div>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    color: "white",
                    marginBottom: "12px",
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                    lineHeight: 1.2,
                  }}
                >
                  {ad.title}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "rgba(255, 255, 255, 0.95)",
                    marginBottom: "16px",
                    textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {ad.description}
                </Typography>

                {/* CTA Button */}
                <div className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  Explore Now
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">🏠</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
}

export default ApartmentAdsSlider;
