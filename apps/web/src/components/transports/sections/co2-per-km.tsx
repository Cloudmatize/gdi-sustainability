"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { useTransportsCO2EmissionPerKM } from "@/hooks/transports";
import { useTransportsStore } from "@/store/transports";
import {
  Bar,
  BarChart,
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
            <span className="text-foreground font-bold  w-24 text-center">
              {label}
            </span>
          </div>
          {item.value.toFixed(2)} kg/km
        </div>
      </div>
    );
  }

  return null;
};

export default function Co2EmissionPerKilometer({ dict }: DictionaryContextType) {
  const { filters } = useTransportsStore();
  const { data, isFetching } = useTransportsCO2EmissionPerKM({
    filters,
  });
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          {dict?.title}
        </h2>
        <p className="text-muted-foreground max-w-lg">
          {dict?.description}
        </p>
      </div>

      {isFetching ? (
        <Skeleton className="h-[450px]" />
      ) : (
        <Card className="p-6  overflow-auto">
          <h3 className="font-semibold text-foreground text-sm mb-6">
            {dict?.chart.title}
          </h3>

          <div className="h-[400px]  w-[400px] sm:w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, bottom: 30, left: 50, right: 30 }}
              >
                <XAxis
                  type="number"
                  tickSize={1}
                  tickFormatter={(value: number) =>
                    `${value.toFixed(2)} kgCO2e/km`
                  }
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
                  dataKey="mode"
                  type="category"
                  tick={{ fill: "#666" }}
                />

                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="emissionCO2KgPerKm"
                  fill="#22ccb2"
                  radius={[0, 4, 4, 0]}
                  label={{
                    position: "right",
                    formatter: (value: number) =>
                      `${value.toFixed(2)} kgCO₂e/km`,
                    fill: "#666",
                    fontSize: 12,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}
