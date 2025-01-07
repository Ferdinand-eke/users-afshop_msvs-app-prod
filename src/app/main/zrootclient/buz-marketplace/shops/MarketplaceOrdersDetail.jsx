import _ from "@lodash";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { Button, FormControlLabel, Paper } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import ClienttErrorPage from "../../components/ClienttErrorPage";
import { useParams } from "react-router";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import { useGetAuthUserOrderItems } from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import UserAccountLeads from "../../components/UserAccountLeads";

const container = {
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

/**
 * The Courses page.
 */
function MarketplaceOrdersDetail() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));


  const routeParams = useParams();
  const { orderId } = routeParams;

  const {
    data: orderData,
    isLoading: orderLoading,
    isError: orderError,
  } = useGetAuthUserOrderItems(orderId);


  if (orderLoading) {
    return <FuseLoading />;
  }

  if (orderError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <ClienttErrorPage
          message={" Error occurred while retriving your order details"}
        />
      </motion.div>
    );
  }

  if (!orderData?.data?.MOrder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No reservation found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <FusePageSimple
      content={
        <>
          {/*  */}
          <div className="flex h-screen flex-col md:mx-[200px] mt-20">
            {/* flex-1 */}
            <div className="flex  flex-col md:flex-row gap-8">
              {/* Map */}
              <Box className="w-full md:w-3/12  bg-gray-100 relative  mt-4 md:mt-0 md:sticky top-16 md:h-[250px] gap-8">
               

                <UserAccountLeads />
              </Box>

              {/* Main Content */}
              <div
                className="flex-1 w-full md:w-6/12  p-4 bg-white rounded-md overflow-scroll"
              >
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
                          Reservation ID:{" "}
                          {orderData?.data?.MOrder?.paymentResult?.reference}
                        </p>
                        <p>
                          Placed on:{" "}
                          {new Date(
                            orderData?.data?.MOrder?.createdAt
                          )?.toDateString()}
                        </p>
                        <p>
                          Total: N{" "}
                          {formatCurrency(orderData?.data?.MOrder?.totalPrice)}
                        </p>
                      </div>
                      <div className="space-y-4">
                        {orderData?.data?.paidOrderItems?.map((order) => (
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
                                    <span className="text-[10px]">Total:</span>{" "}
                                    N
                                    {formatCurrency(
                                      order.price * order.quantity
                                    )}
                                  </p>
                                </div>

                                <div className="flex space-x-2 mt-2 md:mt-0">
                                  {order?.isDelivered && (
                                    <button className="bg-orange-500 text-white px-4 py-2 rounded">
                                      ORDER FULLFILLED
                                    </button>
                                  )}
                                  {!order?.isDelivered && (
                                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                                      ORDER NOT FULLFILLED
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button
                              size="small"
                              className="mt-4 bg-orange-300 hover:bg-orange-500 text-black text-sm px-2 py-1 rounded w-full"
                            >
                              Cancel This Order
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border p-4">
                          <h2 className="font-bold">PAYMENT INFORMATION</h2>
                          <p className="text-sm font-bold">
                            Payment Method:{" "}
                            {
                              orderData?.data?.MOrder?.paymentResult
                                ?.paymentMethod
                            }
                          </p>

                          <p className="text-sm font-bold">
                            Total Amount: N{" "}
                            {formatCurrency(
                              orderData?.data?.MOrder?.totalPrice
                            )}
                          </p>
                        </div>
                        <div className="border p-4">
                          <h2 className="font-bold">ORDER PROGRESS</h2>

                          <p className="text-sm font-bold">
                            CHECK IN :{" "}
                            {orderData?.data?.MOrder?.isCheckIn ? (
                              <span className="text-green-500">Checked-In</span>
                            ) : (
                              <span className="text-red-500">
                                Check-In Pending...
                              </span>
                            )}
                          </p>
                          <p className="text-sm font-bold">
                            CHECK OUT:{" "}
                            {orderData?.data?.MOrder?.isCheckOut ? (
                              <span className="text-green-500">
                                Checked-Out
                              </span>
                            ) : (
                              <span className="text-red-500">
                                Check-Out Pending...
                              </span>
                            )}
                          </p>

                          <br />
                          <p>
                            Reservation is eligible for refund if reservation is
                            cancelled prior to 48hrs befor check-in. Access our
                            cancellation and Refund Policy.
                          </p>
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
              </div>

              {/* Map */}
              <Box className="w-full md:w-3/12  bg-gray-100 relative  mt-4 md:mt-0 md:sticky top-16 md:h-screen gap-8">
                <aside className="w-full bg-white p-4 rounded-8 mb-8">
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-2">
                      <i className="fas fa-user"></i>
                      <span>My Jumia Account</span>
                    </li>
                    <li className="flex items-center space-x-2 bg-gray-200 p-2 rounded">
                      <i className="fas fa-box"></i>
                      <span>Orders</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="fas fa-envelope"></i>
                      <span>Inbox</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="fas fa-star"></i>
                      <span>Pending Reviews</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="fas fa-ticket-alt"></i>
                      <span>Voucher</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="fas fa-heart"></i>
                      <span>Saved Items</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="fas fa-store"></i>
                      <span>Followed Sellers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="fas fa-clock"></i>
                      <span>Recently Viewed</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <p>Account Management</p>
                    <p>Address Book</p>
                  </div>
                  <button className="mt-8 text-red-500">LOGOUT</button>
                </aside>
              </Box>
            </div>
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default MarketplaceOrdersDetail;
