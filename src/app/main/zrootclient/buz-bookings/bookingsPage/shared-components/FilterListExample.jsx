import { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import FilterList from './FilterList';
import BookingCard from './BookingCard';

/**
 * FilterListExample Component
 * Demonstrates how to integrate the FilterList component with property listings
 */
function FilterListExample() {
  const [filters, setFilters] = useState({});
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Mock property data
  const mockProperties = [
    {
      id: 1,
      slug: 'luxury-villa-lekki',
      title: 'Luxury Villa in Lekki Phase 1',
      address: 'Lekki Phase 1, Lagos, Nigeria',
      price: 350,
      roomCount: 4,
      bathroomCount: 3,
      propertyType: 'Villa',
      country: 'NG',
      state: 'lagos',
      lga: 'lekki',
      district: 'phase-1',
      amenities: ['wifi', 'air-conditioning', 'swimming-pool', 'washer'],
      rating: 4.8,
      reviewCount: 24,
      images: [
        { url: 'https://via.placeholder.com/400x300?text=Villa+Image+1' },
        { url: 'https://via.placeholder.com/400x300?text=Villa+Image+2' }
      ]
    },
    {
      id: 2,
      slug: 'modern-apartment-victoria-island',
      title: 'Modern Apartment with Sea View',
      address: 'Victoria Island, Lagos, Nigeria',
      price: 250,
      roomCount: 3,
      bathroomCount: 2,
      propertyType: 'Apartment',
      country: 'NG',
      state: 'lagos',
      lga: 'victoria-island',
      district: 'oniru',
      amenities: ['wifi', 'air-conditioning', 'tv-cable', 'dryer'],
      rating: 4.5,
      reviewCount: 18,
      images: [
        { url: 'https://via.placeholder.com/400x300?text=Apartment+Image+1' }
      ]
    },
    {
      id: 3,
      slug: 'cozy-guesthouse-ikeja',
      title: 'Cozy Guesthouse in Ikeja GRA',
      address: 'Ikeja GRA, Lagos, Nigeria',
      price: 120,
      roomCount: 2,
      bathroomCount: 1,
      propertyType: 'Guesthouse',
      country: 'NG',
      state: 'lagos',
      lga: 'ikeja',
      district: 'ikeja-gra',
      amenities: ['wifi', 'air-conditioning', 'laundry'],
      rating: 4.2,
      reviewCount: 12,
      images: [
        { url: 'https://via.placeholder.com/400x300?text=Guesthouse+Image+1' }
      ]
    }
  ];

  // Filter properties based on selected filters
  const applyFilters = (properties, filterCriteria) => {
    return properties.filter((property) => {
      // Keyword search
      if (filterCriteria.keyword) {
        const keyword = filterCriteria.keyword.toLowerCase();
        const matchesKeyword =
          property.title.toLowerCase().includes(keyword) ||
          property.address.toLowerCase().includes(keyword);
        if (!matchesKeyword) return false;
      }

      // Property type
      if (filterCriteria.propertyType && property.propertyType !== filterCriteria.propertyType) {
        return false;
      }

      // Country
      if (filterCriteria.country && property.country !== filterCriteria.country) {
        return false;
      }

      // State
      if (filterCriteria.state && property.state !== filterCriteria.state) {
        return false;
      }

      // LGA
      if (filterCriteria.lga && property.lga !== filterCriteria.lga) {
        return false;
      }

      // District
      if (filterCriteria.district && property.district !== filterCriteria.district) {
        return false;
      }

      // Price range
      if (filterCriteria.priceRange) {
        const [minPrice, maxPrice] = filterCriteria.priceRange;
        if (property.price < minPrice || property.price > maxPrice) {
          return false;
        }
      }

      // Room count
      if (filterCriteria.roomCount) {
        const roomCount =
          filterCriteria.roomCount === '6+' ? 6 : parseInt(filterCriteria.roomCount, 10);
        if (filterCriteria.roomCount === '6+') {
          if (property.roomCount < roomCount) return false;
        } else if (property.roomCount !== roomCount) {
          return false;
        }
      }

      // Bathroom count
      if (filterCriteria.bathroomCount) {
        const bathroomCount =
          filterCriteria.bathroomCount === '5+' ? 5 : parseInt(filterCriteria.bathroomCount, 10);
        if (filterCriteria.bathroomCount === '5+') {
          if (property.bathroomCount < bathroomCount) return false;
        } else if (property.bathroomCount !== bathroomCount) {
          return false;
        }
      }

      // Amenities (property must have all selected amenities)
      if (filterCriteria.amenities && filterCriteria.amenities.length > 0) {
        const hasAllAmenities = filterCriteria.amenities.every((amenity) =>
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = applyFilters(mockProperties, newFilters);
    setFilteredProperties(filtered);
  };

  // Initialize with all properties
  const displayProperties = filteredProperties.length > 0 || Object.keys(filters).some(key => filters[key] && (Array.isArray(filters[key]) ? filters[key].length > 0 : true))
    ? filteredProperties
    : mockProperties;

  return (
    <Box className="min-h-screen bg-gray-50 p-6">
      <Typography variant="h4" className="mb-6 font-bold text-gray-900">
        Property Listings
      </Typography>

      <Grid container spacing={3}>
        {/* Filter Sidebar */}
        <Grid item xs={12} lg={3}>
          <div className="sticky top-6">
            <FilterList onFilterChange={handleFilterChange} />
          </div>
        </Grid>

        {/* Property Listings */}
        <Grid item xs={12} lg={9}>
          <div className="mb-4">
            <Typography variant="body1" className="text-gray-600">
              {displayProperties.length} {displayProperties.length === 1 ? 'property' : 'properties'} found
            </Typography>
          </div>

          {displayProperties.length > 0 ? (
            <Grid container spacing={3}>
              {displayProperties.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property.id}>
                  <BookingCard
                    id={property.id}
                    slug={property.slug}
                    images={property.images}
                    title={property.title}
                    address={property.address}
                    price={property.price}
                    roomCount={property.roomCount}
                    rating={property.rating}
                    reviewCount={property.reviewCount}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box className="text-center py-16">
              <Typography variant="h6" className="text-gray-500 mb-2">
                No properties found
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Try adjusting your filters to see more results
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default FilterListExample;
