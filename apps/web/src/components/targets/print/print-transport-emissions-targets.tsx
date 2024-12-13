"use client";

import { BASE_YEAR, TARGET_YEAR } from "@/constants/targets";
import { useDictionary } from "@/context/DictionaryContext";
import { calculateSimulatedCO2Emissions } from "@/services/transports/graphql";
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
function checkEmissionsStatus(
  currentEmission: number | undefined | null,
  targetEmission: number | undefined | null
) {
  const { dict } = useDictionary()
  if (!currentEmission) return null;
  if (
    targetEmission !== undefined &&
    targetEmission !== null &&
    currentEmission <= targetEmission
  ) {
    return {
      status: dict?.targets?.goalsTracker?.cards?.transportEmissionTargets?.inTheGoal,
      differencePercentage: 0,
    };
  }
  const differencePercentage = targetEmission
    ? ((currentEmission - targetEmission) / targetEmission) * 100
    : 0;
  return {
    status: dict?.targets?.goalsTracker?.cards?.transportEmissionTargets?.outOfTheGoal,
    differencePercentage: differencePercentage?.toFixed(2),
    sugestion:
      targetEmission !== undefined
        ? targetEmission !== null &&
        `Reduza ${formatCO2Emission(currentEmission - targetEmission)} toneladas de CO2 para alcançar a meta`
        : undefined,
  };
}
const CustomLegend = ({ payload }: { payload?: Payload[] }) => {
  const { dict } = useDictionary()
  return (
    <div className="custom-legend w-full flex gap-3 justify-start items-center mt-8 ">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-xs text-foreground text-center">
            {dict?.targets?.goalsTracker?.cards?.transportEmissionTargets?.chart?.mappedGoal[d?.value as string] || ""}
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
}: {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}) => {
  const { dict } = useDictionary()
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
                    {dict?.targets?.goalsTracker?.cards?.transportEmissionTargets?.chart?.mappedGoal[item?.dataKey as string] || ""}
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
  hypothesisMode: boolean;
  totalCo2Emission: {
    original: number;
    simulated: number;
    percentage: number;
  };
}
export default function PrintTransportEmissionTargets({
  data = [],
  hypothesisMode,
  totalCo2Emission,
}: Props) {
  const [transportEmissionData, setTransportEmissionData] = useState<
    DataEntry[]
  >([]);

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

  useEffect(() => {
    if (data || !hypothesisMode) {
      setTransportEmissionData(data);
    }
    if (hypothesisMode && totalCo2Emission?.percentage) {
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
  }, [data, totalCo2Emission?.percentage, hypothesisMode]);

  const lastYearData = data?.find((item) => item.year === currentYear - 1);
  const currentYearEmissionStatus = checkEmissionsStatus(
    lastYearData?.co2Emission,
    lastYearData?.targetCo2Emission
  );
  const { dict } = useDictionary()
  return (
    <div className="border rounded-lg ">
      <div className="p-6 h-[500px] w-[300px] sm:w-full text-xs">
        <div className="mb-8 space-y-2 ">
          <div className="text-sm text-muted-foreground">
            {dict?.targets?.goalsTracker?.cards?.transportEmissionTargets?.title}
          </div>
          <div
            className={"flex gap-3 items-center text-lg font-bold text-gray-500 "}
          >
            {currentYearEmissionStatus?.status}
            <div className={"rounded-lg bg-gray-200 p-1.5 "}>
              <Target className={"h-3 w-3 text-gray-500 "} />
            </div>
          </div>
        </div>

        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={transportEmissionData}
              margin={{ top: 20, right: 70, left: 20, bottom: 20 }}
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
              <Legend content={<CustomLegend />} />
              <Tooltip content={<CustomTooltip />} />
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
              {hypothesisMode && totalCo2Emission?.percentage && (
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
                  value: "Ano de referência",
                  position: "bottom",
                  fill: "#bab8b8",
                  fontSize: 10,
                  offset: 45,
                }}
              />
              <ReferenceLine
                x={TARGET_YEAR}
                stroke="#bab8b8"
                strokeWidth={1}
                label={{
                  value: "Ano de conclusão da meta",
                  position: "bottom",
                  fill: "#bab8b8",
                  fontSize: 10,

                  offset: 45,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
