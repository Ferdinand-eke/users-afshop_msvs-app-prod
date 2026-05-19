import { useState } from "react";
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  EmojiEmotions,
  Image as ImageIcon,
  LocalDining,
  RateReview,
  Reply,
  RestaurantMenu,
  Send,
  Star,
  ThumbUp,
  VerifiedUser,
  Whatshot,
  SoupKitchen,
  Inventory,
  Storefront,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "app/store/hooks";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";

const ratingStats = [
  { stars: 5, count: 45, pct: 75 },
  { stars: 4, count: 10, pct: 17 },
  { stars: 3, count: 3, pct: 5 },
  { stars: 2, count: 1, pct: 2 },
  { stars: 1, count: 1, pct: 1 },
];

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: "Adaeze Okafor",
    authorImage: "https://placehold.co/48x48",
    timeAgo: "3d",
    content: "Absolutely incredible! The flavours were rich, perfectly seasoned, and the portion was more than generous. Came back the very next day 🔥",
    rating: 5,
    likes: 12,
    isAuthor: false,
    replies: [
      {
        id: 1,
        author: "Restaurant Response",
        authorImage: "https://placehold.co/40x40",
        timeAgo: "2d",
        content: "We're so glad you loved it, Adaeze! Your kind words mean the world to our kitchen team. See you again soon! 🍽️",
        isAuthor: true,
      },
    ],
  },
];

function TabButton({ active, onClick, icon, label, isMobile }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex-1 cursor-pointer rounded-xl p-4 transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-orange-600 to-red-600 shadow-lg"
          : "bg-white hover:bg-gray-50 border-2 border-gray-200"
      }`}
    >
      <div className="flex items-center justify-center gap-3">
        {icon}
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          className={`font-bold ${active ? "text-white" : "text-gray-900"}`}
        >
          {label}
        </Typography>
      </div>
      {active && (
        <motion.div
          layoutId="foodmartActiveTab"
          className="h-1 bg-white/70 rounded-full mt-2"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.div>
  );
}

function SpecCard({ label, value, colorClass = "border-gray-200 bg-white", labelColor = "text-gray-500", valueColor = "text-gray-900", icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-5 border-2 rounded-xl hover:shadow-md transition-all duration-300 ${colorClass}`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <Typography variant="caption" className={`font-semibold uppercase tracking-wide ${labelColor}`}>
          {label}
        </Typography>
      </div>
      <Typography variant="h6" className={`font-black leading-tight ${valueColor}`}>
        {value}
      </Typography>
    </motion.div>
  );
}

/**
 * FoodMartDetailsWithReviews — tabbed detail + review panel for a single RCS menu item.
 * Modelled after ProductDetailsWithReviews (marketplace) with food/RCS-specific copy and palette.
 */
