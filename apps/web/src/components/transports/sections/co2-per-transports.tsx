"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Car, Truck } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Carro",
    "2019": 3500,
    "2020": 1500,
    "2021": 1800,
    "2022": 800,
    "2023": 700,
  },
  {
    name: "Caminhão",
    "2019": 3000,
    "2020": 2800,
    "2021": 2600,
    "2022": 700,
    "2023": 700,
  },
  {
    name: "Ônibus",
    "2019": 200,
    "2020": 3000,
    "2021": 3200,
    "2022": 0,
    "2023": 0,
  },
];

const loading = false;
const TransportCard = ({
  title,
  description,
  icon: Icon,
  percentage,
  contribution,
}: any) =>
  loading ? (
    <Skeleton className="h-[250px]  rounded-xl" />
  ) : (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground max-w-xs">
          {description}
        </div>
        <div className="rounded bg-teal-400 p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <h3 className="text-7xl font-bold text-teal-400 mb-2">{title}</h3>
      <div className="space-y-1">
        <div className="text-xl font-semibold">{percentage}</div>
        <div className="text-muted-foreground">{contribution}</div>
      </div>
    </Card>
  );

export default function Co2EmissionPerTransport() {
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-2">
          Comparação de emissões de CO₂ por tipo de transporte
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Esta seção de comparação divide as emissões de CO2 por tipos
          específicos de transporte, proporcionando uma visão sobre a eficiência
          de cada modalidade ao longo dos últimos 5 anos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TransportCard
          title="Carro"
          description="Modal que obteve a maior acréscimo de emissões durante os últimos anos"
          icon={Car}
          percentage="45% média anual de redução"
          contribution="20% Contribuição no total de emissões"
        />

        <TransportCard
          title="Caminhão"
          description="Modal que obteve a maior acréscimo de emissões durante os últimos anos
"
          icon={Truck}
          percentage="45% média anual de crescimento "
          contribution="20% Contribuição no total de emissões"
        />
      </div>

      {loading ? (
        <Skeleton className="h-[530px]  rounded-xl" />
      ) : (
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Emissão de CO₂</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="2019" fill="#1ba18d" />
                <Bar dataKey="2020" fill="#22ccb2" />
                <Bar dataKey="2021" fill="#4ee1cb" />
                <Bar dataKey="2022" fill="#84eadb" />
                <Bar dataKey="2023" fill="#9aeee2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {[2019, 2020, 2021, 2022, 2023].map((year) => (
              <div key={year} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      year === 2019
                        ? "#1ba18d"
                        : year === 2020
                          ? "#22ccb2"
                          : year === 2021
                            ? "#4ee1cb"
                            : year === 2022
                              ? "#84eadb"
                              : "#9aeee2",
                  }}
                />
                <span className="text-sm text-muted-foreground">{year}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
