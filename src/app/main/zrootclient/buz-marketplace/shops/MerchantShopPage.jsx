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
import { FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseLoading from "@fuse/core/FuseLoading";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useParams } from "react-router";
import {
  getQueryShopProductsById,
  getShopAndProductById,
} from "app/configs/data/client/RepositoryClient";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
import ClienttErrorPage from "../../components/ClienttErrorPage";

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
function MerchantShopPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const { shopId } = routeParams;



  const [store, setStore] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const [shopitemsquery, setShopItemsQuery] = useState(null);

  const getStore = async () => {
    setLoading(true);
    const responseData = await getShopAndProductById(shopId);
    if (responseData) {
      setStore(responseData.data?.data);
      setProducts(responseData.data?.products);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  };

  const queryVendorProducts = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endPoint = `?shopitemsquery=${shopitemsquery}`;
    const reponse = await getQueryShopProductsById(`${shopId}${endPoint}`)
      .then((response) => {
        setProducts(response.data);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
  };

  useEffect(() => {
    getStore();
  }, [shopId]);
  

  let productItemsView;

  if (!loading) {
      if (products && products.length > 0) {
        productItemsView = products?.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded shadow flex flex-wrap ">
            <div className="relative w-full">
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
            <div className="mt-4">
              {/* <Typography className="bg-blue-500 text-white text-xs px-2 py-1 rounded w-fit"
         
              >
                {product?.shop?.shopname}
              </Typography> */}

              <Typography
                className="mt-2 text-sm font-bold cursor-pointer"
                component={NavLinkAdapter}
                to={`/marketplace/product/${product?._id}/${product?.slug}`}
              >
                {product?.name} 
              </Typography>
              <p className="text-orange-500 font-bold mt-2">
                {formatCurrency(product?.price)}
              </p>
              <p className="text-gray-500 line-through">
                {formatCurrency(product?.listprice)}
              </p>
              {/* <p className="text-green-500">-70%</p> */}
              
            </div>

            <div className="flex justify-between items-center mt-4 w-full">
                <i className="far fa-heart text-xl"></i>

                <button className="text-black  border-orange-500 bg-orange-500 hover:bg-orange-800 px-4 py-2 rounded w-full mb-0 ">
                    ADD TO CART
                  </button>
              </div>
          </div>
        ));
      } else {
          productItemsView = <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          className="flex flex-col flex-1 items-center justify-center h-full"
        >
          <Typography color="text.secondary" variant="h5">
            No products products
          </Typography>
        </motion.div>;
      }
  } else {
      productItemsView = <FuseLoading />;
  }


  return (
    <FusePageSimple
      content={
        <>
          <div className="h-screen flex flex-col md:mx-200 mt-20">
            <div className="flex flex-1 flex-col md:flex-row gap-10">
              {/* Map */}
              <div className="w-full md:w-3/12 bg-white relative  mt-4 md:mt-0 md:sticky top-16 h-[500px] overflow-scroll">
                <div className="flex flex-col items-center">
                  <img
                    src={store?.coverimage}
                    alt="Store logo"
                    className="rounded-full mb-4"
                  />
                  <div className="text-center">
                    <p className="text-gray-500">Since 2023</p>
                    <Typography className="text-xl font-bold"
                   
                    >{store?.shopname} </Typography>
                    <p className="text-gray-500">{products?.length} products</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
                    <i className="fas fa-ticket-alt text-xl"></i>
                    <span className="ml-2">Coupons</span>
                  </button>
                  <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
                    <i className="fas fa-address-book text-xl"></i>
                    <span className="ml-2">Contact</span>
                  </button>
                  <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
                    <i className="fas fa-globe text-xl"></i>
                    <span className="ml-2">Website</span>
                  </button>
                  <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
                    <i className="fas fa-file-alt text-xl"></i>
                    <span className="ml-2">Terms</span>
                  </button>
                  <button className="bg-gray-100 p-2 rounded-lg flex items-center justify-center">
                    <i className="fas fa-question-circle text-xl"></i>
                    <span className="ml-2">FAQs</span>
                  </button>
                </div>
                <div className="mt-6">
                  <h3 className="font-bold">Address</h3>
                  <p className="text-gray-500">
                  {store?.address}
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <main
                className=" w-full md:w-10/12 p-4"
              >
                <div className=" bg-white flex flex-col md:flex-row justify-between items-center mb-4">
                  <input type="text" placeholder="search shop products"
                  className="h-35 bg-gray-200 rounded-8 p-8"
                  />
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <select className="border rounded px-4 py-2">
                      <option> Shipped from Nigeria</option>
                    </select>
                    <button className="border rounded px-4 py-2">search</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 
                  {productItemsView}

                  
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
              </main>
              {/* </main> */}
            </div>
          </div>
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default MerchantShopPage;
