import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import ReservationCard from "../../../bookings-components/ReservationCard";
import CancelledReservationCard from "../../../bookings-components/CancelledReservationCard";

/**
 * Demo Content
 */
function DemoContent(props) {
  const { isLoading, isError, reservations, cancelledReservations } = props;
  const [active, setActive] = useState(1);

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
        <ClienttErrorPage
          message={"Error occurred while retriving reservations"}
        />
      </motion.div>
    );
  }

  if (!reservations) {
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
            <button
              className={`border-b-2 text-[11px] ${active === 1 ? "border-orange-500" : ""}  pb-2`}
              onClick={() => setActive(1)}
            >
              ONGOING/FULLFILED RESERVATIONS {reservations?.length}
            </button>
            <button
              className={`border-b-2 text-[11px] ${active === 2 ? "border-orange-500" : ""}  pb-2`}
              onClick={() => setActive(2)}
            >
              CANCELED/RESERVATIONS {cancelledReservations?.length}
            </button>
          </div>

          {active === 1 ? (
            <>
              <div className="space-y-4">
                {reservations?.map((trip) => (
                  <div
                    className="bg-white p-4 rounded shadow mb-8"
                    key={trip?.id}
                  >
                    <ReservationCard placedReservation={trip} />
                  </div>
                ))}
              </div>
            </>
          ) : null}



          {active === 2 ? (
            <>
              <div className="space-y-4">
                {cancelledReservations?.map((trip) => (
                  <div
                    className="bg-white p-4 rounded shadow mb-8"
                    key={trip?.id}
                  >
                    <CancelledReservationCard placedReservation={trip} />
                  </div>
                ))}
                
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default DemoContent;
