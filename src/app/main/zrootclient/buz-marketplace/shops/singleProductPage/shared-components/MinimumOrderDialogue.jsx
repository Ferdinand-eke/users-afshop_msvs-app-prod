import { useState, useEffect } from "react";
import { Button, Typography, Chip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import UseMinimumOrder from "./UseMinimumOrder";

/**
 * MinimumOrderDialogue Component
 * Displays wholesale and customization pricing with bulk order options
 */
function MinimumOrderDialogue({ productData }) {
  const [activeTab, setActiveTab] = useState("wholesale");
  const [selectedColor, setSelectedColor] = useState(null);
  const [sliderOpen, setSliderOpen] = useState(false);

  // Sample data - replace with actual product data
  // Each tier is associated with the product ID
  const pricingTiers = [
    {
      id: 1,
      productId: productData?.id || productData?._id || "default-product-id",
      range: "100 - 999 sets",
      price: "2,804.76",
    },
    {
      id: 2,
      productId: productData?.id || productData?._id || "default-product-id",
      range: "1000 - 9999 sets",
      price: "2,493.12",
    },
    {
      id: 3,
      productId: productData?.id || productData?._id || "default-product-id",
      range: ">= 10000 sets",
      price: "2,181.48",
    },
  ];

  // Check if slider should be open on mount (persistent state)
  useEffect(() => {
    const wasOpen = localStorage.getItem("minimumOrderSliderOpen") === "true";
    const savedProductId = localStorage.getItem("minimumOrderProductId");
    const currentProductId = productData?.id || productData?._id;

    if (wasOpen && savedProductId === currentProductId) {
      setSliderOpen(true);
    }
  }, [productData]);

  const handleStartOrder = () => {
    setSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setSliderOpen(false);
  };

  const colors = [
    { id: 1, name: "Purple", image: "https://placehold.co/50x50/9333ea/white" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-5 px-8 text-lg font-semibold transition-colors ${
            activeTab === "wholesale"
              ? "text-gray-900 border-b-3 border-orange-500 bg-white"
              : "text-gray-500 bg-gray-50 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("wholesale")}
        >
          Wholesale
        </button>
        <button
          className={`flex-1 py-5 px-8 text-lg font-semibold transition-colors ${
            activeTab === "customization"
              ? "text-gray-900 border-b-3 border-orange-500 bg-white"
              : "text-gray-500 bg-gray-50 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("customization")}
        >
          Customization
        </button>
      </div>

      {/* Content */}
      <div className="p-10">
        {/* Ready to Ship Badge */}
        <div className="flex items-center gap-4 mb-8">
          <Chip
            label="Ready to ship"
            size="medium"
            sx={{
              backgroundColor: "#eff6ff",
              color: "#1e40af",
              fontWeight: 600,
              fontSize: "1rem",
              height: "36px",
              paddingX: "12px",
            }}
          />
          <div className="flex items-center gap-2">
            <Typography className="text-orange-600 font-semibold text-base">
              5-day dispatch
            </Typography>
            <InfoOutlinedIcon
              sx={{ fontSize: 20, color: "#ea580c", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Lower Priced Badge */}
        <Chip
          label="Lower priced than similar"
          size="medium"
          sx={{
            backgroundColor: "#ea580c",
            color: "white",
            fontWeight: 600,
            fontSize: "1rem",
            height: "36px",
            paddingX: "16px",
            mb: 5,
          }}
        />

        {/* Pricing Tiers */}
        <div className="overflow-x-auto mb-10">
          <div className="flex gap-4 min-w-full">
            {pricingTiers.map((tier, index) => (
              <div key={index} className="text-center py-4 px-4 flex-shrink-0 min-w-[120px]">
                <Typography className="text-gray-600 text-sm mb-4 leading-snug font-medium">
                  {tier.range}
                </Typography>
                <Typography className="text-orange-600 font-bold text-xl">
                  ₦{tier.price}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Variations Section */}
        <div className="border-t pt-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <Typography className="font-bold text-lg">Variations</Typography>
            <button className="text-base text-gray-700 hover:text-orange-600 underline font-medium">
              Edit selections
            </button>
          </div>

          {/* Color Selection */}
          <Typography className="text-base font-semibold text-gray-700 mb-5">
            color
          </Typography>
          <div className="overflow-x-auto mb-8">
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-all flex-shrink-0 ${
                    selectedColor === color.id
                      ? "border-orange-500 ring-2 ring-orange-200"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={color.image}
                    alt={color.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between mb-3">
            <Typography className="font-semibold text-base text-gray-900">
              Seller's Shipping Method 1
            </Typography>
            <button className="text-base text-gray-700 hover:text-orange-600 underline flex items-center gap-1 font-medium">
              Change
              <span className="text-xl">&gt;</span>
            </button>
          </div>
          <Typography className="text-base text-gray-600">
            Shipping fee: <span className="font-semibold text-gray-900">₦62,328</span> for 50
            sets
          </Typography>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="contained"
            fullWidth
            onClick={handleStartOrder}
            sx={{
              backgroundColor: "#ea580c",
              "&:hover": {
                backgroundColor: "#c2410c",
              },
              textTransform: "none",
              fontSize: "1.0625rem",
              fontWeight: 600,
              py: 2,
              borderRadius: "8px",
            }}
          >
            Start order
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#d1d5db",
              color: "#374151",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "#f9fafb",
              },
              textTransform: "none",
              fontSize: "1.0625rem",
              fontWeight: 600,
              py: 2,
              borderRadius: "8px",
            }}
          >
            Add to cart
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#d1d5db",
              color: "#374151",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "#f9fafb",
              },
              textTransform: "none",
              fontSize: "1.0625rem",
              fontWeight: 600,
              py: 2,
              borderRadius: "8px",
            }}
          >
            Chat now
          </Button>
        </div>
      </div>

      {/* Minimum Order Slider */}
      <UseMinimumOrder
        open={sliderOpen}
        onClose={handleCloseSlider}
        productData={productData}
        pricingTiers={pricingTiers}
      />
    </div>
  );
}

export default MinimumOrderDialogue;
