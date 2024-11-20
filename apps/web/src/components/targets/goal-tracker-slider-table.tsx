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

export default function GoalTrackerSliderTable() {
  const [transportData, setTransportData] =
    useState<TransportMode[]>(initialTransportData);

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
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Dados por Modo de Transporte</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
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
            <TableBody>
              {transportData.map((mode) => (
                <TableRow key={mode.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{mode.icon}</span>
                      <span>{mode.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-y-2">
                      <div className="flex justify-end items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {mode.tripPercentage >= 0 ? "+" : ""}
                          {mode.tripPercentage}%
                        </span>
                        <span className="font-medium">
                          {calculateAdjustedTrips(
                            mode.baseTrips,
                            mode.tripPercentage
                          ).toLocaleString()}
                        </span>
                      </div>
                      <Slider
                        min={-50}
                        max={50}
                        step={1}
                        value={[mode.tripPercentage]}
                        onValueChange={(value) =>
                          handleTripPercentageChange(mode.id, value[0])
                        }
                        className="w-[200px] ml-auto"
                      />
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
