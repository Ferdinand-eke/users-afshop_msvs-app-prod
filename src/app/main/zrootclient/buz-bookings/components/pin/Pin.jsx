import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Typography } from "@mui/material";
import { Marker, Popup } from "react-leaflet";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";

function Pin({ item }) {

    // position={[item?.latitude, item?.longitude]}
  return (
    <Marker position={[item?.latitude, item?.longitude]}>
      <Popup>
        <div className="flex gap-[16px]">
          <img src={item?.imageSrcs[0]?.url} alt="" className="w-[64px] h-[48px] object-cover rounded-4"/>
          <div className="flex flex-col justify-between">
            <Typography component={NavLinkAdapter} to={`/bookings/listings/${item?._id}/${item?.slug}`}>{item?.title}</Typography>
            <span className="text-[14px]">{item?.roomCount} bedroom</span>
            <b className="text-[14px] text-orange-300 hover:text-orange-600">   ₦{formatCurrency(item?.price)}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}


export default Pin;
