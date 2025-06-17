import { 
  buildUrlWithParams, 
  updateUrlParams, 
  getFiltersFromUrl,
  type MarketplaceFilters 
} from '../urlParams';

// Mock window.location and window.history
const mockLocation = {
  origin: 'http://localhost:3000',
  pathname: '/marketplace',
  search: '',
  href: 'http://localhost:3000/marketplace',
};

const mockHistory = {
  pushState: jest.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

Object.defineProperty(window, 'history', {
  value: mockHistory,
  writable: true,
});

describe('urlParams utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocation.pathname = '/marketplace';
    mockLocation.search = '';
  });

  describe('buildUrlWithParams', () => {
    it('should build URL with single filter', () => {
      const filters: MarketplaceFilters = {
        search: 'test',
      };

      const result = buildUrlWithParams('/marketplace', filters);

      expect(result).toBe('http://localhost:3000/marketplace?search=test');
    });

    it('should build URL with multiple filters', () => {
      const filters: MarketplaceFilters = {
        search: 'laptop',
        categoryId: 1,
        minPrice: 100,
        maxPrice: 500,
        sort: 'popular',
      };

      const result = buildUrlWithParams('/marketplace', filters);

      expect(result).toBe('http://localhost:3000/marketplace?search=laptop&categoryId=1&minPrice=100&maxPrice=500&sort=popular');
    });

    it('should skip undefined, null, and empty string values', () => {
      const filters: MarketplaceFilters = {
        search: 'test',
        categoryId: undefined,
        minPrice: 0, // This should be included
        maxPrice: undefined,
        sort: '',
      };

      const result = buildUrlWithParams('/marketplace', filters);

      expect(result).toBe('http://localhost:3000/marketplace?search=test&minPrice=0');
    });

    it('should skip categoryId when it is 0', () => {
      const filters: MarketplaceFilters = {
        search: 'test',
        categoryId: 0,
      };

      const result = buildUrlWithParams('/marketplace', filters);

      expect(result).toBe('http://localhost:3000/marketplace?search=test');
    });

    it('should handle numeric values correctly', () => {
      const filters: MarketplaceFilters = {
        page: 2,
        limit: 20,
        minPrice: 0,
        maxPrice: 1000,
      };

      const result = buildUrlWithParams('/marketplace', filters);

      expect(result).toBe('http://localhost:3000/marketplace?page=2&limit=20&minPrice=0&maxPrice=1000');
    });
  });

  describe('updateUrlParams', () => {
    it('should update URL using history.pushState', () => {
      const filters: MarketplaceFilters = {
        search: 'test',
        categoryId: 1,
      };

      updateUrlParams(filters);

      expect(mockHistory.pushState).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost:3000/marketplace?search=test&categoryId=1'
      );
    });

    it('should use current pathname from window.location', () => {
      mockLocation.pathname = '/custom-path';
      
      const filters: MarketplaceFilters = {
        search: 'test',
      };

      updateUrlParams(filters);

      expect(mockHistory.pushState).toHaveBeenCalledWith(
        {},
        '',
        'http://localhost:3000/custom-path?search=test'
      );
    });
  });

  describe('getFiltersFromUrl', () => {
    it('should parse search params into filters object', () => {
      const searchParams = new URLSearchParams('search=laptop&categoryId=1&minPrice=100&maxPrice=500&sort=popular&page=2&limit=20');

      const result = getFiltersFromUrl(searchParams);

      expect(result).toEqual({
        search: 'laptop',
        categoryId: 1,
        tierId: undefined,
        themeId: undefined,
        sort: 'popular',
        minPrice: 100,
        maxPrice: 500,
        page: 2,
        limit: 20,
      });
    });

    it('should return default values for missing params', () => {
      const searchParams = new URLSearchParams('search=test');

      const result = getFiltersFromUrl(searchParams);

      expect(result).toEqual({
        search: 'test',
        categoryId: undefined,
        tierId: undefined,
        themeId: undefined,
        sort: 'popular',
        minPrice: undefined,
        maxPrice: undefined,
        page: 1,
        limit: 12,
      });
    });

    it('should handle empty search params', () => {
      const searchParams = new URLSearchParams('');

      const result = getFiltersFromUrl(searchParams);

      expect(result).toEqual({
        search: undefined,
        categoryId: undefined,
        tierId: undefined,
        themeId: undefined,
        sort: 'popular',
        minPrice: undefined,
        maxPrice: undefined,
        page: 1,
        limit: 12,
      });
    });

    it('should parse numeric values correctly', () => {
      const searchParams = new URLSearchParams('categoryId=5&tierId=3&themeId=2&minPrice=50&maxPrice=200&page=3&limit=24');

      const result = getFiltersFromUrl(searchParams);

      expect(result).toEqual({
        search: undefined,
        categoryId: 5,
        tierId: 3,
        themeId: 2,
        sort: 'popular',
        minPrice: 50,
        maxPrice: 200,
        page: 3,
        limit: 24,
      });
    });

    it('should handle invalid numeric values gracefully', () => {
      const searchParams = new URLSearchParams('categoryId=invalid&page=notANumber');

      const result = getFiltersFromUrl(searchParams);

      expect(result.categoryId).toBeNaN();
      expect(result.page).toBeNaN();
    });
  });
});
