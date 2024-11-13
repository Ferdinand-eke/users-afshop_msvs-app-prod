import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputAdornment, Typography } from "@mui/material";
// import useCountries from "src/app/hooks/useCountries";
import { useEffect, useState } from "react";
import useSellerCountries from "app/configs/data/server-calls/countries/useCountries";
import {
  getLgaByStateId,
  getStateByCountryId,
} from "app/configs/data/client/clientToApiRoutes";
import { TimePicker } from "@mui/x-date-pickers";

/**
 * The basic info tab.
 */

export const categoryset = [
  {
    label: "restaurant",
    // icon: TbBeach,
    // description: "This property is close to the beach",
  },
  {
    label: "eatery",
    // icon: GiWindmill,
    // description: "This property has windmills",
  },
  {
    label: "cafe",
    // icon: MdOutlineVilla,
    // description: "This property is modern",
  },
  {
    label: "bakery",
    // icon: GiWindmill,
    // description: "This property has windmills",
  },
];

function BasicInfoTabFoodMart() {
  const generateSingleOptions = () => {
    return categoryset.map((option, index) => {
      return (
        <MenuItem key={index} value={option.label}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const methods = useFormContext();
  const { control, formState, getValues } = methods;
  const { errors } = formState;
  const {
    data: countries,
    isLoading: countriesLoading,
    refetch,
  } = useSellerCountries();
  const [loading, setLoading] = useState(false);
  const [bstates, setBstates] = useState([]);
  const [blgas, setBlgas] = useState([]);

  useEffect(() => {
    if (getValues()?.foodMartCountry?.length > 0) {
      getStateDFromCountryId(getValues()?.foodMartCountry);
    }
    if (getValues()?.foodMartState?.length > 0) {
      console.log("Entered......");
      getLgasFromState(getValues()?.foodMartState);
    }
  }, [getValues()?.foodMartCountry, getValues()?.foodMartState]);

  async function getStateDFromCountryId(pid) {
    setLoading(true);

    const responseData = await getStateByCountryId(pid);

    if (responseData) {
      setBstates(responseData?.data);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  //**Get L.G.As from state_ID data */
  async function getLgasFromState(sid) {
    setLoading(true);
    // const responseData = await ProductRepository.getProductsById(pid);
    const responseData = await getLgaByStateId(sid);

    // console.log("gettingLGA (2) with state ID of:", responseData?.data)
    // return
    if (responseData?.data) {
      // console.log('LGAs From State:', responseData);
      setBlgas(responseData?.data);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  //   console.log("LGA ID", getValues()?.foodMartLga)
  // // console.log("LGA location", getLgasFromState(getValues()?.foodMartLga))

  return (
    <div>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="Name"
            autoFocus
            id="title"
            variant="outlined"
            fullWidth
            error={!!errors.title}
            helperText={errors?.title?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            label="Description"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />

      <>
        <Typography>Food Mart category</Typography>

        <Controller
          name="foodMartCategory"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Select
              className="mt-8 mb-16"
              id="foodMartCategory"
              label="Category"
              variant="outlined"
              placeholder="Select a category"
              fullWidth
              defaultValue=""
              onChange={onChange}
              value={value === undefined || null ? "" : value}
              error={!!errors.foodMartCategory}
              helpertext={errors?.foodMartCategory?.message}
            >
              {generateSingleOptions()}
            </Select>
          )}
        />
      </>

      {/* <Controller
        name="categories"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple categories"
                label="Categories"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      /> */}

      {/* <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple tags"
                label="Tags"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      /> */}

      {/* <Controller
          name="roomCount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Number of rooms"
              id="roomCount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rooms</InputAdornment>
                ),
              }}
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        /> */}

      {/* <Controller
          name="bathroomCount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Number of Bathrooms"
              id="bathroomCount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">BathRooms</InputAdornment>
                ),
              }}
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        /> */}

      {/* <Controller
          name="sittingroomCount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16 mx-4"
              label="Number of Sitting rooms"
              id="sittingroomCount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">sitting Room(s)</InputAdornment>
                ),
              }}
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        /> */}

      <>
        <Typography style={{ fontSize: "12px", fontWeight: "800" }}>
          Country of location?
        </Typography>
        <Controller
          name={`foodMartCountry`}
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Select
              // disabled 
              className="mt-8 mb-16"
              id="foodMartCountry"
              label="business country"
              fullWidth
              defaultValue=""
              onChange={onChange}
              value={value === undefined || null ? "" : value}
              error={!!errors.foodMartCountry}
              helpertext={errors?.foodMartCountry?.message}
            >
              <MenuItem value="">Select a country</MenuItem>
              {countries?.data?.data &&
                countries?.data?.data?.map((option, id) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
      </>

      <>
        <Typography style={{ fontSize: "12px", fontWeight: "800" }}>
          State location? (Dependent on country selected)
        </Typography>
        <Controller
          name={`foodMartState`}
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Select
              // disabled
              className="mt-8 mb-16"
              id="foodMartState"
              label="business state"
              fullWidth
              defaultValue=""
              onChange={onChange}
              value={value === undefined || null ? "" : value}
              error={!!errors.foodMartState}
              helpertext={errors?.foodMartState?.message}
            >
              <MenuItem value="">Select a state</MenuItem>
              {bstates &&
                bstates?.map((option, id) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
      </>

      <div className="sm:col-span-2">
        <Typography style={{ fontSize: "12px", fontWeight: "800" }}>
          L.G.A/County location
        </Typography>
        <Controller
          // control={control}
          // name="foodMartLga"
          name={`foodMartLga`}
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Select
              className="mt-8 mb-16"
              id="foodMartLga"
              label="L.G.A/County of Location"
              placeholder="L.G.A/County of location"
              fullWidth
              defaultValue=""
              onChange={onChange}
              value={value === undefined || null ? "" : value}
              error={!!errors.foodMartLga}
              helperText={errors?.foodMartLga?.message}
            >
              {blgas.length > 0 ? (
                blgas?.map((lga, index) => (
                  <MenuItem key={index} value={lga?._id}>
                    {lga?.name}
                    {/* {lga?._id} */}
                  </MenuItem>
                ))
              ) : (
                <span>No L.G.As found</span>
              )}
            </Select>
          )}
        />
      </div>

      <Controller
        name="busniessOpenPeriod"
        control={control}
        render={({ field }) => (
          <TimePicker
            {...field}
            views={['hours']}
            className="mt-8 mb-16"
            label="Open At"
            id="busniessOpenPeriod"
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />

<Controller
        name="busniessClosePeriod"
        control={control}
        render={({ field }) => (
          <TimePicker
            {...field}
            views={['hours']}
            className="ml-8 px-8 mt-8 mb-16"
            label="Close At"
            id="busniessClosePeriod"
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />

<Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="address"
            autoFocus
            id="address"
            variant="outlined"
            fullWidth
            error={!!errors.address}
            helperText={errors?.address?.message}
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTabFoodMart;
