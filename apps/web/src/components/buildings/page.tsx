import { useBuildingsFloorAreasBySector } from "@/hooks/buildings";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { formatNumber } from "@/utils/format-number";
import { Building } from "lucide-react";
import { MdCo2 } from "react-icons/md";
import DataSourceInfo from "../data-source-info";
import InfoCard from "../info-card";
import EnergyFractions from "./sections/energy-fractions";
import EnergyIntensities from "./sections/energy-intensities";

export default function BuildingsPage() {
  const { data } = useBuildingsFloorAreasBySector({});

  return (
    <div className="min-h-screen bg-background p-6 md:mx-16">
      <div className="mx-auto space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-4">
            <h1 className="flex flex-nowrap break-keep items-center gap-2 text-3xl font-bold text-slate-800">
              Emissões de edifícios <Building size={48} />
            </h1>
          </div>
          {/* <div className="flex items-center gap-2">
            <YearSelect
              endYear={2023}
              startYear={2018}
              value={date}
              onValueChange={handleYearChange}
            />
          </div> */}
        </div>

        {/* <div className="flex items-center justify-between">
          <div className="flex items-center gap-4"> */}
        {/* <Link href="#" className="absolute left-6">
              <Button
                variant="default"
                className="bg-gray-100 text-slate-700 hover:text-white"
                size="icon"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link> */}

        {/* <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-800">
              Emissões de edifícios <Building className="h-7 w-7 ml-1 mt-0.5" />
            </h1>
          </div>
        </div> */}

        {/* Description */}
        <p className="text-muted-foreground max-w-lg">
          As informações sobre emissões de CO2 dos edifícios auxiliam a
          organização a monitorar, analisar e progredir em direção às metas de
          sustentabilidade, focando na redução de gases de efeito estufa.
        </p>
        <DataSourceInfo />

        <div className="border-t border-gray-200 py-6" />
        {/* Metrics */}
        <div className="flex flex-col lg:flex-row gap-6 lg:overflow-x-scroll xl:overflow-hidden">
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
        </div>
        <EnergyFractions />
        <EnergyIntensities />
      </div>
    </div>
  );
}
