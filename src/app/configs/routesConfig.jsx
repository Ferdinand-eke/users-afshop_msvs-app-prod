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
import PropertiesAppConfig from "../main/properties/listings/PropertiesAppConfig";
import ServiceTypesAppConfig from "../main/homes/servicetypes/ServiceTypesAppConfig";
import ManagedListingsAppConfig from "../main/homes/managedproperties/ManagedListingsAppConfig";
import PropertyTypesAppConfig from "../main/homes/propertytypes/PropertyTypesAppConfig";
import SignAcceptInviteConfig from "../main/sign-accept-invite/SignAcceptInviteConfig";
// import ManagedUserListingsAppConfig from "../main/homes/managedusersandproperties/ManagedUserListingsAppConfig";
// import ShopDashboardAppConfig from "../main/vendors-shop/dasboard/ShopDashboardAppConfig";
// import ShopProductsAppConfig from "../main/vendors-shop/products/ShopProductsAppConfig";
// import ShopOrdersAppConfig from "../main/vendors-shop/orders/ShopOrdersAppConfig";
import SupportHelpCenterAppConfig from "../main/vendors-shop/support-center/SupportHelpCenterAppConfig";
import AfricanshopsFinanceDashboardAppConfig from "../main/africanshops-finance/AfricanshopsFinanceDashboardAppConfig";
import AfricanshopsMessengerAppConfig from "../main/africanshops-messenger/AfricanshopsMessengerAppConfig";
import forgotPasswordConfig from "../main/sign-forgot-password/forgotPasswordPagesConfig";
import resetPasswordConfig from "../main/sign-reset-password/resetPasswordPagesConfig";
// import merchantProfileAppConfig from "../main/vendors-shop/profile/merchantProfileAppConfig";
// import SettingsAppConfig from "../main/vendors-shop/settings/SettingsAppConfig";
// import ShopsPosAppConfig from "../main/vendors-shop/pos/ShopsPosAppConfig";
import blogAppConfig from "../main/newsblog/blogAppConfig";
import HomeAppConfig from "../main/vendors-shop/home/HomeAppConfig";
import HelpCenterHome from "../main/apps/help-center/home/HelpCenterHome";
import LandingCenterHome from "../main/vendors-shop/home/home/LandingCenterHome";
import MerchantMailboxAppConfig from "../main/vendors-shop/mailbox/MerchantMailboxAppConfig";
import ManagedBookingsListingsAppConfig from "../main/hotelsandapartments/managed-booking-listings/ManagedBookingsListingsAppConfig";
import ManagedFoodMartsAppConfig from "../main/vendor-foodmarts/managed-foood-mart/ManagedFoodMartsAppConfig";
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
// import userMarketPlacePagesConfig from "../main/zrootclient/buz-marketplace/userMarketPlacePagesConfig";


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
  // PropertiesAppConfig,
  // ServiceTypesAppConfig,


  /*****Estates Homes and estate management */
  // ManagedListingsAppConfig,

  /******Hotels, apartment and suites management */
  // ManagedBookingsListingsAppConfig,

  // PropertyTypesAppConfig,
  // ManagedUserListingsAppConfig,
  /*****Food Mart (Restaurants, Bakeries etc) */
  // ManagedFoodMartsAppConfig,

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
  // ShopDashboardAppConfig,
  // ShopProductsAppConfig,
  // ShopOrdersAppConfig,
  SupportHelpCenterAppConfig,
  AfricanshopsFinanceDashboardAppConfig,
  AfricanshopsMessengerAppConfig,
  // merchantProfileAppConfig,
  MerchantMailboxAppConfig,

  // SettingsAppConfig,
  // ShopsPosAppConfig,
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
   * Africanshops BOOKINGS-ROUTES Configs ends Here
   * #########################################################################################
   * -------------------------------------------------------------------------------------------------------
   * */


        /****
   * #########################################################################################
   * Africanshops MARKET-PLACE_ROUTES Configs starts Here
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
   *#################################################################################################
   * Start of Un-Authenticated pages are listed below here
   * #######################################################################
   */
  //   HomeAppConfig,
  HomeAppConfig,
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
  },


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
    
  },


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
  },

  

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
  },

  
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
    element: <RealEstatesPage />,
  },

  {
    path: "/realestate/listings/:propertyId/:slug",
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
    element: <RealEstateSinglePage />,
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
    element: <FoodMartWithSidebarsContentScrollPage />,
  
  },

  {
    path: "/foodmarts/listings/visit-mart/:martId/:id",
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
    
  },


  {
    path: "/foodmarts/menu/:menuId",
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
    
  },


  /****
   * ##############################################################
   * FOOD_MARTS activities ends 
   * ##############################################################
   */
  /**############################################################### */
];
export default routes;
