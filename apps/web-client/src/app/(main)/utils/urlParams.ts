export interface MarketplaceFilters {
  search?: string;
  categoryId?: number;
  tierId?: number | string;
  themeId?: number | string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export function buildUrlWithParams(
  baseUrl: string,
  filters: MarketplaceFilters
): string {
  const url = new URL(baseUrl, window.location.origin);
    Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Don't add default categoryId (0 or undefined) to URL
      if (key === 'categoryId' && (value === 0 || value === undefined)) return;
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export function updateUrlParams(filters: MarketplaceFilters): void {
  const currentUrl = window.location.pathname;
  const newUrl = buildUrlWithParams(currentUrl, filters);
  
  // Use pushState to update URL without page reload
  window.history.pushState({}, '', newUrl);
}

export function getFiltersFromUrl(searchParams: URLSearchParams): MarketplaceFilters {
  return {
    search: searchParams.get('search') || undefined,
    categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
    tierId: searchParams.get('tierId') ? Number(searchParams.get('tierId')) : undefined,
    themeId: searchParams.get('themeId') ? Number(searchParams.get('themeId')) : undefined,
    sort: searchParams.get('sort') || 'popular',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 12,
  };
}

export function resetUrlParams(): void {
  const currentUrl = window.location.pathname;
  window.history.pushState({}, '', currentUrl);
}

// Convert filters to API query parameters
export function filtersToApiParams(filters: MarketplaceFilters) {
  const apiParams: Record<string, string | number> = {};

  if (filters.search) {
    apiParams.q = filters.search;
  }

  if (filters.categoryId) {
    apiParams.categoryId = filters.categoryId;
  }

  if (filters.tierId) {
    apiParams.tierId = filters.tierId;
  }

  if (filters.themeId) {
    apiParams.themeId = filters.themeId;
  }

  if (filters.minPrice !== undefined) {
    apiParams.price_gte = filters.minPrice;
  }

  if (filters.maxPrice !== undefined) {
    apiParams.price_lte = filters.maxPrice;
  }

  if (filters.sort) {
    switch (filters.sort) {
      case 'low-to-high':
        apiParams._sort = 'price';
        apiParams._order = 'asc';
        break;
      case 'high-to-low':
        apiParams._sort = 'price';
        apiParams._order = 'desc';
        break;
      case 'newest':
        apiParams._sort = 'createdAt';
        apiParams._order = 'desc';
        break;
      case 'popular':
      default:
        // Don't add sort params for popular (default)
        break;
    }
  }

  if (filters.page) {
    apiParams._page = filters.page;
  }

  if (filters.limit) {
    apiParams._limit = filters.limit;
  }

  return apiParams;
}
