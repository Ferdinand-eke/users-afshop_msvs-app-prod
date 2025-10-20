import FuseLoading from "@fuse/core/FuseLoading";
import { motion } from "framer-motion";
import { Typography, Card, CardContent, Chip, Button, Pagination, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import ClienttErrorPage from "src/app/main/zrootclient/components/ClienttErrorPage";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useUpdateOfferBid, useWithdrawOffer } from "app/configs/data/server-calls/auth/userapp/a_estates/useOffersRepo";

/**
 * Demo Content - Estate Offers List with Pagination
 */
function DemoContent(props) {
  const { isLoading, isError, offers, pagination, currentPage, onPageChange, isPreviousData } = props;

  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [newOfferAmount, setNewOfferAmount] = useState("");

  // Mutations
  const updateOfferMutation = useUpdateOfferBid();
  const withdrawOfferMutation = useWithdrawOffer();

  const handleUpgradeOffer = (offer) => {
    setSelectedOffer(offer);
    setNewOfferAmount(offer?.offerAmount || "");
    setUpgradeDialogOpen(true);
  };

  const handleSubmitUpgrade = () => {
    console.log("Submitting upgraded offer:", selectedOffer, newOfferAmount);
    if (selectedOffer && newOfferAmount) {
      updateOfferMutation.mutate({
        offerId: selectedOffer.id,
        formData: {
          offerAmount: parseInt(newOfferAmount),
        },
      }, {
        onSuccess: () => {
          setUpgradeDialogOpen(false);
          setSelectedOffer(null);
          setNewOfferAmount("");
        },
      });
    }
  };

  const handleWithdrawOffer = (offerId) => {
    if (window.confirm("Are you sure you want to withdraw this offer?")) {
      withdrawOfferMutation.mutate(offerId);
    }
  };

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
          message={"Error occurred while retrieving estate offers"}
        />
      </motion.div>
    );
  }

  if (!offers || offers?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <div className="text-center">
          <i className="fas fa-tag text-gray-300 text-6xl mb-4"></i>
          <Typography color="text.secondary" variant="h5">
            No offers found!
          </Typography>
          <Typography color="text.secondary" variant="body2" className="mt-2">
            Start making offers on properties you're interested in.
          </Typography>
        </div>
      </motion.div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      case "withdrawn":
        return "default";
      case "countered":
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount || 0);
  };

  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="flex-auto">
      <div className="h-7xl min-h-7xl max-h-7xl">
        <main className="w-full p-4 overflow-y-scroll">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">
              My Property Offers ({pagination?.total || 0})
            </h1>
            <Typography variant="caption" className="text-gray-600">
              Page {currentPage} of {totalPages}
            </Typography>
          </div>

          <div className="space-y-4">
            {offers?.map((offer) => (
              <Card
                key={offer?.id}
                className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border-l-4"
                style={{
                  borderLeftColor: offer?.status?.toLowerCase() === 'accepted' ? '#22c55e' :
                                   offer?.status?.toLowerCase() === 'rejected' ? '#ef4444' : '#f59e0b'
                }}
              >
                <CardContent>
                  {/* Header Section */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="fas fa-building text-green-500 text-lg"></i>
                        <Typography variant="h6" className="font-bold text-gray-800">
                          Property Offer
                        </Typography>
                      </div>
                      <div className="flex items-center gap-2">
                        <Chip
                          label={offer?.status || "Pending"}
                          color={getStatusColor(offer?.status)}
                          size="small"
                          className="font-semibold"
                        />
                        {offer?.isCounter && (
                          <Chip
                            label="Counter Offer"
                            color="info"
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Typography variant="caption" color="text.secondary" className="block">
                        Property ID
                      </Typography>
                      <Typography variant="body2" className="font-bold text-gray-800">
                        #{offer?.propertyId || "N/A"}
                      </Typography>
                    </div>
                  </div>

                  {/* Offer Amount Section - Highlighted */}
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg mb-4 border border-green-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Typography variant="caption" className="text-green-800 font-semibold block">
                          Your Offer Amount
                        </Typography>
                        <Typography variant="h5" className="font-bold text-green-900">
                          {formatCurrency(offer?.offerAmount)}
                        </Typography>
                      </div>
                      {offer?.propertyPrice && (
                        <div className="text-right">
                          <Typography variant="caption" className="text-gray-600 font-semibold block">
                            Listed Price
                          </Typography>
                          <Typography variant="h6" className="font-semibold text-gray-700">
                            {formatCurrency(offer?.propertyPrice)}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            {((offer?.offerAmount / offer?.propertyPrice) * 100).toFixed(1)}% of asking
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact & Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Typography variant="caption" color="text.secondary" className="font-semibold block">
                        Buyer Name
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-user text-green-500"></i>
                        <Typography variant="body2">
                          {offer?.buyerName || "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary" className="font-semibold block">
                        Contact Phone
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-phone text-green-500"></i>
                        <Typography variant="body2">
                          {offer?.buyerPhone || "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary" className="font-semibold block">
                        Contact Email
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-envelope text-green-500"></i>
                        <Typography variant="body2" className="truncate">
                          {offer?.buyerEmail || "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary" className="font-semibold block">
                        Submitted On
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-calendar-plus text-green-500"></i>
                        <Typography variant="body2">
                          {offer?.createdAt ? formatDate(offer.createdAt) : "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary" className="font-semibold block">
                        Last Updated
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-clock text-green-500"></i>
                        <Typography variant="body2">
                          {offer?.updatedAt ? formatDate(offer.updatedAt) : "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div>
                      <Typography variant="caption" color="text.secondary" className="font-semibold block">
                        Offer ID
                      </Typography>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-hashtag text-green-500"></i>
                        <Typography variant="body2" className="font-mono">
                          {offer?.id?.slice(0, 8) || "N/A"}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* Message Section */}
                  {offer?.message && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Typography variant="caption" className="text-blue-800 font-semibold block mb-1">
                        <i className="fas fa-comment text-blue-600 mr-1"></i>
                        Your Message
                      </Typography>
                      <Typography variant="body2" className="text-gray-700">
                        {offer.message}
                      </Typography>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                    {offer?.status?.toLowerCase() === "pending" && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<i className="fas fa-arrow-up"></i>}
                          onClick={() => handleUpgradeOffer(offer)}
                          disabled={updateOfferMutation.isLoading}
                        >
                          Upgrade Offer
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<i className="fas fa-times-circle"></i>}
                          onClick={() => handleWithdrawOffer(offer.id)}
                          disabled={withdrawOfferMutation.isLoading}
                        >
                          Withdraw Offer
                        </Button>
                      </>
                    )}
                    {offer?.status?.toLowerCase() === "accepted" && (
                      <Chip
                        icon={<i className="fas fa-check-circle"></i>}
                        label="Offer Accepted - Contact seller to proceed"
                        color="success"
                        className="font-semibold"
                      />
                    )}
                    {offer?.status?.toLowerCase() === "rejected" && (
                      <Chip
                        icon={<i className="fas fa-exclamation-circle"></i>}
                        label="Offer Rejected"
                        color="error"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => onPageChange(page)}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                disabled={isPreviousData}
              />
            </div>
          )}
        </main>
      </div>

      {/* Upgrade Offer Dialog */}
      <Dialog
        open={upgradeDialogOpen}
        onClose={() => setUpgradeDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="bg-green-500 text-white">
          <div className="flex items-center gap-2">
            <i className="fas fa-arrow-up"></i>
            Upgrade Your Offer
          </div>
        </DialogTitle>
        <DialogContent className="mt-4">
          <div className="space-y-4 py-4">
            {/* Property Price Display */}
            {selectedOffer?.propertyPrice && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <Typography variant="caption" className="text-blue-800 mb-1 block">
                  <i className="fas fa-home text-blue-600 mr-1"></i>
                  Property Listed Price
                </Typography>
                <Typography variant="h5" className="font-bold text-blue-900">
                  {formatCurrency(selectedOffer?.propertyPrice)}
                </Typography>
                <Typography variant="caption" className="text-blue-700 mt-1 block">
                  Property ID: #{selectedOffer?.propertyId || "N/A"}
                </Typography>
              </div>
            )}

            {/* Current Offer Amount */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="caption" className="text-gray-600 mb-1 block">
                Your Current Offer Amount
              </Typography>
              <Typography variant="h6" className="font-bold text-gray-900">
                {formatCurrency(selectedOffer?.offerAmount)}
              </Typography>
              {selectedOffer?.propertyPrice && (
                <Typography variant="caption" className="text-gray-500 mt-1 block">
                  {((selectedOffer?.offerAmount / selectedOffer?.propertyPrice) * 100).toFixed(1)}% of listed price
                </Typography>
              )}
            </div>

            {/* New Offer Input */}
            <TextField
              label="New Offer Amount (₦)"
              type="number"
              fullWidth
              value={newOfferAmount}
              onChange={(e) => setNewOfferAmount(e.target.value)}
              placeholder="Enter your new offer amount"
              variant="outlined"
              required
              helperText="Enter a higher amount to upgrade your offer"
            />

            {/* New Offer Preview */}
            {newOfferAmount && parseFloat(newOfferAmount) > 0 && selectedOffer?.propertyPrice && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <Typography variant="caption" className="text-green-800 block mb-1">
                  New Offer Preview
                </Typography>
                <div className="flex justify-between items-center">
                  <Typography variant="body2" className="font-bold text-green-900">
                    {formatCurrency(parseFloat(newOfferAmount))}
                  </Typography>
                  <Typography variant="caption" className="text-green-700">
                    {((parseFloat(newOfferAmount) / selectedOffer?.propertyPrice) * 100).toFixed(1)}% of listed price
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions className="p-4">
          <Button
            onClick={() => setUpgradeDialogOpen(false)}
            sx={{ textTransform: "none", fontSize: "0.95rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitUpgrade}
            variant="contained"
            disabled={!newOfferAmount || parseFloat(newOfferAmount) <= selectedOffer?.offerAmount || updateOfferMutation.isLoading}
            sx={{
              backgroundColor: "#22c55e",
              "&:hover": { backgroundColor: "#16a34a" },
              textTransform: "none",
              fontSize: "0.95rem",
            }}
          >
            {updateOfferMutation.isLoading ? "Updating..." : "Update Offer"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DemoContent;
