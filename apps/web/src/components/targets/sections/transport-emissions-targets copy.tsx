"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransportCO2EmissionByYear } from "@/hooks/transports";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { CalendarClock, Percent, Target } from "lucide-react";
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
import { Payload } from "recharts/types/component/DefaultLegendContent";

const currentYear = new Date().getFullYear();
const mappedGoal = {
  targetCo2Emission: "Meta de emissões",
  co2Emission: "Total de emissões",
};
function checkEmissionsStatus(
  currentEmission: number | undefined | null,
  targetEmission: number | undefined | null
) {
  if (!currentEmission) return null;
  if (
    targetEmission !== undefined &&
    targetEmission !== null &&
    currentEmission <= targetEmission
  ) {
    return {
      status: "Dentro da meta",
      differencePercentage: 0,
    };
  } else {
    const differencePercentage = targetEmission
      ? ((currentEmission - targetEmission) / targetEmission) * 100
      : 0;
    return {
      status: "Fora da meta",
      differencePercentage: differencePercentage?.toFixed(2),
      sugestion:
        targetEmission !== undefined
          ? targetEmission !== null &&
            `Reduza ${formatCO2Emission(currentEmission - targetEmission)} toneladas de CO2 para alcançar a meta`
          : undefined,
    };
  }
}
const CustomLegend = ({ payload }: { payload?: Payload[] }) => {
  return (
    <div className="custom-legend w-full flex gap-3 justify-center items-center mt-8">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-sm text-slate-700 text-center">
            {mappedGoal[d?.value as keyof typeof mappedGoal]}
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
  if (active && payload && payload.length) {
    const currentItem = payload[0].payload;
    const emissionsStatus = checkEmissionsStatus(
      (currentItem as any)?.co2Emission,
      (currentItem as any)?.targetCo2Emission
    );
    const { status, differencePercentage, sugestion } = emissionsStatus || {};
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
        {label}
        <div className="flex flex-col">
          <div
            style={{
              color: !differencePercentage ? "" : "#e53e3e",
            }}
            className={`my-1 text-teal-700 font-semibold `}
          >
            {status && status}
          </div>
          {!!differencePercentage && (
            <div>{differencePercentage}% de diferença</div>
          )}
          {!!sugestion && (
            <div className="text-muted-foreground text-sm">{sugestion}</div>
          )}
        </div>
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
                  <span className="text-slate-800 font-bold  text-center">
                    {mappedGoal[item?.dataKey as keyof typeof mappedGoal] || ""}
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

export default function TransportEmissionTargets() {
  const { data, isFetching } = useTransportCO2EmissionByYear();

  const lastYearData = data?.find((item) => item.year === currentYear - 1);
  const currentYearEmissionStatus = checkEmissionsStatus(
    lastYearData?.co2Emission,
    lastYearData?.targetCo2Emission
  );
  return (
    <div className="min-h-screen bg-background">
      {isFetching ? (
        <Skeleton className="h-[540px]" />
      ) : (
        <Card className="p-6">
          <div className="mb-8 space-y-2">
            <div className="text-sm text-muted-foreground">
              Grau de aderência a meta
            </div>
            <div
              className={`flex gap-3 items-center text-3xl font-bold text-gray-500 `}
            >
              {currentYearEmissionStatus?.status}
              <div className={`rounded-lg bg-gray-200 p-2 `}>
                <Target className={`h-5 w-5 text-gray-500 `} />
              </div>
            </div>
          </div>

          <div className="h-[400px] ">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
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
                <Legend content={<CustomLegend />} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="co2Emission"
                  stroke={"#22ccb2"}
                  strokeWidth={2}
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
                  stroke="#bab8b8"
                  strokeWidth={0.8}
                  dot={{
                    fill: "#bab8b8",
                    stroke: "#fff",
                    r: 2,
                  }}
                  activeDot={{
                    r: 4,
                  }}
                />

                <ReferenceLine
                  x={2019}
                  stroke="#bab8b8"
                  strokeWidth={1}
                  label={{
                    value: "Ano de referência",
                    position: "top",
                    fill: "#bab8b8",
                    fontSize: 12,
                  }}
                />
                <ReferenceLine
                  x={2030}
                  stroke="#bab8b8"
                  strokeWidth={1}
                  label={{
                    value: "Ano de conclusão da meta",
                    position: "left",
                    fill: "#bab8b8",
                    fontSize: 12,
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
