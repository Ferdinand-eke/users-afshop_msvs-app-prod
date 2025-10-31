# Merchant Subdomain Implementation - Simplified Approach

## Overview

This implementation uses **Option 1: Merchant Subdomains ONLY for Profile Pages**.

### Key Concept
- **Merchant Profile Pages**: Accessed via subdomain (e.g., `cindy-fabrics.localhost:3000/merchant-profile`)
- **All Booking Flows**: Happen on main domain (e.g., `localhost:3000/bookings/listings/123`)

This keeps things simple and avoids authentication/localStorage issues across subdomains.

---

## How It Works

### 1. Viewing Merchant Profile
When users click "View Full Profile" on a property listing:

```javascript
// Button in MerchantProfile component
<Button onClick={() => navigateToMerchantSubdomain(merchantData?.slug, '/merchant-profile')}>
  View Full Profile
</Button>
```

**Result**: User is taken to `cindy-fabrics.localhost:3000/merchant-profile`

---

### 2. Returning to Main Site
From the merchant subdomain, all navigation goes BACK to main domain:

```javascript
// Buttons on MerchantHospitalityPage
<Button onClick={() => navigateToMainDomain('/')}>
  Back to AfricanShops
</Button>

<Button onClick={() => navigateToMainDomain('/bookings/listings')}>
  Browse All Properties
</Button>
```

**Result**: User returns to `localhost:3000/` or `localhost:3000/bookings/listings`

---

### 3. Booking Flow
**Always happens on main domain:**
- Browse properties: `localhost:3000/bookings/listings`
- View property details: `localhost:3000/bookings/listings/123`
- Complete booking: `localhost:3000/bookings/checkout`

**Benefits:**
- ✅ User stays logged in (no localStorage issues)
- ✅ No subdomain cascading (no `merchant2.merchant1.localhost` URLs)
- ✅ Simple and maintainable
- ✅ All authentication works seamlessly

---

## URL Structure

### Development
```
Main Domain:
- http://localhost:3000/                          → Homepage
- http://localhost:3000/bookings/listings         → Browse properties
- http://localhost:3000/bookings/listings/123     → Property details

Merchant Subdomains (Profile Only):
- http://cindy-fabrics.localhost:3000/merchant-profile           → Merchant profile
- http://cindy-fabrics.localhost:3000/merchant-profile/hospitality → Hospitality page
- http://reens-apartments.localhost:3000/merchant-profile        → Different merchant
```

### Production
```
Main Domain:
- https://africanshops.org/                       → Homepage
- https://africanshops.org/bookings/listings      → Browse properties

Merchant Subdomains (Profile Only):
- https://cindy-fabrics.africanshops.org/merchant-profile        → Merchant profile
- https://reens-apartments.africanshops.org/merchant-profile     → Different merchant
```

---

## Implementation Details

### Utility Functions

#### `getSubdomain()`
Detects if user is on a merchant subdomain:
```javascript
// Returns: 'cindy-fabrics' or null
const slug = getSubdomain();
```

**Handles:**
- `cindy-fabrics.localhost` → Returns `'cindy-fabrics'`
- `localhost` → Returns `null`
- `merchant.africanshops.org` → Returns `'merchant'`

#### `navigateToMerchantSubdomain(merchantSlug, path)`
Navigates to merchant subdomain:
```javascript
navigateToMerchantSubdomain('cindy-fabrics', '/merchant-profile');
// Takes user to: http://cindy-fabrics.localhost:3000/merchant-profile
```

**Smart handling:**
- If already on subdomain, creates correct URL
- Works from main domain or any subdomain
- No subdomain cascading

#### `navigateToMainDomain(path)`
Returns to main domain:
```javascript
navigateToMainDomain('/bookings/listings');
// From: http://cindy-fabrics.localhost:3000/merchant-profile
// To:   http://localhost:3000/bookings/listings
```

**Smart handling:**
- Strips subdomain completely
- Always returns to base domain
- Works from any subdomain level

