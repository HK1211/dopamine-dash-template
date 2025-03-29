export interface FilterState<T> {
  filters: Record<string, string>;
  selectedItem: T | null;
  isEditMode: boolean;
  setFilter: (key: string, value: string) => void;
  setSelectedItem: (item: T) => void;
  resetSelectedItem: () => void;
}
