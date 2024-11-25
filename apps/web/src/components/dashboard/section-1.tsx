import {
  Building2,
  CarFront,
  LineChart,
  PercentSquare,
  Scale,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useDashboardBuildingsTotalCO2Emission,
  useDashboardTransportsTotalCO2Emission,
} from "@/hooks/dashboard";
import { Skeleton } from "../ui/skeleton";
import { useBuildingsFloorAreasBySector } from "@/hooks/buildings";

export default function DashboardSection1() {
  const {
    data: transportsCo2Emission,
    isFetching: isLoadingTransportsCo2Emission,
  } = useDashboardTransportsTotalCO2Emission({
    filters: {
      date: `${2023}`,
    },
  });

  const {
    data: buildingsCo2Emission,
    isFetching: isLoadingBuildingsCo2Emission,
  } = useDashboardBuildingsTotalCO2Emission({});

  const { data: buildingsInfo, isFetching: isLoadingBuildingsInfo } =
    useBuildingsFloorAreasBySector({ extraKey: "dashboard" });

  function formatBuildingsFloorAreasBySector(data?: any) {
    if (!data) return {};
    const residentialMetrics = {
      tCO2PerBuilding: (
        data.residential.co2Emission / data.residential.count
      ).toFixed(2),
      kgCO2PerSquareMeter: (
        (data.residential.co2Emission * 1000) /
        data.residential.area
      ).toFixed(2),
    };

    const nonResidentialMetrics = {
      tCO2PerBuilding: (
        data.notResidential.co2Emission / data.notResidential.count
      ).toFixed(2),
      kgCO2PerSquareMeter: (
        (data.notResidential.co2Emission * 1000) /
        data.notResidential.area
      ).toFixed(2),
    };

    return {
      residential: residentialMetrics,
      nonResidential: nonResidentialMetrics,
    };
  }

  const formattedBuildingsInfo =
    formatBuildingsFloorAreasBySector(buildingsInfo);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Visão Geral das Emissões de CO₂ </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Total Emissions Card */}
        {isLoadingTransportsCo2Emission || isLoadingBuildingsCo2Emission ? (
          <Skeleton className="h-[200px]" />
        ) : (
          <Card className="border-teal-400/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Emissões Totais de CO₂ (tCo2)
              </CardTitle>
              <Scale size={32} className=" text-teal-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-400">
                {Math.trunc(
                  (transportsCo2Emission?.totalCO2Emission || 0) +
                    (buildingsCo2Emission?.totalCO2Emission || 0)
                ).toLocaleString()}{" "}
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <CarFront size={20} className="text-teal-400/70" />
                  <span className="text-sm text-muted-foreground">
                    Transportes:{" "}
                    {Math.trunc(
                      transportsCo2Emission?.totalCO2Emission || 0
                    ).toLocaleString()}{" "}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-teal-400/70" />
                  <span className="text-sm text-muted-foreground">
                    Edifícios:{" "}
                    {Math.trunc(
                      buildingsCo2Emission?.totalCO2Emission || 0
                    ).toLocaleString()}{" "}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Variation Card */}
        <Card className="border-teal-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Variação Total (2022 vs. 2023)
            </CardTitle>
            <LineChart size={32} className="text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-teal-400 mb-4">
              Emissões totais aumentaram 3% em relação a 2022
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Transporte
                </span>
                <span className="text-lg font-medium text-teal-400">+3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Edifícios</span>
                <span className="text-lg font-medium text-teal-400">-6%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Per Building Card */}
        {isLoadingBuildingsInfo ? (
          <Skeleton className="h-[200px]" />
        ) : (
          <Card className="border-teal-400/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Métricas por edifício residencial
              </CardTitle>
              <PercentSquare size={32} className="text-teal-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-teal-400">
                    {formattedBuildingsInfo?.residential?.tCO2PerBuilding}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    tCO₂/edifício
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-400">
                    {formattedBuildingsInfo?.residential?.kgCO2PerSquareMeter}
                  </div>
                  <div className="text-sm text-muted-foreground">kgCO₂/m²</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isLoadingBuildingsInfo ? (
          <Skeleton className="h-[200px]" />
        ) : (
          <Card className="border-teal-400/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Métricas por edifício não residencial
              </CardTitle>
              <PercentSquare size={32} className="text-teal-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-teal-400">
                    {formattedBuildingsInfo?.nonResidential?.tCO2PerBuilding}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    tCO₂/edifício
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-400">
                    {
                      formattedBuildingsInfo?.nonResidential
                        ?.kgCO2PerSquareMeter
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">kgCO₂/m²</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Residential Area Card */}
        {/* <Card className="border-teal-400/20 md:col-span-2 lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Distribuição por Área</CardTitle>
            <Building2 className="w-4 h-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium">Residenciais</div>
                <div className="text-2xl font-bold text-teal-400">65.7%</div>
                <div className="text-sm text-muted-foreground">da área total e contribuem com 47.4% das emissões</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Não Residenciais</div>
                <div className="text-2xl font-bold text-teal-400">34.3%</div>
                <div className="text-sm text-muted-foreground">da área total e contribuem com 52.6% das emissões</div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
