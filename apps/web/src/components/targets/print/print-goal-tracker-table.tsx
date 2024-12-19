"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import {
  passengersPerTripMapping
} from "@/constants/transports";
import { useDictionary } from "@/context/DictionaryContext";
import { useTargetsStore } from "@/store/targets";
import type { TravelMode } from "@/types/transports";
import { getIconByTransportMode } from "@/utils/get-icon-by-transport-mode";
import { calculateEmissionsForSingleMode } from "@/utils/transports/calculate-emission-for-single-mode";
import { RotateCcw, TrendingDown, TrendingUp } from "lucide-react";
import PrintModalSimulator from "./print-modal-simulator";

interface TransportModeReal {
  mode: string;
  co2Emissions: number;
  trips: number;
}

interface Props {
  data: TransportModeReal[];
  transfers: Transfer[];
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
  data: TransportModeReal[],
  passengersPerTripData: { [key: string]: number }
): FormattedTransportMode[] => {
  const formattedData = data?.map((item) => {
    return {
      id: item.mode,
      name: item.mode,
      icon: getIconByTransportMode({
        mode: item.mode,
        asChild: true,
        className: "text-slate-700 h-3 w-3",
      }),
      baseTrips: item.trips,
      tripPercentage: 0,
      passengersPerTrip: passengersPerTripData[item.mode] || 1,
      totalEmissions: Math.trunc(item.co2Emissions),
      emissionsPerPassenger: calculateEmissionsForSingleMode(
        item,
        passengersPerTripData
      ),
    };
  });
  return formattedData || [];
};

