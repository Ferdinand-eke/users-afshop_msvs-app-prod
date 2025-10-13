import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useEffect, useState, useCallback } from "react";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import DemoHeader from "./shared-components/DemoHeader";
import DemoContent from "./shared-components/DemoContent";
import DemoSidebar from "./shared-components/DemoSidebar";
import DemoSidebarRight from "./shared-components/DemoSidebarRight";
import FusePageSimpleWithMargin from "@fuse/core/FusePageSimple/FusePageSimpleWithMargin";
import useGetAllBookingProperties from "app/configs/data/server-calls/auth/userapp/a_bookings/useBookingPropertiesRepo";

const Root = styled(FusePageSimpleWithMargin)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

/**
 * The SimpleWithSidebarsContentScroll page.
 */

function BookingsPageWithSidebarsContentScrollComponent() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
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
  const {
    data: bookingprops,
    isLoading,
    isError,
  } = useGetAllBookingProperties(filters);

  // Handle filter changes from FilterList component
  const handleFilterChange = useCallback(
    (newFilters) => {
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
        apiFilters.checkedAmenities = newFilters.amenities.join(",");
      }

      // Update filters state (this will trigger useGetAllBookingProperties to refetch)
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
      content={
        <DemoContent
          products={bookingprops?.data?.bookingLists}
          isLoading={isLoading}
          isError={isError}
          totalItems={bookingprops?.data?.pagination?.total || 0}
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
        <DemoSidebarRight bookingsData={bookingprops?.data?.bookingLists} />
      }
      scroll="content"
    />
  );
}

export default BookingsPageWithSidebarsContentScrollComponent;
