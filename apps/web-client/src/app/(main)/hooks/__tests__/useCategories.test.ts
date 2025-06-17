import { renderHook, waitFor } from '@testing-library/react';
import { useCategories, clearCategoriesCache } from '../useCategories';
import { categoriesService } from '../../../../services';

// Mock the categories service
jest.mock('../../../../services', () => ({
  categoriesService: {
    getCategories: jest.fn(),
  },
}));

const mockCategoriesService = categoriesService as jest.Mocked<typeof categoriesService>;

describe('useCategories', () => {
  beforeEach(() => {
    clearCategoriesCache();
    jest.clearAllMocks();
  });
  it('should return loading state initially', () => {
    mockCategoriesService.getCategories.mockImplementation(() => new Promise(() => {
      // Never resolves to keep loading state
    }));
    
    const { result } = renderHook(() => useCategories());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('should fetch and return categories successfully', async () => {
    const mockCategories = [
      { id: 1, name: 'Electronics', description: 'Electronic items', color: '#blue' },
      { id: 2, name: 'Clothing', description: 'Clothing items', color: '#red' },
    ];

    mockCategoriesService.getCategories.mockResolvedValue(mockCategories);
    
    const { result } = renderHook(() => useCategories());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.error).toBe(null);
  });

  it('should handle errors when fetching categories fails', async () => {
    const errorMessage = 'Network error';
    mockCategoriesService.getCategories.mockRejectedValue(new Error(errorMessage));
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      // Suppress console.error during test
    });
    
    const { result } = renderHook(() => useCategories());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe('Failed to load categories');
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch categories:', expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  it('should use cached categories on subsequent calls', async () => {
    const mockCategories = [
      { id: 1, name: 'Electronics', description: 'Electronic items', color: '#blue' },
    ];

    mockCategoriesService.getCategories.mockResolvedValue(mockCategories);
    
    // First call
    const { result: result1 } = renderHook(() => useCategories());
    
    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });
    
    expect(mockCategoriesService.getCategories).toHaveBeenCalledTimes(1);
    
    // Second call should use cache
    const { result: result2 } = renderHook(() => useCategories());
    
    expect(result2.current.loading).toBe(false);
    expect(result2.current.categories).toEqual(mockCategories);
    expect(mockCategoriesService.getCategories).toHaveBeenCalledTimes(1); // Still only called once
  });

  it('should clear cache when clearCategoriesCache is called', async () => {
    const mockCategories = [
      { id: 1, name: 'Electronics', description: 'Electronic items', color: '#blue' },
    ];

    mockCategoriesService.getCategories.mockResolvedValue(mockCategories);
    
    // First call
    const { result: result1 } = renderHook(() => useCategories());
    
    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });
    
    expect(mockCategoriesService.getCategories).toHaveBeenCalledTimes(1);
    
    // Clear cache
    clearCategoriesCache();
    
    // Second call should fetch again
    const { result: result2 } = renderHook(() => useCategories());
    
    await waitFor(() => {
      expect(result2.current.loading).toBe(false);
    });
    
    expect(mockCategoriesService.getCategories).toHaveBeenCalledTimes(2);
  });
});
