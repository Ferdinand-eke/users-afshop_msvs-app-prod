import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";


// import ClienttErrorPage from "../../components/ClienttErrorPage";
import { Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";

/**
 * Demo Content
 */
function DemoContent(props) {
  const {isLoading,
    // isError, 
    products, } = props



  // if (isError) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-col flex-1 items-center justify-center h-full"
  //     >
  //       <ClienttErrorPage message={"Error occurred while retriving products"} />
  //     </motion.div>
  //   );
  // }


  let productItemsView;

  if (!isLoading) {
      if (products && products.length > 0) {
        productItemsView = products?.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded shadow flex flex-wrap ">
            <div className="relative w-full">
              <img
                src={product?.image}
                alt="MacBook Pro"
                className="w-full h-[160px] rounded-lg transition ease-in-out delay-150  hover:scale-105 object-cover"
                height={70}
              />
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                Black Friday deal
              </span>
            </div>
            <div className="mt-4">
              {/* <Typography className="bg-blue-500 text-white text-xs px-2 py-1 rounded w-fit"
         
              >
                {product?.shop?.shopname}
              </Typography> */}

              <Typography
                className="mt-2 text-sm font-bold cursor-pointer"
                component={NavLinkAdapter}
                to={`/marketplace/product/${product?._id}/${product?.slug}`}
              >
                {product?.name} 
              </Typography>
              <p className="text-orange-500 font-bold mt-2">
                {formatCurrency(product?.price)}
              </p>
              <p className="text-gray-500 line-through">
                {formatCurrency(product?.listprice)}
              </p>
              {/* <p className="text-green-500">-70%</p> */}
              
            </div>

            <div className="flex justify-between items-center mt-4 w-full">
                <i className="far fa-heart text-xl"></i>

                <button className="text-black  border-orange-500 bg-orange-500 hover:bg-orange-800 px-4 py-2 rounded w-full mb-0 ">
                    ADD TO CART
                  </button>
              </div>
          </div>
        ));
      } else {
          productItemsView = <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          className="flex flex-col flex-1 items-center justify-center h-full"
        >
          <Typography color="text.secondary" variant="h5">
            No products products
          </Typography>
        </motion.div>;
      }
  } else {
      productItemsView = <FuseLoading />;
  }

  return (
    <div className="flex-auto p-24 sm:p-40 ">
      <div className="h-7xl min-h-7xl max-h-7xl border-2 border-dashed rounded-2xl">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {productItemsView}
        </div>
       
      </div>
    </div>
  );
}

export default DemoContent;
