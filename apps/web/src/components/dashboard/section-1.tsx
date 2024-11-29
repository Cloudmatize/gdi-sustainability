import {
  Building,
  Building2,
  CarFront,
  House,
  LineChart,
  PercentSquare,
  Scale
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBuildingsFloorAreasBySector } from "@/hooks/buildings";
import {
  useDashboardBuildingsTotalCO2Emission,
  useDashboardTransportsTotalCO2Emission,
} from "@/hooks/dashboard";
import CardIcons from "../ui/card-icons";
import { Skeleton } from "../ui/skeleton";

function generateComparisonMessage(
  value1: number,
  value2: number
): {
  formattedPercentageChange: number;
  trend: string;
} {
  const difference = value2 - value1;
  const percentageChange = ((difference / value1) * 100).toFixed(2);
  const trend = difference > 0 ? "aumentaram" : "diminuiram";

  const formattedPercentageChange = Math.abs(Number(percentageChange));

  return {
    formattedPercentageChange,
    trend,
  };
}

export default function DashboardSection1() {
  const {
    data: transportsCo2Emission,
    isFetching: isLoadingTransportsCo2Emission,
  } = useDashboardTransportsTotalCO2Emission({
    filters: {
      date: [2023],
    },
  });
  const {
    data: transportsCo2EmissionPreviusYear,
    isFetching: isLoadingTransportsCo2EmissionPreviousYear,
  } = useDashboardTransportsTotalCO2Emission({
    filters: {
      date: [2022],
    },
  });

  const {
    data: buildingsCo2Emission,
    isFetching: isLoadingBuildingsCo2Emission,
  } = useDashboardBuildingsTotalCO2Emission({});

  const transportsComparissonInfo = generateComparisonMessage(
    transportsCo2EmissionPreviusYear?.totalCO2Emission || 0,
    transportsCo2Emission?.totalCO2Emission || 0
  );
  const { data: buildingsInfo, isFetching: isLoadingBuildingsInfo } =
    useBuildingsFloorAreasBySector({ extraKey: "dashboard" });

  function formatBuildingsFloorAreasBySector(
    data:
      | {
          residential: {
            area: number;
            count: number;
            co2Emission: number;
            percentage: number;
          };
          notResidential: {
            area: number;
            count: number;
            co2Emission: number;
            percentage: number;
          };
          total: {
            area: number;
            count: number;
            co2Emission: number;
          };
        }
      | undefined
  ) {
    if (!data) return {};
    const residentialMetrics = {
      areaPercentage: Number(
        ((data.residential.area / data.total.area) * 100).toFixed(1)
      ),
      totalCo2EmissionPercentage: Number(
        (data.residential.percentage * 100).toFixed(1)
      ),
      tCO2PerBuilding: (
        data.residential.co2Emission / data.residential.count
      ).toFixed(2),
      kgCO2PerSquareMeter: (
        (data.residential.co2Emission * 1000) /
        data.residential.area
      ).toFixed(2),
    };

    const nonResidentialMetrics = {
      areaPercentage: Number(
        ((data.notResidential.area / data.total.area) * 100).toFixed(1)
      ),
      totalCo2EmissionPercentage: Number(
        (data.notResidential.percentage * 100).toFixed(1)
      ),
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

  const cards = [
    {
      title: "Emissões Totais de CO₂",
      icon:
        <CardIcons><Scale /></CardIcons>,
      loading: isLoadingTransportsCo2Emission || isLoadingBuildingsCo2Emission,
      content: (<><div className="text-2xl font-bold text-foreground">
        {Math.trunc(
          (transportsCo2Emission?.totalCO2Emission || 0) +
          (buildingsCo2Emission?.totalCO2Emission || 0)
        ).toLocaleString()}{" "}
      </div><div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2">
            <CarFront size={20} className="text-primary-foreground" />
            <span className="text-sm text-muted-foreground">
              Transportes:{" "}
              {Math.trunc(
                transportsCo2Emission?.totalCO2Emission || 0
              ).toLocaleString()}{" "}
            </span>
          </div>
        </div><div className="flex items-center gap-2">
          <Building2 size={20} className="text-primary-foreground" />
          <span className="text-sm text-muted-foreground">
            Edifícios:{" "}
            {Math.trunc(
              buildingsCo2Emission?.totalCO2Emission || 0
            ).toLocaleString()}{" "}
          </span>
        </div></>)
    },
    {
      title: "Comparação emissões transporte (tCO2e)",
      icon:
        <CardIcons>
          <LineChart />
        </CardIcons>,
      loading: isLoadingTransportsCo2Emission ||
        isLoadingTransportsCo2EmissionPreviousYear,
      content: (<><CardDescription>
        Emissões totais {transportsComparissonInfo?.trend}{" "}
        <span className="text-primary-foreground font-bold text-lg">
          {transportsComparissonInfo?.formattedPercentageChange}%
        </span>{" "}
        em relação ao ano anterior
      </CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between mt-10">
            <span className="text-sm text-muted-foreground">2022</span>
            <span className="text-lg font-medium text-primary-foreground">
              {" "}
              {Math.trunc(
                transportsCo2EmissionPreviusYear?.totalCO2Emission || 0
              ).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between mt-10">
            <span className="text-sm text-muted-foreground">2023</span>
            <span className="text-lg font-medium text-primary-foreground">
              {Math.trunc(
                transportsCo2Emission?.totalCO2Emission || 0
              ).toLocaleString()}
            </span>
          </div>
        </div></>)
    },
    {
      title: "Métricas por edifício residencial",
      icon:
        <CardIcons>
          <House />
        </CardIcons>,
      loading: isLoadingBuildingsInfo,
      content: (<>
        <CardDescription className="mb-2">
          Os edifícios residenciais possuem 65.7% da área total e contribuem
          com 47.4% das emissões
        </CardDescription>
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold text-primary-foreground">
              {formattedBuildingsInfo?.residential?.tCO2PerBuilding}
            </div>
            <div className="text-sm text-muted-foreground">
              tCO₂/edifício
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-foreground">
              {formattedBuildingsInfo?.residential?.kgCO2PerSquareMeter}
            </div>
            <div className="text-sm text-muted-foreground">kgCO₂/m²</div>
          </div>
        </div>
      </>)
    },
    {
      title: "Métricas por edifício não residencial",
      icon:
        <CardIcons>
          <Building />
        </CardIcons>,
      loading: isLoadingBuildingsInfo,
      content: (<>
        <CardDescription className="mb-2">
          Os edifícios não residenciais possuem 65.7% da área total e contribuem
          com 47.4% das emissões
        </CardDescription>
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold text-primary-foreground">
              {formattedBuildingsInfo?.nonResidential?.tCO2PerBuilding}
            </div>
            <div className="text-sm text-muted-foreground">
              tCO₂/edifício
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-foreground">
              {formattedBuildingsInfo?.nonResidential?.kgCO2PerSquareMeter}
            </div>
            <div className="text-sm text-muted-foreground">kgCO₂/m²</div>
          </div>
        </div>
      </>)
    },
    {
      title: "Distribuição por Área",
      icon:
        <CardIcons>
          <Building2 />
        </CardIcons>,
      loading: isLoadingBuildingsInfo,
      content: (<>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium">Residenciais</div>
            <div className="text-2xl font-bold text-primary-foreground">
              65.7%
            </div>
            <div className="text-sm text-muted-foreground">
              65.7% da área total e contribuem com 47.4% das emissões
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Não Residenciais</div>
            <div className="text-2xl font-bold text-primary-foreground">
              34.3%
            </div>
            <div className="text-sm text-muted-foreground">
              da área total e contribuem com 52.6% das emissões
            </div>
          </div>
        </div>
      </>)
    },
  ]

  return (
    <div className="space-y-6 text-foreground">
      <h2 className="text-2xl font-bold">Visão Geral das Emissões de CO₂</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {cards?.map((card) =>
          // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
          card?.loading ? (<Skeleton className="h-[182px]" />) : (
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            <Card className="border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle>{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                {card.content}
              </CardContent>
            </Card>)
        )}
      </div>

      {/* Variation Card */}
      {isLoadingTransportsCo2Emission ||
      isLoadingTransportsCo2EmissionPreviousYear ? (
        <Skeleton className="h-[270px]" />
      ) : (
        <Card className="border-teal-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Comparação emissões transporte (tCO2e)
            </CardTitle>
            <LineChart size={32} className="text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-start w-64 font-medium text-muted-foreground mb-4">
              Emissões totais {transportsComparissonInfo?.trend}{" "}
              <span className="text-teal-400 font-bold text-lg">
                {transportsComparissonInfo?.formattedPercentageChange}%
              </span>{" "}
              em relação ao ano anterior
            </div>
            <div className="space-y-2">
              <div className="flex justify-between mt-10">
                <span className="text-sm text-muted-foreground">2022</span>
                <span className="text-lg font-medium text-teal-400">
                  {" "}
                  {Math.trunc(
                    transportsCo2EmissionPreviusYear?.totalCO2Emission || 0
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mt-10">
                <span className="text-sm text-muted-foreground">2023</span>
                <span className="text-lg font-medium text-teal-400">
                  {Math.trunc(
                    transportsCo2Emission?.totalCO2Emission || 0
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metrics Per Building Card */}
      {isLoadingBuildingsInfo ? (
        <Skeleton className="h-[270px]" />
      ) : (
        <Card className="border-teal-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Métricas por edifício residencial
            </CardTitle>
            <PercentSquare size={32} className="text-teal-400" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-2">
              Os edifícios residenciais possuem{" "}
              {formattedBuildingsInfo.residential?.areaPercentage}% da área
              total e contribuem com{" "}
              {formattedBuildingsInfo.residential?.totalCo2EmissionPercentage}%
              das emissões
            </CardDescription>
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
        <Skeleton className="h-[270px]" />
      ) : (
        <Card className="border-teal-400/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Métricas por edifício não residencial
            </CardTitle>
            <PercentSquare size={32} className="text-teal-400" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-2">
              Os edifícios não residenciais possuem{" "}
              {formattedBuildingsInfo.nonResidential?.areaPercentage}% da área
              total e contribuem com{" "}
              {
                formattedBuildingsInfo.nonResidential
                  ?.totalCo2EmissionPercentage
              }
              % das emissões
            </CardDescription>
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
                  {formattedBuildingsInfo?.nonResidential?.kgCO2PerSquareMeter}
                </div>
                <div className="text-sm text-muted-foreground">kgCO₂/m²</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
