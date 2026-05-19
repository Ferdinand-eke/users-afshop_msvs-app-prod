import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import { MapOutlined, LocationOffOutlined, LocationOnOutlined } from "@mui/icons-material";
import ImprovedFoodMartMapSingle from "../../components/maps/ImprovedFoodMartMapSingle";
import FoodMartMapLoadingPlaceholder from "../../foodMartPage/shared-components/FoodMartMapLoadingPlaceholder";

// ── Placeholder shown when the restaurant has no saved coordinates ──────────
function LocationUnavailablePlaceholder({ itemName }) {
  return (
    <div
      className="flex flex-col h-screen p-6"
      style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f3f4f6 100%)" }}
    >
      {/* Header — same style as the live map view */}
      <div
        className="mb-6 p-4 rounded-xl flex items-center gap-3 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          boxShadow: "0 4px 15px rgba(249, 115, 22, 0.3)",
        }}
      >
        <MapOutlined sx={{ color: "white", fontSize: "1.75rem" }} />
        <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "white" }}>
          Location
        </Typography>
      </div>

      {/* Placeholder body */}
      <div
        className="flex-1 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col items-center justify-center gap-6 px-6"
        style={{
          background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(234,88,12,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234,88,12,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated pin icon */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <div
            className="p-6 rounded-full shadow-xl"
            style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}
          >
            <LocationOffOutlined sx={{ fontSize: "3.5rem", color: "white" }} />
          </div>
        </motion.div>

        {/* Message */}
        <div className="relative z-10 text-center space-y-2">
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, color: "#9a3412" }}>
            Location Not Yet Available
          </Typography>
          {itemName && (
            <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#c2410c" }}>
              {itemName}
            </Typography>
          )}
          <Typography sx={{ fontSize: "0.9rem", color: "#78350f", lineHeight: 1.6 }}>
            This restaurant hasn't added their map coordinates yet.
            <br />
            Check back soon or contact them directly.
          </Typography>
        </div>

        {/* Floating decorative pins */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
            }}
            animate={{ y: [0, -8, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
          >
            <LocationOnOutlined sx={{ fontSize: "2rem", color: "#ea580c" }} />
          </motion.div>
        ))}
      </div>

      {/* Footer — same style as the live map view */}
      <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md flex-shrink-0">
        <Typography sx={{ fontSize: "0.875rem", color: "#6b7280", textAlign: "center" }}>
          Location coordinates will appear here once configured
        </Typography>
      </div>
    </div>
  );
}

// ── Main sidebar component ───────────────────────────────────────────────────
function DemoSidebarRight({ item }) {
  // Still loading restaurant data
  if (!item) {
    return <FoodMartMapLoadingPlaceholder />;
  }

  const hasLocation =
    item?.latitude &&
    item?.longitude &&
    !isNaN(item.latitude) &&
    !isNaN(item.longitude);

  // Restaurant data arrived but coordinates are missing
  if (!hasLocation) {
    return <LocationUnavailablePlaceholder itemName={item?.title} />;
  }

  // All good — show the live map
  return (
    <div
      className="flex flex-col h-screen p-6"
      style={{ background: "linear-gradient(180deg, #fafaf9 0%, #f3f4f6 100%)" }}
    >
      {/* Header */}
      <div
        className="mb-6 p-4 rounded-xl flex items-center gap-3 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          boxShadow: "0 4px 15px rgba(249, 115, 22, 0.3)",
        }}
      >
        <MapOutlined sx={{ color: "white", fontSize: "1.75rem" }} />
        <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "white" }}>
          Location
        </Typography>
      </div>

      {/* Map */}
      <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl">
        <ImprovedFoodMartMapSingle item={item} />
      </div>

      {/* Footer */}
      <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md flex-shrink-0">
        <Typography sx={{ fontSize: "0.875rem", color: "#6b7280", textAlign: "center" }}>
          Click on the marker to view details
        </Typography>
      </div>
    </div>
  );
}

export default DemoSidebarRight;
