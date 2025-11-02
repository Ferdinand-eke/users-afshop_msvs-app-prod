import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
  Rating,
  useMediaQuery,
  useTheme,
  Chip,
  Zoom,
  Fade,
} from "@mui/material";
import {
  Close,
  NavigateBefore,
  NavigateNext,
  Send,
  ThumbUp,
  Reply,
  ZoomIn,
  Favorite,
  FavoriteBorder,
  Share,
  ShoppingCart,
  VerifiedUser,
  LocalOffer,
  Star,
  Image as ImageIcon,
  EmojiEmotions,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "app/store/hooks";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";

/**
 * ProductImageGalleryView Modal Component
 * Completely redesigned with compelling, engaging, and professional UI
 * Full-screen modal for viewing product images with integrated review/comment functionality
 */
function ProductImageGalleryView({ open, onClose, images = [], productData = {} }) {
  const user = useAppSelector(selectUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock reviews data - Replace with actual data from props or API
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      authorImage: "https://placehold.co/40x40",
      timeAgo: "2d",
      content: "Great product! Exactly as described and arrived in perfect condition.",
      rating: 5,
      likes: 3,
      isAuthor: false,
      replies: [
        {
          id: 1,
          author: "Vendor Response",
          authorImage: "https://placehold.co/40x40",
          timeAgo: "1d",
          content:
            "Thank you for your positive review! We're glad you're satisfied with your purchase.",
          isAuthor: true,
        },
      ],
    },
  ]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleSubmitComment = () => {
    if (comment.trim() || rating > 0) {
      const newReview = {
        id: reviews.length + 1,
        author: user?.displayName || "Current User",
        authorImage: user?.photoURL || "https://placehold.co/40x40",
        timeAgo: "Just now",
        content: comment,
        rating: rating,
        likes: 0,
        replies: [],
        isAuthor: false,
      };
      setReviews([newReview, ...reviews]);
      setComment("");
      setRating(0);
    }
  };

  // Calculate discount percentage
  const hasDiscount = productData?.listprice && productData?.listprice > productData?.price;
  const discountPercent = hasDiscount
    ? Math.round(((productData.listprice - productData.price) / productData.listprice) * 100)
    : 0;

  if (!open || images.length === 0) return null;

  return (
    <Dialog
      open={open}
      onClose={() => {}} // Prevent closing on backdrop click
      disableEscapeKeyDown // Prevent closing on ESC key
      maxWidth={false}
      fullScreen={isMobile}
      TransitionComponent={Zoom}
      transitionDuration={500}
      PaperProps={{
        sx: {
          width: isMobile ? "100vw" : isTablet ? "90vw" : "85vw",
          height: isMobile ? "100vh" : isTablet ? "85vh" : "90vh",
          maxWidth: isMobile ? "100vw" : isTablet ? "90vw" : "85vw",
          maxHeight: isMobile ? "100vh" : isTablet ? "85vh" : "90vh",
          margin: "auto",
          backgroundColor: "#0a0a0a",
          backgroundImage: "none",
          borderRadius: isMobile ? 0 : 3,
          overflow: "hidden",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          padding: 0,
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Close Button - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          style={{ position: "absolute", top: 16, right: 16, zIndex: 1300 }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              backgroundColor: "rgba(234, 88, 12, 0.95)",
              color: "white",
              "&:hover": {
                backgroundColor: "#dc2626",
                transform: "rotate(90deg)",
              },
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(234, 88, 12, 0.5)",
            }}
          >
            <Close />
          </IconButton>
        </motion.div>

        <div className={`flex ${isMobile ? "flex-col" : ""} h-full`}>
          {/* Left Side - Image Viewer */}
          <div
            className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col relative`}
            style={{
              background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
            }}
          >
            {/* Main Image Display */}
            <div
              className={`${isMobile ? "h-[40vh]" : "flex-1"} relative flex items-center justify-center ${isMobile ? "p-2" : "p-6"}`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  src={
                    images[currentImageIndex]?.url || images[currentImageIndex]
                  }
                  alt={`Product image ${currentImageIndex + 1}`}
                  className={`${isMobile ? "max-h-full" : "h-full"} w-full object-contain rounded-2xl cursor-pointer`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  style={{
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                  }}
                />
              </AnimatePresence>

              {/* Zoom Hint */}
              {!isZoomed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  <Chip
                    icon={<ZoomIn />}
                    label="Click image to zoom"
                    size="small"
                    sx={{
                      backgroundColor: "rgba(234, 88, 12, 0.9)",
                      color: "white",
                      fontWeight: 600,
                      backdropFilter: "blur(10px)",
                      "& .MuiChip-icon": {
                        color: "white",
                      },
                    }}
                  />
                </motion.div>
              )}

              {/* Navigation Arrows - Enhanced */}
              {images.length > 1 && (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      position: "absolute",
                      left: isMobile ? 8 : 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <IconButton
                      onClick={handlePrevImage}
                      sx={{
                        backgroundColor: "rgba(234, 88, 12, 0.95)",
                        color: "white",
                        width: isMobile ? 40 : 56,
                        height: isMobile ? 40 : 56,
                        "&:hover": {
                          backgroundColor: "#dc2626",
                        },
                        boxShadow: "0 4px 20px rgba(234, 88, 12, 0.4)",
                      }}
                    >
                      <NavigateBefore fontSize={isMobile ? "medium" : "large"} />
                    </IconButton>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      position: "absolute",
                      right: isMobile ? 8 : 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <IconButton
                      onClick={handleNextImage}
                      sx={{
                        backgroundColor: "rgba(234, 88, 12, 0.95)",
                        color: "white",
                        width: isMobile ? 40 : 56,
                        height: isMobile ? 40 : 56,
                        "&:hover": {
                          backgroundColor: "#dc2626",
                        },
                        boxShadow: "0 4px 20px rgba(234, 88, 12, 0.4)",
                      }}
                    >
                      <NavigateNext fontSize={isMobile ? "medium" : "large"} />
                    </IconButton>
                  </motion.div>
                </>
              )}

              {/* Image Counter - Enhanced */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`absolute top-4 left-4`}
              >
                <Chip
                  label={`${currentImageIndex + 1} / ${images.length}`}
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: isMobile ? "0.875rem" : "1rem",
                    backdropFilter: "blur(10px)",
                  }}
                />
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 right-4 flex gap-2"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    onClick={() => setIsFavorite(!isFavorite)}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: isFavorite ? "#ef4444" : "white",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        backgroundColor: "rgba(234, 88, 12, 0.9)",
                      },
                    }}
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        backgroundColor: "rgba(234, 88, 12, 0.9)",
                      },
                    }}
                  >
                    <Share />
                  </IconButton>
                </motion.div>
              </motion.div>
            </div>

            {/* Thumbnail Strip - Enhanced */}
            <div
              className={`${isMobile ? "p-3" : "p-4"} overflow-x-auto`}
              style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className={`flex ${isMobile ? "gap-2" : "gap-3"} justify-start ${isMobile ? "" : "justify-center"}`}
              >
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 rounded-xl overflow-hidden border-3 transition-all ${
                      index === currentImageIndex
                        ? "ring-4 ring-orange-500 shadow-lg"
                        : "ring-2 ring-gray-600 opacity-60 hover:opacity-100 hover:ring-orange-300"
                    }`}
                  >
                    <img
                      src={image?.url || image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`${isMobile ? "w-20 h-16" : "w-28 h-20"} object-cover`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Product Details & Reviews Panel */}
          <div
            className={`${isMobile ? "w-full" : "w-1/2"} bg-gradient-to-b from-white to-gray-50 flex flex-col ${isMobile ? "h-[60vh]" : ""}`}
          >
            {/* Product Header - Enhanced */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`${isMobile ? "p-4" : "p-6"} bg-white border-b-2 border-gray-200`}
            >
              {/* Discount Badge */}
              {hasDiscount && (
                <Chip
                  icon={<LocalOffer />}
                  label={`${discountPercent}% OFF`}
                  size="small"
                  sx={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontWeight: 800,
                    marginBottom: "12px",
                    "& .MuiChip-icon": {
                      color: "white",
                    },
                  }}
                />
              )}

              <Typography
                variant={isMobile ? "h6" : "h5"}
                className="font-bold text-gray-900 mb-2"
              >
                {productData?.name || "Product Details"}
              </Typography>

              <Typography
                variant={isMobile ? "body2" : "body1"}
                className="text-gray-600 mb-3"
              >
                {productData?.shortDescription || "Share your thoughts about this product"}
              </Typography>

              {/* Price Section */}
              <div className="flex items-baseline gap-3 mb-3">
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    fontWeight: 900,
                    background: "linear-gradient(to right, #ea580c, #dc2626)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ₦{formatCurrency(productData?.price)}
                </Typography>
                {productData?.listprice && (
                  <Typography
                    variant={isMobile ? "body1" : "h6"}
                    className="text-gray-500 line-through"
                  >
                    ₦{formatCurrency(productData?.listprice)}
                  </Typography>
                )}
              </div>

              {/* Rating */}
              {productData?.rating && (
                <div className="flex items-center gap-2 mb-3">
                  <Rating
                    value={productData.rating}
                    readOnly
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#f59e0b",
                      },
                    }}
                  />
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="text-gray-700 font-semibold"
                  >
                    {productData.rating}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    ({productData.reviewCount || 0} reviews)
                  </Typography>
                </div>
              )}

              {/* Quick Action Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
                    fontSize: isMobile ? "0.95rem" : "1.05rem",
                    fontWeight: 700,
                    py: 1.5,
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(234, 88, 12, 0.4)",
                  }}
                >
                  Add to Cart
                </Button>
              </motion.div>
            </motion.div>

            {user?.email && (
              <>
                {/* Add Comment Section - Enhanced */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`${isMobile ? "p-4" : "p-6"} border-b-2 border-gray-200 bg-gradient-to-r from-orange-50 to-red-50`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <VerifiedUser sx={{ color: "#ea580c", fontSize: "1.5rem" }} />
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      className="font-bold text-gray-900"
                    >
                      Write a Review
                    </Typography>
                  </div>

                  {/* Rating Input */}
                  <div className="mb-3">
                    <Typography
                      variant="body2"
                      className="text-gray-700 font-semibold mb-2"
                    >
                      Your Rating
                    </Typography>
                    <div className="flex items-center gap-3">
                      <Rating
                        value={rating}
                        onChange={(_, newValue) => setRating(newValue)}
                        size={isMobile ? "medium" : "large"}
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#f59e0b",
                          },
                          "& .MuiRating-iconHover": {
                            color: "#f59e0b",
                          },
                        }}
                      />
                      {rating > 0 && (
                        <Chip
                          label={`${rating} star${rating > 1 ? "s" : ""}`}
                          size="small"
                          sx={{
                            backgroundColor: "#ffedd5",
                            color: "#c2410c",
                            fontWeight: 700,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div className={`flex ${isMobile ? "gap-2" : "gap-3"}`}>
                    <Avatar
                      sx={{
                        width: isMobile ? 36 : 40,
                        height: isMobile ? 36 : 40,
                        fontSize: isMobile ? "1rem" : "1.25rem",
                        backgroundColor: "#ea580c",
                      }}
                    >
                      {user?.displayName?.[0] || "U"}
                    </Avatar>
                    <div className="flex-1">
                      <TextField
                        fullWidth
                        multiline
                        rows={isMobile ? 2 : 3}
                        placeholder="Share your experience with this product..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            fontSize: isMobile ? "0.875rem" : "1rem",
                            borderRadius: "12px",
                            "&:hover fieldset": {
                              borderColor: "#ea580c",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#ea580c",
                              borderWidth: "2px",
                            },
                          },
                        }}
                      />
                      <div
                        className={`flex items-center justify-between ${isMobile ? "mt-2" : "mt-3"}`}
                      >
                        {!isMobile && (
                          <div className="flex gap-2">
                            <IconButton
                              size="small"
                              sx={{
                                backgroundColor: "#f3f4f6",
                                "&:hover": { backgroundColor: "#e5e7eb" },
                              }}
                            >
                              <EmojiEmotions sx={{ color: "#f59e0b" }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{
                                backgroundColor: "#f3f4f6",
                                "&:hover": { backgroundColor: "#e5e7eb" },
                              }}
                            >
                              <ImageIcon sx={{ color: "#3b82f6" }} />
                            </IconButton>
                          </div>
                        )}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ marginLeft: isMobile ? "auto" : 0 }}
                        >
                          <Button
                            variant="contained"
                            size={isMobile ? "small" : "medium"}
                            endIcon={<Send />}
                            onClick={handleSubmitComment}
                            disabled={!comment.trim() && rating === 0}
                            sx={{
                              background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                              "&:hover": {
                                background: "linear-gradient(135deg, #c2410c 0%, #b91c1c 100%)",
                              },
                              textTransform: "none",
                              fontSize: isMobile ? "0.875rem" : "1rem",
                              fontWeight: 700,
                              borderRadius: "12px",
                              boxShadow: "0 4px 15px rgba(234, 88, 12, 0.3)",
                            }}
                          >
                            Post Review
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Reviews/Comments List - Enhanced */}
                <div
                  className={`flex-1 overflow-y-auto ${isMobile ? "p-4" : "p-6"}`}
                >
                  <div
                    className={`flex items-center justify-between ${isMobile ? "mb-3" : "mb-5"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Star sx={{ color: "#f59e0b", fontSize: "1.5rem" }} />
                      <Typography
                        variant={isMobile ? "subtitle1" : "h6"}
                        className="font-bold text-gray-900"
                      >
                        Reviews ({reviews.length})
                      </Typography>
                    </div>
                    <select
                      className={`${isMobile ? "text-xs" : "text-sm"} text-gray-700 border-2 border-gray-200 rounded-lg px-3 py-1 outline-none cursor-pointer hover:border-orange-300 focus:border-orange-500 font-semibold`}
                    >
                      <option>Most relevant</option>
                      <option>Newest first</option>
                      <option>Highest rated</option>
                    </select>
                  </div>

                  <div className={`${isMobile ? "space-y-3" : "space-y-5"}`}>
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
                      >
                        <div className={`flex ${isMobile ? "gap-2" : "gap-3"}`}>
                          <Avatar
                            src={review.authorImage}
                            alt={review.author}
                            sx={{
                              width: isMobile ? 40 : 48,
                              height: isMobile ? 40 : 48,
                              border: "3px solid #ffedd5",
                            }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Typography
                                variant={isMobile ? "body2" : "body1"}
                                className="font-bold text-gray-900"
                              >
                                {review.author}
                              </Typography>
                              <Typography
                                variant="caption"
                                className="text-gray-500"
                              >
                                • {review.timeAgo}
                              </Typography>
                              {review.isAuthor && (
                                <Chip
                                  icon={<VerifiedUser fontSize="small" />}
                                  label="Vendor"
                                  size="small"
                                  sx={{
                                    backgroundColor: "#ffedd5",
                                    color: "#c2410c",
                                    fontWeight: 700,
                                    fontSize: "0.7rem",
                                  }}
                                />
                              )}
                            </div>
                            {review.rating && (
                              <Rating
                                value={review.rating}
                                readOnly
                                size="small"
                                className="mb-2"
                                sx={{
                                  "& .MuiRating-iconFilled": {
                                    color: "#f59e0b",
                                  },
                                }}
                              />
                            )}
                            <Typography
                              variant={isMobile ? "body2" : "body1"}
                              className="text-gray-700 leading-relaxed"
                            >
                              {review.content}
                            </Typography>
                            <div
                              className={`flex items-center ${isMobile ? "gap-3 mt-2" : "gap-4 mt-3"}`}
                            >
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-1 text-gray-600 hover:text-orange-600 ${isMobile ? "text-xs" : "text-sm"} font-semibold`}
                              >
                                <ThumbUp
                                  fontSize="small"
                                  sx={{ fontSize: isMobile ? 14 : 16 }}
                                />
                                <span>
                                  {review.likes > 0 ? review.likes : "Like"}
                                </span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-1 text-gray-600 hover:text-orange-600 ${isMobile ? "text-xs" : "text-sm"} font-semibold`}
                              >
                                <Reply
                                  fontSize="small"
                                  sx={{ fontSize: isMobile ? 14 : 16 }}
                                />
                                <span>Reply</span>
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Nested Replies */}
                        {review.replies && review.replies.length > 0 && (
                          <div
                            className={`${isMobile ? "ml-8 space-y-2 mt-3" : "ml-12 space-y-3 mt-4"} border-l-2 border-orange-200 pl-4`}
                          >
                            {review.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className={`flex ${isMobile ? "gap-2" : "gap-3"} bg-orange-50 rounded-lg p-3`}
                              >
                                <Avatar
                                  src={reply.authorImage}
                                  alt={reply.author}
                                  sx={{
                                    width: isMobile ? 32 : 36,
                                    height: isMobile ? 32 : 36,
                                  }}
                                />
                                <div className="flex-1">
                                  <div
                                    className={`flex items-center ${isMobile ? "gap-1" : "gap-2"} mb-1`}
                                  >
                                    <Typography
                                      variant={isMobile ? "caption" : "body2"}
                                      className="font-bold text-gray-900"
                                    >
                                      {reply.author}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      className="text-gray-500"
                                    >
                                      • {reply.timeAgo}
                                    </Typography>
                                    {reply.isAuthor && (
                                      <span
                                        className={`${isMobile ? "text-[10px]" : "text-xs"} bg-orange-600 text-white px-2 py-0.5 rounded font-bold`}
                                      >
                                        Vendor
                                      </span>
                                    )}
                                  </div>
                                  <Typography
                                    variant={isMobile ? "caption" : "body2"}
                                    className="text-gray-700 leading-relaxed"
                                  >
                                    {reply.content}
                                  </Typography>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!user?.email && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`${isMobile ? "p-4" : "p-6"} text-center`}
              >
                <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                  <VerifiedUser sx={{ fontSize: "3rem", color: "#ea580c", mb: 2 }} />
                  <Typography variant="h6" className="font-bold text-gray-900 mb-2">
                    Sign in to leave a review
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Share your experience with other shoppers
                  </Typography>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductImageGalleryView;
