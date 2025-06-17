import { Header, Footer, ProductGrid } from './components/server';
import { Sidebar, CategoryFilter } from './components/client';
import { getFiltersFromUrl } from './utils/urlParams';
import { Suspense, use } from 'react';

interface MarketplacePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-muted aspect-square rounded-lg mb-3"></div>
          <div className="h-4 bg-muted rounded mb-2"></div>
          <div className="h-3 bg-muted rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

export default function MarketplacePage({
  searchParams,
}: MarketplacePageProps) {
  // Convert searchParams to URLSearchParams and get filters
  const resolvedSearchParams = use(searchParams);
  const urlSearchParams = new URLSearchParams();
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (value) {
      const stringValue = Array.isArray(value) ? value[0] : value;
      urlSearchParams.set(key, stringValue);
    }
  });

  const filters = getFiltersFromUrl(urlSearchParams);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Sidebar filters={filters} />

          {/* Main Content */}
          <div className="flex-1">
            <CategoryFilter filters={filters} />{' '}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid filters={filters} />
            </Suspense>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
