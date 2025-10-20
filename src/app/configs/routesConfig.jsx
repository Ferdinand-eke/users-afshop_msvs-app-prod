import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import PagesConfigs from "../main/pages/pagesConfigs";
import DashboardsConfigs from "../main/dashboards/dashboardsConfigs";
import AppsConfigs from "../main/apps/appsConfigs";
import UserInterfaceConfigs from "../main/user-interface/UserInterfaceConfigs";
import DocumentationConfig from "../main/documentation/DocumentationConfig";
import authRoleExamplesConfigs from "../main/auth/authRoleExamplesConfigs";
import UsersAppConfig from "../main/users/user/UsersAppConfig";
import StaffAppConfig from "../main/users/admin/StaffAppConfig";
import SignAcceptInviteConfig from "../main/sign-accept-invite/SignAcceptInviteConfig";

// import SupportHelpCenterAppConfig from "../main/vendors-shop/support-center/SupportHelpCenterAppConfig";
import AfricanshopsFinanceDashboardAppConfig from "../main/africanshops-finance/AfricanshopsFinanceDashboardAppConfig";
import AfricanshopsMessengerAppConfig from "../main/africanshops-messenger/AfricanshopsMessengerAppConfig";
import forgotPasswordConfig from "../main/sign-forgot-password/forgotPasswordPagesConfig";
import resetPasswordConfig from "../main/sign-reset-password/resetPasswordPagesConfig";

import blogAppConfig from "../main/newsblog/blogAppConfig";
import HelpCenterHome from "../main/apps/help-center/home/HelpCenterHome";
import LandingCenterHome from "../main/vendors-shop/home/home/LandingCenterHome";
import MarketplaceShops from "../main/zrootclient/buz-marketplace/shops/MarketplaceShops";
import SingleProduct from "../main/zrootclient/buz-marketplace/shops/SingleProduct";
import Cart from "../main/zrootclient/buz-marketplace/shops/Cart";
import BookingsPage from "../main/zrootclient/buz-bookings/bookingsPage/BookingsPage";
import RealEstatesPage from "../main/zrootclient/buz-realestates/RealEstatesPage";
import BookingSinglePage from "../main/zrootclient/buz-bookings/bookingsSinglePage/BookingSinglePage";
import MerchantShopPage from "../main/zrootclient/buz-marketplace/shops/merchanyShopPage/MerchantShopPage";
import RealEstateSinglePage from "../main/zrootclient/buz-realestates/RealEstateSinglePage";
import FoodMartsPage from "../main/zrootclient/buz-foodmart/foodMartPage/FoodMartsPage";
import VisitFoodMartPage from "../main/zrootclient/buz-foodmart/visitFoodMartPage/VisitFoodMartPage";
import FoodMartsPageSecond from "../main/zrootclient/buz-foodmart/FoodMartsPageSecond";
import FoodMartsPageSecondResponsive from "../main/zrootclient/buz-foodmart/FoodMartsPageSecondResponsive";
import userReservationPagesConfig from "../main/zrootclient/buz-bookings/user-reservations/userReservationPagesConfig";
import FoodMartSingleMenu from "../main/zrootclient/buz-foodmart/FoodMartSingleMenu";
import userMarketPlacePagesConfig from "../main/zrootclient/buz-marketplace/userMarketPlacePagesConfig";
import userFoodMartPagesConfig from "../main/zrootclient/buz-foodmart/userFoodMartPagesConfig";
import UserSettingsAppConfig from "../main/zrootclient/settings/UserSettingsAppConfig";
import userProfileAppConfig from "../main/zrootclient/profile/userProfileAppConfig";
import MarketplaceProductsByCat from "../main/zrootclient/buz-marketplace/shops/marketplaceProductsByCat/MarketplaceProductsByCat";
import SimpleWithSidebarsContentScrollComponent from "../main/zrootclient/afsh-page-layouts/simple/with-sidebars/SimpleWithSidebarsContentScrollComponent";
import MarketplaceWithSidebarsContentScrollComponent from "../main/zrootclient/buz-marketplace/shops/marketplace/MarketplaceWithSidebarsContentScrollComponent";
import BookingsPageWithSidebarsContentScrollComponent from "../main/zrootclient/buz-bookings/bookingsPage/BookingsPageWithSidebarsContentScrollComponent";
import FoodMartWithSidebarsContentScrollPage from "../main/zrootclient/buz-foodmart/foodMartPage/FoodMartWithSidebarsContentScrollPage";
import VisitFoodMartWithContentScrollPage from "../main/zrootclient/buz-foodmart/visitFoodMartPage/VisitFoodMartWithContentScrollPage";
import BookingsSinglePageWithSidebarsContentScroll from "../main/zrootclient/buz-bookings/bookingsSinglePage/BookingsSinglePageWithSidebarsContentScroll";
import FoodMartSingleMenuWithContentScrollPage from "../main/zrootclient/buz-foodmart/foodMartSingleMenuPage/FoodMartSingleMenuWithContentScrollPage";
import SingleProductWithContentScrollPage from "../main/zrootclient/buz-marketplace/shops/singleProductPage/SingleProductWithContentScrollPage";
import MarketplaceProductsByCatWithContentScrollPage from "../main/zrootclient/buz-marketplace/shops/marketplaceProductsByCat/MarketplaceProductsByCatWithContentScrollPage";
import MerchantShopPafeWithContentScrollPage from "../main/zrootclient/buz-marketplace/shops/merchanyShopPage/MerchantShopPafeWithContentScrollPage";
import RealestatePageWithSidebarsContentScrollComponent from "../main/zrootclient/buz-realestates/realestatePage/RealestatePageWithSidebarsContentScrollComponent";
import RealestateSinglePageWithSidebarsContentScroll from "../main/zrootclient/buz-realestates/realestateSinglePage/RealestateSinglePageWithSidebarsContentScroll";
import userRealEstatePagesConfig from "../main/zrootclient/buz-realestates/realEstatePagesConfig";

