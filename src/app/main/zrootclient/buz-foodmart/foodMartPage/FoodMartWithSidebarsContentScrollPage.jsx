import { styled } from '@mui/material/styles';
import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeader';
import DemoContent from './shared-components/DemoContent';
import DemoSidebar from './shared-components/DemoSidebar';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
import useGetAllFoodMarts from 'app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo';
import useGetUserAppSetting from "app/configs/data/server-calls/auth/userapp/a_userapp_settings/useAppSettingDomain";
import ServiceStatusLandingPage from "../../aapp-settings-from-admin/ServiceStatusLandingPage";

const Root = styled(FusePageSimpleWithMargin)(({ theme }) => ({
	
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-toolbar': {

	},
	'& .FusePageSimple-content': {
	},
	'& .FusePageSimple-sidebarHeader': {
		
	},
	'& .FusePageSimple-sidebarContent': {
		
	},
	
}));

/**
 * Active Food Mart Page Component
 * This component renders when the restaurants/clubs/spots service is ACTIVE
 */
function ActiveFoodMartPage() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);

	// Filter state management
	const [filters, setFilters] = useState({});

	// Pagination state management - default limit of 10 as requested
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

	// Fetch food marts with filters
	const {
		data: AllFoodMarts,
		isLoading,
		isError,
	} = useGetAllFoodMarts(filters);

	// Handle filter changes from FilterList component
	const handleFilterChange = useCallback(
		(newFilters) => {
			// Map FilterList filter names to API parameter names
			const apiFilters = {};

			// Pagination parameters
			apiFilters.limit = itemsPerPage;
			apiFilters.offset = (currentPage - 1) * itemsPerPage;

			// Keyword search (maps to title)
			if (newFilters.keyword) {
				apiFilters.title = newFilters.keyword;
			}

			// Title filter
			if (newFilters.title) {
				apiFilters.title = newFilters.title;
			}

			// Slug filter
			if (newFilters.slug) {
				apiFilters.slug = newFilters.slug;
			}

			// Address filter
			if (newFilters.address) {
				apiFilters.address = newFilters.address;
			}

			// Location filters - using foodMart prefix as per API convention
			if (newFilters.country) {
				apiFilters.foodMartCountry = newFilters.country;
			}
			if (newFilters.state) {
				apiFilters.foodMartState = newFilters.state;
			}
			if (newFilters.lga) {
				apiFilters.foodMartLga = newFilters.lga;
			}
			if (newFilters.district) {
				apiFilters.foodMartDistrict = newFilters.district;
			}

			// Update filters state (this will trigger useGetAllFoodMarts to refetch)
			setFilters(apiFilters);
		},
		[itemsPerPage, currentPage]
	);

	// Handle page change
	const handlePageChange = useCallback((newPage) => {
		setCurrentPage(newPage);
	}, []);

	// Handle items per page change
	const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
		setItemsPerPage(newItemsPerPage);
		setCurrentPage(1); // Reset to first page when changing items per page
	}, []);

	// Sync pagination changes with filters
	useEffect(() => {
		if (Object.keys(filters).length > 0) {
			setFilters((prevFilters) => ({
				...prevFilters,
				limit: itemsPerPage,
				offset: (currentPage - 1) * itemsPerPage,
			}));
		}
	}, [currentPage, itemsPerPage]);

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
	const foodMarts = useMemo(() => AllFoodMarts?.data?.foodmarts, [AllFoodMarts?.data?.foodmarts]);
	const totalItems = useMemo(() => AllFoodMarts?.data?.pagination?.total || 0, [AllFoodMarts?.data?.pagination?.total]);

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
				foodMarts={foodMarts}
				isLoading={isLoading}
				isError={isError}
				totalItems={totalItems}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				onPageChange={handlePageChange}
				onItemsPerPageChange={handleItemsPerPageChange}
			/>
		),
		[foodMarts, isLoading, isError, totalItems, currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange]
	);

	// Memoize left sidebar content
	const leftSidebarContentComponent = useMemo(
		() => <DemoSidebar onFilterChange={handleFilterChange} />,
		[handleFilterChange]
	);

	// Memoize right sidebar content
	const rightSidebarContentComponent = useMemo(
		() => <DemoSidebarRight listingsData={foodMarts} />,
		[foodMarts]
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

// Memoize ActiveFoodMartPage to prevent unnecessary re-renders when parent re-renders
const MemoizedActiveFoodMartPage = memo(ActiveFoodMartPage);

/**
 * Main Food Mart Page Component with Service Status Check
 * Wraps the active food mart page with service status landing pages
 */
function FoodMartWithSidebarsContentScrollPage() {
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
			console.log("Restaurants/Clubs/Spots Service Status:", restaurantsClubsSpotsServiceStatus);
		}
	}, [restaurantsClubsSpotsServiceStatus]);

	return (
		<ServiceStatusLandingPage
			serviceStatus={restaurantsClubsSpotsServiceStatus}
			ActiveComponent={MemoizedActiveFoodMartPage}
			isLoading={isLoadingSettings}
			isError={isErrorSettings}
			serviceName="Restaurants/Clubs/Spots"
		/>
	);
}

export default FoodMartWithSidebarsContentScrollPage;
