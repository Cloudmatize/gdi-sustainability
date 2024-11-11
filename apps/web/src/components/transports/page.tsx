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
import { useTransportsTotalCO2Emission } from "@/hooks/transports";

const EmissionCard = ({
  title,
  value,
  loading,
}: {
  title: string;
  value?: string | number;
  loading?: boolean;
}) =>
  loading || !value ? (
    <Skeleton className="h-[200px]  rounded-xl" />
  ) : (
    <Card className="p-6">
      <div className="space-y-2 h-full flex flex-col">
        <div className="flex items- justify-between h-16 ">
          <span className="text-muted-foreground max-w-[75%]  ">{title}</span>
          <div className="rounded bg-teal-400 py-3 px-3">
            <span className="font-bold text-sm text-white">CO₂</span>
          </div>
        </div>
        <span className="text-7xl font-bold h-full text-teal-400 flex items-center">
          {value}
        </span>
      </div>
    </Card>
  );

export default function TransportsPage() {
  const { data, refetch, isFetching } = useTransportsTotalCO2Emission();
  return (
    <div className="min-h-screen bg-background p-6 mx-16">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="absolute left-6">
              <Button
                variant="default"
                className="bg-gray-100 text-slate-800 hover:text-white"
                size="icon"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              Emissões de transporte <Bus className="h-7 w-7 ml-1 mt-0.5" />
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              2024
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground max-w-lg">
          As informações sobre emissões de CO2 no transporte auxiliam a
          organização a monitorar, analisar e progredir em direção às metas de
          sustentabilidade, focando na redução de gases de efeito estufa.
        </p>

        <div className="border-t border-gray-200 py-6" />

        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          <EmissionCard
            loading={isFetching}
            title="Emissão total de CO₂"
            value={formatCO2Emission(data?.totalCO2Emission)}
          />
          <EmissionCard
            value={formatCO2Emission(data?.inboundCO2Emission)}
            title="Emissão total de CO2 dentro da fronteira"
          />
          <EmissionCard
            value={formatCO2Emission(data?.outboundCO2Emission)}
            title="Emissão total de CO2 fora da fronteira"
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
