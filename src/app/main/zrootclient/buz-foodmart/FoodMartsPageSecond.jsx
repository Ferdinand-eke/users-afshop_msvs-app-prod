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
import { FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";

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
function FoodMartsPageSecond() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  // if (isLoading) {
  //   return <FuseLoading />;
  // }

  return (
    <FusePageSimple
      content={
        <>
          <br />

          <div className="h-screen flex flex-col mx-auto">
            {/* Top Bar */}
            <div className="h-16 bg-gray-800 text-white flex items-center px-4">
              <h1 className="text-xl font-bold">Top Bar</h1>
            </div>

            {/* Main Layout */}
            <div className="flex flex-1">
              {/* Sidebar */}
              <div className="w-full md:w-1/5 bg-white p-4 sticky top-16 h-screen overflow-y-auto">
                <div className="text-2xl font-bold text-blue-600 mb-8">
                  Categories.
                </div>
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">New Feeds</h2>
                  <ul>
                    <li className="flex items-center mb-4">
                      <i className="fas fa-newspaper text-blue-500 mr-2"></i>
                      <span>Newsfeed</span>
                    </li>
                    <li className="flex items-center mb-4">
                      <i className="fas fa-award text-orange-500 mr-2"></i>
                      <span>Badges</span>
                    </li>
                    <li className="flex items-center mb-4">
                      <i className="fas fa-compass text-yellow-500 mr-2"></i>
                      <span>Explore Stories</span>
                    </li>
                    <li className="flex items-center mb-4">
                      <i className="fas fa-users text-red-500 mr-2"></i>
                      <span>Popular Groups</span>
                    </li>
                    <li className="flex items-center mb-4">
                      <i className="fas fa-user text-blue-500 mr-2"></i>
                      <span>Author Profile</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4">More Pages</h2>
                  <ul>
                    <li className="flex items-center mb-4">
                      <i className="fas fa-envelope text-blue-500 mr-2"></i>
                      <span>Email Box</span>
                      <span className="ml-auto bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        584
                      </span>
                    </li>
                    <li className="flex items-center mb-4">
                      <i className="fas fa-hotel text-blue-500 mr-2"></i>
                      <span>Near Hotel</span>
                    </li>
                    <li className="flex items-center mb-4">
                      <i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
                      <span>Latest Event</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col md:flex-row items-center mb-8">
                  <input
                    type="text"
                    placeholder="Start typing to search..."
                    className="flex-1 p-2 border rounded-lg mb-4 md:mb-0"
                  />
                  <div className="flex items-center ml-0 md:ml-4 space-x-4">
                    <i className="fas fa-home text-gray-500"></i>
                    <i className="fas fa-bolt text-gray-500"></i>
                    <i className="fas fa-bell text-gray-500"></i>
                    <i className="fas fa-user text-gray-500"></i>
                    <i className="fas fa-moon text-gray-500"></i>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-4">
                  Restaurants And Food Vendors Around You
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Add the card elements as before */}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-scroll"> */}
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with a pool and ocean view"
                        className="rounded-lg mb-4"
                      />
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        FEATURED
                      </span>
                    </div>
                    <Typography
                      className="text-lg font-semibold"
                      component={NavLinkAdapter}
                      to={`/foodmarts/listings/visit-mart/${`Jays-Kitchen-323-Geldenfe-Ave-Park`}`}
                    >
                      Jay's Kitchen
                    </Typography>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $320/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <Typography
                      className="text-lg font-semibold"
                      component={NavLinkAdapter}
                      to={`/foodmarts/listings/visit-mart/${`Chef-Makamba-323-Geldenfe-Ave-Park`}`}
                    >
                      Chef Makamba
                    </Typography>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <Typography
                      className="text-lg font-semibold"
                      component={NavLinkAdapter}
                      to={`/foodmarts/listings/visit-mart/${`Todays-Kitchen-323-Geldenfe-Ave-Park`}`}
                    >
                      Today's Kitchen
                    </Typography>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <Typography
                      className="text-lg font-semibold"
                      component={NavLinkAdapter}
                      to={`/foodmarts/listings/visit-mart/${`HotStop-Kitchen-323-Geldenfe-Ave-Park`}`}
                    >
                      HotStop Kitchen
                    </Typography>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="rounded-lg mb-4"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">
                      Himalayan Wind Horse
                    </h2>
                    <p className="text-gray-500">
                      323 Geldenfe Ave Park, Flodia City
                    </p>
                    <div className="flex items-center my-2">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-gray-300"></i>
                    </div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="mr-4">
                        <i className="fas fa-ruler-combined"></i> 200 sq
                      </span>
                      <span className="mr-4">
                        <i className="fas fa-wifi"></i> WiFi
                      </span>
                      <span>
                        <i className="fas fa-credit-card"></i> Card
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500 text-xl font-bold">
                        $140/mo
                      </span>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">{`view =>`}</button>
                    </div>
                  </div>
                  {/* </div> */}
                  {/* ... */}
                </div>
              </div>

              {/* Map */}
              <div className="w-full md:w-1/3 bg-gray-200  sticky top-16 h-screen overflow-y-auto">
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-gray-700 mb-4">
                      This page can't load Google Maps correctly.
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      OK
                    </button>
                  </div>
                </div>
                <img
                  src="https://placehold.co/400x600"
                  alt="Map placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </>
      }
      //make sidebar static, main content scroll, and map static
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default FoodMartsPageSecond;
