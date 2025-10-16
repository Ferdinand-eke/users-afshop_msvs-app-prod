import _ from "@lodash";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { Button, FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import { useNavigate, useParams } from "react-router";
import { useGetBookingProperty } from "app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo";
import { formatCurrency } from "../../../vendors-shop/PosUtils";
import DetailsRight from "../bookings-components/DetailsRight";
import {
  useCreateReservation,
  useGetReservations,
} from "app/configs/data/server-calls/auth/userapp/a_bookings/use-reservations";
import useCountries from "src/app/hooks/useCountries";
import { selectUser } from "src/app/auth/user/store/userSlice";
import {
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,

} from "date-fns";
import { useAppSelector } from "app/store/hooks";
import { selectFuseCurrentLayoutConfig } from "@fuse/core/FuseSettings/fuseSettingsSlice";
import { toDate } from "date-fns-tz";
// import { toDate } from ("date-fns-tz");

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

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};


const parseDateString = (dateString) => {

  const dateTimeRegex = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9](:([0-5][0-9]|60))?(\.[0-9]{1,9})?)?)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)?)?)?$/

  
  if (dateTimeRegex.test(dateString)) {
    return toDate(dateString)
  }
  return new Date(dateString)
}

/**
 * The Courses page.
 */
function BookingSinglePage(
  {
    // reservatons
  }
) {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const navigate = useNavigate();
  const routeParams = useParams();
  const { bookingId } = routeParams;
  const {
    data: booking,
    isLoading,
    isError,
  } = useGetBookingProperty(bookingId);


  const config = useAppSelector(selectFuseCurrentLayoutConfig);
  const currentUser = useAppSelector(selectUser)
  const { mutate: createReservation, isLoading: reservationLoading } =  useCreateReservation();
  const { getByValue } = useCountries();
  const { data: reservatons, isLoading: getReservationLoading } =
    useGetReservations(bookingId);

  const coordinates = getByValue(booking?.data?.data?.locationValue)?.latlng;
  // const coordinates = [booking?.data?.data?.latitude, booking?.data?.data?.longitude];

  // console.log("CORDINATES", coordinates)
//latitude
//longitude
  const disabledDates = useMemo(() => {
    let dates = [];

    reservatons?.data?.reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation?.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservatons?.data?.reservations]);

  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(booking?.data?.data?.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if(!currentUser?.name){
        navigate('/sign-in')
        return;
    }

    const formData = {
      totalPrice,
      startDate: parseDateString(dateRange?.startDate),
      endDate: parseDateString(dateRange?.endDate),
      listingId: booking?.data?.data?._id,
    };

    // console.log("creatingBooking", formData);
    // return
     return createReservation(formData);
  }, [
    totalPrice,
    dateRange,
    booking?.data?.data,
    routeParams,
    // currentUser
  ]);


  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange?.startDate,
        dateRange?.endDate
      );
      if (dayCount && booking?.data?.data?.price) {
        setTotalPrice(dayCount * booking?.data?.data?.price * -1);
      } else {
        setTotalPrice(booking?.data?.data?.price);
      }
    }
  }, [dateRange, booking?.data?.data?.price]);

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
                      booking?.data?.data?.imageSrcs[0]
                        ? booking?.data?.data?.imageSrcs[0]?.url
                        : "https://placehold.co/600x400"
                    }
                    alt="Indoor pool area"
                    className="w-full h-[230px] rounded-8 object-cover"
                  />
                  <img
                    src={
                      booking?.data?.data?.imageSrcs[1]
                        ? booking?.data?.data?.imageSrcs[1]?.url
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
                    {booking?.data?.data?.title}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {booking?.data?.data?.shortDescription}
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
                    className="bg-orange-500 text-black px-4 py-2 rounded mt-4"
                  >
                    {formatCurrency(booking?.data?.data?.price)} per night ||
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
                    {booking?.data?.data?.imageSrcs?.map((img) => (
                      <div key={img?.public_id}>
                        <img
                          src={img?.url}
                          alt="Gallery image 1"
                          className="w-full h-[130px] rounded-8 gap-4 object-cover"
                        />
                      </div>
                    ))}

                    {/* <img src="https://placehold.co/200x200" alt="Gallery image 2" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 3" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 4" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 5" className="w-full h-auto"/>
                                    <img src="https://placehold.co/200x200" alt="Gallery image 6" className="w-full h-auto"/> */}
                  </div>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Description</h2>
                  <p className="text-gray-600 mt-2">
                    {booking?.data?.data?.description}
                  </p>
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
                      <span className="text-gray-600">Based on 45 ratings</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    {isLoading ? (
                      <>
                     

                        <Box xs={24} lg={14}>
                          <p>loading...</p>
                        </Box>
                      </>
                    ) : booking?.data?.data ? (
                      <>
                        <Box>
                          <DetailsRight
                            listing={booking?.data?.data}
                            locationValue={booking?.data?.data?.locationValue}
                            coordinates={coordinates}
                            price={booking?.data?.data?.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={reservationLoading}
                            disabledDates={disabledDates}
                          />
                        </Box>
                        
                      </>
                    ) : (
                      <Box>
                        <Typography>Data Not Found</Typography>
                      </Box>
                    )}
                  </div>
                </div>

                {/* <div className="bg-white p-4 shadow-md">
                 
                  <div className="mt-4">
                    <p>MAP to show property location</p>
                   
                  </div>
                </div> */}

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

export default BookingSinglePage;
