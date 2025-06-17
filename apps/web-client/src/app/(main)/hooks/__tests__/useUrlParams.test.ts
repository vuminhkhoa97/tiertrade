import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useUrlParams } from '../useUrlParams';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

// Mock window.location
const mockLocation = {
  pathname: '/test-path',
  search: '',
  href: 'http://localhost/test-path',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('useUrlParams', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    
    mockLocation.pathname = '/test-path';
    mockLocation.search = '';
    
    jest.clearAllMocks();
  });

  describe('updateFilters', () => {
    it('should create URL with filters', () => {
      const { result } = renderHook(() => useUrlParams());
      
      const filters = {
        search: 'test',
        minPrice: 10,
        maxPrice: 100,
        categoryId: 1,
        sort: 'popular' as const,
      };
      
      result.current.updateFilters(filters);
      
      const expectedUrl = '?search=test&minPrice=10&maxPrice=100&categoryId=1&sort=popular';
      expect(mockPush).toHaveBeenCalledWith(expectedUrl);
    });    it('should skip undefined and null values', () => {
      const { result } = renderHook(() => useUrlParams());
      
      const filters = {
        search: 'test',
        minPrice: undefined,
        maxPrice: undefined,
        categoryId: 1,
        sort: '' as const,
      };
      
      result.current.updateFilters(filters);
      
      const expectedUrl = '?search=test&categoryId=1';
      expect(mockPush).toHaveBeenCalledWith(expectedUrl);
    });

    it('should skip categoryId when it is 0', () => {
      const { result } = renderHook(() => useUrlParams());
      
      const filters = {
        search: 'test',
        categoryId: 0,
      };
      
      result.current.updateFilters(filters);
      
      const expectedUrl = '?search=test';
      expect(mockPush).toHaveBeenCalledWith(expectedUrl);
    });

    it('should navigate to pathname without query when no filters', () => {
      const { result } = renderHook(() => useUrlParams());
      
      const filters = {
        search: '',
        categoryId: undefined,
      };
      
      result.current.updateFilters(filters);
      
      expect(mockPush).toHaveBeenCalledWith('/test-path');
    });

    it('should handle boolean and number values correctly', () => {
      const { result } = renderHook(() => useUrlParams());
      
      const filters = {
        page: 1,
        limit: 20,
        active: true,
      };
      
      result.current.updateFilters(filters);
      
      const expectedUrl = '?page=1&limit=20&active=true';
      expect(mockPush).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('resetFilters', () => {
    it('should navigate to pathname without query parameters', () => {
      const { result } = renderHook(() => useUrlParams());
      
      result.current.resetFilters();
      
      expect(mockPush).toHaveBeenCalledWith('/test-path');
    });
  });

  describe('memoization', () => {
    it('should memoize updateFilters function', () => {
      const { result, rerender } = renderHook(() => useUrlParams());
      
      const updateFilters1 = result.current.updateFilters;
      
      rerender();
      
      const updateFilters2 = result.current.updateFilters;
      
      expect(updateFilters1).toBe(updateFilters2);
    });

    it('should memoize resetFilters function', () => {
      const { result, rerender } = renderHook(() => useUrlParams());
      
      const resetFilters1 = result.current.resetFilters;
      
      rerender();
      
      const resetFilters2 = result.current.resetFilters;
      
      expect(resetFilters1).toBe(resetFilters2);
    });
  });
});
