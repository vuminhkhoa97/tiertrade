import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import CategoryFilter from '../CategoryFilter';
import { useCategories } from '../../../hooks/useCategories';
import { useUrlParams } from '../../../hooks/useUrlParams';

// Mock the hooks
jest.mock('../../../hooks/useCategories');
jest.mock('../../../hooks/useUrlParams');

const mockUseCategories = useCategories as jest.MockedFunction<
  typeof useCategories
>;
const mockUseUrlParams = useUrlParams as jest.MockedFunction<
  typeof useUrlParams
>;

describe('CategoryFilter', () => {
  const mockUpdateFilters = jest.fn();

  beforeEach(() => {
    mockUseUrlParams.mockReturnValue({
      updateFilters: mockUpdateFilters,
      resetFilters: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    mockUseCategories.mockReturnValue({
      categories: [],
      loading: true,
      error: null,
    });

    render(<CategoryFilter filters={{}} />);

    expect(screen.getByText('Loading categories...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'Failed to load categories';
    mockUseCategories.mockReturnValue({
      categories: [],
      loading: false,
      error: errorMessage,
    });

    render(<CategoryFilter filters={{}} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders categories with All option', () => {
    const mockCategories = [
      {
        id: 1,
        name: 'Electronics',
        description: 'Electronic items',
        color: '#blue',
      },
      { id: 2, name: 'Clothing', description: 'Clothing items', color: '#red' },
    ];

    mockUseCategories.mockReturnValue({
      categories: mockCategories,
      loading: false,
      error: null,
    });

    render(<CategoryFilter filters={{}} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
  });

  it('highlights selected category', () => {
    const mockCategories = [
      {
        id: 1,
        name: 'Electronics',
        description: 'Electronic items',
        color: '#blue',
      },
    ];

    mockUseCategories.mockReturnValue({
      categories: mockCategories,
      loading: false,
      error: null,
    });

    render(<CategoryFilter filters={{ categoryId: 1 }} />);

    const electronicsButton = screen.getByText('Electronics');
    expect(electronicsButton).toHaveClass('bg-primary');
  });

  it('calls updateFilters when category is clicked', async () => {
    const mockCategories = [
      {
        id: 1,
        name: 'Electronics',
        description: 'Electronic items',
        color: '#blue',
      },
    ];

    mockUseCategories.mockReturnValue({
      categories: mockCategories,
      loading: false,
      error: null,
    });

    render(<CategoryFilter filters={{}} />);

    const electronicsButton = screen.getByText('Electronics');
    fireEvent.click(electronicsButton);

    await waitFor(() => {
      expect(mockUpdateFilters).toHaveBeenCalledWith({
        categoryId: 1,
        page: 1,
      });
    });
  });

  it('calls updateFilters with undefined when All is clicked', async () => {
    const mockCategories = [
      {
        id: 1,
        name: 'Electronics',
        description: 'Electronic items',
        color: '#blue',
      },
    ];

    mockUseCategories.mockReturnValue({
      categories: mockCategories,
      loading: false,
      error: null,
    });

    render(<CategoryFilter filters={{ categoryId: 1 }} />);

    const allButton = screen.getByText('All');
    fireEvent.click(allButton);

    await waitFor(() => {
      expect(mockUpdateFilters).toHaveBeenCalledWith({
        categoryId: undefined,
        page: 1,
      });
    });
  });

  it('has proper accessibility attributes', () => {
    const mockCategories = [
      {
        id: 1,
        name: 'Electronics',
        description: 'Electronic items',
        color: '#blue',
      },
    ];

    mockUseCategories.mockReturnValue({
      categories: mockCategories,
      loading: false,
      error: null,
    });

    render(<CategoryFilter filters={{ categoryId: 1 }} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Product categories');

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const electronicsButton = screen.getByText('Electronics');
    expect(electronicsButton).toHaveAttribute('aria-current', 'page');
    expect(electronicsButton).toHaveAttribute(
      'aria-label',
      'Filter products by Electronics category'
    );
  });
});
