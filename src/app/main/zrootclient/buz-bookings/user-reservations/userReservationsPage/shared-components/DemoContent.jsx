import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import ReservationCard from "../../../bookings-components/ReservationCard";

/**
 * Demo Content
 */
function DemoContent(props) {
  const { isLoading, isError, products } = props;

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
        <ClienttErrorPage message={"Error occurred while retriving reservations"} />
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
          No listings found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="flex-auto p-24 sm:p-40 ">
      <div className="h-7xl min-h-7xl max-h-7xl border-2 border-dashed rounded-2xl">
       
        <main className="w-full p-4 overflow-y-scroll">
          <h1 className="text-xl font-bold mb-4">Reservations</h1>
          <div className="flex space-x-8 mb-4">
            <button className="border-b-2 text-[11px] border-orange-500 pb-2">
              ONGOING/FULLFILED RESERVATIONS {products?.length}
            </button>
            <button className="text-[11px] pb-2">
              CANCELED/RESERVATIONS (11)
            </button>
          </div>
          
          <div className="space-y-4">
            {products?.map((trip) => (
              <div className="bg-white p-4 rounded shadow mb-8" key={trip?._id}>
                <ReservationCard placedReservation={trip} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DemoContent;
