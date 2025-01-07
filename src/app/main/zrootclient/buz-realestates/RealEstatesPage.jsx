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
import { Button, FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import useGetAllEstateProperties from "app/configs/data/server-calls/auth/userapp/a_estates/useEstatePropertiesRepo";
import { formatCurrency } from "../../vendors-shop/pos/PosUtils";

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
function RealEstatesPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { data: estates, isLoading, isError } = useGetAllEstateProperties();

  // if (isLoading) {
  //   return <FuseLoading />;
  // }

  console.log("ESTATES", estates?.data?.data);
  // {"public_id":"amefqvn4mrdws413slnd","url":"https://res.cloudinary.com/dtxyw2bw3/image/upload/v1730192929/amefqvn4mrdws413slnd.jpg"},{"public_id":"bzlceqg3lkbxyphwj1i

  return (
    <FusePageSimple
      content={
        <>
          <div className="h-screen flex flex-col md:mx-64 mt-20">
            <div className="flex flex-1 flex-col md:flex-row gap-10">
              {/* Map */}
              <div className="w-full p-8 md:w-3/12 bg-white relative  mt-4 md:mt-0 md:sticky top-16 h-[500px] overflow-scroll">
                <h2 className="font-bold mb-4 p-4">CATEGORY</h2>
                <ul className="space-y-2 p-4">
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                </ul>
                <h2 className="font-bold mt-6 mb-4">SHIPPED FROM</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from abroad
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from Nigeria
                  </label>
                </div>
                <h2 className="font-bold mt-6 mb-4">PRICE (₦)</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="6090"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="9999999"
                  />
                  <button className="bg-orange-500 text-white px-4 py-2 rounded">
                    APPLY
                  </button>
                </div>
                <h2 className="font-bold mt-6 mb-4">DISCOUNT PERCENTAGE</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    50% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    40% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    30% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    20% or more
                  </label>
                </div>
              </div>
              {/* </aside> */}

              {/* Main Content */}
              <main className="mt-10 flex-1 p-4 bg-white rounded-md">
                <div className=" bg-white flex flex-col md:flex-row justify-between items-center mb-4">
                  <h1 className="text-[14px] font-bold">
                    Shop Online in Nigeria (8908 products found)
                  </h1>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <select className="border rounded px-4 py-2">
                      <option> Shipped from Nigeria</option>
                    </select>
                    <button className="border rounded px-4 py-2">Brand</button>
                    <button className="border rounded px-4 py-2">Price</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-8">
                  {estates?.data?.data?.map((property) => (
                    <div
                      className="relative flex flex-col bg-white rounded-lg shadow p-4"
                      key={property?._id}
                    >
                      <div className="relative">
                        {
                           <img
                          src={property?.image ? property?.image : "https://placehold.co/300x200"}
                          alt={property?.title}
                          className="w-full rounded-lg mb-8 transition ease-in-out delay-150  hover:scale-105 object-cover "
                        />
                        }
                       
                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          FEATURED
                        </span>
                      </div>
                      <Typography
                        className="text-lg font-semibold"
                        component={NavLinkAdapter}
                        to={`/realestate/listings/${property?._id}/${property?.slug}`}
                      >
                        {property?.title}
                      </Typography>
                      <p className="text-gray-500">{property?.address}</p>

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
                        <span className="text-orange-500 text-xl font-bold">
                          ₦{formatCurrency(property?.price)}/Annum
                        </span>
                        
                      </div>
                      <Button 
                      size="small"
                        component={NavLinkAdapter}
                        to={`/realestate/listings/${property?._id}/${property?.slug}`}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg bottom-0 h-[20px]">{`view =>`}</Button>
                    </div>
                  ))}

                  {/* <div className="bg-white rounded-lg shadow p-4">
                    <div className="relative">
                      <img
                        src="https://placehold.co/300x200"
                        alt="Hotel with overwater bungalows"
                        className="w-full rounded-lg mb-4"
                      />
                    </div>
                    <Typography
                      className="text-lg font-semibold"
                      component={NavLinkAdapter}
                      to={`/realestate/listings/${`Himalayan-Wind-Horse-323-Geldenfe-Ave-Park`}`}
                    >
                      Himalayan Wind Horse
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                        className="w-full rounded-lg mb-4"
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
                  </div> */}
                </div>
              </main>

              {/* Map */}
              <div className="w-full p-8 md:w-4/12 bg-white relative  mt-4 md:mt-0 md:sticky top-16 h-screen overflow-scroll">
                {/* <h2 className="font-bold mb-4 p-4">CATEGORY</h2>
                <ul className="space-y-2 p-4">
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                </ul>
                <h2 className="font-bold mt-6 mb-4">SHIPPED FROM</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from abroad
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from Nigeria
                  </label>
                </div>
                <h2 className="font-bold mt-6 mb-4">PRICE (₦)</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="6090"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="9999999"
                  />
                  <button className="bg-orange-500 text-white px-4 py-2 rounded">
                    APPLY
                  </button>
                </div>
                <h2 className="font-bold mt-6 mb-4">DISCOUNT PERCENTAGE</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    50% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    40% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    30% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    20% or more
                  </label>
                </div> */}
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
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default RealEstatesPage;
