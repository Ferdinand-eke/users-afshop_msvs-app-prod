import { useState, useEffect, useRef } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  IconButton,
  Collapse,
  Divider,
  Box,
} from "@mui/material";
import {
  Search,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Clear,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import useSellerCountries from "app/configs/data/server-calls/countries/useCountries";
import {
  getLgasByStateId,
  getStateByCountryId,
} from "app/configs/data/client/RepositoryClient";

// Placeholder data for shop plans
const SHOP_PLANS = [
  "Basic",
  "Premium",
  "Enterprise",
  "Free Trial",
];

// Placeholder data for markets
const MARKETS = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Books",
  "Toys",
  "Automotive",
  "Health & Beauty",
];

// Placeholder advanced features for products
const PRODUCT_FEATURES = [
  { id: "ecowas-interest", label: "ECOWAS Interest", icon: "🌍" },
  { id: "verified-seller", label: "Verified Seller", icon: "✓" },
  { id: "fast-shipping", label: "Fast Shipping", icon: "🚚" },
  { id: "free-returns", label: "Free Returns", icon: "↩️" },
  { id: "eco-friendly", label: "Eco-Friendly", icon: "🌱" },
  { id: "handmade", label: "Handmade", icon: "✋" },
  { id: "local-product", label: "Local Product", icon: "🏠" },
  { id: "bulk-discount", label: "Bulk Discount", icon: "📦" },
];

/**
 * ProductFilter Component
 * A comprehensive filter panel for marketplace product listings with location filters,
 * price range, shop plans, and product features
 */
