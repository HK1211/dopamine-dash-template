import { create } from "zustand";
import type { FilterState } from "@/src/shared/types/store";
import type { Products } from "@/generated/components/Products/columns";

export const useProductsStore = create<FilterState<Products>>((set) => ({
  filters: {
    category: "",
    brand: "",
    name: ""
  },
  selectedItem: null,
  isEditMode: false,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
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