import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, Calendar, Filter, Building } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import BuildingsCO2Emissions from "./sections/co2-emissions";
import EnergyFractions from "./sections/energy-fractions";
import { useBuildingsFloorAreasBySector } from "@/hooks/buildings";
import CO2Emissions from "./sections/co2-emissions";
import EnergyIntensities from "./sections/energy-intensities";

const BuildingsFloorAreasCard = ({
  title,
  value,
  loading,
  percentage,
  icon: Icon,
  description,
}: {
  title: string;
  value?: string | number;
  loading?: boolean;
  percentage?: string;
  description?: string;
  icon: any;
}) =>
  loading || !value ? (
    <Skeleton className="h-[230px]  rounded-xl" />
  ) : (
    <Card className="p-6">
      <div className="space-y-2 h-full flex flex-col">
        <div className="flex items- justify-between h-16 ">
          <span className="text-muted-foreground max-w-[75%]   ">{title}</span>
          <div className="rounded bg-teal-400 p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <span className="text-7xl font-bold h-full text-slate-600 flex items-end gap-3">
          {value}
          {percentage && (
            <span className="text-2xl text-slate-400 font-light  mb-1">
              ({percentage})
            </span>
          )}
        </span>
        {description && (
          <span className="pt-4 px-2  text-slate-400">{description}</span>
        )}
      </div>
    </Card>
  );

export default function BuildingsPage() {
  const { data } = useBuildingsFloorAreasBySector({});

  const isFetching = false;

  const totalBuildingsArea =
    (data?.residential?.area ?? 0) + (data?.nonResidential?.area ?? 0);
  const totalBuildingsCount =
    (data?.residential?.count ?? 0) + (data?.nonResidential?.count ?? 0);

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

        <div className="border-t border-gray-200 py-6" />
        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          <BuildingsFloorAreasCard
            icon={Building}
            loading={isFetching}
            title="Total de edifícios do município"
            value={totalBuildingsCount}
            percentage={"100%"}
            description={`
              área de ${totalBuildingsArea}m²`}
          />
          <BuildingsFloorAreasCard
            icon={Building}
            loading={isFetching}
            title="Edifícios residenciais"
            value={data?.residential?.count}
            description={`área de ${data?.residential?.area}m²`}
            percentage={`${(((data?.residential?.area ?? 0) / totalBuildingsArea) * 100).toFixed(1)}%`}
          />

          <BuildingsFloorAreasCard
            icon={Building}
            loading={isFetching}
            title="Edifícios não residenciais"
            description={`área de ${data?.nonResidential?.area}m²`}
            value={data?.nonResidential?.count}
            percentage={`${(((data?.nonResidential?.area ?? 0) / totalBuildingsArea) * 100).toFixed(1)}%`}
          />
        </div>
        <CO2Emissions />
        <EnergyFractions />
        <EnergyIntensities />
      </div>
    </div>
  );
}
