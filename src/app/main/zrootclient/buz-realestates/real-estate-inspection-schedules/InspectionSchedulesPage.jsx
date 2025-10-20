import { styled } from "@mui/material/styles";
import FusePageSimpleWithMargin from "@fuse/core/FusePageSimple/FusePageSimpleWithMargin";
import { useEffect, useState } from "react";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import DemoHeader from "./shared-components/DemoHeader";
import DemoContent from "./shared-components/DemoContent";
import DemoSidebar from "./shared-components/DemoSidebar";
import DemoSidebarRight from "./shared-components/DemoSidebarRight";
import { useGetMyInspectionSchedules } from "app/configs/data/server-calls/auth/userapp/a_estates/useInspectionScheduleRepo";

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
 * The Inspection Schedules Page.
 */
function InspectionSchedulesPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
    setRightSidebarOpen(!isMobile);
  }, [isMobile]);

  // Fetch inspection schedules using react-query hook
  const { data: schedulesData, isLoading, isError } = useGetMyInspectionSchedules();


  // Extract schedules from response.data.payload
  const schedules = schedulesData?.data?.payload;

  console.log("Inspection Schedules Data 11:", schedulesData);
  console.log("Schedules Payload:", schedules);

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
          schedules={schedules}
          isLoading={isLoading}
          isError={isError}
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

export default InspectionSchedulesPage;
