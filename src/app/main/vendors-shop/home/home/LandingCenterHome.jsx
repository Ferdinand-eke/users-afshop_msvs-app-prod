import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { lighten, ThemeProvider } from "@mui/material/styles";
import { selectMainThemeDark } from "@fuse/core/FuseSettings/fuseSettingsSlice";
import { OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useAppSelector } from "app/store/hooks";
import FaqList from "../faqs/FaqList";
import { useGetHelpCenterMostlyFaqsQuery } from "../HelpCenterApi";
import ModernPricingPage from "../modern/ModernPricingPage";

/**
 * The help center home.
 */
function LandingCenterHome() {
  const mainThemeDark = useAppSelector(selectMainThemeDark);
  const { data: faqsMost } = useGetHelpCenterMostlyFaqsQuery();

  const stepsToUnboard = [
    {
      id: 1,
      hint: "Register, setup a shop and list your products",
      description: `* Register your business for free and create a product catalogue.
			 Get free training on how to run your online business.
			 * Our AfricanShop Advisors will help you at every step and fully assist you in taking your business online`,
    },
    {
      id: 2,
      hint: `Receive orders and sell your product`,
      description: `* Receive orders from intending buyers,
			 package products ordered and make available at our order collation units within your market,
			 then sit back and monitor the process as we handle delivery from here.`,
    },
    {
      id: 3,
      hint: `Package and ship with ease`,
      description: `* Sit back and monitor the process on your seller dashboard as we handle delivery from packaging,
			 shipping and delivery.`,
    },
    {
      id: 4,
      hint: `Receive Payments and Withdraw.`,
      description: `* Receive Payments and on your shop dashboard and then cash out on delivered orders into your shop wallet.
			* Withdraw from your Shop wallet and receive payment into your local bank account within 1-2 working day(s)`,
    },
  ];

  return (
    <div className="flex flex-col flex-auto min-w-0">
      <ThemeProvider theme={mainThemeDark}>
        <Box
          className="relative pt-32 pb-112 px-16 sm:pt-80 sm:pb-192 sm:px-64 overflow-hidden"
          sx={{
            backgroundColor: "primary.dark",
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.primary.main),
          }}
        >
          <div className="flex flex-col items-center justify-center  mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0 } }}
            >
              <Typography color="inherit" className="text-18 font-semibold">
                 BECOME A PART OF OUR COMMUNITY, AS WE DRIVE AFRICA'S TRADE HUB 
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0 } }}
            >
              <Typography className="mt-4 text-24 sm:text-32 font-extrabold tracking-tight leading-tight text-center">
                Millions Of Shoppers Can’t Wait To See What You Have In Store
              </Typography>
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography
                color="text.secondary"
                className="text-16 sm:text-20 mt-16 sm:mt-24 opacity-75 tracking-tight max-w-md text-center"
              >
                Our merchant account packages got you covered for businesses in
                real estate, sales, logistics and will step you through the
                process of unboarding and managing your business.
              </Typography>
            </motion.div> */}
          </div>

          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              className="text-gray-700 opacity-25"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </g>
          </svg>
        </Box>
      </ThemeProvider>

      <div className="flex flex-col items-center px-24 sm:px-40">
        <div className=" gap-y-32 md:gap-y-0 md:gap-x-24 w-full max-w-sm md:max-w-4xl -mt-64 sm:-mt-120 z-999">
         
          <div className="  shadow hover:shadow-lg container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[340px]">
              <div className="md:col-span-3 bg-white p-4 rounded-lg shadow overflow-scroll">
                <ul className="space-y-4">
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-blender-phone mr-2"></i>
                    <span>Appliances</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-mobile-alt mr-2"></i>
                    <span>Phones & Tablets</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-heartbeat mr-2"></i>
                    <span>Health & Beauty</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-home mr-2"></i>
                    <span>Home & Office</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-tv mr-2"></i>
                    <span>Electronics</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-tshirt mr-2"></i>
                    <span>Fashion</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    <span>Supermarket</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-laptop mr-2"></i>
                    <span>Computing</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-baby mr-2"></i>
                    <span>Baby Products</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-gamepad mr-2"></i>
                    <span>Gaming</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-guitar mr-2"></i>
                    <span>Musical Instruments</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-ellipsis-h mr-2"></i>
                    <span>Other categories</span>
                  </li>

				  {/* after i add links */}
				  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-tshirt mr-2"></i>
                    <span>Fashion</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    <span>Supermarket</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-laptop mr-2"></i>
                    <span>Computing</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-baby mr-2"></i>
                    <span>Baby Products</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-gamepad mr-2"></i>
                    <span>Gaming</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-guitar mr-2"></i>
                    <span>Musical Instruments</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-ellipsis-h mr-2"></i>
                    <span>Other categories</span>
                  </li>
				  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-tshirt mr-2"></i>
                    <span>Fashion</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    <span>Supermarket</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-laptop mr-2"></i>
                    <span>Computing</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-baby mr-2"></i>
                    <span>Baby Products</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-gamepad mr-2"></i>
                    <span>Gaming</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-guitar mr-2"></i>
                    <span>Musical Instruments</span>
                  </li>
                  <li className="flex items-center  px-4 rounded-4 hover:bg-orange-500 cursor-pointer">
                    <i className="fas fa-ellipsis-h mr-2"></i>
                    <span>Other categories</span>
                  </li>
				  
                </ul>
              </div>
              <div className="md:col-span-6 h-full">
                <div className="bg-orange-500 text-white p-6 rounded-lg shadow  h-full">
                  <h1 className="text-4xl font-bold">Fresh Deals</h1>
                  <p className="text-xl mt-2">
                    Kickstart your year with our{" "}
                    <span className="font-bold">new offers</span>
                  </p>
                  <p className="mt-4">January 6 - 12</p>
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="TV & Audio Deals"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col md:col-span-3 space-y-8">
                <div className="bg-gray-200 rounded-4 p-4 gap-4 space-y-8">
                  <div className="bg-white p-4 rounded-lg shadow transition ease-in-out delay-150  hover:scale-105 cursor-pointer">
                    <div className="flex items-center">
                      <i className="fas fa-phone-alt mr-2"></i>
                      <span>CALL TO ORDER</span>
                    </div>
                    <p className="mt-2">0700-600-0000, 020188...</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow hover:bg-orange-500 cursor-pointer">
                    <div className="flex items-center">
                      <i className="fas fa-store mr-2"></i>
                      <span>Trade Deals on Africanshops</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow transition ease-in-out delay-150  hover:scale-105 cursor-pointer">
                    <div className="flex items-center">
                      <i className="fas fa-tags mr-2"></i>
                      <span>Best Deals</span>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-500 text-white p-4 rounded-lg shadow h-full">
                  <div className="flex items-center">
                    <i className="fas fa-star mr-2"></i>
                    <span>AFRICANSHOPS FORCE</span>
                  </div>
                  <p className="mt-2">JOIN NOW</p>
                </div>
              </div>
            </div>



            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg shadow transition ease-in-out delay-150  hover:scale-105 cursor-pointer">
                <img
                  src="https://plus.unsplash.com/premium_photo-1699855177060-7202c67834b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNob3AlMjBiYW5uZXJzfGVufDB8fDB8fHww"
                  alt="TV & Audio Deals"
                  className="rounded-lg h-[140px]"
                />
                <p className="text-center mt-2">TV & Audio Deals</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow transition ease-in-out delay-150  hover:scale-105 cursor-pointer">
                <img
                  src="https://placehold.co/200x200"
                  alt="New Arrival"
                 className="rounded-lg h-[140px]"
                />
                <p className="text-center mt-2">New Arrival</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow transition ease-in-out delay-150  hover:scale-105 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1644161170685-2f5678222db8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNob3AlMjBiYW5uZXJzfGVufDB8fDB8fHww"
                  alt="Clearance Sale"
                 className="rounded-lg h-[140px]"
                />
                <p className="text-center mt-2">Clearance Sale</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow transition ease-in-out delay-150  hover:scale-105 cursor-pointer">
                <img
                  src="https://placehold.co/200x200"
                  alt="Phones & Tablets Deals"
                 className="rounded-lg h-[140px]"
                />
                <p className="text-center mt-2">Phones & Tablets Deals</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow transition ease-in-out delay-150  hover:scale-105 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1644161170685-2f5678222db8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNob3AlMjBiYW5uZXJzfGVufDB8fDB8fHww"
                  alt="Appliances Deals"
                 className="rounded-lg h-[140px]"
                />
                <p className="text-center mt-2">Appliances Deals</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow transition ease-in-out delay-150  hover:scale-105 cursor-pointer">
                <img
                  src="https://placehold.co/200x200"
                  alt="Beverages"
                 className="rounded-lg h-[140px]"
                />
                <p className="text-center mt-2">Beverages</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Typography className="mt-96 px-16 text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-center">
        HOW IT WORKS
      </Typography>
      <Typography
        className="mt-8 px-16 text-xl text-center"
        color="text.secondary"
      >
        Easy to start selling online on AfricanShops, just 4 simple steps
      </Typography> */}

      <div className="flex flex-col w-full px-16 items-center my-16">
        <FaqList className="w-full max-w-4xl" list={stepsToUnboard} />
      </div>

      {/* <ModernPricingPage /> */}
    </div>
  );
}

export default LandingCenterHome;
