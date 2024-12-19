"use client";

import PrintLoadingStatePage from "@/components/print-loading-page";
import { Header } from "@/components/print/header";
import { usePrintStore } from "@/store/print";
import { TransferRow } from "@/store/targets";
import { TravelMode } from "@/types/transports";
import { MutableRefObject } from "react";
import PrintOverviewInfo from "./print-overview-info";
import DistributionsMode from "./print-distribution-transfers";
import PrintGoalTrackerTable from "./print-goal-tracker-table";
import PrintTransportEmissionTargets from "./print-transport-emissions-targets";
import { calculateCityEmissionTargets } from "@/services/transports/graphql";
import { useDictionary } from "@/context/DictionaryContext";

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

const transformData = (
  data: {
    year: number;
    co2Emission: number | null;
  }[]
) => {
  const targetEmissions = calculateCityEmissionTargets(
    data[0]?.co2Emission || 0
  );

  const formattedData: {
    year: number;
    co2Emission: number | null;
    targetCo2Emission: number | null;
  }[] = [];

  const allYears = new Set([
    ...data.map((item) => item.year),
    ...Object.keys(targetEmissions).map((year) => Number.parseInt(year, 10)),
  ]);

  // biome-ignore lint/complexity/noForEach: <explanation>
  allYears.forEach((year) => {
    const co2Emission =
      data.find((item) => item.year === year)?.co2Emission || null;
    const targetCo2Emission = targetEmissions[year] || null;

    formattedData.push({
      year,
      co2Emission,
      targetCo2Emission,
    });
  });
  return formattedData;
};

export default function PrintTargetsPage({
  componentRef,
  isHistoryReport = false,

  date,
  title,
  data: {
    transfers,
    totalCo2Emission,
    lastYearCo2Emission,
    targetCo2EmissionsFinalYear,
    targetsCo2EmissionByModal,
    transportEmissionsTarget,
    yearBaseCo2Emission,
  },
}: Props) {
  const hypothesisMode = isHistoryReport ? true : false;
  const { isPrinting } = usePrintStore();
  const { dict } = useDictionary();

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
