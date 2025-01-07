import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";

const FoodOrderCard = ({ orderData }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex space-x-4">
        <img
          src="assets/images/afslogo/foodorder/foodordertwo.png"
          alt="6-ways Adjustable Ergonomic Baby Carrier"
          className="w-80 h-140 object-contain "
        />

        <div className="flex-1">
          <h3 className="font-bold">{orderData?.shippingAddress?.fullName}</h3>

          <p className="text-[12px]">
            Order: {orderData?.paymentResult?.reference}
          </p>
          <p className="text-[12px] text-orange-800">
            Amount: {formatCurrency(orderData?.totalPrice)}
          </p>
          {orderData?.isPaid && (
            <span className="bg-green-500 text-white text-sm px-2 py-1 rounded">
              ORDER CONFIRMED
            </span>
          )}
          {!orderData?.isPaid && (
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
              ORDER UN-CONFIRMED
            </span>
          )}
          <p className="text-md">
            On: {new Date(orderData?.createdAt)?.toDateString()}
          </p>
        </div>
        {orderData?.isPaid && (
          <Typography
            component={NavLinkAdapter}
            to={`/foodmarts/user/food-orders/${orderData?._id}/view `}
            className=" text-black"
          >
            SEE DETAILS
          </Typography>
        )}

        {!orderData?.isPaid && (
          <Typography
            component={NavLinkAdapter}
            to={`/foodmarts/review-food-cart`}
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
export default FoodOrderCard;
