---
  Questions Before Implementation:

  1. Do you want ALL merchant pages on subdomains? : "Option A"
    - Option A: Only profile pages (hospitality, products, etc.)
    - Option B: Everything merchant-related
    - Option C: Keep booking pages on main domain, only merchant profiles on subdomain
  2. What should happen when no merchant exists? :  "show merchant not found page"
    - Redirect to main site?
    - Show 404 page?
    - Show "merchant not found" page?
  3. Should merchants have multiple pages under subdomain? : yes.
  african-foods.localhost:3000/hospitality
  african-foods.localhost:3000/products
  african-foods.localhost:3000/about
  african-foods.localhost:3000/contact
  4. Production domain?
    - What's your production domain? (e.g., africanshops.com)
    - This will help configure the base domain properly

  ---