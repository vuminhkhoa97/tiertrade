import httpService from './httpService';
import { ICategory } from './types';
import { api } from '../config';

export interface CategoryQuery {
  q?: string;
  name?: string;
  _sort?: 'id' | 'name';
  _order?: 'asc' | 'desc';
  _page?: number;
  _limit?: number;
  [key: string]: string | number | boolean | undefined;
}

class CategoriesService {
  private readonly endpoint = api.endpoints.categories;

  // Get all categories with optional filtering, sorting, and pagination
  async getCategories(params?: CategoryQuery): Promise<ICategory[]> {
    return httpService.get<ICategory[]>(this.endpoint, params);
  }

  // Get a single category by ID
  async getCategory(id: number): Promise<ICategory> {
    return httpService.get<ICategory>(`${this.endpoint}/${id}`);
  }

  // Search categories by query string (full-text search)
  async searchCategories(query: string, params?: Omit<CategoryQuery, 'q'>): Promise<ICategory[]> {
    return httpService.get<ICategory[]>(this.endpoint, { q: query, ...params });
  }

  // Search categories by name (partial match)
  async searchCategoriesByName(name: string, params?: Omit<CategoryQuery, 'name'>): Promise<ICategory[]> {
    return httpService.get<ICategory[]>(this.endpoint, { name_like: name, ...params });
  }

  // Get categories with pagination
  async getCategoriesPaginated(page: number, limit: number, params?: Omit<CategoryQuery, '_page' | '_limit'>): Promise<ICategory[]> {
    return httpService.get<ICategory[]>(this.endpoint, { _page: page, _limit: limit, ...params });
  }

  // Get categories sorted by field
  async getCategoriesSorted(
    sortBy: 'id' | 'name',
    order: 'asc' | 'desc' = 'asc',
    params?: Omit<CategoryQuery, '_sort' | '_order'>
  ): Promise<ICategory[]> {
    return httpService.get<ICategory[]>(this.endpoint, { _sort: sortBy, _order: order, ...params });
  }

  // Create a new category
  async createCategory(category: Omit<ICategory, 'id'>): Promise<ICategory> {
    return httpService.post<ICategory>(this.endpoint, category);
  }

  // Update a category
  async updateCategory(id: number, category: Partial<ICategory>): Promise<ICategory> {
    return httpService.put<ICategory>(`${this.endpoint}/${id}`, category);
  }

  // Partially update a category
  async patchCategory(id: number, category: Partial<ICategory>): Promise<ICategory> {
    return httpService.patch<ICategory>(`${this.endpoint}/${id}`, category);
  }

  // Delete a category
  async deleteCategory(id: number): Promise<void> {
    return httpService.delete<void>(`${this.endpoint}/${id}`);
  }

  // Search with filters
  async searchWithFilters(filters: CategoryQuery): Promise<ICategory[]> {
    return httpService.get<ICategory[]>(this.endpoint, filters);
  }
}

const categoriesService = new CategoriesService();
export default categoriesService;
