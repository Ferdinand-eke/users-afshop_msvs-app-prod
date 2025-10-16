import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// import ClienttErrorPage from "../../components/ClienttErrorPage";
import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import ProductPaginationBar from "./ProductPaginationBar";
import ProductCard from "./ProductCard";

/**
 * Demo Content
 */
function DemoContentProduct(props) {
  const {
    isLoading,
    isError,
    products,
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
  } = props;

  console.log("Products in Demo Content Product", products);

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
        <ClienttErrorPage message={"Error occurred while retriving products"} />
      </motion.div>
    );
  }

  if (!products) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No products products
        </Typography>
      </motion.div>
    );
  }

  // Fallback: if totalItems is not provided by backend, estimate based on products length
  const estimatedTotal = totalItems > 0 ? totalItems : products?.length || 0;

  return (
    <div className="flex-auto p-8 sm:p-12">
      <div className="flex flex-col">
        {/* Product Grid */}
        <div className="rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {products.map((product, index) => (
              <ProductCard
                key={product?.id || product?._id}
                id={product?.id || product?._id}
                name={product?.name}
                image={product?.image}
                slug={product?.slug}
                price={product?.price}
                address={product?.shop?.shopaddress}
                listprice={product?.listprice}
                unitweight={product?.unitweight?.unitname}
              />
            ))}
          </div>
        </div>

        {/* Pagination Bar */}
        <ProductPaginationBar
          totalItems={estimatedTotal}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </div>
  );
}

export default DemoContentProduct;
