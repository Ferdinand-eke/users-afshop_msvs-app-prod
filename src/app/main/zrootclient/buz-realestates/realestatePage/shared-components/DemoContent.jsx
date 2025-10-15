import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// import ClienttErrorPage from "../../components/ClienttErrorPage";
import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import BookingCard from "./BookingCard";
import PaginationBar from "./PaginationBar";

/**
 * Demo Content
 */
function DemoContent(props) {

  const {
    isLoading,
    isError,
    products,
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
  } = props;

  // Fallback: if totalItems is not provided by backend, estimate based on products length
  // This assumes if we get less than itemsPerPage, we're on the last page
  const estimatedTotal = totalItems > 0 ? totalItems : products?.length || 0;

  console.log('DemoContent - totalItems:', totalItems, 'products length:', products?.length, 'estimatedTotal:', estimatedTotal);

  // if (isLoading) {
  //   return <FuseLoading />;
  // }

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

  

  return (
    <div className="flex-auto p-24 sm:p-40">
      <div className="flex flex-col">
        {/* Property Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
          {products?.map((property) => (
            <BookingCard
              key={property?.id || property?._id}
              id={property?.id || property?._id}
              slug={property?.slug}
              images={property?.images || []}
              title={property?.title}
              address={property?.address}
              price={property?.price}
              roomCount={property?.roomCount}
              rating={property?.rating || 4.5}
              reviewCount={property?.reviewCount || 9}
              duration={property?.duration || "3 - 8 hours"}
              host={property?.host || "Captain"}
              leaseTerm={property?.leaseTerm || "ANNUM"}
            />
          ))}
       
        </div>


        {/* Pagination Bar - Always show for testing */}
        <PaginationBar
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

export default DemoContent;
