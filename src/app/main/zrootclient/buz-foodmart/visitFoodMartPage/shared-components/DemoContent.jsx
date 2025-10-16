import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button, Icon, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import { useGetRCSMenuItems } from "app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo";
import { BsArrowBarRight } from "react-icons/bs";

/**
 * Demo Content
 */
function DemoContent(props) {
  const { isLoading, isError, rcsFoodMart, rcsId } = props;

  const {
    data: RcsMenu,
    isLoading: menuLoading,
    isError: menuError,
  } = useGetRCSMenuItems(rcsId);

  console.log("R-C-S DATA", RcsMenu?.data?.menus);

  if (menuLoading) {
    return <FuseLoading />;
  }

  if (menuError) {
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

  if (!RcsMenu?.data?.menus) {
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
          {RcsMenu?.data?.menus?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow flex flex-col justify-between"
            >
              <div className="relative h-[150px]">
                <img
                  src={item?.imageSrc}
                  alt="MacBook Pro"
                  className="w-full h-[150px] rounded-8 transition ease-in-out delay-150  hover:scale-105 object-cover"
                />
                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  Black Friday deal
                </span>
              </div>
              <div className="mt-4 flex flex-col">
                <div className=" justify-between">
                  <Typography className="bg-blue-500 text-white text-xs px-2 py-1 rounded w-fit">
                    Official Store
                  </Typography>

                  <Typography
                    className="mt-2 text-sm font-bold cursor-pointer"
                    component={NavLinkAdapter}
                    to={`/foodmarts/${item?.foodMartVendor}/menu/${item?.slug}/view`}
                  >
                    {item?.title}
                  </Typography>
                  <p className="text-orange-500 font-bold mt-2">
                    ₦ {formatCurrency(item?.price)}{" "}
                    <span className="text-sm">/ {item?.unitPerQuantity} </span>
                  </p>
                  {item?.listprice && (
                    <p className="text-gray-500 line-through">
                      ₦ {formatCurrency(item?.listprice)}
                    </p>
                  )}
                  {item?.listprice && <p className="text-green-500">-70%</p>}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <i className="far fa-heart text-xl"></i>
                <Button
                  size="small"
                  className="bg-orange-400 hover:bg-orange-800 text-black px-4 py-2 rounded w-full h-[20px]"
                  component={NavLinkAdapter}
                  to={`/foodmarts/${item?.foodMartVendor}/menu/${item?.slug}/view`}
                >
                  View more{" "}
                  <BsArrowBarRight />
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
