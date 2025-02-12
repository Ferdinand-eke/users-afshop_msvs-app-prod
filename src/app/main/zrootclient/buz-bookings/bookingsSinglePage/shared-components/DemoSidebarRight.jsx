import FuseNavigation from '@fuse/core/FuseNavigation';
import BookingsMap from '../../components/maps/BookingsMap';
import DetailsRight from '../../bookings-components/DetailsRight';
import { Box } from '@mui/material';
/**
 * Navigation data
 */

/**
 * The DemoSidebarRight component.
 */
function DemoSidebarRight(props) {
	const {
		// bookingData, 
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
	
	} = props
	// console.log("Bookin_DATA", bookingsData)
	return (
		<div className="px-12 py-24 h-screen">
			{/* min-h-6xl  */}
			<div className="mx-12 text-3xl font-bold tracking-tighter">Booking Data Views</div>

		
			 {/* <BookingsMap items={bookingsData}/> */}
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

                {/* <div className="bg-white p-4 shadow-md">
                 
                  <div className="mt-4">
                    <p>MAP to show property location</p>
                   
                  </div>
                </div> */}

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
                      <span className="text-gray-600">Booking Calendar</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <span className="text-gray-600">Support</span>
                      <div className="w-full bg-gray-200 h-2 ml-2">
                        <div
                          className="bg-yellow-500 h-2"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600">Speed</span>
                      <div className="w-full bg-gray-200 h-2 ml-2">
                        <div
                          className="bg-yellow-500 h-2"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600">Quality</span>
                      <div className="w-full bg-gray-200 h-2 ml-2">
                        <div
                          className="bg-yellow-500 h-2"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-600">Delivery</span>
                      <div className="w-full bg-gray-200 h-2 ml-2">
                        <div
                          className="bg-yellow-500 h-2"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Reviews</h2>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <img
                        src="https://placehold.co/50x50"
                        alt="Reviewer 1"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="font-bold">Gold Coast</span>
                          <div className="flex items-center ml-2">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star-half-alt text-yellow-500"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aliquam egestas libero ac turpis pharetra, in
                          vehicula lacus elementum.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start mt-4">
                      <img
                        src="https://placehold.co/50x50"
                        alt="Reviewer 2"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="font-bold">Gold Coast</span>
                          <div className="flex items-center ml-2">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star-half-alt text-yellow-500"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aliquam egestas libero ac turpis pharetra, in
                          vehicula lacus elementum.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start mt-4">
                      <img
                        src="https://placehold.co/50x50"
                        alt="Reviewer 3"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="font-bold">Gold Coast</span>
                          <div className="flex items-center ml-2">
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star text-yellow-500"></i>
                            <i className="fas fa-star-half-alt text-yellow-500"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Aliquam egestas libero ac turpis pharetra, in
                          vehicula lacus elementum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 mt-4 shadow-md">
                  <h2 className="text-xl font-bold">Ask a Question</h2>
                  <form className="mt-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <textarea
                      placeholder="Message"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                    ></textarea>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">
                      Submit
                    </button>
                  </form>
                </div>
              </div>

		</div>
	);
}

export default DemoSidebarRight;
