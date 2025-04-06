import { create } from "zustand";
import type { Products } from "@/generated/components/Products/columns";

type FilterKeys = {
  category: string;
  brand: string;
  name: string;
};

interface ProductsStore {
  filters: FilterKeys;
  queryParams: FilterKeys;
  selectedItem: Products | null;
  isEditMode: boolean;
  setFilter: (key: keyof FilterKeys, value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  setSelectedItem: (item: Products) => void;
  resetSelectedItem: () => void;
}

const initialFilters: FilterKeys = {
    category: "",
    brand: "",
    name: ""
};

export const useProductsStore = create<ProductsStore>((set, get) => ({
  filters: { ...initialFilters },
  queryParams: { ...initialFilters },
  selectedItem: null,
  isEditMode: false,

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    })),

  applyFilters: () =>
    set((state) => ({
      queryParams: { ...state.filters }
    })),

  resetFilters: () =>
    set(() => ({
      filters: { ...initialFilters },
      queryParams: { ...initialFilters }
    })),

  setSelectedItem: (item) =>
    set(() => ({
      selectedItem: item,
      isEditMode: true
    })),

  resetSelectedItem: () =>
    set(() => ({
      selectedItem: null,
      isEditMode: false
    }))
}));