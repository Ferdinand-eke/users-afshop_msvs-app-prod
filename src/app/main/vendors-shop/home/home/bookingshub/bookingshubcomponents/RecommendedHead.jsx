import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Typography } from "@mui/material";
import React from "react";

 function RecommendedHead({ title, color }) {
  return (
  <div className={`flex justify-between items-center ${color} p-3 rounded-t-lg text-xl text-white uppercase`}>
      <div className={`${color} p-3 rounded-t-lg text-xl text-white uppercase`}>
      {title}
    </div>

    <Typography 
    component={NavLinkAdapter} 
    to="/bookings/listings"
    className="text-md font-mono cursor-pointer">View all</Typography>
  </div>
  );
}

export default RecommendedHead