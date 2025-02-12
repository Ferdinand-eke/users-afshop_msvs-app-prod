import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeader';
import DemoContent from './shared-components/DemoContent';
import DemoSidebar from './shared-components/DemoSidebar';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
// import useGetAllProducts from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { useForm } from 'react-hook-form';
import useSellerCountries from 'app/configs/data/server-calls/countries/useCountries';
import {
	getLgasByStateId,
	getQueryShopProductsById,
	getShopAndProductById,
	getStateByCountryId,
  } from "app/configs/data/client/RepositoryClient";
import { useParams } from 'react-router';
import { useGetProductByCategory } from 'app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo';

const Root = styled(FusePageSimpleWithMargin)(({ theme }) => ({

	// marginLeft:'100px',
	// marginRight:'100px',
	
	
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-toolbar': {

	},
	'& .FusePageSimple-content': {
		// marginLeft:'100px',
		// marginRight:'100px',
	},
	'& .FusePageSimple-sidebarHeader': {
		
	},
	'& .FusePageSimple-sidebarContent': {
		
	},
	
}));

/**
 * The SimpleWithSidebarsContentScroll page.
 */
function MerchantShopPafeWithContentScrollPage() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

  const routeParams = useParams();
  const { shopId } = routeParams;



  const [store, setStore] = useState(null);
  // const [products, setProducts] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [blgas, setBlgas] = useState([]);

  const [shopitemsquery, setShopItemsQuery] = useState(null);

  const getStore = async () => {
    setProductLoading(true);
    const responseData = await getShopAndProductById(shopId);
    if (responseData) {
      setStore(responseData.data?.data);
      setProducts(responseData.data?.products);
      setTimeout(
        function () {
          setProductLoading(false);
        }.bind(this),
        250
      );
    }
  };

  // const queryVendorProducts = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const endPoint = `?shopitemsquery=${shopitemsquery}`;
  //   const reponse = await getQueryShopProductsById(`${shopId}${endPoint}`)
  //     .then((response) => {
  //       setProducts(response.data);
  //       setTimeout(
  //         function () {
  //           setLoading(false);
  //         }.bind(this),
  //         250
  //       );
  //     })
  //     .catch((error) => ({ error: JSON.stringify(error) }));
  // };

  useEffect(() => {
    getStore();
  }, [shopId]);

	

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      selectCountry: "",
      selectState: "",
      selectLga: "",
    },
  });
  const { reset, watch, control, formState, getValues } = methods;
  const { selectCountry, selectState, selectLga } = watch();


  const { data: countries } = useSellerCountries();

   /****Use-EFFECT to manage filtering of products by Country=>state=>LGA fetch */
  // useEffect(() => {
  //   if (allProductsByCategory?.data) {
  //     setProducts(allProductsByCategory?.data);
  //   }else if (selectCountry) {
  //     setProducts(allProductsByCategory?.data);
    
  //   }  else if (selectCountry && selectState) {
  //     setProducts(allProductsByCategory?.data);
    
  //   }else if (selectCountry && selectState && selectLga) {
  //     setProducts(allProductsByCategory?.data);
    
  //   } else {
  //     setProducts(allProductsByCategory?.data);
  //   }

  //   if (selectCountry && selectState) {
  //     getLgasFromState(selectState);
  //   }

  //   // if (selectCountry && selectState && selectLga) {
  //   //   console.log("Getting products for this partivular LGA :", selectLga);
  //   // }

    
  // }, [allProductsByCategory?.data,
  //   selectCountry, selectState, selectLga
  // ]);

  

  /****Use-EFFECT to manage request for Country=>state=>LGA fetch */
  useEffect(() => {
    if (selectCountry?.length > 0) {
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




	return (
		<Root
	
			header={
				<DemoHeader
				countries={countries?.data?.data}
				stateData={stateData}
				blgas={blgas}
				methods={methods}

					leftSidebarToggle={() => {
						setLeftSidebarOpen(!leftSidebarOpen);
					}}
					rightSidebarToggle={() => {
						setRightSidebarOpen(!rightSidebarOpen);
					}}
				/>
			}
			content={<DemoContent
				products={products}
				isLoading={productLoading}
				// isError={isError}
				/>}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarContent={<DemoSidebar 
        products={products}
        store={store}
      />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => {
				setRightSidebarOpen(false);
			}}
			rightSidebarContent={<DemoSidebarRight />}
			scroll="content"
		/>
	);
}

export default MerchantShopPafeWithContentScrollPage;
