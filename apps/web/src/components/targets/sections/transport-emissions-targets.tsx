"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_YEAR, TARGET_YEAR } from "@/constants/targets";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { calculateSimulatedCO2Emissions } from "@/services/transports/graphql";
import { useTargetsStore } from "@/store/targets";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultLegendContent";

const currentYear = new Date().getFullYear();
const mappedGoal = {
  targetCo2Emission: "Meta de emissões",
  co2Emission: "Total de emissões",
  simulatedCo2Emission: "Emissões projetadas",
};
function checkEmissionsStatus(
  currentEmission: number | undefined | null,
  targetEmission: number | undefined | null,
  dict: DictionaryContextType['dict']
) {
  if (!currentEmission) return null;
  if (
    targetEmission !== undefined &&
    targetEmission !== null &&
    currentEmission <= targetEmission
  ) {
    return {
      status: dict?.targets?.goalsTracker.cards.transportEmissionTargets.inTheGoal,
      differencePercentage: 0,
    };
  }
  const differencePercentage = targetEmission
    ? ((currentEmission - targetEmission) / targetEmission) * 100
    : 0;
  return {
    status: dict?.targets?.goalsTracker.cards.transportEmissionTargets.outOfTheGoal,
    differencePercentage: differencePercentage?.toFixed(2),
    sugestion:
      targetEmission !== undefined
        ? targetEmission !== null &&
        `Reduza ${formatCO2Emission(currentEmission - targetEmission)} toneladas de CO2 para alcançar a meta`
        : undefined,
  };
}
const CustomLegend = ({ payload, dict }: { payload?: Payload[], dict: DictionaryContextType['dict'] }) => {
  return (
    <div className="custom-legend w-full flex gap-3 justify-center items-center mt-8">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-sm text-foreground text-center">
            {dict?.mappedGoal[d?.value as keyof typeof dict.mappedGoal]}
          </span>
        </div>
      ))}
    </div>
  );
};
const CustomTooltip = ({
  active,
  payload,
  label,
  dict
}: {
  active?: boolean;
  payload?: Payload[];
  label?: string;
  dict: DictionaryContextType['dict']
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
        {label}
        {payload.map((item, index) => {
          return (
            !!item.value && (
              <div
                key={index}
                className="flex gap-10 items-center justify-between "
              >
                <div className="flex items-center  gap-2  h-10">
                  <div
                    className="w-[14px] h-[14px] rounded-xs"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-foreground font-bold  text-center">
                    {dict?.mappedGoal[item?.dataKey as keyof typeof dict.mappedGoal] || ""}
                  </span>
                </div>
                {formatCO2Emission(item.value) || 0} tons
              </div>
            )
          );
        })}
      </div>
    );
  }
};
type DataEntry = {
  year: number;
  co2Emission: number | null;
  targetCo2Emission: number | null;
  simulatedCo2Emission?: number | null;
};