---

## User Flow Example

1. **User on main site**: `localhost:3000/bookings/listings/123`
2. **Views merchant profile**: Clicks "View Full Profile"
   - Navigated to: `cindy-fabrics.localhost:3000/merchant-profile`
3. **Wants to browse more properties**: Clicks "Browse All Properties"
   - Navigated to: `localhost:3000/bookings/listings`
4. **Finds property from different merchant**: Views property
   - Still on: `localhost:3000/bookings/listings/456`
5. **Views this merchant's profile**: Clicks "View Full Profile"
   - Navigated to: `reens-apartments.localhost:3000/merchant-profile`
   - ✅ Clean subdomain (no cascading)
6. **Returns to main site**: Clicks "Back to AfricanShops"
   - Navigated to: `localhost:3000/`
   - ✅ User still logged in (same domain)

---

## Benefits of This Approach

### ✅ Authentication Works Seamlessly
- LocalStorage/cookies shared across main domain
- Users stay logged in when browsing
- No need for complex cross-domain auth

### ✅ No Subdomain Cascading
- `navigateToMainDomain()` always strips ALL subdomains
- Clean URLs every time
- No `merchant2.merchant1.localhost` issues

### ✅ Simple to Maintain
- Only 2 subdomain pages (profile + hospitality)
- All complex flows (booking, checkout, payments) on main domain
- Easy to debug and test

### ✅ Production Ready
- Requires simple wildcard DNS: `*.africanshops.org → your-server`
- Wildcard SSL certificate covers all merchant subdomains
- No complex infrastructure needed

---

## Files Modified

### Core Utilities
- `src/app/utils/subdomainUtils.js` - Subdomain detection and navigation

### Merchant Subdomain Pages
- `src/app/main/merchant-subdomain/MerchantSubdomainLayout.jsx` - Layout wrapper
- `src/app/main/merchant-subdomain/MerchantSubdomainConfig.jsx` - Routes config
- `src/app/main/merchant-subdomain/MerchantHospitalityPage.jsx` - Profile page
- `src/app/main/merchant-subdomain/MerchantNotFoundPage.jsx` - 404 page

### Integration Points
- `src/app/main/zrootclient/buz-bookings/bookingsSinglePage/shared-components/MerchantProfile.jsx` - Profile button

### Route Configuration
- `src/app/configs/routesConfig.jsx` - Added MerchantSubdomainConfig (line 204)

---

## Testing

### Test Subdomain Detection
1. Visit `http://localhost:3000/`
   - Should show main site (no subdomain)
2. Visit `http://cindy-fabrics.localhost:3000/merchant-profile`
   - Should show merchant profile page
3. Visit `http://invalid-merchant.localhost:3000/merchant-profile`
   - Should show "Merchant Not Found" page

### Test Navigation
1. From main domain, click "View Full Profile" on property
   - Should navigate to merchant subdomain
2. From merchant subdomain, click "Browse All Properties"
   - Should return to `localhost:3000/bookings/listings`
3. From merchant subdomain, click "Back to AfricanShops"
   - Should return to `localhost:3000/`

### Test Authentication
1. Login on main domain: `localhost:3000/sign-in`
2. Browse to property and view merchant profile
3. Return to main domain
4. **Expected**: User still logged in ✅

---

## Production Deployment

### DNS Configuration
Add wildcard DNS record:
```
*.africanshops.org  →  A  →  your-server-ip
```

### SSL Certificate
Get wildcard SSL certificate:
```
*.africanshops.org
```

This covers all merchant subdomains automatically.

### No Backend Changes Needed
All subdomain detection happens in the frontend. Backend API remains unchanged.

---

## Summary

**Merchant subdomains are for showcase/portfolio pages only.**

**All interactive flows (booking, checkout, payments, auth) happen on the main domain.**

This gives merchants a professional subdomain presence while keeping the implementation simple and maintainable.
