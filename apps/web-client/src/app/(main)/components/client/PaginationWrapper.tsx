'use client';

import { Pagination } from '../ui';
import { type MarketplaceFilters } from '../../utils/urlParams';

interface PaginationWrapperProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  filters: MarketplaceFilters;
}

export default function PaginationWrapper({
  currentPage,
  totalItems,
  itemsPerPage,
  filters,
}: PaginationWrapperProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
    const generateUrl = (page: number) => {
    const newFilters = { ...filters, page };
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        // Don't add default categoryId (0 or undefined) to URL
        if (key === 'categoryId' && (value === 0 || value === undefined)) return;
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '/';
  };

  // Don't render pagination if there's only one page or no items
  if (totalItems === 0 || totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-12 border-t pt-8">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        generateUrl={generateUrl}
      />
    </div>
  );
}
