import { Typography, Card, CardContent, Chip } from "@mui/material";

/**
 * The OfferDemoSidebarRight component - Offer Tips & Stats.
 */
function OfferDemoSidebarRight(props) {
  return (
    <div className="px-6 py-8 h-screen overflow-y-auto">
      {/* Offer Tips Section */}
      <div className="mb-6">
        <Typography variant="h6" className="font-bold text-gray-800 mb-2">
          <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
          Making Smart Offers
        </Typography>
        <Typography variant="caption" className="text-gray-600">
          Tips for successful property offers
        </Typography>
      </div>

      <Card className="mb-6 shadow-sm border border-green-100">
        <CardContent className="p-4">
          <Typography variant="caption" className="text-green-800 font-semibold mb-3 block">
            OFFER TIPS
          </Typography>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <i className="fas fa-check-circle text-green-500 mt-0.5 text-sm"></i>
              <Typography variant="caption" className="text-gray-700">
                Research comparable properties in the area before making an offer
              </Typography>
            </div>
            <div className="flex items-start gap-2">
              <i className="fas fa-check-circle text-green-500 mt-0.5 text-sm"></i>
              <Typography variant="caption" className="text-gray-700">
                Consider property condition and any needed repairs in your offer
              </Typography>
            </div>
            <div className="flex items-start gap-2">
              <i className="fas fa-check-circle text-green-500 mt-0.5 text-sm"></i>
              <Typography variant="caption" className="text-gray-700">
                Include a personal message to show genuine interest
              </Typography>
            </div>
            <div className="flex items-start gap-2">
              <i className="fas fa-check-circle text-green-500 mt-0.5 text-sm"></i>
              <Typography variant="caption" className="text-gray-700">
                Be prepared to negotiate and remain flexible
              </Typography>
            </div>
            <div className="flex items-start gap-2">
              <i className="fas fa-check-circle text-green-500 mt-0.5 text-sm"></i>
              <Typography variant="caption" className="text-gray-700">
                Respond promptly if seller makes a counter offer
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offer Status Guide */}
      <Card className="mb-6 shadow-sm border border-gray-100">
        <CardContent className="p-4">
          <Typography variant="caption" className="text-gray-800 font-semibold mb-3 block">
            OFFER STATUS GUIDE
          </Typography>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Chip label="Pending" color="warning" size="small" />
              <Typography variant="caption" className="text-gray-600">
                Awaiting seller response
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Chip label="Accepted" color="success" size="small" />
              <Typography variant="caption" className="text-gray-600">
                Seller accepted your offer
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Chip label="Rejected" color="error" size="small" />
              <Typography variant="caption" className="text-gray-600">
                Offer was declined
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Chip label="Countered" color="info" size="small" />
              <Typography variant="caption" className="text-gray-600">
                Seller made counter offer
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Chip label="Withdrawn" color="default" size="small" />
              <Typography variant="caption" className="text-gray-600">
                You withdrew this offer
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Section */}
      <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <i className="fas fa-info-circle text-green-600 text-xl"></i>
          </div>
          <div>
            <Typography variant="caption" className="font-semibold text-green-900 block mb-1">
              After Acceptance
            </Typography>
            <Typography variant="caption" className="text-green-800 text-xs">
              Once your offer is accepted, contact the seller promptly to proceed with property documentation and payment arrangements.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferDemoSidebarRight;
