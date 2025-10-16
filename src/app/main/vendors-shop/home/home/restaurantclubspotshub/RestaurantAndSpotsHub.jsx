import React, { useEffect, useState } from "react";
import { Button, Skeleton, Typography } from "@mui/material";

import RecommendedHead from "./rcshubcomponents/RecommendedHead";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import useGetAllFoodMarts from "app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo";

function RestaurantAndSpotsHub() {
  const { data: AllFoodMarts, isLoading, isError } = useGetAllFoodMarts();

  return (
    <div className="pt-5 w-full max-w-4xl">
      <RecommendedHead
        title="Restaurants, Clubs and Spots"
        color="bg-orange-800"
      />

      {/* <div className="carousel carousel-center bg-white w-full shadow-lg"> */}
      <div className="flex-auto p-24 sm:p-40 ">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
          {AllFoodMarts?.data?.data?.map((foodmart, index) => (
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
                  to={`/foodmarts/listings/visit-mart/${foodmart?._id}/${foodmart?.slug}`}
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

export default RestaurantAndSpotsHub;
