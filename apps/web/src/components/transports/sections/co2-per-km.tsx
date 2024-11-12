"use client";
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransportsCO2EmissionPerKM } from "@/hooks/transports";
import { Payload } from "recharts/types/component/DefaultLegendContent";

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

export default function Co2EmissionPerKilometer() {
  const { data, isFetching } = useTransportsCO2EmissionPerKM();
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-2 text-slate-700">
          Média de CO₂ emitido por KM por tipo de transporte
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Esta seção apresenta a média de emissão de CO₂ por quilômetro para
          diferentes tipos de transporte
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-px w-4 border-t-2 border-dotted border-purple-400" />
          Referência de sustentabilidade: 0.05
        </div>
      </div>
      {isFetching ? (
        <Skeleton className="h-[450px]" />
      ) : (
        <Card className="p-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 10, right: 50, bottom: 10, left: 60 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="mode" type="category" tick={{ fill: "#666" }} />
                <ReferenceLine
                  x={0.75}
                  stroke="#A855F7"
                  strokeDasharray="3 3"
                />
                <Tooltip  content={<CustomTooltip />} />
                <Bar
                  dataKey="emissionCO2KgPerKm"
                  fill="#22ccb2"
                  radius={[0, 4, 4, 0]}
                  label={{
                    position: "right",
                    formatter: (value: number) => `${value.toFixed(2)} kg/km`,
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
