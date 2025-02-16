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
  const { isLoading, isError, reservation } = props;


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

  if (!reservation) {
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
      <div className="h-7xl min-h-7xl max-h-7xl border-2 border-dashed rounded-2xl bg-white">
        {/* <main className="w-full p-4 overflow-y-scroll">
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
        </main> */}

        {/* <div className="flex-1   p-4 bg-white rounded-md overflow-scroll"> */}
          <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-8 ">
            <>
              <main className="w-4/4 p-4 overflow-y-scroll">
                <div className="border-b pb-4 mb-4">
                  <div className="flex">
                    <Typography
                      component={NavLinkAdapter}
                      to={`/bookings/my-reservations`}
                    >
                      {"<=="}
                    </Typography>
                    <h1 className="text-xl font-bold">Reservation Details</h1>
                  </div>
                  <p>Reservation ID: {reservation?._id}</p>
                  <p>
                    Placed on:{" "}
                    {new Date(reservation?.createdAt)?.toDateString()}
                  </p>
                  <p>Total: N {formatCurrency(reservation?.totalPrice)}</p>
                </div>
                <div className="space-y-4">
                  <div className="border p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <img
                        src={reservation?.bookingPropertyId?.imageSrcs[0]?.url}
                        alt="6-ways Adjustable Ergonomic Baby Carrier"
                        className="w-80 h-[120px] object-cover px-4"
                      />
                      <div>
                        {/* <p className="text-sm text-gray-600">
                                  Delivered between Wednesday 13 December and
                                  Friday 15 December
                                </p> */}
                        <p className="font-bold">
                          {reservation?.bookingPropertyId?.title}
                        </p>
                        <p className="text-sm">
                          Stay Period:{" "}
                          {new Date(reservation?.startDate)?.toDateString()}{" "}
                          {"to"}{" "}
                          {new Date(reservation?.endDate)?.toDateString()}
                        </p>
                        <p className="text-sm font-bold">
                          N {formatCurrency(reservation?.totalPrice)}
                        </p>

                        <div className="flex space-x-2 mt-2 md:mt-0">
                          {reservation?.isTripFullfiled && (
                            <button className="bg-orange-500 text-white px-4 py-2 rounded">
                              STAY FULLFILLED
                            </button>
                          )}
                          {!reservation?.isTripFullfiled && (
                            <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                              STAY NOT FULLFILLED
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-4">
                    <h2 className="font-bold">PAYMENT INFORMATION</h2>

                    <p className="text-sm font-bold">
                      Payment Method: {reservation?.paymentdatas?.paymentMethod}
                    </p>

                    <p className="text-sm font-bold">
                      Total Amount: N {formatCurrency(reservation?.totalPrice)}
                    </p>
                  </div>
                  <div className="border p-4">
                    <h2 className="font-bold">STAY PROGRESS</h2>

                    <p className="text-sm font-bold">
                      CHECK IN :{" "}
                      {reservation?.isCheckIn ? (
                        <span className="text-green-500">Checked-In</span>
                      ) : (
                        <span className="text-red-500">
                          Check-In Pending...
                        </span>
                      )}
                    </p>
                    <p className="text-sm font-bold">
                      CHECK OUT:{" "}
                      {reservation?.isCheckOut ? (
                        <span className="text-green-500">Checked-Out</span>
                      ) : (
                        <span className="text-red-500">
                          Check-Out Pending...
                        </span>
                      )}
                    </p>

                    <br />
                    <p className="text-[11px] text-orange-700">
                      Reservation is eligible for refund if reservation is
                      cancelled prior to 48hrs befor check-in. Access our
                      cancellation and Refund Policy.
                    </p>
                  </div>
                </div>
              </main>

              <button className="fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <i className="fas fa-comment-dots"></i>
                <span>Chat with us</span>
              </button>
            </>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default DemoContent;
