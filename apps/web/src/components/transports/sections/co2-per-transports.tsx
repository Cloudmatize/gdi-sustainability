"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { gradientColors } from "@/config/colors";
import { useTrannsportCO2EmissionByYear } from "@/hooks/transports";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { Car, Truck } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
        {payload.map((item) => {
          return (
            <div className="flex gap-2 items-center ">
              <div className="flex items-center gap-2  h-10">
                <div
                  className="w-[14px] h-[14px] rounded-xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-800 font-bold  w-12 text-center">
                  {String(item?.dataKey) || ""}
                </span>
              </div>
              {formatCO2Emission(item.value)} tons
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

const TransportCard = ({
  title,
  description,
  icon: Icon,
  percentage,
  contribution,
  loading,
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
        <div className="text-xl font-semibold text-slate-600">{percentage}</div>
        <div className="text-muted-foreground ">{contribution}</div>
      </div>
    </Card>
  );

export default function Co2EmissionPerTransport() {
  const { data, isFetching } = useTrannsportCO2EmissionByYear();

  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-2 text-slate-700">
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
          loading={isFetching}
          title="Carro"
          description="Modal que obteve a maior acréscimo de emissões durante os últimos anos"
          icon={Car}
          percentage="45% média anual de redução"
          contribution="20% Contribuição no total de emissões"
        />

        <TransportCard
          title="Caminhão"
          loading={isFetching}
          description="Modal que obteve a maior acréscimo de emissões durante os últimos anos"
          icon={Truck}
          percentage="45% média anual de crescimento "
          contribution="20% Contribuição no total de emissões"
        />
      </div>

      {isFetching ? (
        <Skeleton className="h-[530px]  rounded-xl" />
      ) : (
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Emissão de CO₂</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.data}>
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => formatCO2Emission(value) || ""}
                />

                <Tooltip content={<CustomTooltip />} />

                {data?.years?.map((year, index) => (
                  <Bar
                    legendType="circle"
                    dataKey={year}
                    radius={[4, 4, 0, 0]}
                    stackId="a"
                    fill={gradientColors[index]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {data?.years?.map((year, index) => (
              <div key={year} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: gradientColors[index],
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
