"use client";

import { Bus } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransportsCO2Emission } from "@/hooks/transports";
import { useTransportsStore } from "@/store/transports";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { formatNumber } from "@/utils/format-number";
import { MdCo2 } from "react-icons/md";
import DataSourceInfo from "../data-source-info";
import InfoCard from "../info-card";
import YearSelect from "../year-select";
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
    setFilters({ date: [Number(value)] });
  };
  const { date } = filters;

  const { data } = useTransportsCO2Emission({
    filters,
  });
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:px-16">
      <div className="mx-auto space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-4">
            <h1 className="flex flex-nowrap break-keep items-center gap-3 text-3xl font-bold text-foreground">
              Emissão de transportes <Bus size={36} />
            </h1>
          </div>
          <div className="flex items-center gap-2 my-3 xl:my-0">
            <YearSelect
              endYear={2023}
              startYear={2018}
              value={String(date ? date[0] : new Date().getFullYear() - 1)}
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
        <DataSourceInfo />
        <div className="border-t border-gray-200 py-6" />
        <p className="text-muted-foreground ">Emissão de CO2 em toneladas</p>
        {/* Metrics */}
        <div className="flex flex-col xl:flex-row gap-6">
          <InfoCard
            icon={MdCo2}
            title="Emissão total"
            value={formatCO2Emission(data?.total.co2Emission)}
            percentage={"100%"}
            description={`
             ${formatNumber(data?.total.trips || 150_000)} viagens`}
          />
          <InfoCard
            icon={MdCo2}
            title="Dentro da fronteira"
            value={formatCO2Emission(data?.inbound.co2Emission)}
            percentage={data?.inbound?.percentage}
            infoTooltip={
              "Diz respeito a aquelas emissões coletadas por viagens que se iniciaram e finalizaram na própria cidade."
            }
            description={`
            ${formatNumber(data?.inbound.trips || 100_000)} viagens`}
          />
          <InfoCard
            icon={MdCo2}
            value={formatCO2Emission(data?.outbound.co2Emission)}
            title="Fora da fronteira"
            percentage={data?.outbound?.percentage}
            infoTooltip={
              "Diz respeito a aquelas emissões coletadas por viagens que em algum momento da viagem passaram pela cidade. Isso é, aquele veículo em algum momento emitiu carbono na cidade, porém sua viagem não finalizou na própria cidade"
            }
            description={`
              ${formatNumber(data?.outbound.trips || 50_000)} viagens`}
          />
        </div>

        <CO2InboundAndOutbound />
        <Co2EmissionPerTransport />
        <Co2EmissionPerKilometer />
      </div>
    </div>
  );
}
