# How to Add New Merchant Subdomain Pages

## Overview

The new `MerchantSubdomainLayout` component makes it super easy to add new pages for merchant subdomains. Each page automatically gets the merchant slug detected and passed as a prop.

---

## Current Structure

```
src/app/main/merchant-subdomain/
├── MerchantSubdomainLayout.jsx       ✅ Wrapper (detects subdomain)
├── MerchantSubdomainConfig.jsx       ✅ Routes configuration
├── MerchantHospitalityPage.jsx       ✅ Hospitality page (current)
├── MerchantNotFoundPage.jsx          ✅ 404 page
└── MerchantSubdomainWrapper.jsx      ⚠️  Legacy (can be deleted)
```


---

## How It Works

### **MerchantSubdomainLayout (The Magic Wrapper)**

```javascript
// This component:
// 1. Detects subdomain at runtime
// 2. Shows loading state
// 3. Shows 404 if no subdomain
// 4. Passes merchantSlug to your PageComponent

<MerchantSubdomainLayout PageComponent={YourPage} />
```

### **Benefits:**

✅ **No manual subdomain detection** - Layout handles it
✅ **Consistent loading states** - Automatic spinner
✅ **Consistent error handling** - Auto 404 page
✅ **Easy to add new pages** - Just 3 steps!

---

## Adding a New Page (Example: Products)

### **Step 1: Create Page Component**

**File:** `src/app/main/merchant-subdomain/MerchantProductsPage.jsx`

```javascript
import React from "react";
import { Box, Typography, Card, Grid } from "@mui/material";
import { useGetMerchantPreview } from "app/configs/data/server-calls/auth/userapp/a_merchants/useMerchantRepo";
import { navigateToMainDomain } from "src/app/utils/subdomainUtils";
import { motion } from "framer-motion";

function MerchantProductsPage({ merchantSlug }) {
  // Fetch merchant data
  const { data: merchantData, isLoading } = useGetMerchantPreview(merchantSlug);

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center min-h-screen">
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  const merchant = merchantData?.data?.merchant;

  return (
    <Box sx={{ minHeight: "100vh", background: "#fafaf9", padding: 4 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
          {merchant?.shopname} - Products
        </Typography>
        <Typography variant="body1" sx={{ color: "#6b7280", mb: 4 }}>
          Browse our collection of products
        </Typography>
      </motion.div>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {/* Your products content here */}
        <Grid item xs={12}>
          <Card sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Products Coming Soon
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back later for our product catalog
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Back Button */}
      <Box sx={{ mt: 4 }}>
        <button
          onClick={() => navigateToMainDomain("/")}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Back to Main Site
        </button>
      </Box>
    </Box>
  );
}

export default MerchantProductsPage;
```

### **Step 2: Add Route to Config**

**File:** `src/app/main/merchant-subdomain/MerchantSubdomainConfig.jsx`

```javascript
import { lazy } from "react";
import MerchantSubdomainLayout from "./MerchantSubdomainLayout";
import MerchantHospitalityPage from "./MerchantHospitalityPage";
import MerchantProductsPage from "./MerchantProductsPage"; // ✅ Import your page

const MerchantSubdomainConfig = {
  settings: {
    /* ... */
  },
  routes: [
    {
      path: "/merchant-profile",
      element: <MerchantSubdomainLayout PageComponent={MerchantHospitalityPage} />,
    },
    {
      path: "/merchant-profile/hospitality",
      element: <MerchantSubdomainLayout PageComponent={MerchantHospitalityPage} />,
    },
    {
      path: "/merchant-profile/products", // ✅ Add your route
      element: <MerchantSubdomainLayout PageComponent={MerchantProductsPage} />,
    },
  ],
};

export default MerchantSubdomainConfig;
```

### **Step 3: Test It!**

Navigate to:

```
http://cindy-fabrics.localhost:3000/merchant-profile/products
```

**Expected:**

- ✅ Subdomain detected automatically
- ✅ Merchant data loaded
- ✅ Products page renders
- ✅ No extra code needed!

---

## Adding More Pages

### **About Page**

**Create:** `MerchantAboutPage.jsx`

