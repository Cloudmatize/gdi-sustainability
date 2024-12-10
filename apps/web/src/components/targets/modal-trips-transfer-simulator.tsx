"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useTargetsStore } from "@/store/targets";
import type { TravelMode } from "@/types/transports";
import { Plus, Trash2 } from "lucide-react";

interface Distribution {
  id: string;
  toMode: string;
  percentage: number;
}

interface Props {
  data: {
    id: TravelMode;
    name: string;

    icon: JSX.Element | undefined;
  }[];
  dict: DictionaryContextType['dict']
}
export default function ModalTripsTransferSimulator({ data, dict }: Props) {
  const { transfers, setTransfers } = useTargetsStore();
  const addTransferRow = () => {
    const newDistId = String(Math.floor(Math.random() * 9000) + 1000);
    setTransfers([
      ...transfers,
      {
        id: newDistId,
        fromMode: "",
        distributions: [],
      },
    ]);
  };

  const addDistribution = (transferId: string) => {
    setTransfers(
      transfers.map((transfer) => {
        if (transfer.id === transferId) {
          const newDistId = String(Math.floor(Math.random() * 9000) + 1000);
          return {
            ...transfer,
            distributions: [
              ...transfer.distributions,
              {
                id: newDistId,
                toMode: data[0].id,
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
    <Card className="w-full h-full overflow-y-auto rounded-none ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl text-center font-semibold">
          {dict?.targets?.goalsTracker.simulation.simulator.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 mt-4">
        {transfers.map((transfer) => (
          <div key={transfer.id} className="space-y-4 p-4  rounded-lg">
            <div className="flex items-center gap-5">
              <Badge variant="outline" className="h-8 mr-3 bg-slate-600 text-white font-normal ">
                {dict?.targets?.goalsTracker.simulation.simulator.from}:
              </Badge>
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
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {data.map((mode) => (
                    <SelectItem
                      disabled={
                        mode.id === transfer.fromMode ||
                        transfers.some((t) => t.fromMode === mode.id) ||
                        transfer.distributions.some((d) => d.toMode === mode.id)
                      }
                      key={mode.id}
                      value={mode.id}
                    >
                      <div className="flex items-center gap-2 ">
                        {mode.icon}
                        <span>{mode.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 ">
              {transfer.distributions.map((dist, index) => {
                return (
                  <div
                    key={`${dist.id}-${index}`}
                    className="flex flex-col items-center justify-between gap-4"
                  >
                    <div className="flex gap-3 items-center w-full">
                      <Badge variant="outline" className="h-8 mr-3">
                        {dict?.targets?.goalsTracker.simulation.simulator.to}:
                      </Badge>
                      <Select
                        value={dist.toMode}
                        onValueChange={(value) =>
                          updateDistribution(
                            transfer.id,
                            dist.id,
                            "toMode",
                            value
                          )
                        }
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {data
                            .filter((mode) => mode.id !== transfer.fromMode)
                            .map((mode, index) => (
                              <SelectItem
                                disabled={transfer.distributions.some(
                                  (d) => d.toMode === mode.id
                                )}
                                key={`${mode.id}-${index}`}
                                value={mode.id}
                              >
                                <div className="flex items-center gap-2">
                                  {mode.icon}
                                  <span>{mode.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      {/* {transfer.distributions.length > 1 && ( */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDistribution(transfer.id, dist.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      {/* )} */}
                    </div>

                    <div className="">
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
                        {dist.percentage}% {dict?.targets?.goalsTracker.simulation.simulator.fromMode}{" "}
                        {data.find((d) => d.id === transfer.fromMode)?.name}{" "}
                        {dict?.targets?.goalsTracker.simulation.simulator.toMode}{" "}
                        {data.find((d) => d.id === dist.toMode)?.name}
                      </div>
                    </div>
                  </div>
                );
              })}

              {getAvailablePercentage(transfer.distributions) > 0 &&
                transfer.distributions.length < data.length - 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addDistribution(transfer.id)}
                    className="w-full mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {dict?.targets?.goalsTracker.simulation.simulator.addDistribution}
                  </Button>
                )}
            </div>
          </div>
        ))}
        {transfers.length < 1 && (
          <Button variant="outline" onClick={addTransferRow} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {dict?.targets?.goalsTracker.simulation.simulator.addTransferRow}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
