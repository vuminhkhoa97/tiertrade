import httpService from './httpService';
import { IProduct, ProductQuery } from './types';
import { api } from '../config';

class ProductsService {
  private readonly endpoint = api.endpoints.products;

  async getProducts(params?: ProductQuery): Promise<IProduct[]> {
    return httpService.get<IProduct[]>(this.endpoint, params);
  }
  async getTotals(params?: ProductQuery): Promise<{ total: number }> {
    const response = await httpService.getInstance().get(this.endpoint, {
      params: {
        ...params,
        _page: 1, // Assuming you want to get the total count from the first page
        _limit: 1, // Limit to 1 item to minimize data transfer
      },
    });
    const total = response.headers['x-total-count'];
    return { total: parseInt(total) || 0 };
  }
}

const productsService = new ProductsService();
export default productsService;
