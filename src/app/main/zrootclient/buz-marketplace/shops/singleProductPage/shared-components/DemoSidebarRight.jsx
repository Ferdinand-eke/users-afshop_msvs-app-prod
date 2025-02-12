import FuseNavigation from "@fuse/core/FuseNavigation";
// import FoodMartMap from "../../components/maps/FoodMartMap";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Typography } from "@mui/material";
/**
 * Navigation data
 */

/**
 * The DemoSidebarRight component.
 */
function DemoSidebarRight(props) {
  const { productInfo } = props;


  return (
    <div className="px-12 py-24 h-screen">
      {/* min-h-6xl  */}
      <div className="w-full p-4">
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
                    {/* <img
                      src="http://localhost:3000/assets/images/afslogo/afslogo.png"
                      width={20}
                      height={10}
                    /> */}
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

        <div className="bg-white p-4 rounded mt-4 border-b-2">
          <div className="border-b-2 ">
            <div className="flex flex-row justify-between  cursor-pointer"
           
            >
              <Typography className="text-lg font-bold"
               component={NavLinkAdapter}
               to={`/marketplace/merchant/${productInfo?.shop?._id}/portal`}
              >SELLER INFORMATION</Typography>
              <FuseSvgIcon>heroicons-outline:arrow-sm-right</FuseSvgIcon>
            </div>
            <div className="flex justify-between">
			<div className="text-md">
              <p className="text-gray-700">Apple Authorized Reseller</p>
              <p className="text-gray-500">94% Seller Score</p>
              <p className="text-gray-500">2456 Followers</p>
            </div>
            <div className="relative">
              <button 
              // className="bg-orange-400 hover:bg-orange-800 text-white text-lg font-bold py-2 px-4 rounded mt-4 mb-4  absolute bottom-0 right-0"
              className="bg-orange-500 hover:bg-orange-800 px-[30px] bg-primary  text-black text-lg dark:text-white/[.87] rounded mt-4 mb-4  absolute bottom-0 right-0"
              >
                FOLLOW
              </button>
            </div>
			</div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Seller Performance</h3>
            <div className="text-md">
			<div className="flex items-center mt-2">
              <i className="fas fa-check-circle text-green-500"></i>
              <p className="text-gray-700 ml-2">Shipping speed: Good</p>
            </div>
            <div className="flex items-center mt-2">
              <i className="fas fa-check-circle text-green-500"></i>
              <p className="text-gray-700 ml-2">Quality score: Excellent</p>
            </div>
            <div className="flex items-center mt-2">
              <i className="fas fa-check-circle text-green-500"></i>
              <p className="text-gray-700 ml-2">Customer rating: Good</p>
            </div>
			</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoSidebarRight;
