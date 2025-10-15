import { Box, Paper, Typography } from "@mui/material";
import React, { lazy, useMemo, useState } from "react";
import { ListingReservation } from "./reservationreview";
import { ListingRooms } from "./property-rooms/ListingRooms";
import RealtorProfile from "./RealtorProfile";
import GlobalChat from "./GlobalChat";


const DetailsRight = React.memo(
  ({
    listing,
  }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // const Map = useMemo(
    //   () => lazy(() => import("../bookings-components/map")),
    //   [locationValue]
    // );



    return (
      <div>

        {/* Realtor Profile Component */}
        <RealtorProfile realtor={listing?.realtor} />

        {/* {coordinates && <Map center={coordinates} />} */}

       
      </div>
    );
  }
);

export default DetailsRight;
