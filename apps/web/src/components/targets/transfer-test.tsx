"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  AlertCircle,
  Car,
  Bus,
  Bike,
  Train,
  PersonStanding,
} from "lucide-react";
import { useTargetsStore } from "@/store/targets";

interface Distribution {
  id: string;
  toMode: string;
  percentage: number;
}

interface TransferRow {
  id: string;
  fromMode: string;
  distributions: Distribution[];
}

interface TransportMode {
  id: string;
  name: string;
  icon: JSX.Element | undefined;
  baseTrips: number;
  tripPercentage: number;
  passengersPerTrip: number;
  totalEmissions: number;
  emissionsPerPassenger: number;
}

// Mocked transport modes data
const formattedData: TransportMode[] = [
  {
    id: "AUTOMOBILE",
    name: "Automóvel",
    icon: <Car className="h-4 w-4" />,
    baseTrips: 1574189068,
    tripPercentage: 0,
    passengersPerTrip: 1.5,
    totalEmissions: 3027871,
    emissionsPerPassenger: 1.28,
  },
  {
    id: "BUS",
    name: "Ônibus",
    icon: <Bus className="h-4 w-4" />,
    baseTrips: 71675566,
    tripPercentage: 0,
    passengersPerTrip: 40,
    totalEmissions: 558306,
    emissionsPerPassenger: 0.19,
  },
  {
    id: "MOTORCYCLE",
    name: "Motocicleta",
    icon: <Bike className="h-4 w-4" />,
    baseTrips: 189521914,
    tripPercentage: 0,
    passengersPerTrip: 1,
    totalEmissions: 124178,
    emissionsPerPassenger: 0.65,
  },
  {
    id: "RAIL",
    name: "Trem",
    icon: <Train className="h-4 w-4" />,
    baseTrips: 5642438,
    tripPercentage: 0,
    passengersPerTrip: 250,
    totalEmissions: 0,
    emissionsPerPassenger: 0,
  },
  {
    id: "ON_FOOT",
    name: "A pé",
    icon: <PersonStanding className="h-4 w-4" />,
    baseTrips: 49430651,
    tripPercentage: 0,
    passengersPerTrip: 1,
    totalEmissions: 0,
    emissionsPerPassenger: 0,
  },
];

export default function MultiModalSimulatorTransferTest() {
  const [enabled, setEnabled] = useState(false);
  const { transfers, setTransfers } = useTargetsStore();

  console.log("transfers", transfers);
  const addTransferRow = () => {
    const newId = (transfers.length + 1).toString();
    setTransfers([
      ...transfers,
      {
        id: newId,
        fromMode: "AUTOMOBILE",
        distributions: [],
      },
    ]);
  };

  const addDistribution = (transferId: string) => {
    setTransfers(
      transfers.map((transfer) => {
        if (transfer.id === transferId) {
          const newDistId = (transfer.distributions.length + 1).toString();
          return {
            ...transfer,
            distributions: [
              ...transfer.distributions,
              {
                id: newDistId,
                toMode: formattedData[0].id,
                percentage: 0,
              },
            ],
          };
        }
        return transfer;
      })
    );
  };

  const removeDistribution = (transferId: string, distributionId: string) => {
    setTransfers(
      transfers.map((transfer) => {
        if (transfer.id === transferId) {
          return {
            ...transfer,
            distributions: transfer.distributions.filter(
              (d) => d.id !== distributionId
            ),
          };
        }
        return transfer;
      })
    );
  };

  const updateDistribution = (
    transferId: string,
    distributionId: string,
    field: keyof Distribution,
    value: string | number
  ) => {
    setTransfers(
      transfers.map((transfer) => {
        if (transfer.id === transferId) {
          const distributions = transfer.distributions.map((dist) => {
            if (dist.id === distributionId) {
              return { ...dist, [field]: value };
            }
            return dist;
          });
          return { ...transfer, distributions };
        }
        return transfer;
      })
    );
  };

  const getTotalPercentage = (distributions: Distribution[]) => {
    return distributions.reduce((sum, dist) => sum + dist.percentage, 0);
  };

  const getAvailablePercentage = (distributions: Distribution[]) => {
    return 100 - getTotalPercentage(distributions);
  };

  return (
    <Card className="w-full h-full overflow-y-auto ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">
          Simulador de Substituição de Modal
        </CardTitle>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </CardHeader>
      <CardContent className="space-y-6">
        {transfers.map((transfer) => (
          <div key={transfer.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <Select
                value={transfer.fromMode}
                onValueChange={(value) => {
                  setTransfers(
                    transfers.map((t) =>
                      t.id === transfer.id ? { ...t, fromMode: value } : t
                    )
                  );
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formattedData.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id}>
                      <div className="flex items-center gap-2">
                        {mode.icon}
                        <span>{mode.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="secondary">
                {getAvailablePercentage(transfer.distributions)}% disponível
              </Badge>
            </div>

            <div className="space-y-4">
              {transfer.distributions.map((dist) => (
                <div key={dist.id} className="flex items-center gap-4">
                  <Select
                    value={dist.toMode}
                    onValueChange={(value) =>
                      updateDistribution(transfer.id, dist.id, "toMode", value)
                    }
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formattedData
                        .filter((mode) => mode.id !== transfer.fromMode)
                        .map((mode) => (
                          <SelectItem key={mode.id} value={mode.id}>
                            <div className="flex items-center gap-2">
                              {mode.icon}
                              <span>{mode.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <div className="flex-1">
                    <Slider
                      value={[dist.percentage]}
                      onValueChange={(value) => {
                        const newPercentage = value[0];
                        const otherDistTotal = transfer.distributions
                          .filter((d) => d.id !== dist.id)
                          .reduce((sum, d) => sum + d.percentage, 0);

                        if (newPercentage + otherDistTotal <= 100) {
                          updateDistribution(
                            transfer.id,
                            dist.id,
                            "percentage",
                            newPercentage
                          );
                        }
                      }}
                      max={100}
                      step={1}
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {dist.percentage}% das viagens de{" "}
                      {
                        formattedData.find((d) => d.id === transfer.fromMode)
                          ?.name
                      }{" "}
                     transferidas para{" "}
                      {formattedData.find((d) => d.id === dist.toMode)?.name}

                    </div>
                  </div>

                  {transfer.distributions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDistribution(transfer.id, dist.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              {getAvailablePercentage(transfer.distributions) > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addDistribution(transfer.id)}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar distribuição
                </Button>
              )}
            </div>

            {getTotalPercentage(transfer.distributions) > 100 && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span>O total não pode exceder 100%</span>
              </div>
            )}
          </div>
        ))}

        <Button variant="outline" onClick={addTransferRow} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar transferência
        </Button>
      </CardContent>
    </Card>
  );
}
