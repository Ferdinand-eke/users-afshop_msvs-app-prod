import { lazy } from 'react';
import MerchantSubdomainLayout from './MerchantSubdomainLayout';
import MerchantHospitalityPage from './MerchantHospitalityPage';

// Lazy load future page components when needed
// const MerchantProductsPage = lazy(() => import('./MerchantProductsPage'));
// const MerchantAboutPage = lazy(() => import('./MerchantAboutPage'));
// const MerchantContactPage = lazy(() => import('./MerchantContactPage'));

/**
 * Merchant Subdomain Routes Configuration
 *
 * PREMIUM FEATURE: Complete merchant subdomain experience
 * Merchants can have their entire site (profile, bookings, etc.) on their own subdomain
 *
 * This is currently available but not actively promoted.
 * Will be marketed as a paid premium feature later.
 */
const MerchantSubdomainConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: true, // Show toolbar so merchants can navigate
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    // Root - Merchant Profile/Homepage
    // On main domain: Shows normal homepage
    // On merchant subdomain: Shows merchant profile
    {
      path: '/',
      element: <MerchantSubdomainLayout PageComponent={MerchantHospitalityPage} />,
    },

    // Merchant Profile (explicit path)
    {
      path: '/profile',
      element: <MerchantSubdomainLayout PageComponent={MerchantHospitalityPage} />,
    },

    // Future: Add more merchant-specific routes here
    // These will all be branded with the merchant's subdomain
    // {
    //   path: '/products',
    //   element: <MerchantSubdomainLayout PageComponent={MerchantProductsPage} />,
    // },
    // {
    //   path: '/about',
    //   element: <MerchantSubdomainLayout PageComponent={MerchantAboutPage} />,
    // },
    // {
    //   path: '/contact',
    //   element: <MerchantSubdomainLayout PageComponent={MerchantContactPage} />,
    // },
  ],
};

export default MerchantSubdomainConfig;
