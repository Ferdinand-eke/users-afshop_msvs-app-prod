import { motion } from "framer-motion";
import { useState } from "react";
import {
  Restaurant,
  LocalBar,
  SportsEsports,
  LocationOn,
  Star,
  ChevronRight,
} from "@mui/icons-material";

/**
 * DemoSidebarRight Component
 * Beautiful sidebar showing local activities, restaurants, clubs, and spots
 */
function DemoSidebarRight() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Placeholder data - will be replaced with API data
  const activities = [
    {
      id: 1,
      name: "Ocean View Restaurant",
      category: "restaurant",
      description: "Fine dining with breathtaking ocean views",
      distance: "0.5 km",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      price: "₦₦₦",
    },
    {
      id: 2,
      name: "Sunset Lounge",
      category: "club",
      description: "Premium nightlife experience",
      distance: "0.8 km",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400",
      price: "₦₦",
    },
    {
      id: 3,
      name: "Coastal Park",
      category: "spot",
      description: "Beautiful walking trails and scenic views",
      distance: "1.2 km",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
      price: "Free",
    },
    {
      id: 4,
      name: "The Spice Kitchen",
      category: "restaurant",
      description: "Authentic local cuisine",
      distance: "0.3 km",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      price: "₦₦",
    },
    {
      id: 5,
      name: "VIP Club",
      category: "club",
      description: "Exclusive entertainment venue",
      distance: "1.5 km",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1571813840073-7f0e174f0b20?w=400",
      price: "₦₦₦",
    },
    {
      id: 6,
      name: "Art Gallery & Museum",
      category: "spot",
      description: "Contemporary African art collection",
      distance: "2.0 km",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=400",
      price: "₦",
    },
  ];

  const categories = [
    { id: "all", label: "All", icon: LocationOn },
    { id: "restaurant", label: "Restaurants", icon: Restaurant },
    { id: "club", label: "Clubs", icon: LocalBar },
    { id: "spot", label: "Spots", icon: SportsEsports },
  ];

  const filteredActivities =
    selectedCategory === "all"
      ? activities
      : activities.filter((activity) => activity.category === selectedCategory);

  return (
    <div className="h-full flex flex-col p-6 md:p-8 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div
          className="h-1 w-16 rounded-full mb-4"
          style={{
            background: "linear-gradient(90deg, #f97316 0%, #ea580c 100%)",
          }}
        />
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Explore Nearby
        </h2>
        <p className="text-sm text-gray-600">
          Discover what's around your stay
        </p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#ea580c #f5f5f4",
        }}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "text-white shadow-md"
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    }
                  : {}
              }
            >
              <Icon sx={{ fontSize: "1rem" }} />
              <span>{category.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Activities List */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer group border border-gray-100"
          >
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=Image";
                }}
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
                }}
              />
              {/* Distance Badge */}
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 flex items-center gap-1">
                <LocationOn sx={{ fontSize: "0.875rem", color: "#ea580c" }} />
                {activity.distance}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Name and Rating */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900 text-sm leading-tight flex-1 pr-2">
                  {activity.name}
                </h3>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50">
                  <Star sx={{ fontSize: "0.875rem", color: "#f97316" }} />
                  <span className="text-xs font-semibold text-orange-600">
                    {activity.rating}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {activity.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">
                  {activity.price}
                </span>
                <div className="flex items-center text-xs font-semibold group-hover:text-orange-600 transition-colors">
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    View Details
                  </span>
                  <ChevronRight
                    sx={{ fontSize: "1rem", color: "#ea580c" }}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        className="mt-6 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200"
      >
        <p className="text-xs text-gray-700 text-center">
          <span className="font-semibold text-orange-700">
            {filteredActivities.length} places
          </span>{" "}
          nearby to explore during your stay
        </p>
      </motion.div>
    </div>
  );
}

export default DemoSidebarRight;
