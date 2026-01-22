import { useLocation } from "react-router-dom";
import _ from "@lodash";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { motion } from "framer-motion";
import SettingsAppNavigation from "./SettingsAppNavigation";

function SettingsAppHeader(props) {
  const { className, onSetSidebarOpen } = props;
  const { pathname } = useLocation();
  const currentNavigation = _.find(SettingsAppNavigation.children, {
    url: pathname,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={clsx(
        "flex items-center justify-between -mx-6 md:mx-0 pb-4 border-b",
        className
      )}
      style={{
        borderColor: "rgba(234, 88, 12, 0.1)",
      }}
    >
      <div className="flex items-center gap-4">
        <Hidden lgUp>
          <IconButton
            onClick={() => onSetSidebarOpen(true)}
            aria-label="open left sidebar"
            size="large"
            sx={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                boxShadow: "0 4px 12px rgba(234, 88, 12, 0.3)",
              },
            }}
          >
            <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
          </IconButton>
        </Hidden>

        <div className="flex items-center gap-3">
          {currentNavigation?.icon && (
            <div
              className="hidden sm:flex w-12 h-12 rounded-xl items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 88, 12, 0.08) 100%)",
                border: "2px solid rgba(234, 88, 12, 0.2)",
              }}
            >
              <FuseSvgIcon className="text-orange-600" size={24}>
                {currentNavigation.icon}
              </FuseSvgIcon>
            </div>
          )}
          <div>
            <Typography className="text-2xl sm:text-3xl font-bold leading-none tracking-tight text-gray-900">
              {currentNavigation?.title || "Settings"}
            </Typography>
            {currentNavigation?.subtitle && (
              <Typography className="text-xs text-gray-600 mt-1 hidden sm:block">
                {currentNavigation.subtitle}
              </Typography>
            )}
          </div>
        </div>
      </div>

      {/* Optional: Add breadcrumb or status indicator */}
      <div className="hidden md:flex items-center gap-2">
        <div
          className="px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(34, 197, 94, 0.08)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <Typography className="text-xs font-semibold text-green-700">
              All Systems Active
            </Typography>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SettingsAppHeader;
