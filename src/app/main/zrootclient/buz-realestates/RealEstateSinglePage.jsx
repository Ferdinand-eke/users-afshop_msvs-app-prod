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
import { useParams } from "react-router";
import { useGetEstateProperty } from "app/configs/data/server-calls/auth/userapp/a_estates/useEstatePropertiesRepo";
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
function RealEstateSinglePage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const { propertyId } = routeParams;
  const {
    data: estate,
    isLoading,
    isError,
  } = useGetEstateProperty(propertyId);

  console.log("single-estate", estate?.data?.data);

  // if (isLoading) {
  //   return <FuseLoading />;
  // }

  
  return (
    <FusePageSimple
      content={
        <>
          <br />



<div className="max-w-6xl mx-auto p-4 mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <img
                    src={
                      estate?.data?.data?.images[0]
                        ? estate?.data?.data?.images[0]?.url
                        : "https://placehold.co/600x400"
                    }
                    alt="Indoor pool area"
                    className="w-full h-[230px] rounded-8 object-cover"
                  />
                  <img
                    src={
                      estate?.data?.data?.images[1]
                        ? estate?.data?.data?.images[1]?.url
                        : "https://placehold.co/600x400"
                    }
                    alt="Luxurious lobby area"
                    className="w-full h-[230px] rounded-8 object-cover"
                  />
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded">
                      FEATURED
                    </span>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star text-yellow-500"></i>
                      <i className="fas fa-star-half-alt text-yellow-500"></i>
                      <span className="ml-2 text-gray-600">4.3</span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold mt-2">
                    {estate?.data?.data?.title}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {estate?.data?.data?.shortDescription}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-600">Share:</span>
                    <i className="fab fa-facebook text-blue-600 ml-2"></i>
                    <i className="fab fa-twitter text-blue-400 ml-2"></i>
                    <i className="fab fa-instagram text-pink-600 ml-2"></i>
                    <i className="fab fa-linkedin text-blue-700 ml-2"></i>
                  </div>
                  <Button
                    size="small"
                    fullWidth
                    className="bg-orange-500 text-white px-4 py-2 rounded mt-4"
                  >
                    {formatCurrency(estate?.data?.data?.price)} 
                  </Button>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Amenities</h2>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    <li>
                      Create immersive augmented reality scenes for any focal
                      project such as animated walk throughs and product
                      visualizations.
                    </li>
                    <li>
                      After completing this course you’ll be considered to
                      create apps with a complete understanding of the
                      principles of 3D animation.
                    </li>
                    <li>
                      Create immersive augmented reality scenes for any focal
                      project such as animated walk throughs and product
                      visualizations.
                    </li>
                    <li>
                      After completing this course you’ll be considered to
                      create apps with a complete understanding of the
                      principles of 3D animation.
                    </li>
                    <li>
                      Create immersive augmented reality scenes for any focal
                      project such as animated walk throughs and product
                      visualizations.
                    </li>
                    <li>
                      After completing this course you’ll be considered to
                      create apps with a complete understanding of the
                      principles of 3D animation.
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Description</h2>
                  <p className="text-gray-600 mt-2">
                    {estate?.data?.data?.description}
                  </p>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {estate?.data?.data?.images?.map((img) => (
                      <img
                        src={img?.url}
                        alt="Gallery image 1"
                        className="w-full h-[130px] rounded-8 gap-4 object-cover"
                      />
                    ))}

                    {/* <img src="https://placehold.co/200x200" alt="Gallery image 2" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 3" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 4" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 5" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 6" className="w-full h-auto"/> */}
                  </div>
                </div>
              </div>



              <div>
                <div className="bg-white p-4 shadow-md">
                  <div className="flex items-center">
                    <span className="text-4xl font-bold">4.3</span>
                    <div className="ml-2">
                      <div className="flex items-center">
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star text-yellow-500"></i>
                        <i className="fas fa-star-half-alt text-yellow-500"></i>
                      </div>
                      <span className="text-gray-600">Booking Calendar</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <span className="text-gray-600">Support</span>
                      <div className="w-full bg-gray-200 h-2 ml-2">
                        <div
                          className="bg-yellow-500 h-2"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600">Speed</span>
                      <div className="w-full bg-gray-200 h-2 ml-2">
                        <div
                          className="bg-yellow-500 h-2"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600">Quality</span>
                      <div className="w-full bg-gray-200 h-2 ml-2">
                        <div
                          className="bg-yellow-500 h-2"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600">Delivery</span>
                      <div className="w-full bg-gray-200 h-2 ml-2">
                        <div
                          className="bg-yellow-500 h-2"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

               
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Reviews</h2>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <img
                        src="https://placehold.co/50x50"
                        alt="Reviewer 1"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="font-bold">Gold Coast</span>
                          <div className="flex items-center ml-2">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star-half-alt text-yellow-500"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aliquam egestas libero ac turpis pharetra, in
                          vehicula lacus elementum.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start mt-4">
                      <img
                        src="https://placehold.co/50x50"
                        alt="Reviewer 2"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="font-bold">Gold Coast</span>
                          <div className="flex items-center ml-2">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star-half-alt text-yellow-500"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aliquam egestas libero ac turpis pharetra, in
                          vehicula lacus elementum.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start mt-4">
                      <img
                        src="https://placehold.co/50x50"
                        alt="Reviewer 3"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="font-bold">Gold Coast</span>
                          <div className="flex items-center ml-2">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star-half-alt text-yellow-500"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aliquam egestas libero ac turpis pharetra, in
                          vehicula lacus elementum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Ask a Question</h2>
                  <form className="mt-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <textarea
                      placeholder="Message"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                    ></textarea>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default RealEstateSinglePage;
