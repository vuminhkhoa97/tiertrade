'use client';
import { type MarketplaceFilters } from '../../utils/urlParams';
import { useUrlParams } from '../../hooks/useUrlParams';
import { useCategories } from '../../hooks/useCategories';

interface CategoryFilterProps {
  filters: MarketplaceFilters;
}

export default function CategoryFilter({
  filters,
}: CategoryFilterProps) {
  const { updateFilters } = useUrlParams();
  const { categories, loading, error } = useCategories();
  const selectedCategoryId = filters.categoryId;

  const handleCategoryChange = (categoryId: number | undefined) => {
    updateFilters({
      ...filters,
      categoryId: categoryId,
      page: 1,
    });
  };

  if (loading) {
    return (
      <nav aria-label="Product categories" className="mb-6">
        <h2 className="sr-only">Filter by Category</h2>
        <div className="flex gap-2">
          <div className="px-4 py-2 text-sm border rounded-md bg-muted animate-pulse">
            Loading categories...
          </div>
        </div>
      </nav>
    );
  }

  if (error) {
    return (
      <nav aria-label="Product categories" className="mb-6">
        <h2 className="sr-only">Filter by Category</h2>
        <div className="text-sm text-red-600">{error}</div>
      </nav>
    );
  }
  // Create the categories list with "All" option
  const categoryOptions = [
    { id: undefined, name: 'All' },
    ...categories.map((cat) => ({ id: cat.id, name: cat.name }))
  ];

  return (
    <nav aria-label="Product categories" className="mb-6">
      <h2 className="sr-only">Filter by Category</h2>
      <ul className="flex flex-wrap gap-2" role="list">
        {categoryOptions.map((category) => (
          <li key={category.id || 'all'}>
            <button
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 text-sm border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset ${
                selectedCategoryId === category.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground'
              }`}
              aria-current={selectedCategoryId === category.id ? 'page' : undefined}
              aria-label={`Filter products by ${category.name} category`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
