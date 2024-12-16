"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { gradientColors } from "@/config/colors";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useBuildingsEnergyFractionsBySector } from "@/hooks/buildings";
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
import type { Payload } from "recharts/types/component/DefaultLegendContent";

const CustomLegend = ({ payload, dict }: { payload?: Payload[], dict: DictionaryContextType['dict'] }) => {
  return (
    <div className="custom-legend w-full flex gap-3 justify-center items-center mt-6">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-sm text-foreground text-center">
            {dict?.ENERGY_FRACTIONS[d.value as string]}
          </span>
        </div>
      ))}
    </div>
  );
};
const CustomTooltip = ({
  active,
  dict,
  payload,
  label,
}: {
  active?: boolean;
  dict: DictionaryContextType['dict']
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
                  <span className="text-foreground font-bold  text-center">
                    {item.dataKey &&
                      dict?.ENERGY_FRACTIONS[
                      item.dataKey as string
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
  dict,
  label,
}: {
  active?: boolean;
  dict: DictionaryContextType['dict'];
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
            <span className="text-foreground font-bold  w-24 text-center">
              {
                dict?.ENERGY_FRACTIONS[
                item.payload.name as string
                ]
              }
            </span>
          </div>
        </div>
        <div>
          <span className="font-bold ">
            {formatNumber(Number(item.payload.payload.co2Emission.toFixed(0)))}{" "}
          </span>
          {dict?.buildings?.sections?.EnergyFractions?.cards?.ImpactOfEnergySourcesOnEmissions?.CustomPieChartTooltip?.[0]}
        </div>
        <div>
          {dict?.buildings?.sections?.EnergyFractions?.cards?.ImpactOfEnergySourcesOnEmissions?.CustomPieChartTooltip?.[1]}
          <span className="font-bold">{(item.value * 100).toFixed(1)}%</span> {dict?.buildings?.sections?.EnergyFractions?.cards?.ImpactOfEnergySourcesOnEmissions?.CustomPieChartTooltip?.[2]}
        </div>
      </div>
    );
  }

  return null;
};

export default function EnergyFractions({ dict }: DictionaryContextType) {
  const { data, isFetching } = useBuildingsEnergyFractionsBySector({});
  const translatedData = {
    totalEmissionCO2ByFraction: data?.totalEmissionCO2ByFraction?.map((totalEmissionCO2ByFraction) => ({
      name: totalEmissionCO2ByFraction.name,
      co2Emission: totalEmissionCO2ByFraction.co2Emission,
      percentage: totalEmissionCO2ByFraction.percentage
    })),
    energyFractions: data?.energyFractions?.map((_energyFractions) => ({
      ..._energyFractions,
      sector: dict?.mappedSectors[_energyFractions?.sector],
    }))
  }
  const barData = translatedData?.energyFractions
    ? Object.entries(translatedData?.energyFractions[0])
      .filter(([key, value]) => key !== "sector")
      .flatMap(([key]) => key)
    : [];

  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {dict?.buildings.sections.EnergyFractions.title}
        </h2>
        <p className="text-muted-foreground max-w-lg">
          {dict?.buildings.sections.EnergyFractions.description}
        </p>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 ">
        {isFetching ? (
          <Skeleton className="h-[490px] w-full first:rounded-xl" />
        ) : (
          <Card className="p-6  overflow-auto  xl:w-2/3  ">
            <div className="space-y-4 w-[400px] sm:w-full">
              <h3 className="font-semibold">{dict?.buildings.sections.EnergyFractions.cards.CompositionOfEnergySourcesBySector.title}</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={translatedData?.energyFractions}
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
                      content={<CustomTooltip dict={dict} />}
                    />
                    <Legend content={<CustomLegend dict={dict} />} />
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
          <Skeleton className="h-[490px] w-full" />
        ) : (
          <Card className="p-6  w-full xl:w-1/3">
            <h3 className="font-semibold mb-4">{dict?.buildings.sections.EnergyFractions.cards.ImpactOfEnergySourcesOnEmissions.title}</h3>
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
                  <Legend align="center" content={<CustomLegend dict={dict} />} />
                  <Tooltip
                    content={<CustomPieChartTooltip dict={dict} />}
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
