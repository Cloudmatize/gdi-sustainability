"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { gradientColors } from "@/config/colors";
import {
  useDictionary,
  type DictionaryContextType,
} from "@/context/DictionaryContext";
import { useBuildingsEnergyFractionsBySector } from "@/hooks/buildings";
import { formatNumber } from "@/utils/format-number";
import {
  Bar,
  BarChart,
  Cell,
  Label,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultLegendContent";

const CustomLegend = ({
  payload,
  dict,
}: {
  payload?: Payload[];
  dict: DictionaryContextType["dict"];
}) => {
  return (
    <div className="custom-legend flex text-xs w-fit gap-3 justify-start items-center mt-6">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[8px] h-[8px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-foreground text-center text-xs">
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
  dict: DictionaryContextType["dict"];
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
                      dict?.ENERGY_FRACTIONS[item.dataKey as string]}
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

const renderCustomizedLabelBarChart = (props: any) => {
  const { value, x, width, y } = props;
  const radius = 20;
  return (
    <g>
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#333635"
        textAnchor="middle"
        fontSize={10}
        dominantBaseline="middle"
      >
        {(value * 100).toFixed(2)}%
      </text>
    </g>
  );
};

const renderCustomizedLabelPieChart = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
  dict,
}: any) => {
  const RADIAN = Math.PI / 180;

  const radius = innerRadius + (outerRadius - innerRadius) * 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      <text x={x} dy="0">
        {dict?.ENERGY_FRACTIONS[payload.name as string]}
      </text>
      <tspan x={x} dy="1.2em" className="font-bold">
        {formatNumber(Number(payload.co2Emission.toFixed(0)))}{" "}
        {
          dict?.buildings?.sections?.EnergyFractions?.cards
            ?.ImpactOfEnergySourcesOnEmissions?.CustomPieChartTooltip?.[0]
        }
      </tspan>
      <tspan x={x} dy="1.2em">
        <tspan className="font-bold">
          {(payload.percentage * 100).toFixed(1)}%
        </tspan>{" "}
        {
          dict?.buildings?.sections?.EnergyFractions?.cards
            ?.ImpactOfEnergySourcesOnEmissions?.CustomPieChartTooltip?.[2]
        }{" "}
        ({dict?.ENERGY_FRACTIONS[payload.name as string]})
      </tspan>
    </text>
  );
};

const CustomPieChartTooltip = ({
  active,
  payload,
  dict,
  label,
}: {
  active?: boolean;
  dict: DictionaryContextType["dict"];
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
              {dict?.ENERGY_FRACTIONS[item.payload.name as string]}
            </span>
          </div>
        </div>
        <div>
          <span className="font-bold ">
            {formatNumber(Number(item.payload.payload.co2Emission.toFixed(0)))}{" "}
          </span>
          {
            dict?.buildings?.sections?.EnergyFractions?.cards
              ?.ImpactOfEnergySourcesOnEmissions?.CustomPieChartTooltip?.[0]
          }
        </div>
        <div>
          {
            dict?.buildings?.sections?.EnergyFractions?.cards
              ?.ImpactOfEnergySourcesOnEmissions?.CustomPieChartTooltip?.[1]
          }
          <span className="font-bold">{(item.value * 100).toFixed(1)}%</span>{" "}
          {
            dict?.buildings?.sections?.EnergyFractions?.cards
              ?.ImpactOfEnergySourcesOnEmissions?.CustomPieChartTooltip?.[2]
          }
        </div>
      </div>
    );
  }

  return null;
};

export default function PrintEnergyFractions() {
  const { data, isFetching } = useBuildingsEnergyFractionsBySector({});
  const { dict } = useDictionary();
  const translatedData = {
    totalEmissionCO2ByFraction: data?.totalEmissionCO2ByFraction?.map(
      (totalEmissionCO2ByFraction) => ({
        name: totalEmissionCO2ByFraction.name,
        co2Emission: totalEmissionCO2ByFraction.co2Emission,
        percentage: totalEmissionCO2ByFraction.percentage,
      })
    ),
    energyFractions: data?.energyFractions?.map((_energyFractions) => ({
      ..._energyFractions,
      sector: dict?.mappedSectors[_energyFractions?.sector],
    })),
  };

  const barData = translatedData?.energyFractions
    ? Object.entries(translatedData?.energyFractions[0])
        .filter(([key, value]) => key !== "sector")
        .flatMap(([key]) => key)
    : [];

  return (
    <div className="space-y-12 py-6 text-xs min-w-[1200px]  md:w-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold text-foreground mb-2">
          {dict?.buildings.sections.EnergyFractions.title}
        </h2>
        <p className=" text-muted-foreground max-w-lg">
          {dict?.buildings.sections.EnergyFractions.description}
        </p>
      </div>
      <div className="flex gap-6 flex-row">
        {isFetching ? (
          <Skeleton className="h-[300px] w-full first:rounded-xl" />
        ) : (
          <Card className="p-6 ">
            <div className="space-y-4 w-[435px] sm:w-full">
              <h3 className="font-semibold">
                {
                  dict?.buildings.sections.EnergyFractions.cards
                    .CompositionOfEnergySourcesBySector.title
                }
              </h3>
              <div className=" h-[250px]  min-w-[435px]  md:w-1/2 ">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={translatedData?.energyFractions}
                    layout="vertical"
                    stackOffset="expand"
                    margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
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
                    <Label />
                    <Legend
                      align="left"
                      content={<CustomLegend dict={dict} />}
                    />
                    {barData?.map((fraction, index) => {
                      return (
                        <Bar
                          isAnimationActive={false}
                          maxBarSize={20}
                          dataKey={fraction}
                          key={`${fraction}-${index}`}
                          radius={
                            barData.length === index + 1 ? [0, 4, 4, 0] : 0
                          }
                          stackId="a"
                          fill={gradientColors[index]}
                          name={fraction}
                        >
                          <LabelList
                            dataKey={fraction}
                            fill="white"
                            fontSize={8}
                            formatter={(value: number) =>
                              `${(value * 100).toFixed(2)}%`
                            }
                            content={renderCustomizedLabelBarChart}
                          />
                        </Bar>
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
          <Card className="p-6 ">
            <h3 className="font-semibold mb-4">
              {
                dict?.buildings.sections.EnergyFractions.cards
                  .ImpactOfEnergySourcesOnEmissions.title
              }
            </h3>
            <div className="  h-[250px] min-w-[535px]  md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    isAnimationActive={false}
                    data={data?.totalEmissionCO2ByFraction}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label={(props) =>
                      renderCustomizedLabelPieChart({ ...props, dict })
                    }
                    dataKey="percentage"
                  >
                    {data?.totalEmissionCO2ByFraction?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={gradientColors[index % gradientColors.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    align="center"
                    content={<CustomLegend dict={dict} />}
                  />
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
