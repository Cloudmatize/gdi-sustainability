"use client";

import Link from "next/link";
import { ArrowLeft, Bus, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Co2EmissionPerTransport from "./sections/co2-per-transports";
import Co2EmissionPerKilometer from "./sections/co2-per-km";
import CO2InboundAndOutbound from "./sections/co2-inboud-and-outbound";
import CO2GoalsIndex from "./sections/co2-goals-index";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { useTransportsCO2Emission } from "@/hooks/transports";
import YearSelect from "../year-select";
import { useTransportsStore } from "@/store/transports";
import InfoCard from "../info-card";
import { MdCo2 } from "react-icons/md";
import { formatNumber } from "@/utils/format-number";

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
    <div className="min-h-screen bg-background p-6 mx-16">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="absolute left-6">
              <Button
                variant="default"
                className="bg-gray-100 text-slate-700 hover:text-white"
                size="icon"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-800">
              Emissões de transporte <Bus className="h-7 w-7 ml-1 mt-0.5" />
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
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            icon={MdCo2}
            title="Emissão total de CO₂"
            value={formatCO2Emission(data?.total.co2Emission)}
            percentage={"100%"}
            description={`
              viagens de ${formatNumber(data?.total.trips)}`}
          />
          <InfoCard
            icon={MdCo2}
            title="Emissão de CO₂ dentro da fronteira"
            value={formatCO2Emission(data?.inbound.co2Emission)}
            percentage={data?.inbound?.percentage}

            description={`
              viagens de ${formatNumber(data?.inbound.trips)}`}
          />
          <InfoCard
            icon={MdCo2}
            value={formatCO2Emission(data?.outbound.co2Emission)}
            title="Emissão de CO₂ fora da fronteira"
            percentage={data?.outbound?.percentage}
            description={`
              viagens de ${formatNumber(data?.outbound.trips)}`}
          />
        </div>

        <CO2InboundAndOutbound />
        <Co2EmissionPerTransport />
        <Co2EmissionPerKilometer />
        <CO2GoalsIndex />
      </div>
    </div>
  );
}
