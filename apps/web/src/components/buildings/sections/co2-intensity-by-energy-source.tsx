"use client";

import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barData = [
  {
    name: "Propano",
    value: 0.0001,
    label: "0.0001 tCO2e/kWh",
  },
  {
    name: "Eletricidade",
    value: 0.0023,
    label: "0.0023 tCO2e/kWh",
  },
  {
    name: "Gás natural",
    value: 0.0001,
    label: "0.0001 tCO2e/kWh",
  },
  {
    name: "Óleo diesel",
    value: 0.01,
    label: "0.01 tCO2e/kWh",
  },
];

const pieData = [
  { name: "Eletrica", value: 86 },
  { name: "Gás natural", value: 5 },
  { name: "Óleo diesel", value: 4 },
  { name: "Propano", value: 3 },
  { name: "Outros", value: 2 },
];

const COLORS = ["#5EEAD4", "#99F6E4", "#CCFBF1", "#2DD4BF", "#14B8A6"];

export default function CO2IntensityByEnergySource() {
  return (
    <div className="space-y-12 py-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          Intensidade de Emissão de Carbono por Fonte de Energia
        </h2>
        <p className="text-muted-foreground">
          Esta seção mostra a média de emissão de CO2 por quilowatt-hora para
          diferentes fontes de energia
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ top: 10, right: 50, left: 100, bottom: 20 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" tick={{ fill: "#666" }} />
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

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Others</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
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
