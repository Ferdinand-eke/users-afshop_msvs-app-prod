import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import AddToFoodCartButton from "../../components/AddToFoodCartButton";
import FoodMartDetailsWithReviews from "./FoodMartDetailsWithReviews";
import FoodMartImageGalleryView from "./FoodMartImageGalleryView";

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

  const [select, setSelect] = useState(0);
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
    <div className="flex-auto p-6 sm:p-8 ">
      <div className="h-7xl min-h-7xl max-h-7xl">
        <div className="bg-white w-full p-8 gap-6">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <img
                src={menuData?.imageSrcs[select]?.url}
                alt="Menu item image"
                className="w-full h-[400px] object-cover rounded-8 cursor-pointer transition ease-in-out delay-150 hover:scale-105"
                onClick={() => setGalleryOpen(true)}
              />

              <div className="flex mt-2 space-x-4  overflow-x-auto">
                {menuData?.imageSrcs?.map((img, index) => (
                  <img
                    key={img?.public_id}
                    src={img?.url}
                    alt="Thumbnail"
                    className="w-1/5 h-[80px] rounded-4 object-cover cursor-pointer"
                    onClick={() => setSelect(index)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-6 mt-4 lg:mt-0 px-3">
              <div className="flex items-center space-x-2">
                <Typography
                  className="bg-green-500 text-white text-sm px-3 py-1.5 rounded"
                  component={NavLinkAdapter}
                  to={`/marketplace/merchant/portal/${`Official-Store-Normencleture`}`}
                >
                  Official Store
                </Typography>
                <span className="bg-black text-white text-sm px-3 py-1.5 rounded">
                  Black Friday deal
                </span>
              </div>
              <h1 className="text-3xl font-bold mt-3">{menuData?.title}</h1>
              <p className="text-gray-800 text-base mt-2">
                Brand: Apple |{" "}
                <Typography className="text-orange-500 text-base inline">
                  Similar products from {menuData?.title}
                </Typography>
              </p>

              <div className="flex flex-wrap items-baseline gap-3 mt-4">
                <span className="text-4xl font-bold text-black-500">
                  ₦ {formatCurrency(menuData?.price)}
                </span>
                <span className="text-base text-gray-600">
                  per {menuData?.unitPerQuantity}
                </span>
                {menuData?.listprice && (
                  <>
                    <span className="text-gray-500 line-through text-xl">
                      ₦ {formatCurrency(menuData?.listprice)}
                    </span>
                    <span className="text-white bg-red-500 text-sm px-3 py-1 rounded">
                      -70%
                    </span>
                  </>
                )}
              </div>
              <div className="border-b-2 pb-3">
                <p className="text-black-800 mt-3 text-lg">
                  In-Stock:{" "}
                  <Typography className="text-black-500 text-base inline font-semibold">
                    {menuData?.quantity} {menuData?.unitPerQuantity} left
                  </Typography>
                </p>
                <p className="text-black-300 text-base inline">
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
                <span className="text-gray-500 ml-2 text-base">
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

              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">PROMOTIONS</h2>
                <ul className="list-disc list-inside text-gray-700 text-base gap-4 space-y-4">
                  <li className="flex items-center space-x-3 p-3 rounded-md relative bg-white hover:bg-orange-300 py-3 px-4 cursor-pointer transition-colors">
                    <i className="fas fa-user text-base"></i>
                    My Call 0708-720-0297 To Place Your Order Account
                  </li>
                  <li className="flex items-center space-x-3 p-3 rounded-md relative bg-white hover:bg-orange-300 py-3 px-4 cursor-pointer transition-colors">
                    <i className="fas fa-user text-base"></i>
                    Need extra money? Loan up to N500,000 on the Africanshops Wallet
                    Android app.
                  </li>
                  <li className="flex items-center space-x-3 p-3 rounded-md relative bg-white hover:bg-orange-300 py-3 px-4 cursor-pointer transition-colors">
                    <i className="fas fa-user text-base"></i>
                    Enjoy cheaper shipping fees when you select a PickUp Station
                    at checkout.
                  </li>


                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row p-0 ">
          <div className="w-full bg-white shadow-md rounded-lg mb-4 md:mb-0">
            <FoodMartDetailsWithReviews menuData={menuData} />
          </div>
        </div>

        {/* Image Gallery Modal */}
        <FoodMartImageGalleryView
          open={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          images={menuData?.imageSrcs || []}
          menuData={{
            title: menuData?.title,
            description: menuData?.description,
            price: menuData?.price,
            listprice: menuData?.listprice,
            rating: 4.3,
            reviewCount: 24,
          }}
        />
      </div>
    </div>
  );
}

export default DemoContent;
