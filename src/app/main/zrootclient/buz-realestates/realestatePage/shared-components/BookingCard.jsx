import { useState } from 'react';
import { Typography, IconButton, Button } from '@mui/material';
import { FavoriteBorder, Favorite, NavigateBefore, NavigateNext } from '@mui/icons-material';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { formatCurrency } from 'src/app/main/vendors-shop/PosUtils';

/**
 * BookingCard Component
 * Displays hotel/apartment listing with image slider
 */
function BookingCard({
  id,
  slug,
  images = [],
  title,
  address,
  price,
  roomCount,
  rating = 0,
  reviewCount = 0,
  duration = '3 - 8 hours',
  host = 'Captain',
  leaseTerm
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Star rating component
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-black">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-black">⯨</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm">
      {/* Image Slider Section */}
      <div className="relative group">
        <div className="relative h-160 overflow-hidden">
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]?.url || images[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full transition ease-in-out delay-150  hover:scale-105 object-cover"
              // height={384}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center px-4 py-2">
              <Typography color="text.secondary">No image available</Typography>
            </div>
          )}

          {/* Favorite Button */}
          <IconButton
            onClick={toggleFavorite}
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            size="small"
          >
            {isFavorite ? (
              <Favorite className="text-red-500" />
            ) : (
              <FavoriteBorder className="text-gray-700" />
            )}
          </IconButton>

          {/* Image Navigation Arrows */}
          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                size="small"
              >
                <NavigateBefore />
              </IconButton>

              <IconButton
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                size="small"
              >
                <NavigateNext />
              </IconButton>

              {/* Image Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-6 h-6 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10">
        {/* Duration and Host */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>{duration}</span>
          <span>•</span>
          <span>{host}</span>
        </div>

        {/* Title */}
        <Typography
          variant="h6"
          className="font-semibold text-[14px] text-gray-900 mb-1 line-clamp-2 min-h-[3.5rem]"
        >
          {title}
        </Typography>

        {/* Address */}
        <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-1">
          {address}
        </Typography>

        {/* Price and Rating Row */}
        <div className="flex justify-between mb-4">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <Typography variant="h6" className="font-bold text-[13px] text-gray-900">
              NGN {formatCurrency(price)}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              /{leaseTerm}
            </Typography>
          </div>
          

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-xs">
              {renderStars()}
            </div>
            <Typography variant="body2" className="text-gray-600 text-sm">
              ({reviewCount.toString().padStart(2, '0')})
            </Typography>
          </div>
        </div>

        {/* Room Count */}
        {roomCount && (
          <Typography variant="body2" className="text-gray-600 mb-4">
            <i className="fas fa-door-open mr-2"></i>
            {roomCount} {roomCount === 1 ? 'Room' : 'Rooms'}
          </Typography>
        )}

        {/* View More Button */}
        <Button
         size="small"
          component={NavLinkAdapter}
          to={`/realestate/listings/${slug}/view`}
          fullWidth
          className="bg-orange-600 hover:bg-orange-800 text-white font-medium py-1.5 rounded-lg transition-colors duration-200"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

export default BookingCard;
