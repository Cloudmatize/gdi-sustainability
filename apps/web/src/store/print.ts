import { create } from "zustand";

interface BuildingState {
  isPrinting: boolean;
  setIsPrinting: (isPrinting: boolean) => void;
}

export const usePrintStore = create<BuildingState>()((set, get) => ({
  isPrinting: false,
  setIsPrinting: (isPrinting) =>
    set((state) => ({
      isPrinting,
    })),
}));
