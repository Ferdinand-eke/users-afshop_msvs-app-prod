
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect } from "react";

function FoodMartMap({center, items}){

  useEffect(()=>{

  },[center])

  // console.log("vendorsLIST", items)
  return (
    <MapContainer center={[center?.latitude, center?.longitude]} zoom={6} scrollWheelZoom={false} className='w-[100%] h-[100%] rounded-md'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <>
    {
      center?._id && <>
      {items?.map(item=>(
      <Pin item={item} key={item?._id}/>
    ))}

      </>
    }
    </>
    
  </MapContainer>
  )
}

export default FoodMartMap
