import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { api, development } from '../config';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginationParams {
  _page?: number;
  _limit?: number;
}

export interface SortParams {
  _sort?: string;
  _order?: 'asc' | 'desc';
}

export interface SearchParams {
  q?: string;
  [key: string]: string | number | boolean | undefined;
}

export type QueryParams = PaginationParams & SortParams & SearchParams;

class HttpService {
  private api: AxiosInstance;
  constructor(baseURL = api.baseUrl) {
    try {
      this.api = axios.create({
        baseURL,
        timeout: api.timeout,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.setupInterceptors();
    } catch (error) {
      console.error('Failed to create axios instance:', error);
      throw new Error('HttpService initialization failed');
    }
  }
  private setupInterceptors(): void {
    if (!this.api) {
      throw new Error('Axios instance not initialized');
    }

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add any global request modifications here
        if (development.debugMode) {
          console.log(
            `Making ${config.method?.toUpperCase()} request to ${config.url}`
          );
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (development.debugMode) {
          console.error('API Error:', error.response?.data || error.message);
        }
        return Promise.reject(error);
      }
    );
  }
  async get<T>(
    url: string,
    params?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<T> {
    if (!this.api) {
      throw new Error('HttpService not properly initialized');
    }
    const response = await this.api.get<T>(url, { params, ...config });
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    if (!this.api) {
      throw new Error('HttpService not properly initialized');
    }
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    if (!this.api) {
      throw new Error('HttpService not properly initialized');
    }
    const response = await this.api.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    if (!this.api) {
      throw new Error('HttpService not properly initialized');
    }
    const response = await this.api.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    if (!this.api) {
      throw new Error('HttpService not properly initialized');
    }
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }

  getInstance(): AxiosInstance {
    if (!this.api) {
      throw new Error('HttpService not properly initialized');
    }
    return this.api;
  }
}

const httpService = new HttpService();
export default httpService;
