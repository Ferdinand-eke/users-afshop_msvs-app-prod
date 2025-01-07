import { Button, Typography } from "@mui/material";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";

const AddToFoodCartButton = ({ onSubmit, loading, productId, 
    cartItems 
}) => {
  let checkArray = [];
  cartItems?.forEach((element) => {
    checkArray?.push(element?.menu?._id);
  });

//   console.log("menuId", productId);
//   console.log("food_CART", cartItems);
//   console.log("check_CART_ARRAY", checkArray);

  return (
    <div
    //   className="
    //     bg-white
    //     rounded-xl
    //     border-[1px]
    //     border-neutral-200
    //     overflow-hidden
    //     "
    >
      {checkArray.includes(productId) ? (
        <div className="flex items-center justify-center gap-4 mt-4 md:mt-0 md:ml-4 text-lg">
          <Button
            size="xs"
            className="text-white font-bold border border-orange-500 bg-orange-500  hover:bg-orange-800 rounded px-4 py-1"
            // onClick={() => decreaseCart(id)}
          >
            -
          </Button>
          {/* <span className="mx-4">{cartQuantity}</span> */}
          <Button
            size="xs"
            className="text-white border border-orange-500 bg-orange-500 hover:bg-orange-800 rounded px-4 py-1"
            // onClick={() => increaseCart(id)}
          >
            +
          </Button>
        </div>
      ) : (
        <Button
          size="xs"
          type="primary"
          className="bg-orange-500 hover:bg-orange-800  h-[44px] w-full px-[30px] bg-primary text-black dark:text-white/[.87] text-sm font-semibold border-primary rounded-[6px]"
          onClick={onSubmit}
          disabled={loading}
        >
          ADD TO FOOD CART
        </Button>
      )}
    </div>
  );
};

export default AddToFoodCartButton;
