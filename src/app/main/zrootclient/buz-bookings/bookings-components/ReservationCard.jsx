import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";

const ReservationCard = ({ placedReservation }) => {
  const navigate = useNavigate();

  const onViewReservationOrPay = useCallback(() => {
    if (placedReservation?.isPaid) {
      // navigate(`${CLIENT_ENDPOINTS.LACHARIZ_MY_TRACK_TRIPS}`)
      console.log("See reservation details");
    } else {
      // navigate(`${CLIENT_ENDPOINTS.LACHARIZ_REVIEW_MY_TRIP}/${placedReservation?.id}`)
      console.log("Continue to review page and make payment");
    }
  }, []);

  // console.log("placedRESERVATION-IMAGES", placedReservation)

  return (
    <>
      <div className="flex space-x-4">
        <img
          // src="https://res.cloudinary.com/dtxyw2bw3/image/upload/v1730297412/a5aisezovghikkptbnyu.jpg"
          src={placedReservation?.bookingPropertyId?.imageSrcs[0]?.url}
          alt="6-ways Adjustable Ergonomic Baby Carrier"
          className="w-80 h-140 object-cover"
        />

        <div className="flex-1">
          <h3 className="font-bold">
            {placedReservation?.bookingPropertyId?.title}
          </h3>
          {/* <p className="text-sm">
                                  Check In : {new Date(placedReservation?.startDate)?.toDateString()}
                                </p> */}
          <p className="text-[12px]">
            Booking Fee: {formatCurrency(placedReservation?.totalPrice)}
          </p>
          {placedReservation?.isPaid && (
            <span className="bg-green-500 text-white text-sm px-2 py-1 rounded">
              RESERVATION CONFIRMED
            </span>
          )}
          {!placedReservation?.isPaid && (
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
              RESERVATION UN-CONFIRMED
            </span>
          )}
          <p className="text-md">
            Your Check In:{" "}
            {new Date(placedReservation?.startDate)?.toDateString()}
          </p>
          <p className="text-md">
            Your Check Out:{" "}
            {new Date(placedReservation?.endDate)?.toDateString()}
          </p>
          {!placedReservation?.isCheckIn && (
            <Button
              size="small"
              className="bg-orange-300 hover:bg-orange-600 text-black text-sm px-2 py-1 rounded w-full"
            >
              Cancel This Reservation
            </Button>
          )}
        </div>
        {placedReservation?.isPaid && (
          <Typography
            component={NavLinkAdapter}
            to={`/bookings/${placedReservation?._id}/reservation-detail`}
            className=" text-black boreder-none"
          >
            <span className="bg-orange-300 hover:bg-orange-600 p-4 rounded-4">SEE DETAILS</span>
          </Typography>
        )}

        {!placedReservation?.isPaid && (
          <Typography
            component={NavLinkAdapter}
            to={`/bookings/reservation/review/${placedReservation?._id}`}
            // onClick={onViewReservationOrPay}
            size="small"
            className=" text-orange-500 cursor-pointer"
          >
            PAY
          </Typography>
        )}
      </div>
    </>
  );
};
export default ReservationCard;
