import FuseLoading from "@fuse/core/FuseLoading";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// import ClienttErrorPage from "../../components/ClienttErrorPage";
import { Button, Typography } from "@mui/material";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import siteStyle from "@fuse/sitestaticdata/siteStyle";
import { Link } from "react-router-dom";

/**
 * Demo Content
 */
function DemoContent(props) {
  const { isLoading, isError, bookingData } = props;

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
        <ClienttErrorPage message={"Error occurred while retriving products"} />
      </motion.div>
    );
  }

  if (!bookingData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No listing with this id
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="flex-auto p-24 sm:p-40 ">
      <div className="h-7xl min-h-7xl max-h-7xl border-2 border-dashed rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 p-8">
          {/* Put Booking Data Here */}
          <div className="col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <img
                    src={
                      bookingData?.imageSrcs[0]
                        ? bookingData?.imageSrcs[0]?.url
                        : "https://placehold.co/600x400"
                    }
                    alt="Indoor pool area"
                    className="w-full h-[230px] rounded-8 object-cover"
                  />
                  <img
                    src={
                      bookingData?.imageSrcs[1]
                        ? bookingData?.imageSrcs[1]?.url
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
                    {bookingData?.title}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {bookingData?.shortDescription}
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
                    className="bg-orange-500 hover:bg-orange-800 text-black px-4 py-2 rounded mt-4"
                  >
                    {formatCurrency(bookingData?.price)} per night ||
                    BOOK NOW
                  </Button>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Amenities</h2>
                  <ul className="list-disc list-inside mt-2 text-gray-600 p-4">
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
                  <h2 className="text-xl font-bold">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {bookingData?.imageSrcs?.map((img) => (
                      <div key={img?.public_id}>
                        <img
                          src={img?.url}
                          alt="Gallery image 1"
                          className="w-full h-[130px] rounded-8 gap-4 object-cover"
                        />
                      </div>
                    ))}

                  </div>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  {/* <h2 className="text-xl font-bold">Description</h2> */}
                  {/* <p className="text-gray-600 mt-2">
                    {bookingData?.description}
                  </p> */}
                    
                    <ProductDetailsInfo 
                    data={bookingData}
                    products={[]}
                    />

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                </div>
              </div>


        </div>
      </div>
    </div>
  );
}

export default DemoContent;


const ProductDetailsInfo = ({
  data,
  products,
  // totalReviewsLength,
  // averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="px-3 800px:px-10 py-2 rounded mb-10">
      <div className="w-full flex justify-between border-b pt-10 pb-2 space-x-4">
        <div className="relative ">
          <h5
            className={
              "text-[#000] text-[14px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Description
          </h5>
          {active === 1 ? (
            <div className={`${siteStyle.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[14px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
           Apartment Reviews 
          </h5>
          {active === 2 ? (
            <div className={`${siteStyle.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[14px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Image Gallery
          </h5>
          {active === 3 ? (
            <div className={`${siteStyle.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[12px] leading-8 pb-10 whitespace-pre-line">
            {data?.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {/* {data &&
            data?.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${item?.user?.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item?.user?.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item?.comment}</p>
                </div>
              </div>
            ))} */}
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
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-800 text-black px-4 py-2 rounded mt-4 w-full">
                      Submit Review
                    </Button>
                  </form>
                </div>

          <div className="w-full flex justify-center">
            {data && data?.reviews?.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <h3 className="text-sm">Images</h3>
          {/* <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data?.shop?._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.shop_avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${siteStyle.shop_name}`}>{data?.shop?.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    4.3
                    Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data?.shop?.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data?.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products?.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">
                  3
                  </span>
              </h5>
              <Link to="/">
                <div
                  className={`${siteStyle.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};