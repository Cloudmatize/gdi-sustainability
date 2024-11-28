"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CalendarClock, Target } from "lucide-react";
import TransportEmissionTargets from "./sections/transport-emissions-targets";
import { useTargetsStore } from "@/store/targets";
import MultiModalSimulatorTransferTest from "./modal-trips-transfer-simulator";
import GoalCard from "./goal-card";
import { Sidebar } from "../sidebar";
import { useTransportCO2EmissionByYear } from "@/hooks/transports";
import { calculateCityEmissionTargets } from "@/services/transports/graphql";
import TargetAdherenceCard from "./target-adherence-card";
import { cx } from "class-variance-authority";
import { useTargetsCO2EmissionByModal } from "@/hooks/targets";
import { mappedTravelMode } from "@/constants/transports";
import { TravelMode } from "@/types/transports";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";
import GoalTrackerTable from "./goal-tracker-table";
import { Skeleton } from "../ui/skeleton";

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
    ...Object.keys(targetEmissions).map((year) => parseInt(year, 10)),
  ]);

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

export default function GoalTracker() {
  const { data: co2EmissionByYear, isFetching: loadingCo2EmissionByYear } =
    useTransportCO2EmissionByYear({});
  const {
    data: targetsCo2EmissionByModal,
    isFetching: loadingTargetsCo2EmissionByModal,
  } = useTargetsCO2EmissionByModal();
  const [openSidebar, setOpenSidebar] = useState(false);

  const transformDataTest = transformData(co2EmissionByYear || []);

  const modalData = targetsCo2EmissionByModal?.map((data) => {
    return {
      id: data?.mode,
      name: mappedTravelMode[data.mode as TravelMode],
      icon: getIconByTransportMode(data?.mode),
    };
  });

  const { hypothesisMode, setHypothesisMode } = useTargetsStore();

  const lastYearCo2Emission =
    co2EmissionByYear?.find(
      (item) => item.year === new Date().getFullYear() - 1
    )?.co2Emission || 0;

  const targetCo2EmissionsFinalYear =
    transformDataTest && transformDataTest[transformDataTest.length - 1];

  const yearBaseCo2Emission = co2EmissionByYear?.[0]?.co2Emission || 0;
  const yearBase = co2EmissionByYear?.[0]?.year || 0;
  return (
    <div className="container mx-auto p-4 space-y-6">
      {hypothesisMode && (
        <Sidebar
          canSeeSidebarAfterMinimalize
          isOpen={openSidebar}
          setIsOpen={setOpenSidebar}
        >
          <MultiModalSimulatorTransferTest data={modalData || []} />
        </Sidebar>
      )}

      <div className="flex justify-end w-full  ">
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
          <Label htmlFor="hypothesis-mode">Realizar simulação</Label>
        </div>
      </div>
      <div className="space-y-3 py-1 w-full">
        <div className={cx("grid gap-3 md:grid-cols-4")}>
          <div
            className={cx(
              "md:col-span-1",
              hypothesisMode ? "md:col-span-1" : ""
            )}
          >
            {loadingCo2EmissionByYear ? (
              <Skeleton className="h-[185px]" />
            ) : (
              <GoalCard
                icon={CalendarClock}
                title="Ano base"
                value={String(yearBase)}
                subLabel="Emissão inicial de CO2"
                subValue={Math.trunc(yearBaseCo2Emission).toLocaleString()}
                subUnit="toneladas de CO2"
              />
            )}
          </div>
          <div
            className={cx(
              "md:col-span-1",
              hypothesisMode ? "md:col-span-1" : ""
            )}
          >
            {loadingCo2EmissionByYear ? (
              <Skeleton className="h-[185px]" />
            ) : (
              <GoalCard
                icon={Target}
                title="Target"
                value="2030"
                subLabel="Emissão estimada (-20%)"
                subValue={Math.trunc(
                  yearBaseCo2Emission * 0.8
                ).toLocaleString()}
                subUnit="toneladas de CO2"
              />
            )}
          </div>

          <div
            className={cx(
              "md:col-span-2",
              hypothesisMode ? "md:col-span-2" : ""
            )}
          >
            {loadingCo2EmissionByYear ? (
              <Skeleton className="h-[185px]" />
            ) : (
              <TargetAdherenceCard
                targetYear={2030}
                baseEmissions={lastYearCo2Emission || 0}
                targetEmissions={
                  targetCo2EmissionsFinalYear.targetCo2Emission || 0
                }
              />
            )}
          </div>
        </div>
      </div>
      {hypothesisMode && (
        <div className="flex flex-col gap-6">
          <GoalTrackerTable data={targetsCo2EmissionByModal || []} />
        </div>
      )}
      {loadingCo2EmissionByYear ? (
        <Skeleton className="h-[500px]" />
      ) : (
        <TransportEmissionTargets data={transformDataTest} />
      )}
    </div>
  );
}
