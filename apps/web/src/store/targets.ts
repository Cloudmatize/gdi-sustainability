import { create } from "zustand";

interface Distribution {
  id: string;
  toMode: string;
  percentage: number;
}

interface TransferRow {
  id: string;
  fromMode: string;
  distributions: Distribution[];
}

interface TargetsState {
  hypothesisMode: boolean;
  setHypothesisMode: (mode: boolean) => void;
  transfers: TransferRow[];
  setTransfers: (transfers: TransferRow[]) => void;
}

export const useTargetsStore = create<TargetsState>()((set, get) => ({
  hypothesisMode: false,
  setHypothesisMode: (mode) => set({ hypothesisMode: mode }),
  transfers: [],
  setTransfers: (transfers) => set({ transfers }),
}));
