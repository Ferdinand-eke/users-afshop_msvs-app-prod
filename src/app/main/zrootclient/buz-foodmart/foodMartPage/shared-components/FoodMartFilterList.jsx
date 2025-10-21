import { useState, useEffect, useRef } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import {
  Search,
  Clear,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import useSellerCountries from "app/configs/data/server-calls/countries/useCountries";
import {
  getLgasByStateId,
  getStateByCountryId,
} from "app/configs/data/client/RepositoryClient";

/**
 * FoodMartFilterList Component
 * A comprehensive filter panel for food mart listings with cascading location filters,
 * price range, and search by title/slug/address
 */
function FoodMartFilterList({ onFilterChange, initialFilters = {} }) {
  const { data: COUNTRIES } = useSellerCountries();

  // Use ref to store the latest onFilterChange callback
  const onFilterChangeRef = useRef(onFilterChange);

  // Update ref when onFilterChange changes
  useEffect(() => {
    onFilterChangeRef.current = onFilterChange;
  }, [onFilterChange]);

  // Filter state
  const [keyword, setKeyword] = useState(initialFilters.keyword || "");
  const [title, setTitle] = useState(initialFilters.title || "");
  const [slug, setSlug] = useState(initialFilters.slug || "");
  const [address, setAddress] = useState(initialFilters.address || "");
  const [country, setCountry] = useState(initialFilters.country || "");
  const [state, setState] = useState(initialFilters.state || "");
  const [lga, setLga] = useState(initialFilters.lga || "");
  const [district, setDistrict] = useState(initialFilters.district || "");
  const [priceRange, setPriceRange] = useState(
    initialFilters.priceRange || [0, 100000]
  );

  // UI state
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

  // Emit filter changes to parent component with debounce for text inputs
  useEffect(() => {
    // Debounce text search to prevent excessive API calls
    const timeoutId = setTimeout(() => {
      if (onFilterChangeRef.current) {
        const filters = {
          keyword,
          title,
          slug,
          address,
          country,
          state,
          lga,
          district,
          priceRange,
        };
        onFilterChangeRef.current(filters);
      }
    }, keyword || title || slug || address ? 500 : 0); // 500ms debounce for text, immediate for others

    return () => clearTimeout(timeoutId);
  }, [
    keyword,
    title,
    slug,
    address,
    country,
    state,
    lga,
    district,
    priceRange,
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
      setDistrict("");
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
      setDistrict("");
      setLoading(false);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  // Clear all filters
  const handleClearFilters = () => {
    setKeyword("");
    setTitle("");
    setSlug("");
    setAddress("");
    setCountry("");
    setState("");
    setLga("");
    setDistrict("");
    setPriceRange([0, 100000]);
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
          Filter Food Marts
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

        {/* Title Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search by restaurant name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Restaurant Name"
          InputProps={{
            endAdornment: title && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setTitle("")}>
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Slug Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search by slug..."
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          label="Slug"
          InputProps={{
            endAdornment: slug && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSlug("")}>
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Address Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search by address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          label="Address"
          InputProps={{
            endAdornment: address && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setAddress("")}>
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Divider className="my-4" />

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

        {/* District */}
        <TextField
          fullWidth
          size="small"
          placeholder="Enter district..."
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          label="District"
          InputProps={{
            endAdornment: district && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setDistrict("")}>
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Divider className="my-4" />

        {/* Price Range */}
        <div className="pt-2">
          <Typography
            variant="subtitle2"
            className="font-medium text-gray-700 mb-2"
          >
            Price Range (Average Meal)
          </Typography>
          <Box className="px-2">
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={0}
              max={100000}
              step={500}
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

export default FoodMartFilterList;
