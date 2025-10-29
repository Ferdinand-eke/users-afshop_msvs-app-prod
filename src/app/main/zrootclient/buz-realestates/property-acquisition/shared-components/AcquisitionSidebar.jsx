import { Typography, Card, CardContent, Chip, Divider } from "@mui/material";

/**
 * The AcquisitionSidebar component - Shows offer summary and progress.
 */
function AcquisitionSidebar(props) {
  const { offerDetails } = props;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount || 0);
  };

  return (
    <div className="px-6 py-8 h-screen overflow-y-auto">
      {/* Offer Summary Header */}
      <div className="mb-6">
        <Typography variant="h6" className="font-bold text-gray-800 mb-2">
          <i className="fas fa-file-invoice-dollar text-orange-500 mr-2"></i>
          Offer Summary
        </Typography>
        <Typography variant="caption" className="text-gray-600">
          Your accepted property offer details
        </Typography>
      </div>

      {/* Offer Details Card */}
      {offerDetails && (
        <Card className="mb-6 shadow-md border-2 border-orange-200">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Property ID */}
              <div>
                <Typography variant="caption" className="text-gray-600 font-semibold block mb-1">
                  Property ID
                </Typography>
                <Typography variant="body2" className="font-mono font-bold text-gray-900">
                  #{offerDetails?.propertyId || "N/A"}
                </Typography>
              </div>

              <Divider />

              {/* Buyer Info */}
              <div>
                <Typography variant="caption" className="text-gray-600 font-semibold block mb-1">
                  Buyer Name
                </Typography>
                <Typography variant="body2" className="text-gray-900">
                  {offerDetails?.buyerName || "N/A"}
                </Typography>
              </div>

              <Divider />

              {/* Status */}
              <div>
                <Typography variant="caption" className="text-gray-600 font-semibold block mb-2">
                  Status
                </Typography>
                <Chip
                  label="Accepted"
                  color="success"
                  size="small"
                  icon={<i className="fas fa-check-circle"></i>}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cost Breakdown Card */}
      {offerDetails && (
        <Card className="mb-6 shadow-md border border-gray-200">
          <CardContent className="p-4">
            <Typography variant="caption" className="text-gray-800 font-bold block mb-3 uppercase">
              Cost Breakdown
            </Typography>

            <div className="space-y-3">
              {/* Property Price */}
              <div className="flex justify-between items-center">
                <Typography variant="caption" className="text-gray-600">
                  Property Price
                </Typography>
                <Typography variant="body2" className="font-bold text-gray-900">
                  {formatCurrency(offerDetails?.propertyPrice)}
                </Typography>
              </div>

              {/* Agency Fee */}
              <div className="flex justify-between items-center">
                <Typography variant="caption" className="text-gray-600">
                  Agency Fee (5%)
                </Typography>
                <Typography variant="body2" className="font-semibold text-purple-700">
                  {formatCurrency(offerDetails?.agencyFee)}
                </Typography>
              </div>

              {/* Legal Fee */}
              <div className="flex justify-between items-center">
                <Typography variant="caption" className="text-gray-600">
                  Legal Fee (2%)
                </Typography>
                <Typography variant="body2" className="font-semibold text-indigo-700">
                  {formatCurrency(offerDetails?.legalFee)}
                </Typography>
              </div>

              <Divider sx={{ borderStyle: 'dashed' }} />

              {/* Total */}
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-300">
                <Typography variant="body2" className="font-bold text-orange-900">
                  Total Amount
                </Typography>
                <Typography variant="h6" className="font-black text-orange-900">
                  {formatCurrency(offerDetails?.totalCost)}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Process Steps */}
      <Card className="mb-6 shadow-sm border border-green-100 bg-green-50">
        <CardContent className="p-4">
          <Typography variant="caption" className="text-green-800 font-semibold mb-3 block">
            <i className="fas fa-list-check text-green-600 mr-2"></i>
            COMPLETION STEPS
          </Typography>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Typography variant="caption" className="text-white font-bold text-xs">1</Typography>
              </div>
              <Typography variant="caption" className="text-green-800">
                Submit payment proof to company account
              </Typography>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Typography variant="caption" className="text-white font-bold text-xs">2</Typography>
              </div>
              <Typography variant="caption" className="text-green-800">
                Upload required property documents
              </Typography>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Typography variant="caption" className="text-white font-bold text-xs">3</Typography>
              </div>
              <Typography variant="caption" className="text-gray-600">
                Finance team verifies payment
              </Typography>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Typography variant="caption" className="text-white font-bold text-xs">4</Typography>
              </div>
              <Typography variant="caption" className="text-gray-600">
                Legal team processes documents
              </Typography>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Typography variant="caption" className="text-white font-bold text-xs">5</Typography>
              </div>
              <Typography variant="caption" className="text-gray-600">
                Property transfer completed
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <i className="fas fa-question-circle text-blue-600 text-xl"></i>
          </div>
          <div>
            <Typography variant="caption" className="font-semibold text-blue-900 block mb-1">
              Need Assistance?
            </Typography>
            <Typography variant="caption" className="text-blue-800 text-xs">
              Contact our support team for help with your property acquisition process.
            </Typography>
            <button className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 underline">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcquisitionSidebar;
