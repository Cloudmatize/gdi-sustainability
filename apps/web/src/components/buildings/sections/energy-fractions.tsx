"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { gradientColors } from "@/config/colors";
import { ENERGY_FRACTIONS } from "@/constants/buildings";
import { useBuildingsEnergyFractionsBySector } from "@/hooks/buildings";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

const CustomLegend = ({ payload }: { payload?: Payload[] }) => {
  console.log("payload", payload);
  return (
    <div className="custom-legend w-full flex gap-3 justify-center items-center mt-6">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-sm text-slate-700 text-center">
            {ENERGY_FRACTIONS[d.value as keyof typeof ENERGY_FRACTIONS]}
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
                  <span className="text-slate-800 font-bold  text-center">
                    {item.dataKey &&
                      ENERGY_FRACTIONS[
                        item.dataKey as keyof typeof ENERGY_FRACTIONS
                      ]}
                  </span>
                </div>
                {item.value * 100}%
              </div>
            )
          );
        })}
      </div>
    );
  }
};

export default function EnergyFractions() {
  const { data, isFetching } = useBuildingsEnergyFractionsBySector({});
  const barData = data
    ? Object.entries(data[0])
        .filter(([key, value]) => key !== "sector")
        .map(([key]) => key)
        .flat()
    : [];

  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">
          Análise da matriz energética do município
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Esta seção de comparação divide as emissões de CO2 por tipos
          específicos de transporte, proporcionando uma visão sobre a eficiência
          de cada modalidade ao longo do tempo.
        </p>
      </div>
      {isFetching ? (
        <Skeleton className="h-[490px]  rounded-xl" />
      ) : (
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Fração da fonte de energia</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  stackOffset="expand"
                  margin={{ top: 10, right: 30, left: 100, bottom: 20 }}
                >
                  <XAxis
                    tickFormatter={(value) => `${Math.round(value * 100)}%`}
                    type="number"
                    tickSize={1}
                    stroke="#888888"
                    fontSize={12}
                    strokeWidth={0.3}
                    tickMargin={18}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickMargin={10}
                    strokeWidth={0.3}
                    tick={{ fill: "#666" }}
                    type="category"
                    dataKey="sector"
                  />

                  <Tooltip
                    formatter={(value) =>
                      `${(Number(value) * 100).toFixed(1)}%`
                    }
                    content={<CustomTooltip />}
                  />
                  <Legend content={<CustomLegend />} />
                  {barData?.map((fraction, index) => {
                    return (
                      <Bar
                        maxBarSize={40}
                        dataKey={fraction}
                        key={fraction}
                        radius={barData.length === index + 1 ? [0, 4, 4, 0] : 0}
                        stackId="a"
                        fill={gradientColors[index]}
                        name={fraction}
                      />
                    );
                  })}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
