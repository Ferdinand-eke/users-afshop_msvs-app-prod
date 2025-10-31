import { useEffect, useState } from 'react';
import { getSubdomain } from 'src/app/utils/subdomainUtils';

/**
 * MerchantSubdomainLayout
 * Layout wrapper that detects subdomain and passes it to child components
 * Use this to wrap ANY merchant page component
 */
function MerchantSubdomainLayout({ PageComponent }) {
  const [merchantSlug, setMerchantSlug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check subdomain at runtime
    const slug = getSubdomain();
    const hostname = window.location.hostname;

    console.log('═══════════════════════════════════════');
    console.log('MerchantSubdomainLayout Detection:');
    console.log('  Hostname:', hostname);
    console.log('  Detected Slug:', slug);
    console.log('  Path:', window.location.pathname);
    console.log('═══════════════════════════════════════');

    setMerchantSlug(slug);
    setLoading(false);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading merchant profile...</p>
        </div>
      </div>
    );
  }

  // If no subdomain, return null (let other routes handle it)
  // This allows main domain routes to work normally
  if (!merchantSlug) {
    return null;
  }

  // Render the page component with merchantSlug prop
  return <PageComponent merchantSlug={merchantSlug} />;
}

export default MerchantSubdomainLayout;
