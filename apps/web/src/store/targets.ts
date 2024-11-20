import { create } from "zustand";

interface TargetsState {
  hypothesisMode: boolean;
  setHypothesisMode: (mode: boolean) => void;
}

export const useTargetsStore = create<TargetsState>()((set, get) => ({
  hypothesisMode: false,
  setHypothesisMode: (mode) => set({ hypothesisMode: mode }),
}));
