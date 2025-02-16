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
import { useUserTrips } from "app/configs/data/server-calls/auth/userapp/a_bookings/use-reservations";

import OrderCard from "./components/OrderCard";
import ClienttErrorPage from "../../components/ClienttErrorPage";
import UserAccountLeads from "../../components/UserAccountLeads";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { useAppSelector } from "app/store/hooks";
import { useGetAuthUserOrders } from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";

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
function MarketplaceOrders() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const user = useAppSelector(selectUser);

  const {data:userOrders, isLoading, isError } = useGetAuthUserOrders(user?.id);

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

  if (!userOrders?.data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No reservations found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <FusePageSimple
      content={
        <>
          {/*  */}
          <div className="flex h-screen flex-col md:mx-auto mt-20">
            <div className="flex  flex-col md:flex-row gap-8">
              {/* Map */}
              <Box className="w-full md:w-1/4  bg-gray-100 relative  mt-4 md:mt-0 md:sticky top-16 md:h-[250px] gap-8">
                <UserAccountLeads />
              </Box>

              {/* Main Content */}
              <div
                className="flex-1 w-full md:w-9/12  p-4 bg-white rounded-md overflow-scroll">
                <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-8 ">
                  <>
                    <main className="w-full p-4 overflow-y-scroll">
                      <h1 className="text-xl font-bold mb-4">
                        Marketplace Orders
                      </h1>
                      <div className="flex space-x-4 mb-4">
                        <button className="border-b-2 border-orange-500 pb-2">
                          ONGOING/FULLFILED ORDERS{" "}
                          {userOrders?.data?.length}
                        </button>
                        <button className="pb-2">
                          CANCELED/ORDERS (11)
                        </button>
                      </div>
                      <div className="space-y-4">
                        {userOrders?.data?.map((order) => (
                          <div
                            className="bg-white p-4 rounded shadow mb-8"
                            key={order?._id}
                          >

                            <OrderCard orderData={order} />
                          </div>
                        ))}
                      </div>
                      <br />
                      <br />
                      <br />
                      <br />
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
              <Box className="w-full md:w-1/4  bg-gray-100 relative  mt-4 md:mt-0 md:sticky top-16 md:h-screen gap-8">
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


export default MarketplaceOrders;
