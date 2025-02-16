import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Controller } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
// import UserCountrySelect from "src/app/apselects/usercountryselect";
// import UserStateSelect from "src/app/apselects/userstateselect";
// import UserLgaSelect from "src/app/apselects/userlgaselect";

/**
 * The DemoHeader component.
 */
function DemoHeader(props) {
  const {
    leftSidebarToggle,
    rightSidebarToggle,
    // countries,
    // stateData,
    // blgas,
    // methods,
  } = props;

  // const { reset, watch, control, formState, getValues } = methods;
  // const { reset, watch, control, formState, getValues, setValue } = methods;
  // const { errors } = formState;
  // const { selectCountry, selectState, selectLga } = watch();

  // const setCustomValue = (id, value) => {
  //   setValue(id, value, {
  //     shouldDirty: true,
  //     shouldTouch: true,
  //     shouldValidate: true,
  //   });
  // };

  function handleClick() {}

  return (
    <div className="flex flex-col w-full sm:py-16 sm:px-20 ">
      {/* p-24 */}

      <div className="flex justify-between items-center w-full mt-8">
        {leftSidebarToggle && (
          <div className="flex shrink-0 items-center">
            <IconButton onClick={leftSidebarToggle} aria-label="toggle sidebar">
              <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
            </IconButton>
          </div>
        )}

        <div className="flex mx-4 space-x-4 mt-4 md:mt-0 text-[10px]">
          {/* <UserCountrySelect
            value={selectCountry}
            onChange={(value) => setCustomValue("selectCountry", value)}
          />

          {selectCountry?._id && (
            <UserStateSelect
              states={stateData}
              value={selectState}
              onChange={(value) => setCustomValue("selectState", value)}
            />
          )}

          {selectState?._id && (
            <UserLgaSelect
              blgas={blgas}
              value={selectLga}
              onChange={(value) => setCustomValue("selectLga", value)}
            />
          )} */}
        </div>
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
