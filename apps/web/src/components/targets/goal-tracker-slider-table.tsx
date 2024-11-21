"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";
import { useTargetsStore } from "@/store/targets";
import { TrendingDown, TrendingUp } from "lucide-react";
import ModalSimulator from "./modal-simulator";

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

type TransferLog = {
  trips: number;
  type: "income" | "outcome";
  from?: string;
  to?: string;
  percentage: number;
};

type FormattedTransportMode = {
  id: string;
  name: string;
  baseTrips: number;
  passengersPerTrip: number;
  totalEmissions: number;
  emissionsPerPassenger: number;
  transferLogs?: TransferLog[];
  icon: JSX.Element | undefined;
};

type Distribution = {
  id: string;
  toMode: string;
  percentage: number;
};

type Transfer = {
  id: string;
  fromMode: string;
  distributions: Distribution[];
};

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
      totalEmissions: Math.trunc(item.co2Emissions),
      emissionsPerPassenger: calculateEmissionsForSingleMode(item),
    };
  });
  return formattedData || [];
};

export default function GoalTrackerSliderTable({ data }: Props) {
  const initialTransportData = transformData(data);
  console.log("initialTransportData", initialTransportData);
  const [transportData, setTransportData] = useState(transformData(data));

  const { setTotalCo2Emission } = useTargetsStore();

  const transportDataTesst = transformData(data);

  function simulateTransfers(
    transportData: FormattedTransportMode[],
    transferData: Transfer[]
  ) {
    // Mapeia os dados de transporte por ID para fácil acesso
    const transportMap = new Map(
      transportData.map((mode) => [
        mode.id,
        { ...mode, transferLogs: [] as TransferLog[] }, // Adiciona transferLogs inicial
      ])
    );

    // Itera sobre cada transferência
    transferData.forEach((transfer) => {
      const fromMode = transportMap.get(transfer.fromMode);

      if (!fromMode) return;

      transfer.distributions.forEach((distribution) => {
        const toMode = transportMap.get(distribution.toMode);

        if (!toMode) return;

        // Step 1: Calculate transferred passengers and trips
        const transferredPassengers =
          fromMode.baseTrips *
          (distribution.percentage / 100) *
          fromMode.passengersPerTrip;
        const newToTrips = transferredPassengers / toMode.passengersPerTrip;

        // Step 2: Update trips for both modes
        const remainingFromTrips =
          fromMode.baseTrips * (1 - distribution.percentage / 100);
        fromMode.baseTrips = remainingFromTrips;
        toMode.baseTrips += newToTrips;

        // Step 3: Calculate new emissions for both modes
        const emissionsFromRemaining =
          remainingFromTrips *
          fromMode.passengersPerTrip *
          fromMode.emissionsPerPassenger;
        const emissionsToNew =
          toMode.baseTrips *
          toMode.passengersPerTrip *
          toMode.emissionsPerPassenger;

        fromMode.totalEmissions = emissionsFromRemaining / 1000; // Convert to tons
        toMode.totalEmissions = emissionsToNew / 1000; // Convert to tons

        // Step 4: Update emissions per passenger
        fromMode.emissionsPerPassenger =
          fromMode.baseTrips > 0
            ? (fromMode.totalEmissions * 1000) /
              (fromMode.baseTrips * fromMode.passengersPerTrip)
            : 0;

        toMode.emissionsPerPassenger =
          toMode.baseTrips > 0
            ? (toMode.totalEmissions * 1000) /
              (toMode.baseTrips * toMode.passengersPerTrip)
            : 0;

        // Step 5: Add transfer logs
        fromMode.transferLogs?.push({
          trips: Math.floor(transferredPassengers / fromMode.passengersPerTrip),
          type: "outcome",
          to: toMode.id,
          percentage: distribution.percentage,
        });

        toMode.transferLogs?.push({
          trips: Math.floor(transferredPassengers / toMode.passengersPerTrip),
          type: "income",
          from: fromMode.id,
          percentage: distribution.percentage,
        });
      });
    });

    // Step 6: Return updated transport data
    return Array.from(transportMap.values());
  }

  const { transfers } = useTargetsStore();

  const handlePassengerChange = (id: string, value: number) => {
    setTransportData((prev) =>
      prev.map((mode) =>
        mode.id === id ? { ...mode, passengersPerTrip: value } : mode
      )
    );
  };

  const updatedTransportData = simulateTransfers(transportDataTesst, transfers);
  console.log("updatedTransportData", updatedTransportData);
  const sumSimulatedTotalCo2Emisisons = updatedTransportData.reduce(
    (acc, mode) => {
      return acc + mode.totalEmissions;
    },
    0
  );

  const originalTotalCo2Emissions = initialTransportData.reduce((acc, mode) => {
    return acc + mode.totalEmissions;
  }, 0);

  useEffect(() => {
    setTotalCo2Emission({
      original: originalTotalCo2Emissions,
      simulated: sumSimulatedTotalCo2Emisisons,
    });
  }, [sumSimulatedTotalCo2Emisisons, originalTotalCo2Emissions]);

  return (
    <Card className="h-full  overflow-y-auto">
      <CardHeader>
        <CardTitle>Dados por Modo de Transporte</CardTitle>
      </CardHeader>
      <ModalSimulator />

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
            {transportData.map((mode) => {
              const initialTransportMode = initialTransportData.find(
                (t) => t.id === mode.id
              );
              const modalTransfers = transfers.find(
                (t) => t.fromMode === mode.id
              );
              const modalDistributions = modalTransfers?.distributions || [];
              const simulatedData = updatedTransportData.find(
                (f) => f.id === mode.id
              );

              const simulatedCo2TotalEmissions = Math.trunc(
                simulatedData?.totalEmissions || 0
              );

              const initialCo2TotalEmissions = Math.trunc(
                initialTransportMode?.totalEmissions || 0
              );

              const totalCo2Variation = Math.trunc(
                simulatedCo2TotalEmissions - initialCo2TotalEmissions
              );

              const percentageVariation =
                (totalCo2Variation / initialCo2TotalEmissions) * 100;

              return (
                <TableRow className="w-full" key={mode.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{mode.icon}</span>
                      <span>{mode.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right flex-1 ">
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
                      {simulatedData?.transferLogs?.map((log) => {
                        if (log.type === "income") {
                          return (
                            <div className="flex justify-end items-center gap-2 text-teal-600">
                              <span>{"->"}</span>
                              <span>{log?.from}</span>
                              <span>{`${log.trips.toLocaleString()}`}</span>
                            </div>
                          );
                        }
                        return (
                          <div className="flex justify-end items-center gap-2 text-red-500 ">
                            <span>{"->"}</span>
                            <span>{log?.to}</span>
                            <span>{`${log.trips.toLocaleString()} (${log.percentage}%)`}</span>
                          </div>
                        );
                      })}
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
                  <TableCell className="text-right flex-1">
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

                    <div className="flex justify-end items-center gap-2 text-slate-600">
                      <span className="flex items-center gap-2">
                        {totalCo2Variation.toLocaleString()}

                        <span className="flex gap-1 items-center">
                          {percentageVariation > 0 ? (
                            <TrendingUp className="h-4 w-4 text-red-400" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-teal-500" />
                          )}
                          <div className={`${percentageVariation > 0}`}>
                            ({percentageVariation.toFixed(1)}
                            %)
                          </div>
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <span className="font-medium">
                        {mode.emissionsPerPassenger.toFixed(2)}
                      </span>

                      {/* {transfers.find(
                        (d) =>
                          d.distributions.find(
                            (dist) => dist.toMode == mode.id
                          ) || transfers?.find((t) => t.fromMode === mode.id)
                      ) && (
                        <>
                          {"->"}
                          <span className=" text-teal-500 font-bold">
                            {
                              updatedTransportData.find((t) => t.id === mode.id)
                                ?.emissionsPerPassenger
                            }
                          </span>
                        </>
                      )} */}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
