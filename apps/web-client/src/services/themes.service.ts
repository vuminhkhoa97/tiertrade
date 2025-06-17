import httpService from './httpService';
import { ITheme } from './types';
import { api } from '../config';

export interface ThemeQuery {
  q?: string;
  name?: string;
  season?: string;
  isActive?: boolean;
  _sort?: 'id' | 'name' | 'season';
  _order?: 'asc' | 'desc';
  _page?: number;
  _limit?: number;
  [key: string]: string | number | boolean | undefined;
}

class ThemesService {
  private readonly endpoint = api.endpoints.themes;

  // Get all themes with optional filtering, sorting, and pagination
  async getThemes(params?: ThemeQuery): Promise<ITheme[]> {
    return httpService.get<ITheme[]>(this.endpoint, params);
  }

  // Get a single theme by ID
  async getTheme(id: number): Promise<ITheme> {
    return httpService.get<ITheme>(`${this.endpoint}/${id}`);
  }

  // Search themes by query string (full-text search)
  async searchThemes(query: string, params?: Omit<ThemeQuery, 'q'>): Promise<ITheme[]> {
    return httpService.get<ITheme[]>(this.endpoint, { q: query, ...params });
  }

  // Get themes by season
  async getThemesBySeason(season: string, params?: Omit<ThemeQuery, 'season'>): Promise<ITheme[]> {
    return httpService.get<ITheme[]>(this.endpoint, { season, ...params });
  }

  // Get active themes
  async getActiveThemes(params?: Omit<ThemeQuery, 'isActive'>): Promise<ITheme[]> {
    return httpService.get<ITheme[]>(this.endpoint, { isActive: true, ...params });
  }

  // Get inactive themes
  async getInactiveThemes(params?: Omit<ThemeQuery, 'isActive'>): Promise<ITheme[]> {
    return httpService.get<ITheme[]>(this.endpoint, { isActive: false, ...params });
  }

  // Get themes with pagination
  async getThemesPaginated(page: number, limit: number, params?: Omit<ThemeQuery, '_page' | '_limit'>): Promise<ITheme[]> {
    return httpService.get<ITheme[]>(this.endpoint, { _page: page, _limit: limit, ...params });
  }

  // Get themes sorted by field
  async getThemesSorted(
    sortBy: 'id' | 'name' | 'season',
    order: 'asc' | 'desc' = 'asc',
    params?: Omit<ThemeQuery, '_sort' | '_order'>
  ): Promise<ITheme[]> {
    return httpService.get<ITheme[]>(this.endpoint, { _sort: sortBy, _order: order, ...params });
  }

  // Create a new theme
  async createTheme(theme: Omit<ITheme, 'id'>): Promise<ITheme> {
    return httpService.post<ITheme>(this.endpoint, theme);
  }

  // Update a theme
  async updateTheme(id: number, theme: Partial<ITheme>): Promise<ITheme> {
    return httpService.put<ITheme>(`${this.endpoint}/${id}`, theme);
  }

  // Partially update a theme
  async patchTheme(id: number, theme: Partial<ITheme>): Promise<ITheme> {
    return httpService.patch<ITheme>(`${this.endpoint}/${id}`, theme);
  }

  // Delete a theme
  async deleteTheme(id: number): Promise<void> {
    return httpService.delete<void>(`${this.endpoint}/${id}`);
  }

  // Toggle theme active status
  async toggleActive(id: number): Promise<ITheme> {
    const theme = await this.getTheme(id);
    return this.patchTheme(id, { isActive: !theme.isActive });
  }

  // Search with filters
  async searchWithFilters(filters: ThemeQuery): Promise<ITheme[]> {
    return httpService.get<ITheme[]>(this.endpoint, filters);
  }
}

const themesService = new ThemesService();
export default themesService;
