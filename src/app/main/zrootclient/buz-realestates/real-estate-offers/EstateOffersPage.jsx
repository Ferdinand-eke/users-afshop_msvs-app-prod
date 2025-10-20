import { styled } from "@mui/material/styles";
import FusePageSimpleWithMargin from "@fuse/core/FusePageSimple/FusePageSimpleWithMargin";
import { useEffect, useState } from "react";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import DemoHeader from "./shared-components/DemoHeader";
import DemoContent from "./shared-components/DemoContent";
import DemoSidebar from "./shared-components/DemoSidebar";
import DemoSidebarRight from "./shared-components/DemoSidebarRight";
import { useGetMyOffers } from "app/configs/data/server-calls/auth/userapp/a_estates/useOffersRepo";

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
 * The Estate Offers Page with Pagination.
 */
function EstateOffersPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
  const [page, setpage] = useState(1);
  const [limit] = useState(10); // Fixed limit of 10 per page

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
    setRightSidebarOpen(!isMobile);
  }, [isMobile]);

  // Fetch offers using react-query hook with pagination
  const { data: offersData, isLoading, isError, isPreviousData } = useGetMyOffers(page, limit);

  // Extract offers from response.data.payload
  const offers = offersData?.data?.offers;
  const pagination = offersData?.data?.pagination;

  console.log("Estate Offers Data:", offersData);
  console.log("Offers Payload:", offers);
  console.log("Pagination Info:", pagination);

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
          offers={offers}
          isLoading={isLoading}
          isError={isError}
          isPreviousData={isPreviousData}
          pagination={pagination}
          page={page}
          onPageChange={setpage}
        />
      }
      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => {
        setLeftSidebarOpen(false);
      }}
      leftSidebarContent={<DemoSidebar />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => {
        setRightSidebarOpen(false);
      }}
      rightSidebarContent={<DemoSidebarRight />}
      scroll="content"
    />
  );
}

export default EstateOffersPage;
