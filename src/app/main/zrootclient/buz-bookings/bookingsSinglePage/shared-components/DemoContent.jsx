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
  const { isLoading, isError, bookingData } = props;

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

  if (!bookingData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No listing with this id
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="flex-auto p-24 sm:p-40 ">
      <div className="h-7xl min-h-7xl max-h-7xl border-2 border-dashed rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 p-8">
          {/* Put Booking Data Here */}
          <div className="col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <img
                    src={
                      bookingData?.imageSrcs[0]
                        ? bookingData?.imageSrcs[0]?.url
                        : "https://placehold.co/600x400"
                    }
                    alt="Indoor pool area"
                    className="w-full h-[230px] rounded-8 object-cover"
                  />
                  <img
                    src={
                      bookingData?.imageSrcs[1]
                        ? bookingData?.imageSrcs[1]?.url
                        : "https://placehold.co/600x400"
                    }
                    alt="Luxurious lobby area"
                    className="w-full h-[230px] rounded-8 object-cover"
                  />
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded">
                      FEATURED
                    </span>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star-half-alt text-yellow-500"></i>
                      <span className="ml-2 text-gray-600">4.3</span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold mt-2">
                    {bookingData?.title}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {bookingData?.shortDescription}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-600">Share:</span>
                    <i className="fab fa-facebook text-blue-600 ml-2"></i>
                    <i className="fab fa-twitter text-blue-400 ml-2"></i>
                    <i className="fab fa-instagram text-pink-600 ml-2"></i>
                    <i className="fab fa-linkedin text-blue-700 ml-2"></i>
                  </div>
                  <Button
                    size="small"
                    fullWidth
                    className="bg-orange-500 hover:bg-orange-800 text-black px-4 py-2 rounded mt-4"
                  >
                    {formatCurrency(bookingData?.price)} per night ||
                    BOOK NOW
                  </Button>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Amenities</h2>
                  <ul className="list-disc list-inside mt-2 text-gray-600 p-4">
                    <li>
                      Create immersive augmented reality scenes for any focal
                      project such as animated walk throughs and product
                      visualizations.
                    </li>
                    <li>
                      After completing this course you’ll be considered to
                      create apps with a complete understanding of the
                      principles of 3D animation.
                    </li>
                    <li>
                      Create immersive augmented reality scenes for any focal
                      project such as animated walk throughs and product
                      visualizations.
                    </li>
                    <li>
                      After completing this course you’ll be considered to
                      create apps with a complete understanding of the
                      principles of 3D animation.
                    </li>
                    <li>
                      Create immersive augmented reality scenes for any focal
                      project such as animated walk throughs and product
                      visualizations.
                    </li>
                    <li>
                      After completing this course you’ll be considered to
                      create apps with a complete understanding of the
                      principles of 3D animation.
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {bookingData?.imageSrcs?.map((img) => (
                      <div key={img?.public_id}>
                        <img
                          src={img?.url}
                          alt="Gallery image 1"
                          className="w-full h-[130px] rounded-8 gap-4 object-cover"
                        />
                      </div>
                    ))}

                    {/* <img src="https://placehold.co/200x200" alt="Gallery image 2" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 3" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 4" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 5" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 6" className="w-full h-auto"/> */}
                  </div>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Description</h2>
                  <p className="text-gray-600 mt-2">
                    {bookingData?.description}
                  </p>
                </div>
              </div>


        </div>
      </div>
    </div>
  );
}

export default DemoContent;
