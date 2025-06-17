'use client';

import { useForm, Controller, useWatch, FormProvider } from 'react-hook-form';
import { Button } from '@tier-trade/ui';
import SearchBar from './FormControl/SearchBar';
import PriceRangeFilter from './FormControl/PriceRangeFilter';
import FilterSelect from './FormControl/FilterSelect';
import TierSelect from './FormControl/TierSelect';
import ThemeSelect from './FormControl/ThemeSelect';
import { type MarketplaceFilters } from '../../utils/urlParams';
import { useUrlParams } from '../../hooks/useUrlParams';
import { memo, useEffect } from 'react';
import { useDebounce } from '../../hooks';

interface SidebarProps {
  filters: MarketplaceFilters;
}

const sortOptions = [
  { id: 'low-to-high', value: 'low-to-high', label: 'Low to High' },
  { id: 'high-to-low', value: 'high-to-low', label: 'High to Low' },
  { id: 'popular', value: 'popular', label: 'Most Popular' },
  { id: 'newest', value: 'newest', label: 'Newest' },
];

function HandleOnChange() {
  const data = useWatch();
  const _debounceData = useDebounce(data, 300); // Debounce the data to avoid too many updates
  const { updateFilters } = useUrlParams();

  useEffect(() => {
    updateFilters(_debounceData);
  }, [_debounceData, updateFilters]);

  return null;
}

const MemoizedHandleOnChange = memo(HandleOnChange);

export default function Sidebar({ filters }: SidebarProps) {
  const { resetFilters } = useUrlParams();

  // Initialize form with current filter values
  const methods = useForm<MarketplaceFilters>({
    defaultValues: {
      search: filters.search || '',
      minPrice: filters.minPrice || 0,
      maxPrice: filters.maxPrice || 200,
      tierId: filters.tierId,
      themeId: filters.themeId,
      sort: filters.sort || 'popular',
      page: filters.page,
      limit: filters.limit,
    },
    mode: 'onChange',
  });
  const { control, reset } = methods;

  const handleReset = () => {
    reset({
      search: '',
      minPrice: undefined,
      maxPrice: undefined,
      tierId: '',
      themeId: '',
      sort: '',
    });
    resetFilters();
  };
  return (
    <div className="w-64 flex-shrink-0">
      <FormProvider {...methods}>
        <MemoizedHandleOnChange />
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <SearchBar
              value={field.value || ''}
              onChange={field.onChange}
              placeholder="Search"
            />
          )}
        />

        <Controller
          name="minPrice"
          control={control}
          render={({ field: minPriceField }) => (
            <Controller
              name="maxPrice"
              control={control}
              render={({ field: maxPriceField }) => (
                <PriceRangeFilter
                  fromPrice={minPriceField.value || 0}
                  toPrice={maxPriceField.value || 10}
                  max={200}
                  onChange={(fromPrice, toPrice) => {
                    minPriceField.onChange(fromPrice);
                    maxPriceField.onChange(toPrice);
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          name="tierId"
          control={control}
          render={({ field }) => (
            <TierSelect
              value={field.value?.toString() || ''}
              onChange={(value) =>
                field.onChange(value ? Number(value) : undefined)
              }
            />
          )}
        />

        <Controller
          name="themeId"
          control={control}
          render={({ field }) => (
            <ThemeSelect
              value={field.value?.toString() || ''}
              onChange={(value) =>
                field.onChange(value ? Number(value) : undefined)
              }
            />
          )}
        />

        <Controller
          name="sort"
          control={control}
          render={({ field }) => (
            <FilterSelect
              title="Price"
              value={field.value || 'popular'}
              onChange={field.onChange}
              options={sortOptions}
            />
          )}
        />

        <Button variant="outline" className="w-full" onClick={handleReset}>
          Reset Filter
        </Button>
      </FormProvider>
    </div>
  );
}
