import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Typography } from "@mui/material";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";

const ReservationCard = ({ placedReservation }) => {
 

  return (
    <>
      <div className="flex space-x-4 p-4">
        {/* <img
          src={placedReservation?.bookingPropertyId?.imageSrcs[0]?.url}
          alt="6-ways Adjustable Ergonomic Baby Carrier"
          className="w-80 h-140 object-cover"
        /> */}

        <div className="flex-1 px-2">
          {/* <h3 className="font-bold">
            {placedReservation?.bookingPropertyId?.title}
          </h3> */}
          <p className="text-[12px] mb-2">
            Booking Fee: ₦ {formatCurrency(placedReservation?.totalPrice)}
          </p>
          {placedReservation?.isPaid && (
            <span className="bg-green-500 text-white text-sm px-3 py-1 rounded">
              RESERVATION CONFIRMED
            </span>
          )}
          {!placedReservation?.isPaid && (
            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded">
              RESERVATION UN-CONFIRMED
            </span>
          )}
          <p className="text-md font-mono font-bold mt-2">
            Your Check In:{" "}
            {new Date(placedReservation?.startDate)?.toDateString()}
          </p>
          <p className="text-md font-mono font-bold mt-1">
            Your Check Out:{" "}
            {new Date(placedReservation?.endDate)?.toDateString()}
          </p>

        </div>
        {placedReservation?.isPaid && (
          <Typography
            component={NavLinkAdapter}
            to={`/bookings/${placedReservation?.id}/reservation-detail`}
            className="text-black boreder-none px-2"
          >
            <span className="bg-orange-300 hover:bg-orange-600 px-4 py-2 rounded-4">SEE DETAILS</span>
          </Typography>
        )}

        {!placedReservation?.isPaid && (
          <Typography
            component={NavLinkAdapter}
            to={`/bookings/reservation/review/${placedReservation?.id}`}
            size="small"
            className="text-orange-500 cursor-pointer px-2"
          >
            PAY
          </Typography>
        )}
      </div>
    </>
  );
};
export default ReservationCard;
