import _ from "@lodash";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";

const container = {
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

/**
 * The Courses page.
 */
function SingleProductSecond() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  // if (isLoading) {
  //   return <FuseLoading />;
  // }

  return (
    <FusePageSimple
      
      content={
        <>
          <div className="flex flex-col md:mx-200">
            {/* top part of single product */}
            <div className="mt-10 flex flex-col lg:flex-row">
            <div className="bg-white w-full lg:w-9/12 p-4 gap-4">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <img
                    src="https://placehold.co/400x300"
                    alt="Apple MacBook Pro 14.2-inch Liquid Retina XDR display"
                    className="w-full"
                  />
                  <div className="flex mt-2 space-x-2 overflow-x-auto">
                    <img
                      src="https://placehold.co/100x100"
                      alt="Thumbnail 1"
                      className="w-1/5"
                    />
                    <img
                      src="https://placehold.co/100x100"
                      alt="Thumbnail 2"
                      className="w-1/5"
                    />
                    <img
                      src="https://placehold.co/100x100"
                      alt="Thumbnail 3"
                      className="w-1/5"
                    />
                    <img
                      src="https://placehold.co/100x100"
                      alt="Thumbnail 4"
                      className="w-1/5"
                    />
                    <img
                      src="https://placehold.co/100x100"
                      alt="Thumbnail 5"
                      className="w-1/5"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 lg:pl-4 mt-4 lg:mt-0">
                  <div className="flex items-center space-x-2">
                    <Typography className="bg-green-500 text-white text-xs px-2 py-1 rounded"
                     component={NavLinkAdapter}
                     to={`/marketplace/merchant/portal/${`Official-Store-Normencleture`}`}
                    >
                      Official Store
                    </Typography>
                    <span className="bg-black text-white text-xs px-2 py-1 rounded">
                      Black Friday deal
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold mt-2">
                    Apple MacBook Pro 14.2" M3 Chip With 8-core CPU, 10-core 8GB
                    - 1TB - Silver - 2023
                  </h1>
                  <p className="text-gray-500">
                    Brand: Apple |{" "}
                    <a href="#" className="text-blue-500">
                      Similar products from Apple
                    </a>
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-3xl font-bold text-red-500">
                      ₦ 2,999,999
                    </span>
                    <span className="text-gray-500 line-through ml-2">
                      ₦ 9,999,999
                    </span>
                    <span className="text-white bg-red-500 text-xs px-2 py-1 rounded ml-2">
                      -70%
                    </span>
                  </div>
                  <p className="text-red-500 mt-2">4 units left</p>
                  <p className="text-gray-500">
                    + shipping from ₦ 1,080 to LEKKI-AJAH (SANGOTEDO)
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex space-x-1">
                      <i className="far fa-star text-gray-400"></i>
                      <i className="far fa-star text-gray-400"></i>
                      <i className="far fa-star text-gray-400"></i>
                      <i className="far fa-star text-gray-400"></i>
                      <i className="far fa-star text-gray-400"></i>
                    </div>
                    <span className="text-gray-500 ml-2">
                      (No ratings available)
                    </span>
                  </div>
                  <button className="bg-orange-500 text-white text-lg font-bold py-2 px-4 rounded mt-4 w-full">
                    ADD TO CART
                  </button>
                  
                  <div className="mt-4">
                    <h2 className="text-lg font-bold">PROMOTIONS</h2>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Call 07006000000 To Place Your Order</li>
                      <li>
                        Need extra money? Loan up to N500,000 on the JumiaPay
                        Android app.
                      </li>
                      <li>
                        Enjoy cheaper shipping fees when you select a PickUp
                        Station at checkout.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/12 p-4">
              <div className="bg-white p-4 rounded">
                <h2 className="text-lg font-bold">DELIVERY & RETURNS</h2>
                <div className="mt-2">
                  <label className="block text-gray-700">
                    Choose your location
                  </label>
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
                      <h3 className="font-bold">Pickup Station</h3>
                      <p className="text-gray-500">Delivery Fees ₦ 1,080</p>
                      <p className="text-gray-500">
                        Arriving between 21 November & 22 November. Order within
                        3mins
                      </p>
                    </div>
                    <a href="#" className="text-blue-500">
                      Details
                    </a>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <h3 className="font-bold">Door Delivery</h3>
                      <p className="text-gray-500">Delivery Fees ₦ 1,790</p>
                      <p className="text-gray-500">
                        Ready for delivery between 21 November & 22 November
                        when you order within next 3mins
                      </p>
                    </div>
                    <a href="#" className="text-blue-500">
                      Details
                    </a>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <h3 className="font-bold">Return Policy</h3>
                      <p className="text-gray-500">
                        Free return within 7 days for ALL eligible items
                      </p>
                    </div>
                    <a href="#" className="text-blue-500">
                      Details
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded mt-4">
                <h2 className="text-lg font-bold">SELLER INFORMATION</h2>
                <p className="text-gray-700">Apple Authorized Reseller</p>
                <p className="text-gray-500">94% Seller Score</p>
                <p className="text-gray-500">2456 Followers</p>
                <button className="bg-orange-500 text-white text-lg font-bold py-2 px-4 rounded mt-4 w-full">
                  FOLLOW
                </button>
                <div className="mt-4">
                  <h3 className="font-bold">Seller Performance</h3>
                  <div className="flex items-center mt-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <p className="text-gray-700 ml-2">Shipping speed: Good</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <p className="text-gray-700 ml-2">
                      Quality score: Excellent
                    </p>
                  </div>
                  <div className="flex items-center mt-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <p className="text-gray-700 ml-2">Customer rating: Good</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* details part of single product */}
            <div className="mt-10 flex flex-col md:flex-row p-4">
                    <div className="w-full md:w-9/12 bg-white p-4 border rounded mb-4 md:mb-0">
                        <h1 className="text-xl font-bold mb-4">Product details</h1>
                        <div className="mb-4">
                            <h2 className="text-lg font-bold">Most advanced chips ever</h2>
                            <p>MacBook Pro blasts forward with the M3, M3 Pro and M3 Max chips. Built on 3-nanometre technology and featuring an all-new GPU architecture, they're the most advanced chips ever built for a personal computer. And each one brings more pro performance and capability.</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">Outstanding Graphics</h2>
                            <p>Presenting an entirely new class of GPU architecture. And the biggest breakthrough in graphics yet for Apple silicon. Dynamic Caching optimises fast on-chip memory to dramatically increase average GPU utilisation - driving a huge performance boost for the most demanding pro apps and games.</p>
                            <p>Games will look more detailed than ever thanks to hardware-accelerated mesh shading. This brings greater capability and efficiency to geometry processing, enabling games to render more visually complex scenes.</p>
                            <p>The 14-inch MacBook Pro with M3 takes power and speed to the next level, whether it’s on battery or plugged in. With a stunning Liquid Retina XDR display, all the ports you need, and all-day battery life —this pro laptop goes anywhere you need.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-2/12 md:ml-4">
                        <div className="bg-gray-100 p-4 border rounded mb-4">
                            <h2 className="text-lg font-bold mb-2">Product details</h2>
                            <ul>
                                <li className="mb-2"><i className="fas fa-file-alt mr-2"></i>Specifications</li>
                                <li className="mb-2"><i className="fas fa-comments mr-2"></i>Verified Customer Feedback</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 border rounded mb-4">
                            <img src="https://placehold.co/100x100" alt="Apple MacBook Pro 14-inch" className="mb-2"/>
                            <h2 className="text-lg font-bold">Apple MacBook Pro 14-inch</h2>
                            <p className="text-xl font-bold text-orange-600">₦ 2,999,999</p>
                            <p className="text-gray-500 line-through">₦ 9,999,999</p>
                            <p className="text-orange-600 font-bold">-70%</p>
                            <button className="bg-orange-500 text-white py-2 px-4 rounded mt-2 w-full">ADD TO CART</button>
                        </div>
                        <div className="bg-white p-4 border rounded">
                            <h2 className="text-lg font-bold mb-2">Questions about this product?</h2>
                            <button className="bg-orange-500 text-white py-2 px-4 rounded w-full">CHAT</button>
                        </div>
                    </div>
                </div>
          </div>

          

          
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default SingleProductSecond;
