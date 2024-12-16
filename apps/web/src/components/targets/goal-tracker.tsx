"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BASE_YEAR, REDUCTION_RATE, TARGET_YEAR } from "@/constants/targets";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useTargetsCO2EmissionByModal } from "@/hooks/targets";
import { useTransportCO2EmissionByYear } from "@/hooks/transports";
import { calculateCityEmissionTargets } from "@/services/transports/graphql";
import { usePrintStore } from "@/store/print";
import { useTargetsStore } from "@/store/targets";
import type { TravelMode } from "@/types/transports";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";
import { cx } from "class-variance-authority";
import { CalendarClock, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PrintButton } from "../print-button";
import { Sidebar } from "../sidebar";
import { Skeleton } from "../ui/skeleton";
import GoalCard from "./goal-card";
import GoalTrackerTable from "./goal-tracker-table";
import MultiModalSimulatorTransferSimulator from "./modal-trips-transfer-simulator";
import PrintTargetReportPage from "./print-target-report-page";
import TransportEmissionTargets from "./sections/transport-emissions-targets";
import TargetAdherenceCard from "./target-adherence-card";

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

export default function GoalTracker({ dict }: DictionaryContextType) {
  const { data: co2EmissionByYear, isFetching: loadingCo2EmissionByYear } =
    useTransportCO2EmissionByYear({});
  const {
    data: targetsCo2EmissionByModal,
    isFetching: loadingTargetsCo2EmissionByModal,
  } = useTargetsCO2EmissionByModal();
  const [openSidebar, setOpenSidebar] = useState(false);

  const transportEmissionsTarget = transformData(co2EmissionByYear || []);
  const modalData = targetsCo2EmissionByModal?.map((data) => {
    return {
      id: data?.mode,
      name: dict?.mappedTravelMode[data.mode as TravelMode],
      icon: getIconByTransportMode({
        mode: data.mode,
        asChild: true,
        className: "text-slate-700 h-4 w-4",
      }),
    };
  });

  const { hypothesisMode, setHypothesisMode, transfers, totalCo2Emission } =
    useTargetsStore();

  useEffect(() => {
    return () => {
      setHypothesisMode(false);
      setOpenSidebar(false);
    };
  }, []);

  const contentRef = useRef(null);

  const lastYearCo2Emission =
    co2EmissionByYear?.find(
      (item) => item.year === new Date().getFullYear() - 1
    )?.co2Emission || 0;

  const targetCo2EmissionsFinalYear =
    transportEmissionsTarget?.[transportEmissionsTarget.length - 1];

  const yearBaseCo2Emission = co2EmissionByYear?.[0]?.co2Emission || 0;

  const printContent = {
    lastYearCo2Emission,
    targetCo2EmissionsFinalYear,
    yearBaseCo2Emission,
    targetsCo2EmissionByModal,
    transportEmissionsTarget,
    transfers,
    totalCo2Emission,
  };

  const { isPrinting } = usePrintStore();
  return (
    <>
      <div
        className={cx(
          "container mx-auto space-y-6",
          isPrinting ? "hidden" : ""
        )}
      >
        {hypothesisMode && (
          <Sidebar
            canSeeSidebarAfterMinimalize
            isOpen={openSidebar}
            setIsOpen={setOpenSidebar}
          >
            <MultiModalSimulatorTransferSimulator
              dict={dict}
              printContent={printContent}
              data={modalData || []}
            />
          </Sidebar>
        )}
        <div className="flex justify-end w-full gap-6">
          <PrintButton
            title="Imprimir Metas de Emissão de CO2"
            disabled={false}
            contentToPrint={contentRef}
          />
          <div className="flex items-center  space-x-2">
            <Switch
              disabled={
                loadingTargetsCo2EmissionByModal || loadingCo2EmissionByYear
              }
              checked={hypothesisMode}
              onCheckedChange={(value) => {
                setHypothesisMode(value);
                setOpenSidebar(value);
              }}
              id="hypothesis-mode"
            />
            <Label htmlFor="hypothesis-mode">
              {dict?.targets?.goalsTracker.simulation.title}
            </Label>
          </div>
        </div>
        <div className="space-y-3 py-1 w-full">
          <div
            className={cx(
              "grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
            )}
          >
            <div
              className={cx(
                "h-full col-span-2 lg:col-span-1",
                hypothesisMode ? "col-span-2 lg:col-span-1" : ""
              )}
            >
              {loadingCo2EmissionByYear ? (
                <Skeleton className="h-[185px]" />
              ) : (
                <GoalCard
                  icon={CalendarClock}
                  title={dict?.targets?.goalsTracker.cards.baseYear.title}
                  value={String(BASE_YEAR)}
                  subLabel={dict?.targets?.goalsTracker.cards.baseYear.subLabel}
                  subValue={Math.trunc(yearBaseCo2Emission).toLocaleString()}
                  subUnit={dict?.targets?.goalsTracker.cards.baseYear.subUnit}
                />
              )}
            </div>
            <div
              className={cx(
                "h-full col-span-2 lg:col-span-1",
                hypothesisMode ? "col-span-2 lg:col-span-1" : ""
              )}
            >
              {loadingCo2EmissionByYear ? (
                <Skeleton className="h-[185px]" />
              ) : (
                <GoalCard
                  icon={Target}
                  title={dict?.targets?.goalsTracker.cards.target.title}
                  value={TARGET_YEAR}
                  subLabel={`${dict?.targets?.goalsTracker.cards.target.subLabel} (-${REDUCTION_RATE}%)`}
                  subValue={Math.trunc(
                    yearBaseCo2Emission * ((100 - REDUCTION_RATE) / 100)
                  ).toLocaleString()}
                  subUnit={dict?.targets?.goalsTracker.cards.target.subUnit}
                />
              )}
            </div>
            <div
              className={cx(
                "h-full col-span-2 md:col-span-2",
                hypothesisMode ? "" : ""
              )}
            >
              {loadingCo2EmissionByYear ? (
                <Skeleton className="h-[185px]" />
              ) : (
                <TargetAdherenceCard
                  targetYear={TARGET_YEAR}
                  baseEmissions={lastYearCo2Emission || 0}
                  targetEmissions={
                    targetCo2EmissionsFinalYear.targetCo2Emission || 0
                  }
                  dict={dict}
                />
              )}
            </div>
          </div>
        </div>
        {hypothesisMode && (
          <GoalTrackerTable
            dict={dict}
            data={targetsCo2EmissionByModal || []}
          />
        )}
        {loadingCo2EmissionByYear ? (
          <Skeleton className="h-[500px]" />
        ) : (
          <TransportEmissionTargets
            dict={dict}
            data={transportEmissionsTarget}
          />
        )}
      </div>
      {isPrinting && (
        <PrintTargetReportPage
          componentRef={contentRef}
          data={printContent}
          isHistoryReport={hypothesisMode}
        />
      )}
    </>
  );
}
