"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Target } from "lucide-react";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { year: 2018, value: 92 },
  { year: 2019, value: 90 },
  { year: 2020, value: 35 },
  { year: 2021, value: 95 },
  { year: 2022, value: 80 },
  { year: 2023, value: 120 },
  { year: 2024, value: 68 },
  { year: 2025, value: 88 },
  { year: 2026, value: 90 },
  { year: 2027, value: 35 },
  { year: 2028, value: 92 },
  { year: 2029, value: 75 },
  { year: 2030, value: 85 },
];

const loading = false;

export default function CO2GoalsIndex() {
  return (
    <div className="space-y-12 py-6">
      <div className="flex items-start justify-between">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Índice de aderência a meta</h2>
          <p className="text-muted-foreground max-w-lg">
            Este índice acompanha nosso progresso em relação às metas de
            sustentabilidade, medindo quão de perto estamos seguindo nossas
            metas de redução de emissões de 2018 a 2030.
          </p>
        </div>
      </div>
      {loading ? (
        <Skeleton className="h-[540px]" />
      ) : (
        <Card className="p-6">
          <div className="mb-8 space-y-2">
            <div className="text-sm text-muted-foreground">
              Grau de aderência a meta
            </div>
            <div className="flex gap-3 items-center text-3xl font-bold text-teal-600">
              Está dentro da meta
              <div className="rounded-lg bg-teal-100 p-2">
                <Target className="h-5 w-5 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis
                  dataKey="year"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, "dataMax + 20"]}
                />
                <ReferenceLine
                  y={80.9}
                  label={{
                    value: "Meta: 80.9",
                    position: "insideTopLeft",
                    fontSize: 12,
                    fill: "#bab8b8",
                  }}
                  stroke="#bab8b8"
                  strokeDasharray="3 3"
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ccc",
                  }}
                  labelStyle={{ color: "#333" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22ccb2"
                  strokeWidth={2}
                  dot={{
                    fill: "#059669",
                    stroke: "#fff",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    fill: "#9aeee2",
                    stroke: "#fff",
                    strokeWidth: 2,
                    r: 6,
                  }}
                />
                <ReferenceLine
                  x={2024}
                  stroke="#bab8b8"
                  label={{
                    value: "ano atual",
                    position: "top",
                    fill: "#bab8b8", // gray,
                    fontSize: 12,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}
