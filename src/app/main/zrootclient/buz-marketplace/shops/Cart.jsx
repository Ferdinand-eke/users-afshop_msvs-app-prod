import _ from "@lodash";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { Button, Divider, FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { useAppSelector } from "app/store/hooks";
import {
  useGetMyFoodCart,
  useUpdateFoodCartItemQty,
} from "app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo";
import {
  calculateCartTotalAmount,
  formatCurrency,
} from "src/app/main/vendors-shop/pos/PosUtils";
import {
  useGetMyMarketplaceCartByUserCred,
  useMyCart,
  useUpdateCartItemQty,
} from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";

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

/****
 * COMODITY CART
 */
const CartItem = ({
  id,
  image,
  title,
  seller,
  unitsLeft,
  price,
  oldPrice,
  discount,
  cartQuantity,
}) => {
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

  const removeItemInCart = (itemId) => {
    const formData = {
      flag: "delete",
      cartItemId: itemId,
    };
    return updateCartQty(formData);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 mb-4 rounded shadow">
      <img
        src={image}
        alt={title}
        className="w-80 h-80 object-cover mb-4 md:mb-0 rounded-md"
      />
      <div className="flex-1 md:ml-4 text-center md:text-left">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">Seller: {seller}</p>
        <p className="text-sm text-red-500">{unitsLeft} units left</p>
      </div>
      <div className="text-right md:text-left md:ml-4">
        <p className="text-xl font-semibold text-gray-800">
          {formatCurrency(price)}{" "}
        </p>
        {oldPrice && !(oldPrice === undefined) && (
          <>
            <p className="text-sm text-gray-500 line-through">
              {formatCurrency(oldPrice)}
            </p>
            <p className="text-sm text-orange-500">{discount}</p>
          </>
        )}

        <p className="text-sm text-orange-500 font-bold">
          Total: {formatCurrency(parseInt(price) * parseInt(cartQuantity))}
        </p>
      </div>
      <div className="flex items-center mt-4 md:mt-0 md:ml-4 text-lg">
        <button
          className="text-orange-500 border border-orange-500  hover:bg-orange-800 rounded px-4 py-1"
          onClick={() => decreaseCart(id)}
        >
          -
        </button>
        <span className="mx-4">{cartQuantity}</span>
        <button
          className="text-orange-500 border border-orange-500  hover:bg-orange-800 rounded px-4 py-1"
          onClick={() => increaseCart(id)}
        >
          +
        </button>
      </div>
      <button
        className="px-4 text-orange-500 mt-4 md:mt-0 md:ml-4 text-[10px]"
        onClick={() => removeItemInCart(id)}
      >
        <i className="fas fa-trash-alt"></i> REMOVE
      </button>
    </div>
  );
};

const CartSummary = ({ subtotal, intemsInCart }) => {
  let checkItemsArrayForTotal = [];
  intemsInCart?.forEach((element) => {
    checkItemsArrayForTotal?.push({
      quantity: element?.quantity,
      price: element?.productId?.price,
    });
  });

  const totalAmount = calculateCartTotalAmount(checkItemsArrayForTotal);
  const delivery = 0;
  const vat = 0;

  return (
    <div className="bg-white p-4 rounded shadow mt-4 md:mt-0">
      <h2 className="text-lg font-semibold mb-4">CART SUMMARY</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span className="font-semibold">₦{formatCurrency(totalAmount)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-500 mb-4">
          Delivery fees not included yet.
        </p>
        <span className="font-semibold">₦{formatCurrency(delivery)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-500 mb-4">V.A.T.</p>
        <span className="font-semibold">₦{formatCurrency(vat)}</span>
      </div>

      {intemsInCart?.length > 0 && (
        <Button
          component={NavLinkAdapter}
          to={`/marketplace/review-cart`}
          size="sm"
          className="bg-orange-500 hover:bg-orange-800 text-white w-full py-2 rounded"
        >
          CHECKOUT ₦
          {formatCurrency(
            parseInt(totalAmount) + parseInt(delivery) + parseInt(vat)
          )}
        </Button>
      )}

      {!(intemsInCart?.length > 0) && (
        <Button
          component={NavLinkAdapter}
          to={`/marketplace/shop`}
          size="sm"
          className="bg-orange-500 hover:bg-orange-800 text-white w-full py-2 rounded"
        >
          CART EMPTY, COTINUE SHOPPING
        </Button>
      )}

      <div className="mt-4">
        <h3 className="text-sm font-semibold">Returns are easy</h3>
        <p className="text-sm text-gray-500">
          Free return within 7 days for ALL eligible items{" "}
          <a href="#" className="text-blue-500">
            Details
          </a>
        </p>
      </div>
    </div>
  );
};


/**
 * The FOODMART CART.
 */
const FoodCartItem = ({
  id,
  image,
  title,
  seller,
  unitsLeft,
  foodCartQuantity,
  price,
  oldPrice,
  discount,
}) => {
  const { mutate: updateFoodCart } = useUpdateFoodCartItemQty();

  const increaseFoodCart = (itemId) => {
    const formData = {
      flag: "increase",
      foodCartItemId: itemId,
    };
    return updateFoodCart(formData);
  };

  const decreaseFoodCart = (itemId) => {
    const formData = {
      flag: "decrease",
      foodCartItemId: itemId,
    };
    return updateFoodCart(formData);
  };

  const removeItemInFoodCart = (itemId) => {
    // console.log("remove item in cart....+");
    // const formData = {
    //   cartItemId: itemId,
    // };
    // // return updateCartQty(formData);
    const formData = {
      flag: "delete",
      foodCartItemId: itemId,
    };
    return updateFoodCart(formData);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 mb-4 rounded shadow">
      <img
        src={image}
        alt={title}
        className="w-80 h-80 object-cover mb-4 md:mb-0 rounded-md"
      />
      <div className="flex-1 md:ml-4 text-center md:text-left">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">Seller: {seller}</p>
        <p className="text-sm text-red-500">{unitsLeft} units left</p>
      </div>
      <div className="text-right md:text-left md:ml-4">
        <p className="text-xl font-semibold text-gray-800">
          {formatCurrency(price)}
        </p>
        {oldPrice && !(oldPrice === undefined) && (
          <>
            <p className="text-sm text-gray-500 line-through">
              {formatCurrency(oldPrice)}
            </p>
            <p className="text-sm text-orange-500">{discount}</p>
          </>
        )}

        <p className="text-sm text-orange-500 font-bold">
          Total: {formatCurrency(parseInt(price) * parseInt(foodCartQuantity))}
        </p>
      </div>
      <div className="flex items-center mt-4 md:mt-0 md:ml-4 text-lg">
        <button
          className="text-orange-500 border border-orange-500  hover:bg-orange-800 rounded px-4 py-1"
          onClick={() => decreaseFoodCart(id)}
        >
          -
        </button>
        <span className="mx-4">{foodCartQuantity}</span>
        <button
          className="text-orange-500 border border-orange-500  hover:bg-orange-800 rounded px-4 py-1"
          onClick={() => increaseFoodCart(id)}
        >
          +
        </button>
      </div>
      <button className="text-orange-500 mt-4 md:mt-0 md:ml-4 text-[10px]">
        <i className="fas fa-trash-alt"></i> REMOVE
      </button>
    </div>
  );
};

const FoodCartSummary = ({ subtotal, intemsInFoodCart }) => {
  let checkFoodItemsArrayForTotal = [];
  intemsInFoodCart?.forEach((element) => {
    checkFoodItemsArrayForTotal?.push({
      quantity: element?.quantity,
      price: element?.menu?.price,
    });
  });

  const totalAmount = calculateCartTotalAmount(checkFoodItemsArrayForTotal);
  const delivery = 0;
  const vat = 0;

  return (
    <div className="bg-white p-4 rounded shadow mt-4 md:mt-0">
      <h2 className="text-lg font-semibold mb-4">FOOD CART SUMMARY</h2>
      {/* <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span className="font-semibold">{subtotal}</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Delivery fees not included yet.
      </p>
      <button className="bg-orange-500 hover:bg-orange-800 text-white w-full py-2 rounded">
        CHECKOUT ({subtotal})
      </button> */}

<div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span className="font-semibold">₦{formatCurrency(totalAmount)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-500 mb-4">
          Delivery fees not included yet.
        </p>
        <span className="font-semibold">₦{formatCurrency(delivery)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-500 mb-4">V.A.T.</p>
        <span className="font-semibold">₦{formatCurrency(vat)}</span>
      </div>

      {intemsInFoodCart?.length > 0 && (
        <Button
          component={NavLinkAdapter}
          to={`/foodmarts/review-food-cart`}
          size="sm"
          className="bg-orange-500 hover:bg-orange-800 text-white w-full py-2 rounded"
        >
          CHECKOUT ₦
          {formatCurrency(
            parseInt(totalAmount) + parseInt(delivery) + parseInt(vat)
          )}
        </Button>
      )}

      {!(intemsInFoodCart?.length > 0) && (
        <Button
          component={NavLinkAdapter}
          to={`/foodmarts/listings`}
          size="sm"
          className="bg-orange-500 hover:bg-orange-800 text-white w-full py-2 rounded"
        >
          FOOD-CART EMPTY, COTINUE SHOPPING
        </Button>
      )}


      <div className="mt-4">
        <h3 className="text-sm font-semibold">Returns are easy</h3>
        <p className="text-sm text-gray-500">
          Free return within 7 days for ALL eligible items{" "}
          <a href="#" className="text-blue-500">
            Details
          </a>
        </p>
      </div>
    </div>
  );
};

function Cart() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const user = useAppSelector(selectUser);


  const { data: foodCart, isLoading: foodCartLoading } = useGetMyFoodCart();
  const { data: cart, isLoading: cartLoading } = useMyCart();
  // const {data:userCartData} = useGetMyMarketplaceCartByUserCred(user?.id)

  return (
    <FusePageSimple
      content={
        <>
          <div className="mt-20 flex w-full flex-col md:mx-200">
            {/* top part of single product */}

            <div className="max-w-6xl mx-auto">
              {user?.email && (
                <>
                  <>
                    <h1 className="text-2xl font-semibold mb-4">
                      Marketplace Cart ({cart?.data?.cartItems?.length})
                    </h1>

                    <>
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1">
                          {cart?.data?.cartItems?.length > 0 ? (
                            cart?.data?.cartItems.map((cartItem) => (
                              <CartItem
                                key={cartItem?._id}
                                id={cartItem?._id}
                                image={cartItem?.productId?.images[0]?.url}
                                title={cartItem?.productId?.name}
                                seller="Apple Authorized Reseller"
                                unitsLeft={cartItem?.productId?.quantityInStock}
                                cartQuantity={cartItem?.quantity}
                                price={cartItem?.productId?.price}
                                oldPrice={cartItem?.productId?.listprice}
                                discount="-70%"
                              />
                            ))
                          ) : (
                            <Typography className="text-md">
                              No product in cart
                            </Typography>
                          )}
                        </div>

                        <div className="w-full md:w-1/3 md:ml-4">
                          <CartSummary
                            subtotal="₦ 9,500,997"
                            intemsInCart={cart?.data?.cartItems}
                          />
                        </div>
                      </div>
                    </>

                    {/* <div className="flex flex-col md:flex-row">
                      <div className="flex-1">
                        <CartItem
                          image="https://placehold.co/100x100"
                          title="Apple MacBook Pro 14.2” 8-core CPU/10-core 8GB/1TB M3 Chip - Silver 2023"
                          seller="Apple Authorized Reseller"
                          unitsLeft="4"
                          price="₦ 2,999,999"
                          oldPrice="₦ 9,999,999"
                          discount="-70%"
                        />
                        <CartItem
                          image="https://placehold.co/100x100"
                          title="Apple MacBook Pro 16.2” 18GB/ 512GB M3 Pro - Black 2023"
                          seller="Apple Authorized Reseller"
                          unitsLeft="4"
                          price="₦ 4,500,999"
                          oldPrice="₦ 6,999,999"
                          discount="-36%"
                        />
                       
                      </div>

                      <div className="w-full md:w-1/3 md:ml-4">
                        <CartSummary subtotal="₦ 9,500,997" />
                      </div>
                    </div> */}
                  </>

                  <div className="mt-10">
                    <Divider />
                    <h1 className="text-2xl font-semibold mb-4 mt-10">
                      FOOD-MART Cart ({foodCart?.data?.foodcart?.length})
                    </h1>

                    <>
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1">
                          {foodCart?.data?.foodcart?.length > 0 ? (
                            foodCart?.data?.foodcart.map((cartItem) => (
                              <FoodCartItem
                                id={cartItem?._id}
                                key={cartItem?._id}
                                image={cartItem?.menu?.imageSrcs[0]?.url}
                                title={cartItem?.menu?.title}
                                seller="Apple Authorized Reseller"
                                unitsLeft={cartItem?.menu?.quantity}
                                foodCartQuantity={cartItem?.quantity}
                                price={cartItem?.menu?.price}
                                oldPrice={cartItem?.menu?.listprice}
                                discount="-70%"
                              />
                            ))
                          ) : (
                            <Typography className="text-md">
                              No food in cart
                            </Typography>
                          )}
                        </div>

                        <div className="w-full md:w-1/3 md:ml-4">
                          <FoodCartSummary
                            subtotal="₦ 9,500,997"
                            intemsInFoodCart={foodCart?.data?.foodcart}
                          />
                        </div>
                      </div>
                    </>
                  </div>
                </>
              )}

              {!user?.email && (
                <>
                  <h1 className="text-2xl font-semibold mb-4">Cart (3)</h1>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full">
                      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 mb-4 rounded shadow">
                        <div className="flex-1 md:ml-4 text-center md:text-left">
                          <h2 className="text-lg font-semibold">Hi There!</h2>
                          <p className="text-sm text-gray-500">
                            To view your cart, you have to be logged in!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default Cart;
