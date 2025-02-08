import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";


// import ClienttErrorPage from "../../components/ClienttErrorPage";
import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";

/**
 * Demo Content
 */
function DemoContent(props) {
  const {isLoading,isError, products, } = props


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
        <ClienttErrorPage message={"Error occurred while retriving products"} />
      </motion.div>
    );
  }

  if (!products) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No products products
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="flex-auto p-24 sm:p-40 ">
      <div className="h-7xl min-h-7xl max-h-7xl border-2 border-dashed rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {products?.map((property) => (
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
      </div>
    </div>
  );
}

export default DemoContent;
