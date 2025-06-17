import { productsService } from '../../../../services';
import {
  filtersToApiParams,
  type MarketplaceFilters,
} from '../../utils/urlParams';
import { IProduct } from '../../../../services/types';
import { ProductCard, ResultsSummary } from '../ui';
import { PaginationWrapper } from '../client';

interface ProductGridProps {
  filters: MarketplaceFilters;
}

// Server component to fetch products
export default async function ProductGrid({ filters }: ProductGridProps) {
  let products: IProduct[] = [];
  let totalItems = 0;
  let error: string | null = null;

  try {
    const apiParams = filtersToApiParams(filters);
    const totals = await productsService.getTotals(apiParams);
    totalItems = totals.total;
    products = await productsService.getProducts(apiParams);
  } catch (err) {
    console.error('Failed to fetch products:', err);
    error = 'Failed to load products. Please try again later.';
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No products found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Results summary */}
      <ResultsSummary
        currentPage={filters.page || 1}
        totalItems={totalItems}
        itemsPerPage={filters.limit || 12}
        displayedItems={products.length}
      />

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <PaginationWrapper
        currentPage={filters.page || 1}
        totalItems={totalItems}
        itemsPerPage={filters.limit || 12}
        filters={filters}
      />
    </>
  );
}
