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
import { useTransportCO2EmissionByYear } from "@/hooks/transports";
import { useTargetsCO2EmissionByModal } from "@/hooks/targets";
import { calculateCityEmissionTargets } from "@/services/transports/graphql";
import { BASE_YEAR, TARGET_YEAR } from "@/constants/targets";

export interface TargetPrintContentData {
  totalCo2Emission: {
    original: number;
    simulated: number;
    percentage: number;
  };
  transfers: TransferRow[];
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
  data: { transfers, totalCo2Emission },
}: Props) {
  const hypothesisMode = isHistoryReport ? true : false;
  const { isPrinting } = usePrintStore();

  const { data: co2EmissionByYear } = useTransportCO2EmissionByYear({});
  const { data: targetsCo2EmissionByModal } = useTargetsCO2EmissionByModal();
  const transportEmissionsTarget = transformData(co2EmissionByYear || []);

  const targetCo2EmissionsFinalYear =
    transportEmissionsTarget?.[transportEmissionsTarget.length - 1];

  const yearBaseCo2Emission = co2EmissionByYear?.[0]?.co2Emission || 0;
  const lastYearCo2Emission =
    co2EmissionByYear?.find(
      (item) => item.year === new Date().getFullYear() - 1
    )?.co2Emission || 0;

  return (
    <div className=" h-screen  ">
      {isPrinting && <PrintLoadingStatePage />}
      <div ref={componentRef} className=" space-y-4 text-xs  py-4">
        <Header
          title="Progresso das Metas de Redução de Emissões"
          subtitle={`Monitoramento do progresso rumo à meta de redução de emissões de CO₂ até ${TARGET_YEAR}. Inclui análise de aderência, comparação com o ano base de ${BASE_YEAR} e projeções futuras para diferentes meios de transporte.`}
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
