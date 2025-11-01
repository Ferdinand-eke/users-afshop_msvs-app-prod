# Subdomain Routing - DISABLED FOR VERCEL STAGING

## Overview
The subdomain routing feature has been temporarily disabled to allow the app to work correctly on Vercel staging deployment. Vercel's subdomain structure was being detected as a merchant subdomain, breaking the normal routing.

## What Was Disabled

### 1. Subdomain Detection (`src/app/utils/subdomainUtils.js`)
The `isSubdomainRoute()` function now always returns `false`:
```javascript
export const isSubdomainRoute = () => {
  // return getSubdomain() !== null;
  return false; // DISABLED - Always return false to disable subdomain routing
};
```

### 2. Route Configuration (`src/app/configs/routesConfig.jsx`)
- Set `onMerchantSubdomain` constant to `false`
- Commented out merchant subdomain route generation
- Made homepage route always active (not conditional)

**Changed lines:**
- Line 70: `const onMerchantSubdomain = false;`
- Lines 222-230: Merchant subdomain routes commented out
- Lines 237-245: Homepage route no longer conditional

## How to Re-enable Subdomain Routing

When you're ready to use subdomain routing again (in production with proper domain setup):

### Step 1: Enable in `subdomainUtils.js`
```javascript
export const isSubdomainRoute = () => {
  return getSubdomain() !== null; // UNCOMMENT THIS LINE
  // return false; // COMMENT OUT THIS LINE
};
```

### Step 2: Enable in `routesConfig.jsx`
```javascript
// Line 70 - Uncomment this line:
const onMerchantSubdomain = isSubdomainRoute();
// Line 70 - Comment out this line:
// const onMerchantSubdomain = false;

// Lines 222-230 - Uncomment this block:
...(onMerchantSubdomain
  ? FuseUtils.generateRoutesFromConfigs(
      [MerchantSubdomainConfig],
      null
    )
  : []),

// Lines 237-245 - Restore conditional homepage:
...(!onMerchantSubdomain
  ? [
      {
        path: "/",
        element: <ModernLandingPage />,
      },
    ]
  : []),
```

## Current Behavior (Disabled State)
- ✅ All routes work normally on any domain/subdomain
- ✅ Homepage (`/`) always shows `ModernLandingPage`
- ✅ No subdomain detection or routing
- ✅ App works correctly on Vercel staging with their subdomain structure
- ❌ Merchant subdomain profiles are not accessible

## When to Re-enable
Re-enable subdomain routing when:
1. You have a proper custom domain setup (not Vercel's default domain)
2. You want to support merchant-specific subdomains (e.g., `merchant-name.yourdomain.com`)
3. You're deploying to production with DNS properly configured

## Files Modified
1. `/src/app/utils/subdomainUtils.js` - Disabled subdomain detection
2. `/src/app/configs/routesConfig.jsx` - Disabled conditional routing

## Testing
To test that everything works:
1. Navigate to `/` - Should show landing page
2. Navigate to `/sign-in` - Should show sign-in page
3. Navigate to `/sign-up` - Should show sign-up page
4. Navigate to `/bookings/listings` - Should show bookings page
5. Navigate to `/marketplace/shop` - Should show marketplace

All routes should work normally without any subdomain-related errors.
