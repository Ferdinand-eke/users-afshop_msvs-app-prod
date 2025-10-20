import { Box, Paper, Typography } from "@mui/material";
import React, { lazy, useMemo, useState } from "react";
import { ListingReservation } from "./reservationreview";
import { ListingRooms } from "./property-rooms/ListingRooms";
import RealtorProfile from "./RealtorProfile";
import GlobalChat from "./GlobalChat";
import PropertyInteractionCard from "./PropertyInteractionCard";


const DetailsRight = React.memo(
  ({
    listing,
  }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);


    return (
      <div className="space-y-4">

        {/* Realtor Profile Component */}
        <RealtorProfile realtor={listing?.realtor} />
        

        {/* Property Interaction Card */}
        <PropertyInteractionCard
          propertyData={listing}
          realtorInfo={listing?.realtor}
        />

        {/* {coordinates && <Map center={coordinates} />} */}


      </div>
    );
  }
);

export default DetailsRight;
