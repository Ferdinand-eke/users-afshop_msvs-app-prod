import { useState, useEffect, useCallback } from "react";
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
import {
  useAddToCart,
  useMyCart,
  useUpdateCartItemQty,
} from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { useAppSelector } from "app/store/hooks";
import {
  calculateCartTotalAmount,
  formatCurrency,
} from "src/app/main/vendors-shop/PosUtils";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useNavigate } from "react-router";

/**
 * UseMinimumOrder Slider Component
 * Completely redesigned with compelling, engaging, and professional UI
 * Modal slider for selecting product variations and quantities for bulk orders
 */

function UseMinimumOrder({ open, onClose, productData, pricingTiers }) {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const { data: userCartData } = useMyCart(user?.id);
  const allCartItems = userCartData?.data?.cartSession?.cartProducts || [];

  const [priceDetailsOpen, setPriceDetailsOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  // Persist slider state in localStorage
  useEffect(() => {
    if (open) {
      localStorage.setItem("minimumOrderSliderOpen", "true");
      localStorage.setItem(
        "minimumOrderProductId",
        productData?.id || productData?._id || ""
      );
    }
  }, [open, productData, selectedTier?.id || selectedTier?._id]);

  const handleClose = (event, reason) => {
    // Prevent closing when clicking outside (backdrop click) or pressing escape
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    localStorage.setItem("minimumOrderSliderOpen", "false");
    onClose();
  };

  // Explicit close handler for the close button (bypasses backdrop/escape prevention)
  const handleCloseButtonClick = () => {
    localStorage.setItem("minimumOrderSliderOpen", "false");
    onClose();
  };

  const { mutate: updateCartQty } = useUpdateCartItemQty();

  const increaseCart = (itemId) => {
    const formData = {
      flag: "increase",
      cartItemId: itemId,
    };
    return updateCartQty(formData);
  };

  const decreaseCart = (itemId) => {
    const formData = {
      flag: "decrease",
      cartItemId: itemId,
    };
    return updateCartQty(formData);
  };

  const removeItemInCart = (itemId) => {
    const formData = {
      flag: "delete",
      cartItemId: itemId,
    };
    return updateCartQty(formData);
  };

  // Handle tier selection
  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    setSelectedQuantity(tier.minQuantity); // Set initial quantity to minimum
  };

  // Handle quantity change for selected tier
  const handleSelectedQuantityChange = (delta) => {
    if (!selectedTier) return;
    const newQuantity = selectedQuantity + delta;
    // Ensure quantity stays within tier's min and max
    if (
      newQuantity >= selectedTier.minQuantity &&
      newQuantity <= selectedTier.maxQuantity
    ) {
      setSelectedQuantity(newQuantity);
    }
  };

  // Handle direct quantity input
  const handleQuantityInputChange = (value) => {
    if (!selectedTier) return;
    const numValue = parseInt(value) || selectedTier.minQuantity;
    // Clamp between min and max
    const clampedValue = Math.max(
      selectedTier.minQuantity,
      Math.min(selectedTier.maxQuantity, numValue)
    );
    setSelectedQuantity(clampedValue);
  };

  const { mutate: addToart, isLoading: addToCartLoading } = useAddToCart();

  const onAddToUserCart = useCallback(() => {
    if (!user?.email) {
      navigate("/sign-in");
      return;
    }

    // Validate that a tier is selected
    if (!selectedTier) {
      alert("Please select a pricing tier before adding to cart");
      return;
    }

    // Validate that quantity is set
    if (!selectedQuantity || selectedQuantity <= 0) {
      alert("Please select a valid quantity");
      return;
    }

    // Get the tier ID
    const tierId = selectedTier?.id || selectedTier?._id;

    // Validate that tier ID exists
    if (!tierId) {
      console.error("Selected tier is missing ID:", selectedTier);
      alert("Invalid price tier selected. Please try again.");
      return;
    }

    console.log("Selected Tier and Quantity", selectedTier, selectedQuantity);
    console.log("Tier ID extracted:", tierId);

    const formData = {
      user: user?.id,
      quantity: parseInt(selectedQuantity),
      product: productData?.id,
      seller: productData?.shop,
      shopID: productData?.shop,
      shopCountryOrigin: productData?.productCountry,
      shopStateProvinceOrigin: productData?.productState,
      shopLgaProvinceOrigin: productData?.productLga,
      shopMarketId: productData?.market,
      isBulkOrder: true,
      bulkPriceTierId: tierId,
    };

    console.log("Adding bulk order to cart", formData);

    // return

    if (userCartData?.data?.cartSession?.cartProducts?.length === 0) {
      if (userCartData?.data?.cartSession?.lgaId) {
        addToart(formData);
        // getCartWhenAuth()
        return;
      }
    } else {
      // const payloadData = getShoppingSession()

      if (
        userCartData?.data?.cartSession?.lgaId === productData?.productLga ||
        !userCartData?.data?.cartSession?.lgaId
      ) {
        addToart(formData);
        // getCartWhenAuth()
        return;
      } else {
        alert("You must shop in one L.G.A/County at a time");
        return;
      }
    }
  }, [
    productData?.id,
    productData?.shop,
    productData?.productCountry,
    productData?.productState,
    productData?.productLga,
    productData?.market,
    user,
    user?.id,
    user?.email,
    selectedTier,
    selectedQuantity,
    userCartData?.data?.cartSession?.cartProducts,
    userCartData?.data?.cartSession?.cartProducts?.length,
    userCartData?.data?.cartSession?.lgaId,
    addToart,
    navigate,
  ]);

  let checkItemsArrayForTotal = [];
  allCartItems?.forEach((element) => {
    // Check if item is bulk order and use appropriate price
    let itemPrice = element?.product?.price;

    if (element?.isBulkOrder && element?.bulkPriceTierId) {
      // Find the matching price tier from product's priceTiers array
      const matchingTier = element?.product?.priceTiers?.find(
        (tier) => (tier?.id || tier?._id) === element?.bulkPriceTierId
      );

      if (matchingTier) {
        itemPrice = matchingTier?.price;
      }
    }

    checkItemsArrayForTotal?.push({
      quantity: element?.quantity,
      price: itemPrice,
    });
  });

  const totalAmount = calculateCartTotalAmount(checkItemsArrayForTotal);
  const shippingTotal = 0; // Placeholder delivery cost
  const vat = 0; // Placeholder VAT
  const grandTotal =
    parseInt(totalAmount) + parseInt(shippingTotal) + parseInt(vat);

  // Calculate item subtotal
  // const calculateItemSubtotal = () => {
  //   return cartItems.reduce((total, item) => {
  //     const price = parseFloat(item.price.replace(/,/g, ""));
  //     return total + price * item.quantity;
  //   }, 0);
  // };

  // Calculate total variations and items
  // tier.minQuantity
  const getTotalVariationsAndItems = () => {
    const totalVariations = allCartItems.length;
    const totalItems = allCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return { totalVariations, totalItems };
  };

  // Placeholder shipping cost

  // Calculate grand total
  // const calculateGrandTotal = () => {
  //   return calculateItemSubtotal() + shippingTotal;
  // };

  // const calculatePerSetPrice = () => {
  //   const { totalItems } = getTotalVariationsAndItems();
  //   if (totalItems === 0) return 0;
  //   return calculateGrandTotal() / totalItems;
  // };

  // Determine which tier applies
  const getCurrentTier = () => {
    const { totalItems } = getTotalVariationsAndItems();
    return pricingTiers?.find((tier) => {
      const range = `${tier.minQuantity} - ${tier.maxQuantity}`;
      if (range.includes("-")) {
        const [min, max] = range.split("-").map((n) => parseInt(n));
        // const min = tier.maxQuantity
        // const max = tier.maxQuantity
        return totalItems >= min && totalItems <= max;
      } else {
        const min = parseInt(tier.minQuantity);
        return totalItems >= min;
      }
    });
  };

  const currentTier = getCurrentTier();
  // console.log("current TIER", currentTier)
  // const { totalItems } = getTotalVariationsAndItems();

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
          className="flex items-center justify-between sticky top-0 z-10"
          style={{
            background: "linear-gradient(to right, #ea580c, #dc2626)",
            padding: "20px 24px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="flex items-center gap-3">
            <ShoppingCart sx={{ color: "white", fontSize: "1.75rem" }} />
            <div>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Bulk Order Selection
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 237, 213, 1)",
                }}
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
            <div className="space-y-4">
              {pricingTiers?.map((tier, index) => {
                const isCurrent = currentTier?.id === tier.id;
                const isSelected = selectedTier?.id === tier.id;
                const savingsPercent = Math.round(
                  ((productData?.price - tier.price) / productData?.price) * 100
                );

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`rounded-xl border-2 overflow-hidden transition-all ${
                      isSelected
                        ? "border-orange-600 shadow-xl"
                        : isCurrent
                          ? "border-orange-400 shadow-lg"
                          : "border-gray-200 hover:border-orange-300"
                    }`}
                    style={{
                      background: isSelected
                        ? "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
                        : isCurrent
                          ? "linear-gradient(135deg, #fef3f2 0%, #fee2e2 100%)"
                          : "white",
                    }}
                  >
                    {/* Tier Header */}
                    <div
                      className="p-5 cursor-pointer"
                      onClick={() => handleTierSelect(tier)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {isCurrent && (
                            <Chip
                              label="ACTIVE"
                              size="small"
                              sx={{
                                backgroundColor: "#10b981",
                                color: "white",
                                fontWeight: 800,
                                fontSize: "1rem",
                                height: "22px",
                              }}
                            />
                          )}
                          {isSelected && (
                            <Chip
                              label="SELECTED"
                              size="small"
                              sx={{
                                backgroundColor: "#ea580c",
                                color: "white",
                                fontWeight: 800,
                                fontSize: "1rem",
                                height: "22px",
                              }}
                            />
                          )}
                        </div>
                        <Chip
                          label={`Save ${savingsPercent}%`}
                          size="small"
                          sx={{
                            backgroundColor:
                              isSelected || isCurrent ? "#10b981" : "#f3f4f6",
                            color:
                              isSelected || isCurrent ? "white" : "#065f46",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Typography
                            sx={{
                              fontSize: "0.975rem",
                              color:
                                isSelected || isCurrent ? "#c2410c" : "#6b7280",
                              fontWeight: 600,
                              marginBottom: "4px",
                            }}
                          >
                            {`${tier.minQuantity} - ${tier.maxQuantity}`}{" "}
                            {productData?.unitweight?.unitname}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "1.75rem",
                              fontWeight: 900,
                              color:
                                isSelected || isCurrent ? "#ea580c" : "#111827",
                            }}
                          >
                            ₦{formatCurrency(tier.price)}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#6b7280",
                              fontSize: "0.95rem",
                            }}
                          >
                            per {productData?.unitweight?.unitname}
                          </Typography>
                        </div>

                        {!isSelected && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTierSelect(tier);
                            }}
                            sx={{
                              borderColor: "#ea580c",
                              color: "#ea580c",
                              fontWeight: 700,
                              fontSize: "1rem",
                              textTransform: "none",
                              "&:hover": {
                                borderColor: "#c2410c",
                                backgroundColor: "#fff7ed",
                              },
                            }}
                          >
                            Select
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls - Show when selected */}
                    <Collapse in={isSelected}>
                      <Divider />
                      <div className="p-5 bg-white">
                        <Typography
                          sx={{
                            fontSize: "0.975rem",
                            fontWeight: 700,
                            color: "#111827",
                            marginBottom: "12px",
                          }}
                        >
                          Select Quantity
                        </Typography>

                        <div className="flex items-center gap-3 mb-4">
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <IconButton
                              onClick={() => handleSelectedQuantityChange(-1)}
                              disabled={selectedQuantity <= tier.minQuantity}
                              sx={{
                                backgroundColor: "#f3f4f6",
                                "&:hover": {
                                  backgroundColor: "#fee2e2",
                                  color: "#dc2626",
                                },
                                "&:disabled": {
                                  backgroundColor: "#f9fafb",
                                  opacity: 0.5,
                                },
                              }}
                            >
                              <Remove />
                            </IconButton>
                          </motion.div>

                          <TextField
                            value={selectedQuantity}
                            onChange={(e) =>
                              handleQuantityInputChange(e.target.value)
                            }
                            size="small"
                            sx={{
                              flex: 1,
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "#f9fafb",
                                fontWeight: 900,
                                fontSize: "1.25rem",
                                "& input": {
                                  textAlign: "center",
                                  color: "#111827",
                                },
                              },
                            }}
                          />

                          <motion.div whileTap={{ scale: 0.9 }}>
                            <IconButton
                              onClick={() => handleSelectedQuantityChange(1)}
                              disabled={selectedQuantity >= tier.maxQuantity}
                              sx={{
                                backgroundColor: "#f3f4f6",
                                "&:hover": {
                                  backgroundColor: "#dcfce7",
                                  color: "#16a34a",
                                },
                                "&:disabled": {
                                  backgroundColor: "#f9fafb",
                                  opacity: 0.5,
                                },
                              }}
                            >
                              <Add />
                            </IconButton>
                          </motion.div>
                        </div>

                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            textAlign: "center",
                            color: "#6b7280",
                            marginBottom: "16px",
                          }}
                        >
                          Min: {tier.minQuantity} • Max: {tier.maxQuantity}
                        </Typography>

                        {/* Subtotal Display */}
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 mb-3">
                          <div className="flex items-center justify-between">
                            <Typography
                              sx={{
                                fontSize: "0.975rem",
                                fontWeight: 600,
                                color: "#6b7280",
                              }}
                            >
                              Subtotal:
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "1.25rem",
                                fontWeight: 900,
                                color: "#ea580c",
                              }}
                            >
                              ₦
                              {formatCurrency(
                                tier.price * selectedQuantity
                              ).toLocaleString()}
                            </Typography>
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<ShoppingCart />}
                            onClick={onAddToUserCart}
                            disabled={addToCartLoading}
                            sx={{
                              background:
                                "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #c2410c 0%, #b91c1c 100%)",
                              },
                              textTransform: "none",
                              fontSize: "1.15rem",
                              fontWeight: 700,
                              py: 1.5,
                              borderRadius: "8px",
                              boxShadow: "0 4px 15px rgba(234, 88, 12, 0.3)",
                            }}
                          >
                            Add {selectedQuantity}{" "}
                            {productData?.unitweight?.unitname} to Cart
                          </Button>
                        </motion.div>
                      </div>
                    </Collapse>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

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
                Selected Items
              </Typography>
              <Chip
                label={`${allCartItems.length} item(s)`}
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
                {allCartItems.map((item, index) => (
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
                        <div className="w-20 h-20 rounded-xl border-3 border-gray-300 overflow-hidden flex-shrink-0 shadow-md">
                          <img
                            src={item?.product?.imageLinks[0]?.url}
                            alt={item?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: "#111827",
                              }}
                            >
                              {item?.product?.name}
                            </Typography>
                            {item?.isBulkOrder && (
                              <Chip
                                icon={<LocalOffer />}
                                label="Bulk Order"
                                size="small"
                                sx={{
                                  backgroundColor: "#ea580c",
                                  color: "white",
                                  fontWeight: 700,
                                  fontSize: "0.7rem",
                                  height: "20px",
                                  "& .MuiChip-icon": {
                                    color: "white",
                                    fontSize: "0.9rem",
                                  },
                                }}
                              />
                            )}
                          </div>
                          <Typography
                            sx={{
                              fontSize: "1.125rem",
                              fontWeight: 900,
                              color: "#ea580c",
                            }}
                          >
                            ₦{" "}
                            {(() => {
                              let itemPrice = item?.product?.price;
                              if (item?.isBulkOrder && item?.bulkPriceTierId) {
                                // Find the matching price tier from product's priceTiers array
                                const matchingTier =
                                  item?.product?.priceTiers?.find(
                                    (tier) =>
                                      (tier?.id || tier?._id) ===
                                      item?.bulkPriceTierId
                                  );

                                if (matchingTier) {
                                  itemPrice = matchingTier?.price;
                                }
                              }
                              return formatCurrency(itemPrice).toLocaleString();
                            })()}
                          </Typography>

                          <Typography
                            variant="caption"
                            className="text-gray-500"
                          >
                            Subtotal: ₦
                            {(() => {
                              let itemPrice = item?.product?.price;
                              if (item?.isBulkOrder && item?.bulkPriceTierId) {
                                // Find the matching price tier from product's priceTiers array
                                const matchingTier =
                                  item?.product?.priceTiers?.find(
                                    (tier) =>
                                      (tier?.id || tier?._id) ===
                                      item?.bulkPriceTierId
                                  );

                                if (matchingTier) {
                                  itemPrice = matchingTier?.price;
                                }
                              }
                              return formatCurrency(
                                itemPrice * item?.quantity
                              ).toLocaleString();
                            })()}
                            {/* {(
                              parseInt(item?.product?.price) *
                              item?.quantity
                            ).toLocaleString()} */}
                          </Typography>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 items-end">
                        <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-300 rounded-xl">
                          <motion.div
                            whileTap={{ scale: item?.isBulkOrder ? 1 : 0.9 }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => decreaseCart(item?.id)}
                              disabled={item?.isBulkOrder}
                              sx={{
                                backgroundColor: "white",
                                "&:hover": {
                                  backgroundColor: item?.isBulkOrder
                                    ? "white"
                                    : "#fee2e2",
                                  color: item?.isBulkOrder
                                    ? "inherit"
                                    : "#dc2626",
                                },
                                padding: "8px",
                                opacity: item?.isBulkOrder ? 0.5 : 1,
                                cursor: item?.isBulkOrder
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                          </motion.div>
                          <Typography
                            sx={{
                              width: "80px",
                              textAlign: "center",
                              padding: "8px",
                              fontSize: "1rem",
                              fontWeight: 800,
                              color: "#111827",
                            }}
                          >
                            {item?.quantity}
                          </Typography>
                          <motion.div
                            whileTap={{ scale: item?.isBulkOrder ? 1 : 0.9 }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => increaseCart(item?.id)}
                              disabled={item?.isBulkOrder}
                              sx={{
                                backgroundColor: "white",
                                "&:hover": {
                                  backgroundColor: item?.isBulkOrder
                                    ? "white"
                                    : "#dcfce7",
                                  color: item?.isBulkOrder
                                    ? "inherit"
                                    : "#16a34a",
                                },
                                padding: "8px",
                                opacity: item?.isBulkOrder ? 0.5 : 1,
                                cursor: item?.isBulkOrder
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </motion.div>
                        </div>
                        {allCartItems?.length > 1 && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => removeItemInCart(item?.id)}
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

                    {/* Bulk Order Info Message */}
                    {item?.isBulkOrder && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-2.5 rounded-lg"
                        style={{
                          backgroundColor: "rgba(234, 88, 12, 0.1)",
                          border: "1px solid rgba(234, 88, 12, 0.3)",
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <LocalOffer
                            sx={{
                              fontSize: "1rem",
                              color: "#ea580c",
                              marginTop: "2px",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#c2410c",
                              fontWeight: 600,
                              fontSize: "0.8rem",
                              lineHeight: 1.4,
                            }}
                          >
                            This is a bulk order with fixed quantity. To modify,
                            remove this item and select a different price tier
                            from the product page.
                          </Typography>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Shipping Section - Enhanced */}
          {/* <motion.div
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
          </motion.div> */}
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
                      {allCartItems?.length} items
                    </Typography>
                  </div>
                  <Typography
                    sx={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    {/* ₦
                    {totalAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} */}
                    ₦{formatCurrency(totalAmount)}
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

                {/* Tax Total */}
                <div className="flex items-center justify-between">
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "#6b7280",
                      fontWeight: 600,
                    }}
                  >
                    Tax total
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    ₦{vat?.toLocaleString()}
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
                  ₦{formatCurrency(grandTotal)}
                </Typography>
              </div>
            </div>
          </div>

          {/* Start Order Button - Enhanced */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="contained"
              component={NavLinkAdapter}
              to={`/marketplace/review-cart`}
              fullWidth
              startIcon={<ShoppingCart />}
              sx={{
                background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #c2410c 0%, #b91c1c 100%)",
                },
                textTransform: "none",
                fontSize: "1.125rem",
                fontWeight: 700,
                py: 2.5,
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(234, 88, 12, 0.4)",
              }}
            >
              Complete Order • {allCartItems?.length} Items
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
