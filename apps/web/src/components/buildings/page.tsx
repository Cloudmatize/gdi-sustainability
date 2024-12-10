'use client'
import { useDictionary } from "@/context/DictionaryContext";
import { useBuildingsFloorAreasBySector } from "@/hooks/buildings";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { formatNumber } from "@/utils/format-number";
import { Building } from "lucide-react";
import { MdCo2 } from "react-icons/md";
import DataSourceInfo from "../data-source-info";
import InfoCard from "../info-card";
import EnergyFractions from "./sections/energy-fractions";
import EnergyIntensities from "./sections/energy-intensities";

export interface BuildingsPageProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  dict: any
}

export default function BuildingsPage() {
  const { data } = useBuildingsFloorAreasBySector({});
  const { dict } = useDictionary();

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:px-16">
      <div className="mx-auto space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-4">
            <h1 className="flex flex-nowrap break-keep items-center gap-3 text-3xl font-bold text-foreground">
              {dict?.buildings.title} <Building size={36} />
            </h1>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground max-w-lg">
          {dict?.buildings.description}
        </p>
        <DataSourceInfo />

        <div className="border-t border-gray-200 py-6" />
        <p className="text-muted-foreground ">{dict?.buildings.metrics.title}</p>

        {/* Metrics */}
        <div className="flex flex-col xl:flex-row gap-6 ">
          <InfoCard
            icon={MdCo2}
            title={dict?.buildings.metrics.totalEmissions.title}
            value={formatCO2Emission(data?.total?.co2Emission)}
            percentage={"100%"}
            description={`
             ${formatNumber(data?.total?.count)} ${dict?.buildings.metrics.totalEmissions.description} (${formatNumber(data?.total?.area)}m²)`}
          />
          <InfoCard
            icon={MdCo2}
            title={dict?.buildings.metrics.issuanceOfResidentialBuildings.title}
            value={formatCO2Emission(data?.residential?.co2Emission)}
            percentage={data?.residential?.percentage}
            description={`
             ${formatNumber(data?.residential?.count)} ${dict?.buildings.metrics.totalEmissions.description} (${formatNumber(data?.residential.area)}m²)`}
          />
          <InfoCard
            icon={MdCo2}
            value={formatCO2Emission(data?.notResidential?.co2Emission)}
            title={dict?.buildings.metrics.issuanceOfNonResidentialBuildings.title}
            percentage={data?.notResidential?.percentage}
            description={`
              ${formatNumber(data?.notResidential?.count)} ${dict?.buildings.metrics.totalEmissions.description} (${formatNumber(data?.notResidential.area)}m²)`}
          />
        </div>
        <EnergyFractions dict={dict} />
        <EnergyIntensities dict={dict} />
      </div>
    </div>
  );
}
