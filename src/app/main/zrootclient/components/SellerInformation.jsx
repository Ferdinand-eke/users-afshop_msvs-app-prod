import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Button } from "@mui/material";

/**
 * SellerInformation Component
 * Reusable seller information card with enhanced design
 * Used across marketplace and foodmart modules
 */
function SellerInformation({
  sellerName = "Apple Authorized Reseller",
  sellerDescription = "Official Apple partner since 2018",
  sellerScore = 94,
  followers = 2500,
  products = 1200,
  shippingSpeed = { label: "Excellent", value: 95, color: "green" },
  qualityScore = { label: "Excellent", value: 98, color: "green" },
  customerRating = { label: "Good", value: 88, color: "orange" },
  responseTime = { label: "Fast", value: 92, color: "blue" },
  showVerified = true,
  showFastShipping = true,
  showTopRated = true,
  // storePath = "/marketplace/merchant/default/portal",
  onFollowClick = () => {},
  onChatClick = () => {},
}) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden">
      {/* Seller Details */}
      <div className="p-6">
        {/* Store Name & Badge */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-xl font-bold text-gray-900">
                {sellerName}
              </h3>
              {showVerified && (
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  VERIFIED
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm">
              {sellerDescription}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <i className="fas fa-star text-yellow-500 text-2xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">{sellerScore}%</p>
            <p className="text-xs text-gray-600 font-medium mt-1">
              Seller Score
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <i className="fas fa-users text-orange-500 text-2xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {followers >= 1000 ? `${(followers / 1000).toFixed(1)}K` : followers}
            </p>
            <p className="text-xs text-gray-600 font-medium mt-1">
              Followers
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-2">
              <i className="fas fa-box text-green-500 text-2xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {products >= 1000 ? `${(products / 1000).toFixed(1)}K` : products}
            </p>
            <p className="text-xs text-gray-600 font-medium mt-1">
              Products
            </p>
          </div>
        </div>

        {/* Follow Button */}
        <button
          onClick={onFollowClick}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg text-base mb-6"
        >
          <i className="fas fa-user-plus mr-2"></i>
          FOLLOW SELLER
        </button>

        {/* Performance Metrics */}
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <i className="fas fa-chart-line text-orange-600 text-lg"></i>
            <h4 className="font-bold text-base text-gray-900">
              Performance Metrics
            </h4>
          </div>
          <div className="space-y-4">
            {/* Shipping Speed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Shipping Speed
                </span>
                <span className={`text-sm font-bold text-${shippingSpeed.color}-600`}>
                  {shippingSpeed.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`bg-gradient-to-r from-${shippingSpeed.color}-500 to-${shippingSpeed.color}-600 h-2.5 rounded-full`}
                  style={{ width: `${shippingSpeed.value}%` }}
                ></div>
              </div>
            </div>

            {/* Quality Score */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Quality Score
                </span>
                <span className={`text-sm font-bold text-${qualityScore.color}-600`}>
                  {qualityScore.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`bg-gradient-to-r from-${qualityScore.color}-500 to-${qualityScore.color}-600 h-2.5 rounded-full`}
                  style={{ width: `${qualityScore.value}%` }}
                ></div>
              </div>
            </div>

            {/* Customer Rating */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Customer Rating
                </span>
                <span className={`text-sm font-bold text-${customerRating.color}-600`}>
                  {customerRating.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`bg-gradient-to-r from-${customerRating.color}-500 to-${customerRating.color}-600 h-2.5 rounded-full`}
                  style={{ width: `${customerRating.value}%` }}
                ></div>
              </div>
            </div>

            {/* Response Time */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Response Time
                </span>
                <span className={`text-sm font-bold text-${responseTime.color}-600`}>
                  {responseTime.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`bg-gradient-to-r from-${responseTime.color}-500 to-${responseTime.color}-600 h-2.5 rounded-full`}
                  style={{ width: `${responseTime.value}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {showVerified && (
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
              <i className="fas fa-shield-alt"></i>
              Verified Seller
            </span>
          )}
          {showFastShipping && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
              <i className="fas fa-truck"></i>
              Fast Shipping
            </span>
          )}
          {showTopRated && (
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-200">
              <i className="fas fa-award"></i>
              Top Rated
            </span>
          )}
        </div>

        {/* Contact Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onChatClick}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border-2 border-gray-300 transition-colors text-sm"
          >
            <i className="fas fa-comments text-orange-500"></i>
            Chat Now
          </button>
          {/* <Button
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border-2 border-gray-300 transition-colors text-sm"
            component={NavLinkAdapter}
            to={storePath}
          >
            <i className="fas fa-store-alt text-orange-500"></i>
            Visit Store
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default SellerInformation;
