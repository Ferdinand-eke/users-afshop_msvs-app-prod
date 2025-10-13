import { formatCurrency, formatDateUtil } from "src/app/main/vendors-shop/pos/PosUtils";

/**
 * PlacedReservation Component
 * Displays the reservation details with booking fee, check-in/out dates, and payment button
 */
function PlacedReservation({ reservation, onPayClick }) {
  const bookingFee = reservation?.totalPrice || 0;
  const checkInDate = reservation?.startDate?.slice(0, 10) || "";
  const checkOutDate = reservation?.endDate?.slice(0, 10) || "";
  const isPaid = reservation?.isPaid || false;

  // Format dates for display
  // const formatDateUtil = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  //   const dayName = days[date.getDay()];
  //   const monthName = months[date.getMonth()];
  //   const day = date.getDate();
  //   const year = date.getFullYear();

  //   return `${dayName} ${monthName} ${day} ${year}`;
  // };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
      <div className="border-b pb-2 mb-3">
        <h2 className="text-lg font-semibold">2. PLACED RESERVATION</h2>
      </div>

      {/* Reservation Status Badge */}
      {!isPaid && (
        <div className="mb-3">
          <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded">
            RESERVATION UN-CONFIRMED
          </span>
        </div>
      )}

      {/* Booking Fee Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2">
          <span className="text-sm font-medium text-gray-700">
            Booking Fee:
          </span>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              ₦ {formatCurrency(bookingFee)}
            </div>
            <button
              onClick={onPayClick}
              className="text-xs text-orange-600 hover:text-orange-700 font-semibold uppercase mt-1"
              disabled={isPaid}
            >
              {isPaid ? "PAID" : "PAY"}
            </button>
          </div>
        </div>
      </div>

      {/* Check-In and Check-Out Dates */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Your Check In:</span>
          <span className="font-medium text-gray-900">
            {formatDateUtil(checkInDate)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Your Check Out:</span>
          <span className="font-medium text-gray-900">
            {formatDateUtil(checkOutDate)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlacedReservation;
