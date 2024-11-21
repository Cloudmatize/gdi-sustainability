"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Car, Bus, Bike, Plane, AlertCircle } from "lucide-react";
import { Slider } from "../ui/slider";

type TransportType = "car" | "bus" | "bike" | "plane";

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
  { type: "plane", trips: 10000, avgPassengers: 150, emissionsPerTrip: 500 },
];

const emissionsData = [
  { month: "Jan", Carro: 250, Ônibus: 300, Trem: 280, Avião: 150 },
  { month: "Fev", Carro: 300, Ônibus: 200, Trem: 220, Avião: 1800 },
  { month: "Mar", Carro: 280, Ônibus: 250, Trem: 250, Avião: 1200 },
  { month: "Abr", Carro: 270, Ônibus: 280, Trem: 300, Avião: 300 },
  { month: "Mai", Carro: 250, Ônibus: 400, Trem: 380, Avião: 280 },
  { month: "Jun", Carro: 220, Ônibus: 380, Trem: 420, Avião: 250 },
];

const targetEmissions = 1000000;
const targetYear = 2030;
const scenarios = [10];

export default function GoalTrackerModalSelect() {
  const [transportData, setTransportData] =
    useState<TransportData[]>(initialData);
  const [fromTransport, setFromTransport] = useState<TransportType>("car");
  const [percentage, setPercentage] = useState(30);
  console.log("percentage TESTE", percentage);
  const [toTransport, setToTransport] = useState<TransportType>("bus");
  const [isSimulationEnabled, setIsSimulationEnabled] = useState(false);

  const getTransportName = (type: TransportType): string => {
    switch (type) {
      case "car":
        return "Carro";
      case "bus":
        return "Ônibus";
      case "bike":
        return "Bicicleta";
      case "plane":
        return "Avião";
    }
  };

  const getTransportIcon = (type: TransportType) => {
    switch (type) {
      case "car":
        return <Car className="h-4 w-4" />;
      case "bus":
        return <Bus className="h-4 w-4" />;
      case "bike":
        return <Bike className="h-4 w-4" />;
      case "plane":
        return <Plane className="h-4 w-4" />;
    }
  };

  const calculateEmissionReduction = (percentage: number) => {
    const fromData = transportData.find((t) => t.type === fromTransport)!;
    const toData = transportData.find((t) => t.type === toTransport)!;

    const originalEmissions =
      (fromData.trips * fromData.emissionsPerTrip) / fromData.avgPassengers;
    const shiftedTrips = fromData.trips * (percentage / 100);
    const newFromEmissions =
      ((fromData.trips - shiftedTrips) * fromData.emissionsPerTrip) /
      fromData.avgPassengers;
    const newToEmissions =
      ((toData.trips + shiftedTrips) * toData.emissionsPerTrip) /
      toData.avgPassengers;

    const totalReduction =
      originalEmissions - (newFromEmissions + newToEmissions);
    const percentageReduction = (totalReduction / originalEmissions) * 100;

    return percentageReduction.toFixed(2);
  };

  return (
    <Card className="h-full">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2">
          Simulador de Substituição de Modal
          <div className="">
            <Switch
              checked={isSimulationEnabled}
              onCheckedChange={() =>
                setIsSimulationEnabled(!isSimulationEnabled)
              }
              id="enable-replace-modal-simulation"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="from-transport">De:</Label>
            <Select
              disabled={!isSimulationEnabled}
              value={fromTransport}
              onValueChange={(value) =>
                setFromTransport(value as TransportType)
              }
            >
              <SelectTrigger id="from-transport">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {initialData.map((transport) => (
                  <SelectItem key={transport.type} value={transport.type}>
                    <div className="flex items-center">
                      {getTransportIcon(transport.type)}
                      <span className="ml-2">
                        {getTransportName(transport.type)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="to-transport">Para:</Label>
            <Select
              disabled={!isSimulationEnabled}
              value={toTransport}
              onValueChange={(value) => setToTransport(value as TransportType)}
            >
              <SelectTrigger id="to-transport">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {initialData.map((transport) => (
                  <SelectItem key={transport.type} value={transport.type}>
                    <div className="flex items-center">
                      {getTransportIcon(transport.type)}
                      <span className="ml-2">
                        {getTransportName(transport.type)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Porcentagem de viagens substituídas</Label>

            <Slider
              className="fill-teal-400 mt-1"
              disabled={!isSimulationEnabled}
              min={0}
              max={100}
              step={5}
              value={[!isSimulationEnabled ? 0 : percentage]}
              onValueChange={(value: number[]) => setPercentage(value[0])}
            />
          </div>
          <div className="flex flex-col items-start justify-between  w-full">
            <div className=" w-full">
              <div className="text-sm font-medium text-start">
                <span className="font-bold">{percentage}% </span>
                <span>
                  das viagens de {getTransportName(fromTransport)} substituídas
                  por {getTransportName(toTransport)}
                </span>
              </div>
            </div>
            {isSimulationEnabled && (
              <div className="flex flex-col my-2">
                <p className="text-2xl mt-1 font-bold text-teal-500">
                  {calculateEmissionReduction(percentage)}% de redução
                </p>
                <div className="h-2 w-24  bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500"
                    style={{
                      width: `${Math.min(100, Number(calculateEmissionReduction(percentage)))}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
