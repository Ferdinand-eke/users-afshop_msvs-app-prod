
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Typography } from "@mui/material";
import { Marker, Popup } from "react-leaflet";

function FoodMartMapSingle({center, items}){

  useEffect(()=>{

  },[center])

  // console.log("CENTER", center)
  // console.log("vendorsLIST", items)

  return (
    <MapContainer center={[center?.latitude, center?.longitude]} zoom={6} scrollWheelZoom={false} className='w-[100%] h-[100%] rounded-md'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <>

    <Marker position={[items?.latitude, items?.longitude]}>
      <Popup>
        <div className="flex gap-[16px]">
          <img src={items?.imageSrc} alt="" className="w-[64px] h-[48px] object-cover rounded-4"/>
          <div className="flex flex-col justify-between">
            <Typography >{items?.title}</Typography>
            
          </div>
        </div>
      </Popup>
    </Marker>
    </>
    
  </MapContainer>
  )
}

export default FoodMartMapSingle
