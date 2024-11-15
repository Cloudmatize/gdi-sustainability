import Link from "next/link";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Calendar,
  Filter,
  Building,
  House,
  Factory,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import BuildingsCO2Emissions from "./sections/co2-emissions";
import EnergyFractions from "./sections/energy-fractions";
import { useBuildingsFloorAreasBySector } from "@/hooks/buildings";
import CO2Emissions from "./sections/co2-emissions";
import EnergyIntensities from "./sections/energy-intensities";
import { formatNumber } from "@/utils/format-number";
import InfoCard from "../info-card";
import { MdCo2 } from "react-icons/md";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import DataSourceInfo from "../data-source-info";

export default function BuildingsPage() {
  const { data } = useBuildingsFloorAreasBySector({});

  const isFetching = false;

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
              Emissões de edifícios <Building className="h-7 w-7 ml-1 mt-0.5" />
            </h1>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground max-w-lg">
          As informações sobre emissões de CO2 dos edifícios auxiliam a
          organização a monitorar, analisar e progredir em direção às metas de
          sustentabilidade, focando na redução de gases de efeito estufa.
        </p>
        <DataSourceInfo />

        <div className="border-t border-gray-200 py-6" />
        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            icon={MdCo2}
            title="Emissão total de CO₂"
            value={formatCO2Emission(data?.total?.co2Emission)}
            percentage={"100%"}
            description={`
             ${formatNumber(data?.total?.count)} edifícios (${formatNumber(data?.total?.area)}m²)`}
          />
          <InfoCard
            icon={MdCo2}
            title="Emissão de CO₂ de edifícios residenciais"
            value={formatCO2Emission(data?.residential?.co2Emission)}
            percentage={data?.residential?.percentage}
            description={`
             ${formatNumber(data?.residential?.count)} edifícios (${formatNumber(data?.residential.area)}m²)`}
          />
          <InfoCard
            icon={MdCo2}
            value={formatCO2Emission(data?.notResidential?.co2Emission)}
            title="Emissão de CO₂ de edifícios não residenciais"
            percentage={data?.notResidential?.percentage}
            description={`
              ${formatNumber(data?.notResidential?.count)} edifícios (${formatNumber(data?.notResidential.area)}m²)`}
          />

          {/* <InfoCard
            icon={Building}
            loading={isFetching}
            title="Total de edifícios do município"
            value={formatNumber(totalBuildingsCount)}
            percentage={"100%"}
            description={`
              área de ${formatNumber(totalBuildingsArea)}m²`}
          />
          <InfoCard
            icon={House}
            loading={isFetching}
            title="Edifícios residenciais"
            value={formatNumber(data?.residential?.count)}
            description={`área de ${formatNumber(data?.residential?.area)}m²`}
            percentage={`${(((data?.residential?.area ?? 0) / totalBuildingsArea) * 100).toFixed(1)}%`}
          />

          <InfoCard
            icon={Factory}
            loading={isFetching}
            title="Edifícios não residenciais"
            description={`área de ${formatNumber(data?.nonResidential?.area)}m²`}
            value={formatNumber(data?.nonResidential?.count)}
            percentage={`${(((data?.nonResidential?.area ?? 0) / totalBuildingsArea) * 100).toFixed(1)}%`}
          /> */}
        </div>
        {/* <CO2Emissions /> */}
        <EnergyFractions />
        <EnergyIntensities />
      </div>
    </div>
  );
}
