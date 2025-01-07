import React from "react";
import GoogleMapReact from "google-map-react";

const Pagetitle = ({ title }) => (
  <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
);

const AnyReactComponent = ({ text }) => (
  <div className="bg-blue-500 text-white p-2 rounded">{text}</div>
);

const HotelsAndMap = ({ hotelList, center, zoom }) => {
  return (
    <div className="main-content flex h-screen">
      {/* Left Panel: Hotel List */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <Pagetitle title="Hotels" />
        <div className="grid grid-cols-2 gap-4">
          {hotelList.map((hotel, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {hotel.feature && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold py-1 px-2 rounded">
                  Featured
                </span>
              )}
              <div className="relative">
                <a href="/defaulthoteldetails">
                  <img
                    src={`assets/images/${hotel.imageUrl}`}
                    alt={hotel.title}
                    className="w-full h-48 object-cover"
                  />
                </a>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-1">
                  <a
                    href="/default-hotel-details"
                    className="text-gray-800 hover:text-blue-500"
                  >
                    {hotel.title}
                  </a>
                </h4>
                <p className="text-sm text-gray-500">{hotel.location}</p>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img
                      key={i}
                      src={`assets/images/${
                        i < hotel.rating ? "star.png" : "star-disable.png"
                      }`}
                      alt={`${i < hotel.rating ? "star" : "no star"}`}
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-green-500 font-bold text-lg">
                    ${hotel.price}
                    <span className="text-sm text-gray-500">/ mo</span>
                  </span>
                  <a
                    href="/defaulthoteldetails"
                    className="bg-blue-500 text-white p-2 rounded-full"
                  >
                    <i className="feather-chevron-right" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Map */}
      <div className="w-1/2 hidden xl:block bg-white shadow-lg">
        <div className="sticky top-0 h-screen">
          <GoogleMapReact defaultCenter={center} defaultZoom={zoom}>
            <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
};

export default HotelsAndMap;
