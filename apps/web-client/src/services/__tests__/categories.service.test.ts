import categoriesService from '../categories.service';
import httpService from '../httpService';

// Mock the httpService
jest.mock('../httpService');

const mockHttpService = httpService as jest.Mocked<typeof httpService>;

describe('CategoriesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should fetch categories without parameters', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics', description: 'Electronic items', color: '#blue' },
        { id: 2, name: 'Clothing', description: 'Clothing items', color: '#red' },
      ];

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.getCategories();

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', undefined);
      expect(result).toEqual(mockCategories);
    });

    it('should fetch categories with query parameters', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics', description: 'Electronic items', color: '#blue' },
      ];

      const queryParams = {
        _sort: 'name' as const,
        _order: 'asc' as const,
        _page: 1,
        _limit: 10,
      };

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.getCategories(queryParams);

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', queryParams);
      expect(result).toEqual(mockCategories);
    });
  });

  describe('getCategory', () => {
    it('should fetch a single category by ID', async () => {
      const mockCategory = { id: 1, name: 'Electronics', description: 'Electronic items', color: '#blue' };

      mockHttpService.get.mockResolvedValue(mockCategory);

      const result = await categoriesService.getCategory(1);

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories/1');
      expect(result).toEqual(mockCategory);
    });
  });

  describe('searchCategories', () => {
    it('should search categories with query string', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics', description: 'Electronic devices', color: '#blue' },
      ];

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.searchCategories('electronics');

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', { q: 'electronics' });
      expect(result).toEqual(mockCategories);
    });

    it('should search categories with query and additional parameters', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics', description: 'Electronic devices', color: '#blue' },
      ];

      const additionalParams = { _limit: 5 };

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.searchCategories('electronics', additionalParams);

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', { q: 'electronics', _limit: 5 });
      expect(result).toEqual(mockCategories);
    });
  });

  describe('searchCategoriesByName', () => {
    it('should search categories by name pattern', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics', description: 'Electronic devices', color: '#blue' },
      ];

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.searchCategoriesByName('elect');

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', { name_like: 'elect' });
      expect(result).toEqual(mockCategories);
    });
  });

  describe('getCategoriesPaginated', () => {
    it('should fetch categories with pagination', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics', description: 'Electronic devices', color: '#blue' },
      ];

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.getCategoriesPaginated(1, 10);

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', { _page: 1, _limit: 10 });
      expect(result).toEqual(mockCategories);
    });

    it('should fetch categories with pagination and additional params', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics', description: 'Electronic devices', color: '#blue' },
      ];

      const additionalParams = { _sort: 'name' as const };

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.getCategoriesPaginated(1, 10, additionalParams);

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', { 
        _page: 1, 
        _limit: 10, 
        _sort: 'name' 
      });
      expect(result).toEqual(mockCategories);
    });
  });

  describe('getCategoriesSorted', () => {
    it('should fetch categories sorted by field with default order', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics', description: 'Electronic devices', color: '#blue' },
      ];

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.getCategoriesSorted('name');

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', { 
        _sort: 'name', 
        _order: 'asc' 
      });
      expect(result).toEqual(mockCategories);
    });

    it('should fetch categories sorted by field with specified order', async () => {
      const mockCategories = [
        { id: 2, name: 'Clothing', description: 'Clothing items', color: '#red' },
        { id: 1, name: 'Electronics', description: 'Electronic devices', color: '#blue' },
      ];

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.getCategoriesSorted('name', 'desc');

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', { 
        _sort: 'name', 
        _order: 'desc' 
      });
      expect(result).toEqual(mockCategories);
    });

    it('should fetch categories sorted with additional parameters', async () => {
      const mockCategories = [
        { id: 1, name: 'Electronics', description: 'Electronic devices', color: '#blue' },
      ];

      const additionalParams = { _limit: 5 };

      mockHttpService.get.mockResolvedValue(mockCategories);

      const result = await categoriesService.getCategoriesSorted('name', 'asc', additionalParams);

      expect(mockHttpService.get).toHaveBeenCalledWith('/categories', { 
        _sort: 'name', 
        _order: 'asc',
        _limit: 5 
      });
      expect(result).toEqual(mockCategories);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from httpService', async () => {
      const errorMessage = 'Network error';
      mockHttpService.get.mockRejectedValue(new Error(errorMessage));

      await expect(categoriesService.getCategories()).rejects.toThrow(errorMessage);
    });
  });
});
