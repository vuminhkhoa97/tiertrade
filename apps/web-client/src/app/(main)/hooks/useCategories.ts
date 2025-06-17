'use client';

import { useState, useEffect } from 'react';
import { categoriesService } from '../../../services';
import { ICategory } from '../../../services/types';

interface UseCategoriesResult {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

// Cache for categories data to avoid repeated calls
let cachedCategories: ICategory[] | null = null;

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<ICategory[]>(cachedCategories || []);
  const [loading, setLoading] = useState(!cachedCategories);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      // If we already have cached data, no need to fetch again
      if (cachedCategories) {
        setCategories(cachedCategories);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const fetchedCategories = await categoriesService.getCategories();
        
        // Cache the results
        cachedCategories = fetchedCategories;
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Function to clear cache if needed (for data refresh)
export function clearCategoriesCache() {
  cachedCategories = null;
}
