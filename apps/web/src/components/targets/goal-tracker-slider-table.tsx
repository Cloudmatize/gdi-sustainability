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
import MultiModalSimulator from "./multi-modal-simulator";
import MultiModalSimulatorTransferTest from "./transfer-test";
import { useTargetsStore } from "@/store/targets";

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

interface TransportMode {
  id: string;
  baseTrips: number;
  emissionsPerPassenger: number;
  passengersPerTrip: number;
  totalEmissions: number;
}
interface FormattedTransportMode {
  id: string;
  name: string;
  icon: JSX.Element | undefined;
  baseTrips: number;
  tripPercentage: number;
  passengersPerTrip: number;
  totalEmissions: number;
  emissionsPerPassenger: number;
}

interface Transfer {
  id: string;
  fromMode: string;
  distributions: {
    id: string;
    toMode: string;
    percentage: number;
  }[];
}

function calculateEmissionsForSingleMode(data: TransportModeReal): number {
  // Verifica se os dados são válidos
  if (data.trips <= 0 || passengersPerTripMapping[data.mode] <= 0) {
    return 0; // Evita divisão por zero ou resultados negativos
  }

  // Calcula o total de passageiros usando o mapeamento
  const totalPassengers = data.trips * passengersPerTripMapping[data.mode];

  // Converte emissões de toneladas para quilogramas
  const emissionsInKg = data.co2Emissions * 1000;

  // Calcula emissões por passageiro e evita valores negativos
  return totalPassengers > 0 ? Math.max(emissionsInKg / totalPassengers, 0) : 0;
}

const transformData = (
  data?: TransportModeReal[]
): FormattedTransportMode[] => {
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

  const transportDataTesst = transformData(data);
  console.log("transportDataTesst", transportDataTesst);

  function recalculateEmissions(
    transportData: FormattedTransportMode[],
    transfers: Transfer[]
  ): FormattedTransportMode[] {
    // Faz uma cópia dos dados originais para preservar a integridade
    const updatedData = [...transportData];

    for (const transfer of transfers) {
      const fromMode = updatedData.find(
        (mode) => mode.id === transfer.fromMode
      );
      if (!fromMode) continue;

      for (const distribution of transfer.distributions) {
        const toMode = updatedData.find(
          (mode) => mode.id === distribution.toMode
        );
        if (!toMode) continue;

        // Calcula as viagens transferidas com base na proporção
        const transferredTrips =
          fromMode.baseTrips * (distribution.percentage / 100);

        // Calcula a proporção de impacto considerando passageiros por viagem
        const fromPassengersRatio =
          transferredTrips * fromMode.passengersPerTrip;
        const toPassengersRatio = transferredTrips * toMode.passengersPerTrip;

        // Calcula a redução de emissões no modo de origem
        const reduction = fromPassengersRatio * fromMode.emissionsPerPassenger;

        // Calcula o aumento de emissões no modo de destino
        const increase = toPassengersRatio * toMode.emissionsPerPassenger;

        // Atualiza as emissões totais de cada modal
        //check if the result is < 0
        fromMode.totalEmissions = Math.max(
          fromMode.totalEmissions - reduction,
          0
        );
        toMode.totalEmissions = Math.max(toMode.totalEmissions + increase, 0);

        // Atualiza o número de viagens para cada modal
        fromMode.baseTrips -= transferredTrips;
        toMode.baseTrips += transferredTrips;

        // Recalcula emissões por passageiro para cada modal
        fromMode.emissionsPerPassenger =
          fromMode.baseTrips > 0
            ? calculateEmissionsForSingleMode({
                mode: fromMode.id,
                co2Emissions: fromMode.totalEmissions,
                trips: fromMode.baseTrips * fromMode.passengersPerTrip,
              })
            : 0;

        toMode.emissionsPerPassenger =
          toMode.baseTrips > 0
            ? calculateEmissionsForSingleMode({
                mode: toMode.id,
                co2Emissions: toMode.totalEmissions,
                trips: toMode.baseTrips * toMode.passengersPerTrip,
              })
            : 0;
      }
    }

    return updatedData;
  }
  const { transfers } = useTargetsStore();

  // Recalcula as emissões totais
  const updatedTransportData = recalculateEmissions(
    transportDataTesst,
    transfers
  );

  // Exibe os resultados
  console.log("updatedTransportData", updatedTransportData);
  console.log("transfers", transfers);
  const handlePassengerChange = (id: string, value: number) => {
    setTransportData((prev) =>
      prev.map((mode) =>
        mode.id === id ? { ...mode, passengersPerTrip: value } : mode
      )
    );
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
                <TableCell className="text-right w-56 ">
                  <div className="space-y-2">
                    <div className="flex justify-end items-center gap-2">
                      <span className="font-medium">
                        {mode.baseTrips?.toLocaleString()}
                      </span>

                      {transfers.find(
                        (d) =>
                          d.distributions.find(
                            (dist) => dist.toMode == mode.id
                          ) || transfers?.find((t) => t.fromMode === mode.id)
                      ) && (
                        <>
                          {"->"}
                          <span className=" text-teal-500 font-bold">
                            {updatedTransportData
                              .find((t) => t.id === mode.id)
                              ?.baseTrips.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
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
                <TableCell className="text-right  w-64">
                  <div className="flex justify-end items-center gap-2">
                    <span className="font-medium">
                      {mode.totalEmissions.toLocaleString()}
                    </span>

                    {transfers.find(
                      (d) =>
                        d.distributions.find(
                          (dist) => dist.toMode == mode.id
                        ) || transfers?.find((t) => t.fromMode === mode.id)
                    ) && (
                      <>
                        {"->"}
                        <span className=" text-teal-500 font-bold">
                          {updatedTransportData
                            .find((t) => t.id === mode.id)
                            ?.totalEmissions.toLocaleString()}
                        </span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <span className="font-medium">
                      {mode.emissionsPerPassenger.toFixed(2)}
                    </span>

                    {transfers.find(
                      (d) =>
                        d.distributions.find(
                          (dist) => dist.toMode == mode.id
                        ) || transfers?.find((t) => t.fromMode === mode.id)
                    ) && (
                      <>
                        {"->"}
                        <span className=" text-teal-500 font-bold">
                          {updatedTransportData
                            .find((t) => t.id === mode.id)
                            ?.emissionsPerPassenger.toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
