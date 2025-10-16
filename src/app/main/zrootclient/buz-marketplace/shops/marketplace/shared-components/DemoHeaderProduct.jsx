import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Controller } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";

/**
 * The DemoHeader component.
 */
function DemoHeader(props) {
  const {
    leftSidebarToggle,
    rightSidebarToggle,
  } = props;


  return (
    <div className="flex flex-col w-full sm:py-16 sm:px-20 ">
		
     
      <div className="flex justify-between items-center w-full mt-8">
        {leftSidebarToggle && (
          <div className="flex shrink-0 items-center">
            <IconButton onClick={leftSidebarToggle} aria-label="toggle sidebar">
              <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
            </IconButton>
          </div>
        )}
     
        {rightSidebarToggle && (
          <div className="flex shrink-0 items-center">
            <IconButton
              onClick={rightSidebarToggle}
              aria-label="toggle sidebar"
            >
              <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoHeader;
