import * as React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
// import Drawer from "@mui/material/Drawer";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import RoomAvailableDatesPage from "./RoomAvailableDatesPage";

export const ListingRooms = ({ rooms, propertyId, merchantId }) => {

    const [open, setOpen] = React.useState(false);
    const [roomId, setRoomId] = React.useState('');
    const [roomPrice, setRoomPrice] = React.useState('');

  const toggleDrawer = (newOpen, idOfRoom, priceOfRoom) => () => {
    setOpen(newOpen);
    setRoomId(idOfRoom);
    setRoomPrice(priceOfRoom);
  };

   const AvailableDates = (
    <Box
      sx={{ width: 350 }}
      sm={{ width: 250 }}
      role="presentation"
    >

      <RoomAvailableDatesPage
        roomId={roomId}
        roomPrice={roomPrice}
        propertyId={propertyId}
        merchantId={merchantId}
      />
    </Box>
  );

  return (
    <div
      className="
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
        "
    >
      {rooms.map((room) => (
        <div key={room.id}>
          {/* <Typography>{room.title}</Typography>
          <Typography>{formatCurrency(room.price)}</Typography> */}

          <div
            className="
            flex flex-row items-center 
            "
          >
            <Typography
              className="text-dark dark:text-white/[.87] mt-[18px] mb-2 text-[22px] font-medium"
              as="h3"
            >
                <span className="text-lg text-light dark:text-white/60">{room.title}</span>
                <br/>
              <span className="text-sm text-light dark:text-white/60">₦</span>

              <span>
                {formatCurrency(room.price)}{" "}
                <span className="text-sm ltr:ml-1.5 rtl:mr-1.5 text-light dark:text-white/30 font-normal">
                  {" "}
                  per night
                </span>
              </span>
            </Typography>
          </div>
          
          <div className="p-4">
            <Button
              size="small"
              type="primary"
              className="w-full bg-orange-500 hover:bg-orange-800 text-white px-4 py-2 rounded-lg bottom-0 h-[30px]"  
            //   onClick={onSubmit}
              //   disabled={disabled}
              onClick={toggleDrawer(true, room?.id, room?.price)}
            >
              View Available Dates
              
            </Button>
            <hr className="mt-4"/>
          </div>



          
        </div>
      ))}


       <Drawer open={open} onClose={toggleDrawer(false)}>
          {AvailableDates}
        </Drawer>
    </div>
  );
};
