"use client";

import { TransferRow } from "@/store/targets";
import PrintGoalTrackerTable from "./print/print-goal-tracker-table";
import { TravelMode } from "@/types/transports";
import PrintTransportEmissionTargets from "./print/print-transport-emissions-targets";
import DistributionsMode from "./print/print-distribution-transfers";
import PrintLoadingStatePage from "../print-loading-page";
import { Header } from "../print/header";
import { usePrintStore } from "@/store/print";
import { MutableRefObject } from "react";
import PrintOverviewInfo from "./print/print-overview-info";

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
    | undefined;
  transportEmissionsTarget:
    | {
        year: number;
        co2Emission: number | null;
        targetCo2Emission: number | null;
      }[]
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

  return (
    <div className=" h-screen  ">
      {isPrinting && <PrintLoadingStatePage />}
      <div ref={componentRef} className=" space-y-4 text-xs  py-4">
        <Header
          title="Relatório de meta de emissão de CO2"
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
