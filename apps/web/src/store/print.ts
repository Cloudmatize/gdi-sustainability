import { create } from "zustand";

interface BuildingState {
  isPrinting: boolean;
  setIsPrinting: (isPrinting: boolean) => void;

  targetContent: any;
  setTargetContent: (targetContent: any) => void;

  buildingsContent: any;
  setBuildingsContent: (buildingsContent: any) => void;

  transportsContent: any;
  setTransportsContent: (transportsContent: any) => void;
}

export const usePrintStore = create<BuildingState>()((set, get) => ({
  isPrinting: false,
  setIsPrinting: (isPrinting) =>
    set((state) => ({
      isPrinting,
    })),

  targetContent: {},
  buildingsContent: {},
  transportsContent: {},
  
  setTargetContent: (targetContent) =>
    set((state) => ({
      targetContent,
    })),
  setBuildingsContent: (buildingsContent) =>
    set((state) => ({
      buildingsContent,
    })),

  setTransportsContent: (transportsContent) =>
    set((state) => ({
      transportsContent,
    })),
}));
