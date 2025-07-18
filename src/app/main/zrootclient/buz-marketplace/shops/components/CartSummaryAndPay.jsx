import _ from "@lodash";
import { Button, Typography } from "@mui/material";
import { usePayAndPlaceOrder } from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { useAppSelector } from "app/store/hooks";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
import { selectUser } from "src/app/auth/user/store/userSlice";
import {
  calculateCartTotalAmount,
  formatCurrency,
  generateClientUID,
  getShoppingSession,
} from "src/app/main/vendors-shop/pos/PosUtils";
const CartSummaryAndPay = ({
  cartSessionPayload,
  methodOfPay,
  name,
  phone,
  address,
  orderCountryDestination,
  orderStateProvinceDestination,
  orderLgaDestination,
  orderMarketPickupDestination,

  dirtyFields,
  isValid,
}) => {
  const user = useAppSelector(selectUser);

  // console.log("CART__ITEMS__IN__CART__REVIEW", cartSessionPayload);

  let checkItemsArrayForTotal = [];
  cartSessionPayload?.cartProducts?.forEach((element) => {
    checkItemsArrayForTotal?.push({
      quantity: element?.quantity,
      price: element?.product?.price,
    });
  });

  const totalAmount = calculateCartTotalAmount(checkItemsArrayForTotal);
  const delivery = 1000;
  const vat = 800;
  const publicKey = "pk_test_2af8648e2d689f0a4d5263e706543f3835c2fe6a";

  const { mutate: verifyPaymentAndCreateOrder, isLoading: loadingWhilePaying } =
    usePayAndPlaceOrder();

  const onSuccess = async (paystackResponse) => {
    // const payloadData = getShoppingSession();

    try {
      const oderData = {
        refOrderId: "AFSH" + generateClientUID() + "MKT",
        cartItems: cartSessionPayload?.cartProducts,

        itemsPrice: parseInt(totalAmount),
        shippingPrice: delivery,
        taxPrice: vat,
        totalPrice: parseInt(totalAmount) + parseInt(delivery) + parseInt(vat),

        orderCountryDestination: orderCountryDestination,
        orderStateProvinceDestination: orderStateProvinceDestination,
        orderLgaDestination: orderLgaDestination,
        orderMarketPickupDestination: orderMarketPickupDestination,

        paymentMethod: methodOfPay,
        shoppingCountrySession: cartSessionPayload?.countryId,
        shoppingStateSession: cartSessionPayload?.stateId,
        shoppingLgaSession: cartSessionPayload?.lgaId,
        shoppingDistrictSession: cartSessionPayload?.districtId,
        paymentResult: paystackResponse,
        shippingAddress: {
          fullName: name,
          phone: phone,
          address: address,
        },
        reference: paystackResponse?.reference,
      };

      console.log("ORDER__DATA__BEFORE__PAYMENT___VERIFY", oderData);
      // return;
      /**1) Verify his payment, and then go on to create order */

      verifyPaymentAndCreateOrder(oderData);

      // if(reference?.status === 'success'){
      //
      // }else{
      //   toast.error('Error ocured on this payment')
      // }
    } catch (error) {}
  };
  const onClose = () => {
    alert("Wait! You need this order confirmed, don't go!!!!");
  };

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>

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
          <p className="text-orange-800">
            ₦
            {formatCurrency(
              parseInt(totalAmount) + parseInt(delivery) + parseInt(vat)
            )}
          </p>
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
          <PaystackButton
            text={`Make Payment of ${formatCurrency(
              parseInt(totalAmount) + parseInt(delivery) + parseInt(vat)
            )}`}
            //   className="inline-flex  items-center gap-x-1.5 bg-white dark:bg-white/10 text-primary h-[45px] px-[14px] text-xs font-medium border border-normal dark:border-white/10 rounded-md sm:justify-center sm:px-0 sm:mx-[10px] xl:mx-[12px] mx-[20px]"
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
              loadingWhilePaying
            }
          />
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

export default CartSummaryAndPay;
