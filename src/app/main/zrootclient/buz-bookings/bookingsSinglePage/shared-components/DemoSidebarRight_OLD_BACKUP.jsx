import FuseNavigation from "@fuse/core/FuseNavigation";
import BookingsMap from "../../components/maps/BookingsMap";
import DetailsRight from "../../bookings-components/DetailsRight";
import { Box, Typography } from "@mui/material";
/**
 * Navigation data
 */

/**
 * The DemoSidebarRight component.
 */
function DemoSidebarRight(props) {
  
  const {
    isLoading,

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
  } = props;

  
  return (
    <div className="px-12 py-24 h-screen">
      {/* min-h-6xl  */}
      <div className="mx-12 text-3xl font-bold tracking-tighter">
        Booking Data Views
      </div>

      <div>
        <div className="bg-white p-4 shadow-md">
          <div className="flex items-center">
            <span className="text-4xl font-bold">4.3</span>
            <div className="ml-2">
              <div className="flex items-center">
                <i className="fas fa-star text-yellow-500"></i>
                <i className="fas fa-star text-yellow-500"></i>
                <i className="fas fa-star text-yellow-500"></i>
                <i className="fas fa-star text-yellow-500"></i>
                <i className="fas fa-star-half-alt text-yellow-500"></i>
              </div>
              <span className="text-gray-600">Based on 45 ratings</span>
            </div>
          </div>
          <div className="mt-4">
            {isLoading ? (
              <>
                <Box xs={24} lg={14}>
                  <p>loading...</p>
                </Box>
              </>
            ) : listing ? (

              <>
                <Box>
                  <DetailsRight
                    listing={listing}
                    locationValue={locationValue}
                    coordinates={coordinates}
                    price={price}
                    totalPrice={totalPrice}
                    onChangeDate={onChangeDate}
                    dateRange={dateRange}
                    onSubmit={onSubmit}
                    disabled={disabled}
                    disabledDates={disabledDates}
                  />
                </Box>
              </>
            ) : (
              <Box>
                <Typography>Data Not Found</Typography>
              </Box>
            )}

            
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default DemoSidebarRight;
