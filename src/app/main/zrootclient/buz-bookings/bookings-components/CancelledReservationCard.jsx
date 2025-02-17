import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Button, Typography } from "@mui/material";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";

const CancelledReservationCard = ({ placedReservation }) => {

  const requestRefund = (cancelledResercationId) => {
    if (window.confirm("Requesting a refund?")) {
      // cancelMyReservation.mutate(reservationIdPayload);
      console.log("Requesting Refund...", cancelledResercationId);
    }
  };

  return (
    <>
      <div className="flex space-x-4">
        {/* <img
          src={placedReservation?.bookingPropertyId?.imageSrcs[0]?.url}
          alt="6-ways Adjustable Ergonomic Baby Carrier"
          className="w-80 h-140 object-cover"
        /> */}

        <div className="flex-1">
          <h3 className="font-bold">
            {placedReservation?.paymentResult?.transaction}
          </h3>
          <p className="text-[12px]">
            Booking Fee: ₦ {formatCurrency(placedReservation?.totalPrice)}
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
          <p className="text-md font-mono font-bold">
            Your Check In:{" "}
            {new Date(placedReservation?.startDate)?.toDateString()}
          </p>
          <p className="text-md font-mono font-bold">
            Your Check Out:{" "}
            {new Date(placedReservation?.endDate)?.toDateString()}
          </p>
        </div>
        {placedReservation?.isPaid && !placedReservation?.isRefundRequested && (
          <Button
            className=" text-black boreder-none"
            onClick={() => requestRefund(placedReservation?._id)}
          >
            <span className="bg-orange-300 hover:bg-orange-600 text-sm p-4 rounded-4">
              Request Refund
            </span>
          </Button>
        )}
      </div>
    </>
  );
};
export default CancelledReservationCard;
