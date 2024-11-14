"use client";

import { Card } from "@/components/ui/card";
import {
  elegantColors,
  gradientColors,
  minimalistColors,
  pastelColors,
  vintageVibeColors,
} from "@/config/colors";
import {
  useBuildingsEnergyFractionsBySector,
  useBuildingsEnergyIntensitiesBySector,
} from "@/hooks/buildings";
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

const pieData = [
  { name: "Eletrica", value: 86 },
  { name: "Gás natural", value: 5 },
  { name: "Óleo diesel", value: 4 },
  { name: "Propano", value: 3 },
  { name: "Outros", value: 2 },
];

const CustomLegend = ({ payload }: { payload?: Payload[] }) => {
  return (
    <div className="custom-legend  flex flex-wrap gap-3 justify-center items-center ">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-sm text-slate-700 text-center">{d.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function EnergyIntensities() {
  const { data } = useBuildingsEnergyIntensitiesBySector({});
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">
          Intensidade de Emissão de Carbono por Fonte de Energia
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Esta seção mostra a média de emissão de CO2 por quilowatt-hora para
          diferentes fontes de energia.
        </p>
      </div>

      <div className="flex gap-8">
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
                  strokeWidth={0.3}
                  tick={{ fill: "#666" }}
                  type="category"
                  dataKey="name"
                />
                <Tooltip
                  formatter={(value) => `${value} tCO2e/kWh`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#2DD4BF"
                  maxBarSize={40}
                  radius={[0, 4, 4, 0]}
                  label={{
                    position: "right",
                    formatter: (item: { label: string }) => item.label,
                    fill: "#666",
                    fontSize: 12,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

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
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
