import { TravelMode } from "@/types/transports";
import { create } from "zustand";

export type TransportFilters = {
  date?: number[];
  mode?: TravelMode[];
};
interface TransportsState {
  filters: TransportFilters;
  setFilters: (filters: TransportFilters) => void;
}

const lastYear = new Date().getFullYear() - 1;

export const useTransportsStore = create<TransportsState>()((set, get) => ({
  filters: {
    date: [lastYear],
  },
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),
}));
