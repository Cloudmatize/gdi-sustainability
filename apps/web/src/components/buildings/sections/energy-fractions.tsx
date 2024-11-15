"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { gradientColors } from "@/config/colors";
import { ENERGY_FRACTIONS } from "@/constants/buildings";
import { useBuildingsEnergyFractionsBySector } from "@/hooks/buildings";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { formatNumber } from "@/utils/format-number";
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
      payload: {
        co2Emission: number;
      };
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
        </div>
        <div>
          <span className="font-bold ">
            {formatNumber(Number(item.payload.payload.co2Emission.toFixed(0)))}{" "}
          </span>
          tons de CO2 emitidos
        </div>
        <div>
          Equivale à{" "}
          <span className="font-bold">{(item.value * 100).toFixed(1)}%</span> do
          total
        </div>
      </div>
    );
  }

  return null;
};

export default function EnergyFractions() {
  const { data, isFetching } = useBuildingsEnergyFractionsBySector({});
  const barData = data
    ? Object.entries(data.energyFractions[0])
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
      <div className="flex gap-8">
        {isFetching ? (
          <Skeleton className="h-[490px] w-3/4 first: rounded-xl" />
        ) : (
          <Card className="p-6 w-3/4">
            <div className="space-y-4">
              <h3 className="font-semibold">Fração da fonte de energia</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data?.energyFractions}
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
                          radius={
                            barData.length === index + 1 ? [0, 4, 4, 0] : 0
                          }
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
        {isFetching ? (
          <Skeleton className="h-[490px] flex-1" />
        ) : (
          <Card className="p-6 flex-1">
            <h3 className="font-semibold mb-4">Emissão de CO2</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.totalEmissionCO2ByFraction}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="percentage"
                  >
                    {data?.totalEmissionCO2ByFraction?.map((entry, index) => (
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
