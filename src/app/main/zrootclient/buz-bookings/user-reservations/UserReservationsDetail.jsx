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
                <aside className="w-full bg-white p-4 rounded-8 mb-8">
                  <ul className="space-y-4">
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
                  <div className="mt-8">
                    <p>Account Management</p>
                    <p>Address Book</p>
                  </div>
                  <button className="mt-8 text-red-500">LOGOUT</button>
                </aside>
              </Box>

              {/* Main Content */}
              <div
                className="flex-1 w-full md:w-6/12  p-4 bg-white rounded-md overflow-scroll"
                // className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent  rounded-md overflow-scroll"
              >
                <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-8 ">
                  <>
                    <main className="w-4/4 p-4 overflow-y-scroll">
                      {/* <h1 className="text-xl font-bold mb-4">Reservations</h1>
                      <div className="flex space-x-4 mb-4">
                        <button className="border-b-2 border-orange-500 pb-2">
                          ONGOING/FULLFILED RESERVATIONS {myreservations?.data?.myreservations?.length}
                        </button>
                        <button className="pb-2">
                          CANCELED/RESERVATIONS (11)
                        </button>
                      </div>
                      <div className="space-y-4">
                        {myreservations?.data?.myreservations?.map((trip) => (
                          <div
                            className="bg-white p-4 rounded shadow mb-8"
                            key={trip?._id}
                          >

                           <ReservationCard placedReservation={trip}/>
                          </div>
                        ))}

                        
                      </div> */}

                      {/* <div className="w-full md:w-4/4 bg-white p-4 shadow-md ml-0 md:ml-4"> */}
                        <div className="border-b pb-4 mb-4">
                        <div className="flex">
                          <Typography
                              component={NavLinkAdapter}
                              to={`/bookings/my-reservations`} 
                          >{"<=="}</Typography>
                          <h1 className="text-xl font-bold">Reservation Details</h1>
                        </div>
                          <p>Reservation ID: {reservation?.data?.reservation?._id}</p>
                          <p>Placed on: {new Date(reservation?.data?.reservation?.createdAt)?.toDateString()}</p>
                          <p>Total: N {formatCurrency(reservation?.data?.reservation?.totalPrice)}</p>
                        </div>
                        <div className="space-y-4">
                          <div className="border p-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                              <img
                                // src="https://res.cloudinary.com/dtxyw2bw3/image/upload/v1730297412/a5aisezovghikkptbnyu.jpg"
                                // src={placedReservation?.bookingPropertyId?.imageSrcs[0]?.url}
                                src={reservation?.data?.reservation?.bookingPropertyId?.imageSrcs[0]?.url}
                                alt="6-ways Adjustable Ergonomic Baby Carrier"
                                className="w-80 h-[120px] object-cover px-4"
                              />
                              <div>
                                {/* <p className="text-sm text-gray-600">
                                  Delivered between Wednesday 13 December and
                                  Friday 15 December
                                </p> */}
                                <p className="font-bold">
                                {reservation?.data?.reservation?.bookingPropertyId?.title}
                                </p>
                                <p className="text-sm">Stay Period: {new Date(reservation?.data?.reservation?.startDate)?.toDateString()} {"to"} {new Date(reservation?.data?.reservation?.endDate)?.toDateString()}</p>
                                <p className="text-sm font-bold">N {formatCurrency(reservation?.data?.reservation?.totalPrice)}</p>

                                <div className="flex space-x-2 mt-2 md:mt-0">
                                  {
                                    reservation?.data?.reservation?.isTripFullfiled && <button className="bg-orange-500 text-white px-4 py-2 rounded">
                                    STAY FULLFILLED
                                  </button>
                                  }
                                {
                                  !reservation?.data?.reservation?.isTripFullfiled &&   <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                                  STAY NOT FULLFILLED
                                </button>
                                }
                              
                              </div>
                              </div>
                              {/* <div className="flex space-x-2 mt-2 md:mt-0">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                                  TRACK MY ITEM
                                </button>
                                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                                  CANCEL ITEM
                                </button>
                              </div> */}
                            </div>
                          </div>
                          {/* <div className="border p-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <img
                                src="https://res.cloudinary.com/dtxyw2bw3/image/upload/v1730297412/a5aisezovghikkptbnyu.jpg"
                  
                                alt="6-ways Adjustable Ergonomic Baby Carrier"
                                className="w-80 h-[120px] object-cover px-4"
                              />
                              <div>
                                <p className="text-sm text-gray-600">
                                  On Tuesday, 03-12
                                </p>
                                <p className="font-bold">
                                  NICE BABY CAR SEATER
                                </p>
                                <p className="text-sm">Qty: 1</p>
                                <p className="text-sm font-bold">N 7,500</p>
                              </div>
                              <div className="flex space-x-2 mt-2 md:mt-0">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                                  BUY AGAIN
                                </button>
                                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                                  SEE STATUS HISTORY
                                </button>
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="border p-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <img
                                src="https://res.cloudinary.com/dtxyw2bw3/image/upload/v1730297412/a5aisezovghikkptbnyu.jpg"
                            
                                alt="6-ways Adjustable Ergonomic Baby Carrier"
                                className="w-80 h-[120px] object-cover px-4"
                              />
                              <div>
                                <p className="text-sm text-gray-600">
                                  On Tuesday, 03-12
                                </p>
                                <p className="font-bold">
                                  Trendy Deep Fryer Non-Sticky For Homes
                                </p>
                                <p className="text-sm">Qty: 1</p>
                                <p className="text-sm font-bold">N 3,800</p>
                              </div>
                              <div className="flex space-x-2 mt-2 md:mt-0">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                                  BUY AGAIN
                                </button>
                                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
                                  SEE STATUS HISTORY
                                </button>
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border p-4">
                            <h2 className="font-bold">PAYMENT INFORMATION</h2>
                            {/* <p>Payment Method</p> */}
                            {/* <p>Payment Details</p> */}
                            <p className="text-sm font-bold">
                            Payment Method: {reservation?.data?.reservation?.paymentdatas?.paymentMethod}
                            </p>
                           
                            
                            <p className="text-sm font-bold">Total Amount: N {formatCurrency(reservation?.data?.reservation?.totalPrice)}</p>
                            {/* <p>Delivery Fees: N 420</p> */}
                          </div>
                          <div className="border p-4">
                            <h2 className="font-bold">STAY PROGRESS</h2>
                            {/* <p>Delivery Method</p>
                            <p>Door Delivery</p>
                            <p>Shipping Address</p>
                            <p>123, Random Street</p>
                            <p>City, State</p>
                            <p>Country</p>
                            <p>Delivery Details</p> */}
                           
                            <p className="text-sm font-bold">CHECK IN : {reservation?.data?.reservation?.isCheckIn ? <span className="text-green-500">Checked-In</span>: <span className="text-red-500">Check-In Pending...</span>}</p>
                            <p className="text-sm font-bold">CHECK OUT: {reservation?.data?.reservation?.isCheckOut ? <span className="text-green-500">Checked-Out</span> : <span className="text-red-500">Check-Out Pending...</span>}</p>
                            {/* <p>Delivery 3: Fulfilled by vendor</p> */}

                            <br/>
                            <p>
                              Reservation is eligible for refund if reservation is cancelled prior to 48hrs befor check-in. Access our  cancellation and Refund
                              Policy.
                            </p>
                          </div>
                        </div>
                      {/* </div> */}
                    </main>
                    {/* </div> */}
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

export default UserReservationsDetail;
