export interface IAuthor {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  avatar: string;
  onlineStatus: string;
}

export interface IProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  isFavorite: boolean;
  createdAt: number;
  theme: string;
  tier: string;
  imageId: number;
  imageUrl: string;
  author: IAuthor;
}

export interface ITheme {
  id: number;
  name: string;
  description: string;
  season: string;
  color: string;
  isActive: boolean;
}

export interface ITier {
  id: number;
  name: string;
  description: string;
  priceMultiplier: number;
  color: string;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
  color: string;
}

// Query interfaces
export interface ProductFilters {
  category?: string;
  theme?: string;
  tier?: string;
  minPrice?: number;
  maxPrice?: number;
  isFavorite?: boolean;
  title_like?: string;
  author?: string;
  price_gte?: number;
  price_lte?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface ProductQuery extends ProductFilters {
  q?: string;
  _sort?:
    | 'title'
    | 'price'
    | 'createdAt'
    | 'category'
    | 'theme'
    | 'tier'
    | 'author'
    | 'imageUrl'
    | 'imageId';
  _order?: 'asc' | 'desc';
  _page?: number;
  _limit?: number;
}
