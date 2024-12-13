"use client";

import { useDictionary } from "@/context/DictionaryContext";
import { usePrintStore } from "@/store/print";
import type { TransferRow } from "@/store/targets";
import type { TravelMode } from "@/types/transports";
import type { MutableRefObject } from "react";
import PrintLoadingStatePage from "../print-loading-page";
import { Header } from "../print/header";
import DistributionsMode from "./print/print-distribution-transfers";
import PrintGoalTrackerTable from "./print/print-goal-tracker-table";
import PrintOverviewInfo from "./print/print-overview-info";
import PrintTransportEmissionTargets from "./print/print-transport-emissions-targets";

export interface TargetPrintContentData {
  totalCo2Emission: {
    original: number;
    simulated: number;
    percentage: number;
  };
  transfers: TransferRow[];
  yearBaseCo2Emission: number;
  lastYearCo2Emission: number;
  targetCo2EmissionsFinalYear: {
    targetCo2Emission: number | null;
    year: number;
    co2Emission: number | null;
  };
  targetsCo2EmissionByModal:
  | {
    mode: TravelMode;
    co2Emissions: number;
    trips: number;
  }[]
  | null
  | undefined;
  transportEmissionsTarget:
  | {
    year: number;
    co2Emission: number | null;
    targetCo2Emission: number | null;
  }[]
  | null
  | undefined;
}
interface Props {
  componentRef?: MutableRefObject<null>;
  title?: string;
  date?: string;
  isHistoryReport?: boolean;
  data: TargetPrintContentData;
}

export default function PrintTargetReportPage({
  componentRef,
  isHistoryReport = false,
  date,
  title,
  data: {
    transfers,
    totalCo2Emission,
    yearBaseCo2Emission,
    lastYearCo2Emission,
    targetCo2EmissionsFinalYear,
    targetsCo2EmissionByModal,
    transportEmissionsTarget,
  },
}: Props) {
  const hypothesisMode = isHistoryReport ? true : false;
  const { isPrinting } = usePrintStore();
  const { dict } = useDictionary()

  return (
    <div className=" h-screen">
      {isPrinting && <PrintLoadingStatePage />}
      <div ref={componentRef} className=" space-y-4 text-xs  py-4">
        <Header
          title={dict?.print?.targetsHeaderTitle}
          subtitle={title}
          generatedAt={date}
        />
        <div className="px-8  space-y-3">
          <div className="pb-10 pt-5 px-4">
            <PrintOverviewInfo
              totalCo2Emission={totalCo2Emission}
              lastYearCo2Emission={lastYearCo2Emission}
              yearBaseCo2Emission={yearBaseCo2Emission}
              hypothesisMode={hypothesisMode}
              targetCo2EmissionsFinalYear={
                targetCo2EmissionsFinalYear.targetCo2Emission || 0
              }
            />
          </div>

          <div>
            <DistributionsMode transfers={(transfers as any) || []} />
          </div>
          {hypothesisMode && (
            <div className="mt-8 border rounded-lg">
              <PrintGoalTrackerTable
                data={targetsCo2EmissionByModal || []}
                transfers={transfers}
              />
            </div>
          )}
          <div className="pt-8 ">
            <PrintTransportEmissionTargets
              hypothesisMode={hypothesisMode}
              totalCo2Emission={totalCo2Emission}
              data={transportEmissionsTarget || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
