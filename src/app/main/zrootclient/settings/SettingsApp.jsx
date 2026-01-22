import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { Outlet, useLocation } from "react-router-dom";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { motion } from "framer-motion";
import SettingsAppSidebarContent from "./SettingsAppSidebarContent";
import SettingsAppHeader from "./SettingsAppHeader";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: "transparent",
  },
  "& .FusePageSimple-content": {
    backgroundColor: "#f9fafb",
  },
  "& .FusePageSimple-sidebar": {
    backgroundColor: "white",
  },
  "& .FusePageSimple-leftSidebar": {
    borderRight: "1px solid rgba(234, 88, 12, 0.1)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
}));

/**
 * The Settings App - Main Container
 */
function SettingsApp() {
  const location = useLocation();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setLeftSidebarOpen(false);
    }
  }, [location, isMobile]);

  return (
    <Root
      content={
        <div className="flex-auto p-6 md:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SettingsAppHeader
              className="mb-6 md:mb-8"
              onSetSidebarOpen={setLeftSidebarOpen}
            />

            {/* Main Content Area with subtle background */}
            <div
              className="rounded-3xl p-4 md:p-6 lg:p-8"
              style={{
                background: "white",
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              }}
            >
              <Outlet />
            </div>
          </motion.div>
        </div>
      }
      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => {
        setLeftSidebarOpen(false);
      }}
      leftSidebarContent={
        <SettingsAppSidebarContent onSetSidebarOpen={setLeftSidebarOpen} />
      }
      leftSidebarWidth={400}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default SettingsApp;
