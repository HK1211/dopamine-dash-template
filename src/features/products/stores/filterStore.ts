import { create } from "zustand";

interface FilterState {
  filters: {
    category: string;
    brand: string;
    name: string;
  };
  setFilter: (key: string, value: string) => void;
}

export const useProductsFilterStore = create<FilterState>((set) => ({
  filters: {
    category: "",
    brand: "",
    name: ""
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    }))
}));