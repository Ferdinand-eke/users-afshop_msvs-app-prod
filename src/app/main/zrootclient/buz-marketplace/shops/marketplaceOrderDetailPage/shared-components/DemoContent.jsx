import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";

/**
 * Demo Content
 */
function DemoContent(props) {
  const { isLoading, isError, userOrder } = props;

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

  if (!userOrder) {
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
      <div className="h-screen border-2 border-dashed rounded-2xl bg-white">
      {/* h-7xl min-h-7xl max-h-7xl */}

      {/* Scrollable content */}
        <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-8 ">
          <>
            <main className="w-4/4 p-4 overflow-y-scroll">
              <div className="border-b pb-4 mb-4">
                <div className="flex">
                  <Typography
                    component={NavLinkAdapter}
                    to={`/marketplace/user/orders`}
                  >
                    {"<=="}
                  </Typography>
                  <h1 className="text-xl font-bold">Order Details</h1>
                </div>
                <p>
                  Reservation ID: {userOrder?.MOrder?.paymentResult?.reference}
                </p>
                <p>
                  Placed on:{" "}
                  {new Date(userOrder?.MOrder?.createdAt)?.toDateString()}
                </p>
                <p>Total: N {formatCurrency(userOrder?.MOrder?.totalPrice)}</p>
              </div>
              <div className="space-y-4">
                {userOrder?.paidOrderItems?.map((order) => (
                  <div className="border p-4" key={order?._id}>
                    <div className="flex flex-row md:flex-row justify-between items-start md:items-center">
                      <img
                        src={order?.image}
                        alt="6-ways Adjustable Ergonomic Baby Carrier"
                        className="w-full md:w-3/12 h-[120px] object-cover px-4 rounded-8"
                      />
                      <div className="w-full md:w-9/12 mx-4 p-4">
                        <p className="font-bold">{order?.name}</p>
                        <div className="flex flex-row">
                          <p className="text-sm font-bold">
                            <span className="text-[10px]">Price:</span>N{" "}
                            {formatCurrency(order?.price)}
                          </p>{" "}
                          <p className="text-sm font-bold ml-2">
                            {" "}
                            <span className="text-[10px]">Qty:</span>
                            {order?.quantity}
                          </p>
                          <p className="text-sm font-bold ml-4">
                            <span className="text-[10px]">Total:</span> N
                            {formatCurrency(order.price * order.quantity)}
                          </p>
                        </div>

                        <div className="flex space-x-2 mt-2 md:mt-0">
                          {order?.orderId?.isDelivered && (
                            <button className="bg-orange-500 text-white px-4 py-2 rounded">
                              ORDER FULLFILLED
                            </button>
                          )}
                          {!order?.orderId?.isDelivered && (
                            <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                              ORDER NOT FULLFILLED
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                   

                    {!order?.orderId?.isDelivered && (
                      <>
                        <p>{JSON.stringify(order?.orderId?.JSONisDelivered)}</p>
                        <Button
                          size="small"
                          className="mt-4 bg-orange-300 hover:bg-orange-500 text-black text-sm px-2 py-1 rounded w-full"
                        >
                          Cancel This Order
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-4">
                  <h3 className="font-bold">PAYMENT INFORMATION</h3>
                  {userOrder?.MOrder?.paymentResult?.paymentMethod && (
                    <p className="text-sm font-bold">
                      Payment Method:{" "}
                      {userOrder?.MOrder?.paymentResult?.paymentMethod}
                    </p>
                  )}

                  <p className="text-sm font-bold">
                    Total Amount: N{" "}
                    {formatCurrency(userOrder?.MOrder?.totalPrice)}
                  </p>
                </div>
                <div className="border p-4">
                  <h3 className="font-bold">ORDER PROGRESS</h3>

                  <p className="text-sm font-bold">
                    Packaged :{" "}
                    {userOrder?.MOrder?.isPacked ? (
                      <span className="text-green-500">Packaged</span>
                    ) : (
                      <span className="text-red-500">Packaging Pending...</span>
                    )}
                  </p>
                  <p className="text-sm font-bold">
                    Shipment:{" "}
                    {userOrder?.MOrder?.isShipped ? (
                      <span className="text-green-500">Shipped</span>
                    ) : (
                      <span className="text-red-500">Shipment Pending...</span>
                    )}
                  </p>

                  <p className="text-sm font-bold">
                    Warehouse Arrival:{" "}
                    {userOrder?.MOrder?.hasArrivedWarehouse ? (
                      <span className="text-green-500">Arrived</span>
                    ) : (
                      <span className="text-red-500">Arrival Pending...</span>
                    )}
                  </p>

                  <p className="text-sm font-bold">
                    Delivery:{" "}
                    {userOrder?.MOrder?.isDelivered ? (
                      <span className="text-green-500">Delivered</span>
                    ) : (
                      <span className="text-red-500">Delivery Pending...</span>
                    )}
                  </p>

                  <br />
                  {/* <p>
                    Reservation is eligible for refund if reservation is
                    cancelled prior to 48hrs befor check-in. Access our
                    cancellation and Refund Policy.
                  </p> */}
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
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
