import _ from "@lodash";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { Button, FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import useGetAllFoodMarts from "app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo";
import { Controller, useForm } from "react-hook-form";
import useSellerCountries from "app/configs/data/server-calls/countries/useCountries";
import {
  getLgasByStateId,
  getStateByCountryId,
} from "app/configs/data/client/RepositoryClient";
import ClienttErrorPage from "../components/ClienttErrorPage";
import FoodMartMap from "./components/maps/FoodMartMap";
import UserCountrySelect from "src/app/apselects/usercountryselect";
import UserStateSelect from "src/app/apselects/userstateselect";
import UserLgaSelect from "src/app/apselects/userlgaselect";

const container = {
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

/**
 * The Courses page.
 */
function FoodMartsPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { data: AllFoodMarts, isLoading, isError } = useGetAllFoodMarts();

  const [loading, setLoading] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [blgas, setBlgas] = useState([]);
  // const [markets, setBMarkets] = useState([]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      selectCountry: "",
      selectState: "",
      selectLga: "",
    },
    // resolver: zodResolver(schema)
  });
  const { reset, watch, control, formState, getValues, setValue } = methods;
  const { errors } = formState;
  const { selectCountry, selectState, selectLga } = watch();

  const { data: countries } = useSellerCountries();

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  

  useEffect(() => {
    if (selectCountry?._id?.length > 0) {
      findStatesByCountry(selectCountry?._id);
    }

    if (getValues()?.selectState?._id?.length > 0) {
      getLgasFromState(getValues()?.selectState?._id);
    }
  }, [selectCountry?._id, selectState?._id, selectLga?._id]);


  async function findStatesByCountry(countryId) {
    setLoading(true);
    const stateResponseData = await getStateByCountryId(countryId);

    if (stateResponseData) {
      setStateData(stateResponseData?.data);

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
    const responseData = await getLgasByStateId(sid);

    if (responseData) {
      setBlgas(responseData?.data);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <ClienttErrorPage
          message={" Error occurred while retriving listings"}
        />
      </motion.div>
    );
  }

  if (!AllFoodMarts?.data?.data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No listings found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <FusePageSimple
      content={
        <>
          <div className="h-screen flex flex-col md:mx-[50px] mt-20">
            <div className="flex flex-1 flex-col md:flex-row">
              {/* Map */}
              <div className="w-full p-8 md:w-3/12 bg-white relative  mt-4 md:mt-0 md:sticky top-16 h-[500px] overflow-scroll">
                <h2 className="font-bold mb-4 p-4">CATEGORY</h2>
                <ul className="space-y-2 p-4">
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Phones & Tablets</li>
                  <li>Home & Office</li>
                  <li>Automobile</li>
                </ul>
                <h2 className="font-bold mt-6 mb-4">SHIPPED FROM</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from abroad
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Shipped from Nigeria
                  </label>
                </div>
                <h2 className="font-bold mt-6 mb-4">PRICE (₦)</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="6090"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="border rounded p-2 w-20"
                    placeholder="9999999"
                  />
                  <button className="bg-orange-500 text-white px-4 py-2 rounded">
                    APPLY
                  </button>
                </div>
                <h2 className="font-bold mt-6 mb-4">DISCOUNT PERCENTAGE</h2>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    50% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    40% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    30% or more
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="discount" className="mr-2" />
                    20% or more
                  </label>
                </div>
              </div>

              {/* Main Content */}

              <main className="mt-10 md:w-3/4 p-4 rounded-md">
          
                <div className=" bg-white flex flex-col md:flex-row justify-between items-center mb-4 p-4">
                  <h1 className="text-xl font-bold">Listings</h1>
                  <div className="flex mx-4 space-x-4 mt-4 md:mt-0 text-[10px]">
                    
                    <UserCountrySelect
                      value={selectCountry}
                      onChange={(value) =>
                        setCustomValue("selectCountry", value)
                      }
                    />
                   
                    {selectCountry?._id && (
                      <UserStateSelect
                        states={stateData}
                        value={selectState}
                        onChange={(value) =>
                          setCustomValue("selectState", value)
                        }
                      />
                    )}

                    {selectState?._id && (
                      <UserLgaSelect
                        blgas={blgas}
                        value={selectLga}
                        onChange={(value) => setCustomValue("selectLga", value)}
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
                  {AllFoodMarts?.data?.data?.map((foodmart, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded shadow flex flex-col "
                    >
                      <div className="relative">
                        <img
                          src={foodmart?.imageSrcs[0]?.url}
                          alt="MacBook Pro"
                          className="w-full h-[160px] rounded-lg transition ease-in-out delay-150  hover:scale-105 object-cover"
                          height={70}
                        />
                        <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                          Black Friday deal
                        </span>
                      </div>
                      <div className="mt-4 ">
                        <Typography
                          className="mt-2 text-sm font-bold cursor-pointer"
                          component={NavLinkAdapter}
                          to={`/foodmarts/listings/visit-mart/${foodmart?._id}/${foodmart?.slug}`}
                        >
                          {foodmart?.title}
                        </Typography>
                      </div>

                      <div className="flex justify-between items-center mt-4 bottom-0">
                        <i className="far fa-heart text-xl"></i>

                        <Button
                          className="text-black  border-orange-500 bg-orange-500 hover:bg-orange-800 px-4 py-2 rounded w-full mb-0 "
                          component={NavLinkAdapter}
                          to={`/foodmarts/listings/visit-mart/${foodmart?._id}/${foodmart?.slug}`}
                        >
                          Visit Mart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
              </main>

              {/* Map */}
              <div className="w-full md:w-1/3 bg-gray-200 relative  mt-4 md:mt-0 md:sticky top-16 h-screen">
               
                 {selectCountry?._id && 
                  <FoodMartMap
                    center={selectCountry}
                    items={AllFoodMarts?.data?.data}
                  />}



              </div>
            </div>
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default FoodMartsPage;