```javascript
function MerchantAboutPage({ merchantSlug }) {
  const { data: merchantData } = useGetMerchantPreview(merchantSlug);
  const merchant = merchantData?.data?.merchant;

  return (
    <div>
      <h1>About {merchant?.shopname}</h1>
      <p>{merchant?.shopbio}</p>
    </div>
  );
}
```

**Add Route:**

```javascript
{
  path: '/merchant-profile/about',
  element: <MerchantSubdomainLayout PageComponent={MerchantAboutPage} />,
}
```

**Test:**

```
http://cindy-fabrics.localhost:3000/merchant-profile/about
```

---

### **Contact Page**

**Create:** `MerchantContactPage.jsx`

```javascript
function MerchantContactPage({ merchantSlug }) {
  const { data: merchantData } = useGetMerchantPreview(merchantSlug);
  const merchant = merchantData?.data?.merchant;

  return (
    <div>
      <h1>Contact {merchant?.shopname}</h1>
      <p>Phone: {merchant?.shopphone}</p>
      <p>Address: {merchant?.address}</p>
    </div>
  );
}
```

**Add Route:**

```javascript
{
  path: '/merchant-profile/contact',
  element: <MerchantSubdomainLayout PageComponent={MerchantContactPage} />,
}
```

**Test:**

```
http://cindy-fabrics.localhost:3000/merchant-profile/contact
```

---

## URL Structure

### **Pattern:**

```
http://[merchant-slug].localhost:3000/merchant-profile/[page-name]
```

### **Examples:**

```
http://cindy-fabrics.localhost:3000/merchant-profile                → Hospitality
http://cindy-fabrics.localhost:3000/merchant-profile/hospitality    → Hospitality
http://cindy-fabrics.localhost:3000/merchant-profile/products       → Products
http://cindy-fabrics.localhost:3000/merchant-profile/about          → About
http://cindy-fabrics.localhost:3000/merchant-profile/contact        → Contact
http://cindy-fabrics.localhost:3000/merchant-profile/reviews        → Reviews
```

---

## Navigation Between Pages

### **Within Merchant Subdomain:**

```javascript
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/merchant-profile/products")}>View Products</button>
      <button onClick={() => navigate("/merchant-profile/about")}>About Us</button>
      <button onClick={() => navigate("/merchant-profile/contact")}>Contact</button>
    </div>
  );
}
```

### **Back to Main Site:**

```javascript
import { navigateToMainDomain } from 'src/app/utils/subdomainUtils';

<button onClick={() => navigateToMainDomain('/')}>
  Back to Homepage
</button>

<button onClick={() => navigateToMainDomain('/bookings')}>
  Browse All Properties
</button>
```

---

## Creating a Merchant Navigation Menu

### **Example:** `MerchantNav.jsx`

```javascript
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

function MerchantNav() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/merchant-profile" },
    { label: "Properties", path: "/merchant-profile/hospitality" },
    { label: "Products", path: "/merchant-profile/products" },
    { label: "About", path: "/merchant-profile/about" },
    { label: "Contact", path: "/merchant-profile/contact" },
  ];

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      {navItems.map((item) => (
        <Button
          key={item.path}
          onClick={() => navigate(item.path)}
          sx={{ color: "#ea580c", fontWeight: 600 }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}

export default MerchantNav;
```

**Use in any page:**

```javascript
function MerchantProductsPage({ merchantSlug }) {
  return (
    <div>
      <MerchantNav /> {/* ✅ Navigation menu */}
      {/* Your page content */}
    </div>
  );
}
```

---

## Summary

### **To Add a New Page:**

1. ✅ Create page component (gets `merchantSlug` prop automatically)
2. ✅ Import in `MerchantSubdomainConfig.jsx`
3. ✅ Add route with `<MerchantSubdomainLayout PageComponent={YourPage} />`
4. ✅ Test at `http://[merchant-slug].localhost:3000/merchant-profile/[your-page]`

### **Benefits:**

- ✅ No manual subdomain detection needed
- ✅ Automatic loading states
- ✅ Automatic 404 handling
- ✅ Consistent merchant data access
- ✅ Easy navigation between pages
- ✅ Scalable architecture

**That's it! Adding new pages is now super simple!** 🚀
