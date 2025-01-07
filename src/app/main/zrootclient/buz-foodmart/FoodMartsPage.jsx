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
import { Button, FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import useGetAllFoodMarts from "app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo";

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
function FoodMartsPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { data: AllFoodMarts, isLoading } = useGetAllFoodMarts();

  return (
    <FusePageSimple
      content={
        <>
          <div className="h-screen flex flex-col md:mx-200 mt-20">
            <div className="flex flex-1 flex-col md:flex-row">
               {/* Map */}
               <div className="w-full p-8 md:w-3/12 bg-white relative  mt-4 md:mt-0 md:sticky top-16 h-[500px] overflow-scroll">
                <h2 className="font-bold mb-4 p-4">CATEGORY</h2>
                <ul className="space-y-2 p-4">
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                </ul>
                <h2 className="font-bold mt-6 mb-4">SHIPPED FROM</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from abroad
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from Nigeria
                  </label>
                </div>
                <h2 className="font-bold mt-6 mb-4">PRICE (₦)</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="6090"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="9999999"
                  />
                  <button className="bg-orange-500 text-white px-4 py-2 rounded">
                    APPLY
                  </button>
                </div>
                <h2 className="font-bold mt-6 mb-4">DISCOUNT PERCENTAGE</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    50% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    40% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    30% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    20% or more
                  </label>
                </div>
              </div>

              {/* Main Content */}

              <main className="mt-10 md:w-3/4 p-4 rounded-md">
                <div className=" bg-white flex flex-col md:flex-row justify-between items-center mb-4 p-4">
                  <h1 className="text-[12px] font-bold">
                    Shop Online in Nigeria (8908 products found)
                  </h1>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <select className="border rounded px-4 py-2">
                      <option> Shipped from Nigeria</option>
                    </select>
                    <button className="border rounded px-4 py-2">Brand</button>
                    <button className="border rounded px-4 py-2">Price</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
                  {AllFoodMarts?.data?.data?.map((foodmart, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded shadow flex flex-col "
                    >
                      <div className="relative">
                        <img
                          src={foodmart?.imageSrcs[0]?.url}
                          alt="MacBook Pro"
                          className="w-full h-[160px] rounded-lg transition ease-in-out delay-150  hover:scale-105 object-cover"
                          height={70}
                        />
                        <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                          Black Friday deal
                        </span>
                      </div>
                      <div className="mt-4 ">
                     

                        <Typography
                          className="mt-2 text-sm font-bold cursor-pointer"
                          component={NavLinkAdapter}
                          to={`/foodmarts/listings/visit-mart/${foodmart?._id}/${foodmart?.slug}`}
                        >
                          {foodmart?.title}
                        </Typography>
                     

                        
                      </div>

                      <div className="flex justify-between items-center mt-4 bottom-0">
                          <i className="far fa-heart text-xl"></i>

                          <Button
                            className="text-black  border-orange-500 bg-orange-500 hover:bg-orange-800 px-4 py-2 rounded w-full mb-0 "
                            component={NavLinkAdapter}
                            to={`/foodmarts/listings/visit-mart/${foodmart?._id}/${foodmart?.slug}`}
                          >
                            Visit Mart
                          </Button>
                        </div>
                    </div>
                  ))}

                  
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
              </main>

              {/* Map */}
              <div className="w-full md:w-1/3 bg-gray-200 relative  mt-4 md:mt-0 md:sticky top-16 h-screen">
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-gray-700 mb-4">
                      This page can't load Google Maps correctly.
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      OK
                    </button>
                  </div>
                </div>
                <img
                  src="https://placehold.co/400x600"
                  alt="Map placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default FoodMartsPage;
