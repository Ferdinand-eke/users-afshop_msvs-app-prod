import { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Button,
  Chip,
  TextField,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

/**
 * UseMinimumOrder Slider Component
 * Modal slider for selecting product variations and quantities for bulk orders
 */
function UseMinimumOrder({ open, onClose, productData, pricingTiers }) {
  const [priceDetailsOpen, setPriceDetailsOpen] = useState(false);

  // Sample cart items with different variations
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      color: "Pink",
      colorImage: "https://placehold.co/60x60/ec4899/white",
      price: "2,804.76",
      quantity: 50,
      productId: productData?.id || productData?._id || "default-product-id",
    },
    {
      id: 2,
      color: "Blue",
      colorImage: "https://placehold.co/60x60/3b82f6/white",
      price: "2,804.76",
      quantity: 30,
      productId: productData?.id || productData?._id || "default-product-id",
    },
  ]);

  // Persist slider state in localStorage
  useEffect(() => {
    if (open) {
      localStorage.setItem("minimumOrderSliderOpen", "true");
      localStorage.setItem(
        "minimumOrderProductId",
        productData?.id || productData?._id || ""
      );
    }
  }, [open, productData]);

  // Restore state on mount
  useEffect(() => {
    const wasOpen = localStorage.getItem("minimumOrderSliderOpen") === "true";
    const savedProductId = localStorage.getItem("minimumOrderProductId");
    const currentProductId = productData?.id || productData?._id;

    // Only auto-open if it was open and for the same product
    if (wasOpen && savedProductId === currentProductId) {
      // Component is already controlled by parent open prop
    }
  }, [productData]);

  const handleClose = () => {
    localStorage.setItem("minimumOrderSliderOpen", "false");
    onClose();
  };

  const handleQuantityChange = (itemId, value) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + value) }
          : item
      )
    );
  };

  const handleQuantityInput = (itemId, inputValue) => {
    const value = parseInt(inputValue) || 1;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, value) } : item
      )
    );
  };

  // Calculate item subtotal
  const calculateItemSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/,/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  // Calculate total variations and items
  const getTotalVariationsAndItems = () => {
    const totalVariations = cartItems.length;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { totalVariations, totalItems };
  };

  // Placeholder shipping cost
  const shippingTotal = 62328;

  // Calculate grand total
  const calculateGrandTotal = () => {
    return calculateItemSubtotal() + shippingTotal;
  };

  const calculatePerSetPrice = () => {
    const { totalItems } = getTotalVariationsAndItems();
    if (totalItems === 0) return 0;
    return calculateGrandTotal() / totalItems;
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 600 },
          maxWidth: "100%",
        },
      }}
    >
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b shadow-sm sticky top-0 z-10">
          <Typography variant="h6" className="font-bold text-gray-900">
            Select variations and quantity
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Lower Priced Badge */}
          <Chip
            label="Lower priced than similar"
            size="medium"
            sx={{
              backgroundColor: "#ea580c",
              color: "white",
              fontWeight: 600,
              fontSize: "0.875rem",
              height: "32px",
              mb: 3,
            }}
          />

          {/* Pricing Tiers */}
          <div className="mb-6">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {pricingTiers?.map((tier, index) => (
                <div
                  key={index}
                  className="text-center py-3 px-4 bg-white rounded-lg border border-gray-200 flex-shrink-0 min-w-[140px] shadow-sm"
                >
                  <Typography className="text-gray-600 text-xs mb-2 leading-tight font-medium">
                    {tier.range}
                  </Typography>
                  <Typography className="text-orange-600 font-bold text-lg">
                    ₦{tier.price}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Items - Color Variations */}
          <div className="mb-6">
            <Typography className="text-base font-semibold text-gray-900 mb-4">
              color
            </Typography>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Color Swatch */}
                    <div className="w-16 h-16 rounded-lg border-2 border-gray-300 overflow-hidden flex-shrink-0">
                      <img
                        src={item.colorImage}
                        alt={item.color}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Color Name and Price */}
                    <div className="flex-1">
                      <Typography className="text-base font-medium text-gray-900 mb-1">
                        {item.color}
                      </Typography>
                      <Typography className="text-base font-bold text-gray-900">
                        ₦{item.price}
                      </Typography>
                    </div>
                  </div>

                  {/* Quantity Controls - Far Right */}
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg ml-4">
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      sx={{ padding: "8px" }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityInput(item.id, e.target.value)
                      }
                      size="small"
                      sx={{
                        width: "70px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            border: "none",
                          },
                        },
                        "& input": {
                          textAlign: "center",
                          padding: "8px",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                        },
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      sx={{ padding: "8px" }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Section */}
          <div className="mb-6 bg-white p-5 rounded-lg border border-gray-200">
            <Typography className="text-base font-bold text-gray-900 mb-3">
              Shipping
            </Typography>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <Typography className="text-base font-semibold text-gray-900 mb-1">
                  Seller's Shipping Method 1
                </Typography>
                <Typography className="text-sm text-gray-600 mb-1">
                  Shipping fee:{" "}
                  <span className="font-semibold text-gray-900">
                    ₦{shippingTotal.toLocaleString()}
                  </span>{" "}
                  for {getTotalVariationsAndItems().totalItems} sets
                </Typography>
                <Typography className="text-sm text-gray-500">
                  Estimated delivery by 03 Nov-13 Nov
                </Typography>
              </div>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium underline">
                Change &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Footer - Sticky */}
        <div className="bg-white border-t shadow-lg px-6 py-5">
          {/* Collapsible Price Details */}
          <div className="mb-4">
            <div
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => setPriceDetailsOpen(!priceDetailsOpen)}
            >
              <Typography className="text-base font-semibold text-gray-900">
                Price
              </Typography>
              <IconButton size="small">
                {priceDetailsOpen ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </IconButton>
            </div>

            <Collapse in={priceDetailsOpen}>
              <div className="space-y-3 py-3 border-t">
                {/* Item Subtotal */}
                <div className="flex items-start justify-between">
                  <div>
                    <Typography className="text-sm text-gray-700">
                      Item subtotal
                    </Typography>
                    <Typography className="text-xs text-gray-500">
                      ({getTotalVariationsAndItems().totalVariations} variation{" "}
                      {getTotalVariationsAndItems().totalItems} items)
                    </Typography>
                  </div>
                  <Typography className="text-base font-bold text-gray-900">
                    ₦{calculateItemSubtotal().toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </div>

                {/* Shipping Total */}
                <div className="flex items-center justify-between">
                  <Typography className="text-sm text-gray-700">
                    Shipping total
                  </Typography>
                  <Typography className="text-base font-bold text-gray-900">
                    ₦{shippingTotal.toLocaleString()}
                  </Typography>
                </div>
              </div>
            </Collapse>
          </div>

          {/* Subtotal */}
          <div className="flex items-center justify-between mb-4 pt-3 border-t">
            <Typography className="text-base font-semibold text-gray-900">
              Subtotal
            </Typography>
            <div className="text-right">
              <Typography className="text-xl font-bold text-gray-900">
                ₦{calculateGrandTotal().toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
              <Typography className="text-xs text-gray-500">
                (₦{calculatePerSetPrice().toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}/set)
              </Typography>
            </div>
          </div>

          {/* Start Order Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#ea580c",
              "&:hover": {
                backgroundColor: "#c2410c",
              },
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              py: 2,
              borderRadius: "8px",
            }}
          >
            Start order
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default UseMinimumOrder;