function ProductFilter({ onFilterChange, initialFilters = {} }) {
  const { data: COUNTRIES } = useSellerCountries();

  // Use ref to store the latest onFilterChange callback
  const onFilterChangeRef = useRef(onFilterChange);

  // Update ref when onFilterChange changes
  useEffect(() => {
    onFilterChangeRef.current = onFilterChange;
  }, [onFilterChange]);

  // Filter state
  const [keyword, setKeyword] = useState(initialFilters.keyword || "");
  const [country, setCountry] = useState(initialFilters.country || "");
  const [state, setState] = useState(initialFilters.state || "");
  const [lga, setLga] = useState(initialFilters.lga || "");
  const [shopPlan, setShopPlan] = useState(initialFilters.shopPlan || "");
  const [market, setMarket] = useState(initialFilters.market || "");
  const [priceRange, setPriceRange] = useState(
    initialFilters.priceRange || [0, 1000000]
  );
  const [selectedFeatures, setSelectedFeatures] = useState(
    initialFilters.features || []
  );

  // UI state
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const [availableStates, setAvailableStates] = useState([]);
  const [availableLgas, setAvailableLgas] = useState([]);

  // Update available locations based on selections
  useEffect(() => {
    if (country) {
      findStatesByCountry(country);
    } else {
      setAvailableStates([]);
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      getLgasFromState(state);
    } else {
      setAvailableLgas([]);
    }
  }, [state]);

  // Emit filter changes to parent component with debounce for keyword
  useEffect(() => {
    // Debounce keyword search to prevent excessive API calls
    const timeoutId = setTimeout(() => {
      if (onFilterChangeRef.current) {
        const filters = {
          keyword,
          country,
          state,
          lga,
          shopPlan,
          market,
          priceRange,
          features: selectedFeatures,
        };
        onFilterChangeRef.current(filters);
      }
    }, keyword ? 500 : 0); // 500ms debounce for keyword, immediate for others

    return () => clearTimeout(timeoutId);
  }, [
    keyword,
    country,
    state,
    lga,
    shopPlan,
    market,
    priceRange,
    selectedFeatures,
  ]);

  //**Get States from Country_ID data */
  const [statesloading, setStatesLoading] = useState(false);
  async function findStatesByCountry(countryId) {
    setStatesLoading(true);
    const stateResponseData = await getStateByCountryId(countryId);
    if (stateResponseData) {
      setAvailableStates(stateResponseData?.data?.states || []);
      setState("");
      setLga("");
      setStatesLoading(false);
      setTimeout(
        function () {
          setStatesLoading(false);
        }.bind(this),
        250
      );
    }
  }

  //**Get L.G.As from state_ID data */
  const [loading, setLoading] = useState(false);
  async function getLgasFromState(sid) {
    setLoading(true);
    const responseData = await getLgasByStateId(sid);

    if (responseData) {
      setAvailableLgas(responseData?.data?.lgas || []);
      setLga("");
      setLoading(false);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  // Handle feature toggle
  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setKeyword("");
    setCountry("");
    setState("");
    setLga("");
    setShopPlan("");
    setMarket("");
    setPriceRange([0, 1000000]);
    setSelectedFeatures([]);
  };

  // Format price display
  const formatPrice = (value) => {
    return `NGN ${value.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto lg:max-w-xs">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FilterListIcon className="text-orange-600" />
        <Typography variant="h6" className="font-semibold text-gray-900">
          Filter Products
        </Typography>
      </div>

      <div className="space-y-4">
        {/* Keyword Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: keyword && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setKeyword("")}>
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Location Section */}
        <Typography
          variant="subtitle2"
          className="font-medium text-gray-700 pt-2"
        >
          Location
        </Typography>

        {/* Country */}
        <FormControl fullWidth size="small">
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            value={country}
            label="Country"
            onChange={(e) => setCountry(e.target.value)}
          >
            <MenuItem value="">
              <em>All Countries</em>
            </MenuItem>
            {COUNTRIES?.data?.countries?.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* State */}
        <FormControl fullWidth size="small" disabled={!country}>
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            value={state}
            label="State"
            onChange={(e) => setState(e.target.value)}
          >
            <MenuItem value="">
              <em>All States</em>
            </MenuItem>
            {statesloading && <p className="text-[12px]">loading...</p>}
            {availableStates?.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* LGA */}
        <FormControl fullWidth size="small" disabled={!state}>
          <InputLabel id="lga-label">LGA</InputLabel>
          <Select
            labelId="lga-label"
            value={lga}
            label="LGA"
            onChange={(e) => setLga(e.target.value)}
          >
            <MenuItem value="">
              <em>All LGAs</em>
            </MenuItem>
            {loading && <p className="text-[12px]">loading...</p>}
            {availableLgas?.map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider className="my-4" />

        {/* Shop Plan */}
        <FormControl fullWidth size="small">
          <InputLabel id="shop-plan-label">Shop Plan</InputLabel>
          <Select
            labelId="shop-plan-label"
            value={shopPlan}
            label="Shop Plan"
            onChange={(e) => setShopPlan(e.target.value)}
          >
            <MenuItem value="">
              <em>All Plans</em>
            </MenuItem>
            {SHOP_PLANS.map((plan) => (
              <MenuItem key={plan} value={plan}>
                {plan}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Market Category */}
        <FormControl fullWidth size="small">
          <InputLabel id="market-label">Market</InputLabel>
          <Select
            labelId="market-label"
            value={market}
            label="Market"
            onChange={(e) => setMarket(e.target.value)}
          >
            <MenuItem value="">
              <em>All Markets</em>
            </MenuItem>
            {MARKETS.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Range */}
        <div className="pt-2">
          <Typography
            variant="subtitle2"
            className="font-medium text-gray-700 mb-2"
          >
            Price Range
          </Typography>
          <Box className="px-2">
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={0}
              max={1000000}
              step={1000}
              sx={{
                color: "#ea580c",
                "& .MuiSlider-thumb": {
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(234, 88, 12, 0.16)",
                  },
                },
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </Box>
        </div>

        <Divider className="my-4" />

        {/* Advanced Features */}
        <div>
          <button
            onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
            className="flex items-center justify-between w-full text-left text-orange-600 hover:text-orange-700 font-medium py-2"
          >
            <span className="text-sm">Advanced Features</span>
            {showAdvancedFeatures ? (
              <KeyboardArrowUp fontSize="small" />
            ) : (
              <KeyboardArrowDown fontSize="small" />
            )}
          </button>

          <Collapse in={showAdvancedFeatures}>
            <FormGroup className="max-h-64 overflow-y-auto mt-2 space-y-1">
              {PRODUCT_FEATURES.map((feature) => (
                <FormControlLabel
                  key={feature.id}
                  control={
                    <Checkbox
                      checked={selectedFeatures.includes(feature.id)}
                      onChange={() => handleFeatureToggle(feature.id)}
                      size="small"
                      sx={{
                        color: "#9ca3af",
                        "&.Mui-checked": {
                          color: "#ea580c",
                        },
                      }}
                    />
                  }
                  label={
                    <span className="text-sm text-gray-700">
                      {feature.icon} {feature.label}
                    </span>
                  }
                />
              ))}
            </FormGroup>
          </Collapse>
        </div>

        {/* Clear Filters Button */}
        <Button
          fullWidth
          variant="outlined"
          onClick={handleClearFilters}
          className="mt-6 border-orange-600 text-orange-600 hover:bg-orange-50 hover:border-orange-700"
          sx={{
            borderColor: "#ea580c",
            color: "#ea580c",
            "&:hover": {
              borderColor: "#c2410c",
              backgroundColor: "#ffedd5",
            },
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}

export default ProductFilter;
