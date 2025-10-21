import FuseLoading from "@fuse/core/FuseLoading";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import FoodMartCard from "./FoodMartCard";
import PaginationBar from "./PaginationBar";

/**
 * Demo Content
 */
function DemoContent(props) {
  const {
    isLoading,
    isError,
    foodMarts,
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
  } = props;

  // Fallback: if totalItems is not provided by backend, estimate based on foodMarts length
  const estimatedTotal = totalItems > 0 ? totalItems : foodMarts?.length || 0;

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
        <ClienttErrorPage message={"Error occurred while retrieving food marts"} />
      </motion.div>
    );
  }

  if (!foodMarts || foodMarts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No food marts found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="flex-auto p-24 sm:p-40">
      <div className="flex flex-col">
        {/* Food Marts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
          {foodMarts?.map((foodMart) => (
            <FoodMartCard
              key={foodMart?.id || foodMart?._id}
              id={foodMart?.id || foodMart?._id}
              slug={foodMart?.slug}
              images={foodMart?.imageSrcs || []}
              title={foodMart?.title}
              address={foodMart?.address}
              rating={foodMart?.rating || 4.5}
              reviewCount={foodMart?.reviewCount || 9}
              duration={foodMart?.duration || "Open daily"}
              host={foodMart?.host || "Restaurant"}
            />
          ))}
        </div>

        {/* Pagination Bar */}
        <PaginationBar
          totalItems={estimatedTotal}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </div>
  );
}

export default DemoContent;
