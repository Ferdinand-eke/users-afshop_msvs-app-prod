import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import DemoHeader from './shared-components/DemoHeader';
import DemoContent from './shared-components/DemoContent';
import DemoSidebar from './shared-components/DemoSidebar';
import DemoSidebarRight from './shared-components/DemoSidebarRight';
import FusePageSimpleWithMargin from '@fuse/core/FusePageSimple/FusePageSimpleWithMargin';
import { useForm } from 'react-hook-form';
import useSellerCountries from 'app/configs/data/server-calls/countries/useCountries';
import {
	getLgasByStateId,
	getStateByCountryId,
  } from "app/configs/data/client/RepositoryClient";
import useGetAllBookingProperties from 'app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo';

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



function BookingsPageWithSidebarsContentScrollComponent() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);

	// Filter state management
	const [filters, setFilters] = useState({});

	// Pagination state management
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(8);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

	// Fetch booking properties with filters
  const { data: bookingprops, isLoading, isError } = useGetAllBookingProperties(filters);

	// Debug: Check what data we're receiving
	// useEffect(() => {
	// 	console.log('Booking Props Data:', bookingprops);
	// 	console.log('Total from API:', bookingprops?.data?.pagination?.total);
	// 	console.log('Booking Lists:', bookingprops?.data?.bookingLists);
	// }, [bookingprops]);

	// Handle filter changes from FilterList component
	const handleFilterChange = (newFilters) => {
		// Map FilterList filter names to API parameter names
		const apiFilters = {};

		// Pagination parameters
		apiFilters.limit = itemsPerPage;
		apiFilters.offset = (currentPage - 1) * itemsPerPage;

		// Keyword search (maps to title or slug)
		if (newFilters.keyword) {
			apiFilters.title = newFilters.keyword;
		}

		// Property type (category)
		if (newFilters.propertyType) {
			apiFilters.category = newFilters.propertyType;
		}

		// Location filters
		if (newFilters.country) {
			apiFilters.propertyCountry = newFilters.country;
		}
		if (newFilters.state) {
			apiFilters.propertyState = newFilters.state;
		}
		if (newFilters.lga) {
			apiFilters.propertyLga = newFilters.lga;
		}

		// Price range
		if (newFilters.priceRange && Array.isArray(newFilters.priceRange)) {
			apiFilters.minPrice = newFilters.priceRange[0];
			apiFilters.maxPrice = newFilters.priceRange[1];
		}

		// Room count
		if (newFilters.roomCount) {
			apiFilters.roomCount = newFilters.roomCount;
		}

		// Bathroom count
		if (newFilters.bathroomCount) {
			apiFilters.bathroomCount = newFilters.bathroomCount;
		}

		// Amenities (join array into comma-separated string)
		if (newFilters.amenities && newFilters.amenities.length > 0) {
			apiFilters.checkedAmenities = newFilters.amenities.join(',');
		}

		// Update filters state (this will trigger useGetAllBookingProperties to refetch)
		setFilters(apiFilters);
	};

	// Handle page change
	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	// Handle items per page change
	const handleItemsPerPageChange = (newItemsPerPage) => {
		setItemsPerPage(newItemsPerPage);
		setCurrentPage(1); // Reset to first page when changing items per page
	};

	// Trigger filter refresh when pagination changes
	useEffect(() => {
		handleFilterChange({}); // Re-apply current filters with new pagination
	}, [currentPage, itemsPerPage]);



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
    // resolver: zodResolver(schema)
  });
  const { reset, watch, control, formState, getValues } = methods;

  const { selectCountry, selectState, selectLga } = watch();

  const { data: countries } = useSellerCountries();

  

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
					leftSidebarToggle={() => {
						setLeftSidebarOpen(!leftSidebarOpen);
					}}
					rightSidebarToggle={() => {
						setRightSidebarOpen(!rightSidebarOpen);
					}}
				/>
			}
			content={<DemoContent
				products={bookingprops?.data?.bookingLists}
				isLoading={isLoading}
				isError={isError}
				totalItems={bookingprops?.data?.pagination?.total || 0}
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
			rightSidebarContent={<DemoSidebarRight 
      	bookingsData={bookingprops?.data?.bookingLists}
      />}
			scroll="content"
		/>
	);
}

export default BookingsPageWithSidebarsContentScrollComponent;
