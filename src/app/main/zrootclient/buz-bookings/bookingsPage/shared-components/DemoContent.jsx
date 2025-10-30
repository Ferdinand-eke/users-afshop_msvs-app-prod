import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import BookingCard from "./BookingCard";
import PaginationBar from "./PaginationBar";
import ContentLoadingPlaceholder from "./ContentLoadingPlaceholder";

/**
 * Demo Content
 */
function DemoContent(props) {

  const {
    isLoading,
    isError,
    products,
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
  } = props;

  // Fallback: if totalItems is not provided by backend, estimate based on products length
  // This assumes if we get less than itemsPerPage, we're on the last page
  const estimatedTotal = totalItems > 0 ? totalItems : products?.length || 0;

  // Show loading placeholder
  if (isLoading) {
    return <ContentLoadingPlaceholder />;
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <ClienttErrorPage message={"Error occurred while retriving products"} />
      </motion.div>
    );
  }

  if (!products) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          No products products
        </Typography>
      </motion.div>
    );
  }

  

  return (
    <div
      className="flex-auto p-24 sm:p-40"
      style={{
        background: 'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 50%, #fef3e2 100%)',
        minHeight: '100vh',
      }}
    >
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="mb-8">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#1f2937',
              marginBottom: '8px',
              fontSize: '2rem',
            }}
          >
            Available Properties
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#6b7280',
              fontSize: '1.125rem',
            }}
          >
            Find your perfect accommodation from our curated listings
          </Typography>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg mb-8">
          {products?.map((property) => (
            <BookingCard
              key={property?.id || property?._id}
              id={property?.id || property?._id}
              slug={property?.slug}
              images={property?.imageSrcs || []}
              title={property?.title}
              address={property?.address}
              price={property?.price}
              roomCount={property?.roomCount}
              rating={property?.rating || 4.5}
              reviewCount={property?.reviewCount || 9}
              category={property?.category}
              bookingPeriod={property?.bookingPeriod}
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
