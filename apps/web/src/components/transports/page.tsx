"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransportsCO2Emission } from "@/hooks/transports";
import { useTransportsStore } from "@/store/transports";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { Bus } from "lucide-react";
import YearSelect from "../year-select";
import CO2GoalsIndex from "./sections/co2-goals-index";
import CO2InboundAndOutbound from "./sections/co2-inboud-and-outbound";
import Co2EmissionPerKilometer from "./sections/co2-per-km";
import Co2EmissionPerTransport from "./sections/co2-per-transports";

const EmissionCard = ({
  title,
  value,
}: {
  title: string;
  value?: string | number;
  loading?: boolean;
}) =>
  !value ? (
    <Skeleton className="h-52 rounded-xl" />
  ) : (
    <Card className="p-6 h-44 md:h-40 lg:h-52">
      <div className=" h-full flex flex-col gap-2">
        <div className="flex flex-row justify-between h-16">
          <span className="text-muted-foreground max-w-[75%]">{title}</span>
          <div className="rounded bg-teal-400 py-3 px-3 max-w-12 max-h-12">
            <span className="font-bold text-sm text-white">CO₂</span>
          </div>
        </div>
        <span className="text-6xl md:text-6xl lg:text-5xl font-bold h-full text-slate-600 flex items-end gap-3">
          {value}
        </span>
      </div>
    </Card>
  );

export default function TransportsPage() {
  const { filters, setFilters } = useTransportsStore();

  const handleYearChange = (value: string) => {
    setFilters({ date: value });
  };
  const { date } = filters;

  const { data } = useTransportsCO2Emission({
    filters,
  });
  return (
    <div className="min-h-screen bg-background p-6 md:mx-16">

      <div className="mx-auto space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between flex-wrap">

          <div className="flex items-center gap-4">
            <h1 className="flex flex-nowrap break-keep items-center gap-2 text-3xl font-bold text-slate-800">
              Emissões de transporte <Bus size={48} />
            </h1>

          </div>
          <div className="flex items-center gap-2">
            <YearSelect
              endYear={2023}
              startYear={2018}
              value={date}
              onValueChange={handleYearChange}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground max-w-lg">
          As informações sobre emissões de CO2 no transporte auxiliam a
          organização a monitorar, analisar e progredir em direção às metas de
          sustentabilidade, focando na redução de gases de efeito estufa.
        </p>

        <div className="border-t border-gray-200 py-6" />
        <p className="text-muted-foreground ">Emissões de CO₂ em toneladas</p>
        {/* Metrics */}
        <div className="grid gap-6 lg:grid-cols-3">
          <EmissionCard
            title="Emissão total de CO₂"
            value={formatCO2Emission(data?.totalCO2Emission)}
          />
          <EmissionCard
            value={formatCO2Emission(data?.inboundCO2Emission)}
            title="Emissão total de CO₂ dentro da fronteira"
          />
          <EmissionCard
            value={formatCO2Emission(data?.outboundCO2Emission)}
            title="Emissão total de CO₂ fora da fronteira"
          />
        </div>

        <Co2EmissionPerTransport />
        <Co2EmissionPerKilometer />
        <CO2InboundAndOutbound />
        <CO2GoalsIndex />
      </div>
    </div>
  );
}
