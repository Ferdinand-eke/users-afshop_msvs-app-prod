import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeader';
import DemoContent from './shared-components/DemoContent';
import DemoSidebar from './shared-components/DemoSidebar';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
import useGetAllProducts from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { useForm } from 'react-hook-form';
import useSellerCountries from 'app/configs/data/server-calls/countries/useCountries';
import {
	getLgasByStateId,
	getStateByCountryId,
  } from "app/configs/data/client/RepositoryClient";
import useGetAllBookingProperties from 'app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo';
import  { useGetMartMenu } from 'app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo';
import { useParams } from 'react-router';
import useGetUserAppSetting from "app/configs/data/server-calls/auth/userapp/a_userapp_settings/useAppSettingDomain";
import ServiceStatusLandingPage from "../../aapp-settings-from-admin/ServiceStatusLandingPage";

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
    innerWidth:'60%'
		
	},
	
}));

/**
 * Active Visit Food Mart Page Component
 * This component renders when the restaurants/clubs/spots service is ACTIVE
 */
function ActiveVisitFoodMartPage() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

  const routeParams = useParams();
  const { martId } = routeParams;
  const { data: martMenu, isLoading, isError } = useGetMartMenu(martId);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      selectCountry: "",
      selectState: "",
      selectLga: "",
    },
    // resolver: zodResolver(schema)
  });

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

  // Memoize derived data to avoid recalculation on every render
  const foodMart = useMemo(() => martMenu?.data?.foodMart, [martMenu?.data?.foodMart]);
  const foodMartId = useMemo(() => martMenu?.data?.foodMart?.id, [martMenu?.data?.foodMart?.id]);

  // Memoize header component
  const headerComponent = useMemo(
    () => (
      <DemoHeader
        leftSidebarToggle={handleLeftSidebarToggle}
        rightSidebarToggle={handleRightSidebarToggle}
      />
    ),
    [handleLeftSidebarToggle, handleRightSidebarToggle]
  );

  // Memoize content component
  const contentComponent = useMemo(
    () => (
      <DemoContent
        rcsFoodMart={foodMart}
        rcsId={foodMartId}
        isLoading={isLoading}
        isError={isError}
      />
    ),
    [foodMart, foodMartId, isLoading, isError]
  );

  // Memoize left sidebar content
  const leftSidebarContentComponent = useMemo(
    () => <DemoSidebar martMenu={foodMart} />,
    [foodMart]
  );

  // Memoize right sidebar content
  const rightSidebarContentComponent = useMemo(
    () => <DemoSidebarRight center={foodMart} items={foodMart} />,
    [foodMart]
  );

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

// Memoize ActiveVisitFoodMartPage to prevent unnecessary re-renders when parent re-renders
const MemoizedActiveVisitFoodMartPage = memo(ActiveVisitFoodMartPage);

/**
 * Main Visit Food Mart Page Component with Service Status Check
 * Wraps the active visit food mart page with service status landing pages
 */
function VisitFoodMartWithContentScrollPage() {
  // Fetch user app settings
  const {
    data: appSettings,
    isLoading: isLoadingSettings,
    isError: isErrorSettings,
  } = useGetUserAppSetting();

  // Extract the restaurants/clubs/spots service status - memoized to prevent unnecessary re-renders
  const restaurantsClubsSpotsServiceStatus = useMemo(
    () => appSettings?.data?.payload?.restaurantsClubsSpotsServiceStatus,
    [appSettings?.data?.payload?.restaurantsClubsSpotsServiceStatus]
  );

  // Log service status only when it changes (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && restaurantsClubsSpotsServiceStatus !== undefined) {
      console.log("Restaurants/Clubs/Spots Service Status (Visit Page):", restaurantsClubsSpotsServiceStatus);
    }
  }, [restaurantsClubsSpotsServiceStatus]);

  return (
    <ServiceStatusLandingPage
      serviceStatus={restaurantsClubsSpotsServiceStatus}
      ActiveComponent={MemoizedActiveVisitFoodMartPage}
      isLoading={isLoadingSettings}
      isError={isErrorSettings}
      serviceName="Restaurants/Clubs/Spots"
    />
  );
}

export default VisitFoodMartWithContentScrollPage;
