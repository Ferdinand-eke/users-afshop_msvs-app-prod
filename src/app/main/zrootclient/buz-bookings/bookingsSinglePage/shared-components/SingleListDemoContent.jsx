import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Typography, Chip, Divider, Card, CardContent, Button, Rating } from "@mui/material";
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
  Kitchen,
  LocalLaundryService,
  Tv,
  Balcony,
  Pets,
  SmokeFree,
  SecurityOutlined,
  ElevatorOutlined,
  LocalFireDepartment,
  Fireplace,
  DeckOutlined,
  YardOutlined,
  WaterDrop,
  ElectricBolt,
  AirOutlined,
  BeachAccessOutlined,
  HotTub,
  WheelchairPickup,
  IronOutlined,
  LocalCafe,
  MicrowaveOutlined,
  OutdoorGrill,
  CheckroomOutlined,
  DiningOutlined,
} from "@mui/icons-material";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";
import ImageGalleryView from "./ImageGalleryView";
import ContentLoadingPlaceholder from "../../bookingsPage/shared-components/ContentLoadingPlaceholder";

// Amenities icon mapping - maps amenity names/labels to their icons
const AMENITIES_ICON_MAP = {
  // Internet & Entertainment
  wifi: <Wifi />,
  "wi-fi": <Wifi />,
  "free wifi": <Wifi />,
  internet: <Wifi />,
  tv: <Tv />,
  television: <Tv />,
  "cable tv": <Tv />,

  // Climate Control
  "air conditioning": <AcUnit />,
  ac: <AcUnit />,
  "air conditioner": <AcUnit />,
  heating: <LocalFireDepartment />,
  heater: <LocalFireDepartment />,
  fireplace: <Fireplace />,

  // Kitchen & Dining
  kitchen: <Kitchen />,
  "full kitchen": <Kitchen />,
  kitchenette: <Kitchen />,
  microwave: <MicrowaveOutlined />,
  "coffee maker": <LocalCafe />,
  "coffee machine": <LocalCafe />,
  dining: <DiningOutlined />,
  "dining area": <DiningOutlined />,

  // Parking & Transportation
  parking: <LocalParking />,
  "free parking": <LocalParking />,
  "private parking": <LocalParking />,
  garage: <LocalParking />,

  // Pool & Recreation
  pool: <Pool />,
  "swimming pool": <Pool />,
  "swiming pool": <Pool />, // Common typo
  "outdoor pool": <Pool />,
  "hot tub": <HotTub />,
  jacuzzi: <HotTub />,
  gym: <FitnessCenter />,
  "fitness center": <FitnessCenter />,
  "fitness centre": <FitnessCenter />,
  spa: <Spa />,

  // Outdoor Spaces
  balcony: <Balcony />,
  patio: <DeckOutlined />,
  deck: <DeckOutlined />,
  terrace: <DeckOutlined />,
  garden: <YardOutlined />,
  yard: <YardOutlined />,
  "outdoor area": <YardOutlined />,
  "outdoor grill": <OutdoorGrill />,
  bbq: <OutdoorGrill />,
  barbecue: <OutdoorGrill />,
  beach: <BeachAccessOutlined />,
  "beach access": <BeachAccessOutlined />,
  beachfront: <BeachAccessOutlined />,

  // Laundry & Cleaning
  washer: <LocalLaundryService />,
  dryer: <LocalLaundryService />,
  "washing machine": <LocalLaundryService />,
  laundry: <LocalLaundryService />,
  iron: <IronOutlined />,
  "ironing board": <IronOutlined />,

  // Safety & Security
  security: <SecurityOutlined />,
  "security system": <SecurityOutlined />,
  "smoke detector": <SmokeFree />,
  "fire extinguisher": <LocalFireDepartment />,
  "first aid kit": <SecurityOutlined />,

  // Building Features
  elevator: <ElevatorOutlined />,
  lift: <ElevatorOutlined />,

  // Pet & Accessibility
  pets: <Pets />,
  "pet friendly": <Pets />,
  "pets allowed": <Pets />,
  wheelchair: <WheelchairPickup />,
  "wheelchair accessible": <WheelchairPickup />,
  accessible: <WheelchairPickup />,

  // Utilities
  water: <WaterDrop />,
  electricity: <ElectricBolt />,
  generator: <ElectricBolt />,

  // Food & Beverage
  restaurant: <Restaurant />,
  "on-site restaurant": <Restaurant />,
  bar: <LocalCafe />,

  // Storage
  closet: <CheckroomOutlined />,
  wardrobe: <CheckroomOutlined />,
  storage: <CheckroomOutlined />,

  // Default
  default: <AirOutlined />,
};

/**
 * Get the appropriate icon for an amenity based on its name/label
 * @param {string} amenityName - The name or label of the amenity
 * @returns {JSX.Element} - The icon component
 */
const getAmenityIcon = (amenityName) => {
  if (!amenityName) return AMENITIES_ICON_MAP.default;

  const normalizedName = amenityName.toLowerCase().trim();

  // Try exact match first
  if (AMENITIES_ICON_MAP[normalizedName]) {
    return AMENITIES_ICON_MAP[normalizedName];
  }

  // Try partial match (check if any key is contained in the amenity name)
  const matchingKey = Object.keys(AMENITIES_ICON_MAP).find(
    (key) => normalizedName.includes(key) || key.includes(normalizedName),
  );

  return matchingKey ? AMENITIES_ICON_MAP[matchingKey] : AMENITIES_ICON_MAP.default;
};

