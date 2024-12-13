import { TargetPrintContentData } from "@/components/targets/print-target-report-page";
import { TravelMode } from "@/types/transports";
import { create } from "zustand";

interface Distribution {
  id: string;
  toMode: string;
  percentage: number;
}

export interface TransferRow {
  id: string;
  fromMode: string;
  distributions: Distribution[];
}

export interface ReportSimulationHistory {
  reportName: string;
  generatedDate: string;
  data: TargetPrintContentData;
}

interface TargetsState {
  hypothesisMode: boolean;
  setHypothesisMode: (mode: boolean) => void;
  transfers: TransferRow[];
  setTransfers: (transfers: TransferRow[]) => void;

  reportSimulationsHistory: ReportSimulationHistory[];
  setReportSimulationsHistory: (history: ReportSimulationHistory[]) => void;
  totalCo2Emission: {
    original: number;
    simulated: number;
    percentage: number;
  };
  setTotalCo2Emission: ({
    original,
    simulated,
  }: {
    original: number;
    simulated: number;
  }) => void;
}

export const useTargetsStore = create<TargetsState>()((set, get) => ({
  hypothesisMode: false,
  setHypothesisMode: (mode) => set({ hypothesisMode: mode }),
  transfers: [],
  setTransfers: (transfers) => set({ transfers }),
  totalCo2Emission: {
    original: 0,
    simulated: 0,
    percentage: 0,
  },
  setTotalCo2Emission: ({ original, simulated }) => {
    const percentage = ((original - simulated) / original) * 100;
    set({ totalCo2Emission: { original, simulated, percentage } });
  },
  reportSimulationsHistory: [],
  setReportSimulationsHistory: (history) =>
    set({ reportSimulationsHistory: history }),
}));
