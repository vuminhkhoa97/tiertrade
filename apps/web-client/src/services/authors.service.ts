import httpService from './httpService';
import { IAuthor } from './types';
import { api } from '../config';

export interface AuthorQuery {
  q?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  onlineStatus?: string;
  firstName_like?: string;
  lastName_like?: string;
  email_like?: string;
  _sort?: 'firstName' | 'lastName' | 'email' | 'gender' | 'onlineStatus';
  _order?: 'asc' | 'desc';
  _page?: number;
  _limit?: number;
  [key: string]: string | number | boolean | undefined;
}

class AuthorsService {
  private readonly endpoint = api.endpoints.authors;

  // Get all authors with optional filtering, sorting, and pagination
  async getAuthors(params?: AuthorQuery): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, params);
  }

  // Get a single author by ID
  async getAuthor(id: number): Promise<IAuthor> {
    return httpService.get<IAuthor>(`${this.endpoint}/${id}`);
  }

  // Search authors by query string (full-text search)
  async searchAuthors(query: string, params?: Omit<AuthorQuery, 'q'>): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { q: query, ...params });
  }

  // Search authors by first name (partial match)
  async searchAuthorsByFirstName(firstName: string, params?: Omit<AuthorQuery, 'firstName_like'>): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { firstName_like: firstName, ...params });
  }

  // Search authors by last name (partial match)
  async searchAuthorsByLastName(lastName: string, params?: Omit<AuthorQuery, 'lastName_like'>): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { lastName_like: lastName, ...params });
  }

  // Search authors by email (partial match)
  async searchAuthorsByEmail(email: string, params?: Omit<AuthorQuery, 'email_like'>): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { email_like: email, ...params });
  }

  // Get authors by gender
  async getAuthorsByGender(gender: string, params?: Omit<AuthorQuery, 'gender'>): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { gender, ...params });
  }

  // Get authors by online status
  async getAuthorsByOnlineStatus(onlineStatus: string, params?: Omit<AuthorQuery, 'onlineStatus'>): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { onlineStatus, ...params });
  }

  // Get online authors
  async getOnlineAuthors(params?: Omit<AuthorQuery, 'onlineStatus'>): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { onlineStatus: 'online', ...params });
  }

  // Get offline authors
  async getOfflineAuthors(params?: Omit<AuthorQuery, 'onlineStatus'>): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { onlineStatus: 'offline', ...params });
  }

  // Get authors with pagination
  async getAuthorsPaginated(page: number, limit: number, params?: Omit<AuthorQuery, '_page' | '_limit'>): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { _page: page, _limit: limit, ...params });
  }

  // Get authors sorted by field
  async getAuthorsSorted(
    sortBy: 'firstName' | 'lastName' | 'email' | 'gender' | 'onlineStatus',
    order: 'asc' | 'desc' = 'asc',
    params?: Omit<AuthorQuery, '_sort' | '_order'>
  ): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, { _sort: sortBy, _order: order, ...params });
  }

  // Create a new author
  async createAuthor(author: IAuthor): Promise<IAuthor> {
    return httpService.post<IAuthor>(this.endpoint, author);
  }

  // Update an author
  async updateAuthor(id: number, author: Partial<IAuthor>): Promise<IAuthor> {
    return httpService.put<IAuthor>(`${this.endpoint}/${id}`, author);
  }

  // Partially update an author
  async patchAuthor(id: number, author: Partial<IAuthor>): Promise<IAuthor> {
    return httpService.patch<IAuthor>(`${this.endpoint}/${id}`, author);
  }

  // Delete an author
  async deleteAuthor(id: number): Promise<void> {
    return httpService.delete<void>(`${this.endpoint}/${id}`);
  }

  // Search with filters
  async searchWithFilters(filters: AuthorQuery): Promise<IAuthor[]> {
    return httpService.get<IAuthor[]>(this.endpoint, filters);
  }
}

const authorsService = new AuthorsService();
export default authorsService;
