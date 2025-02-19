import React, { useEffect, useState } from "react";
import { Button, Skeleton, Typography } from "@mui/material";

import RecommendedHead from "./bookingshubcomponents/RecommendedHead";
import useGetAllProducts from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import useGetAllBookingProperties from "app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function BookingsHub() {
    const { data: bookingprops, isLoading, isError } = useGetAllBookingProperties();

  return (
    <div className="pt-5 w-full max-w-4xl">
      <RecommendedHead title="Hotels And Apartments" color="bg-orange-800" />

      {/* <div className="carousel carousel-center bg-white w-full shadow-lg"> */}
      <div className="flex-auto p-24 sm:p-40 ">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
          {bookingprops?.data?.data?.map((property) => (
            <div
              className="relative flex flex-col bg-white rounded-lg shadow p-4"
              key={property?._id}
            >
              <div className="relative">
                <img
                  src={
                    property?.imageSrcs[0]
                      ? property?.imageSrcs[0]?.url
                      : "https://placehold.co/300x200"
                  }
                  alt={property?.title}
                  className="w-full rounded-lg mb-8 transition ease-in-out delay-150  hover:scale-105 object-cover"
                />

                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  FEATURED
                </span>
              </div>
           

              <Typography className="text-gray-800 text-[12px] font-bold mt-2 mb-2 inline"
                    component={NavLinkAdapter}
                    to={`/bookings/listings/${property?._id}/${property?.slug}`}
              >
                {property?.title}
              </Typography>
              <p className="text-gray-500 text-[10px]">{property?.address}</p>

              <div className="flex items-center my-2">
                <i className="fas fa-star text-yellow-500"></i>
                <i className="fas fa-star text-yellow-500"></i>
                <i className="fas fa-star text-yellow-500"></i>
                <i className="fas fa-star text-yellow-500"></i>
                <i className="fas fa-star text-gray-300"></i>
              </div>
              <div className="flex flex-row  justify-between items-center text-gray-500 text-[12px] mb-2">
                  <div className="flex items-center justify-center">
                  <span className="mr-4">
                  <FuseSvgIcon size={10} className="ml-2 inline">heroicons-outline:home</FuseSvgIcon>{property?.roomCount}
                </span>
                  </div>
                <span className="mr-4">
                  <i className="fas fa-wifi"></i> WiFi
                </span>
                <span>
                  <i className="fas fa-credit-card"></i> Card
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-orange-500 text-sm font-bold">
                  ₦{formatCurrency(property?.price)}
                </span>
                <span className="mr-4 font-bold text-[10px]">
                  <i className="fas fa-ruler-combined "></i> per night
                </span>
              </div>
              <Button
                size="small"
                component={NavLinkAdapter}
                to={`/bookings/listings/${property?._id}/${property?.slug}`}
                className="bg-orange-500 hover:bg-orange-800 text-white px-4 py-2 rounded-lg bottom-0 h-[20px]"
              >View<FuseSvgIcon>heroicons-outline:arrow-sm-right</FuseSvgIcon></Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingsHub;
