"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { gradientColors } from "@/config/colors";
import { ENERGY_FRACTIONS } from "@/constants/buildings";
import { useBuildingsEnergyIntensitiesBySector } from "@/hooks/buildings";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

const CustomLegend = ({ payload }: { payload?: Payload[] }) => {
  return (
    <div className="custom-legend  flex flex-wrap gap-3 justify-center items-center ">
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
    const item = payload[0];
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
        <div className="flex gap-2 items-center ">
          <div className="flex items-center gap-2  h-10  ">
            <div
              className="w-[14px] h-[14px] rounded-xs"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-800 font-bold  w-24 text-center">
              {ENERGY_FRACTIONS[label as keyof typeof ENERGY_FRACTIONS]}
            </span>
          </div>
          {item.value} kg/kWh
        </div>
      </div>
    );
  }

  return null;
};
const CustomPieChartTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    value: number;
    payload: {
      fill: string;
      name: string;
    };
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
        <div className="flex gap-2 items-center ">
          <div className="flex items-center gap-2  h-10  ">
            <div
              className="w-[14px] h-[14px] rounded-xs"
              style={{ backgroundColor: item.payload?.fill }}
            />
            <span className="text-slate-800 font-bold  w-24 text-center">
              {
                ENERGY_FRACTIONS[
                  item.payload.name as keyof typeof ENERGY_FRACTIONS
                ]
              }
            </span>
          </div>
          {item.value}%
        </div>
      </div>
    );
  }

  return null;
};

export default function EnergyIntensities() {
  const { data, isFetching } = useBuildingsEnergyIntensitiesBySector({});
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">
          Intensidade de consumo por fonte de energia
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Esta seção mostra a média de emissão de CO2 por quilowatt-hora para
          diferentes fontes de energia.
        </p>
      </div>

      <div className="flex gap-8">
        {isFetching ? (
          <Skeleton className="h-[450px] w-2/3" />
        ) : (
          <Card className="p-6 w-2/3">
            <div className="h-[400px] ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 10, right: 50, left: 40, bottom: 20 }}
                >
                  <XAxis
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
                    tickFormatter={(value: keyof typeof ENERGY_FRACTIONS) =>
                      `${ENERGY_FRACTIONS[value]} `
                    }
                    strokeWidth={0.3}
                    tick={{ fill: "#666" }}
                    type="category"
                    dataKey="name"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    fill="#2DD4BF"
                    maxBarSize={40}
                    radius={[0, 4, 4, 0]}
                    label={{
                      position: "insideLeft",
                      formatter: (value: number) => `${value} kg/kWh`,
                      fill: "#fff",
                      fontSize: 12,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
        {isFetching ? (
          <Skeleton className="h-[450px] flex-1" />
        ) : (
          <Card className="p-6 flex-1">
            <h3 className="font-semibold mb-4">Outros</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="percentage"
                  >
                    {data?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={gradientColors[index % gradientColors.length]}
                      />
                    ))}
                  </Pie>
                  <Legend align="center" content={<CustomLegend />} />
                  <Tooltip
                    content={<CustomPieChartTooltip />}
                    formatter={(value) => `${value}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
