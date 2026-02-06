import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useState, useCallback, useMemo, memo } from 'react';
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
	getStateByCountryId,
  } from "app/configs/data/client/RepositoryClient";
import { useParams } from 'react-router';
import { useGetProductByCategory } from 'app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo';
import useGetUserAppSetting from "app/configs/data/server-calls/auth/userapp/a_userapp_settings/useAppSettingDomain";
import ServiceStatusLandingPage from "../../../aapp-settings-from-admin/ServiceStatusLandingPage";

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
 * Active Marketplace Products By Category Component
 * This component renders when the marketplace service is ACTIVE
 */
function ActiveMarketplaceProductsByCategoryPage() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

  const routeParams = useParams();
  const { id } = routeParams;

  const {
    data: allProductsByCategory,
    isLoading,
    isError,
  } = useGetProductByCategory(id);

	const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [blgas, setBlgas] = useState([]);

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
  useEffect(() => {
    if (allProductsByCategory?.data) {
      setProducts(allProductsByCategory?.data);
    }else if (selectCountry) {
      setProducts(allProductsByCategory?.data);
    
    }  else if (selectCountry && selectState) {
      setProducts(allProductsByCategory?.data);
    
    }else if (selectCountry && selectState && selectLga) {
      setProducts(allProductsByCategory?.data);
    
    } else {
      setProducts(allProductsByCategory?.data);
    }

    if (selectCountry && selectState) {
      getLgasFromState(selectState);
    }

    // if (selectCountry && selectState && selectLga) {
    //   console.log("Getting products for this partivular LGA :", selectLga);
    // }

    
  }, [allProductsByCategory?.data,
    selectCountry, selectState, selectLga
  ]);

  

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

  // Memoize sidebar toggle handlers to prevent re-renders
  const handleLeftSidebarToggle = useCallback(() => {
    setLeftSidebarOpen(!leftSidebarOpen);
  }, [leftSidebarOpen]);

  const handleRightSidebarToggle = useCallback(() => {
    setRightSidebarOpen(!rightSidebarOpen);
  }, [rightSidebarOpen]);

  const handleLeftSidebarClose = useCallback(() => {
    setLeftSidebarOpen(false);
  }, []);

  const handleRightSidebarClose = useCallback(() => {
    setRightSidebarOpen(false);
  }, []);

  // Memoize derived data
  const countriesData = useMemo(() => countries?.data?.data, [countries?.data?.data]);

  // Memoize header component
  const headerComponent = useMemo(
    () => (
      <DemoHeader
        countries={countriesData}
        stateData={stateData}
        blgas={blgas}
        methods={methods}
        leftSidebarToggle={handleLeftSidebarToggle}
        rightSidebarToggle={handleRightSidebarToggle}
      />
    ),
    [countriesData, stateData, blgas, methods, handleLeftSidebarToggle, handleRightSidebarToggle]
  );

  // Memoize content component
  const contentComponent = useMemo(
    () => (
      <DemoContent
        products={products}
        isLoading={isLoading}
        isError={isError}
      />
    ),
    [products, isLoading, isError]
  );

  // Memoize left sidebar content
  const leftSidebarContentComponent = useMemo(() => <DemoSidebar />, []);

  // Memoize right sidebar content
  const rightSidebarContentComponent = useMemo(() => <DemoSidebarRight />, []);

	return (
		<Root
			header={headerComponent}
			content={contentComponent}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={handleLeftSidebarClose}
			leftSidebarContent={leftSidebarContentComponent}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={handleRightSidebarClose}
			rightSidebarContent={rightSidebarContentComponent}
			scroll="content"
		/>
	);
}

// Memoize ActiveMarketplaceProductsByCategoryPage to prevent unnecessary re-renders when parent re-renders
const MemoizedActiveMarketplaceProductsByCategoryPage = memo(ActiveMarketplaceProductsByCategoryPage);

/**
 * Main Marketplace Products By Category Component with Service Status Check
 * Wraps the active products by category page with service status landing pages
 */
function MarketplaceProductsByCatWithContentScrollPage() {
  // Fetch user app settings
  const {
    data: appSettings,
    isLoading: isLoadingSettings,
    isError: isErrorSettings,
  } = useGetUserAppSetting();

  // Extract the marketplace service status - memoized to prevent unnecessary re-renders
  const marketplaceServiceStatus = useMemo(
    () => appSettings?.data?.payload?.marketplaceServiceStatus,
    [appSettings?.data?.payload?.marketplaceServiceStatus]
  );

  // Log service status only when it changes (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && marketplaceServiceStatus !== undefined) {
      console.log("Marketplace Service Status (Products by Category):", marketplaceServiceStatus);
    }
  }, [marketplaceServiceStatus]);

  return (
    <ServiceStatusLandingPage
      serviceStatus={marketplaceServiceStatus}
      ActiveComponent={MemoizedActiveMarketplaceProductsByCategoryPage}
      isLoading={isLoadingSettings}
      isError={isErrorSettings}
      serviceName="Marketplace"
    />
  );
}

export default MarketplaceProductsByCatWithContentScrollPage;