/**
 * SingleListDemoContent Component - REDESIGNED
 * Compelling, production-ready property details page
 */


function SingleListDemoContent(props) {
  const { isLoading, isError, bookingData, amenities } = props;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Filter amenities based on bookingData.checkedAmenities
  const propertyAmenities = useMemo(() => {
    if (!amenities || !Array.isArray(amenities) || amenities.length === 0) {
      console.log("No amenities available");
      return [];
    }

    if (!bookingData?.checkedAmenities || bookingData.checkedAmenities.length === 0) {
      console.log("No checked amenities for this property");
      return [];
    }

    // checkedAmenities is an array of amenity IDs
    const checkedAmenityIds = Array.isArray(bookingData.checkedAmenities)
      ? bookingData.checkedAmenities
      : [bookingData.checkedAmenities];

    console.log("Checked Amenity IDs:", checkedAmenityIds);
    console.log("All Amenities:", amenities);

    // Filter amenities to only include those that are checked for this property
    const filtered = amenities.filter((amenity) => {
      const amenityId = amenity.id || amenity._id;
      const isIncluded = checkedAmenityIds.includes(amenityId);
      if (isIncluded) {
        console.log(`Matched amenity: ${amenity.label} (${amenityId})`);
      }
      return isIncluded;
    });

    console.log("Filtered Amenities:", filtered);

    // Map to include the appropriate icon based on the icon field or label
    const result = filtered.map((amenity) => ({
      ...amenity,
      icon: getAmenityIcon(amenity.icon || amenity.label || amenity.name || amenity.title),
    }));

    console.log("Final Property Amenities with Icons:", result);

    return result;
  }, [amenities, bookingData?.checkedAmenities]);

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
              src={bookingData?.listingImages?.[0]?.url || "https://placehold.co/800x600"}
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
                View All {bookingData?.listingImages?.length || 0} Photos
              </Typography>
            </div>
          </div>

          {/* Top Right Image */}
          <div className="col-span-2 md:col-span-1 relative group">
            <img
              src={bookingData?.listingImages?.[1]?.url || "https://placehold.co/400x300"}
              alt="Property view 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: "245px", maxHeight: "245px" }}
            />
          </div>

          <div className="col-span-2 md:col-span-1 relative group">
            <img
              src={bookingData?.listingImages?.[2]?.url || "https://placehold.co/400x300"}
              alt="Property view 3"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: "245px", maxHeight: "245px" }}
            />
          </div>

          {/* Bottom Right Images */}
          <div className="col-span-2 md:col-span-1 relative group">
            <img
              src={bookingData?.listingImages?.[3]?.url || "https://placehold.co/400x300"}
              alt="Property view 4"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: "245px", maxHeight: "245px" }}
            />
          </div>

          <div className="col-span-2 md:col-span-1 relative group">
            <img
              src={bookingData?.listingImages?.[4]?.url || "https://placehold.co/400x300"}
              alt="Property view 5"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ minHeight: "245px", maxHeight: "245px" }}
            />
            {bookingData?.listingImages?.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.75rem",
                    fontWeight: 800,
                  }}
                >
                  +{bookingData.listingImages.length - 5} more
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
                  <Typography sx={{ fontSize: "1rem", color: "#6b7280" }}>Bedrooms</Typography>
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
                  <Typography sx={{ fontSize: "1rem", color: "#6b7280" }}>Bathrooms</Typography>
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
                  <Typography sx={{ fontSize: "1rem", color: "#6b7280" }}>Sq Ft</Typography>
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
      {propertyAmenities && propertyAmenities.length > 0 && (
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
            <CardContent sx={{ padding: "32px" }}>
              <div className="flex items-center justify-between mb-6">
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  Amenities & Features
                </Typography>
                <Chip
                  label={`${propertyAmenities.length} Available`}
                  sx={{
                    backgroundColor: "#f97316",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    padding: "4px 8px",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {propertyAmenities.map((amenity, index) => (
                  <motion.div
                    key={amenity.id || amenity._id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
                      <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors duration-300">
                        <span
                          style={{
                            color: "#ea580c",
                            fontSize: "1.75rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {amenity.icon}
                        </span>
                      </div>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#111827",
                          lineHeight: 1.3,
                          flex: 1,
                        }}
                      >
                        {amenity.label || amenity.name || amenity.title}
                      </Typography>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show a message if no amenities */}
              {propertyAmenities.length === 0 && (
                <div className="text-center py-8">
                  <Typography
                    sx={{
                      fontSize: "1.125rem",
                      color: "#6b7280",
                      fontStyle: "italic",
                    }}
                  >
                    No amenities information available for this property.
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}


      {/* Image Gallery Modal */}
      <ImageGalleryView
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={bookingData?.listingImages || bookingData?.imageSrcs || []}
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

export default SingleListDemoContent;

/*
 * OLD COMPONENT BACKUP (before redesign)
 * Located at: SingleListDemoContent_OLD_BACKUP.jsx
 */
