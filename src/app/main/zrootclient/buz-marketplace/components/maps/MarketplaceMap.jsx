import { useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from "react-leaflet";
import L from "leaflet";
import { Typography, Chip } from "@mui/material";
import { LocationOnOutlined, ShoppingCartOutlined } from "@mui/icons-material";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom shopping cart marker icon
const cartIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDQ4QzE2IDQ4IDMyIDI5LjMzMzMgMzIgMTZDMzIgNy4xNjM0NCAyNC44MzY2IDAgMTYgMEM3LjE2MzQ0IDAgMCA3LjE2MzQ0IDAgMTZDMCAyOS4zMzMzIDE2IDQ4IDE2IDQ4WiIgZmlsbD0iIzEwYjk4MSIvPgo8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI4IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -48],
});

/**
 * MapBounds Component
 * Automatically adjusts map view to fit the state boundary
 */
function MapBounds({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

/**
 * MarketplaceMap Component
 * Shows the active shopping cart state with highlighting
 * Uses dummy data for demonstration - will be replaced with API data
 */
function MarketplaceMap() {
  // Dummy data for active shopping state
  // This will be replaced with API data from the user's active cart session
  const activeState = useMemo(() => {
    return {
      id: "lagos-state",
      name: "Lagos State",
      center: [6.5244, 3.3792], // Lagos coordinates
      zoom: 10,
      // Approximate boundary coordinates for Lagos (simplified polygon)
      boundary: [
        [6.7027, 3.2019],
        [6.6989, 3.5869],
        [6.4281, 3.5869],
        [6.3880, 3.2019],
        [6.7027, 3.2019],
      ],
      cartInfo: {
        itemCount: 5,
        totalValue: 125000,
      },
    };
  }, []);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-lg">
      {/* Map Header Overlay */}
      <div
        className="absolute top-0 left-0 right-0 z-[1000] p-4"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ShoppingCartOutlined sx={{ color: "white", fontSize: "1.5rem" }} />
            <Typography
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "white",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Active Shopping Region
            </Typography>
          </div>
          <Chip
            label={activeState.name}
            sx={{
              backgroundColor: "rgba(16, 185, 129, 0.95)",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.875rem",
              backdropFilter: "blur(10px)",
              maxWidth: "fit-content",
            }}
          />
        </div>
      </div>

      {/* Cart Info Badge */}
      <div
        className="absolute bottom-4 left-4 right-4 z-[1000]"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "#6b7280",
                fontWeight: 500,
              }}
            >
              Cart Items
            </Typography>
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#10b981",
              }}
            >
              {activeState.cartInfo.itemCount}
            </Typography>
          </div>
          <div className="text-right">
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "#6b7280",
                fontWeight: 500,
              }}
            >
              Total Value
            </Typography>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#ea580c",
              }}
            >
              ₦{activeState.cartInfo.totalValue.toLocaleString()}
            </Typography>
          </div>
        </div>
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#9ca3af",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          You can only shop in one state at a time
        </Typography>
      </div>

      <MapContainer
        center={activeState.center}
        zoom={activeState.zoom}
        scrollWheelZoom={true}
        zoomControl={true}
        className="w-full h-full"
        style={{ minHeight: "100%" }}
      >
        {/* Custom Tile Layer - Using CartoDB Positron for better aesthetics */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />

        {/* Auto-adjust bounds */}
        <MapBounds center={activeState.center} zoom={activeState.zoom} />

        {/* State Boundary Polygon - Highlighted */}
        <Polygon
          positions={activeState.boundary}
          pathOptions={{
            color: "#10b981",
            fillColor: "#10b981",
            fillOpacity: 0.2,
            weight: 3,
            dashArray: "10, 10",
          }}
        />

        {/* Center Marker for the state */}
        <Marker position={activeState.center} icon={cartIcon}>
          <Popup
            maxWidth={300}
            className="custom-popup"
          >
            <div className="flex flex-col gap-3 p-3">
              <div className="flex items-center gap-2">
                <ShoppingCartOutlined sx={{ color: "#10b981", fontSize: "1.75rem" }} />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#111827",
                  }}
                >
                  {activeState.name}
                </Typography>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    color: "#065f46",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Active Shopping Cart
                </Typography>
                <div className="flex justify-between items-center">
                  <Typography sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {activeState.cartInfo.itemCount} items
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#ea580c",
                    }}
                  >
                    ₦{activeState.cartInfo.totalValue.toLocaleString()}
                  </Typography>
                </div>
              </div>

              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "#6b7280",
                  fontStyle: "italic",
                  textAlign: "center",
                  marginTop: "4px",
                }}
              >
                All products in your cart are from this state
              </Typography>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Custom CSS for popup styling */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
          padding: 0;
          overflow: hidden;
        }

        .custom-popup .leaflet-popup-content {
          margin: 0;
          min-width: 280px;
        }

        .custom-popup .leaflet-popup-tip {
          background: white;
        }

        .leaflet-container {
          font-family: inherit;
        }

        .custom-popup .leaflet-popup-close-button {
          font-size: 24px;
          font-weight: bold;
          color: #6b7280;
          padding: 8px 12px;
          transition: all 0.3s ease;
        }

        .custom-popup .leaflet-popup-close-button:hover {
          color: #10b981;
          background-color: rgba(16, 185, 129, 0.1);
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default MarketplaceMap;
