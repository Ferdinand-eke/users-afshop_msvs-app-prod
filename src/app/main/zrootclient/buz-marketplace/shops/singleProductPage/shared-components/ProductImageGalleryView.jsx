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
} from "@mui/material";
import {
  Close,
  NavigateBefore,
  NavigateNext,
  Send,
  ThumbUp,
  Reply,
} from "@mui/icons-material";
import { useAppSelector } from "app/store/hooks";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";

/**
 * ProductImageGalleryView Modal Component
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

  if (!open || images.length === 0) return null;

  return (
    <Dialog
      open={open}
      onClose={() => {}} // Prevent closing on backdrop click
      disableEscapeKeyDown // Prevent closing on ESC key
      maxWidth={false}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          width: isMobile ? "100vw" : isTablet ? "90vw" : "85vw",
          height: isMobile ? "100vh" : isTablet ? "85vh" : "90vh",
          maxWidth: isMobile ? "100vw" : isTablet ? "90vw" : "85vw",
          maxHeight: isMobile ? "100vh" : isTablet ? "85vh" : "90vh",
          margin: "auto",
          backgroundColor: "#0a0a0a",
          backgroundImage: "none",
          borderRadius: isMobile ? 0 : 2,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
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
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1300,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          <Close />
        </IconButton>

        <div className={`flex ${isMobile ? "flex-col" : ""} h-full`}>
          {/* Left Side - Image Viewer */}
          <div
            className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col bg-black`}
          >
            {/* Main Image Display */}
            <div
              className={`${isMobile ? "h-[40vh]" : "flex-1"} relative flex items-center justify-center ${isMobile ? "p-2" : "p-4"}`}
            >
              <img
                src={
                  images[currentImageIndex]?.url || images[currentImageIndex]
                }
                alt={`Product image ${currentImageIndex + 1}`}
                className={`${isMobile ? "max-h-full" : "h-full"} w-full object-contain rounded-lg`}
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      position: "absolute",
                      left: isMobile ? 8 : 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      width: isMobile ? 36 : 40,
                      height: isMobile ? 36 : 40,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    }}
                  >
                    <NavigateBefore fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>

                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: "absolute",
                      right: isMobile ? 8 : 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      width: isMobile ? 36 : 40,
                      height: isMobile ? 36 : 40,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    }}
                  >
                    <NavigateNext fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                </>
              )}

              {/* Image Counter */}
              <div
                className={`absolute ${isMobile ? "bottom-2" : "bottom-4"} left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white ${isMobile ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm"} rounded-full`}
              >
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div
              className={`bg-gray-900 ${isMobile ? "p-2" : "p-4"} overflow-x-auto`}
            >
              <div
                className={`flex ${isMobile ? "gap-1" : "gap-2"} justify-start ${isMobile ? "" : "justify-center"}`}
              >
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 transition-all ${
                      index === currentImageIndex
                        ? "ring-2 ring-orange-500 opacity-100"
                        : "opacity-50 hover:opacity-75"
                    }`}
                  >
                    <img
                      src={image?.url || image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`${isMobile ? "w-16 h-12" : "w-24 h-16"} object-cover rounded`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Comments/Reviews Panel */}
          <div
            className={`${isMobile ? "w-full" : "w-1/2"} bg-white flex flex-col ${isMobile ? "h-[60vh]" : ""}`}
          >
            {user?.email && (
              <>
                {/* Product Header */}
                <div className={`${isMobile ? "p-3" : "p-6"} border-b`}>
                  <div className="mb-2">
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      className="font-bold text-gray-900"
                    >
                      {productData?.name || "Product Details"}
                    </Typography>
                  </div>
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    className="text-gray-600 mb-2"
                  >
                    {productData?.shortDescription ||
                      "Share your thoughts about this product"}
                  </Typography>
                  <div className="flex items-center gap-3 mb-2">
                    <Typography
                      variant={isMobile ? "body2" : "body1"}
                      className="font-bold text-orange-600"
                    >
                      ₦ {formatCurrency(productData?.price)}
                    </Typography>
                    {productData?.listprice && (
                      <Typography
                        variant={isMobile ? "caption" : "body2"}
                        className="text-gray-500 line-through"
                      >
                        ₦ {formatCurrency(productData?.listprice)}
                      </Typography>
                    )}
                  </div>
                  {productData?.rating && (
                    <div className="flex items-center gap-2">
                      <Rating
                        value={productData.rating}
                        readOnly
                        size="small"
                      />
                      <Typography
                        variant={isMobile ? "caption" : "body2"}
                        className="text-gray-600"
                      >
                        {productData.rating} ({productData.reviewCount || 0}{" "}
                        reviews)
                      </Typography>
                    </div>
                  )}
                </div>

                {/* Add Comment Section */}
                <div
                  className={`${isMobile ? "p-3" : "p-6"} border-b bg-gray-50`}
                >
                  <Typography
                    variant={isMobile ? "caption" : "subtitle2"}
                    className="font-semibold mb-2"
                  >
                    Add a Review
                  </Typography>
                  <div className={`${isMobile ? "mb-2" : "mb-3"}`}>
                    <Typography
                      variant={isMobile ? "caption" : "body2"}
                      className="text-gray-700 mb-1"
                    >
                      Your Rating
                    </Typography>
                    <Rating
                      value={rating}
                      onChange={(_, newValue) => setRating(newValue)}
                      size={isMobile ? "small" : "large"}
                    />
                  </div>
                  <div className={`flex ${isMobile ? "gap-1" : "gap-2"}`}>
                    <Avatar
                      sx={{
                        width: isMobile ? 28 : 32,
                        height: isMobile ? 28 : 32,
                        fontSize: isMobile ? "0.875rem" : "1rem",
                      }}
                    >
                      {user?.displayName?.[0] || "U"}
                    </Avatar>
                    <div className="flex-1">
                      <TextField
                        fullWidth
                        multiline
                        rows={isMobile ? 1 : 2}
                        placeholder="Share your experience with this product..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            fontSize: isMobile ? "0.875rem" : "1rem",
                          },
                        }}
                      />
                      <div
                        className={`flex items-center justify-between ${isMobile ? "mt-1" : "mt-2"}`}
                      >
                        {!isMobile && (
                          <div className="flex gap-2">
                            <IconButton size="small">😊</IconButton>
                            <IconButton size="small">📷</IconButton>
                          </div>
                        )}
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<Send fontSize="small" />}
                          onClick={handleSubmitComment}
                          disabled={!comment.trim() && rating === 0}
                          sx={{
                            backgroundColor: "#ea580c",
                            "&:hover": {
                              backgroundColor: "#c2410c",
                            },
                            textTransform: "none",
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                            marginLeft: isMobile ? "auto" : 0,
                          }}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reviews/Comments List */}
                <div
                  className={`flex-1 overflow-y-auto ${isMobile ? "p-3" : "p-6"}`}
                >
                  <div
                    className={`flex items-center justify-between ${isMobile ? "mb-2" : "mb-4"}`}
                  >
                    <Typography
                      variant={isMobile ? "caption" : "subtitle2"}
                      className="font-semibold"
                    >
                      Reviews ({reviews.length})
                    </Typography>
                    <select
                      className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600 border-none outline-none cursor-pointer`}
                    >
                      <option>Most relevant</option>
                      <option>Newest first</option>
                      <option>Highest rated</option>
                    </select>
                  </div>

                  <div className={`${isMobile ? "space-y-2" : "space-y-4"}`}>
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className={`${isMobile ? "space-y-1" : "space-y-2"}`}
                      >
                        <div className={`flex ${isMobile ? "gap-2" : "gap-3"}`}>
                          <Avatar
                            src={review.authorImage}
                            alt={review.author}
                            sx={{
                              width: isMobile ? 32 : 40,
                              height: isMobile ? 32 : 40,
                            }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Typography
                                variant={isMobile ? "caption" : "body2"}
                                className="font-semibold"
                              >
                                {review.author}
                              </Typography>
                              <Typography
                                variant="caption"
                                className="text-gray-500"
                                sx={{
                                  fontSize: isMobile ? "0.65rem" : "0.75rem",
                                }}
                              >
                                • {review.timeAgo}
                              </Typography>
                              {review.isAuthor && (
                                <span
                                  className={`${isMobile ? "text-[10px]" : "text-xs"} bg-orange-100 text-orange-600 px-2 py-0.5 rounded`}
                                >
                                  Vendor
                                </span>
                              )}
                            </div>
                            {review.rating && (
                              <Rating
                                value={review.rating}
                                readOnly
                                size="small"
                                className="mb-1"
                              />
                            )}
                            <Typography
                              variant={isMobile ? "caption" : "body2"}
                              className="text-gray-700"
                            >
                              {review.content}
                            </Typography>
                            <div
                              className={`flex items-center ${isMobile ? "gap-2 mt-1" : "gap-4 mt-2"}`}
                            >
                              <button
                                className={`flex items-center gap-1 text-gray-600 hover:text-orange-600 ${isMobile ? "text-xs" : "text-sm"}`}
                              >
                                <ThumbUp
                                  fontSize="small"
                                  sx={{ fontSize: isMobile ? 14 : 16 }}
                                />
                                <span>
                                  {review.likes > 0 ? review.likes : "Like"}
                                </span>
                              </button>
                              <button
                                className={`flex items-center gap-1 text-gray-600 hover:text-orange-600 ${isMobile ? "text-xs" : "text-sm"}`}
                              >
                                <Reply
                                  fontSize="small"
                                  sx={{ fontSize: isMobile ? 14 : 16 }}
                                />
                                <span>Reply</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Nested Replies */}
                        {review.replies && review.replies.length > 0 && (
                          <div
                            className={`${isMobile ? "ml-8 space-y-2 mt-2" : "ml-12 space-y-3 mt-3"}`}
                          >
                            {review.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className={`flex ${isMobile ? "gap-2" : "gap-3"}`}
                              >
                                <Avatar
                                  src={reply.authorImage}
                                  alt={reply.author}
                                  sx={{
                                    width: isMobile ? 28 : 32,
                                    height: isMobile ? 28 : 32,
                                  }}
                                />
                                <div className="flex-1">
                                  <div
                                    className={`flex items-center ${isMobile ? "gap-1" : "gap-2"} mb-1`}
                                  >
                                    <Typography
                                      variant={isMobile ? "caption" : "body2"}
                                      className="font-semibold"
                                      sx={{
                                        fontSize: isMobile
                                          ? "0.75rem"
                                          : "0.875rem",
                                      }}
                                    >
                                      {reply.author}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      className="text-gray-500"
                                      sx={{
                                        fontSize: isMobile
                                          ? "0.65rem"
                                          : "0.75rem",
                                      }}
                                    >
                                      • {reply.timeAgo}
                                    </Typography>
                                    {reply.isAuthor && (
                                      <span
                                        className={`${isMobile ? "text-[10px]" : "text-xs"} bg-orange-100 text-orange-600 px-2 py-0.5 rounded`}
                                      >
                                        Vendor
                                      </span>
                                    )}
                                  </div>
                                  <Typography
                                    variant={isMobile ? "caption" : "body2"}
                                    className="text-gray-700"
                                    sx={{
                                      fontSize: isMobile
                                        ? "0.75rem"
                                        : "0.875rem",
                                    }}
                                  >
                                    {reply.content}
                                  </Typography>
                                  <div
                                    className={`flex items-center ${isMobile ? "gap-2" : "gap-4"} mt-1`}
                                  >
                                    <button
                                      className={`text-gray-600 hover:text-orange-600 ${isMobile ? "text-[10px]" : "text-xs"}`}
                                    >
                                      Like
                                    </button>
                                    <button
                                      className={`text-gray-600 hover:text-orange-600 ${isMobile ? "text-[10px]" : "text-xs"}`}
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <Divider />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!user?.email && (
              <>
                <div className={`${isMobile ? "p-3" : "p-6"} border-b`}>
                  <div className="mb-2">
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      className="font-bold text-gray-900"
                    >
                      {productData?.name || "Product Details"}
                    </Typography>
                  </div>
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    className="text-gray-600 mb-2"
                  >
                    {productData?.shortDescription ||
                      "Share your thoughts about this product"}
                  </Typography>
                  <div className="flex items-center gap-3 mb-2">
                    <Typography
                      variant={isMobile ? "body2" : "body1"}
                      className="font-bold text-orange-600"
                    >
                      ₦ {formatCurrency(productData?.price)}
                    </Typography>
                    {productData?.listprice && (
                      <Typography
                        variant={isMobile ? "caption" : "body2"}
                        className="text-gray-500 line-through"
                      >
                        ₦ {formatCurrency(productData?.listprice)}
                      </Typography>
                    )}
                  </div>

                  <Typography variant="body2" className="text-orange-600 font-semibold">
                    Please sign in to leave a review.
                  </Typography>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductImageGalleryView;
