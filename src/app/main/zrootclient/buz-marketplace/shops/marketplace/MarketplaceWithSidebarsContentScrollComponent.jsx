import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useState, useCallback } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeaderProduct';
import DemoContentProduct from './shared-components/DemoContentProduct';
import DemoSidebar from './shared-components/DemoSidebarProduct';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
import useGetAllProducts from "app/configs/data/server-calls/auth/userapp/a_marketplace/useProductsRepo";
import { useForm } from 'react-hook-form';
import useSellerCountries from 'app/configs/data/server-calls/countries/useCountries';
import {
	getLgasByStateId,
	getStateByCountryId,
  } from "app/configs/data/client/RepositoryClient";

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

function MarketplaceWithSidebarsContentScrollComponent() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);

	// Filter state management
	const [filters, setFilters] = useState({});

	// Pagination state management
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

	// const [products, setProducts] = useState([]);
  const { data: allProducts, isLoading, isError } = useGetAllProducts(filters);

//   console.log("All PRODUCTS", allProducts?.data?.products)

	// Handle filter changes from ProductFilter component
	const handleFilterChange = useCallback(
		(newFilters) => {
			// Map ProductFilter filter names to API parameter names
			const apiFilters = {};

			// Pagination parameters
			apiFilters.limit = itemsPerPage;
			apiFilters.offset = (currentPage - 1) * itemsPerPage;

			// Keyword search (maps to name or slug)
			if (newFilters.keyword) {
				apiFilters.name = newFilters.keyword;
				// Optionally also search by slug
				// apiFilters.slug = newFilters.keyword;
			}

			// Location filters
			if (newFilters.country) {
				apiFilters.productCountry = newFilters.country;
			}
			if (newFilters.state) {
				apiFilters.productState = newFilters.state;
			}
			if (newFilters.lga) {
				apiFilters.productLga = newFilters.lga;
			}

			// Shop plan filter
			if (newFilters.shopPlan) {
				apiFilters.productShopplan = newFilters.shopPlan;
			}

			// Market category filter
			if (newFilters.market) {
				apiFilters.market = newFilters.market;
			}

			// Price range
			if (newFilters.priceRange && Array.isArray(newFilters.priceRange)) {
				apiFilters.minPrice = newFilters.priceRange[0];
				apiFilters.maxPrice = newFilters.priceRange[1];
			}

			// Advanced features
			if (newFilters.features && newFilters.features.length > 0) {
				// Check if ECOWAS interest is selected
				if (newFilters.features.includes("ecowas-interest")) {
					apiFilters.isOfEcowasInterest = true;
				}
				// You can add more feature mappings here as needed
			}

			// Update filters state (this will trigger useGetAllProducts to refetch)
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
			content={<DemoContentProduct
				products={allProducts?.data?.products}
				isLoading={isLoading}
				isError={isError}
				totalItems={allProducts?.data?.pagination?.total || 0}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				onPageChange={handlePageChange}
				onItemsPerPageChange={handleItemsPerPageChange}
				/>}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarContent={<DemoSidebar onFilterChange={handleFilterChange} />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => {
				setRightSidebarOpen(false);
			}}
			rightSidebarContent={<DemoSidebarRight />}
		
			scroll="content"
		/>
	);
}

export default MarketplaceWithSidebarsContentScrollComponent;
