import { useState } from "react";
import { Typography, Button, Chip, Divider, IconButton, Avatar } from "@mui/material";
import {
  LocationOn,
  Phone,
  AccessTime,
  Star,
  Favorite,
  FavoriteBorder,
  Share,
  Language,
  Email,
  Restaurant,
  People,
  PersonAdd,
  Verified,
} from "@mui/icons-material";

/**
 * RestaurantProfileSidebar Component
 * A professional, captivating sidebar displaying restaurant/club/spot profile information
 */
function DemoSidebar(props) {
  const { martMenu } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock data - replace with actual data from martMenu
  const profileData = {
    name: martMenu?.title || "Restaurant Name",
    logo: martMenu?.imageSrc || martMenu?.imageSrcs?.[0]?.url,
    category: martMenu?.category || "Restaurant & Bar",
    verified: martMenu?.verified || true,
    rating: martMenu?.rating || 4.5,
    reviewCount: martMenu?.reviewCount || 234,
    followers: martMenu?.followers || 1250,
    following: martMenu?.following || 340,
    address: martMenu?.address || "123 Main Street, Lagos, Nigeria",
    phone: martMenu?.phone || "+234 123 456 7890",
    email: martMenu?.email || "info@restaurant.com",
    website: martMenu?.website || "www.restaurant.com",
    openTime: martMenu?.openTime || "10:00 AM",
    closeTime: martMenu?.closeTime || "11:00 PM",
    daysOpen: martMenu?.daysOpen || "Mon - Sun",
    establishedYear: martMenu?.establishedYear || "2020",
    description:
      martMenu?.description ||
      "Experience the finest dining with our exquisite menu and exceptional service.",
    specialties: martMenu?.specialties || [
      "Continental",
      "African Cuisine",
      "Cocktails",
      "Live Music",
    ],
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div
      className="flex flex-col h-screen px-6 py-6 overflow-y-auto"
      style={{
        background:
          "linear-gradient(160deg, #7c2d12 0%, #9a3412 18%, #c2410c 38%, #ea580c 55%, #f97316 70%, #fed7aa 85%, #fff7ed 100%)",
      }}
    >
      <div className="flex flex-col flex-1 bg-white rounded-2xl shadow-xl overflow-visible mt-14 min-h-0">
        {/* Header Section with Cover */}
        <div className="relative h-32 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-t-2xl flex-shrink-0">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <Avatar
                src={profileData.logo}
                alt={profileData.name}
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              {profileData.verified && (
                <Verified
                  className="absolute bottom-2 right-2 bg-white rounded-full"
                  sx={{ color: "#ea580c", fontSize: 32 }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Profile Info Section — fills remaining card height */}
        <div className="flex flex-col flex-1 justify-between pt-20 px-6 pb-6 min-h-0">

          {/* Block 1 — Identity */}
          <div>
            {/* Name and Category */}
            <div className="text-center mb-4">
              <Typography variant="h5" className="font-bold text-gray-900 mb-1">
                {profileData.name}
              </Typography>
              <Chip
                icon={<Restaurant fontSize="small" />}
                label={profileData.category}
                size="small"
                className="bg-orange-100 text-orange-700"
              />
            </div>

            {/* Rating and Since */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500" fontSize="small" />
                <Typography variant="body2" className="font-semibold">
                  {profileData.rating}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  ({profileData.reviewCount} reviews)
                </Typography>
              </div>
              <Typography variant="caption" className="text-gray-500">
                • Since {profileData.establishedYear}
              </Typography>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-4">
              <Button
                fullWidth
                variant={isFollowing ? "outlined" : "contained"}
                startIcon={isFollowing ? <People /> : <PersonAdd />}
                onClick={handleToggleFollow}
                sx={{
                  backgroundColor: isFollowing ? "transparent" : "#ea580c",
                  borderColor: "#ea580c",
                  color: isFollowing ? "#ea580c" : "white",
                  "&:hover": {
                    backgroundColor: isFollowing ? "#ffedd5" : "#c2410c",
                    borderColor: "#c2410c",
                  },
                }}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <IconButton
                onClick={handleToggleFavorite}
                sx={{
                  border: "1px solid #e5e7eb",
                  "&:hover": { backgroundColor: "#fef2f2" },
                }}
              >
                {isFavorite ? <Favorite sx={{ color: "#ef4444" }} /> : <FavoriteBorder />}
              </IconButton>
              <IconButton
                sx={{
                  border: "1px solid #e5e7eb",
                  "&:hover": { backgroundColor: "#f3f4f6" },
                }}
              >
                <Share />
              </IconButton>
            </div>

            {/* Followers/Following Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="text-center">
                <Typography variant="h6" className="font-bold text-gray-900">
                  {profileData.followers.toLocaleString()}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Followers
                </Typography>
              </div>
              <div className="text-center">
                <Typography variant="h6" className="font-bold text-gray-900">
                  {profileData.following.toLocaleString()}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Following
                </Typography>
              </div>
            </div>
          </div>

          {/* Block 2 — About */}
          <div>
            <Divider className="mb-4" />

            {profileData.description && (
              <div className="mb-3">
                <Typography variant="body2" className="text-gray-600 leading-relaxed">
                  {profileData.description}
                </Typography>
              </div>
            )}

            {profileData.specialties && profileData.specialties.length > 0 && (
              <div>
                <Typography variant="caption" className="text-gray-500 font-semibold mb-2 block">
                  SPECIALTIES
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {profileData.specialties.map((specialty, index) => (
                    <Chip
                      key={index}
                      label={specialty}
                      size="small"
                      className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Block 3 — Hours, Contact & Quick Actions */}
          <div>
            <Divider className="mb-4" />

            {/* Opening Hours */}
            <div className="mb-4">
              <div className="flex items-start gap-3">
                <AccessTime className="text-orange-600 mt-1" fontSize="small" />
                <div className="flex-1">
                  <Typography variant="body2" className="font-semibold text-gray-900 mb-1">
                    Opening Hours
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {profileData.daysOpen}
                  </Typography>
                  <Typography variant="body2" className="text-green-600 font-medium">
                    {profileData.openTime} - {profileData.closeTime}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 mb-4">
              <Typography variant="caption" className="text-gray-500 font-semibold block">
                CONTACT INFORMATION
              </Typography>

              <div className="flex items-start gap-3">
                <LocationOn className="text-orange-600 mt-1" fontSize="small" />
                <Typography variant="body2" className="text-gray-600 flex-1">
                  {profileData.address}
                </Typography>
              </div>

              {profileData.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="text-orange-600" fontSize="small" />
                  <Typography variant="body2" className="text-gray-600">
                    {profileData.phone}
                  </Typography>
                </div>
              )}

              {profileData.email && (
                <div className="flex items-center gap-3">
                  <Email className="text-orange-600" fontSize="small" />
                  <Typography variant="body2" className="text-gray-600">
                    {profileData.email}
                  </Typography>
                </div>
              )}

              {profileData.website && (
                <div className="flex items-center gap-3">
                  <Language className="text-orange-600" fontSize="small" />
                  <a
                    href={`https://${profileData.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 text-sm"
                  >
                    {profileData.website}
                  </a>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              {["Menu", "Gallery", "Reviews", "Directions"].map((label) => (
                <Button
                  key={label}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "#fed7aa",
                    color: "#ea580c",
                    "&:hover": {
                      backgroundColor: "#ffedd5",
                      borderColor: "#fb923c",
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DemoSidebar;