const FoodMartDetailsWithReviews = ({ menuData }) => {
  const user = useAppSelector(selectUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [active, setActive] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  const handleSubmitComment = () => {
    if (!comment.trim() && rating === 0) return;
    setReviews([
      {
        id: reviews.length + 1,
        author: user?.displayName || "Guest Diner",
        authorImage: user?.photoURL || "https://placehold.co/48x48",
        timeAgo: "Just now",
        content: comment,
        rating,
        likes: 0,
        replies: [],
        isAuthor: false,
      },
      ...reviews,
    ]);
    setComment("");
    setRating(0);
  };

  return (
    <div className="p-0">

      {/* ── Tab bar ── */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200">
        <div className="flex gap-3 p-6">
          <TabButton
            active={active === 1}
            onClick={() => setActive(1)}
            isMobile={isMobile}
            icon={
              <LocalDining
                sx={{
                  fontSize: isMobile ? "1.5rem" : "1.75rem",
                  color: active === 1 ? "white" : "#ea580c",
                }}
              />
            }
            label="Dish Details"
          />
          <TabButton
            active={active === 2}
            onClick={() => setActive(2)}
            isMobile={isMobile}
            icon={
              <RateReview
                sx={{
                  fontSize: isMobile ? "1.5rem" : "1.75rem",
                  color: active === 2 ? "white" : "#ea580c",
                }}
              />
            }
            label={`Diner Reviews (${reviews.length})`}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ── DISH DETAILS TAB ── */}
        {active === 1 && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="bg-white"
          >
            <div className={isMobile ? "p-6" : "p-10"}>

              {/* About this dish */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <RestaurantMenu sx={{ color: "#ea580c", fontSize: "1.75rem" }} />
                  <Typography variant={isMobile ? "h6" : "h5"} className="font-bold text-gray-900">
                    About This Dish
                  </Typography>
                </div>
                <div
                  className="p-6 rounded-2xl border-l-4 border-orange-500"
                  style={{ background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)" }}
                >
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="text-gray-700 leading-relaxed"
                    sx={{ fontSize: isMobile ? "0.95rem" : "1.1rem", lineHeight: 1.85 }}
                  >
                    {menuData?.description || "No description available for this dish yet."}
                  </Typography>
                </div>
              </div>

              {/* Dish info grid */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <VerifiedUser sx={{ color: "#10b981", fontSize: "1.75rem" }} />
                  <Typography variant={isMobile ? "h6" : "h5"} className="font-bold text-gray-900">
                    Dish Information
                  </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuData?.foodMartCategory && (
                    <SpecCard
                      label="Category"
                      value={menuData.foodMartCategory}
                      icon={<SoupKitchen sx={{ fontSize: "1rem", color: "#ea580c" }} />}
                      colorClass="border-orange-200 bg-orange-50 hover:border-orange-400"
                      labelColor="text-orange-700"
                      valueColor="text-orange-900"
                    />
                  )}

                  {menuData?.unitPerQuantity && (
                    <SpecCard
                      label="Serving Size"
                      value={menuData.unitPerQuantity}
                      icon={<LocalDining sx={{ fontSize: "1rem", color: "#f59e0b" }} />}
                      colorClass="border-amber-200 bg-amber-50 hover:border-amber-400"
                      labelColor="text-amber-700"
                      valueColor="text-amber-900"
                    />
                  )}

                  {menuData?.quantity && (
                    <SpecCard
                      label="Available Portions"
                      value={`${menuData.quantity}${menuData.unitPerQuantity ? ` ${menuData.unitPerQuantity}` : ""} left`}
                      icon={<Inventory sx={{ fontSize: "1rem", color: "#10b981" }} />}
                      colorClass="border-green-200 bg-green-50 hover:border-green-400"
                      labelColor="text-green-700"
                      valueColor="text-green-900"
                    />
                  )}

                  {menuData?.price && (
                    <SpecCard
                      label="Price"
                      value={`₦${formatCurrency(menuData.price)} per ${menuData?.unitPerQuantity || "serving"}`}
                      icon={<Whatshot sx={{ fontSize: "1rem", color: "#dc2626" }} />}
                      colorClass="border-red-200 bg-red-50 hover:border-red-400"
                      labelColor="text-red-700"
                      valueColor="text-red-900"
                    />
                  )}

                  {(menuData?.foodMartVendor?.name || menuData?.foodMartVendor) && (
                    <SpecCard
                      label="Restaurant"
                      value={
                        typeof menuData.foodMartVendor === "object"
                          ? menuData.foodMartVendor?.name || "Official Restaurant"
                          : "Official Restaurant"
                      }
                      icon={<Storefront sx={{ fontSize: "1rem", color: "#3b82f6" }} />}
                      colorClass="border-blue-200 bg-blue-50 hover:border-blue-400"
                      labelColor="text-blue-700"
                      valueColor="text-blue-900"
                    />
                  )}
                </div>
              </div>

              {/* Dining experience note */}
              <div
                className="p-6 rounded-2xl flex items-start gap-4"
                style={{ background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", border: "2px solid #e9d5ff" }}
              >
                <Whatshot sx={{ color: "#a855f7", fontSize: "2rem", flexShrink: 0, mt: 0.5 }} />
                <div>
                  <Typography variant="subtitle1" className="font-bold text-purple-900 mb-1">
                    Dining Experience
                  </Typography>
                  <Typography variant="body2" className="text-purple-700 leading-relaxed">
                    Freshly prepared by our kitchen team. Best enjoyed immediately after serving.
                    Call <span className="font-bold">07087200297</span> to customise your order or make special dietary requests.
                  </Typography>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ── REVIEWS TAB ── */}
        {active === 2 && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="bg-white"
          >

            {/* Rating overview */}
            <div
              className={`${isMobile ? "p-6" : "p-10"} border-b-2 border-gray-200`}
              style={{ background: "linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fff7ed 100%)" }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

                {/* Score */}
                <div className="flex flex-col items-center md:items-start gap-2">
                  <Typography variant="h6" className="text-gray-700 font-semibold">
                    Overall Rating
                  </Typography>
                  <div className="flex items-baseline gap-2">
                    <Typography
                      variant="h2"
                      className="font-black"
                      sx={{
                        fontSize: isMobile ? "3.5rem" : "4.5rem",
                        background: "linear-gradient(to right, #ea580c, #dc2626)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      4.5
                    </Typography>
                    <Typography variant="h6" className="text-gray-400">
                      / 5
                    </Typography>
                  </div>
                  <Rating
                    value={4.5}
                    precision={0.5}
                    readOnly
                    size="large"
                    sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" }, fontSize: isMobile ? "1.75rem" : "2rem" }}
                  />
                  <Typography variant="body2" className="text-gray-500">
                    Based on {reviews.length} diner reviews
                  </Typography>
                </div>

                {/* Breakdown bars */}
                <div className="flex-1 w-full max-w-md">
                  <Typography variant="h6" className="text-gray-700 font-semibold mb-4">
                    Rating Breakdown
                  </Typography>
                  <div className="space-y-2">
                    {ratingStats.map((stat) => (
                      <div key={stat.stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-14 flex-shrink-0">
                          <Typography variant="body2" className="font-bold text-gray-700">
                            {stat.stars}
                          </Typography>
                          <Star sx={{ fontSize: "0.95rem", color: "#f59e0b" }} />
                        </div>
                        <div className="flex-1">
                          <LinearProgress
                            variant="determinate"
                            value={stat.pct}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "#f3f4f6",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor:
                                  stat.stars >= 4 ? "#10b981" : stat.stars === 3 ? "#f59e0b" : "#ef4444",
                                borderRadius: 4,
                              },
                            }}
                          />
                        </div>
                        <Typography variant="body2" className="text-gray-500 w-8 text-right font-semibold">
                          {stat.count}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Logged-in: write a review + list ── */}
            {user?.email && (
              <>
                {/* Review composer */}
                <div
                  className={`${isMobile ? "p-6" : "p-10"} border-b-2 border-gray-200`}
                  style={{ background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)" }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <RateReview sx={{ color: "#ea580c", fontSize: "1.75rem" }} />
                    <Typography variant={isMobile ? "h6" : "h5"} className="font-bold text-gray-900">
                      Write a Review
                    </Typography>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-200"
                  >
                    {/* Star input */}
                    <div className="mb-6">
                      <Typography variant="body1" className="text-gray-700 font-semibold mb-3">
                        How would you rate this dish?
                      </Typography>
                      <div className="flex items-center gap-4 flex-wrap">
                        <Rating
                          value={rating}
                          onChange={(_, v) => setRating(v)}
                          size="large"
                          sx={{
                            "& .MuiRating-iconFilled": { color: "#f59e0b" },
                            "& .MuiRating-iconHover": { color: "#f59e0b" },
                            fontSize: isMobile ? "2rem" : "2.5rem",
                          }}
                        />
                        {rating > 0 && (
                          <Chip
                            label={`${rating} star${rating !== 1 ? "s" : ""}`}
                            sx={{ backgroundColor: "#ffedd5", color: "#c2410c", fontWeight: 700 }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Text input */}
                    <div className="flex gap-4">
                      <Avatar
                        sx={{
                          width: isMobile ? 40 : 48,
                          height: isMobile ? 40 : 48,
                          fontSize: isMobile ? "1.25rem" : "1.5rem",
                          backgroundColor: "#ea580c",
                          flexShrink: 0,
                        }}
                      >
                        {user?.displayName?.[0] || "U"}
                      </Avatar>
                      <div className="flex-1">
                        <TextField
                          fullWidth
                          multiline
                          rows={isMobile ? 3 : 4}
                          placeholder="How was the dish? Share the taste, portions, freshness… your honest experience helps other diners!"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "#fafaf9",
                              fontSize: isMobile ? "0.95rem" : "1.05rem",
                              borderRadius: "12px",
                              "&:hover fieldset": { borderColor: "#ea580c" },
                              "&.Mui-focused fieldset": { borderColor: "#ea580c", borderWidth: "2px" },
                            },
                          }}
                        />
                        <div className="flex items-center justify-between mt-4">
                          {!isMobile && (
                            <div className="flex gap-2">
                              <IconButton size="medium" sx={{ backgroundColor: "#f3f4f6", "&:hover": { backgroundColor: "#e5e7eb" } }}>
                                <EmojiEmotions sx={{ color: "#f59e0b" }} />
                              </IconButton>
                              <IconButton size="medium" sx={{ backgroundColor: "#f3f4f6", "&:hover": { backgroundColor: "#e5e7eb" } }}>
                                <ImageIcon sx={{ color: "#3b82f6" }} />
                              </IconButton>
                            </div>
                          )}
                          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ marginLeft: isMobile ? "auto" : 0 }}>
                            <Button
                              variant="contained"
                              size="large"
                              endIcon={<Send />}
                              onClick={handleSubmitComment}
                              disabled={!comment.trim() && rating === 0}
                              sx={{
                                background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                                "&:hover": { background: "linear-gradient(135deg, #c2410c 0%, #b91c1c 100%)" },
                                textTransform: "none",
                                fontSize: isMobile ? "0.95rem" : "1.05rem",
                                fontWeight: 700,
                                padding: isMobile ? "10px 24px" : "12px 32px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 15px rgba(234,88,12,0.35)",
                              }}
                            >
                              Post Review
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Reviews list */}
                <div className={isMobile ? "p-6" : "p-10"}>
                  <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Star sx={{ color: "#f59e0b", fontSize: "1.75rem" }} />
                      <Typography variant={isMobile ? "h6" : "h5"} className="font-bold text-gray-900">
                        Diner Reviews ({reviews.length})
                      </Typography>
                    </div>
                    <select className="px-4 py-2 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold focus:outline-none focus:border-orange-600 cursor-pointer bg-white">
                      <option>Most relevant</option>
                      <option>Newest first</option>
                      <option>Highest rated</option>
                    </select>
                  </div>

                  {reviews.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-4 py-16"
                    >
                      <div
                        className="p-6 rounded-full"
                        style={{ background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)" }}
                      >
                        <RestaurantMenu sx={{ fontSize: "3rem", color: "#ea580c" }} />
                      </div>
                      <Typography variant="h6" className="font-bold text-gray-700">
                        No reviews yet
                      </Typography>
                      <Typography variant="body2" className="text-gray-500 text-center">
                        Be the first to share your dining experience with this dish!
                      </Typography>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review, index) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08 }}
                          className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex gap-4">
                            <Avatar
                              src={review.authorImage}
                              alt={review.author}
                              sx={{
                                width: isMobile ? 48 : 56,
                                height: isMobile ? 48 : 56,
                                border: "3px solid #ffedd5",
                                flexShrink: 0,
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-2">
                                <Typography
                                  variant={isMobile ? "subtitle1" : "h6"}
                                  className="font-bold text-gray-900"
                                >
                                  {review.author}
                                </Typography>
                                <Typography variant="body2" className="text-gray-400">
                                  · {review.timeAgo}
                                </Typography>
                                {review.isAuthor && (
                                  <Chip
                                    icon={<VerifiedUser fontSize="small" />}
                                    label="Restaurant"
                                    size="small"
                                    sx={{ backgroundColor: "#ffedd5", color: "#c2410c", fontWeight: 700, fontSize: "0.7rem" }}
                                  />
                                )}
                              </div>
                              {review.rating > 0 && (
                                <Rating
                                  value={review.rating}
                                  readOnly
                                  size={isMobile ? "small" : "medium"}
                                  className="mb-2"
                                  sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" } }}
                                />
                              )}
                              <Typography
                                variant={isMobile ? "body2" : "body1"}
                                className="text-gray-700 leading-relaxed mb-4"
                                sx={{ fontSize: isMobile ? "0.95rem" : "1.05rem" }}
                              >
                                {review.content}
                              </Typography>
                              <div className="flex items-center gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 rounded-xl text-gray-700 hover:text-orange-600 font-semibold transition-colors duration-200 text-sm"
                                >
                                  <ThumbUp sx={{ fontSize: "1rem" }} />
                                  <span>{review.likes > 0 ? review.likes : "Like"}</span>
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 rounded-xl text-gray-700 hover:text-orange-600 font-semibold transition-colors duration-200 text-sm"
                                >
                                  <Reply sx={{ fontSize: "1rem" }} />
                                  <span>Reply</span>
                                </motion.button>
                              </div>
                            </div>
                          </div>

                          {/* Restaurant replies */}
                          {review.replies?.length > 0 && (
                            <div className={`${isMobile ? "ml-8 mt-4" : "ml-16 mt-5"} space-y-3 border-l-4 border-orange-200 pl-4`}>
                              {review.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="flex gap-3 bg-orange-50 rounded-xl p-4"
                                >
                                  <Avatar
                                    src={reply.authorImage}
                                    alt={reply.author}
                                    sx={{ width: isMobile ? 32 : 36, height: isMobile ? 32 : 36, flexShrink: 0 }}
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                      <Typography variant="body2" className="font-bold text-gray-900">
                                        {reply.author}
                                      </Typography>
                                      <Typography variant="caption" className="text-gray-400">
                                        · {reply.timeAgo}
                                      </Typography>
                                      {reply.isAuthor && (
                                        <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded-md font-bold">
                                          Restaurant
                                        </span>
                                      )}
                                    </div>
                                    <Typography variant="body2" className="text-gray-700 leading-relaxed">
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
                  )}
                </div>
              </>
            )}

            {/* ── Logged-out: sign-in CTA ── */}
            {!user?.email && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={isMobile ? "p-6" : "p-10"}
              >
                {/* Preview of existing reviews */}
                <div className="space-y-4 mb-8">
                  {INITIAL_REVIEWS.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white border-2 border-gray-100 rounded-2xl p-6 pointer-events-none select-none"
                      style={{ filter: "blur(1.5px)", opacity: 0.6 }}
                    >
                      <div className="flex gap-3">
                        <Avatar src={review.authorImage} sx={{ width: 48, height: 48 }} />
                        <div className="flex-1">
                          <Typography variant="subtitle1" className="font-bold text-gray-900 mb-1">
                            {review.author}
                          </Typography>
                          <Rating value={review.rating} readOnly size="small" sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
                          <Typography variant="body2" className="text-gray-600 mt-2 leading-relaxed">
                            {review.content}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sign-in card */}
                <div
                  className="rounded-2xl p-8 text-center border-2"
                  style={{
                    background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #fed7aa 100%)",
                    borderColor: "#fdba74",
                  }}
                >
                  <div
                    className="inline-flex p-4 rounded-full mb-4"
                    style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}
                  >
                    <RateReview sx={{ fontSize: "2.5rem", color: "white" }} />
                  </div>
                  <Typography variant={isMobile ? "h6" : "h5"} className="font-bold text-gray-900 mb-2">
                    Join the conversation
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed">
                    Thousands of diners have shared their honest experience with this dish.
                    <br />
                    <span className="font-semibold text-orange-700">Sign in to read all reviews and leave your own.</span>
                  </Typography>
                  <Chip
                    icon={<RestaurantMenu />}
                    label="Sign in to review this dish"
                    sx={{
                      background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1rem",
                      padding: "22px 12px",
                      cursor: "pointer",
                      "& .MuiChip-icon": { color: "white" },
                      "&:hover": { opacity: 0.9 },
                    }}
                  />
                </div>
              </motion.div>
            )}

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default FoodMartDetailsWithReviews;
