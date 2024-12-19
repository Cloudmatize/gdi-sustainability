"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDictionary } from "@/context/DictionaryContext";
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

export default function PrintCo2EmissionPerKilometer() {
  const { dict } = useDictionary();
  const { filters } = useTransportsStore();
  const { data, isFetching } = useTransportsCO2EmissionPerKM({
    filters,
  });
  const translatedData = data?.map((_data) => ({
    mode: dict?.mappedTravelMode[_data?.mode],
    emissionCO2KgPerKm: _data?.emissionCO2KgPerKm,
  }));

  return (
    <div className="space-y-12 py-6 text-xs">
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold mb-2 text-foreground">
          {dict?.transports.sections.Co2EmissionPerKilometer.title}
        </h2>
        <p className="text-muted-foreground max-w-lg">
          {dict?.transports.sections.Co2EmissionPerKilometer.description}
        </p>
      </div>

      {isFetching ? (
        <Skeleton className="h-[300px]" />
      ) : (
        <Card className={`min-w-[1000px] md:w-full h-[300px]  p-6`}>
          <h3 className="font-semibold text-foreground text-sm mb-6">
            {dict?.transports.sections.Co2EmissionPerKilometer.chart.title}
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={translatedData || data || []}
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
                fontSize={10}
                strokeWidth={0.3}
                tickMargin={18}
              />
              <YAxis
                stroke="#888888"
                fontSize={10}
                tickMargin={10}
                strokeWidth={0.3}
                dataKey="mode"
                type="category"
                tick={{ fill: "#666" }}
              />

              <Bar
                dataKey="emissionCO2KgPerKm"
                fill="#22ccb2"
                isAnimationActive={false}
                radius={[0, 4, 4, 0]}
                label={{
                  position: "right",
                  formatter: (value: number) => `${value.toFixed(2)} kgCO₂e/km`,
                  fill: "#666",
                  fontSize: 10,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}
