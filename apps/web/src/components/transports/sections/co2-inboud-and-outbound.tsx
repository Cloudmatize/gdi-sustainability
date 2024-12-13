"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useTransportsCO2EmissionByTravelBounds } from "@/hooks/transports";
import { useTransportsStore } from "@/store/transports";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { formatNumber } from "@/utils/format-number";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultLegendContent";

const CustomTooltip = ({
  active,
  payload,
  label,
  dict
}: {
  active?: boolean;
  payload?: Payload[];
  label?: string;
  dict: DictionaryContextType['dict'];
}) => {
  if (active && payload && payload.length) {
    const mapped: { [key: string]: string } = {
      withinLimit: dict?.transports.sections.CO2InboundAndOutbound.chart.tooltip.withinLimit,
      outsideLimit: dict?.transports.sections.CO2InboundAndOutbound.chart.tooltip.outsideLimit,
    };
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
        <p className="py-1">{dict?.mappedTravelMode[label as string]}</p>
        {payload.map((item, index) => {
          return (
            <div
              key={index}
              className="flex gap-5 items-center justify-between "
            >
              <div className="flex items-center gap-2  h-10">
                <div
                  className="w-[14px] h-[14px] rounded-xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-foreground font-bold   text-center">
                  {mapped[item?.dataKey as string] || ""}
                </span>
              </div>
              {formatNumber(Number(item.value.toFixed(0)))} tons
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

const CustomLegend = ({ payload }: { payload?: Payload[] }) => {
  return (
    <div className="custom-legend w-full flex gap-3 justify-center items-center mt-6">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-sm text-foreground text-center">
            {d?.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function CO2InboundAndOutbound({ dict }: DictionaryContextType) {
  const { filters } = useTransportsStore();

  const { data, isFetching } = useTransportsCO2EmissionByTravelBounds({
    filters,
  });

  const translatedData = data?.map((_data) => ({
    name: dict?.mappedTravelMode[_data?.name],
    withinLimit: _data?.withinLimit,
    outsideLimit: _data?.outsideLimit,
  }))

  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {dict?.transports.sections.CO2InboundAndOutbound.title}
          </h2>
          <p className="text-muted-foreground max-w-lg">
            {dict?.transports.sections.CO2InboundAndOutbound.description}
          </p>
        </div>
      </div>

      {isFetching ? (
        <Skeleton className="h-[450px]" />
      ) : (
        <Card className="p-6 overflow-auto">
          <h3 className="font-semibold text-foreground text-sm mb-6">
            {dict?.transports.sections.CO2InboundAndOutbound.chart.title}
          </h3>
          <div className="h-[400px]  w-[400px] sm:w-full">
            <ResponsiveContainer height="100%">
              <BarChart
                data={translatedData || []}
                margin={{ top: 30 }}
              >
                <XAxis
                  stroke="#888888"
                  fontSize={12}
                  dataKey="name"
                  strokeWidth={0.3}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickFormatter={(value) =>
                    formatCO2Emission(value ?? 0) || "0"
                  }
                  strokeWidth={0.3}
                  tickMargin={10}
                />
                <Tooltip content={<CustomTooltip dict={dict} />} />
                <Legend content={<CustomLegend />} />
                <Bar
                  strokeWidth={1}
                  label={{
                    position: "top",
                    formatter: (value: number) =>
                      value
                        ? `${`${formatNumber(Number(value.toFixed(0)))}`}`
                        : 0,
                    fontSize: 14,
                    offset: 10,
                  }}
                  dataKey="withinLimit"
                  name={dict?.transports.sections.CO2InboundAndOutbound.chart.legendOne}
                  legendType="circle"
                  fill="#1ba18d"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  label={{
                    position: "top",
                    formatter: (value: number) =>
                      value
                        ? `${`${formatNumber(Number(value.toFixed(0)))}`}`
                        : 0,
                    fontSize: 14,
                    offset: 10,
                  }}
                  dataKey="outsideLimit"
                  name={dict?.transports.sections.CO2InboundAndOutbound.chart.legendTwo}
                  legendType="circle"
                  fill="#9aeee2"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}
