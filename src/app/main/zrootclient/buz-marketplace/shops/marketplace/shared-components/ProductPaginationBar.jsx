import {
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box
} from '@mui/material';

/**
 * ProductPaginationBar Component
 * A clean pagination bar with page controls and items per page selector
 * for marketplace product listings
 */
function ProductPaginationBar({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    if (onPageChange) {
      onPageChange(value);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(event.target.value);
    }
  };

  // Calculate item range for display (e.g., "1-12 of 50")
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border-t border-gray-200">
      {/* Items per page selector */}
      <div className="flex items-center gap-4">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="items-per-page-label">Items per page</InputLabel>
          <Select
            labelId="items-per-page-label"
            value={itemsPerPage}
            label="Items per page"
            onChange={handleItemsPerPageChange}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={32}>32</MenuItem>
            <MenuItem value={64}>64</MenuItem>
          </Select>
        </FormControl>

        {/* Item range display */}
        <Typography variant="body2" className="text-gray-600">
          Showing {startItem}-{endItem} of {totalItems}
        </Typography>
      </div>

      {/* Pagination controls */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            '&.Mui-selected': {
              backgroundColor: '#ea580c',
              color: 'white',
              '&:hover': {
                backgroundColor: '#c2410c'
              }
            }
          }
        }}
      />
    </Box>
  );
}

export default ProductPaginationBar;
