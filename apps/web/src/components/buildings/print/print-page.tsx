import DataSourceInfo from "@/components/data-source-info";
import PrintLoadingStatePage from "@/components/print-loading-page";
import { Header } from "@/components/print/header";
import InfoCard from "@/components/print/info-card";
import { useDictionary } from "@/context/DictionaryContext";
import { useBuildingsFloorAreasBySector } from "@/hooks/buildings";
import { usePrintStore } from "@/store/print";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { formatNumber } from "@/utils/format-number";
import { Building } from "lucide-react";
import { MutableRefObject } from "react";
import { MdCo2 } from "react-icons/md";
import PrintEnergyFractions from "./print-energy-fractions";
import PrintEnergyIntensities from "./print-energy-intensities";

interface Props {
  componentRef?: MutableRefObject<null>;
}

export default function PrintBuildingsPage({ componentRef }: Props) {
  const { isPrinting } = usePrintStore();
  const { dict } = useDictionary();
  const { data } = useBuildingsFloorAreasBySector({});

  return (
    isPrinting && (
      <div className="break-after-all break-before-all">
        {isPrinting && <PrintLoadingStatePage />}
        <div ref={componentRef} className=" space-y-4 text-xs  ">
          <Header
            title="Relatório de Emissões de Edifícios"
            subtitle={
              "Apresentação das emissões de CO₂ por edificações residenciais e não residenciais, incluindo composição energética e intensidade por fonte. Destaque para o impacto ambiental das diferentes fontes de energia no período avaliado."
            }
            generatedAt={new Date().toLocaleDateString()}
          />

          <div className="mx-auto space-y-6 py-8 px-10 text-xs">
            {/* Header */}

            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center gap-4">
                <h1 className="flex flex-nowrap break-keep items-center gap-3 text-2xl  font-bold text-foreground">
                  {dict?.buildings.title} <Building size={20} />
                </h1>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground max-w-lg">
              {dict?.buildings.description}
            </p>

            <div className="border-t border-gray-200 py-1" />
            <p className="text-muted-foreground ">
              {dict?.buildings.metrics.title}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3  ">
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
                title={
                  dict?.buildings.metrics.issuanceOfResidentialBuildings.title
                }
                value={formatCO2Emission(data?.residential?.co2Emission)}
                percentage={data?.residential?.percentage}
                description={`
             ${formatNumber(data?.residential?.count)} ${dict?.buildings.metrics.totalEmissions.description} (${formatNumber(data?.residential.area)}m²)`}
              />
              <InfoCard
                icon={MdCo2}
                value={formatCO2Emission(data?.notResidential?.co2Emission)}
                title={
                  dict?.buildings.metrics.issuanceOfNonResidentialBuildings
                    .title
                }
                percentage={data?.notResidential?.percentage}
                description={`
              ${formatNumber(data?.notResidential?.count)} ${dict?.buildings.metrics.totalEmissions.description} (${formatNumber(data?.notResidential.area)}m²)`}
              />
            </div>
            <PrintEnergyFractions />
            <PrintEnergyIntensities />
          </div>
        </div>
      </div>
    )
  );
}
