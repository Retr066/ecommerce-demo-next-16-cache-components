import { create } from 'zustand';

type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'name-asc';

interface FiltersStore {
  search: string;
  categoryId: string | null;
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  setSearch: (search: string) => void;
  setCategoryId: (id: string | null) => void;
  setPriceRange: (min: number, max: number) => void;
  setSortBy: (sort: SortOption) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  search: '',
  categoryId: null,
  minPrice: 0,
  maxPrice: 10000,
  sortBy: 'newest',

  setSearch: (search) => set({ search }),
  setCategoryId: (id) => set({ categoryId: id }),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max }),
  setSortBy: (sort) => set({ sortBy: sort }),
  reset: () =>
    set({
      search: '',
      categoryId: null,
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'newest',
    }),
}));
