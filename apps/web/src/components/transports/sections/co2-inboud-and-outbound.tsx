"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2 } from "lucide-react";
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
    name: "Carro",
    withinLimit: 40,
    outsideLimit: 60,
  },
  {
    name: "Caminhão",
    withinLimit: 25,
    outsideLimit: 75,
  },
  {
    name: "Ônibus",
    withinLimit: 45,
    outsideLimit: 55,
  },
  {
    name: "Bicileta",
    withinLimit: 35,
    outsideLimit: 65,
  },
  {
    name: "Avião",
    withinLimit: 70,
    outsideLimit: 30,
  },
  {
    name: "Trem",
    withinLimit: 45,
    outsideLimit: 55,
  },
];
const loading = false;
export default function CO2InboundAndOutbound() {
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Comparação de emissões dentro e fora dos limites geográficos
            específicos
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Esta seção compara a média de emissão de CO2 por quilômetro entre
            diferentes tipos de transporte, diferenciando as emissões dentro e
            fora dos limites geográficos
          </p>
        </div>
        {loading ? (
          <Skeleton className="h-[130px]  min-w-[250px]" />
        ) : (
          <Card className="p-4 min-w-[250px]">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Perfil do município
                </div>
                <div className="font-semibold">Municipio de entrada</div>
                <div className="text-sm text-muted-foreground">
                  Recebe muitos cidadãos locais
                </div>
              </div>
              <div className="rounded-lg bg-teal-400 p-2">
                <Building2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        )}
      </div>

      {loading ? (
        <Skeleton className="h-[450px]" />
      ) : (
        <Card className="p-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis
                  label={{
                    value: "Emsisão CO₂ (tons)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="withinLimit"
                  name="Dentro do limite"
                  legendType="circle"
                  stackId="a"
                  fill="#1ba18d"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="outsideLimit"
                  name="Fora do limite"
                  legendType="circle"
                  stackId="a"
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
