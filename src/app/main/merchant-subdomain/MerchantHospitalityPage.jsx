import React from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Home, Bed, Restaurant, Star } from '@mui/icons-material';
import { useGetMerchantPreview } from 'app/configs/data/server-calls/auth/userapp/a_merchants/useMerchantRepo';
import { navigateToMainDomain } from 'src/app/utils/subdomainUtils';
import MerchantNotFoundPage from './MerchantNotFoundPage';

/**
 * MerchantHospitalityPage
 * Main page for merchant subdomain showing all hospitality listings
 */
function MerchantHospitalityPage({ merchantSlug }) {
  // Fetch merchant data
  const {
    data: merchantData,
    isLoading: merchantLoading,
    isError: merchantError,
  } = useGetMerchantPreview(merchantSlug);

  console.log('MERCHANT__SUBDOMAIN__DATA', merchantData);

  // Loading state
  if (merchantLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 50%, #fef3e2 100%)',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Bed sx={{ fontSize: '4rem', color: '#ea580c' }} />
        </motion.div>
      </Box>
    );
  }

  // Error or merchant not found
  if (merchantError || !merchantData?.data?.merchant) {
    return <MerchantNotFoundPage attemptedSlug={merchantSlug} />;
  }

  const merchant = merchantData?.data?.merchant;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 50%, #fef3e2 100%)',
      }}
    >
      {/* Header/Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          padding: { xs: 4, md: 6 },
          color: 'white',
        }}
      >
        <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Back to Main Site Button */}
          <Button
            startIcon={<Home />}
            onClick={() => navigateToMainDomain('/')}
            sx={{
              color: 'white',
              marginBottom: 3,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Back to AfricanShops
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Avatar
                src={merchant?.avatar}
                alt={merchant?.shopname}
                sx={{
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                  border: '4px solid white',
                }}
              />

              <Box sx={{ flex: 1, minWidth: 300 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2rem', md: '3rem' },
                    marginBottom: 1,
                  }}
                >
                  {merchant?.shopname}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Star sx={{ fontSize: '1.5rem', color: '#fbbf24' }} />
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 700 }}>
                      {merchant?.rating || '4.5'}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '1rem', opacity: 0.9 }}>
                    ({merchant?.totalReviews || 0} reviews)
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    opacity: 0.95,
                    lineHeight: 1.6,
                    maxWidth: 600,
                  }}
                >
                  {merchant?.shopbio || 'Welcome to our hospitality services'}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: { xs: 3, md: 6 } }}>
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 3,
              marginBottom: 6,
            }}
          >
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                <Bed sx={{ fontSize: '3rem', color: '#ea580c', marginBottom: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#ea580c' }}>
                  {merchant?.totalProperties || 0}
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                  Properties
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                <Restaurant sx={{ fontSize: '3rem', color: '#10b981', marginBottom: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#10b981' }}>
                  {merchant?.responseRate || '95%'}
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                  Response Rate
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                <Star sx={{ fontSize: '3rem', color: '#fbbf24', marginBottom: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#fbbf24' }}>
                  {merchant?.rating || '4.5'}
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                  Average Rating
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card
            sx={{
              padding: { xs: 4, md: 6 },
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #fff5f0 100%)',
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#111827',
                marginBottom: 2,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Property Listings Coming Soon
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#6b7280',
                marginBottom: 4,
                fontSize: '1.125rem',
                maxWidth: 600,
                margin: '0 auto 32px',
              }}
            >
              We're currently setting up this merchant's property portfolio. Check back soon to see
              their amazing listings!
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigateToMainDomain('/bookings/listings')}
                sx={{
                  backgroundColor: '#ea580c',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#c2410c',
                  },
                }}
              >
                Browse All Properties
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigateToMainDomain('/')}
                sx={{
                  color: '#ea580c',
                  borderColor: '#ea580c',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  textTransform: 'none',
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    backgroundColor: 'rgba(234, 88, 12, 0.05)',
                  },
                }}
              >
                Go to Homepage
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
}

export default MerchantHospitalityPage;
