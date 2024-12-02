import {
  Building,
  Building2,
  CarFront,
  House,
  LineChart,
  Scale,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import TargetAdherenceSection from "./target-adherence-section";
import { Tooltip } from "../tooltip";
import Link from "next/link";

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
      title: "Comparação emissões transporte (tCO2e)",
      icon: (
        <CardIcons>
          <LineChart />
        </CardIcons>
      ),
      href: "/transports",
      loading:
        isLoadingTransportsCo2Emission ||
        isLoadingTransportsCo2EmissionPreviousYear,
      content: (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-evenly gap-3 mb-5">
            <div className="text-center">
              <div className="text-3xl md:text-xl font-bold text-primary-foreground">
                {Math.trunc(
                  transportsCo2EmissionPreviusYear?.totalCO2Emission || 0
                ).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">2022</div>
            </div>
            <div className="text-2xl md:text-xl text-muted-foreground">×</div>
            <div className="text-center">
              <div className="text-3xl md:text-xl font-bold text-primary-slate">
                {Math.trunc(
                  transportsCo2Emission?.totalCO2Emission || 0
                ).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">2023</div>
            </div>
          </div>
          <CardDescription className="mt-2 text-center ">
            {`As emissões de transporte ${transportsComparissonInfo.trend} em ${transportsComparissonInfo.formattedPercentageChange}%`}
          </CardDescription>
        </div>
      ),
    },
    {
      title: "Métricas por edifício residencial",
      icon: (
        <CardIcons>
          <House />
        </CardIcons>
      ),
      href: "/buildings",
      loading: isLoadingBuildingsInfo,
      content: (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-evenly gap-3 mb-5">
            <Tooltip
              triggerContent={
                <div>
                  <div className="text-2xl font-bold text-primary-foreground text-center">
                    {formattedBuildingsInfo?.residential?.tCO2PerBuilding}
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    tCO2e/edifício
                  </div>
                </div>
              }
            >
              {`${formattedBuildingsInfo?.residential?.tCO2PerBuilding} toneladas de CO2 emitidos por edifício.`}
            </Tooltip>

            <Tooltip
              triggerContent={
                <div>
                  <div className="text-2xl font-bold text-primary-foreground text-center">
                    {formattedBuildingsInfo?.residential?.kgCO2PerSquareMeter}
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    kgCO2e/m²
                  </div>
                </div>
              }
            >
              {`${formattedBuildingsInfo?.residential?.kgCO2PerSquareMeter} kilogramas de CO2 emitidos por metro quadrado.`}
            </Tooltip>
          </div>
          <CardDescription className="mt-2 text-center">
            Os edifícios residenciais possuem{" "}
            {formattedBuildingsInfo.residential?.areaPercentage}% da área total
            e contribuem com{" "}
            {formattedBuildingsInfo.residential?.totalCo2EmissionPercentage}%
            das emissões
          </CardDescription>
        </div>
      ),
    },
    {
      title: "Métricas por edifício não residencial",
      href: "/buildings",
      icon: (
        <CardIcons>
          <Building />
        </CardIcons>
      ),
      loading: isLoadingBuildingsInfo,
      content: (
        <div className="flex flex-col w-full ">
          <div className="flex items-center justify-evenly gap-3 mb-5">
            <Tooltip
              triggerContent={
                <div>
                  <div className="text-2xl font-bold text-primary-foreground text-center">
                    {formattedBuildingsInfo?.nonResidential?.tCO2PerBuilding}
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    tCO2e/edifício
                  </div>
                </div>
              }
            >
              {`${formattedBuildingsInfo?.nonResidential?.tCO2PerBuilding} toneladas de CO2 emitidos por edifício.`}
            </Tooltip>
            <Tooltip
              triggerContent={
                <div>
                  <div className="text-2xl font-bold text-primary-foreground text-center">
                    {
                      formattedBuildingsInfo?.nonResidential
                        ?.kgCO2PerSquareMeter
                    }
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    kgCO2e/m²
                  </div>
                </div>
              }
            >
              {`${formattedBuildingsInfo?.nonResidential?.kgCO2PerSquareMeter} kilogramas de CO2 emitidos por metro quadrado.`}
            </Tooltip>
          </div>
          <CardDescription className="mt-2 text-center">
            Os edifícios não residenciais possuem{" "}
            {formattedBuildingsInfo.nonResidential?.areaPercentage}% da área
            total e contribuem com{" "}
            {formattedBuildingsInfo.nonResidential?.totalCo2EmissionPercentage}%
            das emissões
          </CardDescription>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 text-foreground">
      <h2 className="text-2xl font-bold">
        Visão geral de emissões de CO2 do ano de {new Date().getFullYear() - 1}
      </h2>

      <div className="flex gap-6 flex-col md:flex-row">
        {isLoadingTransportsCo2Emission || isLoadingBuildingsCo2Emission ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <Card className="border w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle>Emissões totais (tCO2e)</CardTitle>
              <CardIcons>
                <Scale />
              </CardIcons>
            </CardHeader>
            <CardContent>
              {" "}
              <>
                <div className="text-2xl font-bold text-foreground">
                  {Math.trunc(
                    (transportsCo2Emission?.totalCO2Emission || 0) +
                      (buildingsCo2Emission?.totalCO2Emission || 0)
                  ).toLocaleString()}{" "}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <CarFront size={20} className="text-primary-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Transportes:{" "}
                        {Math.trunc(
                          transportsCo2Emission?.totalCO2Emission || 0
                        ).toLocaleString()}{" "}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={20} className="text-primary-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Edifícios:{" "}
                      {Math.trunc(
                        buildingsCo2Emission?.totalCO2Emission || 0
                      ).toLocaleString()}{" "}
                    </span>
                  </div>
                </div>
              </>
            </CardContent>
          </Card>
        )}
        <Link
          href={"/targets"}
          className="h-80  md:h-64 xl:h-52 w-full  card-hover"
        >
          <TargetAdherenceSection />
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {cards?.map((card, index) =>
          card?.loading ? (
            <Skeleton key={`${card.title}-${index}`} className="h-[182px]" />
          ) : (
            <Link href={card.href}>
              <Card
                key={`${card.title}-${index}`}
                className="border card-hover"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle>{card.title}</CardTitle>
                  {card.icon}
                </CardHeader>
                <CardFooter className="mt-5">{card.content}</CardFooter>
              </Card>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
