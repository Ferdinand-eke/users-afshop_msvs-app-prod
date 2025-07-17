import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Typography } from "@mui/material";
import useProductCats from "app/configs/data/server-calls/product-categories/useProductCategories";
import React from "react";
import { useParams } from "react-router";

const CategoryAndTradehub = () => {
  const routeParams = useParams();
  const { id } = routeParams;

  const { data: categoriesData, isLoading } = useProductCats();


  let categoriesView;
  if (!isLoading) {
    if (categoriesData?.data?.categories && categoriesData?.data?.categories.length > 0) {
      const items = categoriesData?.data?.categories.map((item) => (
        <li
          key={item.id}
          className={
            item.id === id
              ? "relative bg-orange-100 rounded-md hover:bg-orange-300 py-1 px-4 cursor-pointer"
              : "relative bg-white rounded-md hover:bg-orange-500 py-1 px-4 cursor-pointer"
          }
        >
          <Typography
            //  href={`/afshopcategory/${item._id}`}
            component={NavLinkAdapter}
            to={`/marketplace/products/${item?.id}/by-category`}
          >
            {item.name}
          </Typography>
        </li>
      ));
      categoriesView = <ul className="space-y-2 p-4">{items}</ul>;
    } else {
    }
  } else {
    categoriesView = <p>Loading...</p>;
  }

  return (
    <>
      <div className="md:col-span-6 h-[300px]">
        <h2 className="font-bold mb-4 p-4">CATEGORY</h2>

        {categoriesView}
      </div>
    </>
  );
};

export default CategoryAndTradehub;
