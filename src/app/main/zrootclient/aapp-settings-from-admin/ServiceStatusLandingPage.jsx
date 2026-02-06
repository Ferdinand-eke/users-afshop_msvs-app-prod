import { Box, CircularProgress } from "@mui/material";
import DevelopmentModePage from "./status-pages/DevelopmentModePage";
import MaintenanceModePage from "./status-pages/MaintenanceModePage";
import DisabledServicePage from "./status-pages/DisabledServicePage";
import ComingSoonPage from "./status-pages/ComingSoonPage";

/**
 * ServiceStatusLandingPage - Renders different landing pages based on service status
 * @param {string} serviceStatus - Current status of the service (ACTIVE, DEVELOPMENT, MAINTENANCE, DISABLED, COMING_SOON)
 * @param {React.Component} ActiveComponent - Component to render when service is ACTIVE
 * @param {boolean} isLoading - Loading state for settings
 * @param {boolean} isError - Error state for settings
 * @param {string} serviceName - Name of the service (e.g., "Bookings")
 */
const ServiceStatusLandingPage = ({
  serviceStatus,
  ActiveComponent,
  isLoading,
  isError,
  serviceName = "Service",
}) => {
  // Show loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  // Show error state - default to active if settings can't be fetched
  if (isError) {
    console.warn(`Failed to fetch ${serviceName} settings, defaulting to active mode`);
    return <ActiveComponent />;
  }

  // Render based on service status
  switch (serviceStatus) {
    case "ACTIVE":
      return <ActiveComponent />;

    case "DEVELOPMENT":
      return <DevelopmentModePage serviceName={serviceName} />;

    case "MAINTENANCE":
      return <MaintenanceModePage serviceName={serviceName} />;

    case "DISABLED":
      return <DisabledServicePage serviceName={serviceName} />;

    case "COMING_SOON":
      return <ComingSoonPage serviceName={serviceName} />;

    default:
      // If status is unknown or null, default to active
      console.warn(`Unknown service status: ${serviceStatus}, defaulting to active mode`);
      return <ActiveComponent />;
  }
};

export default ServiceStatusLandingPage;
