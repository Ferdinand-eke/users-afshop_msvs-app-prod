import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import AddToFoodCartButton from "../../components/AddToFoodCartButton";

/**
 * Demo Content
 */
function DemoContent(props) {
  const {
    isLoading,
    isError,
    menuData,
    onAddToFoodCart,
    addFoodCartLoading,
    foodCart,
  } = props;

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

  if (!menuData) {
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
        <div className="bg-white w-full p-4 gap-4">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <img
                src={menuData?.imageSrcs[0]?.url}
                alt="Apple MacBook Pro 14.2-inch Liquid Retina XDR display"
                className="w-full h-[400px] object-cover rounded-8"
              />

              <div className="flex mt-2 space-x-4  overflow-x-auto">
                {menuData?.imageSrcs?.map((img) => (
                  <img
                    key={img?.public_id}
                    src={img?.url}
                    alt="Thumbnail 1"
                    className="w-1/5 h-[80px] rounded-4 object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2">
                <Typography
                  className="bg-green-500 text-white text-xs px-2 py-1 rounded"
                  component={NavLinkAdapter}
                  to={`/marketplace/merchant/portal/${`Official-Store-Normencleture`}`}
                >
                  Official Store
                </Typography>
                <span className="bg-black text-white text-xs px-2 py-1 rounded">
                  Black Friday deal
                </span>
              </div>
              <h1 className="text-2xl font-bold mt-2">{menuData?.title}</h1>
              <p className="text-gray-800 text-[12px]">
                Brand: Apple |{" "}
                <Typography className="text-orange-500 text-[12px] inline">
                  Similar products from {menuData?.title}
                </Typography>
              </p>

              <div className="flex items-center mt-2">
                <div className=" overscroll-x-contain">
                  <span className="flex text-3xl font-bold text-black-500">
                    ₦ {formatCurrency(menuData?.price)}{" "}
                    <p className="mx-4 text-sm">
                      per {menuData?.unitPerQuantity}
                    </p>
                  </span>
                </div>
                {menuData?.price && (
                  <>
                    <span className="text-gray-500 line-through ml-2">
                      ₦ {formatCurrency(menuData?.price)}
                    </span>
                    <span className="text-white bg-red-500 text-xs px-2 py-1 rounded ml-2">
                      -70%
                    </span>
                  </>
                )}
              </div>
              <div className="border-b-2">
                <p className=" text-black-800 mt-2">
                  In-Stock:{" "}
                  <Typography className="text-black-500 text-[12px] inline">
                    {menuData?.quantity} {menuData?.unitPerQuantity} left
                  </Typography>
                </p>
                <p className="text-black-300 text-[12px] inline">
                  + shipping from ₦ 1,080 to LEKKI-AJAH (SANGOTEDO)
                </p>
              </div>

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

              <AddToFoodCartButton
                onSubmit={onAddToFoodCart}
                loading={addFoodCartLoading}
                productId={menuData?.id}
                cartItems={foodCart?.cartProducts}
                 quantityLeft={menuData?.quantity}

              />

              <div className="mt-4">
                <h2 className="text-lg font-bold">PROMOTIONS</h2>
                <ul className=" list-disc list-inside text-gray-700 text-xs gap-4 space-y-4">
                  <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
                    <i className="fas fa-user"></i>
                    My Call 07006000000 To Place Your Order Account
                  </li>
                  <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
                    <i className="fas fa-user"></i>
                    Need extra money? Loan up to N500,000 on the JumiaPay
                    Android app.
                  </li>
                  <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
                    <i className="fas fa-user"></i>
                    Enjoy cheaper shipping fees when you select a PickUp Station
                    at checkout.
                  </li>

                  {/* <div className="flex flex-row ">
                    <span>#</span>
                    <li>Call 07006000000 To Place Your Order</li>
                  </div>
                  <div className="flex flex-row ">
                    <span>#</span>
                    <li>
                      Need extra money? Loan up to N500,000 on the JumiaPay
                      Android app.
                    </li>
                  </div>
                  <div className="flex flex-row ">
                    <span>#</span>

                    <li>
                      Enjoy cheaper shipping fees when you select a PickUp
                      Station at checkout.
                    </li>
                  </div> */}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col md:flex-row p-4 h-full">
          <div className="w-full  bg-white p-4 border rounded mb-4 md:mb-0">
            <h1 className="text-xl font-bold mb-4">Product details</h1>
            <div className="mb-4">
              {/* <h2 className="text-lg font-bold">{menu?.data?.name}</h2>
                  <p>{menu?.data?.description}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoContent;