// import FoodMartMenu from "../main/zrootclient/buz-foodmart/FoodMartMenu";
// import MarketplaceShops from "../main/zrootclient/buz-marketplace/shops/MarketplaceShops";
// import AfricanshopsMessengerAppConfig from '../main/africanshops-messenger/AfricanshopsMessengerAppConfig';

const routeConfigs = [
  /***
   * ##########################################################################
   * Authentication concern routes starts here
   * ############################################################################
   * */
  // SignOutConfig,
  SignInConfig,
  SignUpConfig,
  SignAcceptInviteConfig,
  forgotPasswordConfig,
  resetPasswordConfig,
  // DocumentationConfig,
  /***
   * ##########################################################################
   * Authentication concern routes ends here
   * ############################################################################
   * */

  /***
   * ##########################################################################
   * User management and properties starts here
   * ############################################################################
   * */
  // UsersAppConfig,
  // StaffAppConfig,

  /******Hotels, apartment and suites management */
  // ManagedBookingsListingsAppConfig,

  /***
   * ##############################################################################
   * User management and properties starts
   * #######################################################################################
   * */

  /****
   * #########################################################################################
   * Africanshops Dashboard Configs Starts Here
   * #########################################################################################
   * */
  // SupportHelpCenterAppConfig,
  AfricanshopsFinanceDashboardAppConfig,
  AfricanshopsMessengerAppConfig,

  // SettingsAppConfig,
  UserSettingsAppConfig,
  userProfileAppConfig,

  /****
   * ############################################################################################
   * Africanshops Dashboard Configs Ends Here
   * ############################################################################################
   * ----------------------------------------------------------------------------------------------------
   * */
  /****
   * #########################################################################################
   * Africanshops BOOKINGS-ROUTES Configs starts Here
   * #########################################################################################
   * */
  userReservationPagesConfig,

  /****
   * #########################################################################################
   * Africanshops BOOKINGS-ROUTES Configs ends Here
   * #########################################################################################
   * -------------------------------------------------------------------------------------------------------
   * */

  /****
   * #########################################################################################
   * Africanshops MARKET-PLACE_ROUTES Configs starts Here
   * #########################################################################################
   * */
  userMarketPlacePagesConfig,

  /****
   * #########################################################################################
   * Africanshops MARKET-PLACE-ROUTES Configs ends Here
   * #########################################################################################
   * -------------------------------------------------------------------------------------------------------
   * */

  /****
   * #########################################################################################
   * Africanshops RESTAURANTS_CLUBS_&_SPOTS_ROUTES Configs starts Here
   * #########################################################################################
   * */
  userFoodMartPagesConfig,

  /****
   * #########################################################################################
   * Africanshops BOOKINGS-ROUTES Configs ends Here
   * #########################################################################################
   * -------------------------------------------------------------------------------------------------------
   * */

   /****
   * #########################################################################################
   * Africanshops REAL_ESTATE_ROUTES Configs starts Here
   * #########################################################################################
   * */
  userRealEstatePagesConfig,
  /****
   * #########################################################################################
   * Africanshops REAL_ESTATE_ROUTES Configs ENDS Here
   * #########################################################################################
   * */

  /****
   *#################################################################################################
   * Start of Un-Authenticated pages are listed below here
   * #######################################################################
   */
  blogAppConfig,

  /****
   *################################################################################################
   * End of Un-Authenticated pages are listed below here
   * ###############################################################################################
   */

  /**Routes Below to be disabled */
  // ...PagesConfigs,
  // ...UserInterfaceConfigs,
  // ...DashboardsConfigs,
  // ...AppsConfigs,
  ...authRoleExamplesConfigs,
];
/**
 * The routes of the application.
 */