interface Props {
  data?: {
    year: number;
    co2Emission: number | null;
    targetCo2Emission: number | null;
    simulatedCo2Emission?: number | null;
  }[];
  dict: DictionaryContextType['dict'];
}
export default function TransportEmissionTargets({ data = [], dict }: Props) {
  const [transportEmissionData, setTransportEmissionData] = useState<
    DataEntry[]
  >([]);

  const { totalCo2Emission, hypothesisMode } = useTargetsStore();
  function updateSimulatedEmissions(
    data: DataEntry[],
    simulatedRaw: Record<string, number>
  ): DataEntry[] {
    return data.map((entry) => {
      const rawValue = simulatedRaw[entry.year.toString()];
      if (rawValue !== undefined) {
        return {
          ...entry,
          simulatedCo2Emission: rawValue,
        };
      }
      return entry;
    });
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (data || !hypothesisMode) {
      setTransportEmissionData(data);
    }
    if (hypothesisMode && totalCo2Emission.percentage) {
      const simulatedCo2Emission = calculateSimulatedCO2Emissions(
        totalCo2Emission?.original,
        totalCo2Emission?.simulated
      );

      let updatedData = updateSimulatedEmissions(data, simulatedCo2Emission);

      let lastYearData = updatedData?.find(
        (item) => item.year === currentYear - 1
      );
      if (lastYearData && !lastYearData.simulatedCo2Emission) {
        lastYearData.simulatedCo2Emission = lastYearData.co2Emission || null;
      }
      setTransportEmissionData(updatedData);
    }
  }, [data, totalCo2Emission.percentage, hypothesisMode]);
  const isFetching = false;

  const lastYearData = data?.find((item) => item.year === currentYear - 1);
  const currentYearEmissionStatus = checkEmissionsStatus(
    lastYearData?.co2Emission,
    lastYearData?.targetCo2Emission,
    dict
  );
  return (
    <div className="overflow-y-auto">
      {isFetching ? (
        <Skeleton className="h-[495px]" />
      ) : (
        <Card className="p-6 h-full w-[500px] sm:w-full">
          <div className="mb-8 space-y-2 ">
            <div className="text-sm text-muted-foreground">
              {dict?.targets?.goalsTracker.cards.transportEmissionTargets.title}
            </div>
            <div
              className={"flex gap-3 items-center text-3xl font-bold text-gray-500 "}
            >
              {currentYearEmissionStatus?.status}
              <div className={"rounded-lg bg-gray-200 p-2 "}>
                <Target className={"h-5 w-5 text-gray-500 "} />
              </div>
            </div>
          </div>

          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={transportEmissionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis
                  dataKey="year"
                  stroke="#888888"
                  fontSize={12}
                  tickMargin={18}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickMargin={10}
                  tickFormatter={(value: number) => {
                    return `${formatCO2Emission(value) || 0}`;
                  }}
                />
                <Legend content={<CustomLegend dict={dict?.targets?.goalsTracker.cards.transportEmissionTargets.chart} />} />
                <Tooltip content={<CustomTooltip dict={dict?.targets?.goalsTracker.cards.transportEmissionTargets.chart} />} />
                <Line
                  type="monotone"
                  dataKey="co2Emission"
                  stroke={"#22ccb2"}
                  strokeWidth={1.5}
                  dot={{
                    fill: "#059669",
                    stroke: "#fff",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    fill: "#9aeee2",
                    stroke: "#fff",
                    strokeWidth: 2,
                    r: 6,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="targetCo2Emission"
                  strokeDasharray="3 3"
                  stroke="#3C3744"
                  strokeWidth={1.5}
                  dot={{
                    fill: "#84828F",
                    stroke: "#fff",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    strokeWidth: 2,
                    r: 6,
                  }}
                />
                {hypothesisMode && totalCo2Emission.percentage && (
                  <Line
                    type="monotone"
                    dataKey="simulatedCo2Emission"
                    stroke="#5117ff"
                    strokeWidth={1.5}
                    dot={{
                      fill: "#794dfa",
                      stroke: "#fff",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{
                      strokeWidth: 2,
                      r: 6,
                    }}
                  />
                )}

                <ReferenceLine
                  x={BASE_YEAR}
                  stroke="#bab8b8"
                  strokeWidth={1}
                  label={{
                    value: dict?.targets?.goalsTracker.cards.transportEmissionTargets.chart.ReferenceLine_BASE_YEAR,
                    position: "bottom",
                    fill: "#bab8b8",
                    fontSize: 12,
                    offset: 45,
                  }}
                />
                <ReferenceLine
                  x={TARGET_YEAR}
                  stroke="#bab8b8"
                  strokeWidth={1}
                  label={{
                    value: dict?.targets?.goalsTracker.cards.transportEmissionTargets.chart.ReferenceLine_TARGET_YEAR,
                    position: "bottom",
                    fill: "#bab8b8",
                    fontSize: 12,
                    offset: 45,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}
