export interface FilterState {
  searchTerm: string;
  selectedCategoryId: number | undefined;
  selectedTierId: number | undefined;
  selectedThemeId: number | undefined;
  priceRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'popularity';
}

export interface MarketplaceParams {
  categoryId?: string;
  tierId?: string;
  themeId?: string;
  search?: string;
  min_price?: string;
  max_price?: string;
  sort?: string;
  page?: string;
}
