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
import useGetProducts from "app/configs/data/server-calls/auth/userapp/allProductHooks/useAfshopGetProducts";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router";
import useGetAllProducts from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import ClienttErrorPage from "../../components/ClienttErrorPage";
import CategoryAndTradehub from "./components/CategoryAndTradehub";
import { use } from "react";
import useSellerCountries from "app/configs/data/server-calls/countries/useCountries";
import { Controller, useForm } from "react-hook-form";
import {
  getLgasByStateId,
  getStateByCountryId,
} from "app/configs/data/client/RepositoryClient";

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
function MarketplaceShops() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  // let location = useLocation();

  // console.log("URL",location?.pathname);
  // const URL = location?.pathname;

  // const urlArray = URL.split('/')

  // console.log("URL_ARRAY",urlArray);

  // console.log("URL_ARRAY_22",urlArray[1]);

  const [products, setProducts] = useState([]);
  //  const [selectCountry, setSelectCountry] = useState('')
  //  const [selectState, setSelectState] = useState('')
  //  const [selectLga, setSelectLga] = useState('')
  const { data: allProducts, isLoading, isError } = useGetAllProducts();
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
  const { reset, watch, control, formState, getValues } = methods;
  const { errors } = formState;
  const { selectCountry, selectState, selectLga } = watch();

  // const [products, setProducts] = useState([])
  const { data: countries } = useSellerCountries();

   /****Use-EFFECT to manage filtering of products by Country=>state=>LGA fetch */
  useEffect(() => {
    if (allProducts?.data?.products) {
      setProducts(allProducts?.data?.products);
    }else if (selectCountry) {
      setProducts(allProducts?.data?.products);
    
    }  else if (selectCountry && selectState) {
      setProducts(allProducts?.data?.products);
    
    }else if (selectCountry && selectState && selectLga) {
      setProducts(allProducts?.data?.products);
    
    } else {
      setProducts(allProducts?.data?.products);
    }

    if (selectCountry && selectState) {
      getLgasFromState(selectState);
    }

    // if (selectCountry && selectState && selectLga) {
    //   console.log("Getting products for this partivular LGA :", selectLga);
    // }

    
  }, [allProducts?.data?.products,
    selectCountry, selectState, selectLga
  ]);

  

  /****Use-EFFECT to manage request for Country=>state=>LGA fetch */
  useEffect(() => {
    if (selectCountry?.length > 0) {
      console.log(`Getting stated in this country ${location?.name}`);
      findStatesByCountry(selectCountry);
    }

    if (selectCountry && selectState) {
      getLgasFromState(selectState);
    }

    if (selectCountry && selectState && selectLga) {
      console.log("Getting products for this partivular LGA :", selectLga);
    }
  }, [selectCountry, selectState, selectLga]);

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
        <ClienttErrorPage message={"Error occurred while retriving products"} />
      </motion.div>
    );
  }

  if (!products) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No products products
        </Typography>
      </motion.div>
    );
  }

  return (
    <FusePageSimple
      content={
        <>
          <div className="h-screen flex flex-col md:mx-200 mt-20">
            <div className="flex flex-1 flex-col md:flex-row gap-10">
              {/* Map */}

              <div className="w-full p-8 md:w-1/4 bg-white relative  mt-4 md:mt-0 md:sticky top-16 h-[500px] overflow-scroll">
                {/* Add Category And Tradehub Component */}
                <CategoryAndTradehub />
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
                  <h1 className="text-xl font-bold">
                    Shop Online in Nigeria (8908 products found)
                  </h1>
                  <div className="flex space-x-4 mt-4 md:mt-0 text-[10px]">
                    {/* <select className="border rounded px-4 py-2"
                    value={selectCountry}
                    onChange={(e) =>setSelectCountry(e.target.value)}
                    >
                      {countries?.data?.data?.map((country) =>  
                      (<option key={country?._id} value={country?._id}> {country?.name} {country?._id}</option>) )}
                    </select> */}
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
                          //  {...other}
                          //  {...(error && {error: true, helperText: error})}
                        >
                          {/* <MenuItem value="">Select a product category</MenuItem> */}
                          {countries?.data?.data &&
                            countries?.data?.data?.map((option, id) => (
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
                            // className="border rounded px-4 py-2 h-[10px]"
                            className="border rounded px-4 py-2 h-[10px] text-[10px]"  
                            id="selectState"
                            label="selectState"
                            fullWidth
                            defaultValue=""
                            onChange={onChange}
                            value={value === undefined || null ? "" : value}
                            error={!!errors.selectState}
                            helpertext={errors?.selectState?.message}
                            //  {...other}
                            //  {...(error && {error: true, helperText: error})}
                          >
                            {/* <MenuItem value="">Select a product category</MenuItem> */}
                            {stateData &&
                              stateData?.map((option, id) => (
                                <MenuItem 
                                className="border rounded px-4 my-4 h-[12px] text-[14px]"
                                key={option._id} value={option._id}>
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
                            // className="border rounded px-4 py-2 h-[10px] text-[14px]"

                            className="border rounded px-4 py-2 h-[10px] text-[10px]"                            id="selectLga"
                            label="selectLga"
                            fullWidth
                            defaultValue=""
                            onChange={onChange}
                            value={value === undefined || null ? "" : value}
                            error={!!errors.selectLga}
                            helpertext={errors?.selectLga?.message}
                            //  {...other}
                            //  {...(error && {error: true, helperText: error})}
                          >
                            {/* <MenuItem value="">Select a product category</MenuItem> */}
                            {blgas &&
                              blgas?.map((option, id) => (
                                <MenuItem 
                                className="border rounded px-4 my-4 h-[12px] text-[14px]"
                                key={option._id} value={option._id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                          </Select>
                        )}
                      />
                    )}

                    {/* <select className="border rounded px-4 py-2">
                      {countries?.data?.data?.map((country) =>  <option key={country?._id}> {country?.name}</option> )}

                     
                    </select> */}
                    {/* <select className="border rounded px-4 py-2">
                      {countries?.data?.data?.map((country) =>  <option key={country?._id}> {country?.name}</option> )}

                     
                    </select> */}
                    {/* <button className="border rounded px-4 py-2">Brand</button>
                    <button className="border rounded px-4 py-2">Price</button> */}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded shadow flex flex-col"
                    >
                      <div className="relative">
                        <img
                          src={product?.image}
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
                          className="bg-blue-500 text-white text-xs px-2 py-1 rounded w-fit"
                          component={NavLinkAdapter}
                          to={`/marketplace/merchant/${product?.shop?._id}/portal`}
                        >
                          {product?.shop?.shopname}
                        </Typography>
                        <br />

                        <Typography
                          className="mt-2 text-sm font-bold cursor-pointer"
                          component={NavLinkAdapter}
                          to={`/marketplace/product/${product?._id}/${product?.slug}`}
                        >
                          {product?.name}
                        </Typography>
                        <p className="text-orange-500 font-bold mt-2">
                          {formatCurrency(product?.price)}{" "}
                          <span className="text-[10px]">
                            {" "}
                            per {product?.quantityunitweight?.unitname}
                          </span>
                        </p>

                        {product?.listprice && (
                          <p className="text-gray-500 line-through">
                            {formatCurrency(product?.listprice)}
                          </p>
                        )}

                        {/* <p className="text-green-500">-70%</p> */}
                      </div>
                      <div className="flex justify-between items-center mt-4 bottom-0">
                        <i className="far fa-heart text-xl"></i>

                        <button className="text-black  border-orange-500 bg-orange-500 hover:bg-orange-800 px-4 py-2 rounded w-full mb-0 ">
                          ADD TO CART
                        </button>
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
            </div>
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default MarketplaceShops;
