import { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Chip,
  Divider,
  Card,
  CardContent,
  Button,
  Rating,
} from "@mui/material";
import {
  Verified,
  Wifi,
  AcUnit,
  LocalParking,
  Pool,
  Restaurant,
  FitnessCenter,
  Spa,
  Share,
  Favorite,
  FavoriteBorder,
  LocationOn,
  BedroomParent,
  Bathtub,
  SquareFoot,
} from "@mui/icons-material";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";
import ImageGalleryView from "./ImageGalleryView";
import ContentLoadingPlaceholder from "../../bookingsPage/shared-components/ContentLoadingPlaceholder";

/**
 * DemoContent Component - REDESIGNED
 * Compelling, production-ready property details page
 */
function DemoContent(props) {
  const { isLoading, isError, bookingData } = props;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Loading state
  if (isLoading) {
    return <ContentLoadingPlaceholder />;
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Typography variant="h5" color="error">
          Error loading property details
        </Typography>
      </div>
    );
  }

  // No data state
  if (!bookingData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Typography variant="h5" color="text.secondary">
          Property not found
        </Typography>
      </div>
    );
  }

  // Mock amenities data - replace with actual data
  const amenities = [
    { icon: <Wifi />, label: "Free WiFi" },
    { icon: <AcUnit />, label: "Air Conditioning" },
    { icon: <LocalParking />, label: "Free Parking" },
    { icon: <Pool />, label: "Swimming Pool" },
    { icon: <Restaurant />, label: "Restaurant" },
    { icon: <FitnessCenter />, label: "Fitness Center" },
    { icon: <Spa />, label: "Spa & Wellness" },
  ];

  return (
    <div
      className="flex-auto p-8 sm:p-12"
      style={{
        background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 50%, #fef3e2 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Image Gallery Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        {/* Image Grid */}
        <div
          className="grid grid-cols-4 gap-3 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
          onClick={() => setGalleryOpen(true)}
        >
          {/* Main Large Image */}
          <div className="col-span-4 md:col-span-2 row-span-2 relative group">
            <img
              src={bookingData?.imageSrcs?.[0]?.url || "https://placehold.co/800x600"}
              alt="Main property"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: "500px", maxHeight: "500px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                View All {bookingData?.imageSrcs?.length || 0} Photos
              </Typography>
            </div>
          </div>

          {/* Top Right Image */}
          <div className="col-span-2 md:col-span-1 relative group">
            <img
              src={bookingData?.imageSrcs?.[1]?.url || "https://placehold.co/400x300"}
              alt="Property view 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: "245px", maxHeight: "245px" }}
            />
          </div>

          <div className="col-span-2 md:col-span-1 relative group">
            <img
              src={bookingData?.imageSrcs?.[2]?.url || "https://placehold.co/400x300"}
              alt="Property view 3"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: "245px", maxHeight: "245px" }}
            />
          </div>

          {/* Bottom Right Images */}
          <div className="col-span-2 md:col-span-1 relative group">
            <img
              src={bookingData?.imageSrcs?.[3]?.url || "https://placehold.co/400x300"}
              alt="Property view 4"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: "245px", maxHeight: "245px" }}
            />
          </div>

          <div className="col-span-2 md:col-span-1 relative group">
            <img
              src={bookingData?.imageSrcs?.[4]?.url || "https://placehold.co/400x300"}
              alt="Property view 5"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: "245px", maxHeight: "245px" }}
            />
            {bookingData?.imageSrcs?.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.75rem",
                    fontWeight: 800,
                  }}
                >
                  +{bookingData.imageSrcs.length - 5} more
                </Typography>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Property Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card
          sx={{
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            marginBottom: "24px",
            background: "linear-gradient(135deg, #ffffff 0%, #fff5f0 100%)",
          }}
        >
          <CardContent sx={{ padding: "32px" }}>
            {/* Title and Actions Row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Chip
                    label="FEATURED"
                    sx={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                    }}
                  />
                  <Chip
                    icon={<Verified sx={{ color: "white !important" }} />}
                    label="Verified"
                    sx={{
                      backgroundColor: "#10b981",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                    }}
                  />
                </div>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    color: "#111827",
                    marginBottom: "12px",
                    fontSize: "2.5rem",
                  }}
                >
                  {bookingData?.title}
                </Typography>

                {/* Rating and Location */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Rating value={4.3} precision={0.5} readOnly size="medium" />
                    <Typography
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      4.3
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.125rem",
                        color: "#6b7280",
                      }}
                    >
                      (24 reviews)
                    </Typography>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <LocationOn sx={{ color: "#ea580c", fontSize: "1.5rem" }} />
                  <Typography sx={{ fontSize: "1.125rem", color: "#6b7280" }}>
                    {bookingData?.address || "Location not specified"}
                  </Typography>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  sx={{
                    borderColor: "#ea580c",
                    color: "#ea580c",
                    borderWidth: "2px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#c2410c",
                      backgroundColor: "#fff7ed",
                      borderWidth: "2px",
                    },
                  }}
                >
                  Share
                </Button>
                <Button
                  variant="outlined"
                  startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                  onClick={() => setIsFavorite(!isFavorite)}
                  sx={{
                    borderColor: isFavorite ? "#ef4444" : "#ea580c",
                    color: isFavorite ? "#ef4444" : "#ea580c",
                    borderWidth: "2px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: isFavorite ? "#dc2626" : "#c2410c",
                      backgroundColor: isFavorite ? "#fef2f2" : "#fff7ed",
                      borderWidth: "2px",
                    },
                  }}
                >
                  Save
                </Button>
              </div>
            </div>

            <Divider sx={{ my: 3 }} />

            {/* Property Stats */}
            <div className="grid grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <BedroomParent sx={{ fontSize: "2rem", color: "#ea580c" }} />
                </div>
                <div>
                  <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827" }}>
                    {bookingData?.roomCount || 0}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "#6b7280" }}>
                    Bedrooms
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Bathtub sx={{ fontSize: "2rem", color: "#3b82f6" }} />
                </div>
                <div>
                  <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827" }}>
                    {bookingData?.bathroomCount || 0}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "#6b7280" }}>
                    Bathrooms
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <SquareFoot sx={{ fontSize: "2rem", color: "#10b981" }} />
                </div>
                <div>
                  <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827" }}>
                    2,400
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "#6b7280" }}>
                    Sq Ft
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  }}
                >
                  <Typography sx={{ fontSize: "1.5rem", fontWeight: 900, color: "white" }}>
                    ₦{formatCurrency(bookingData?.price)}
                  </Typography>
                  <Typography sx={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.9)" }}>
                    per night
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card
          sx={{
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            marginBottom: "24px",
          }}
        >
          <CardContent sx={{ padding: "32px" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              About This Property
            </Typography>
            <Typography
              sx={{
                fontSize: "1.125rem",
                color: "#6b7280",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              {bookingData?.shortDescription}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.125rem",
                color: "#6b7280",
                lineHeight: 1.8,
              }}
            >
              {bookingData?.description}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      {/* Amenities Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card
          sx={{
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            marginBottom: "24px",
            background: "linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)",
          }}
        >
          {/* <CardContent sx={{ padding: "32px" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#111827",
                marginBottom: "24px",
              }}
            >
              Amenities & Features
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-2 bg-orange-100 rounded-lg">
                    {amenity.icon && (
                      <span style={{ color: "#ea580c", fontSize: "1.5rem" }}>
                        {amenity.icon}
                      </span>
                    )}
                  </div>
                  <Typography
                    sx={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {amenity.label}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContent> */}
        </Card>
      </motion.div>

      {/* Image Gallery Modal */}
      <ImageGalleryView
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={bookingData?.imageSrcs || []}
        propertyData={{
          title: bookingData?.title,
          shortDescription: bookingData?.shortDescription,
          rating: 4.3,
          reviewCount: 24,
        }}
      />
    </div>
  );
}

export default DemoContent;

/*
 * OLD COMPONENT BACKUP (before redesign)
 * Located at: DemoContent_OLD_BACKUP.jsx
 */
