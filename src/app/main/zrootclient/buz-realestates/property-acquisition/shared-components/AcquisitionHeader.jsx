import { Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * The AcquisitionHeader component.
 */
function AcquisitionHeader(props) {
  const { offerDetails, leftSidebarToggle } = props;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between p-24 md:p-32">
      <div className="flex items-center gap-4">
        <IconButton
          onClick={leftSidebarToggle}
          aria-label="toggle sidebar"
          size="large"
        >
          <i className="fas fa-bars text-gray-700"></i>
        </IconButton>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <i className="fas fa-home text-white text-xl"></i>
          </div>
          <div>
            <Typography
              className="text-2xl md:text-3xl font-extrabold tracking-tight leading-none text-gray-900"
              role="heading"
            >
              Property Acquisition Portal
            </Typography>
            <Typography className="text-sm text-gray-600 mt-1">
              Complete your payment and upload required documents
            </Typography>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-4 sm:mt-0 gap-3">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
          <i className="fas fa-shield-check text-green-600"></i>
          <Typography variant="caption" className="text-green-800 font-semibold">
            Secure Transaction
          </Typography>
        </div>

        <IconButton
          onClick={() => navigate('/realestate/my-offers')}
          aria-label="back to offers"
          sx={{
            backgroundColor: '#f3f4f6',
            '&:hover': {
              backgroundColor: '#e5e7eb',
            }
          }}
        >
          <i className="fas fa-arrow-left text-gray-700"></i>
        </IconButton>
      </div>
    </div>
  );
}

export default AcquisitionHeader;
