import {
  getUserFoodCartApi,
  getUserShoppingCart,
} from "app/configs/data/client/RepositoryAuthClient";
// import { useCookies } from "react-cookie";
import Cookie from "js-cookie";

export function formatCurrency(num) {
  if (num !== undefined) {
    return parseFloat(num)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
  }
}

// my new additions
export function calculateTax(obj) {
  // return Object.values(obj)
  //     .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
  //     .toFixed(2);
}

/***Cart Totalling */
export function calculateCartTotalAmount(obj) {
  return Object.values(obj)
    .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
    .toFixed(2);
}

//   export function calculateAmount(obj) {
//     return Object.values(obj)
//         .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
//         .toFixed(2);
// }

export function generateClientUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 466566) | 0;
  var secondPart = (Math.random() * 466566) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

/****store user client shopping session */
export const storeShoppingSession = async (payloadData) => {
  const cartItems = await getCartItems();
  console.log("Adding to cartDetails 0", cartItems);

  if (cartItems.length < 1) {
    console.log("Adding to cart when < 1");
    Cookie.set("cartSession", JSON.stringify({ payloadData }));
  }
};

/****get user client shopping session */
export function getShoppingSession() {
  // const [cookies, setCookie] = useCookies('cartSession');

  // return Cookie.get('cartSession')

  const { payloadData } = Cookie.get("cartSession")
    ? JSON.parse(Cookie.get("cartSession"))
    : "";
  if (payloadData) {
    return payloadData;
  }
}

async function getCartItems() {
  // let newItems = [];
  const cartResponseData = await getUserShoppingCart();

  // console.log('cartsITEMSIN_UTIL', cartResponseData?.data?.cartItems)

  return cartResponseData?.data?.cartItems;
}

/****
 * ###################################################################################
 * ----------------FOOD CART UTILS---------------------------------------------------
 * ###################################################################################
 */

/****store user FOOD_VENDOR client shopping session */
export const storeFoodVendorSession = async (payloadData) => {
  const cartItems = await getFoodCartItems();

  if (cartItems.length < 1) {
    Cookie.set("foodCartSession", JSON.stringify({ payloadData }));
  }
};

/****get user FOOD_VENDOR client shopping session */
export function getFoodVendorSession() {

  const { payloadData } = Cookie.get("foodCartSession")
    ? JSON.parse(Cookie.get("foodCartSession"))
    : "";
  if (payloadData) {
    return payloadData;
  }
}

async function getFoodCartItems() {
  const foodCartResponseData = await getUserFoodCartApi();

  return foodCartResponseData?.data?.foodcart;
}
