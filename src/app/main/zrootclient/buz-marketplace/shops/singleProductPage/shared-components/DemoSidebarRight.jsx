import FuseNavigation from "@fuse/core/FuseNavigation";
// import FoodMartMap from "../../components/maps/FoodMartMap";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Button, Typography } from "@mui/material";
import MinimumOrderDialogue from "./MinimumOrderDialogue";
/**
 * Navigation data
 */

/**
 * The DemoSidebarRight component.
 */
function DemoSidebarRight(props) {
  const { productInfo } = props;


  return (
    <div className="px-12 py-24 h-screen overflow-y-auto">
      {/* min-h-6xl  */}
      <div className="w-full p-4 flex flex-col">
        {/* DELIVERY & RETURNS SECTION - COMMENTED OUT
        <div className="bg-white p-4 rounded">
          <h2 className="text-lg font-bold">DELIVERY & RETURNS</h2>
          <div className="mt-2 space-y-4">
            <label className="block text-gray-800">Choose your location</label>
            <select className="w-full mt-1 p-2 border rounded">
              <option>Lagos</option>
            </select>
            <select className="w-full mt-1 p-2 border rounded">
              <option>LEKKI-AJAH (SANGOTEDO)</option>
            </select>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex flex-row justify-between">
                  <div className="flex gap-4">
                    <img
                      src="http://localhost:3000/assets/images/afslogo/afslogo.png"
                      width={20}
                      height={10}
                    />
                    <h3 className="font-bold">Pickup Station</h3>
                  </div>
                  <span
                    href="#"
                    className="text-orange-500 inline cursor-pointer"
                  >
                    Details
                  </span>
                </div>

                <p className="text-gray-500 text-sm">Delivery Fees ₦ 1,080</p>
                <p className="text-gray-500 text-sm">
                  Arriving between 21 November & 22 November. Order within 3mins
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="flex flex-row justify-between">
                  <div className="flex gap-4">
                    <img
                      src="http://localhost:3000/assets/images/afslogo/afslogo.png"
                      width={20}
                      height={10}
                    />
                    <h3 className="font-bold">Door Delivery</h3>
                  </div>
                  <span
                    href="#"
                    className="text-orange-500 inline cursor-pointer"
                  >
                    Details
                  </span>
                </div>

                <p className="text-gray-500 text-sm">Delivery Fees ₦ 1,790</p>
                <p className="text-gray-500 text-sm">
                  Ready for delivery between 21 November & 22 November when you
                  order within next 3mins
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="flex flex-row justify-between">
                  <div className="flex gap-4">
                    <img
                      src="http://localhost:3000/assets/images/afslogo/afslogo.png"
                      width={20}
                      height={10}
                    />
                    <h3 className="font-bold">Return Policy</h3>
                  </div>
                  <span
                    href="#"
                    className="text-orange-500 inline cursor-pointer"
                  >
                    Details
                  </span>
                </div>

                <p className="text-gray-500 text-sm">
                  Free return within 7 days for ALL eligible items and items in
                  food cart
                </p>
              </div>
            </div>
          </div>
        </div>
        END DELIVERY & RETURNS SECTION */}

        {/* MinimumOrderDialogue Component */}
        <div className="mb-8">
          <MinimumOrderDialogue productData={productInfo} />
        </div>

        {/* SELLER INFORMATION Section - Enhanced Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden">
          {/* Header with Badge */}
          
          {/* Seller Details */}
          <div className="p-6">
            {/* Store Name & Badge */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    Apple Authorized Reseller
                  </h3>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    VERIFIED
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  Official Apple partner since 2018
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <i className="fas fa-star text-yellow-500 text-2xl"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">94%</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Seller Score
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <i className="fas fa-users text-orange-500 text-2xl"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">2.5K</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Followers
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <i className="fas fa-box text-green-500 text-2xl"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">1.2K</p>
                <p className="text-xs text-gray-600 font-medium mt-1">
                  Products
                </p>
              </div>
            </div>

            {/* Follow Button */}
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg text-base mb-6">
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
                    <span className="text-sm font-bold text-green-600">
                      Excellent
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>

                {/* Quality Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Quality Score
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      Excellent
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>

                {/* Customer Rating */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Customer Rating
                    </span>
                    <span className="text-sm font-bold text-orange-600">
                      Good
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                </div>

                {/* Response Time */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Response Time
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      Fast
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
                <i className="fas fa-shield-alt"></i>
                Verified Seller
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
                <i className="fas fa-truck"></i>
                Fast Shipping
              </span>
              <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-200">
                <i className="fas fa-award"></i>
                Top Rated
              </span>
            </div>

            {/* Contact Actions */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border-2 border-gray-300 transition-colors text-sm">
                <i className="fas fa-comments text-orange-500"></i>
                Chat Now
              </button>
              <Button 
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border-2 border-gray-300 transition-colors text-sm"
               component={NavLinkAdapter}
                  to={`/marketplace/merchant/${productInfo?.shop}/portal`}
              >
                <i className="fas fa-store-alt text-orange-500"></i>
                Visit Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoSidebarRight;
