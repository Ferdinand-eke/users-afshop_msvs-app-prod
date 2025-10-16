import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";

/**
 * Demo Content
 */
function DemoContent(props) {
  const { isLoading, isError, products } = props;

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
        <ClienttErrorPage message={"Error occurred while retriving listings"} />
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
          No listings found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="flex-auto p-24 sm:p-40 ">
      <div className="h-7xl min-h-7xl max-h-7xl border-2 border-dashed rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
          {products?.map((foodmart, index) => (
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
                  to={`/foodmarts/${foodmart?.slug}/visit-mart/${foodmart?.slug}`}
                >
                  Visit Mart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DemoContent;
