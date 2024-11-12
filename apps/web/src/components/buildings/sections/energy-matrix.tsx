"use client";

import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Residencial",
    Eletricidade: 25,
    "Gás natural": 20,
    "Óleo diesel": 30,
    Propano: 25,
  },
  {
    name: "Não residencial",
    Eletricidade: 30,
    "Gás natural": 25,
    "Óleo diesel": 20,
    Propano: 25,
  },
];

export default function EnergyMatrix() {
  return (
    <div className="space-y-12 py-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-700">
          Análise da matriz energética do município
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Esta seção de comparação divide as emissões de CO2 por tipos
          específicos de transporte, proporcionando uma visão sobre a eficiência
          de cada modalidade ao longo do tempo.
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Fração da fonte de energia</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                stackOffset="expand"
                margin={{ top: 10, right: 30, left: 100, bottom: 20 }}
              >
                <XAxis
                  type="number"
                  tickFormatter={(value) => `${Math.round(value * 100)}%`}
                  domain={[0, 1]}
                />
                <YAxis type="category" dataKey="name" />
                <Tooltip
                  formatter={(value) => `${(Number(value) * 100).toFixed(1)}%`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="Eletricidade"
                  stackId="a"
                  fill="#2DD4BF"
                  name="Electricity"
                />
                <Bar
                  dataKey="Gás natural"
                  stackId="a"
                  fill="#5EEAD4"
                  name="Natural Gas"
                />
                <Bar
                  dataKey="Óleo diesel"
                  stackId="a"
                  fill="#99F6E4"
                  name="Diesel Oil"
                />
                <Bar
                  dataKey="Propano"
                  stackId="a"
                  fill="#CCFBF1"
                  name="Propane"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
