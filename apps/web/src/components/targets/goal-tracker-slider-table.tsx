"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";

interface TransportMode {
  id: string;
  name: string;
  icon: string;
  baseTrips: number;
  tripPercentage: number;
  passengersPerTrip: number;
  totalEmissions: number;
  emissionsPerPassenger: number;
}

const initialTransportData: TransportMode[] = [
  {
    id: "car",
    name: "Automóveis",
    icon: "🚗",
    baseTrips: 1574189068,
    tripPercentage: 0,
    passengersPerTrip: 1.5,
    totalEmissions: 3027871,
    emissionsPerPassenger: 1.28,
  },
  {
    id: "motorcycle",
    name: "Motocicletas",
    icon: "🛵",
    baseTrips: 189521914,
    tripPercentage: 0,
    passengersPerTrip: 1,
    totalEmissions: 124178,
    emissionsPerPassenger: 0.65,
  },
  {
    id: "bus",
    name: "Ônibus",
    icon: "🚌",
    baseTrips: 71675566,
    tripPercentage: 0,
    passengersPerTrip: 40,
    totalEmissions: 558306,
    emissionsPerPassenger: 0.19,
  },
];
interface TransportModeReal {
  mode: string;
  co2Emissions: number;
  trips: number;
}

interface Props {
  data: TransportModeReal[];
}

const passengersPerTripMapping: { [key: string]: number } = {
  AUTOMOBILE: 1.5,
  BUS: 40,
  MOTORCYCLE: 1,
  RAIL: 1,
  "ON FOOT": 1,
  CYCLING: 1,
};

type TravelMode =
  | "BUS"
  | "RAIL"
  | "SUBWAY"
  | "CYCLING"
  | "ON FOOT"
  | "AUTOMOBILE"
  | "MOTORCYCLE"
  | "PLANE";

interface TravelData {
  mode: TravelMode;
  co2Emissions: number; // CO₂ emissions in tons
  trips: number; // Total number of trips
}

interface EmissionsResult {
  mode: TravelMode;
  emissionsPerPassenger: number; // Emissions in kg per passenger
}

// function calculateEmissionsPerPassenger(data: TravelData[]): EmissionsResult[] {
//   return data.map((entry) => {
//     const totalPassengers = entry.trips * passengersPerTripMapping[entry.mode];
//     const emissionsInKg = entry.co2Emissions * 1000; // Convert tons to kg
//     const emissionsPerPassenger =
//       totalPassengers > 0 ? emissionsInKg / totalPassengers : 0;

//     return {
//       mode: entry.mode,
//       emissionsPerPassenger: emissionsPerPassenger,
//     };
//   });
// }

interface SimulationResult {
  newTrips: number;
  newCo2Emissions: number; // CO₂ emissions in tons
  newEmissionsPerPassenger: number; // Emissions in kg/passenger
}

function simulateTransport(
  data: TransportModeReal,
  newTrips: number
): SimulationResult {
  // Calculating the ratio of trips
  const tripRatio = newTrips / data.trips;

  // Emissions scale linearly with trips
  const newCo2Emissions = data.co2Emissions * tripRatio;

  // Total passengers also scale with trips
  const totalPassengers = newTrips * passengersPerTripMapping[data.mode];

  // Convert emissions to kg and calculate per passenger
  const emissionsInKg = newCo2Emissions * 1000; // Convert tons to kg
  const newEmissionsPerPassenger =
    totalPassengers > 0 ? emissionsInKg / totalPassengers : 0;

  return {
    newTrips,
    newCo2Emissions,
    newEmissionsPerPassenger,
  };
}

function calculateEmissionsForSingleMode(data: TransportModeReal): number {
  const totalPassengers = data.trips * passengersPerTripMapping[data.mode];
  const emissionsInKg = data.co2Emissions * 1000; // Convert tons to kg

  return totalPassengers > 0 ? emissionsInKg / totalPassengers : 0;
}

const transformData = (data?: TransportModeReal[]) => {
  const formattedData = data?.map((item) => {
    return {
      id: item.mode,
      name: item.mode,
      icon: getIconByTransportMode(item.mode),
      baseTrips: item.trips,
      tripPercentage: 0,
      passengersPerTrip: passengersPerTripMapping[item.mode] || 1,
      totalEmissions: item.co2Emissions,
      emissionsPerPassenger: calculateEmissionsForSingleMode(item),
    };
  });
  return formattedData || [];
};

export default function GoalTrackerSliderTable({ data }: Props) {
  const [transportData, setTransportData] = useState(transformData(data));

  const handleTripPercentageChange = (id: string, percentage: number) => {
    setTransportData((prev) =>
      prev.map((mode) =>
        mode.id === id ? { ...mode, tripPercentage: percentage } : mode
      )
    );
  };

  const handlePassengerChange = (id: string, value: number) => {
    setTransportData((prev) =>
      prev.map((mode) =>
        mode.id === id ? { ...mode, passengersPerTrip: value } : mode
      )
    );
  };

  const calculateAdjustedTrips = (baseTrips: number, percentage: number) => {
    return baseTrips * (1 + percentage / 100);
  };

  return (
    <Card className="h-full  overflow-y-auto">
      <CardHeader>
        <CardTitle>Dados por Modo de Transporte</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="w-full ">
          <TableHeader>
            <TableRow>
              <TableHead>Modal</TableHead>
              <TableHead className="text-right">Viagens Totais</TableHead>
              <TableHead className="text-right">Passageiros/Viagem</TableHead>
              <TableHead className="text-right">
                Emissões Totais (ton)
              </TableHead>
              <TableHead className="text-right">
                Emissões/Passageiro (kgCO₂)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="pb-5  w-full ">
            {transportData.map((mode) => (
              <TableRow className="w-full" key={mode.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{mode.icon}</span>
                    <span>{mode.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="space-y-2">
                    <div className="flex justify-end items-center gap-2">
                      <span className="font-medium">
                        {mode.baseTrips?.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {mode.tripPercentage >= 0 ? "+" : ""}
                        {mode.tripPercentage}%
                      </span>
                      {' ->'}
                      <span className="font-medium">
                        {calculateAdjustedTrips(
                          mode.baseTrips,
                          mode.tripPercentage
                        ).toLocaleString()}
                      </span>
                    </div>
                    {/* <Slider
                      min={-50}
                      max={50}
                      step={1}
                      value={[mode.tripPercentage]}
                      onValueChange={(value: number[]) =>
                        handleTripPercentageChange(mode.id, value[0])
                      }
                      className="w-[200px] ml-auto"
                    /> */}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    value={mode.passengersPerTrip}
                    onChange={(e) =>
                      handlePassengerChange(mode.id, Number(e.target.value))
                    }
                    className="w-20 text-right"
                  />
                </TableCell>
                <TableCell className="text-right">
                  {mode.totalEmissions.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {mode.emissionsPerPassenger.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
