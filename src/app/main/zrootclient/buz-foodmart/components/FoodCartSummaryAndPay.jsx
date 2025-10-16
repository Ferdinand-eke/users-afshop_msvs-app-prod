import _ from "@lodash";
import { Button, Typography } from "@mui/material";
import { usePayAndPlaceFoodOrder } from "app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo";
import { usePayAndPlaceOrder } from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { useAppSelector } from "app/store/hooks";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
import { selectUser } from "src/app/auth/user/store/userSlice";
import {
  calculateCartTotalAmount,
  formatCurrency,
  generateClientUID,
  getFoodVendorSession,
  getShoppingSession,
} from "src/app/main/vendors-shop/PosUtils";
const FoodCartSummaryAndPay = ({
  intemsInCart,
  methodOfPay,
  name,
  phone,
  address,
  orderCountryDestination,
  orderStateProvinceDestination,
  orderLgaDestination,
  orderMarketPickupDestination,
  district,

  dirtyFields,
  isValid,
}) => {


  const user = useAppSelector(selectUser);

  let checkItemsArrayForTotal = [];
  intemsInCart?.forEach((element) => {
    checkItemsArrayForTotal?.push({
      quantity: element?.quantity,
      price: element?.martMenu?.price,
    });
  });


  // console.log("foodMart__Review", intemsInCart)

  const totalAmount = calculateCartTotalAmount(checkItemsArrayForTotal);
  const delivery = 1000;
  const vat = 800;
  // const publicKey = "pk_test_2af8648e2d689f0a4d5263e706543f3835c2fe6a";

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY; 

  const { mutate: verifyPaymentAndCreateOrder, isLoading:payFoodLoading } = usePayAndPlaceFoodOrder();



  const onSuccess = async (paystackResponse) => {
    const payloadData = getFoodVendorSession();

    try {

      const oderData = {
        refOrderId: "AFSH" + generateClientUID() + "FMKT",
        foodCartItems: intemsInCart,

        itemsPrice: parseInt(totalAmount),
        shippingPrice: delivery,
        taxPrice: vat,
        totalPrice: parseInt(totalAmount) + parseInt(delivery) + parseInt(vat),

        orderCountryDestination: orderCountryDestination,
        orderStateProvinceDestination: orderStateProvinceDestination,
        orderLgaDestination: orderLgaDestination,
        orderMarketPickupDestination: orderMarketPickupDestination,
        district,

        paymentMethod: methodOfPay,
        shoppingLgaSession: payloadData?.shopLgaProvinceOrigin,
        paymentResult: paystackResponse,
        shippingAddress: {
          fullName: name,
          phone: phone,
          address: address,
        },
        foodMart:  payloadData?.foodMartId,
        reference:paystackResponse?.reference
      };

       verifyPaymentAndCreateOrder(oderData);
    } catch (error) {}
  };
  const onClose = () => {
    alert("Wait! You need this order confirmed, don't go!!!!");
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Food Cart Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span className="font-semibold">₦{formatCurrency(totalAmount)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Fees</span>
          <span className="font-semibold">₦{formatCurrency(delivery)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>V.A.T</span>
          <span className="font-semibold">₦{formatCurrency(vat)}</span>
        </div>
        <div className="flex justify-between font-semibold mb-4">
          <p>Grand Total</p>

          {(totalAmount && (totalAmount > 0)) &&  <p className="text-orange-800">
            ₦
            {formatCurrency(
              parseInt(totalAmount) + parseInt(delivery) + parseInt(vat)
            )}
          </p>}
         
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter code here"
            className="border p-2 flex-grow mr-2"
          />
          <button className="bg-gray-200 p-2">APPLY</button>
        </div>
       
        {methodOfPay === "FLUTTERWAVE" && (
          <button className="bg-orange-500 hover:bg-orange-800 text-white w-full p-2 rounded-lg">
            Pay WIth Flutterwave ₦
            {formatCurrency(
              parseInt(totalAmount) + parseInt(delivery) + parseInt(vat)
            )}
          </button>
        )}
        {methodOfPay === "PAYONDELIVERY" && (
          <button className="bg-orange-500 hover:bg-orange-800 text-white w-full p-2 rounded-lg">
            Pay On Delivery ₦
            {formatCurrency(
              parseInt(totalAmount) + parseInt(delivery) + parseInt(vat)
            )}
          </button>
        )}
        {methodOfPay === "PAYSTACK" && (
        <>

        {(totalAmount && (totalAmount > 0)) && <PaystackButton
            text={payFoodLoading ? 'payment processing...' : ` Make Payment of ${formatCurrency(
              parseInt(totalAmount) + parseInt(delivery) + parseInt(vat)
            )}`}
              className="bg-orange-500 text-black w-full p-2 rounded-lg"
            reference={"AFSH" + generateClientUID() + "REF"}
            email={user?.email}
            amount={
              (parseInt(totalAmount) + parseInt(delivery) + parseInt(vat)) * 100
            }
            publicKey={publicKey}
            onSuccess={(reference) => onSuccess(reference)}
            onClose={() => onClose()}
            disabled={
              _.isEmpty(dirtyFields) ||
              !isValid ||
              !name ||
              !phone ||
              !address ||
              !orderCountryDestination ||
              !orderStateProvinceDestination ||
              !orderLgaDestination ||
              !orderMarketPickupDestination ||
              !district ||
              !totalAmount
              || payFoodLoading
            }
          />}
        
        </>
        )}
     

        <p className="text-sm text-gray-500 mt-2">
          By proceeding, you are automatically accepting the{" "}
          <a href="#" className="text-blue-500">
            Terms & Conditions
          </a>
        </p>
      </div>
    </div>
  );
};

export default FoodCartSummaryAndPay;
