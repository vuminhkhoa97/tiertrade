'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { type MarketplaceFilters } from '../utils/urlParams';

export function useUrlParams() {
  const router = useRouter();

  const updateFilters = useCallback(
    (filters: MarketplaceFilters) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'categoryId' && (value === 0 || value === undefined))
            return;
          params.set(key, String(value));
        }
      });

      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;

      router.push(newUrl);
    },
    [router]
  );

  const resetFilters = useCallback(() => {
    router.push(window.location.pathname);
  }, [router]);

  return {
    updateFilters,
    resetFilters,
  };
}
