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
      {hypothesisMode && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {transportData.map((transport, index) => (
            <Card key={transport.type}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {transport.type.charAt(0).toUpperCase() +
                    transport.type.slice(1)}
                </CardTitle>
                {getIcon(transport.type)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(
                    (transport.trips * transport.emissionsPerTrip) /
                    transport.avgPassengers /
                    1000000
                  ).toFixed(2)}
                  M
                </div>
                <p className="text-xs text-muted-foreground">
                  toneladas de CO2 por 1.000.000 viagens
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {hypothesisMode && (
        <div className="flex gap-4 w-full h-[300px] ">
          <div className="w-4/5 ">
            <GoalTrackerSliderTable />
          </div>
          <div className="" >
            <GoalTrackerModalSelect />
          </div>
        </div>
      )}

      <TransportEmissionTargets />
    </div>
  );
}
