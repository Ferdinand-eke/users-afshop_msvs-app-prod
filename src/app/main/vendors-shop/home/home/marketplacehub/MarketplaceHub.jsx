import React, { useEffect, useState } from "react";
import { Skeleton, Typography } from "@mui/material";

import RecommendedHead from "./marketplacehubcomponents/RecommendedHead";
import useGetAllProducts from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";

function MarketplaceHub() {
  const { data: allProducts, isLoading, isError } = useGetAllProducts();

  return (
    <div className="pt-5 w-full max-w-4xl">
      <RecommendedHead title="Hottels And Apartments" color="bg-orange-800" />

      {/* <div className="carousel carousel-center bg-white w-full shadow-lg"> */}
      <div className="flex-auto p-24 sm:p-40 ">
        {/* <div className="h-7xl min-h-7xl max-h-7xl border-2 border-dashed rounded-2xl"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
            {allProducts?.data?.products.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow flex flex-col relative"
              >
                <div className="relative">
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
                <div className="mt-4 ">
                  <Typography
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded w-fit"
                    component={NavLinkAdapter}
                    to={`/marketplace/merchant/${product?.shop?._id}/portal`}
                  >
                    {product?.shop?.shopname}
                  </Typography>
                  <br />

                  <Typography
                    className="mt-2 text-sm font-bold cursor-pointer"
                    component={NavLinkAdapter}
                    to={`/marketplace/product/${product?._id}/${product?.slug}`}
                  >
                    {product?.name}
                    {/* .slice(0,20) */}
                  </Typography>
                  <p className="text-orange-500 font-bold mt-2">
                    {formatCurrency(product?.price)}{" "}
                    <span className="text-[10px]">
                      {" "}
                      per {product?.quantityunitweight?.unitname}
                    </span>
                  </p>

                  {product?.listprice && (
                    <p className="text-gray-500 line-through">
                      {formatCurrency(product?.listprice)}
                    </p>
                  )}

                  {/* <p className="text-green-500">-70%</p> */}
                </div>
                <div className="flex justify-between items-center mt-4 bottom-0">
                  <i className="far fa-heart text-xl"></i>

                  <button className="text-black  border-orange-500 bg-orange-500 hover:bg-orange-800 px-4 py-2 rounded w-full mb-2 absolute bottom-0 right-0 left-0">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default MarketplaceHub;
