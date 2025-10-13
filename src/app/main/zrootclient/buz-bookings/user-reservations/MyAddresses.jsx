import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";

/**
 * MyAddresses Modal Component
 * Displays saved billing addresses and allows user to select one
 */
function MyAddresses({ open, onClose, onSelectAddress, savedAddresses = [] }) {
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Placeholder addresses if no saved addresses are provided
  const defaultAddresses = [
    {
      id: 1,
      name: "John Doe",
      phone: "08012345678",
      address: "123 Main Street, Victoria Island, Lagos",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      phone: "08087654321",
      address: "45 Allen Avenue, Ikeja, Lagos",
      isDefault: false,
    },
    {
      id: 3,
      name: "Jane Smith",
      phone: "09023456789",
      address: "78 Admiralty Way, Lekki Phase 1, Lagos",
      isDefault: false,
    },
  ];

  const addresses = savedAddresses.length > 0 ? savedAddresses : defaultAddresses;

  const handleSelectAddress = () => {
    const selected = addresses.find((addr) => addr.id === selectedAddressId);
    if (selected && onSelectAddress) {
      onSelectAddress(selected);
      onClose();
    }
  };

  const handleAddressClick = (addressId) => {
    setSelectedAddressId(addressId);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" component="span" className="font-semibold">
          My Addresses
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* Content */}
      <DialogContent sx={{ p: 0 }}>
        <RadioGroup
          value={selectedAddressId}
          onChange={(e) => setSelectedAddressId(Number(e.target.value))}
        >
          {addresses.map((address, index) => (
            <div key={address.id}>
              <div
                onClick={() => handleAddressClick(address.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedAddressId === address.id ? "bg-orange-50" : ""
                }`}
              >
                <div className="flex items-start gap-2">
                  <FormControlLabel
                    value={address.id}
                    control={
                      <Radio
                        sx={{
                          color: "#9ca3af",
                          "&.Mui-checked": {
                            color: "#ea580c",
                          },
                        }}
                      />
                    }
                    label=""
                    sx={{ margin: 0 }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Typography variant="body1" className="font-semibold text-gray-900">
                        {address.name}
                      </Typography>
                      {address.isDefault && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <Typography variant="body2" className="text-gray-700 mb-1">
                      {address.address}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Phone: {address.phone}
                    </Typography>
                  </div>
                </div>
              </div>
              {index < addresses.length - 1 && <Divider />}
            </div>
          ))}
        </RadioGroup>
      </DialogContent>

      <Divider />

      {/* Footer */}
      <div className="p-4 flex gap-2 justify-end">
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderColor: "#d1d5db",
            color: "#374151",
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSelectAddress}
          disabled={!selectedAddressId}
          sx={{
            textTransform: "none",
            backgroundColor: "#ea580c",
            "&:hover": {
              backgroundColor: "#c2410c",
            },
            "&:disabled": {
              backgroundColor: "#fed7aa",
              color: "#fff",
            },
          }}
        >
          Use This Address
        </Button>
      </div>
    </Dialog>
  );
}

export default MyAddresses;
