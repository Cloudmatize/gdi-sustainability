"use client";

import { Info } from "lucide-react";
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

const data = [
  { name: "Trem", value: 0.0001, label: "0.0001 tons/km" },
  { name: "Ônibus", value: 0.0023, label: "0.0023 tons/km" },
  { name: "Carro", value: 0.0001, label: "0.0001 tons/km" },
  { name: "Bicicleta", value: 0.01, label: "0.01 tons/km" },
  { name: "Avião", value: 0.002, label: "0.002 tons/km" },
];

const loading = false;
export default function Co2EmissionPerKilometer() {
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-2">
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Reference value for sustainable emissions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {loading ? (
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
                <YAxis dataKey="name" type="category" tick={{ fill: "#666" }} />
                <ReferenceLine
                  x={0.05}
                  stroke="#A855F7"
                  strokeDasharray="3 3"
                />
                <Bar
                  dataKey="value"
                  fill="#22ccb2"
                  radius={[0, 4, 4, 0]}
                  label={{
                    position: "right",
                    formatter: (value: number) => `${value} tons/km`,
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
