import { lazy } from "react";
// import EstateOffersPage from "./real-estate-offers/EstateOffersPage";
const InspectionSchedulesPage = lazy(
  () => import("./real-estate-inspection-schedules/InspectionSchedulesPage")
);

const EstateOffersPage = lazy(
  () => import("./real-estate-offers/EstateOffersPage")
);

/**
 * The reset password pages config.
 */
const userRealEstatePagesConfig = {
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

  
  
  
  routes: [
    {
      path: "realestate/my-inspection-schedules",
      element: <InspectionSchedulesPage />, // (Done => Msvs)
    },

      {
      path: "realestate/my-offers",
      element: <EstateOffersPage />, // (Done => Msvs)
    },
   

    
  ],
};

export default userRealEstatePagesConfig;
