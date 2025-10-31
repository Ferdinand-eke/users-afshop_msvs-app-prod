import { Button, Typography, Box } from '@mui/material';
import { StorefrontOutlined, Home } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { navigateToMainDomain } from 'src/app/utils/subdomainUtils';

/**
 * MerchantNotFoundPage
 * Displayed when a subdomain doesn't match any existing merchant
 */
function MerchantNotFoundPage({ attemptedSlug }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 50%, #fef3e2 100%)',
        padding: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            maxWidth: 600,
            textAlign: 'center',
            padding: { xs: 4, md: 6 },
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StorefrontOutlined sx={{ fontSize: '4rem', color: 'white' }} />
            </Box>
          </motion.div>

          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#111827',
              marginBottom: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            Merchant Not Found....
          </Typography>

          {/* Message */}
          <Typography
            variant="body1"
            sx={{
              color: '#6b7280',
              marginBottom: 1,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.7,
            }}
          >
            We couldn't find a merchant with the identifier:
          </Typography>

          {/* Attempted Slug */}
          <Box
            sx={{
              padding: '12px 24px',
              backgroundColor: '#fef3e2',
              borderRadius: '12px',
              marginBottom: 3,
              border: '2px solid #fed7aa',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#ea580c',
              }}
            >
              {attemptedSlug}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              marginBottom: 4,
              fontSize: { xs: '0.9375rem', md: '1rem' },
            }}
          >
            This merchant may not exist, or the link might be incorrect.
            <br />
            Please check the URL and try again.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Home />}
              onClick={() => navigateToMainDomain('/')}
              sx={{
                backgroundColor: '#ea580c',
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '12px 32px',
                borderRadius: '12px',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
                '&:hover': {
                  backgroundColor: '#c2410c',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(234, 88, 12, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Go to Homepage
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigateToMainDomain('/bookings')}
              sx={{
                color: '#ea580c',
                borderColor: '#ea580c',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '12px 32px',
                borderRadius: '12px',
                textTransform: 'none',
                borderWidth: '2px',
                '&:hover': {
                  borderColor: '#c2410c',
                  backgroundColor: 'rgba(234, 88, 12, 0.05)',
                  borderWidth: '2px',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Browse All Properties
            </Button>
          </Box>

          {/* Help Text */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              marginTop: 4,
              color: '#9ca3af',
              fontSize: '0.875rem',
            }}
          >
            Need help? Contact our support team
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}

export default MerchantNotFoundPage;
