import { styled } from '@mui/material/styles';
import { useEffect, useState, useCallback } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeader';
import DemoContent from './shared-components/DemoContent';
import DemoSidebar from './shared-components/DemoSidebar';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
import useGetAllFoodMarts from 'app/configs/data/server-calls/auth/userapp/a_foodmart/useFoodMartsRepo';

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
 * The SimpleWithSidebarsContentScroll page.
 */
function FoodMartWithSidebarsContentScrollPage() {
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

	// Trigger filter change when pagination changes
	useEffect(() => {
		if (Object.keys(filters).length > 0) {
			handleFilterChange(filters);
		}
	}, [currentPage, itemsPerPage]);

	return (
		<Root
			header={
				<DemoHeader
					leftSidebarToggle={() => {
						setLeftSidebarOpen(!leftSidebarOpen);
					}}
					rightSidebarToggle={() => {
						setRightSidebarOpen(!rightSidebarOpen);
					}}
				/>
			}
			content={
				<DemoContent
					foodMarts={AllFoodMarts?.data?.foodmarts}
					isLoading={isLoading}
					isError={isError}
					totalItems={AllFoodMarts?.data?.pagination?.total || 0}
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageChange}
					onItemsPerPageChange={handleItemsPerPageChange}
				/>
			}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarContent={<DemoSidebar onFilterChange={handleFilterChange} />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => {
				setRightSidebarOpen(false);
			}}
			rightSidebarContent={
				<DemoSidebarRight 
        
        listingsData={AllFoodMarts?.data?.foodmarts} />
			}
			scroll="content"
		/>
	);
}

export default FoodMartWithSidebarsContentScrollPage;
