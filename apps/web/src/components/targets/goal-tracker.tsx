"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Car,
  Bus,
  Bike,
  AlertCircle,
  CalendarClock,
  Target,
} from "lucide-react";
import GoalIndexDescription from "./goal-card";
import GoalCard from "./goal-card";
import TransportEmissionTargets from "./sections/transport-emissions-targets";
import GoalTrackerSliderTable from "./goal-tracker-slider-table";
import GoalTrackerModalSelect from "./goal-tracker-modal-select";
import { useTargetsStore } from "@/store/targets";
import { TargetAdherenceCard } from "./target-adherence-card";
import { useTargetsCO2EmissionByModal } from "@/hooks/targets";
import TransportStatsCard from "./transport-stats-card";
import TransportStats2 from "./transports-stats-card-2";
import ModalSimulator from "./modal-simulator";
import MultiModalSimulatorTransferTest from "./transfer-test";
import { CO2_EMISSION_BY_YEAR_TARGETS_MOCK } from "@/mock/target";

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

  const [carToBusShift, setCarToBusShift] = useState(0);

  const totalEmissions = transportData.reduce(
    (sum, transport) =>
      sum +
      (transport.trips * transport.emissionsPerTrip) / transport.avgPassengers,
    0
  );

  const targetAdherence = (1 - totalEmissions / targetEmissions) * 100;

  const updateTransportData = (
    index: number,
    field: keyof TransportData,
    value: number
  ) => {
    const newData = [...transportData];
    newData[index] = { ...newData[index], [field]: value };
    setTransportData(newData);
  };

  const applyHypothesis = () => {
    const newData = [...transportData];
    const carIndex = newData.findIndex((t) => t.type === "car");
    const busIndex = newData.findIndex((t) => t.type === "bus");

    const shiftedTrips = newData[carIndex].trips * (carToBusShift / 100);
    newData[carIndex].trips -= shiftedTrips;
    newData[busIndex].trips += shiftedTrips;

    setTransportData(newData);
  };

  const resetData = () => {
    setTransportData(initialData);
    setCarToBusShift(0);
  };

  const getIcon = (type: TransportType) => {
    switch (type) {
      case "car":
        return <Car className="h-6 w-6" />;
      case "bus":
        return <Bus className="h-6 w-6" />;
      case "bike":
        return <Bike className="h-6 w-6" />;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-end w-full  ">
        <div className="flex items-center  space-x-2">
          <Switch
            checked={hypothesisMode}
            onCheckedChange={setHypothesisMode}
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
      {hypothesisMode && <TransportStats2 data={data || []} />}
      {/* {hypothesisMode && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data?.map((item) => <TransportStatsCard data={item} />)}
        </div>
      )} */}
      {hypothesisMode && (
        <div className="flex flex-col gap-6">
          <GoalTrackerSliderTable data={data || []} />
        </div>
      )}
      {/* {hypothesisMode && (
        <div className="flex gap-4 w-full h-[330px] ">
          <div className="w-4/5 ">
            <GoalTrackerSliderTable data={data || []} />
          </div>
          <div className="">
            <GoalTrackerModalSelect />
          </div>
        </div>
      )} */}
      <div className=" gap-3 flex h-[370px]">
        <div className="w-2/3 h-full ">
          <MultiModalSimulatorTransferTest />
        </div>
        <div className="w-1/3">

        {/* <ModalSimulator /> */}
        </div>

      </div>
      <TransportEmissionTargets />
    </div>
  );
}
