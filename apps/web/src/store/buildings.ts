import { create } from "zustand";

export type BuildingFilters = {
  date: string;
};
interface BuildingState {
  filters: BuildingFilters;
  setFilters: (filters: BuildingFilters) => void;
}

const lastYear = new Date().getFullYear() - 1;

export const useTransportsStore = create<BuildingState>()((set, get) => ({
  filters: {
    date: String(lastYear),
  },
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),
}));
