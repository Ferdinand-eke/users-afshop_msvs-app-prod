import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useCallback, useEffect, useState } from "react";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import DemoHeader from "./shared-components/DemoHeader";
import DemoContent from "./shared-components/DemoContent";
import DemoSidebar from "./shared-components/DemoSidebar";
import DemoSidebarRight from "./shared-components/DemoSidebarRight";
import FusePageSimpleWithMargin from "@fuse/core/FusePageSimple/FusePageSimpleWithMargin";
import useGetAllProducts, {
  useAddToCart,
  useGetMyMarketplaceCartByUserCred,
  useGetSingleProduct,
  useMyCart,
} from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { useForm } from "react-hook-form";
import useSellerCountries from "app/configs/data/server-calls/countries/useCountries";
import {
  getLgasByStateId,
  getStateByCountryId,
} from "app/configs/data/client/RepositoryClient";
import useGetAllBookingProperties from "app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo";
import useGetAllFoodMarts, {
  useAddToFoodCart,
  useGetMyFoodCartByUserCred,
  useGetSingleMenuItem,
} from "app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "app/store/hooks";
import { selectUser } from "src/app/auth/user/store/userSlice";
import {
  getFoodVendorSession,
  getShoppingSession,
  storeFoodVendorSession,
  storeShoppingSession,
} from "src/app/main/vendors-shop/pos/PosUtils";

const Root = styled(FusePageSimpleWithMargin)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

/**
 * The SimpleWithSidebarsContentScroll page.
 */
function SingleProductWithContentScrollPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
    setRightSidebarOpen(!isMobile);
  }, [isMobile]);

  const routeParams = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { productId, productSlug } = routeParams;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetSingleProduct(productSlug);

  const { mutate: addToart, isLoading: cartLoading } = useAddToCart();
  const [select, setSelect] = useState(0);

  // const [cartloading, setCartLoading] = useState(false);
  const [cart, setCart] = useState([]);
  // const { data: userCartData } =useGetMyMarketplaceCartByUserCred(); //user?.id
   const { data: userCartData } =useMyCart(user?.id); //user?.id

  const onAddToUserCart = useCallback(() => {
    if (!user?.email) {
      navigate("/sign-in");
      return;
    }

    const formData = {
      user: user?.id,
      quantity: 1,
      product: product?.data?.product?.id,
      seller: product?.data?.product?.shop,
      shopID: product?.data?.product?.shop,
      shopCountryOrigin: product?.data?.product?.productCountry,
      shopStateProvinceOrigin: product?.data?.product?.productState,
      shopLgaProvinceOrigin: product?.data?.product?.productLga,
      shopMarketId: product?.data?.product?.market,
      // shoppingSession:''
    };

    // console.log("FORM_DATA_CART", formData);

    //if cart is empty create a session and add to cart
    //if cart is not empty check if lgaId is the same as the product lgaId
    //if same add to cart else show error message

    if (userCartData?.data?.cartSession?.cartProducts?.length === 0) {
      // const sessionPayload = {
      //   shopID: product?.data?.product?.shop?._id,
      //   shopCountryOrigin: product?.data?.product?.shop?.businessCountry,
      //   shopStateProvinceOrigin: product?.data?.product?.shop?.businezState,
      //   shopLgaProvinceOrigin: product?.data?.product?.shop?.businezLga,
      //   shopMarketId: product?.data?.product?.market,
      // };
 
      if (userCartData?.data?.cartSession?.lgaId) {
        addToart(formData);
        // getCartWhenAuth()
        return;
      }
    } else {
      // const payloadData = getShoppingSession()

      if (
        userCartData?.data?.cartSession?.lgaId ===
        product?.data?.product?.productLga  || !userCartData?.data?.cartSession?.lgaId
      ) {
        addToart(formData);
        // getCartWhenAuth()
        return;
      } else {
        alert("You must shop in one L.G.A/County at a time");
        return;
      }
    }
  }, [
    product?.data?.product?.id,
    routeParams,
    user,
    userCartData?.data?.cartSession?.cartProducts,
    userCartData?.data?.cartSession?.cartProducts?.length,
  ]);

  return (
    <Root
      header={
        <DemoHeader
          // countries={countries?.data?.data}
          // stateData={stateData}
          // blgas={blgas}
          // methods={methods}

          leftSidebarToggle={() => {
            setLeftSidebarOpen(!leftSidebarOpen);
          }}
          rightSidebarToggle={() => {
            setRightSidebarOpen(!rightSidebarOpen);
          }}
        />
      }
      content={
        <DemoContent
          productData={product?.data?.product}
          isLoading={isLoading}
          isError={isError}
          select={select}
          setSelect={setSelect}
          // onAddToFoodCart={onAddToUserCart}
          // addFoodCartLoading={loadingCart}
          // foodCart={ userCartData?.data?.cartItems}

          onSubmit={onAddToUserCart}
          loading={cartLoading}
          productId={product?.data?.product.id}
          cartItems={userCartData?.data?.cartSession?.cartProducts}
        />
      }
      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => {
        setLeftSidebarOpen(false);
      }}
      leftSidebarContent={<DemoSidebar />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => {
        setRightSidebarOpen(false);
      }}
      rightSidebarContent={
        <DemoSidebarRight
          // methods={methods}
          productInfo={product?.data?.product}
        />
      }
      scroll="content"
    />
  );
}

export default SingleProductWithContentScrollPage;
