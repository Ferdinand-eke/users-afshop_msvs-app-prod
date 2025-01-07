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
import useGetAllBookingProperties from "app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo";
import { formatCurrency } from "../../vendors-shop/pos/PosUtils";
import ClienttErrorPage from "../components/ClienttErrorPage";

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
function BookingsPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { data: bookingprops, isLoading, isError } = useGetAllBookingProperties();

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <ClienttErrorPage message={" Error occurred while retriving listings"}/>
      </motion.div>
    );
  }

  if (!bookingprops?.data?.data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No listings found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <FusePageSimple
      content={
        <>
         

          <div className="h-screen flex flex-col md:mx-64 mt-20">
            <div className="flex flex-1 flex-col md:flex-row gap-10">
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
              <main className="mt-10 flex-1 p-4 bg-white rounded-md">
                <div className="flex flex-col md:flex-row items-center mb-8">
                  <input
                    type="text"
                    placeholder="Start typing to search..."
                    className="flex-1 p-2 border rounded-lg mb-4 md:mb-0"
                  />
                  <div className="flex items-center ml-0 md:ml-4 space-x-4">
                    <i className="fas fa-home text-gray-500"></i>
                    <i className="fas fa-bolt text-gray-500"></i>
                    <i className="fas fa-bell text-gray-500"></i>
                    <i className="fas fa-user text-gray-500"></i>
                    <i className="fas fa-moon text-gray-500"></i>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-4">Hotels And Suites</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-scroll">
                  
                  
                {bookingprops?.data?.data?.map((property) => (
                    <div
                      className="relative flex flex-col bg-white rounded-lg shadow p-4"
                      key={property?._id}
                    >
                      <div className="relative">
                     
                           <img
                          src={property?.imageSrcs[0] ? property?.imageSrcs[0]?.url : "https://placehold.co/300x200"}
                          alt={property?.title}
                          className="w-full rounded-lg mb-8 transition ease-in-out delay-150  hover:scale-105 object-cover"
                        />
             
                       
                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          FEATURED
                        </span>
                      </div>
                      <Typography
                        className="text-lg font-semibold"
                        component={NavLinkAdapter}
                        to={`/bookings/listings/${property?._id}/${property?.slug}`}
                      >
                        {property?.title}
                      </Typography>
                      <p className="text-gray-500">{property?.address}</p>

                      <div className="flex items-center my-2">
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-gray-300"></i>
                      </div>
                      <div className="flex items-center text-gray-500 mb-2">
                        <span className="mr-4">
                          <i className="fas fa-ruler-combined"></i> 200 sq
                        </span>
                        <span className="mr-4">
                          <i className="fas fa-wifi"></i> WiFi
                        </span>
                        <span>
                          <i className="fas fa-credit-card"></i> Card
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-orange-500 text-xl font-bold">
                          ₦{formatCurrency(property?.price)}  
                        </span>
                        <span className="mr-4 font-bold">
                          <i className="fas fa-ruler-combined"></i> per night
                        </span>
                      </div>
                      <Button 
                      size="small"
                        component={NavLinkAdapter}
                        to={`/bookings/listings/${property?._id}/${property?.slug}`}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg bottom-0 h-[20px]">{`view =>`}</Button>
                    </div>
                  ))}
                  
                </div>
              </main>


              {/* Map */}
              <div className="w-full p-8 md:w-4/12 bg-white relative  mt-4 md:mt-0 md:sticky top-16 h-screen overflow-scroll">
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

export default BookingsPage;
