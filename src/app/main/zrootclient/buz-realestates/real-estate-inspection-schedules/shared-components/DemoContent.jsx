import FuseLoading from "@fuse/core/FuseLoading";
import { motion } from "framer-motion";
import { Typography, Card, CardContent, Chip, Button } from "@mui/material";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import { format, parseISO } from "date-fns";

/**
 * Demo Content - Inspection Schedules List
 */
function DemoContent(props) {
  const { isLoading, isError, schedules } = props;

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <ClienttErrorPage
          message={"Error occurred while retrieving inspection schedules"}
        />
      </motion.div>
    );
  }

  if (!schedules || schedules.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <div className="text-center">
          <i className="fas fa-calendar-times text-gray-300 text-6xl mb-4"></i>
          <Typography color="text.secondary" variant="h5">
            No inspection schedules found!
          </Typography>
          <Typography color="text.secondary" variant="body2" className="mt-2">
            Schedule your first property inspection to get started.
          </Typography>
        </div>
      </motion.div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "confirmed":
        return "success";
      case "cancelled":
        return "error";
      case "completed":
        return "info";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="flex-auto">
      <div className="h-7xl min-h-7xl max-h-7xl">
        <main className="w-full p-4 overflow-y-scroll">
          <h1 className="text-xl font-bold mb-4">
            My Inspection Schedules ({schedules?.length || 0})
          </h1>

          <div className="space-y-4">
            {schedules?.map((schedule) => (
              <Card
                key={schedule?.id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <Typography variant="h6" className="font-semibold mb-2">
                        Property Inspection
                      </Typography>
                      <div className="flex items-center gap-2 mb-2">
                        <Chip
                          label={schedule?.status || "Pending"}
                          color={getStatusColor(schedule?.status)}
                          size="small"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <Typography variant="caption" color="text.secondary">
                        Property ID
                      </Typography>
                      <Typography variant="body2" className="font-semibold">
                        #{schedule?.propertyId || "N/A"}
                      </Typography>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Typography variant="caption" color="text.secondary">
                        Scheduled Date
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-calendar text-orange-500"></i>
                        <Typography variant="body2">
                          {formatDate(schedule?.scheduledDate) || "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary">
                        Time Slot
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-clock text-orange-500"></i>
                        <Typography variant="body2">
                          {schedule?.scheduledTimeSlot || "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary">
                        Contact Name
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-user text-orange-500"></i>
                        <Typography variant="body2">
                          {schedule?.userName || "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary">
                        Contact Phone
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-phone text-orange-500"></i>
                        <Typography variant="body2">
                          {schedule?.userPhone || "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary">
                        Contact Email
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-envelope text-orange-500"></i>
                        <Typography variant="body2" className="truncate">
                          {schedule?.userEmail || "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary">
                        Created On
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-calendar-plus text-orange-500"></i>
                        <Typography variant="body2">
                          {schedule?.createdAt
                            ? formatDate(schedule.createdAt)
                            : "N/A"}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {schedule?.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <Typography variant="caption" color="text.secondary">
                        Notes
                      </Typography>
                      <Typography variant="body2" className="mt-1">
                        {schedule.notes}
                      </Typography>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    {schedule?.status?.toLowerCase() === "pending" && (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          startIcon={<i className="fas fa-edit"></i>}
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<i className="fas fa-times"></i>}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DemoContent;
