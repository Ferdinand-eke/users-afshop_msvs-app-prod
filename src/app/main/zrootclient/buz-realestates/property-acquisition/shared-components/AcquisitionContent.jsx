import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Divider,
  Alert,
  LinearProgress,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Skeleton,
} from "@mui/material";
import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import { selectUser } from "app/auth/user/store/userSlice";
import {
  useSubmitPaymentProof,
  useSubmitPropertyDocuments,
  useGetAcquisitionStatus,
} from "app/configs/data/server-calls/auth/userapp/a_estates/usePropertyAcquisitionRepo";
import { useSelector } from "react-redux";
import { selectUser } from "src/app/auth/user/store/userSlice";
import Resizer from "app/utils/Resizer";

/**
 * AcquisitionContent - Payment & Documentation Upload Interface
 */
function AcquisitionContent(props) {
  const { offerId, offerDetails } = props;

  // Get current user from Redux store
  const user = useSelector(selectUser);

  // API Hooks
  const submitPaymentMutation = useSubmitPaymentProof();
  const submitDocumentsMutation = useSubmitPropertyDocuments();

  // Extract propertyId from offerDetails
  const propertyId = offerDetails?.propertyId || offerDetails?.property?._id;

  // Fetch existing acquisition status
  const { data: acquisitionData, isLoading: isLoadingStatus, refetch: refetchStatus } = useGetAcquisitionStatus(offerId, propertyId);

  // Payment state
  const [paymentProof, setPaymentProof] = useState(null);
  const [transactionRef, setTransactionRef] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [depositAmount, setDepositAmount] = useState(offerDetails?.totalCost || 0);
  const [userNotes, setUserNotes] = useState("");
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  // Document state
  const [documents, setDocuments] = useState({
    identityDocument: null,
    proofOfAddress: null,
    bankStatement: null,
    additionalDocs: [],
  });
  const [documentsSubmitted, setDocumentsSubmitted] = useState(false);

  // Upload progress
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Dialog states for viewing/uploading additional documents
  const [openViewDocsDialog, setOpenViewDocsDialog] = useState(false);
  const [openAddDocsDialog, setOpenAddDocsDialog] = useState(false);
  const [additionalPaymentProof, setAdditionalPaymentProof] = useState(null);
  const [additionalTransactionRef, setAdditionalTransactionRef] = useState("");
  const [additionalPaymentDate, setAdditionalPaymentDate] = useState("");
  const [additionalPaymentAmount, setAdditionalPaymentAmount] = useState("");
  const [additionalDocuments, setAdditionalDocuments] = useState([]);

  // Extract acquisition data from API response
  console.log("AQW", acquisitionData?.data?.acquisition);

  const existingAcquisition = acquisitionData?.data?.acquisition;
  // Note: API returns 'paymentProofs' (plural), not 'paymentProof'
  const hasExistingPayment = existingAcquisition?.paymentProofs && existingAcquisition?.paymentProofs?.length > 0;
  const hasExistingDocuments = existingAcquisition?.userDocuments && existingAcquisition?.userDocuments?.length > 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount || 0);
  };

  // Helper function to compress image files to base64
  const compressImageFile = (file) => {
    return new Promise((resolve, reject) => {
      try {
        // Check if file is an image
        if (file.type && file.type.includes('image')) {
          Resizer.imageFileResizer(
            file,
            1920, // maxWidth - reasonable size for documents
            1920, // maxHeight
            'JPEG', // compressFormat
            85, // quality (85% for good balance between quality and size)
            0, // rotation
            (uri) => {
              resolve(uri); // Returns base64 string
            },
            'base64', // outputType
            800, // minWidth
            800 // minHeight
          );
        } else {
          // For PDF files, convert to base64 without resizing
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const handlePaymentProofUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  const handleDocumentUpload = (event, docType) => {
    const file = event.target.files[0];
    if (file) {
      if (docType === 'additional') {
        setDocuments(prev => ({
          ...prev,
          additionalDocs: [...prev.additionalDocs, file]
        }));
      } else {
        setDocuments(prev => ({
          ...prev,
          [docType]: file
        }));
      }
    }
  };

  const removeDocument = (docType, index = null) => {
    if (docType === 'additionalDocs' && index !== null) {
      setDocuments(prev => ({
        ...prev,
        additionalDocs: prev.additionalDocs.filter((_, i) => i !== index)
      }));
    } else {
      setDocuments(prev => ({
        ...prev,
        [docType]: null
      }));
    }
  };

  const handlePaymentSubmit = async () => {
    if (!paymentProof || !transactionRef || !paymentDate) {
      alert("Please fill all required payment fields");
      return;
    }

    if (!documents.identityDocument || !documents.proofOfAddress) {
      alert("Please upload both required documents (ID and Proof of Address) before submitting payment");
      return;
    }

    setIsUploading(true);

    try {
      // Compress payment proof and documents to base64
      setUploadProgress(10);
      const paymentProofCompressed = await compressImageFile(paymentProof);

      setUploadProgress(25);
      const identityDocCompressed = await compressImageFile(documents.identityDocument);

      setUploadProgress(40);
      const proofOfAddressCompressed = await compressImageFile(documents.proofOfAddress);

      setUploadProgress(55);
      // Compress optional bank statement if exists
      const bankStatementCompressed = documents.bankStatement
        ? await compressImageFile(documents.bankStatement)
        : null;

      setUploadProgress(70);
      // Compress additional documents if any
      const additionalDocsCompressed = [];
      if (documents.additionalDocs.length > 0) {
        for (const doc of documents.additionalDocs) {
          const compressed = await compressImageFile(doc);
          additionalDocsCompressed.push(compressed);
        }
      }

      setUploadProgress(85);

      // Prepare complete payload according to DTO with compressed base64 data
      const acquisitionData = {
        offerId: offerId,
        // Property information propertyId
        propertyId: offerDetails?.propertyId || offerDetails?.property?._id,

        // User information from Redux store
        userId: user?.data?._id || user?.uid,
        userName: user?.name || `${user?.data?.firstName || ''} ${user?.data?.lastName || ''}`.trim(),
        userEmail: user?.data?.email || user?.email,
        userPhone: user?.data?.phoneNumber || user?.data?.phone || offerDetails?.buyerPhone || '',

        // Pricing information
        agreedPrice: offerDetails?.propertyPrice || offerDetails?.offerAmount,
        depositAmount: parseFloat(depositAmount) || offerDetails?.totalCost,
        balanceAmount: 0, // Can be calculated on backend if needed

        // User notes
        userNotes: userNotes || paymentNotes || '',

        // Payment proof details with compressed base64 image
        paymentProof: {
          transactionRef: transactionRef,
          paymentDate: paymentDate,
          paymentAmount: parseFloat(depositAmount) || offerDetails?.totalCost,
          paymentMethod: paymentMethod,
          paymentProofUrl: paymentProofCompressed, // Base64 compressed image
          paymentNotes: paymentNotes || '',
          bankName: bankName || '',
          accountNumber: accountNumber || '',
        },

        // User documents with compressed base64 images
        userDocuments: [
          {
            documentType: 'IDENTITY_DOCUMENT',
            documentFile: identityDocCompressed, // Base64 compressed
          },
          {
            documentType: 'PROOF_OF_ADDRESS',
            documentFile: proofOfAddressCompressed, // Base64 compressed
          },
          ...(bankStatementCompressed ? [{
            documentType: 'BANK_STATEMENT',
            documentFile: bankStatementCompressed, // Base64 compressed
          }] : []),
          ...additionalDocsCompressed.map((compressedDoc) => ({
            documentType: 'ADDITIONAL_DOCUMENT',
            documentFile: compressedDoc, // Base64 compressed
          }))
        ],
      };

      console.log("Front-end-payload (compressed)", acquisitionData);

      setUploadProgress(95);

      // Submit complete acquisition data via API
      submitPaymentMutation.mutate(
        {
          formData: acquisitionData,
        },
        {
          onSuccess: () => {
            setIsUploading(false);
            setPaymentSubmitted(true);
            setDocumentsSubmitted(true); // Mark documents as submitted too
            setUploadProgress(100);
            setTimeout(() => setUploadProgress(0), 1000);
          },
          onError: () => {
            setIsUploading(false);
            setUploadProgress(0);
          },
        }
      );
    } catch (error) {
      console.error("Error compressing files:", error);
      alert("Failed to compress files. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDocumentsSubmit = async () => {
    if (!documents.identityDocument || !documents.proofOfAddress) {
      alert("Please upload required documents (ID and Proof of Address)");
      return;
    }

    setIsUploading(true);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Submit documents via API
    submitDocumentsMutation.mutate(
      {
        offerId,
        formData: documents,
      },
      {
        onSuccess: () => {
          setIsUploading(false);
          setDocumentsSubmitted(true);
          setUploadProgress(0);
        },
        onError: () => {
          setIsUploading(false);
          setUploadProgress(0);
        },
      }
    );
  };

  const handleAdditionalDocumentUpload = (event) => {
    const files = Array.from(event.target.files);
    setAdditionalDocuments(prev => [...prev, ...files]);
  };

  const removeAdditionalDocument = (index) => {
    setAdditionalDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitAdditionalPayment = async () => {
    if (!additionalPaymentProof || !additionalTransactionRef || !additionalPaymentDate || !additionalPaymentAmount) {
      alert("Please fill all required payment fields");
      return;
    }

    setIsUploading(true);

    try {
      setUploadProgress(10);
      const paymentProofCompressed = await compressImageFile(additionalPaymentProof);

      setUploadProgress(40);
      const additionalDocsCompressed = [];
      if (additionalDocuments.length > 0) {
        for (const doc of additionalDocuments) {
          const compressed = await compressImageFile(doc);
          additionalDocsCompressed.push(compressed);
        }
      }

      setUploadProgress(70);

      // Prepare payload for additional payment
      const additionalPaymentData = {
        offerId: offerId,
        propertyId: offerDetails?.propertyId || offerDetails?.property?._id,
        userId: user?.data?._id || user?.uid,
        userName: user?.name || `${user?.data?.firstName || ''} ${user?.data?.lastName || ''}`.trim(),
        userEmail: user?.data?.email || user?.email,
        userPhone: user?.data?.phoneNumber || user?.data?.phone || offerDetails?.buyerPhone || '',
        agreedPrice: offerDetails?.propertyPrice || offerDetails?.offerAmount,
        depositAmount: parseFloat(additionalPaymentAmount),
        balanceAmount: 0,
        userNotes: 'Additional payment for installment',
        paymentProof: {
          transactionRef: additionalTransactionRef,
          paymentDate: additionalPaymentDate,
          paymentAmount: parseFloat(additionalPaymentAmount),
          paymentMethod: 'Bank Transfer',
          paymentProofUrl: paymentProofCompressed,
          paymentNotes: 'Installment payment',
          bankName: '',
          accountNumber: '',
        },
        userDocuments: additionalDocsCompressed.map((compressedDoc) => ({
          documentType: 'ADDITIONAL_DOCUMENT',
          documentFile: compressedDoc,
        })),
      };

      setUploadProgress(95);

      submitPaymentMutation.mutate(
        {
          formData: additionalPaymentData,
        },
        {
          onSuccess: () => {
            setIsUploading(false);
            setUploadProgress(100);
            setOpenAddDocsDialog(false);
            // Reset additional payment form
            setAdditionalPaymentProof(null);
            setAdditionalTransactionRef("");
            setAdditionalPaymentDate("");
            setAdditionalPaymentAmount("");
            setAdditionalDocuments([]);
            // Refetch acquisition status
            refetchStatus();
            setTimeout(() => setUploadProgress(0), 1000);
          },
          onError: () => {
            setIsUploading(false);
            setUploadProgress(0);
          },
        }
      );
    } catch (error) {
      console.error("Error compressing files:", error);
      alert("Failed to compress files. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="flex-auto p-24 sm:p-40">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Loading State */}
        {isLoadingStatus && (
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" className="mt-4" />
              <Skeleton variant="text" />
            </CardContent>
          </Card>
        )}

        {/* Payment Already Submitted View */}
        {!isLoadingStatus && hasExistingPayment && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Alert severity="success" className="shadow-lg" icon={<i className="fas fa-trophy text-2xl"></i>}>
                <Typography variant="h6" className="font-bold mb-2">
                  Payment Submitted Successfully!
                </Typography>
                <Typography variant="body2">
                  Thank you for submitting your payment. Our teams are processing your application:
                </Typography>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Finance team will verify your payment (24-48 hours)</li>
                  <li>Legal team will review your documents (3-5 business days)</li>
                  <li>You will be notified once verification is complete</li>
                </ul>
                <Typography variant="body2" className="mt-3 font-semibold">
                  <i className="fas fa-envelope mr-2"></i>
                  We'll send updates to your registered email address.
                </Typography>
              </Alert>
            </motion.div>

            {/* Payment Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="h6" className="font-bold text-gray-900">
                      <i className="fas fa-receipt text-green-600 mr-2"></i>
                      Payment Summary
                    </Typography>
                    <Chip
                      label={existingAcquisition?.status || "Processing"}
                      color="warning"
                      size="small"
                    />
                  </div>

                  <Divider className="mb-4" />

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" className="text-gray-600 font-semibold block">
                        Total Amount Paid
                      </Typography>
                      <Typography variant="h5" className="font-bold text-green-600">
                        {formatCurrency(existingAcquisition?.totalAmountPaid || 0)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" className="text-gray-600 font-semibold block">
                        Number of Payments
                      </Typography>
                      <Typography variant="h5" className="font-bold text-blue-600">
                        {existingAcquisition?.paymentProofs?.length || 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" className="text-gray-600 font-semibold block">
                        Agreed Price
                      </Typography>
                      <Typography variant="h6" className="font-bold text-gray-700">
                        {formatCurrency(existingAcquisition?.agreedPrice || 0)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" className="text-gray-600 font-semibold block">
                        Remaining Balance
                      </Typography>
                      <Typography variant="h6" className="font-bold text-orange-600">
                        {formatCurrency(existingAcquisition?.remainingBalance || 0)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider className="my-4" />

                  {/* Action Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<i className="fas fa-eye"></i>}
                      onClick={() => setOpenViewDocsDialog(true)}
                    >
                      View Submitted Documents
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<i className="fas fa-plus"></i>}
                      onClick={() => setOpenAddDocsDialog(true)}
                    >
                      Add Installment Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}

        {/* Original Form - Only show if no existing payment */}
        {!isLoadingStatus && !hasExistingPayment && (
          <>
        {/* Company Bank Account Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-orange-300 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-university text-white text-2xl"></i>
                </div>
                <div>
                  <Typography variant="h5" className="font-bold text-gray-900 mb-1">
                    Company Official Bank Account
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Make payment to this account only
                  </Typography>
                </div>
              </div>

              <Divider className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <Typography variant="caption" className="text-gray-600 font-semibold block mb-1">
                    BANK NAME
                  </Typography>
                  <Typography variant="h6" className="font-bold text-gray-900">
                    First Bank of Nigeria
                  </Typography>
                </div>

                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <Typography variant="caption" className="text-gray-600 font-semibold block mb-1">
                    ACCOUNT NUMBER
                  </Typography>
                  <Typography variant="h6" className="font-bold text-gray-900 font-mono">
                    1234567890
                  </Typography>
                </div>

                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <Typography variant="caption" className="text-gray-600 font-semibold block mb-1">
                    ACCOUNT NAME
                  </Typography>
                  <Typography variant="h6" className="font-bold text-gray-900">
                    Africanshops Limited
                  </Typography>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-2 border-orange-300">
                  <Typography variant="caption" className="text-orange-800 font-semibold block mb-1">
                    AMOUNT TO PAY
                  </Typography>
                  <Typography variant="h5" className="font-black text-orange-900">
                    {formatCurrency(offerDetails?.totalCost)}
                  </Typography>
                </div>
              </div>

              <Alert severity="warning" className="mt-4">
                <Typography variant="body2" className="font-semibold">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Important: Only payments to this account will be recognized. Do not send money to any individual.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Proof Submission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-receipt text-white"></i>
                  </div>
                  <div>
                    <Typography variant="h6" className="font-bold text-gray-900">
                      Complete Property Acquisition
                    </Typography>
                    <Typography variant="caption" className="text-gray-600">
                      Submit payment proof and required documents together
                    </Typography>
                  </div>
                </div>
                {paymentSubmitted && (
                  <Chip
                    label="Submitted"
                    color="success"
                    icon={<i className="fas fa-check-circle"></i>}
                  />
                )}
              </div>

              <Divider className="mb-4" />

              {paymentSubmitted ? (
                <Alert severity="success" icon={<i className="fas fa-check-circle"></i>}>
                  <Typography variant="body2" className="font-semibold">
                    Payment proof submitted successfully! Our finance team will verify your payment within 24-48 hours.
                  </Typography>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {/* Transaction Reference */}
                  <TextField
                    label="Transaction Reference Number"
                    fullWidth
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    required
                    placeholder="Enter transaction reference/ID"
                    helperText="Reference number from your bank transfer"
                  />

                  {/* Payment Date */}
                  <TextField
                    label="Payment Date"
                    type="date"
                    fullWidth
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                  />

                  {/* Payment Method */}
                  <FormControl fullWidth required>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      label="Payment Method"
                    >
                      <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                      <MenuItem value="Online Banking">Online Banking</MenuItem>
                      <MenuItem value="Mobile Money">Mobile Money</MenuItem>
                      <MenuItem value="USSD">USSD</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Bank Name (Optional) */}
                  <TextField
                    label="Bank Name (Optional)"
                    fullWidth
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g., First Bank, GTBank, Access Bank"
                    helperText="Bank where payment was made from"
                  />

                  {/* Account Number (Optional) */}
                  <TextField
                    label="Account Number (Optional)"
                    fullWidth
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Your account number"
                    helperText="Account used for the payment"
                  />

                  {/* Payment Amount */}
                  <TextField
                    label="Payment Amount"
                    type="number"
                    fullWidth
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <span className="mr-2">₦</span>,
                    }}
                    helperText={`Total amount due: ${formatCurrency(offerDetails?.totalCost)}`}
                  />

                  {/* Payment Proof Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-500 transition-colors">
                    <input
                      type="file"
                      id="payment-proof"
                      accept="image/*,.pdf"
                      onChange={handlePaymentProofUpload}
                      className="hidden"
                    />
                    <label htmlFor="payment-proof" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
                        <Typography variant="body2" className="font-semibold text-gray-700 mb-1">
                          Click to upload payment receipt
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          PNG, JPG or PDF (Max 5MB)
                        </Typography>
                        {paymentProof && (
                          <Chip
                            label={paymentProof.name}
                            onDelete={() => setPaymentProof(null)}
                            color="success"
                            className="mt-3"
                          />
                        )}
                      </div>
                    </label>
                  </div>

                  {/* User Notes */}
                  <TextField
                    label="Additional Notes (Optional)"
                    fullWidth
                    multiline
                    rows={3}
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Any additional information or special requests"
                  />

                  <Divider sx={{ marginY: 3 }} />

                  {/* Document Upload Section Within Same Card */}
                  <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                    <i className="fas fa-file-upload text-blue-600 mr-2"></i>
                    Required Documents
                  </Typography>

                  {/* Required Documents */}
                  <div className="space-y-4">
                    {/* Identity Document */}
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Typography variant="body2" className="font-semibold text-gray-800">
                          <i className="fas fa-id-card text-blue-600 mr-2"></i>
                          Valid Government ID *
                        </Typography>
                        {documents.identityDocument && (
                          <IconButton size="small" onClick={() => removeDocument('identityDocument')}>
                            <i className="fas fa-times text-red-500"></i>
                          </IconButton>
                        )}
                      </div>
                      <Typography variant="caption" className="text-gray-600 block mb-3">
                        National ID, Driver's License, or International Passport
                      </Typography>
                      <input
                        type="file"
                        id="identity-doc-payment"
                        accept="image/*,.pdf"
                        onChange={(e) => handleDocumentUpload(e, 'identityDocument')}
                        className="hidden"
                      />
                      <label htmlFor="identity-doc-payment">
                        <Button
                          component="span"
                          variant="outlined"
                          size="small"
                          startIcon={<i className="fas fa-upload"></i>}
                        >
                          {documents.identityDocument ? 'Change File' : 'Upload Document'}
                        </Button>
                      </label>
                      {documents.identityDocument && (
                        <Chip
                          label={documents.identityDocument.name}
                          size="small"
                          color="primary"
                          className="ml-2"
                        />
                      )}
                    </div>

                    {/* Proof of Address */}
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Typography variant="body2" className="font-semibold text-gray-800">
                          <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                          Proof of Address *
                        </Typography>
                        {documents.proofOfAddress && (
                          <IconButton size="small" onClick={() => removeDocument('proofOfAddress')}>
                            <i className="fas fa-times text-red-500"></i>
                          </IconButton>
                        )}
                      </div>
                      <Typography variant="caption" className="text-gray-600 block mb-3">
                        Utility bill, bank statement, or rental agreement (not older than 3 months)
                      </Typography>
                      <input
                        type="file"
                        id="address-proof-payment"
                        accept="image/*,.pdf"
                        onChange={(e) => handleDocumentUpload(e, 'proofOfAddress')}
                        className="hidden"
                      />
                      <label htmlFor="address-proof-payment">
                        <Button
                          component="span"
                          variant="outlined"
                          size="small"
                          startIcon={<i className="fas fa-upload"></i>}
                        >
                          {documents.proofOfAddress ? 'Change File' : 'Upload Document'}
                        </Button>
                      </label>
                      {documents.proofOfAddress && (
                        <Chip
                          label={documents.proofOfAddress.name}
                          size="small"
                          color="primary"
                          className="ml-2"
                        />
                      )}
                    </div>

                    {/* Bank Statement (Optional) */}
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Typography variant="body2" className="font-semibold text-gray-800">
                          <i className="fas fa-file-invoice-dollar text-green-600 mr-2"></i>
                          Bank Statement (Optional)
                        </Typography>
                        {documents.bankStatement && (
                          <IconButton size="small" onClick={() => removeDocument('bankStatement')}>
                            <i className="fas fa-times text-red-500"></i>
                          </IconButton>
                        )}
                      </div>
                      <Typography variant="caption" className="text-gray-600 block mb-3">
                        Last 3 months bank statement (recommended)
                      </Typography>
                      <input
                        type="file"
                        id="bank-statement-payment"
                        accept="image/*,.pdf"
                        onChange={(e) => handleDocumentUpload(e, 'bankStatement')}
                        className="hidden"
                      />
                      <label htmlFor="bank-statement-payment">
                        <Button
                          component="span"
                          variant="outlined"
                          size="small"
                          color="success"
                          startIcon={<i className="fas fa-upload"></i>}
                        >
                          {documents.bankStatement ? 'Change File' : 'Upload Document'}
                        </Button>
                      </label>
                      {documents.bankStatement && (
                        <Chip
                          label={documents.bankStatement.name}
                          size="small"
                          color="success"
                          className="ml-2"
                        />
                      )}
                    </div>

                    {/* Additional Documents */}
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
                      <Typography variant="body2" className="font-semibold text-gray-800 mb-2">
                        <i className="fas fa-folder-plus text-purple-600 mr-2"></i>
                        Additional Documents (Optional)
                      </Typography>
                      <Typography variant="caption" className="text-gray-600 block mb-3">
                        Any other supporting documents
                      </Typography>
                      <input
                        type="file"
                        id="additional-docs-payment"
                        accept="image/*,.pdf"
                        onChange={(e) => handleDocumentUpload(e, 'additional')}
                        className="hidden"
                        multiple
                      />
                      <label htmlFor="additional-docs-payment">
                        <Button
                          component="span"
                          variant="outlined"
                          size="small"
                          color="secondary"
                          startIcon={<i className="fas fa-plus"></i>}
                        >
                          Add Document
                        </Button>
                      </label>
                      {documents.additionalDocs.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {documents.additionalDocs.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Chip
                                label={doc.name}
                                size="small"
                                onDelete={() => removeDocument('additionalDocs', index)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-2">
                      <LinearProgress variant="determinate" value={uploadProgress} />
                      <Typography variant="caption" className="text-gray-600">
                        Uploading... {uploadProgress}%
                      </Typography>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handlePaymentSubmit}
                    disabled={
                      !paymentProof ||
                      !transactionRef ||
                      !paymentDate ||
                      !documents.identityDocument ||
                      !documents.proofOfAddress ||
                      isUploading
                    }
                    startIcon={<i className="fas fa-check-double"></i>}
                    sx={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      padding: '14px',
                      fontSize: '1.05rem',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                      },
                      '&:disabled': {
                        background: '#9ca3af',
                      }
                    }}
                  >
                    Submit Complete Acquisition Request
                  </Button>

                  {/* Validation message */}
                  {(!documents.identityDocument || !documents.proofOfAddress) && (
                    <Alert severity="warning" className="mt-2">
                      <Typography variant="caption">
                        Please upload both required documents (ID and Proof of Address) before submitting
                      </Typography>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Document Upload Section - HIDDEN since combined with payment */}
        {false && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-file-upload text-white"></i>
                  </div>
                  <div>
                    <Typography variant="h6" className="font-bold text-gray-900">
                      Step 2: Upload Required Documents
                    </Typography>
                    <Typography variant="caption" className="text-gray-600">
                      Submit necessary documentation for property transfer
                    </Typography>
                  </div>
                </div>
                {documentsSubmitted && (
                  <Chip
                    label="Submitted"
                    color="success"
                    icon={<i className="fas fa-check-circle"></i>}
                  />
                )}
              </div>

              <Divider className="mb-4" />

              {documentsSubmitted ? (
                <Alert severity="success" icon={<i className="fas fa-check-circle"></i>}>
                  <Typography variant="body2" className="font-semibold">
                    Documents submitted successfully! Our legal team will review them within 3-5 business days.
                  </Typography>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Required Documents */}
                  <div>
                    <Typography variant="caption" className="text-gray-800 font-bold block mb-3 uppercase">
                      <i className="fas fa-asterisk text-red-500 text-xs mr-1"></i>
                      Required Documents
                    </Typography>

                    {/* Identity Document */}
                    <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Typography variant="body2" className="font-semibold text-gray-800">
                          <i className="fas fa-id-card text-blue-600 mr-2"></i>
                          Valid Government ID
                        </Typography>
                        {documents.identityDocument && (
                          <IconButton size="small" onClick={() => removeDocument('identityDocument')}>
                            <i className="fas fa-times text-red-500"></i>
                          </IconButton>
                        )}
                      </div>
                      <Typography variant="caption" className="text-gray-600 block mb-3">
                        National ID, Driver's License, or International Passport
                      </Typography>
                      <input
                        type="file"
                        id="identity-doc"
                        accept="image/*,.pdf"
                        onChange={(e) => handleDocumentUpload(e, 'identityDocument')}
                        className="hidden"
                      />
                      <label htmlFor="identity-doc">
                        <Button
                          component="span"
                          variant="outlined"
                          size="small"
                          startIcon={<i className="fas fa-upload"></i>}
                        >
                          {documents.identityDocument ? 'Change File' : 'Upload Document'}
                        </Button>
                      </label>
                      {documents.identityDocument && (
                        <Chip
                          label={documents.identityDocument.name}
                          size="small"
                          color="primary"
                          className="ml-2"
                        />
                      )}
                    </div>

                    {/* Proof of Address */}
                    <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Typography variant="body2" className="font-semibold text-gray-800">
                          <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                          Proof of Address
                        </Typography>
                        {documents.proofOfAddress && (
                          <IconButton size="small" onClick={() => removeDocument('proofOfAddress')}>
                            <i className="fas fa-times text-red-500"></i>
                          </IconButton>
                        )}
                      </div>
                      <Typography variant="caption" className="text-gray-600 block mb-3">
                        Utility bill, bank statement, or rental agreement (not older than 3 months)
                      </Typography>
                      <input
                        type="file"
                        id="address-proof"
                        accept="image/*,.pdf"
                        onChange={(e) => handleDocumentUpload(e, 'proofOfAddress')}
                        className="hidden"
                      />
                      <label htmlFor="address-proof">
                        <Button
                          component="span"
                          variant="outlined"
                          size="small"
                          startIcon={<i className="fas fa-upload"></i>}
                        >
                          {documents.proofOfAddress ? 'Change File' : 'Upload Document'}
                        </Button>
                      </label>
                      {documents.proofOfAddress && (
                        <Chip
                          label={documents.proofOfAddress.name}
                          size="small"
                          color="primary"
                          className="ml-2"
                        />
                      )}
                    </div>
                  </div>

                  <Divider />

                  {/* Optional Documents */}
                  <div>
                    <Typography variant="caption" className="text-gray-800 font-bold block mb-3 uppercase">
                      Optional Documents
                    </Typography>

                    {/* Bank Statement */}
                    <div className="mb-4 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Typography variant="body2" className="font-semibold text-gray-800">
                          <i className="fas fa-file-invoice-dollar text-green-600 mr-2"></i>
                          Bank Statement
                        </Typography>
                        {documents.bankStatement && (
                          <IconButton size="small" onClick={() => removeDocument('bankStatement')}>
                            <i className="fas fa-times text-red-500"></i>
                          </IconButton>
                        )}
                      </div>
                      <Typography variant="caption" className="text-gray-600 block mb-3">
                        Last 3 months bank statement (optional but recommended)
                      </Typography>
                      <input
                        type="file"
                        id="bank-statement"
                        accept="image/*,.pdf"
                        onChange={(e) => handleDocumentUpload(e, 'bankStatement')}
                        className="hidden"
                      />
                      <label htmlFor="bank-statement">
                        <Button
                          component="span"
                          variant="outlined"
                          size="small"
                          color="success"
                          startIcon={<i className="fas fa-upload"></i>}
                        >
                          {documents.bankStatement ? 'Change File' : 'Upload Document'}
                        </Button>
                      </label>
                      {documents.bankStatement && (
                        <Chip
                          label={documents.bankStatement.name}
                          size="small"
                          color="success"
                          className="ml-2"
                        />
                      )}
                    </div>

                    {/* Additional Documents */}
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
                      <Typography variant="body2" className="font-semibold text-gray-800 mb-2">
                        <i className="fas fa-folder-plus text-purple-600 mr-2"></i>
                        Additional Documents
                      </Typography>
                      <Typography variant="caption" className="text-gray-600 block mb-3">
                        Any other supporting documents
                      </Typography>
                      <input
                        type="file"
                        id="additional-docs"
                        accept="image/*,.pdf"
                        onChange={(e) => handleDocumentUpload(e, 'additional')}
                        className="hidden"
                        multiple
                      />
                      <label htmlFor="additional-docs">
                        <Button
                          component="span"
                          variant="outlined"
                          size="small"
                          color="secondary"
                          startIcon={<i className="fas fa-plus"></i>}
                        >
                          Add Document
                        </Button>
                      </label>
                      {documents.additionalDocs.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {documents.additionalDocs.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Chip
                                label={doc.name}
                                size="small"
                                onDelete={() => removeDocument('additionalDocs', index)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-2">
                      <LinearProgress variant="determinate" value={uploadProgress} />
                      <Typography variant="caption" className="text-gray-600">
                        Uploading documents... {uploadProgress}%
                      </Typography>
                    </div>
                  )}

                  {/* Submit Documents Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleDocumentsSubmit}
                    disabled={!documents.identityDocument || !documents.proofOfAddress || isUploading}
                    startIcon={<i className="fas fa-check-circle"></i>}
                    sx={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      padding: '12px',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                      },
                      '&:disabled': {
                        background: '#9ca3af',
                      }
                    }}
                  >
                    Submit Documents
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        )}

        {/* Completion Status */}
        {paymentSubmitted && documentsSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Alert severity="success" className="shadow-lg" icon={<i className="fas fa-trophy text-2xl"></i>}>
              <Typography variant="h6" className="font-bold mb-2">
                All Steps Completed!
              </Typography>
              <Typography variant="body2">
                Thank you for submitting all required information. Our teams will now process your application:
              </Typography>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Finance team will verify your payment (24-48 hours)</li>
                <li>Legal team will review your documents (3-5 business days)</li>
                <li>You will be notified once verification is complete</li>
              </ul>
              <Typography variant="body2" className="mt-3 font-semibold">
                <i className="fas fa-envelope mr-2"></i>
                We'll send updates to your registered email address.
              </Typography>
            </Alert>
          </motion.div>
        )}
        </>
        )}

        {/* View Documents Dialog */}
        <Dialog
          open={openViewDocsDialog}
          onClose={() => setOpenViewDocsDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <div className="flex items-center gap-2">
              <i className="fas fa-file-alt text-blue-600"></i>
              <Typography variant="h6" className="font-bold">
                Submitted Payment Proofs & Documents
              </Typography>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            {/* Payment Proofs List */}
            <Typography variant="subtitle1" className="font-bold mb-3">
              <i className="fas fa-receipt text-green-600 mr-2"></i>
              Payment History
            </Typography>
            {existingAcquisition?.paymentProofs && existingAcquisition?.paymentProofs.length > 0 ? (
              <div className="space-y-3 mb-6">
                {existingAcquisition.paymentProofs.map((payment, index) => (
                  <Card key={index} variant="outlined" className="p-3">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" className="text-gray-600 font-semibold block">
                          Transaction Reference
                        </Typography>
                        <Typography variant="body2" className="font-mono">
                          {payment.transactionRef || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" className="text-gray-600 font-semibold block">
                          Amount
                        </Typography>
                        <Typography variant="body2" className="font-bold text-green-600">
                          {formatCurrency(payment.paymentAmount)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" className="text-gray-600 font-semibold block">
                          Payment Date
                        </Typography>
                        <Typography variant="body2">
                          {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" className="text-gray-600 font-semibold block">
                          Payment Method
                        </Typography>
                        <Typography variant="body2">
                          {payment.paymentMethod || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" className="text-gray-600 font-semibold block">
                          Bank Name
                        </Typography>
                        <Typography variant="body2">
                          {payment.bankName || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" className="text-gray-600 font-semibold block">
                          Status
                        </Typography>
                        <Chip
                          label={payment.status || 'Pending'}
                          size="small"
                          color={payment.status === 'VERIFIED' ? 'success' : 'warning'}
                        />
                      </Grid>
                      {payment.paymentProofUrl && (
                        <Grid item xs={12}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<i className="fas fa-download"></i>}
                            href={payment.paymentProofUrl}
                            target="_blank"
                          >
                            View Receipt
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert severity="info" className="mb-4">No payment proofs found.</Alert>
            )}

            <Divider className="my-4" />

            {/* Documents List */}
            <Typography variant="subtitle1" className="font-bold mb-3">
              <i className="fas fa-folder-open text-blue-600 mr-2"></i>
              Uploaded Documents
            </Typography>
            {existingAcquisition?.userDocuments && existingAcquisition?.userDocuments.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {existingAcquisition.userDocuments.map((doc, index) => (
                  <Card key={index} variant="outlined" className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-file-pdf text-red-500"></i>
                        <div>
                          <Typography variant="body2" className="font-semibold">
                            {doc.documentType?.replace(/_/g, ' ') || 'Document'}
                          </Typography>
                          <Typography variant="caption" className="text-gray-600">
                            Uploaded: {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : 'N/A'}
                          </Typography>
                        </div>
                      </div>
                      {doc.documentFile && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<i className="fas fa-eye"></i>}
                          href={doc.documentFile}
                          target="_blank"
                        >
                          View
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert severity="info">No documents found.</Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenViewDocsDialog(false)} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Installment Payment Dialog */}
        <Dialog
          open={openAddDocsDialog}
          onClose={() => setOpenAddDocsDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <div className="flex items-center gap-2">
              <i className="fas fa-plus-circle text-green-600"></i>
              <Typography variant="h6" className="font-bold">
                Add Installment Payment
              </Typography>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <div className="space-y-4 pt-2">
              {/* Transaction Reference */}
              <TextField
                label="Transaction Reference Number"
                fullWidth
                value={additionalTransactionRef}
                onChange={(e) => setAdditionalTransactionRef(e.target.value)}
                required
                placeholder="Enter transaction reference/ID"
              />

              {/* Payment Date */}
              <TextField
                label="Payment Date"
                type="date"
                fullWidth
                value={additionalPaymentDate}
                onChange={(e) => setAdditionalPaymentDate(e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />

              {/* Payment Amount */}
              <TextField
                label="Payment Amount"
                type="number"
                fullWidth
                value={additionalPaymentAmount}
                onChange={(e) => setAdditionalPaymentAmount(e.target.value)}
                required
                InputProps={{
                  startAdornment: <span className="mr-2">₦</span>,
                }}
                helperText="Enter installment amount"
              />

              {/* Payment Proof Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-500 transition-colors">
                <input
                  type="file"
                  id="additional-payment-proof"
                  accept="image/*,.pdf"
                  onChange={(e) => setAdditionalPaymentProof(e.target.files[0])}
                  className="hidden"
                />
                <label htmlFor="additional-payment-proof" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                    <Typography variant="body2" className="font-semibold text-gray-700 mb-1">
                      Click to upload payment receipt
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      PNG, JPG or PDF (Max 5MB)
                    </Typography>
                    {additionalPaymentProof && (
                      <Chip
                        label={additionalPaymentProof.name}
                        onDelete={() => setAdditionalPaymentProof(null)}
                        color="success"
                        className="mt-2"
                      />
                    )}
                  </div>
                </label>
              </div>

              {/* Additional Documents Upload */}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-purple-500 transition-colors">
                <Typography variant="body2" className="font-semibold text-gray-800 mb-2">
                  <i className="fas fa-folder-plus text-purple-600 mr-2"></i>
                  Additional Supporting Documents (Optional)
                </Typography>
                <input
                  type="file"
                  id="additional-documents"
                  accept="image/*,.pdf"
                  onChange={handleAdditionalDocumentUpload}
                  className="hidden"
                  multiple
                />
                <label htmlFor="additional-documents">
                  <Button
                    component="span"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    startIcon={<i className="fas fa-plus"></i>}
                  >
                    Add Documents
                  </Button>
                </label>
                {additionalDocuments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {additionalDocuments.map((doc, index) => (
                      <Chip
                        key={index}
                        label={doc.name}
                        size="small"
                        onDelete={() => removeAdditionalDocument(index)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <LinearProgress variant="determinate" value={uploadProgress} />
                  <Typography variant="caption" className="text-gray-600">
                    Uploading... {uploadProgress}%
                  </Typography>
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDocsDialog(false)} disabled={isUploading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmitAdditionalPayment}
              disabled={
                !additionalPaymentProof ||
                !additionalTransactionRef ||
                !additionalPaymentDate ||
                !additionalPaymentAmount ||
                isUploading
              }
              startIcon={<i className="fas fa-check"></i>}
            >
              Submit Payment
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AcquisitionContent;