const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    // element: <Navigate to="/dashboards/project" />,
    // element: <Navigate to="/home" />,
    // auth: settingsConfig.defaultAuth,
    element: <LandingCenterHome />,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },

  /***Check Pages starts */

  /***Check Pages ends */
  //
  {
    path: "/home",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    element: <LandingCenterHome />,
  },

  /****
   * ##############################################################
   * Marketplace activiies starts
   * ##############################################################
   */
  // {
  //   path: "/marketplace/shop",
  //   settings: {
  //     layout: {
  //       config: {
  //         navbar: {
  //           display: false,
  //         },
  //         toolbar: {
  //           display: true,
  //         },
  //         footer: {
  //           display: false,
  //         },
  //         leftSidePanel: {
  //           display: false,
  //         },
  //         rightSidePanel: {
  //           display: false,
  //         },
  //       },
  //     },
  //   },
  //   element: <MarketplaceShops />,
  // },

  {
    path: "/marketplace/shop",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    element: <MarketplaceWithSidebarsContentScrollComponent />,
  }, //(Msvs => Done)

  {
    path: "/marketplace/product/:productSlug/view",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <SingleProduct />,
    element: <SingleProductWithContentScrollPage />,
  }, //(Msvs => Done)

  {
    path: "/marketplace/products/:id/by-category",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <MarketplaceProductsByCat />,

    element: <MarketplaceProductsByCatWithContentScrollPage />,
  },

  {
    path: "/marketplace/merchant/:shopId/portal",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <MerchantShopPage />,
    element: <MerchantShopPafeWithContentScrollPage />,
  },

  //
  /****
   * ##############################################################
   * Marketplace activiies ends
   * ##############################################################
   */
  /**############################################################### */
  /****
   * ##############################################################
   * BOOKINGS activities starts
   * ##############################################################
   */

  {
    path: "/bookings/listings",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <BookingsPage />,
    element: <BookingsPageWithSidebarsContentScrollComponent />,
  }, //(Msvs => Done)

  {
    path: "/bookings/listings/:bookingId/view",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <BookingSinglePage />,
    element: <BookingsSinglePageWithSidebarsContentScroll />,
  }, //(Msvs => Done)

  /****
   * ##############################################################
   * BOOKINGS activities ends
   * ##############################################################
   */
  /**############################################################### */
  /**############################################################### */
  /****
   * ##############################################################
   * REAL-ESTATE activities starts
   * ##############################################################
   */
  {
    path: "/realestate/listings",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <RealEstatesPage />,
    element: <RealestatePageWithSidebarsContentScrollComponent />,
  },

  {
    path: "/realestate/listings/:slug/view",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <RealEstateSinglePage />,
    element: <RealestateSinglePageWithSidebarsContentScroll />,
  },

  /****
   * ##############################################################
   * REALE-STATE activities ends
   * ##############################################################
   */
  /**############################################################### */

  //
  /**############################################################### */
  /****
   * ##############################################################
   * FOOD_MARTS activities starts
   * ##############################################################
   */
  {
    path: "/foodmarts/listings",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <FoodMartsPage />,
    element: <FoodMartWithSidebarsContentScrollPage />, //(Msvs => Done)
  },

  {
    path: "/foodmarts/:martId/visit-mart/:id",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <VisitFoodMartPage />,
    element: <VisitFoodMartWithContentScrollPage />,
  }, //(Mcsvs => Done)

  {
    path: "/foodmarts/:rcsId/menu/:menuSlug/view",
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: true,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    // element: <FoodMartSingleMenu />,
    element: <FoodMartSingleMenuWithContentScrollPage />,
  }, //(Mcsvs => Done)

  /****
   * ##############################################################
   * FOOD_MARTS activities ends
   * ##############################################################
   */
  /**############################################################### */
];
export default routes;
