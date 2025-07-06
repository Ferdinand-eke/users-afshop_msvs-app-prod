import { Button, Typography } from "@mui/material";
import { useUpdateCartItemQty } from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { useEffect } from "react";

const AddToProductCartButton = ({
  onSubmit,
  loading,
  productId,
  cartItems,
  quantityLeft,
  //   disabledDates,
}) => {

  // console.log("QUANTITY__LEFT___IN__BUTTON", quantityLeft);
  let checkArray = [];
  cartItems?.forEach((element) => {
    checkArray?.push(element?.product?.id);
  });

  const { mutate: updateCartQty } = useUpdateCartItemQty();

  const increaseCart = (itemId) => {
    const formData = {
      flag: "increase",
      cartItemId: itemId,
    };
    return updateCartQty(formData);
  };

  const decreaseCart = (itemId) => {
    const formData = {
      flag: "decrease",
      cartItemId: itemId,
    };
    return updateCartQty(formData);
  };

  useEffect(() => {}, [cartItems, productId, checkArray]);

  // console.log("CART__SESION__&&&___ITEMS__IN__BUTTON", cartItems);

  const matchingCartItem = cartItems?.filter(
    (element) => element.productId === productId
  )[0];

  return (
    <div
      className="
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
        "
    >
      {checkArray.includes(productId) ? (
        <div className="flex items-center justify-center gap-4 mt-4 md:mt-0 md:ml-4 text-lg">
          <Button
            size="xs"
            className="text-white font-bold border border-orange-500 bg-orange-500  hover:bg-orange-800 rounded px-4 py-1"
            onClick={() => decreaseCart(matchingCartItem?.id)}
          >
            -
          </Button>
          <p>{matchingCartItem?.quantity}</p>

          {parseInt(matchingCartItem?.quantity) < parseInt(quantityLeft) && (
            <Button
              size="xs"
              className="text-white border border-orange-500 bg-orange-500 hover:bg-orange-800 rounded px-4 py-1"
              onClick={() => increaseCart(matchingCartItem?.id)}
            >
              +
            </Button>
          )}
        </div>
      ) : (
        <Button
          size="xs"
          type="primary"
          className="bg-orange-500 hover:bg-orange-800 w-full px-[30px] bg-primary text-black dark:text-white/[.87] text-sm font-semibold border-primary rounded-[6px]"
          onClick={onSubmit}
          disabled={loading}
        >
          ADD TO CART
        </Button>
      )}
    </div>
  );
};

export default AddToProductCartButton;
