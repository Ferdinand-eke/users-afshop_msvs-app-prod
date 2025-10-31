import { Box, Paper, Typography } from "@mui/material";
import React, { lazy, useMemo, useState } from "react";
import { ListingReservation } from "./reservationreview";
import { ListingRooms } from "./property-rooms/ListingRooms";


const DetailsRight = React.memo(
  ({
    listing,
    locationValue,
    coordinates,
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates,
  }) => {
    // const Map = useMemo(
    //   () => lazy(() => import("../bookings-components/map")),
    //   [locationValue]
    // );



    return (
      <div>
        <Box>
          <Paper className="lg:mb-5 px-4 py-3">
            <Typography className="px-4 mb-[10px] text-dark dark:text-white/[.87] text-xl lg:text-[16px] sm:text-2xl font-semibold">
              {listing?.title}
            </Typography>
          </Paper>

          {listing?.isRentIndividualRoom ? (
            <>
              <Typography className="text-gray-600 mb-2 px-4 text-sm font-semibold" variant="body2" color="text.secondary">
                View rooms and available dates.
              </Typography>

              <ListingRooms
                rooms={listing?.rooms}
                propertyId={listing?.id}
                merchantId={listing?.shop}
              />

            </>

    

          ) : (
            <>
              {listing ? (
                <>
                  {/* date picker here */}
                  <ListingReservation
                    price={price}
                    totalPrice={totalPrice}
                    onChangeDate={onChangeDate}
                    dateRange={dateRange}
                    onSubmit={onSubmit}
                    disabled={disabled}
                    disabledDates={disabledDates}
                  />
                </>
              ) : (
                <Box className="px-4 py-3">
                  <Typography>Data Not Found</Typography>
                </Box>
              )}
            </>
          )}
        </Box>

       
      </div>
    );
  }
);

export default DetailsRight;
