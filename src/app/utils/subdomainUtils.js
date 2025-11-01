/**
 * Subdomain Utility Functions
 * Handles subdomain detection and URL generation for merchant profiles
 */

/**
 * Extract subdomain from current hostname
 * @returns {string|null} - Subdomain or null if not present
 */
export const getSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // Handle localhost development
  // Check for patterns like: cindy-fabrics.localhost or merchant.localhost
  if (hostname.endsWith('.localhost') || hostname.endsWith('.127.0.0.1')) {
    // Has subdomain if more than 1 part and first part is not 'localhost'
    if (parts.length > 1 && parts[0] !== 'localhost') {
      return parts[0];
    }
    return null;
  }

  // Handle plain localhost or 127.0.0.1 without subdomain
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return null;
  }

  // Production domain handling
  // Need at least 3 parts for subdomain (subdomain.domain.tld)
  // e.g., african-foods.africanshops.org
  if (parts.length < 3) {
    return null;
  }

  // Return first part as subdomain
  return parts[0];
};

/**
 * Check if current route is a subdomain route
 * @returns {boolean}
 *
 * DISABLED FOR VERCEL STAGING DEPLOYMENT
 * Uncomment the line below to re-enable subdomain routing
 */
export const isSubdomainRoute = () => {
  // return getSubdomain() !== null;
  return false; // DISABLED - Always return false to disable subdomain routing
};

/**
 * Generate merchant subdomain URL
 * @param {string} merchantSlug - Merchant's slug identifier
 * @param {string} path - Path to navigate to (default: '/hospitality')
 * @returns {string} - Complete subdomain URL
 */
export const getMerchantSubdomainUrl = (merchantSlug, path = '/hospitality') => {
  const protocol = window.location.protocol; // http: or https:
  const port = window.location.port ? `:${window.location.port}` : '';

  // Determine base domain
  let baseDomain;
  const hostname = window.location.hostname;

  // Handle localhost development
  if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
    baseDomain = 'localhost';
  } else if (hostname === '127.0.0.1' || hostname.endsWith('.127.0.0.1')) {
    baseDomain = '127.0.0.1';
  } else {
    // Production domain handling
    // Extract main domain from current hostname
    // e.g., from "www.africanshops.org" or "subdomain.africanshops.org"
    // extract "africanshops.org"
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      baseDomain = parts.slice(-2).join('.'); // Get last 2 parts (domain.tld)
    } else {
      baseDomain = hostname;
    }
  }

  // Construct subdomain URL
  return `${protocol}//${merchantSlug}.${baseDomain}${port}${path}`;
};

/**
 * Get base domain without subdomain
 * @returns {string} - Base domain URL
 */
export const getBaseDomainUrl = (path = '/') => {
  const protocol = window.location.protocol;
  const port = window.location.port ? `:${window.location.port}` : '';
  const hostname = window.location.hostname;

  // Handle plain localhost or 127.0.0.1
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}${port}${path}`;
  }

  // Handle subdomain.localhost or subdomain.127.0.0.1
  // Return just localhost or 127.0.0.1 (strip subdomain)
  if (hostname.endsWith('.localhost')) {
    return `${protocol}//localhost${port}${path}`;
  }

  if (hostname.endsWith('.127.0.0.1')) {
    return `${protocol}//127.0.0.1${port}${path}`;
  }

  // Production domain handling
  // Extract main domain (e.g., from "merchant.africanshops.org" -> "africanshops.org")
  const parts = hostname.split('.');
  let baseDomain;

  if (parts.length >= 2) {
    baseDomain = parts.slice(-2).join('.'); // Get last 2 parts (domain.tld)
  } else {
    baseDomain = hostname;
  }

  return `${protocol}//${baseDomain}${port}${path}`;
};

/**
 * Navigate to merchant subdomain
 * @param {string} merchantSlug - Merchant's slug identifier
 * @param {string} path - Path to navigate to
 */
export const navigateToMerchantSubdomain = (merchantSlug, path = '/') => {
  const currentHostname = window.location.hostname;
  const url = getMerchantSubdomainUrl(merchantSlug, path);

  console.log('═══════════════════════════════════════');
  console.log('Navigating to Merchant Subdomain:');
  console.log('  From Hostname:', currentHostname);
  console.log('  Target Merchant:', merchantSlug);
  console.log('  Target Path:', path);
  console.log('  Generated URL:', url);
  console.log('═══════════════════════════════════════');

  window.location.href = url;
};

/**
 * Navigate back to main domain
 * @param {string} path - Path to navigate to on main domain
 */
export const navigateToMainDomain = (path = '/') => {
  const currentHostname = window.location.hostname;
  const url = getBaseDomainUrl(path);

  console.log('═══════════════════════════════════════');
  console.log('Navigating to Main Domain:');
  console.log('  From Hostname:', currentHostname);
  console.log('  Target Path:', path);
  console.log('  Generated URL:', url);
  console.log('═══════════════════════════════════════');

  window.location.href = url;
};
