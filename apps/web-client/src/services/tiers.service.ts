import httpService from './httpService';
import { ITier } from './types';
import { api } from '../config';

export interface TierQuery {
  q?: string;
  name?: string;
  priceMultiplier?: number;
  priceMultiplier_gte?: number;
  priceMultiplier_lte?: number;
  _sort?: 'id' | 'name' | 'priceMultiplier';
  _order?: 'asc' | 'desc';
  _page?: number;
  _limit?: number;
  [key: string]: string | number | boolean | undefined;
}

class TiersService {
  private readonly endpoint = api.endpoints.tiers;

  // Get all tiers with optional filtering, sorting, and pagination
  async getTiers(params?: TierQuery): Promise<ITier[]> {
    return httpService.get<ITier[]>(this.endpoint, params);
  }

  // Get a single tier by ID
  async getTier(id: number): Promise<ITier> {
    return httpService.get<ITier>(`${this.endpoint}/${id}`);
  }

  // Search tiers by query string (full-text search)
  async searchTiers(query: string, params?: Omit<TierQuery, 'q'>): Promise<ITier[]> {
    return httpService.get<ITier[]>(this.endpoint, { q: query, ...params });
  }

  // Search tiers by name (partial match)
  async searchTiersByName(name: string, params?: Omit<TierQuery, 'name'>): Promise<ITier[]> {
    return httpService.get<ITier[]>(this.endpoint, { name_like: name, ...params });
  }

  // Get tiers by price multiplier range
  async getTiersByPriceMultiplierRange(
    minMultiplier: number,
    maxMultiplier: number,
    params?: Omit<TierQuery, 'priceMultiplier_gte' | 'priceMultiplier_lte'>
  ): Promise<ITier[]> {
    return httpService.get<ITier[]>(this.endpoint, { 
      priceMultiplier_gte: minMultiplier, 
      priceMultiplier_lte: maxMultiplier, 
      ...params 
    });
  }

  // Get tiers with pagination
  async getTiersPaginated(page: number, limit: number, params?: Omit<TierQuery, '_page' | '_limit'>): Promise<ITier[]> {
    return httpService.get<ITier[]>(this.endpoint, { _page: page, _limit: limit, ...params });
  }

  // Get tiers sorted by field
  async getTiersSorted(
    sortBy: 'id' | 'name' | 'priceMultiplier',
    order: 'asc' | 'desc' = 'asc',
    params?: Omit<TierQuery, '_sort' | '_order'>
  ): Promise<ITier[]> {
    return httpService.get<ITier[]>(this.endpoint, { _sort: sortBy, _order: order, ...params });
  }

  // Create a new tier
  async createTier(tier: Omit<ITier, 'id'>): Promise<ITier> {
    return httpService.post<ITier>(this.endpoint, tier);
  }

  // Update a tier
  async updateTier(id: number, tier: Partial<ITier>): Promise<ITier> {
    return httpService.put<ITier>(`${this.endpoint}/${id}`, tier);
  }

  // Partially update a tier
  async patchTier(id: number, tier: Partial<ITier>): Promise<ITier> {
    return httpService.patch<ITier>(`${this.endpoint}/${id}`, tier);
  }

  // Delete a tier
  async deleteTier(id: number): Promise<void> {
    return httpService.delete<void>(`${this.endpoint}/${id}`);
  }

  // Search with filters
  async searchWithFilters(filters: TierQuery): Promise<ITier[]> {
    return httpService.get<ITier[]>(this.endpoint, filters);
  }
}

const tiersService = new TiersService();
export default tiersService;
