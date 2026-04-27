# Subdomain Routing Setup Guide

## Overview

This guide explains how to integrate the new merchant subdomain routing system into your existing AfricanShops application. The subdomain routing allows merchants to have their own branded subdomains (e.g., `merchant-name.localhost:3000` or `merchant-name.africanshops.org`).

## What Was Created

### 1. **Utility Functions** (`src/app/utils/subdomainUtils.js`)

- `getSubdomain()` - Extract subdomain from current URL
- `isSubdomainRoute()` - Check if user is on a subdomain
- `getMerchantSubdomainUrl(slug, path)` - Generate merchant subdomain URL
- `navigateToMerchantSubdomain(slug, path)` - Navigate to merchant subdomain
- `navigateToMainDomain(path)` - Navigate back to main domain

### 2. **Components**

- `MerchantSubdomainRoutes.jsx` - Router for subdomain pages
- `MerchantHospitalityPage.jsx` - Main merchant profile page
- `MerchantNotFoundPage.jsx` - 404 page for invalid merchants

### 3. **Updated Components**

- `MerchantProfile.jsx` - "View Full Profile" button now redirects to subdomain

## Integration Steps

### Step 1: Update Your Main App Router

You need to add subdomain detection to your main App.jsx or wherever your routes are defined.

**Location:** `src/app/App.jsx` (or your main routing file)

```javascript
import { isSubdomainRoute } from "src/app/utils/subdomainUtils";
import MerchantSubdomainRoutes from "src/app/main/merchant-subdomain/MerchantSubdomainRoutes";

function App() {
  // Detect if we're on a merchant subdomain
  const isOnMerchantSubdomain = isSubdomainRoute();

  return (
    <BrowserRouter>
      {/* Your existing providers */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {/* ... other providers ... */}

          {isOnMerchantSubdomain ? (
            // Render merchant subdomain routes
            <MerchantSubdomainRoutes />
          ) : (
            // Render your existing routes
            <Routes>
              {/* Your existing routes remain unchanged */}
              <Route path="/" element={<HomePage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              {/* ... all your other routes ... */}
            </Routes>
          )}
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}
```

### Alternative: Conditional Routing Wrapper

If you prefer a cleaner approach, create a routing wrapper:

```javascript
// src/app/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { isSubdomainRoute } from "src/app/utils/subdomainUtils";
import MerchantSubdomainRoutes from "src/app/main/merchant-subdomain/MerchantSubdomainRoutes";
import YourExistingRoutes from "./YourExistingRoutes";

function AppRoutes() {
  if (isSubdomainRoute()) {
    return <MerchantSubdomainRoutes />;
  }

  return <YourExistingRoutes />;
}

export default AppRoutes;
```

Then in App.jsx:

```javascript
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}
```

## Testing Locally

### 1. **Test Subdomain Detection**

Open your browser console and test the utility functions:

```javascript
// On localhost:3000
getSubdomain(); // Returns null

// On merchant-name.localhost:3000
getSubdomain(); // Returns "merchant-name"
```

### 2. **Test Navigation**

1. Go to any property booking page
2. Click "View Full Profile" button
3. You should be redirected to: `http://{merchant-slug}.localhost:3000/hospitality`

### 3. **Test Merchant Not Found**

1. Navigate to: `http://invalid-merchant.localhost:3000`
2. You should see the "Merchant Not Found" page

### 4. **Test Valid Merchant**

1. Find a valid merchant slug from your database
2. Navigate to: `http://{valid-merchant-slug}.localhost:3000`
3. You should see the merchant's hospitality page with their info

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│  User clicks "View Full Profile"                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  navigateToMerchantSubdomain(merchantSlug, '/hospitality')  │
│  Generates: http://merchant-slug.localhost:3000/hospitality │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Browser navigates to subdomain                              │
│  App reloads on new subdomain                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  isSubdomainRoute() detects subdomain                        │
│  Returns true                                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  MerchantSubdomainRoutes component renders                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  getSubdomain() extracts merchant slug                       │
│  Returns: "merchant-slug"                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  MerchantHospitalityPage renders                             │
│  Fetches merchant data using slug                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Display merchant profile with stats and info                │
└─────────────────────────────────────────────────────────────┘
```

## Production Deployment

### DNS Configuration

For production (`africanshops.org`), you'll need to configure DNS:

1. **Add Wildcard DNS Record:**

   ```
   Type: A
   Host: *
   Value: [Your Server IP]
   TTL: 3600
   ```

   Or if using a service like Cloudflare:

   ```
   Type: CNAME
   Name: *
   Target: africanshops.org
   ```

2. **This allows:**
   - `merchant1.africanshops.org` → Your server
   - `merchant2.africanshops.org` → Your server
   - `any-merchant.africanshops.org` → Your server

### Environment Variables

Update your `.env` file:

```bash
# Development
REACT_APP_BASE_DOMAIN=localhost

# Production
REACT_APP_BASE_DOMAIN=africanshops.org
```

## Future Enhancements

You can add more pages to the merchant subdomain by updating `MerchantSubdomainRoutes.jsx`:

```javascript
// Uncomment and create these components as needed:
<Route path="/products" element={<MerchantProductsPage merchantSlug={merchantSlug} />} />
<Route path="/about" element={<MerchantAboutPage merchantSlug={merchantSlug} />} />
<Route path="/contact" element={<MerchantContactPage merchantSlug={merchantSlug} />} />
<Route path="/reviews" element={<MerchantReviewsPage merchantSlug={merchantSlug} />} />
```

Example URLs:

- `http://african-foods.africanshops.org/hospitality` - Hospitality listings
- `http://african-foods.africanshops.org/products` - Products
- `http://african-foods.africanshops.org/about` - About page
- `http://african-foods.africanshops.org/contact` - Contact page

## Troubleshooting

### Issue: Subdomain not detected

**Solution:** Check browser console:

```javascript
console.log(window.location.hostname); // Should show "merchant.localhost"
console.log(getSubdomain()); // Should return "merchant"
```

### Issue: Merchant not found even with valid slug

**Solution:**

1. Check if merchant API is returning data
2. Check browser console for API errors
3. Verify merchant slug matches exactly

### Issue: Infinite redirects

**Solution:** Ensure you're not calling navigation functions inside render loops

### Issue: Works on localhost but not production

**Solution:**

1. Verify DNS wildcard record is configured
2. Check REACT_APP_BASE_DOMAIN environment variable
3. Ensure SSL certificate covers wildcard subdomain (\*.africanshops.org)

## Summary

✅ **Created:**

- Subdomain detection utilities
- Merchant subdomain routes
- Merchant hospitality page
- Merchant not found page

✅ **Updated:**

- MerchantProfile button to use subdomain navigation

🔲 **TODO:**

- Integrate routing wrapper in your main App.jsx
- Test with real merchant data
- Configure production DNS when ready

**No existing routes were modified - all changes are additive!**
