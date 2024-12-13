"use client";

import Image from "next/image";
import { useTargetsStore } from "@/store/targets";
import PrintGoalTrackerTable from "./print/print-goal-tracker-table";
import { TravelMode } from "@/types/transports";
import PrintTransportEmissionTargets from "./print/print-transport-emissions-targets";
import DistributionsMode from "./print/print-distribution-transfers";
import { BASE_YEAR, REDUCTION_RATE, TARGET_YEAR } from "@/constants/targets";
import PrintLoadingStatePage from "../print-loading-page";
import { Header } from "../print/header";

interface Props {
  componentRef: any;
  data: {
    yearBaseCo2Emission: number;
    lastYearCo2Emission: number;
    targetCo2EmissionsFinalYear: {
      targetCo2Emission: number | null;
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
  };
}

const Header_OLD = () => {
  return (
    <div className="p-6 flex  flex-col  border-b border-gray-100  space-y-4  rounded-sm   ">
      <div className="flex justify-between items-center">
        <Image
          src="/logos/logo-go-sustainability.png"
          className="-translate-x-2.5 "
          alt="Company Logo"
          width={130}
          height={130}
        />

        <div className="text-xs text-gray-400/90">
          Gerado em: {new Date().toLocaleDateString()}
        </div>
      </div>

      <h1 className="text-sm font-semibold text-slate-700">
        Relatório de simulações de transferência de viagens nos modais
      </h1>
    </div>
  );
};

const PrintOverviewInfo = ({
  yearBaseCo2Emission = 0,
  lastYearCo2Emission = 0,
  targetCo2EmissionsFinalYear = 0,
  hypothesisMode = false,
}: {
  yearBaseCo2Emission: number;
  lastYearCo2Emission: number;
  targetCo2EmissionsFinalYear: number;
  hypothesisMode?: boolean;
}) => {
  const { totalCo2Emission } = useTargetsStore();
  const { simulated: simulatedEmissions } = totalCo2Emission;

  const baseAdherence =
    (targetCo2EmissionsFinalYear / lastYearCo2Emission) * 100;
  const simulatedAdherence =
    (targetCo2EmissionsFinalYear / simulatedEmissions) * 100;

  return (
    <div className="flex justify-between">
      <div className="space-y-1 ">
        <div className="text-xs font-medium text-gray-500">Ano base</div>
        <div className="text-xl font-bold">{BASE_YEAR}</div>
        <div className="font-semibold text-muted-foreground">
          {Math.trunc(yearBaseCo2Emission).toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">toneladas de CO₂</div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-gray-500">Meta</div>
        <div className="text-xl font-bold">{TARGET_YEAR}</div>
        <div className="font-semibold text-muted-foreground">
          {Math.trunc(
            yearBaseCo2Emission * ((100 - REDUCTION_RATE) / 100)
          ).toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">toneladas de CO₂ (-20%)</div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-gray-500">
          Índice de aderência à meta
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-xl font-bold">{baseAdherence.toFixed(2)}% </div>
          {hypothesisMode && (
            <>
              <span>{"➜"}</span>
              <div className="text-xl font-bold text-violet-600">
                {simulatedAdherence.toFixed(2)}%
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <div className="font-semibold text-muted-foreground">
            {Math.trunc(lastYearCo2Emission).toLocaleString()}
          </div>
          {hypothesisMode && (
            <>
              <span>{"➜"}</span>
              <div className="font-semibold text-violet-600">
                {simulatedEmissions.toLocaleString()}
              </div>
            </>
          )}
        </div>

        <div className="text-xs text-gray-500">toneladas de CO₂</div>
      </div>
    </div>
  );
};

export default function PrintTargetReportPage({
  componentRef,
  data: {
    yearBaseCo2Emission,
    lastYearCo2Emission,
    targetCo2EmissionsFinalYear,
    targetsCo2EmissionByModal,
    transportEmissionsTarget,
  },
}: Props) {
  const { transfers, hypothesisMode } = useTargetsStore();
  return (
    <div className="overflow-y-hidden h-screen ">
      <PrintLoadingStatePage />
      <div ref={componentRef} className=" space-y-4 text-xs ">
        <Header
          title="Relatório de meta de emissão de CO2"
        />
        <div className="px-8  space-y-3">
          <div className="pb-10 pt-5 px-4">
            <PrintOverviewInfo
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
              <PrintGoalTrackerTable data={targetsCo2EmissionByModal || []} />
            </div>
          )}
          <div className="pt-8 ">
            <PrintTransportEmissionTargets
              data={transportEmissionsTarget || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
