import { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Button,
  Chip,
  TextField,
  Collapse,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  Close,
  Add,
  Remove,
  ExpandMore,
  ExpandLess,
  LocalShipping,
  ShoppingCart,
  LocalOffer,
  CheckCircle,
  TrendingUp,
  Calculate,
  DeleteOutline,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

/**
 * UseMinimumOrder Slider Component
 * Completely redesigned with compelling, engaging, and professional UI
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
    {
      id: 3,
      color: "Purple",
      colorImage: "https://placehold.co/60x60/9333ea/white",
      price: "2,804.76",
      quantity: 20,
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

  const handleRemoveItem = (itemId) => {
    if (cartItems.length > 1) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
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

  // Determine which tier applies
  const getCurrentTier = () => {
    const { totalItems } = getTotalVariationsAndItems();
    return pricingTiers?.find((tier) => {
      const range = tier.range.replace(/[≥\s]/g, "");
      if (range.includes("-")) {
        const [min, max] = range.split("-").map((n) => parseInt(n));
        return totalItems >= min && totalItems <= max;
      } else {
        const min = parseInt(range);
        return totalItems >= min;
      }
    });
  };

  const currentTier = getCurrentTier();
  const { totalItems } = getTotalVariationsAndItems();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 650 },
          maxWidth: "100%",
          backgroundImage: "linear-gradient(180deg, #fafaf9 0%, #f3f4f6 100%)",
        },
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header - Enhanced */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-5 flex items-center justify-between shadow-lg sticky top-0 z-10"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart sx={{ color: "white", fontSize: "1.75rem" }} />
            <div>
              <Typography
                variant="h6"
                className="font-bold text-white"
                sx={{ fontSize: "1.25rem" }}
              >
                Bulk Order Selection
              </Typography>
              <Typography
                variant="caption"
                className="text-orange-100"
                sx={{ fontSize: "0.875rem" }}
              >
                Select variations and quantity
              </Typography>
            </div>
          </div>
          <IconButton
            onClick={handleClose}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                transform: "rotate(90deg)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Close />
          </IconButton>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Current Tier Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <Chip
                icon={<LocalOffer />}
                label="Lower priced than similar"
                sx={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  padding: "22px 12px",
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                }}
              />
              {currentTier && (
                <Chip
                  icon={<TrendingUp />}
                  label={`Current: ${currentTier.range} ${currentTier.unit} • ₦${currentTier.price}`}
                  sx={{
                    backgroundColor: "#10b981",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    padding: "22px 12px",
                    "& .MuiChip-icon": {
                      color: "white",
                    },
                    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Pricing Tiers - Enhanced */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calculate sx={{ color: "#ea580c", fontSize: "1.5rem" }} />
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                Bulk Pricing Tiers
              </Typography>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {pricingTiers?.map((tier, index) => {
                const isCurrent = currentTier?.id === tier.id;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`text-center py-4 px-5 rounded-xl border-2 flex-shrink-0 min-w-[160px] transition-all ${
                      isCurrent
                        ? "bg-gradient-to-br from-orange-50 to-red-50 border-orange-500 shadow-lg"
                        : "bg-white border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {isCurrent && (
                      <Chip
                        label="ACTIVE"
                        size="small"
                        sx={{
                          backgroundColor: "#10b981",
                          color: "white",
                          fontWeight: 800,
                          fontSize: "0.65rem",
                          height: "20px",
                          marginBottom: "8px",
                        }}
                      />
                    )}
                    <Typography
                      className={`text-xs mb-2 leading-tight font-semibold ${
                        isCurrent ? "text-orange-700" : "text-gray-600"
                      }`}
                    >
                      {tier.range} {tier.unit}
                    </Typography>
                    <Typography
                      className={`font-black text-xl ${
                        isCurrent ? "text-orange-600" : "text-gray-900"
                      }`}
                    >
                      ₦{tier.price}
                    </Typography>
                    {tier.savings && (
                      <Chip
                        label={`Save ${tier.savings}`}
                        size="small"
                        sx={{
                          marginTop: "8px",
                          backgroundColor: isCurrent ? "#10b981" : "#f3f4f6",
                          color: isCurrent ? "white" : "#065f46",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Progress to Next Tier */}
          {totalItems < 10000 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp sx={{ color: "#3b82f6", fontSize: "1.5rem" }} />
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#1e40af",
                  }}
                >
                  Progress to Next Tier
                </Typography>
              </div>
              <Typography variant="body2" className="text-blue-700 mb-3">
                Add{" "}
                <span className="font-bold">
                  {currentTier?.id === 1
                    ? 1000 - totalItems
                    : currentTier?.id === 2
                    ? 10000 - totalItems
                    : 0}{" "}
                  more items
                </span>{" "}
                to unlock better pricing!
              </Typography>
              <LinearProgress
                variant="determinate"
                value={
                  currentTier?.id === 1
                    ? (totalItems / 1000) * 100
                    : currentTier?.id === 2
                    ? ((totalItems - 1000) / 9000) * 100
                    : 100
                }
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#dbeafe",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#3b82f6",
                    borderRadius: 4,
                  },
                }}
              />
            </motion.div>
          )}

          {/* Cart Items - Color Variations - Enhanced */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                Selected Variations
              </Typography>
              <Chip
                label={`${cartItems.length} colors`}
                size="small"
                sx={{
                  backgroundColor: "#ffedd5",
                  color: "#c2410c",
                  fontWeight: 700,
                }}
              />
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Color Swatch */}
                        <div className="w-20 h-20 rounded-xl border-3 border-gray-300 overflow-hidden flex-shrink-0 shadow-md">
                          <img
                            src={item.colorImage}
                            alt={item.color}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Color Name and Price */}
                        <div className="flex-1">
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              fontWeight: 700,
                              color: "#111827",
                              marginBottom: "4px",
                            }}
                          >
                            {item.color}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "1.125rem",
                              fontWeight: 900,
                              color: "#ea580c",
                            }}
                          >
                            ₦{item.price}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="text-gray-500"
                          >
                            Subtotal: ₦
                            {(
                              parseFloat(item.price.replace(/,/g, "")) *
                              item.quantity
                            ).toLocaleString()}
                          </Typography>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col gap-2 items-end">
                        <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-300 rounded-xl">
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              sx={{
                                backgroundColor: "white",
                                "&:hover": {
                                  backgroundColor: "#fee2e2",
                                  color: "#dc2626",
                                },
                                padding: "8px",
                              }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                          </motion.div>
                          <TextField
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityInput(item.id, e.target.value)
                            }
                            size="small"
                            sx={{
                              width: "80px",
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  border: "none",
                                },
                              },
                              "& input": {
                                textAlign: "center",
                                padding: "8px",
                                fontSize: "1rem",
                                fontWeight: 800,
                                color: "#111827",
                              },
                            }}
                          />
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              sx={{
                                backgroundColor: "white",
                                "&:hover": {
                                  backgroundColor: "#dcfce7",
                                  color: "#16a34a",
                                },
                                padding: "8px",
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </motion.div>
                        </div>
                        {cartItems.length > 1 && (
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveItem(item.id)}
                              sx={{
                                color: "#ef4444",
                                "&:hover": {
                                  backgroundColor: "#fee2e2",
                                },
                              }}
                            >
                              <DeleteOutline fontSize="small" />
                            </IconButton>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Shipping Section - Enhanced */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <LocalShipping sx={{ color: "#a855f7", fontSize: "1.75rem" }} />
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                Shipping Details
              </Typography>
            </div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  Seller's Shipping Method 1
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-700 mb-2"
                >
                  Shipping fee:{" "}
                  <span className="font-bold text-purple-700">
                    ₦{shippingTotal.toLocaleString()}
                  </span>{" "}
                  for {getTotalVariationsAndItems().totalItems} sets
                </Typography>
                <div className="flex items-center gap-2">
                  <CheckCircle sx={{ color: "#10b981", fontSize: "1.125rem" }} />
                  <Typography variant="body2" className="text-gray-600">
                    Estimated delivery: 03 Nov - 13 Nov
                  </Typography>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-purple-700 hover:text-purple-800 font-bold underline"
              >
                Change →
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Footer - Sticky - Enhanced */}
        <div className="bg-white border-t-2 border-gray-200 shadow-2xl px-6 py-6">
          {/* Collapsible Price Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-5"
          >
            <motion.div
              className="flex items-center justify-between cursor-pointer py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setPriceDetailsOpen(!priceDetailsOpen)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-2">
                <Calculate sx={{ color: "#ea580c", fontSize: "1.5rem" }} />
                <Typography
                  sx={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  Price Breakdown
                </Typography>
              </div>
              <IconButton size="small">
                {priceDetailsOpen ? (
                  <ExpandLess sx={{ color: "#ea580c" }} />
                ) : (
                  <ExpandMore sx={{ color: "#ea580c" }} />
                )}
              </IconButton>
            </motion.div>

            <Collapse in={priceDetailsOpen}>
              <div className="space-y-4 py-4 px-2">
                {/* Item Subtotal */}
                <div className="flex items-start justify-between">
                  <div>
                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "#6b7280",
                        fontWeight: 600,
                      }}
                    >
                      Item subtotal
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      ({getTotalVariationsAndItems().totalVariations} variation{" "}
                      {getTotalVariationsAndItems().totalItems} items)
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    ₦
                    {calculateItemSubtotal().toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </div>

                <Divider />

                {/* Shipping Total */}
                <div className="flex items-center justify-between">
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "#6b7280",
                      fontWeight: 600,
                    }}
                  >
                    Shipping total
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    ₦{shippingTotal.toLocaleString()}
                  </Typography>
                </div>
              </div>
            </Collapse>
          </motion.div>

          {/* Subtotal - Enhanced */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-5 mb-5 border-2 border-orange-200">
            <div className="flex items-center justify-between">
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                Grand Total
              </Typography>
              <div className="text-right">
                <Typography
                  sx={{
                    fontSize: "1.75rem",
                    fontWeight: 900,
                    background: "linear-gradient(to right, #ea580c, #dc2626)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ₦
                  {calculateGrandTotal().toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
                <Typography
                  variant="caption"
                  className="text-gray-600 font-semibold"
                >
                  (₦
                  {calculatePerSetPrice().toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  /set)
                </Typography>
              </div>
            </div>
          </div>

          {/* Start Order Button - Enhanced */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCart />}
              sx={{
                background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #c2410c 0%, #b91c1c 100%)",
                },
                textTransform: "none",
                fontSize: "1.125rem",
                fontWeight: 700,
                py: 2.5,
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(234, 88, 12, 0.4)",
              }}
            >
              Complete Order • {getTotalVariationsAndItems().totalItems} Items
            </Button>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 flex items-center justify-center gap-2 text-gray-600"
          >
            <CheckCircle sx={{ fontSize: "1.125rem", color: "#10b981" }} />
            <Typography variant="caption" className="font-semibold">
              Secure checkout • 100% satisfaction guaranteed
            </Typography>
          </motion.div>
        </div>
      </div>
    </Drawer>
  );
}

export default UseMinimumOrder;
