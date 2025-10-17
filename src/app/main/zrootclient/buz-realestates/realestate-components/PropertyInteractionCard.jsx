import { useState } from "react";
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useAppSelector } from 'app/store/hooks';
// import { selectFuseCurrentLayoutConfig } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";

/**
 * PropertyInteractionCard Component
 * Provides user interaction options for properties: Schedule Inspection, Make Offer, Chat with Agent
 */
function PropertyInteractionCard({ propertyData, realtorInfo }) {
  const user = useAppSelector(selectUser);
  const isAuthenticated = user?.id && user?.role?.length > 0;

  const [inspectionDialogOpen, setInspectionDialogOpen] = useState(false);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);

  // Form states
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionTime, setInspectionTime] = useState("");
  const [inspectionNotes, setInspectionNotes] = useState("");
  const [offerAmount, setOfferAmount] = useState("");
  const [offerMessage, setOfferMessage] = useState("");

  const handleScheduleInspection = () => {
    // TODO: Implement API call to schedule inspection
    console.log("Schedule Inspection:", {
      propertyId: propertyData?.id,
      date: inspectionDate,
      time: inspectionTime,
      notes: inspectionNotes,
    });
    setInspectionDialogOpen(false);
    // Reset form
    setInspectionDate("");
    setInspectionTime("");
    setInspectionNotes("");
  };

  const handleMakeOffer = () => {
    // TODO: Implement API call to submit offer
    console.log("Make Offer:", {
      propertyId: propertyData?.id,
      amount: offerAmount,
      message: offerMessage,
    });
    setOfferDialogOpen(false);
    // Reset form
    setOfferAmount("");
    setOfferMessage("");
  };

  const handleChatNow = () => {
    // TODO: Implement chat functionality
    console.log("Open Chat with realtor:", realtorInfo?.id);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden" style={{ height: '50vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-lg shadow-md">
              <i className="fas fa-handshake text-orange-600 text-lg"></i>
            </div>
            <Typography className="text-white font-bold text-lg tracking-wide">
              PROPERTY ACTIONS
            </Typography>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#d1d5db transparent'
        }}>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 text-center border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center mb-1">
                <i className="fas fa-eye text-blue-500 text-xl"></i>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {propertyData?.views || 243}
              </p>
              <p className="text-sm text-gray-600 font-medium">Views</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-gray-200 shadow-sm">
              <div className="flex items-center justify-center mb-1">
                <i className="fas fa-heart text-red-500 text-xl"></i>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {propertyData?.favorites || 18}
              </p>
              <p className="text-sm text-gray-600 font-medium">Favorites</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Schedule Inspection */}
            <Button
              fullWidth
              variant="contained"
              onClick={() => setInspectionDialogOpen(true)}
              sx={{
                backgroundColor: "#ea580c",
                "&:hover": {
                  backgroundColor: "#c2410c",
                },
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                py: 1.75,
                borderRadius: "8px",
                display: "flex",
                gap: 1.5,
              }}
            >
              <i className="fas fa-calendar-check text-base"></i>
              Schedule Inspection
            </Button>

            {/* Make an Offer */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setOfferDialogOpen(true)}
              sx={{
                borderColor: "#ea580c",
                color: "#ea580c",
                "&:hover": {
                  borderColor: "#c2410c",
                  backgroundColor: "#fff7ed",
                },
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                py: 1.75,
                borderRadius: "8px",
                borderWidth: 2,
                display: "flex",
                gap: 1.5,
              }}
            >
              <i className="fas fa-tag text-base"></i>
              Make an Offer
            </Button>

            {/* Chat with Agent */}
            <Button
              fullWidth
              variant="outlined"
              onClick={handleChatNow}
              sx={{
                borderColor: "#d1d5db",
                color: "#374151",
                "&:hover": {
                  borderColor: "#9ca3af",
                  backgroundColor: "#f9fafb",
                },
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                py: 1.75,
                borderRadius: "8px",
                borderWidth: 2,
                display: "flex",
                gap: 1.5,
              }}
            >
              <i className="fas fa-comments text-orange-500 text-base"></i>
              Chat with Agent
            </Button>
          </div>

          {/* Property Status Info */}
          <div className="mt-3 bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-start gap-2">
              <i className="fas fa-info-circle text-blue-600 text-base mt-0.5"></i>
              <div>
                <Typography className="text-sm font-semibold text-blue-900 mb-0.5">
                  Property Status
                </Typography>
                <Typography className="text-sm text-blue-700">
                  Available for{" "}
                  <span className="font-bold">
                    {propertyData?.listingType || "Sale"}
                  </span>
                  . Schedule inspection to view.
                </Typography>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-green-200">
              <i className="fas fa-shield-check text-sm"></i>
              Verified
            </span>
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-purple-200">
              <i className="fas fa-clock text-sm"></i>
              Quick Response
            </span>
          </div>

          {/* Contact Info */}
          <div className="mt-3 pt-3 border-t">
            <Typography className="text-sm font-semibold text-gray-900 mb-2">
              Need Help?
            </Typography>
            <div className="space-y-1.5">
              <a
                href={`tel:${realtorInfo?.phone || "+234-XXX-XXX-XXXX"}`}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <i className="fas fa-phone text-orange-500 text-sm"></i>
                <span className="text-sm">
                  {realtorInfo?.phone || "+234-XXX-XXX-XXXX"}
                </span>
              </a>
              <a
                href={`mailto:${realtorInfo?.email || "info@realestate.com"}`}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <i className="fas fa-envelope text-orange-500 text-sm"></i>
                <span className="text-sm">
                  {realtorInfo?.email || "info@realestate.com"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Inspection Dialog */}
      <Dialog
        open={inspectionDialogOpen}
        onClose={() => setInspectionDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="bg-orange-500 text-white">
          <div className="flex items-center gap-2">
            <i className="fas fa-calendar-check"></i>
            Schedule Property Inspection
          </div>
        </DialogTitle>
        <DialogContent className="mt-4">
          {!isAuthenticated ? (
            <div className="py-6 text-center">
              <i className="fas fa-lock text-orange-500 text-5xl mb-4"></i>
              <Typography variant="h6" className="font-semibold mb-3 text-gray-900">
                Login Required
              </Typography>
              <Typography className="text-gray-600 mb-6">
                You need to be logged in to schedule a property inspection. Please sign in or create an account to continue.
              </Typography>
              <Button
                component={NavLinkAdapter}
                to="/sign-in"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#ea580c",
                  "&:hover": { backgroundColor: "#c2410c" },
                  textTransform: "none",
                  fontSize: "1rem",
                  py: 1.5,
                }}
              >
                Sign In to Continue
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <TextField
                label="Preferred Date"
                type="date"
                fullWidth
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField
                label="Preferred Time"
                type="time"
                fullWidth
                value={inspectionTime}
                onChange={(e) => setInspectionTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField
                label="Additional Notes (Optional)"
                multiline
                rows={3}
                fullWidth
                value={inspectionNotes}
                onChange={(e) => setInspectionNotes(e.target.value)}
                placeholder="Any specific requirements or questions..."
                variant="outlined"
              />
              <Typography className="text-sm text-gray-600">
                The realtor will confirm your inspection appointment within 24 hours.
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button
            onClick={() => setInspectionDialogOpen(false)}
            sx={{ textTransform: "none", fontSize: "0.95rem" }}
          >
            Cancel
          </Button>
          {isAuthenticated && (
            <Button
              onClick={handleScheduleInspection}
              variant="contained"
              disabled={!inspectionDate || !inspectionTime}
              sx={{
                backgroundColor: "#ea580c",
                "&:hover": { backgroundColor: "#c2410c" },
                textTransform: "none",
                fontSize: "0.95rem",
              }}
            >
              Schedule Now
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Make Offer Dialog */}
      <Dialog
        open={offerDialogOpen}
        onClose={() => setOfferDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="bg-orange-500 text-white">
          <div className="flex items-center gap-2">
            <i className="fas fa-tag"></i>
            Make an Offer
          </div>
        </DialogTitle>
        <DialogContent className="mt-4">
          {!isAuthenticated ? (
            <div className="py-6 text-center">
              <i className="fas fa-lock text-orange-500 text-5xl mb-4"></i>
              <Typography variant="h6" className="font-semibold mb-3 text-gray-900">
                Login Required
              </Typography>
              <Typography className="text-gray-600 mb-6">
                You need to be logged in to make an offer on this property. Please sign in or create an account to continue.
              </Typography>
              <Button
                component={NavLinkAdapter}
                to="/sign-in"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#ea580c",
                  "&:hover": { backgroundColor: "#c2410c" },
                  textTransform: "none",
                  fontSize: "1rem",
                  py: 1.5,
                }}
              >
                Sign In to Continue
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Typography className="text-sm text-gray-600 mb-1">
                  Listed Price
                </Typography>
                <Typography className="text-2xl font-bold text-gray-900">
                  ₦{propertyData?.price?.toLocaleString() || "XX,XXX,XXX"}
                </Typography>
              </div>
              <TextField
                label="Your Offer Amount (₦)"
                type="number"
                fullWidth
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="Enter your offer amount"
                variant="outlined"
              />
              <TextField
                label="Message to Seller (Optional)"
                multiline
                rows={4}
                fullWidth
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                placeholder="Explain your offer or add any additional terms..."
                variant="outlined"
              />
              <Typography className="text-sm text-gray-600">
                Your offer will be sent to the realtor for review. They will respond
                within 48 hours.
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button
            onClick={() => setOfferDialogOpen(false)}
            sx={{ textTransform: "none", fontSize: "0.95rem" }}
          >
            Cancel
          </Button>
          {isAuthenticated && (
            <Button
              onClick={handleMakeOffer}
              variant="contained"
              disabled={!offerAmount}
              sx={{
                backgroundColor: "#ea580c",
                "&:hover": { backgroundColor: "#c2410c" },
                textTransform: "none",
                fontSize: "0.95rem",
              }}
            >
              Submit Offer
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PropertyInteractionCard;
