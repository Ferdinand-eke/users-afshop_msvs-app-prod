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
} from "@mui/material";
import { Reply, Send, ThumbUp } from "@mui/icons-material";
import { useAppSelector } from "app/store/hooks";
import { selectUser } from "src/app/auth/user/store/userSlice";
import siteStyle from "@fuse/sitestaticdata/siteStyle";

/**
 * ProductDetailsWithReviews Component
 * Displays product details and reviews in tabbed interface
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
    <div className="px-4 py-4 rounded">
      {/* Tab Headers */}
      <div className="w-full flex justify-between border-b pt-6 pb-3 space-x-4 px-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[16px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[22px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${siteStyle.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[16px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[22px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${siteStyle.active_indicator}`} />
          ) : null}
        </div>
      </div>

      {/* Product Details Tab */}
      {active === 1 ? (
        <div
          className={`${isMobile ? "w-full" : "w-1/1"} bg-white flex flex-col ${isMobile ? "h-auto" : ""}`}
        >
          <div className={`${isMobile ? "p-4" : "p-8"}`}>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              className="text-gray-700 mb-4 leading-relaxed"
            >
              {productData?.description || "Product description not available."}
            </Typography>

            {/* Additional Product Information */}
            <div className="mt-6 space-y-3">
              <Typography variant="h6" className="font-bold mb-3">
                Specifications
              </Typography>

              {productData?.category && (
                <div className="flex border-b pb-2">
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="font-semibold w-1/3"
                  >
                    Category:
                  </Typography>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="text-gray-600 w-2/3"
                  >
                    {productData?.category}
                  </Typography>
                </div>
              )}

              {productData?.unitweight?.unitname && (
                <div className="flex border-b pb-2">
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="font-semibold w-1/3"
                  >
                    Unit Weight:
                  </Typography>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="text-gray-600 w-2/3"
                  >
                    {productData?.unitweight?.unitname}
                  </Typography>
                </div>
              )}

              {productData?.quantity && (
                <div className="flex border-b pb-2">
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="font-semibold w-1/3"
                  >
                    Available Stock:
                  </Typography>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="text-gray-600 w-2/3"
                  >
                    {productData?.quantity} {productData?.unitPerQuantity}
                  </Typography>
                </div>
              )}

              {productData?.shop && (
                <div className="flex border-b pb-2">
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="font-semibold w-1/3"
                  >
                    Seller:
                  </Typography>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="text-gray-600 w-2/3"
                  >
                    {productData?.shop?.shopname || "Official Store"}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Reviews Tab */}
      {active === 2 ? (
        <div
          className={`${isMobile ? "w-full" : "w-1/1"} bg-white flex flex-col ${isMobile ? "h-auto" : ""}`}
        >
          {user?.email && (
            <>
              {/* Add Comment Section */}
              <div
                className={`${isMobile ? "p-4" : "p-8"} border-b bg-gray-50`}
              >
                <Typography
                  variant={isMobile ? "subtitle2" : "subtitle1"}
                  className="font-semibold mb-3"
                >
                  Add a Review
                </Typography>
                <div className={`${isMobile ? "mb-3" : "mb-4"}`}>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    className="text-gray-700 mb-2"
                  >
                    Your Rating
                  </Typography>
                  <Rating
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                    size={isMobile ? "medium" : "large"}
                  />
                </div>
                <div className={`flex ${isMobile ? "gap-2" : "gap-3"}`}>
                  <Avatar
                    sx={{
                      width: isMobile ? 32 : 40,
                      height: isMobile ? 32 : 40,
                      fontSize: isMobile ? "1rem" : "1.25rem",
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
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "white",
                          fontSize: isMobile ? "0.875rem" : "1rem",
                        },
                      }}
                    />
                    <div
                      className={`flex items-center justify-between ${isMobile ? "mt-2" : "mt-3"}`}
                    >
                      {!isMobile && (
                        <div className="flex gap-2">
                          <IconButton size="small">😊</IconButton>
                          <IconButton size="small">📷</IconButton>
                        </div>
                      )}
                      <Button
                        variant="contained"
                        size="medium"
                        endIcon={<Send fontSize="small" />}
                        onClick={handleSubmitComment}
                        disabled={!comment.trim() && rating === 0}
                        sx={{
                          backgroundColor: "#ea580c",
                          "&:hover": {
                            backgroundColor: "#c2410c",
                          },
                          textTransform: "none",
                          fontSize: isMobile ? "0.875rem" : "1rem",
                          marginLeft: isMobile ? "auto" : 0,
                          padding: isMobile ? "6px 16px" : "8px 20px",
                        }}
                      >
                        Post Review
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews/Comments List */}
              <div
                className={`flex-1 overflow-y-auto ${isMobile ? "p-4" : "p-8"}`}
              >
                <div
                  className={`flex items-center justify-between ${isMobile ? "mb-3" : "mb-5"} px-2`}
                >
                  <Typography
                    variant={isMobile ? "subtitle2" : "subtitle1"}
                    className="font-semibold"
                  >
                    Customer Reviews ({reviews.length})
                  </Typography>
                  <select
                    className={`${isMobile ? "text-sm" : "text-base"} text-gray-600 border-none outline-none cursor-pointer`}
                  >
                    <option>Most relevant</option>
                    <option>Newest first</option>
                    <option>Highest rated</option>
                  </select>
                </div>

                <div className={`${isMobile ? "space-y-3" : "space-y-5"}`}>
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className={`${isMobile ? "space-y-2" : "space-y-3"}`}
                    >
                      <div className={`flex ${isMobile ? "gap-2" : "gap-4"}`}>
                        <Avatar
                          src={review.authorImage}
                          alt={review.author}
                          sx={{
                            width: isMobile ? 36 : 44,
                            height: isMobile ? 36 : 44,
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Typography
                              variant={isMobile ? "body2" : "body1"}
                              className="font-semibold"
                            >
                              {review.author}
                            </Typography>
                            <Typography
                              variant={isMobile ? "caption" : "body2"}
                              className="text-gray-500"
                            >
                              • {review.timeAgo}
                            </Typography>
                            {review.isAuthor && (
                              <span
                                className={`${isMobile ? "text-xs" : "text-sm"} bg-orange-100 text-orange-600 px-2 py-0.5 rounded`}
                              >
                                Vendor
                              </span>
                            )}
                          </div>
                          {review.rating && (
                            <Rating
                              value={review.rating}
                              readOnly
                              size={isMobile ? "small" : "medium"}
                              className="mb-2"
                            />
                          )}
                          <Typography
                            variant={isMobile ? "body2" : "body1"}
                            className="text-gray-700 leading-relaxed"
                          >
                            {review.content}
                          </Typography>
                          <div
                            className={`flex items-center ${isMobile ? "gap-3 mt-2" : "gap-5 mt-3"}`}
                          >
                            <button
                              className={`flex items-center gap-1 text-gray-600 hover:text-orange-600 ${isMobile ? "text-sm" : "text-base"}`}
                            >
                              <ThumbUp
                                fontSize="small"
                                sx={{ fontSize: isMobile ? 16 : 18 }}
                              />
                              <span>
                                {review.likes > 0 ? review.likes : "Like"}
                              </span>
                            </button>
                            <button
                              className={`flex items-center gap-1 text-gray-600 hover:text-orange-600 ${isMobile ? "text-sm" : "text-base"}`}
                            >
                              <Reply
                                fontSize="small"
                                sx={{ fontSize: isMobile ? 16 : 18 }}
                              />
                              <span>Reply</span>
                            </button>
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
                    </div>
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
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsWithReviews;
