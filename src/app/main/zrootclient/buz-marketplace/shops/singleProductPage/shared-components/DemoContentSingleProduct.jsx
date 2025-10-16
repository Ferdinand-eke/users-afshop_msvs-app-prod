import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import AddToProductCartButton from "../../components/AddToProductCartButton";
import ProductDetailsWithReviews from "./ProductDetailsWithReviews";
import ProductImageGalleryView from "./ProductImageGalleryView";

/**
 * Demo Content
 */
function DemoContentSingleProduct(props) {
  const {
    isLoading,
    isError,
    productData,
    onSubmit,
    loading,
    productId,
    cartItems,
    select,
    setSelect,
  } = props;

  const [galleryOpen, setGalleryOpen] = useState(false);

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

  if (!productData) {
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
    <div className="flex-auto p-8 sm:p-12">
      <div className="h-auto min-h-4xl">
        <div className="bg-white w-full p-6 gap-6">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <img
                src={productData?.images[select]?.url}
                alt="Apple MacBook Pro 14.2-inch Liquid Retina XDR display"
                className="w-full h-[400px] object-cover rounded-8 cursor-pointer transition ease-in-out delay-150 hover:scale-105"
                onClick={() => setGalleryOpen(true)}
              />

              <div className="flex mt-2 space-x-4  overflow-x-auto">
                {productData?.images?.map((img, index) => (
              
                  <img
                    key={img?.public_id}
                    src={img?.url}
                    alt="Thumbnail 1"
                    className="w-1/5 h-[80px] rounded-4 object-cover cursor-pointer"
                    onClick={() => setSelect(index)}
                  />
               
                  
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-6 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2">
                <Typography
                  className="bg-green-500 text-white text-sm px-3 py-1.5 rounded"
                  component={NavLinkAdapter}
                  to={`/marketplace/merchant/${productData?.shop}/portal`}
                >
                  Official Store
                </Typography>
                <span className="bg-black text-white text-sm px-3 py-1.5 rounded">
                  Black Friday deal
                </span>
              </div>
              <h1 className="text-3xl font-bold mt-4">{productData?.name}</h1>

              <p className="text-gray-800 text-[14px] mt-2">
                Brand: Apple |{" "}
                <Typography className="text-orange-500 text-[14px] inline">
                  Similar products from {productData?.name}
                </Typography>
              </p>

              <div className="flex flex-row items-center justify-between mt-4">
                <div className="overscroll-x-contain">
                  <span className="flex text-[18px] font-bold text-black-500">
                    ₦ {formatCurrency(productData?.price)}{" "}
                    <p className="mx-4 text-[14px] text-black ">
                      per {productData?.unitweight?.unitname}
                    </p>
                  </span>{" "}
                </div>
                {productData?.listprice && (
                  <>
                   <div>
                   <span className="text-gray-500 text-[16px] line-through ml-2">
                      ₦ {formatCurrency(productData?.listprice)}
                    </span>
                    <span className="text-white bg-red-500 text-sm px-3 py-1 rounded ml-2">
                      -70%
                    </span>
                   </div>
                  </>
                )}


              </div>
              <div className="border-b-2 py-3">
                <p className=" text-black-800 mt-2 text-[15px]">
                  In-Stock:{" "}
                  <Typography className="text-black-500 text-[15px] inline font-semibold">
                    {productData?.quantity} {productData?.unitPerQuantity} left
                  </Typography>
                </p>
                <p className="text-black-300 text-[14px] inline">
                  + shipping from ₦ 1,080 to LEKKI-AJAH (SANGOTEDO)
                </p>
              </div>

              <div className="flex items-center mt-4">
                <div className="flex space-x-1">
                  <i className="far fa-star text-gray-400 text-lg"></i>
                  <i className="far fa-star text-gray-400 text-lg"></i>
                  <i className="far fa-star text-gray-400 text-lg"></i>
                  <i className="far fa-star text-gray-400 text-lg"></i>
                  <i className="far fa-star text-gray-400 text-lg"></i>
                </div>
                <span className="text-gray-500 ml-2 text-[15px]">
                  (No ratings available)
                </span>
              </div>

              <AddToProductCartButton
                onSubmit={onSubmit}
                loading={loading}
                productId={productId}
                cartItems={cartItems}
                quantityLeft={productData?.quantityInStock}

              />

              <div className="mt-6">
                <h2 className="text-xl font-bold mb-3">PROMOTIONS</h2>
                <ul className=" list-disc list-inside text-gray-700 text-sm gap-4 space-y-4">
                  <li className="flex items-center space-x-3 p-3 rounded-md relative bg-white  hover:bg-orange-300 py-3 px-4 cursor-pointer">
                    <i className="fas fa-user text-base"></i>
                    My Call 07087200297 To Place Your Order Account
                  </li>
                  <li className="flex items-center space-x-3 p-3 rounded-md relative bg-white  hover:bg-orange-300 py-3 px-4 cursor-pointer">
                    <i className="fas fa-user text-base"></i>
                    Need extra money? Loan up to N500,000 on your Africanshops
                    Wallet.
                  </li>
                  <li className="flex items-center space-x-3 p-3 rounded-md relative bg-white  hover:bg-orange-300 py-3 px-4 cursor-pointer">
                    <i className="fas fa-user text-base"></i>
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

        <div className="mt-8 flex flex-col md:flex-row p-0 h-full">
          <div className="w-full bg-white shadow-md rounded-lg mb-4 md:mb-0">
            <ProductDetailsWithReviews productData={productData} />
          </div>
        </div>

        {/* Image Gallery Modal */}
        <ProductImageGalleryView
          open={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          images={productData?.images || []}
          productData={{
            name: productData?.name,
            shortDescription: productData?.shortDescription,
            price: productData?.price,
            listprice: productData?.listprice,
            rating: 4.3,
            reviewCount: 24,
          }}
        />
      </div>
    </div>
  );
}

export default DemoContentSingleProduct;
