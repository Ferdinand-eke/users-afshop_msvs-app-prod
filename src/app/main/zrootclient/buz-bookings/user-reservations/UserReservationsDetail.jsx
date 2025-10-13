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
import { useGetUserSingleTrip, useUserTrips } from "app/configs/data/server-calls/auth/userapp/a_bookings/use-reservations";
import ReservationCard from "../bookings-components/ReservationCard";
import ClienttErrorPage from "../../components/ClienttErrorPage";
import { useParams } from "react-router";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";

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
function UserReservationsDetail() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  // const { data: myreservations, isLoading, isError } = useUserTrips();

  const routeParams = useParams();
  const { reservationId } = routeParams;

  const {
    data: reservation,
    isLoading,
    isError,
  } = useGetUserSingleTrip(reservationId);


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
          message={" Error occurred while retriving your reservations"}
        />
      </motion.div>
    );
  }


  if (!reservation?.data?.reservation) {
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
                <aside className="w-full bg-white p-6 rounded-8 mb-8">
                  <ul className="space-y-4 px-2">
                    <li className="flex items-center space-x-2">
                      <i className="fas fa-user"></i>
                      <span>My Africanshops Account</span>
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
                  <div className="mt-8 px-2">
                    <p>Account Management</p>
                    <p>Address Book</p>
                  </div>
                  <button className="mt-8 text-red-500 px-2">LOGOUT</button>
                </aside>
              </Box>

              {/* Main Content */}
              <div
                className="flex-1 w-full md:w-6/12  p-6 bg-white rounded-md overflow-scroll">
                <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-8">
                  <>
                    <main className="w-4/4 p-4 overflow-y-scroll px-2">
                   

                        <div className="border-b pb-4 mb-4 px-3">
                        <div className="flex">
                          <Typography
                              component={NavLinkAdapter}
                              to={`/bookings/my-reservations`}
                          >{"<=="}</Typography>
                          <h1 className="text-xl font-bold ml-2">Reservation Details</h1>
                        </div>
                          <p className="mt-2">Reservation ID: {reservation?.data?.reservation?._id}</p>
                          <p className="mt-1">Placed on: {new Date(reservation?.data?.reservation?.createdAt)?.toDateString()}</p>
                          <p className="mt-1">Total: N {formatCurrency(reservation?.data?.reservation?.totalPrice)}</p>
                        </div>
                        <div className="space-y-4">
                          <div className="border p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <img

                                src={reservation?.data?.reservation?.bookingPropertyId?.imageSrcs[0]?.url}
                                alt="6-ways Adjustable Ergonomic Baby Carrier"
                                className="w-80 h-[120px] object-cover rounded-lg"
                              />
                              <div className="px-2">
                                {/* <p className="text-sm text-gray-600">
                                  Delivered between Wednesday 13 December and
                                  Friday 15 December
                                </p> */}
                                <p className="font-bold">
                                {reservation?.data?.reservation?.bookingPropertyId?.title}
                                </p>
                                <p className="text-sm">Stay Period: {new Date(reservation?.data?.reservation?.startDate)?.toDateString()} {"to"} {new Date(reservation?.data?.reservation?.endDate)?.toDateString()}</p>
                                <p className="text-sm font-bold">N {formatCurrency(reservation?.data?.reservation?.totalPrice)}</p>

                                <div className="flex space-x-2 mt-3 md:mt-0">
                                  {
                                    reservation?.data?.reservation?.isTripFullfiled && <button className="bg-orange-500 text-white px-4 py-2 rounded font-medium">
                                    STAY FULLFILLED
                                  </button>
                                  }
                                {
                                  !reservation?.data?.reservation?.isTripFullfiled &&   <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded font-medium">
                                  STAY NOT FULLFILLED
                                </button>
                                }
                              
                              </div>
                              </div>
                          
                            </div>
                          </div>
                          
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border p-6">
                            <h2 className="font-bold px-2">PAYMENT INFORMATION</h2>

                            <p className="text-sm font-bold px-2 mt-2">
                            Payment Method: {reservation?.data?.reservation?.paymentdatas?.paymentMethod}
                            </p>


                            <p className="text-sm font-bold px-2 mt-2">Total Amount: N {formatCurrency(reservation?.data?.reservation?.totalPrice)}</p>
                    
                          </div>
                          <div className="border p-6">
                            <h2 className="font-bold px-2">STAY PROGRESS</h2>


                            <p className="text-sm font-bold px-2 mt-2">CHECK IN : {reservation?.data?.reservation?.isCheckIn ? <span className="text-green-500">Checked-In</span>: <span className="text-red-500">Check-In Pending...</span>}</p>
                            <p className="text-sm font-bold px-2 mt-2">CHECK OUT: {reservation?.data?.reservation?.isCheckOut ? <span className="text-green-500">Checked-Out</span> : <span className="text-red-500">Check-Out Pending...</span>}</p>


                            <br/>
                            <p className="px-2">
                              Reservation is eligible for refund if reservation is cancelled prior to 48hrs befor check-in. Access our  cancellation and Refund
                              Policy.
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
              </div>

              {/* Map */}
              <Box className="w-full md:w-3/12  bg-gray-100 relative  mt-4 md:mt-0 md:sticky top-16 md:h-screen gap-8">
                <aside className="w-full bg-white p-6 rounded-8 mb-8">
                  <ul className="space-y-4 px-2">
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
                  <div className="mt-8 px-2">
                    <p>Account Management</p>
                    <p>Address Book</p>
                  </div>
                  <button className="mt-8 text-red-500 px-2">LOGOUT</button>
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

export default UserReservationsDetail;
