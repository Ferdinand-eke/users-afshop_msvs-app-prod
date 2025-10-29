import { styled } from "@mui/material/styles";
import FusePageSimpleWithMargin from "@fuse/core/FusePageSimple/FusePageSimpleWithMargin";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import AcquisitionHeader from "./shared-components/AcquisitionHeader";
import AcquisitionContent from "./shared-components/AcquisitionContent";
import AcquisitionSidebar from "./shared-components/AcquisitionSidebar";
// import AcquisitionHeader from "./shared-components/AcquisitionHeader";
// import AcquisitionContent from "./shared-components/AcquisitionContent";
// import AcquisitionSidebar from "./shared-components/AcquisitionSidebar";

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
 * The Property Acquisition Page - Payment & Documentation Portal.
 */
function PropertyAcquisitionPage() {
  const { offerId } = useParams();
  const location = useLocation();
  const offerDetails = location.state?.offerDetails;

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
  }, [isMobile]);

  console.log("Property Acquisition - Offer ID:", offerId);
  console.log("Property Acquisition - Offer Details:", offerDetails);

  return (
    <Root
      header={
        <AcquisitionHeader
          offerDetails={offerDetails}
          leftSidebarToggle={() => {
            setLeftSidebarOpen(!leftSidebarOpen);
          }}
        />
      }
      content={
        <AcquisitionContent
          offerId={offerId}
          offerDetails={offerDetails}
        />
      }
      
      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => {
        setLeftSidebarOpen(false);
      }}
      leftSidebarContent={<AcquisitionSidebar offerDetails={offerDetails} />}
      scroll="content"
    />
  );
}


export default PropertyAcquisitionPage;
