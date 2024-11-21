"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { CalendarClock, Target } from "lucide-react";
import TransportEmissionTargets from "./sections/transport-emissions-targets";
import GoalTrackerSliderTable from "./goal-tracker-slider-table";
import { useTargetsStore } from "@/store/targets";
import { TargetAdherenceCard } from "./target-adherence-card";
import MultiModalSimulatorTransferTest from "./transfer-test";
import { CO2_EMISSION_BY_YEAR_TARGETS_MOCK } from "@/mock/target";
import GoalCard from "./goal-card";
import { Sidebar } from "../sidebar";

type TransportType = "car" | "bus" | "bike";

interface TransportData {
  type: TransportType;
  trips: number;
  avgPassengers: number;
  emissionsPerTrip: number;
}

const initialData: TransportData[] = [
  { type: "car", trips: 700000, avgPassengers: 1.5, emissionsPerTrip: 2.5 },
  { type: "bus", trips: 250000, avgPassengers: 40, emissionsPerTrip: 10 },
  { type: "bike", trips: 50000, avgPassengers: 1, emissionsPerTrip: 0 },
];

const targetEmissions = 1000000; // Example target in tons of CO2
const targetYear = 2030;

export default function GoalTracker() {
  // const { data } = useTargetsCO2EmissionByModal();
  const data = CO2_EMISSION_BY_YEAR_TARGETS_MOCK;

  const [transportData, setTransportData] =
    useState<TransportData[]>(initialData);

  const { hypothesisMode, setHypothesisMode } = useTargetsStore();

  const totalEmissions = transportData.reduce(
    (sum, transport) =>
      sum +
      (transport.trips * transport.emissionsPerTrip) / transport.avgPassengers,
    0
  );

  const targetAdherence = (1 - totalEmissions / targetEmissions) * 100;

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Sidebar canSeeSidebarAfterMinimalize isOpen={openSidebar} setIsOpen={setOpenSidebar}>
        <MultiModalSimulatorTransferTest />
      </Sidebar>
      {/* <SimulatorSidebar /> */}
      <div className="flex justify-end w-full  ">
        <div className="flex items-center  space-x-2">
          <Switch
            checked={hypothesisMode}
            onCheckedChange={(value) => {
              setHypothesisMode(value);
              setOpenSidebar(value);
            }}
            id="hypothesis-mode"
          />
          <Label htmlFor="hypothesis-mode">Modo Hipótese</Label>
        </div>
      </div>
      <div className="space-y-3 py-1 w-full">
        <div className="grid gap-6 md:grid-cols-3">
          <GoalCard
            icon={CalendarClock}
            title="Ano base"
            value="2018"
            subLabel="Emissão inicial de CO2"
            subValue="100.000"
            subUnit="toneladas de CO2"
          />

          <GoalCard
            icon={Target}
            title="Meta"
            value="2030"
            subLabel="Emissão estimada (-20%)"
            subValue="80.000"
            subUnit="toneladas de CO2"
          />
          <TargetAdherenceCard
            targetAdherence={targetAdherence}
            targetYear={targetYear}
          />
        </div>
      </div>
      {hypothesisMode && (
        <div className="flex flex-col gap-6">
          <GoalTrackerSliderTable data={data || []} />
        </div>
      )}
      <TransportEmissionTargets />
    </div>
  );
}
