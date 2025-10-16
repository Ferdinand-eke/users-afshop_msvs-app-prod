import { useState } from "react";
import { Typography, IconButton, Button } from "@mui/material";
// import {
//   FavoriteBorder,
//   Favorite,
//   NavigateBefore,
//   NavigateNext,
// } from "@mui/icons-material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";

/**
 * ProductCard Component
 * Displays hotel/apartment listing with image slider
 */
function ProductCard({
  id,
  slug,
  image,
  name,
  price,
  address,
  listprice,
  unitweight,
}) {


    
  return (
    <>
      <div
        // key={index}
        className="bg-white p-6 rounded shadow flex flex-col relative"
      >
        <div className="relative">
          <img
            src={image}
            alt="MacBook Pro"
            className="w-full h-[160px] rounded-lg transition ease-in-out delay-150  hover:scale-105 object-cover"
            height={70}
          />
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            Black Friday deal
          </span>
        </div>
        <div className="mt-4 ">
          {/* <Typography
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded w-fit"
                    component={NavLinkAdapter}
                    to={`/marketplace/merchant/${product?.shop?._id}/portal`}
                  >
                    {product?.shop?.shopname}
                  </Typography>
                  <br /> */}

          <Typography
            className="mt-2 text-sm font-bold cursor-pointer"
            component={NavLinkAdapter}
            to={`/marketplace/product/${slug}/view`}
          >
            {name}
            {/* .slice(0,20) */}
          </Typography>
          <p className="text-orange-500 font-bold mt-2">
            ₦ {formatCurrency(price)}{" "}
            <span className="text-[10px]"> per {unitweight}</span>
          </p>

          {listprice && (
            <>
              <p className="text-gray-500 line-through">
                ₦ {formatCurrency(listprice)}
              </p>
            </>
          )}

          {/* <p className="text-green-500">-70%</p> */}
        </div>
        <div className="flex justify-between items-center mt-4 bottom-0">
          <Button
            size="small"
            className="text-black  border-orange-500 bg-orange-500 hover:bg-orange-800 px-4 py-2 rounded w-full mb-2 absolute bottom-0 right-0 left-0"
          >
            ADD TO CART
          </Button>

          <i className="far fa-heart text-xl"></i>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
