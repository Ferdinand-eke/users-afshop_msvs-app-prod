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
    countries,
    stateData,
    blgas,
    methods,
  } = props;
  const { reset, watch, control, formState, getValues } = methods;
  const { errors } = formState;
  // const { selectCountry, selectState, selectLga } = watch();

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
     
        <div className="flex space-x-4 mt-4 md:mt-0 text-[10px] items-start">
          <Controller
            name="selectCountry"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
              <Select
                className="border rounded px-4 py-2 h-[10px] text-[10px]"
                id="selectCountry"
                label="selectCountry"
                fullWidth
                defaultValue=""
                onChange={onChange}
                value={value === undefined || null ? "" : value}
                error={!!errors.selectCountry}
                helpertext={errors?.selectCountry?.message}
              >
                {countries &&
                  countries?.map((option, id) => (
                    <MenuItem
                      className="border rounded px-4 py-2 h-[10px] text-[12px]"
                      key={option._id}
                      value={option._id}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
          {stateData?.length > 0 && (
            <Controller
              name="selectState"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <Select
                  className="border rounded px-4 py-2 h-[10px] text-[10px]"
                  id="selectState"
                  label="selectState"
                  fullWidth
                  defaultValue=""
                  onChange={onChange}
                  value={value === undefined || null ? "" : value}
                  error={!!errors.selectState}
                  helpertext={errors?.selectState?.message}
                >
                  {stateData &&
                    stateData?.map((option, id) => (
                      <MenuItem
                        className="border rounded px-4 my-4 h-[12px] text-[14px]"
                        key={option._id}
                        value={option._id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          )}

          {blgas?.length > 0 && (
            <Controller
              name="selectLga"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <Select
                  className="border rounded px-4 py-2 h-[10px] text-[10px]"
                  id="selectLga"
                  label="selectLga"
                  fullWidth
                  defaultValue=""
                  onChange={onChange}
                  value={value === undefined || null ? "" : value}
                  error={!!errors.selectLga}
                  helpertext={errors?.selectLga?.message}
                >
                  {blgas &&
                    blgas?.map((option, id) => (
                      <MenuItem
                        className="border rounded px-4 my-4 h-[12px] text-[14px]"
                        key={option._id}
                        value={option._id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          )}
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