function simulateTransfers(
  transportData: FormattedTransportMode[],
  transferData: Transfer[]
) {
  const transportMap = new Map(
    transportData.map((mode) => [
      mode.id,
      { ...mode, transferLogs: [] as TransferLog[] },
    ])
  );

  transferData.map((transfer) => {
    const fromMode = transportMap.get(transfer.fromMode);

    if (!fromMode) return;

    transfer.distributions.map((distribution) => {
      const toMode = transportMap.get(distribution.toMode);

      if (!toMode) return;

      const transferredPassengers =
        fromMode.baseTrips *
        (distribution.percentage / 100) *
        fromMode.passengersPerTrip;
      const newToTrips = transferredPassengers / toMode.passengersPerTrip;

      const remainingFromTrips =
        fromMode.baseTrips * (1 - distribution.percentage / 100);
      fromMode.baseTrips = remainingFromTrips;
      toMode.baseTrips += newToTrips;

      const emissionsFromRemaining =
        remainingFromTrips *
        fromMode.passengersPerTrip *
        fromMode.emissionsPerPassenger;
      const emissionsToNew =
        toMode.baseTrips *
        toMode.passengersPerTrip *
        toMode.emissionsPerPassenger;

      fromMode.totalEmissions = emissionsFromRemaining / 1000;
      toMode.totalEmissions = emissionsToNew / 1000;

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

  return Array.from(transportMap.values());
}

export default function PrintGoalTrackerTable({ data, transfers }: Props) {
  const { dict } = useDictionary()
  const [passengersPerTripData, setPassengersPerTripData] = useState(
    passengersPerTripMapping
  );
  const initialTransportData = transformData(data, passengersPerTripData);

  const [transportData, setTransportData] = useState(initialTransportData);

  const [simulatedCo2Emissions, setSimulatedCo2Emissions] = useState(
    [] as FormattedTransportMode[]
  );

  const { setTotalCo2Emission } = useTargetsStore();


  const handlePassengerChange = (id: string, value: number) => {
    setPassengersPerTripData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    setTransportData(transformData(data, passengersPerTripData));
  }, [passengersPerTripData]);

  useEffect(() => {
    const simulatedCo2EmissionsData = simulateTransfers(
      initialTransportData,
      transfers
    );
    const sumSimulatedTotalCo2Emisisons = simulatedCo2EmissionsData?.reduce(
      (acc, mode) => {
        return acc + mode.totalEmissions;
      },
      0
    );

    const originalTotalCo2Emissions = initialTransportData?.reduce(
      (acc, mode) => {
        return acc + mode.totalEmissions;
      },
      0
    );
    setTotalCo2Emission({
      original: originalTotalCo2Emissions,
      simulated: Math.trunc(sumSimulatedTotalCo2Emisisons),
    });
    setSimulatedCo2Emissions(simulatedCo2EmissionsData);
  }, [transfers, passengersPerTripData]);
  return (
    <div className="h-full w-full border-0">
      <CardHeader>
        <CardTitle>
          {dict?.targets?.goalsTracker?.cards?.goalTrackerTable?.title} (
          {new Date().getFullYear() - 1})
        </CardTitle>
      </CardHeader>
      <PrintModalSimulator />

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs ">{dict?.targets?.goalsTracker?.cards?.goalTrackerTable?.content?.table?.th1}</TableHead>
              <TableHead className="text-end text-xs flex-1">
                {dict?.targets?.goalsTracker?.cards?.goalTrackerTable?.content?.table?.th2}
              </TableHead>

              <TableHead className="text-end text-xs flex-1">
                {dict?.targets?.goalsTracker?.cards?.goalTrackerTable?.content?.table?.th4} (ton)
              </TableHead>
              <TableHead className="text-end text-xs">
                {dict?.targets?.goalsTracker?.cards?.goalTrackerTable?.content?.table?.th3}
              </TableHead>
              <TableHead className="text-end text-xs">
                {dict?.targets?.goalsTracker?.cards?.goalTrackerTable?.content?.table?.th5} (kgCO₂)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="pb-5  w-full text-xs ">
            {transportData.map((mode, index) => {
              const initialTransportMode = initialTransportData.find(
                (t) => t.id === mode.id
              );
              const simulatedData = simulatedCo2Emissions?.find(
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

              const hasDistributionToMode = transfers.find((d) =>
                d.distributions.some((dist) => dist.toMode === mode.id)
              );

              const hasTransferFromMode = transfers.find(
                (t) => t.fromMode === mode.id
              );

              const updatedModeData = simulatedCo2Emissions?.find(
                (t) => t.id === mode.id
              );

              const baseTrips = Math.trunc(
                updatedModeData?.baseTrips || 0
              ).toLocaleString();

              const showBaseTrips =
                hasDistributionToMode || hasTransferFromMode;

              const totalEmissions = Math.trunc(
                updatedModeData?.totalEmissions || 0
              );

              const showTotalEmissions =
                hasDistributionToMode || hasTransferFromMode;

              const totalCo2VariationColor =
                totalCo2Variation > 0
                  ? "text-red-500"
                  : "text-primary-foreground";
              const percentageVariationColor =
                percentageVariation < 0
                  ? "text-primary-foreground"
                  : "text-red-500";
              return (
                <TableRow className="w-full" key={`${mode.id}-${index}`}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{mode.icon}</span>
                      <span>{dict?.mappedTravelMode[mode.name as TravelMode]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right  w-[50%] ">
                    <div className="space-y-1">
                      <div className="flex justify-end items-center gap-2">
                        <span className="font-medium">
                          {mode.baseTrips?.toLocaleString()}
                        </span>

                        {showBaseTrips && (
                          <>
                            {"➜"}
                            <span className="text-primary-foreground font-bold">
                              {baseTrips}
                            </span>
                          </>
                        )}
                      </div>
                      {simulatedData?.transferLogs?.map((log, index) => {
                        if (log.type === "income") {
                          return (
                            <div
                              key={`${log}-${index}`}
                              className="flex justify-end items-center gap-1 text-primary-foreground"
                            >
                              <span>{"➜"}</span>
                              <span>
                                {getIconByTransportMode({
                                  mode: log?.from as TravelMode,
                                  asChild: true,
                                  className: " w-3 h-3",
                                })}
                              </span>
                              <span>{`${log.trips.toLocaleString()}`}</span>
                            </div>
                          );
                        }
                        return (
                          <div
                            key={`${log}-${index}`}
                            className="flex justify-end items-center gap-1 text-red-500 "
                          >
                            <span>{"➜"}</span>
                            <span className="text-red-500">
                              {getIconByTransportMode({
                                mode: log?.to as TravelMode,
                                asChild: true,
                                className: "text-red-500 w-3 h-3",
                              })}
                            </span>

                            <span>{`${log.trips.toLocaleString()} (${log.percentage}%)`}</span>
                          </div>
                        );
                      })}
                    </div>
                  </TableCell>

                  <TableCell className="text-right w-[50%] ">
                    <div className="space-y-1">
                      <div className="flex justify-end items-center gap-2 ">
                        <span className="font-medium">
                          {mode.totalEmissions.toLocaleString()}
                        </span>

                        {showTotalEmissions && !!totalEmissions && (
                          <>
                            {"➜"}
                            <span className="text-primary-foreground font-bold">
                              {totalEmissions.toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>

                      {!!totalCo2Variation && (
                        <div className="flex justify-end items-center gap-1 text-slate-600">
                          <span className="flex items-center gap-1">
                            <span className={`${totalCo2VariationColor}`}>
                              {totalCo2Variation.toLocaleString()}
                            </span>

                            <span className="flex gap-1 items-center">
                              {percentageVariation > 0 ? (
                                <TrendingUp className="h-4 w-4 text-destructive-foreground  " />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-primary-foreground " />
                              )}
                              <div className={`${percentageVariationColor}`}>
                                ({percentageVariation.toFixed(1)}
                                %)
                              </div>
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-10  ">
                    <div className="flex items-center justify-end ">
                      {mode.passengersPerTrip !==
                        passengersPerTripMapping[mode.id] && (
                          <button
                            type="button"
                            onClick={() =>
                              handlePassengerChange(
                                mode.id,
                                passengersPerTripMapping[mode.id]
                              )
                            }
                            className="mr-4 text-gray-500 hover:text-gray-700  "
                          >
                            <RotateCcw className="ml-1 h-3 w-3" />
                          </button>
                        )}
                      <div className="w-10 text-center">
                        {mode.passengersPerTrip}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <span className="font-medium">
                        {mode.emissionsPerPassenger.toFixed(2)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  );
}
