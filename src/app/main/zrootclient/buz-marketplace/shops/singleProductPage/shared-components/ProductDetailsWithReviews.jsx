import { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  Reply,
  Send,
  ThumbUp,
  Description,
  RateReview,
  EmojiEmotions,
  Image,
  VerifiedUser,
  Star,
} from "@mui/icons-material";
import { useAppSelector } from "app/store/hooks";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { motion } from "framer-motion";

/**
 * ProductDetailsWithReviews Component
 * Completely redesigned with engaging, professional UI
 * Displays product details and reviews in modern tabbed interface
 */
const ProductDetailsWithReviews = ({ productData }) => {
  const user = useAppSelector(selectUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [active, setActive] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Mock reviews data - Replace with actual data from props or API
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Authentiano Emmasan",
      authorImage: "https://placehold.co/40x40",
      timeAgo: "3d",
      content: "Great product! Highly recommended for the quality and price.",
      rating: 5,
      likes: 0,
      isAuthor: false,
      replies: [
        {
          id: 1,
          author: "Vendor Response",
          authorImage: "https://placehold.co/40x40",
          timeAgo: "2d",
          content: "Thank you for your positive feedback! We appreciate your business.",
          isAuthor: true,
        },
      ],
    },
  ]);

  // Calculate rating statistics
  const ratingStats = [
    { stars: 5, count: 45, percentage: 75 },
    { stars: 4, count: 10, percentage: 17 },
    { stars: 3, count: 3, percentage: 5 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 },
  ];


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

  return (
    <div className="p-0">
      {/* Tab Headers - Modern Design */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200">
        <div className="flex gap-2 p-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActive(1)}
            className={`flex-1 cursor-pointer rounded-xl p-4 transition-all duration-300 ${
              active === 1
                ? "bg-gradient-to-r from-orange-600 to-red-600 shadow-lg"
                : "bg-white hover:bg-gray-50 border-2 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <Description
                sx={{
                  fontSize: isMobile ? "1.5rem" : "1.75rem",
                  color: active === 1 ? "white" : "#ea580c",
                }}
              />
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                className={`font-bold ${
                  active === 1 ? "text-white" : "text-gray-900"
                }`}
              >
                Product Details
              </Typography>
            </div>
            {active === 1 && (
              <motion.div
                layoutId="activeTab"
                className="h-1 bg-white rounded-full mt-2"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActive(2)}
            className={`flex-1 cursor-pointer rounded-xl p-4 transition-all duration-300 ${
              active === 2
                ? "bg-gradient-to-r from-orange-600 to-red-600 shadow-lg"
                : "bg-white hover:bg-gray-50 border-2 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <RateReview
                sx={{
                  fontSize: isMobile ? "1.5rem" : "1.75rem",
                  color: active === 2 ? "white" : "#ea580c",
                }}
              />
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                className={`font-bold ${
                  active === 2 ? "text-white" : "text-gray-900"
                }`}
              >
                Reviews ({reviews.length})
              </Typography>
            </div>
            {active === 2 && (
              <motion.div
                layoutId="activeTab"
                className="h-1 bg-white rounded-full mt-2"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Product Details Tab */}
      {active === 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white"
        >
          <div className={`${isMobile ? "p-6" : "p-10"}`}>
            {/* Description Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Description sx={{ color: "#ea580c", fontSize: "1.75rem" }} />
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  className="font-bold text-gray-900"
                >
                  Product Description
                </Typography>
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-l-4 border-orange-600">
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  className="text-gray-700 leading-relaxed"
                  sx={{ fontSize: isMobile ? "0.95rem" : "1.125rem", lineHeight: 1.8 }}
                >
                  {productData?.description || "Product description not available."}
                </Typography>
              </div>
            </div>

            {/* Specifications Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <VerifiedUser sx={{ color: "#10b981", fontSize: "1.75rem" }} />
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  className="font-bold text-gray-900"
                >
                  Product Specifications
                </Typography>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productData?.category && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all duration-300"
                  >
                    <Typography
                      variant={isMobile ? "caption" : "body2"}
                      className="text-gray-500 font-semibold mb-1 uppercase tracking-wide"
                    >
                      Category
                    </Typography>
                    <Typography
                      variant={isMobile ? "body1" : "h6"}
                      className="text-gray-900 font-bold"
                    >
                      {productData?.category}
                    </Typography>
                  </motion.div>
                )}

                {productData?.unitweight?.unitname && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all duration-300"
                  >
                    <Typography
                      variant={isMobile ? "caption" : "body2"}
                      className="text-gray-500 font-semibold mb-1 uppercase tracking-wide"
                    >
                      Unit Weight
                    </Typography>
                    <Typography
                      variant={isMobile ? "body1" : "h6"}
                      className="text-gray-900 font-bold"
                    >
                      {productData?.unitweight?.unitname}
                    </Typography>
                  </motion.div>
                )}

                {productData?.quantity && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all duration-300"
                  >
                    <Typography
                      variant={isMobile ? "caption" : "body2"}
                      className="text-green-700 font-semibold mb-1 uppercase tracking-wide"
                    >
                      Available Stock
                    </Typography>
                    <Typography
                      variant={isMobile ? "body1" : "h6"}
                      className="text-green-900 font-black"
                    >
                      {productData?.quantity} {productData?.unitPerQuantity}
                    </Typography>
                  </motion.div>
                )}

                {productData?.shop && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-300"
                  >
                    <Typography
                      variant={isMobile ? "caption" : "body2"}
                      className="text-blue-700 font-semibold mb-1 uppercase tracking-wide"
                    >
                      Seller
                    </Typography>
                    <Typography
                      variant={isMobile ? "body1" : "h6"}
                      className="text-blue-900 font-bold"
                    >
                      {productData?.shop?.shopname || "Official Store"}
                    </Typography>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* Reviews Tab */}
      {active === 2 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white"
        >
          {/* Rating Overview Section */}
          <div className="p-8 bg-gradient-to-br from-orange-50 via-white to-orange-50 border-b-2 border-gray-200">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Overall Rating */}
              <div className="flex flex-col items-center md:items-start gap-3">
                <Typography variant="h6" className="text-gray-700 font-semibold">
                  Overall Rating
                </Typography>
                <div className="flex items-baseline gap-2">
                  <Typography
                    variant="h2"
                    className="font-black text-orange-600"
                    sx={{ fontSize: isMobile ? "3rem" : "4rem" }}
                  >
                    4.5
                  </Typography>
                  <Typography variant="h6" className="text-gray-500">
                    out of 5
                  </Typography>
                </div>
                <Rating
                  value={4.5}
                  precision={0.5}
                  readOnly
                  size="large"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#f59e0b",
                    },
                    fontSize: isMobile ? "1.75rem" : "2rem",
                  }}
                />
                <Typography variant="body2" className="text-gray-600">
                  Based on {reviews.length} reviews
                </Typography>
              </div>

              {/* Rating Breakdown */}
              <div className="flex-1 w-full max-w-md">
                <Typography variant="h6" className="text-gray-700 font-semibold mb-4">
                  Rating Breakdown
                </Typography>
                <div className="space-y-2">
                  {ratingStats.map((stat) => (
                    <div key={stat.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <Typography variant="body2" className="font-semibold text-gray-700">
                          {stat.stars}
                        </Typography>
                        <Star sx={{ fontSize: "1rem", color: "#f59e0b" }} />
                      </div>
                      <div className="flex-1">
                        <LinearProgress
                          variant="determinate"
                          value={stat.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "#f3f4f6",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                stat.stars >= 4
                                  ? "#10b981"
                                  : stat.stars === 3
                                  ? "#f59e0b"
                                  : "#ef4444",
                              borderRadius: 4,
                            },
                          }}
                        />
                      </div>
                      <Typography variant="body2" className="text-gray-600 w-12 text-right">
                        {stat.count}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {user?.email && (
            <>
              {/* Add Comment Section */}
              <div className={`${isMobile ? "p-6" : "p-8"} bg-gradient-to-br from-gray-50 to-white border-b-2 border-gray-200`}>
                <div className="flex items-center gap-2 mb-6">
                  <RateReview sx={{ color: "#ea580c", fontSize: "1.75rem" }} />
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    className="font-bold text-gray-900"
                  >
                    Write a Review
                  </Typography>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-200"
                >
                  {/* Rating Input */}
                  <div className="mb-6">
                    <Typography
                      variant="body1"
                      className="text-gray-700 font-semibold mb-3"
                    >
                      Rate this product
                    </Typography>
                    <div className="flex items-center gap-4">
                      <Rating
                        value={rating}
                        onChange={(_, newValue) => setRating(newValue)}
                        size="large"
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#f59e0b",
                          },
                          "& .MuiRating-iconHover": {
                            color: "#f59e0b",
                          },
                          fontSize: isMobile ? "2rem" : "2.5rem",
                        }}
                      />
                      {rating > 0 && (
                        <Chip
                          label={`${rating} star${rating > 1 ? "s" : ""}`}
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
                  <div className="flex gap-4">
                    <Avatar
                      sx={{
                        width: isMobile ? 40 : 48,
                        height: isMobile ? 40 : 48,
                        fontSize: isMobile ? "1.25rem" : "1.5rem",
                        backgroundColor: "#ea580c",
                      }}
                    >
                      {user?.displayName?.[0] || "U"}
                    </Avatar>
                    <div className="flex-1">
                      <TextField
                        fullWidth
                        multiline
                        rows={isMobile ? 3 : 4}
                        placeholder="Share your thoughts about this product... What did you like? What could be improved?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#fafaf9",
                            fontSize: isMobile ? "0.95rem" : "1.05rem",
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
                      <div className="flex items-center justify-between mt-4">
                        {!isMobile && (
                          <div className="flex gap-2">
                            <IconButton
                              size="medium"
                              sx={{
                                backgroundColor: "#f3f4f6",
                                "&:hover": {
                                  backgroundColor: "#e5e7eb",
                                },
                              }}
                            >
                              <EmojiEmotions sx={{ color: "#f59e0b" }} />
                            </IconButton>
                            <IconButton
                              size="medium"
                              sx={{
                                backgroundColor: "#f3f4f6",
                                "&:hover": {
                                  backgroundColor: "#e5e7eb",
                                },
                              }}
                            >
                              <Image sx={{ color: "#3b82f6" }} />
                            </IconButton>
                          </div>
                        )}
                        <Button
                          variant="contained"
                          size="large"
                          endIcon={<Send />}
                          onClick={handleSubmitComment}
                          disabled={!comment.trim() && rating === 0}
                          sx={{
                            background: "linear-gradient(to right, #ea580c, #dc2626)",
                            "&:hover": {
                              background: "linear-gradient(to right, #c2410c, #b91c1c)",
                            },
                            textTransform: "none",
                            fontSize: isMobile ? "0.95rem" : "1.05rem",
                            fontWeight: 700,
                            marginLeft: isMobile ? "auto" : 0,
                            padding: isMobile ? "10px 24px" : "12px 32px",
                            borderRadius: "12px",
                            boxShadow: "0 4px 15px rgba(234, 88, 12, 0.3)",
                          }}
                        >
                          Post Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Reviews/Comments List */}
              <div className={`${isMobile ? "p-6" : "p-8"}`}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <RateReview sx={{ color: "#ea580c", fontSize: "1.75rem" }} />
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      className="font-bold text-gray-900"
                    >
                      Customer Reviews ({reviews.length})
                    </Typography>
                  </div>
                  <select
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:outline-none focus:border-orange-600 cursor-pointer bg-white"
                  >
                    <option>Most relevant</option>
                    <option>Newest first</option>
                    <option>Highest rated</option>
                  </select>
                </div>

                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        <Avatar
                          src={review.authorImage}
                          alt={review.author}
                          sx={{
                            width: isMobile ? 48 : 56,
                            height: isMobile ? 48 : 56,
                            border: "3px solid #ffedd5",
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Typography
                              variant={isMobile ? "subtitle1" : "h6"}
                              className="font-bold text-gray-900"
                            >
                              {review.author}
                            </Typography>
                            <Typography
                              variant="body2"
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
                                }}
                              />
                            )}
                          </div>
                          {review.rating && (
                            <Rating
                              value={review.rating}
                              readOnly
                              size={isMobile ? "small" : "medium"}
                              sx={{
                                "& .MuiRating-iconFilled": {
                                  color: "#f59e0b",
                                },
                                marginBottom: "12px",
                              }}
                            />
                          )}
                          <Typography
                            variant={isMobile ? "body2" : "body1"}
                            className="text-gray-700 leading-relaxed mb-4"
                            sx={{ fontSize: isMobile ? "0.95rem" : "1.05rem" }}
                          >
                            {review.content}
                          </Typography>
                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 rounded-lg text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
                            >
                              <ThumbUp fontSize="small" />
                              <span>{review.likes > 0 ? review.likes : "Like"}</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 rounded-lg text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200"
                            >
                              <Reply fontSize="small" />
                              <span>Reply</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Nested Replies */}
                      {review.replies && review.replies.length > 0 && (
                        <div
                          className={`${isMobile ? "ml-10 space-y-2 mt-3" : "ml-14 space-y-4 mt-4"}`}
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
                                  width: isMobile ? 32 : 36,
                                  height: isMobile ? 32 : 36,
                                }}
                              />
                              <div className="flex-1">
                                <div
                                  className={`flex items-center ${isMobile ? "gap-2" : "gap-3"} mb-1`}
                                >
                                  <Typography
                                    variant={isMobile ? "body2" : "body1"}
                                    className="font-semibold"
                                  >
                                    {reply.author}
                                  </Typography>
                                  <Typography
                                    variant={isMobile ? "caption" : "body2"}
                                    className="text-gray-500"
                                  >
                                    • {reply.timeAgo}
                                  </Typography>
                                  {reply.isAuthor && (
                                    <span
                                      className={`${isMobile ? "text-xs" : "text-sm"} bg-orange-100 text-orange-600 px-2 py-0.5 rounded`}
                                    >
                                      Vendor
                                    </span>
                                  )}
                                </div>
                                <Typography
                                  variant={isMobile ? "body2" : "body1"}
                                  className="text-gray-700 leading-relaxed"
                                >
                                  {reply.content}
                                </Typography>
                                <div
                                  className={`flex items-center ${isMobile ? "gap-3" : "gap-4"} mt-2`}
                                >
                                  <button
                                    className={`text-gray-600 hover:text-orange-600 ${isMobile ? "text-xs" : "text-sm"}`}
                                  >
                                    Like
                                  </button>
                                  <button
                                    className={`text-gray-600 hover:text-orange-600 ${isMobile ? "text-xs" : "text-sm"}`}
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
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="w-full flex justify-center p-4">
                {reviews.length === 0 && (
                  <Typography variant="body1" className="text-gray-500">
                    No reviews yet for this product!
                  </Typography>
                )}
              </div>
            </>
          )}

          {!user?.email && (
            <>
              <div className={`${isMobile ? "p-4" : "p-8"} border-b`}>
                <div className="mb-3 px-2">
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    className="font-bold text-gray-900 mb-2"
                  >
                    Customer Reviews
                  </Typography>
                </div>
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  className="text-gray-600 mb-3 px-2"
                >
                  See what other customers are saying about this product.
                </Typography>

                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  className="text-orange-600 font-semibold px-2"
                >
                  Please sign in to leave a review.
                </Typography>
              </div>
            </>
          )}
        </motion.div>
      ) : null}
    </div>
  );
};

export default ProductDetailsWithReviews;
