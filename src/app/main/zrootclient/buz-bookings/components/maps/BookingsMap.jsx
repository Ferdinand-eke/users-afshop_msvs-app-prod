
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';
import { MapContainer, TileLayer } from "react-leaflet";

function BookingsMap({items}){
    console.log("items_in_MAP", items)
  return (
    <MapContainer center={[52.4797, -1.90269]} zoom={7} scrollWheelZoom={false} className='w-[100%] h-[100%] rounded-md'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items?.map(item=>(
      <Pin item={item} key={item?._id}/>
    ))}

  </MapContainer>
  )
}

export default BookingsMap
